<template>
    <div class="wxWebPay">
        <div class="tipsWxPayDiv">
            <div class="tipsDiv">
                <p class="c333 ft34">请确认微信支付是否完成？</p>
                <p class="cFF4862 ft34" @click="wxPayOk">已完成支付</p>
                <p class="c999 ft30" @click="wxPayOk">支付遇到问题？重新支付</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'

    export default {
        name: "wxWebPay",
        data() {
            return {}
        },
        mounted() {

        },
        methods: {
            // 微信H5支付完成
            wxPayOk() {
                this.$clearCookie('isWxPayed')
                this.$clearCookie('currentOrderSn')
                this.$router.push({
                    path: '/order/detail',
                    query: {
                        order_sn: this.$route.query.order_sn
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .tipsWxPayDiv {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(40, 40, 40, 1);
        .tipsDiv {
            width: 600px;
            margin-left: 50%;
            margin-top: 50%;
            transform: translate(-50%);
            background-color: #fff;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            border-radius: 20px;
            p {
                text-align: center;
            }
            .c333 {
                padding: 40px 0;
                border-bottom: 1px solid #999;
            }
            .cFF4862 {
                padding: 30px 0;
                border-bottom: 1px solid #999;
            }
            .c999 {
                padding: 30px 0;
            }
        }
    }
</style>
