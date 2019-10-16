import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login/:func?',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/board/:name?',
      name: 'board',
      component: () => import('@/views/Board.vue'),
    },
    {
      path: '/map/:func?/:id?',
      name: 'map',
      component: () => import('@/views/MapMain.vue'),
      props: true,
    },
    {
      path: '/mypage/:name?',
      name: 'mypage',
      component: () => import('@/views/MyPage.vue'),
    },
    {
      path: '/agentpage/:name?',
      name: 'agentpage',
      component: () => import('@/views/AgentPage.vue'),
    },
    {
      path: '/join/:func?',
      name: 'join',
      component: () => import('@/views/Join.vue')
    },
    {
      path: '/findId/:func?',
      name: 'findId',
      component: () => import('@/views/FindId.vue')
    },
    {
      path: '/findPass/:func?',
      name: 'findPass',
      component: () => import('@/views/FindPass.vue')
    },
    {
      path: 'testfile',
      name: 'testfile',
      component: () => import('@/views/testfile.vue')
    }
  ]
})
