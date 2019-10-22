import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    async loginCheck() {
      let result = await axios({
        url: `${this.serverLocation}/check`
      })

      return typeof result.data.user !== 'undefined'
    }
  },
  data() {
    return {
      serverLocation: 'http://192.168.0.91:3000/api',
      optionMapping: {
        1: '주차장',
        2: '엘리베이터',
        3: '반려동물',
        4: '전세대출',
        5: '에어컨',
        6: '냉장고',
        7: '세탁기',
        8: '가스레인지',
        9: '전자레인지',
        10: '책장',
        11: '책상',
        12: '옷장',
        13: '침대',
        14: '신발장',
        15: '싱크대',
      }
    }
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
