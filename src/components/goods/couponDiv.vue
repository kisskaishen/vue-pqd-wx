<template>
    <transition name="fade">
        <div class="couponDiv " v-if="couponIsShow">
            <div class="couponCon bgf5f5f5">
                <div class="title bgfff mb20">
                    <b>领取优惠券</b>
                    <p @click="closeCoupon">
                        <img src="../../imgs/detail/icon-coupon-close.png" alt="">
                    </p>
                </div>
                <div class="couponList">
                    <!--分享券-->
                    <div class="coupon shareCoupon" v-for="item,index in storeCouponList.merchant">
                        <div class="top">
                            <div class="divFl">
                                <div class="money">
                                    <p class="cFF4862"><span class="fz28">￥</span><span
                                        class="fz56 fwbold">{{item.money}}</span></p>
                                    <p class="c666 fz22">满{{item.condition_money}}可用</p>
                                </div>
                                <div class="info ml10">
                                    <p>
                                        <span>{{item.coupon_name}}</span>
                                    </p>
                                    <p class="cB2B2B2">有效期至：{{item.send_end_time}}</p>
                                </div>
                            </div>
                            <div class="divFr">
                                <button class="cfff5dd br2solid75602d brs50 bg75602d ft24"
                                        @click="getShareCoupon(item,index)">分享领券
                                </button>
                                <span class="c75602d" @click="getCoupon(item,index)">直接领取</span>
                                <button class="cc1b496 br2solide6d7b5 brs50 bgtransparent ft24">已领取</button>
                            </div>
                        </div>
                        <div class="bottom cB2B2B2 overFlow1">
                            {{item.coupon_name}}
                        </div>
                    </div>
                    <!--正常券-->
                    <div class="coupon" v-for="item,index in storeCouponList.merchant">
                        <div class="top">
                            <div class="divFl">
                                <div class="money">
                                    <p class="cFF4862"><span class="fz28">￥</span><span
                                        class="fz56 fwbold">{{item.money}}</span></p>
                                    <p class="c666 fz22">满{{item.condition_money}}可用</p>
                                </div>
                                <div class="info ml10">
                                    <p>
                                        <i class="merchatIcon"></i>
                                        <span class="overFlow1">{{item.coupon_name}}</span>
                                    </p>
                                    <p class="cB2B2B2">有效期至：{{item.send_end_time}}</p>
                                </div>
                            </div>
                            <div class="divFr">
                                <button class="cb2b2b2 br2solideee brs50 bgfff" v-if="item.is_receive == '1'">已领取
                                </button>
                                <button class="cfff br2solidff4862 brs50 bgff4862 ft24" v-else
                                        @click="getCoupon(item,index)">立即领取
                                </button>
                            </div>
                        </div>
                        <div class="bottom cB2B2B2 overFlow1">
                            {{item.coupon_name}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {Toast, MessageBox} from 'mint-ui';

    export default {
        props: ['isCouponStatus', 'info', 'coupon'],
        name: "couponDiv",
        data() {
            return {
                isHide: false,
                couponIsShowVal: false,
                // storeCouponList: {merchant: []}
            }
        },
        computed: {
            couponIsShow() {
                return this.isCouponStatus
            },
            storeCouponList() {
                return this.coupon
            }
        },
        mounted() {
            setTimeout(() => {
                // this.getCouponList()
                this.getShow()
            }, 800)
        },
        methods: {
            // getCouponList() {
            //     this.storeCouponList = this.coupon
            // },
            getCoupon(val, index) {
                this.$post('user/hanldeUserCoupon', {
                    coupon_id: val.coupon_id,
                    token: this.$getCookie('token') ? this.$getCookie('token') : ''
                })
                    .then(res => {
                        this.storeCouponList.merchant[index].is_receive = '1'
                        Toast({
                            message: '领取成功',
                            duration: 1000
                        })
                    })
            },
            getShow() {
                this.couponIsShowVal = this.isCouponStatus
            },
            showMoreDetail() {
                this.isHide = !this.isHide
            },
            closeCoupon() {
                this.$emit('closeCoupon', false)
            },
            // 分享领券
            getShareCoupon() {
                MessageBox({
                    title: '',
                    message: `<br/><span class="fz32 c333">分享后可获得<b class="cff4862">15元</b>优惠券</span><br/><br/><span class="fz28 c999">(当前面额为5元)</span>`,
                    showCancelButton: true,
                    confirmButtonText: '分享领取',
                    cancelButtonText: '直接领取'
                })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

        }
    }
</script>

<style scoped lang="scss">
    .couponDiv {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        background-color: rgba(0, 0, 0, .6);
        z-index: 999;
        .couponCon {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            min-height: 400px;
            max-height: 1000px;
            overflow: scroll;
            -webkit-border-radius: 20px 20px 0 0;
            -moz-border-radius: 20px 20px 0 0;
            border-radius: 20px 20px 0 0;
            .title {
                position: relative;
                line-height: 108px;
                color: #333;
                font-size: 30px;
                text-align: center;
                border-bottom: 1px solid #eee;
                p {
                    position: absolute;
                    right: 42px;
                    top: 42px;
                    width: 26px;
                    height: 26px;
                    img {
                        width: 26px;
                        height: 26px;
                    }
                }
            }
            .couponList {
                padding: 0 26px;
                // 正常券
                .coupon {
                    margin-bottom: 20px;
                    background: url("../../imgs/coupon/icon-coupon-bg.png") no-repeat center /100%;
                    .top {
                        padding: 42px 30px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .divFl {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            .money {
                                width: 160px;
                                p {
                                    display: flex;
                                    justify-content: center;
                                    align-items: baseline;
                                    span {
                                        width: auto;
                                    }
                                }

                            }
                            .info {
                                width: 320px;
                                display: flex;
                                flex-direction: column;
                                justify-content: space-around;
                                align-items: flex-start;
                                p {
                                    display: flex;
                                    justify-content: flex-start;
                                    align-items: center;
                                    line-height: 44px;
                                    width: 320px;
                                    i {
                                        width: 80px;
                                        height: 30px;
                                    }
                                    .platformIcon {
                                        background: url("../../imgs/coupon/icon-platform.png") no-repeat center /100%;
                                    }
                                    .merchatIcon {
                                        background: url("../../imgs/coupon/icon-merchat.png") no-repeat center /100%;
                                    }
                                    .platformIconed {
                                        background: url("../../imgs/coupon/icon-platform-over.png") no-repeat center /100%;
                                    }
                                    .merchatIconed {
                                        background: url("../../imgs/coupon/icon-merchat-over.png") no-repeat center /100%;
                                    }
                                    span {
                                        margin-left: 6px;
                                        width: 220px;
                                    }
                                    &:nth-child(1) {
                                        font-size: 28px;
                                        font-weight: bold;
                                    }
                                    &:nth-child(2) {
                                        font-size: 24px;
                                        color: #999;
                                    }
                                }
                            }
                        }
                        .divFr {
                            button {
                                width: 150px;
                                height: 50px;
                                line-height: 50px;
                            }
                        }
                    }
                    .bottom {
                        padding: 16px 30px;
                    }
                }
                // 分享券
                .shareCoupon {
                    background: url("../../imgs/coupon/icon-coupon-share-bg.png") no-repeat center /100%;
                    .top {
                        .divFl {
                            .info {
                                width: 292px;
                                p {
                                    span {
                                        width: 280px;
                                        line-height: 40px;
                                        max-height: 80px;
                                        white-space: normal;
                                    }
                                }
                            }
                        }
                        .divFr {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            button {
                                width: 182px;
                                margin-bottom: 20px;
                            }
                            span {
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }

        }
    }
</style>
