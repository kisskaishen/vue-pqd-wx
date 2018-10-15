<template>
    <div class="getNewCoupon">
        <div class="bg">
            <img src="../../images/icon-newBg.png" alt="">
        </div>
        <div class="list">
            <div class="top">
                <div class="divFl">
                    <b class="red">通用红包</b>
                    <span>满20元可用</span>
                </div>
                <div class="divFr">
                    <span class="red">
                        ￥<b>2</b>
                    </span>
                </div>
            </div>
            <div class="center">
                <span>2天后过期</span>
            </div>
            <div class="bottom">
                <mt-button type="danger" size="large" @click="goIndex">立即使用</mt-button>
            </div>
        </div>
        <div class="rules">
            <div class="top">
                <hr>
                <span>活动规格</span>
                <hr>
            </div>
            <div>
                <p>
                    <label>1.</label>
                    <span>每名用户活动期间只能领用一次红包；</span>
                </p>
                <p>
                    <label>2.</label>
                    <span>领取的红包账号同下单账号为同一账号；</span>
                </p>
                <p>
                    <label>3.</label>
                    <span>使用红包需要在拼趣多平台用领取红包的手机号码注册；</span>
                </p>
                <p>
                    <label>4.</label>
                    <span>红包在订单结算的时候使用，每单仅能使用一张红包，不支持拆开使用；</span>
                </p>
                <p>
                    <label>5.</label>
                    <span>红包不支持提现；</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "getNewCoupon",
        methods: {
            goIndex() {
                this.$router.push('/index')
            }
        }
    }
</script>

<style scoped lang="scss">
    .getNewCoupon {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #fddc43;
        .bg {
            width: 100%;
            img {
                width: 100%;
                height: 548px;
            }
        }
        .list {
            width: 700px;
            padding: 40px;
            margin: 0 auto;
            border-radius: 20px;
            background-color: #fff;
            .top {
                padding: 0 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .divFl {
                    flex-direction: column;
                    span {
                        padding: 10px 0;
                    }
                }
                .divFr {
                    b {
                        font-size: 44px;
                    }
                }
            }
            .center {
                padding: 20px 40px;
                span {
                    color: #999;
                }
            }
            .bottom {
                .mint-button {
                    width: 520px;
                    margin: 0 auto;
                    height: 72px;
                    -webkit-border-radius: 72px;
                    -moz-border-radius: 72px;
                    border-radius: 72px;
                }
            }

        }
        .rules {
            width: 700px;
            padding: 40px;
            margin: 40px auto;
            border-radius: 20px;
            background-color: #fff;
            .top {
                display: flex;
                justify-content: space-around;
                align-items: center;
                margin-bottom: 20px;
                hr {
                    width: 200px;
                    border: 1px solid #444;
                }
            }
            div {
                p {
                    text-align: justify;
                    label {
                        float: left;
                        margin-right: 10px;
                    }
                    span {
                        display: block;
                        overflow: hidden;
                    }
                }

            }

        }
    }
</style>
