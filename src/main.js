import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VModal from 'vue-js-modal'
 
//import material-icon scss
import "font-awesome/css/font-awesome.min.css";

import VueSweetalert2 from 'vue-sweetalert2';
 
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
 
Vue.use(VueSweetalert2);

//defined as global component
Vue.component('VueFontawesome', require('vue-fontawesome-icon/src/components/VueFontawesome.vue').default);

Vue.use(VModal, { dynamic: true })
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


import VueDaumPostcode from 'vue-daum-postcode';

Vue.use(VModal);
Vue.use(VueDaumPostcode);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')