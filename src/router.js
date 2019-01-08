import Vue from 'vue'
import Router from 'vue-router'
import chatbox from '@/components/chatbox';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/channel/:id',
      name: 'chatbox',
      component: chatbox
    }
  ]
})
