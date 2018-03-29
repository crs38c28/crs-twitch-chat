<template>
  <div id="chatbox">
    <div class="chat-line" v-for="(line,index) in msg" :key="index">
      <badges :state="line.state" :bdg="getbdg()"></badges>
      <span class="username" :style="{ color: line.state['color']}">
        {{line.state['display-name']}}
      </span>
      <span v-if="line.state['message-type']!=='action'" class="colon">:</span>
      <span v-if="line.state['message-type']=='chat'" class="message" v-html="line.text"></span>
      <span v-if="line.state['message-type']=='action'" class="action" v-html="line.text" :style="{ color: line.state['color']}"></span>
    </div>
  </div>
</template>

<script>
import * as TwitchChat from '@/js/twitchchat';
import badges from './badges';

export default {
  name: 'chatbox',
  components: {
    badges
  },
  data: function () {
    return {
      msg: [],
      bdg: [],
      nid: 0
    };
  },
  watch: {
    msg: function () {
      /** control message line count **/
      if (this.msg.length > TwitchChat.config.LINE_MAX) {
        this.msg.pop();
      }
    }
  },
  methods: {
    getbdg () {
      return this.bdg;
    },
    async twitchstart () {
      this.nid = await TwitchChat.init(this.$route.params.id);
      this.bdg = await TwitchChat.twitchfetch(this.nid);
      TwitchChat.twitchconnect();
      this.twitchevent();
    },
    /** Twitch Chat **/
    twitchevent () {
      /** When Connected **/
      TwitchChat.client.on('connecting', (address, port) => {
        this.msg.unshift({'state': TwitchChat.systemstate, 'text': `Connecting to server [#${this.$route.params.id}@${address}:${port}]`});
      });
      TwitchChat.client.on('connected', (address, port) => {
        this.msg.unshift({'state': TwitchChat.systemstate, 'text': 'Connected.'});
      });
      TwitchChat.client.on('disconnected', (reason) => {
        this.msg.unshift({'state': TwitchChat.systemstate, 'text': 'Disconnected.'});
      });
      /** Recieve Chat Message **/
      TwitchChat.client.on('chat', (channel, userstate, message, self) => {
        if (!TwitchChat.config.bot_command) {
          if (TwitchChat.config.bot_list.indexOf(userstate.username) !== -1) {
            // Bot's response
            return 0;
          }
          if (message[0] === '!') {
            // someone use "!command"
            return 0;
          }
        }
        this.msg.unshift({
          'state': userstate,
          'text': TwitchChat.formatMessage(message, userstate.emotes)
        });
      });
      TwitchChat.client.on('action', (channel, userstate, message, self) => {
        if (!TwitchChat.config.bot_command) {
          if (TwitchChat.config.bot_list.indexOf(userstate.username) !== -1) {
            return 0;
          }
        }
        this.msg.unshift({
          'state': userstate,
          'text': TwitchChat.formatMessage(message, userstate.emotes)
        });
      });
      /** Clear Chat Command **/
      TwitchChat.client.on('clearchat', (channel) => {
        this.msg.length = 0;
        this.$forceUpdate();
      });
    }
  },
  mounted () {
    this.twitchstart();
  }
};
</script>

<style lang="scss">
  #chatbox{
    display: flex;
    flex-direction: column-reverse;
    overflow-y: hidden;
    width: 100vw;
    height: 100vh;
  }
  .emoticon{
    vertical-align: middle;
  }
  .emoji{
    width:18px;
    vertical-align: middle;
  }
  .action, .colon, .message{
    vertical-align: middle;
  }
</style>
