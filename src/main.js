// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
// import store from './vuex/store.js'
import 'lib-flexible/flexible'

import $ from 'jquery'


import {get, post, upload, baseUrl} from './config/api'
import {setCookie, getCookie, clearCookie} from './config/util'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'         // 2.6.0+版本需要手动添加
Vue.use(VueAwesomeSwiper)

import Util from './config/util'

Vue.use(Util)
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
    preLoad: 1.3,
    error: 'dist/error.png',
    loading: 'dist/loading.gif',
    attempt: 1
})

// import autoLogin from './config/autoLogin'
// Vue.use(autoLogin)
if (window.getAppUserInfo) {            // ios获取登录信息
    let appUserInfo = window.getAppUserInfo();
    setCookie('terminal', appUserInfo.terminal)
} else if (window.webview) {            // android
    let appUserInfo = window.webview.getAppUserInfo();
    appUserInfo = JSON.parse(appUserInfo)
    setCookie('terminal', appUserInfo.terminal)
}
// if (decodeURI(getCookie('loginType'))=='网页版') {
// }


import Progress from 'vue-multiple-progress'

Vue.use(Progress)

Vue.prototype.$setCookie = setCookie
Vue.prototype.$getCookie = getCookie
Vue.prototype.$clearCookie = clearCookie

Vue.prototype.$baseUrl = baseUrl
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$upload = upload


Vue.prototype.$token = App.token


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    // store,
    components: {App},
    template: '<App/>'
})
