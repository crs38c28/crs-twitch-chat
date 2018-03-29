<template>
  <span class="badges">
    <span class="badge" v-for="(value, key, index) in state.badges" :key="index" :class="key" :style="getbadageurl(bdg[key],value)"></span>
  </span>
</template>

<script>
export default {
  name: 'badges',
  props: ['state', 'bdg'],
  methods: {
    getbadageurl (bdg, ver) {
      return {'background': `url(${bdg['versions'][ver]['image_url_1x']})`};
    }
  }
};
</script>

<style lang="scss">
  .badge{
    height: 18px;
    min-width: 18px;
    margin-left: 2px;
    display: inline-block;
    vertical-align: middle;
  }
  .username{
    vertical-align: middle;
  }
  .message{
    vertical-align: middle;
    word-break: break-word;
  }
</style>
