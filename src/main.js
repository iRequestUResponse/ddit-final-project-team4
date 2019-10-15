import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.mixin({
  methods: {
    async loginCheck() {
      let result = await axios({
        url: `${this.$store.state.serverLocation}/check`
      });

      return result.data.length === 1;
    }
  },
})