<template>
    <div class="wx">
    </div>
</template>

<script>
    import wx from 'weixin-js-sdk';         // 引入微信sdk
    import {Toast} from 'mint-ui';

    export default {
        name: "wxconfig",
        props: ['currentUrl'],
        data() {
            return {
                url: '',
                currentDataUrl: ''
            }
        },
        beforeRouteEnter(to, from, next) {
            next()
        },
        mounted() {
            let self = this
            self.setConfig()
        },
        methods: {
            // 微信的sdk配置
            setConfig() {
                let u = navigator.userAgent
                let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
                // location.assign(this.currentUrl)
                if (isIOS) {
                    // this.url = sessionStorage.getItem('sessionUrl')
                    this.url = this.currentDataUrl?this.currentDataUrl:window.location.href
                } else {
                    this.url = this.currentDataUrl?this.currentDataUrl:window.location.href
                }
                this.$post('wachat/getWachatSdk', {
                    url: encodeURIComponent(this.url)
                })
                    .then(res => {
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: res.js_sdk.appId, // 必填，公众号的唯一标识
                            timestamp: res.js_sdk.timestamp, // 必填，生成签名的时间戳
                            nonceStr: res.js_sdk.nonceStr, // 必填，生成签名的随机串
                            signature: res.js_sdk.signature,// 必填，签名
                            jsApiList: res.js_sdk.jsApiList // 必填，需要使用的JS接口列表
                        })

                    })
            }
        },
        watch: {
            currentUrl(val) {
                this.currentDataUrl = val
            }
        }
    }
</script>

<style scoped>

</style>
