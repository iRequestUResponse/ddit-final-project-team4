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
      fileServer: 'http://192.168.0.121:9000/api',
    }
  }
});


import VModal from 'vue-js-modal';
import VueDaumPostcode from 'vue-daum-postcode';

Vue.use(VModal);
Vue.use(VueDaumPostcode);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
