import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import md5 from 'js-md5'
import { Confirm, ConfirmPlugin, ToastPlugin, AlertPlugin} from 'vux'

Vue.use(ToastPlugin)


Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)

Vue.component('confirm', Confirm)


const FastClick = require('fastclick')
FastClick.attach(document.body)


Vue.prototype.$md5 = md5

// Vue.prototype.$axios = axios
Vue.prototype.$axios =  axios.create({
    baseURL: 'http://haigou.com/api/',
    crossDomain:true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
