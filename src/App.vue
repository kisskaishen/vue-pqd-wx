<template>
    <div id="app">
        <transition name="fade">
            <router-view/>
        </transition>
        <!--<wx-config></wx-config>-->
    </div>
</template>
<script>
    // import wx from 'weixin-js-sdk';         // 引入微信sdk
    // import wxConfig from './components/wx/wxconfig'
    // import envLogin from './config/envLogin'
    import urlSearch from './config/urlSearch'

    export default {
        name: 'App',
        data() {
            return {}
        },
        mounted() {
            // alert('只要一进入页面就会弹出，包括切换页面也会')
            // alert(this.$getCookie('terminal'))
            // if (this.$getCookie('terminal') == 'i') {            // ios获取登录信息
            //     let appUserInfo = window.getAppUserInfo();
            //     this.setCookie('terminal', appUserInfo.terminal)
            //     if (appUserInfo.token) {
            //         this.setCookie('token', appUserInfo.token)
            //         this.setCookie('user_name', appUserInfo.name)
            //         this.setCookie('head_pic', appUserInfo.avatar)
            //         this.setCookie('terminal', appUserInfo.terminal)
            //     } else {
            //         window.showAppLoginView();              // ios登录
            //     }
            //     // } else if (window.webview) {            // android
            // } else if (this.$getCookie('terminal') == 'a') {            // android
            //
            //
            //     alert('is---a')
            //
            //     let appUserInfo = window.webview.getAppUserInfo();
            //     alert(appUserInfo)
            //     appUserInfo = JSON.parse(appUserInfo)
            //     if (appUserInfo.token) {
            //         this.setCookie('token', appUserInfo.token)
            //         this.setCookie('user_name', appUserInfo.name)
            //         this.setCookie('head_pic', appUserInfo.avatar)
            //         this.setCookie('terminal', appUserInfo.terminal)
            //     } else {
            //         alert('调用安卓登录')
            //         window.webview.showAppLoginView();              // android登录
            //         let appUserInfo = window.webview.getAppUserInfo();
            //
            //         alert(appUserInfo)
            //     }
            //     alert(appUserInfo.token)
            //
            //     // } else if (!getCookie('token')) {           // 如果token不存在，则是微信/qq/web
            // }
            if (this.$route.query.token || this.$getCookie('token') == '' || !this.$getCookie('token') || this.$getCookie('user_md5') == '') {
                if (this.$route.query.token || urlSearch('token')) {
                    this.$setCookie('token', this.$route.query.token || urlSearch('token'))
                }
                this.getUserInfo()
            } else {
                // if (urlSearch('token')) {
                //   location.href = location.href.split('?token')[0] || location.href.split('&token')[0]
                // }
                if (this.$local.get('indexData') == '' || JSON.stringify(this.$local.get('indexData')) == '{}' || !this.$local.get('indexData')) {
                    this.getChild()
                }
            }

        },
        // components:{wxConfig},
        methods: {
            getUserInfo() {
                this.$post('login/getTokenInfo', {token: this.$route.query.token || this.$getCookie('token')})
                    .then(res => {
                        this.$setCookie('head_pic', res.head_pic)
                        this.$setCookie('nickname', res.nickname)
                        this.$setCookie('token', res.token)
                        this.$setCookie('user_md5', res.user_md5)
                        this.$setCookie('time', res.time)
                        if ((location.href.indexOf('?token') > -1) || (location.href.indexOf('&token') > -1)) {
                            location.href = location.href.split('?token')[0] || location.href.split('&token')[0]
                        }
                    })
                if (this.$local.get('indexData') == '' || this.$local.get('indexData') == '{}' || !this.$local.get('indexData')) {
                    this.getChild()
                }
            },
            getChild() {
                this.$post('common/getCategory', {})
                    .then((res) => {
                        if (res) {
                            this.$local.set('indexData', res)
                        }
                    })
            },
        }
    }
</script>

<style lang="scss">
    @import './style/base.css';
    @import "./style/main.scss";

    body {
        width: 750px;
        margin: 0 auto;
        height: 100%;
        background: #fff;
    }

    #app {
        position: relative;
        font-family: Arial, '黑体';
        /*font-family: PingFang-SC-Bold;*/
        /*font-family: PingFang-SC-Bold,'Avenir', Helvetica, Arial, sans-serif;*/
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        width: 750px;
        background-color: #fff;
        font-size: 24px;
        height: 100%;
        /*height: 800px;*/
    }

    .ft20 {
        font-size: 20px;
    }

    .ft24 {
        font-size: 24px;
    }

    .ft28 {
        font-size: 28px;
    }

    .ft30 {
        font-size: 30px;
    }

    .ft34 {
        font-size: 34px;
    }

    .ft42 {
        font-size: 42px;
    }

    .ft4c4c4c {
        color: #4c4c4c;
    }

    .ftFF4862 {
        color: #FF4862;
    }

    .cB3B3B3 {
        color: #B3B3B3;
    }

    .c666 {
        color: #666;
    }

    .c999 {
        color: #999;
    }

    .cFF4862 {
        color: #FF4862;
    }

    .breee {
        border: 2px solid #eee !important;
    }

    .bgeee {
        background-color: #eee;
    }

    .ft999 {
        color: #999;
    }

    .ft333 {
        color: #333;
    }

    .ft80 {
        font-size: 80px;
    }

    .ft120 {
        font-size: 120px;
    }

    .cFF4862 {
        color: #FF4862;
    }

    .c999 {
        color: #999;
    }

    .c333 {
        color: #333;
    }

</style>
