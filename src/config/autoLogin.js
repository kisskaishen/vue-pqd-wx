import {getCookie, setCookie, session} from './util'         // 引入cookie
import envLogin from './envLogin'
import router from "../router";

export default () => {
    // if (window.getAppUserInfo) {            // ios获取登录信息
    if (getCookie('terminal') == 'i') {            // ios获取登录信息
        let appUserInfo = window.getAppUserInfo();
        setCookie('terminal', appUserInfo.terminal)
        if (appUserInfo.token) {
            setCookie('token', appUserInfo.token)
            setCookie('user_name', appUserInfo.name)
            setCookie('head_pic', appUserInfo.avatar)
            setCookie('terminal', appUserInfo.terminal)
        } else {
            window.showAppLoginView();              // ios登录
        }
        // } else if (window.webview) {            // android
    } else if (getCookie('terminal') == 'a') {            // android

        let appUserInfo = window.webview.getAppUserInfo();
        appUserInfo = JSON.parse(appUserInfo)
        if (appUserInfo.token) {
            setCookie('token', appUserInfo.token)
            setCookie('user_name', appUserInfo.name)
            setCookie('head_pic', appUserInfo.avatar)
            setCookie('terminal', appUserInfo.terminal)
        } else {
            window.webview.showAppLoginView();              // android登录
        }

    // } else if (!getCookie('token')) {           // 如果token不存在，则是微信/qq/web
    } else {
        // session.set('loginBeforeUrl', location.href)
        envLogin();
        // let auto = {
        //     isWeiXin() {
        //         let ua = navigator.userAgent.toLowerCase();
        //         if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     },
        //     isQQ() {
        //         let ua = navigator.userAgent.toLowerCase();
        //         if (ua.match(/qq/i) == 'qq') {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     }
        // }
        // let currentHref = location.href         // 获取当前url
        // console.log('调用我啊')
        // if (auto.isWeiXin()) {
        //     if (location.search.indexOf('token') == '-1') {
        //         location.href = baseUrl + '/login/oauth?type=2&jump_url=' + currentHref
        //     } else {
        //         setCookie('token', urlSearch('token'))
        //     }
        //     console.log('这里是微信，调用微信自动登录的接口')
        // } else if (auto.isQQ()) {
        //     console.log('这里是qq，调用qq自动登录的接口')
        // } else {
        //     console.log('这里是网页版登录，可以手机号登录')
        //     setCookie('loginType', '网页版')
        // }

    }
}
