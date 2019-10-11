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
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/apart',
      name: 'apartment',
      component: () => import('@/views/Apartment.vue')
    },
    {
      path: '/board',
      name: 'board',
      component: () => import('@/views/Board.vue'),
      children: [
        {
          path: ':name',
          component: () => import('@/views/Board.vue'),
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/SearchMain.vue'),
      // children: [
      //   {
      //     path: ':name',
      //     component: () => import('@/views/SearchMain.vue'),
      //   }
      // ]
    },
  ]
})
