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
      serverLocation: 'http://localhost:3000/api',
    }
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
