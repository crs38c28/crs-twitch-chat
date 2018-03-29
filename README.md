# crs-twitch-chat

> A simple twitch chat layout for theme development

## Dependencies

- vue & vue-router
- [twemoji](https://github.com/twitter/twemoji) (Used for emoji icon)
- [twitch-emoticons](https://github.com/1Computer1/twitch-emoticons) (FFZ & BTTV emote support)
- [twitch-js](https://github.com/twitch-apis/twitch-js) (A community-centric, community-supported version of [tmi.js](https://github.com/tmijs/tmi.js))

## Warning

> Twitch API v5 is deprecated and will be removed on 12/31/18.

## Usage

### Access your channel 

```
/** vue router style **/
http://localhost:8080/#/channel/channel_id
```

### Twitch Chat Event 

Please check [tmi.js](https://docs.tmijs.org/v1.2.1/Events.html) for more information.
```
  /** in chatbox.vue **/
  TwitchChat.client.on('chat', (channel, userstate, message, self) => {
    message_chat_do_something();
  });
  TwitchChat.client.on('action', (channel, userstate, message, self) => {
    message_action_do_something();
  });
```

#### Currently support
- chat
- action
- clearchat

#### Not support
- bits (cheers)
- resub message

## Files

You can modify files (those with " \* " sign) to create your own style twitch chat.

``` 
|
|-- src
    |-- components
    |   |
    |   |-- *add more component!
    |   |-- *chatbox.vue (chatbox component)
    |   `-- *badges.vue  (badges component)
    |-- js
    |   |
    |   |-- *config.json (chat config file)
    |   `-- twitchchat.js
    |-- router
    |   | 
    |   `-- index.js
    |-- *App.vue
    `-- Main.js

``` 

## Layout

The Original Layout will fit your OBS browser size.
```
.chatbox{
  height:100vh; 
  width:100vw;
}
```

### Component Introduction
![simple layout](https://i.imgur.com/Vv3JDJV.png)

You Can modify them into...
### Pokemon Style
![pokemon layout](https://i.imgur.com/4il6KGb.png)

Or Add more component...
### Persona Style
![persona5 layout](https://i.imgur.com/7lXhO5N.png)

## Config

config file : ```src/js/config.json```

``` 
{
  "BTTV": true,        // BTTV emote Supoort
  "FFZ": true,         // FFZ emote Supoort
  "client_id": "",     // Twitch application client id
  "bot_command": true, // Show bot and commands (EX: !commands)
  "bot_list": [],      // Bot List (EX: Nightbot)
  "LINE_MAX": 15       // Max Line count
}
``` 

For client id, please check [Twitch Dev](https://dev.twitch.tv/docs/v5/#getting-a-client-id) for more information.

## Theme Demo

- [simple](http://crs38c28.github.io/crs-twitch-chat/simple/index.html#/channel/chris38c28)
- [dark](http://crs38c28.github.io/crs-twitch-chat/dark/index.html#/channel/chris38c28)

## Build Setup

``` 
bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
