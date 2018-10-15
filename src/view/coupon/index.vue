<template>
    <div class="coupon bgf5f5f5">
        <div class="title" v-if="this.$route.query.from!='pay'">
            <span v-for="item,index in titles" @click="typeChange(item,index)" :class="index==currentIndex?'red':''">{{item.title}}</span>
        </div>
        <div class="couponDiv">
            <ul v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="100">
                <!--分享券-->
                <li v-for="item,index in couponList" class="type1 typeShare">
                    <div class="top">
                        <div class="divTop">
                            <div class="divTopFl">
                                <div class="money">
                                    <p class="cFF4862">
                                        <span class="fz28">￥</span>
                                        <span class="fz56 fwbold lh42 -ml10">{{item.money}}</span></p>
                                    <p class="c666 fz22">满{{item.condition_money}}可用</p>
                                </div>
                                <div class="info ml40">
                                    <p>
                                        <span class="fz28 fwbold c333">{{item.store_name||item.coupon_name}}</span>
                                    </p>
                                    <p class="cb2b2b2">有效期至:{{item.send_end_time}}</p>
                                </div>
                            </div>
                            <div class="divTopFr">
                                <button class="cfff5dd br2solid75602d brs50 bg75602d ft24">分享领券</button>
                                <span class="c75602d" @click="getCoupon(item,index)">直接领取</span>
                                <!--<button class="cc1b496 br2solide6d7b5 brs50 bgtransparent ft24">已领取</button>-->

                                <button v-if="item.is_receive == '1'"
                                        :class="[item.is_receive == '1'?'nowUseBtn':'','brs50']"
                                        @click="useCoupon(item,index)">立即使用
                                </button>
                            </div>
                        </div>
                        <div class="divBottom mt10">
                            <vm-progress :percentage="item.ratio" :stroke-width="6" :show-text="false"
                                         track-color="#eee" stroke-color="#FF4862"></vm-progress>
                            <span class="c999 fz22 ml20">剩余{{100-item.ratio}}%</span>
                        </div>
                    </div>
                    <div class="bottom c666">
                        {{item.tips}}
                    </div>
                </li>
                <!--未被抢光的样式-->
                <li v-for="item,index in couponList" v-if="selected=='1'&&item.ratio<100"
                    class="type1">
                    <div class="top">
                        <div class="divTop">
                            <div class="divTopFl">
                                <div class="money">
                                    <p class="cFF4862">
                                        <span class="fz28">￥</span>
                                        <span class="fz56 fwbold lh42 -ml10">{{item.money}}</span></p>
                                    <p class="c666 fz22">满{{item.condition_money}}可用</p>
                                </div>
                                <div class="info ml40">
                                    <p>
                                        <i :class="item.store_id=='0'?'platformIcon':'merchatIcon'"></i>
                                        <span class="overFlow1 fz28 fwbold c333">{{item.store_name||item.coupon_name}}</span>
                                    </p>
                                    <p class="cb2b2b2">有效期至:{{item.send_end_time}}</p>
                                </div>
                            </div>
                            <div class="divTopFr">
                                <button v-if="item.is_receive == '0'" class="bgff4862 fz24 brs50"
                                        @click="receiveCoupon(item,index)">立即领取
                                </button>
                                <button v-if="item.is_receive == '1'"
                                        :class="[item.is_receive == '1'?'nowUseBtn':'','brs50']"
                                        @click="useCoupon(item,index)">立即使用
                                </button>
                            </div>
                        </div>
                        <div class="divBottom mt10">
                            <vm-progress :percentage="item.ratio" :stroke-width="6" :show-text="false"
                                         track-color="#eee" stroke-color="#FF4862"></vm-progress>
                            <span class="c999 fz22 ml20">剩余{{100-item.ratio}}%</span>
                        </div>
                    </div>
                    <div class="bottom c666">
                        {{item.tips}}
                    </div>
                </li>
                <!--已被抢光的=>item.radio==100-->
                <li v-for="item,index in couponList" v-if="selected=='1'&&item.radio=='100'"
                    class="type2">
                    <div class="top">
                        <div class="divTop">
                            <div class="divTopFl">
                                <div class="money">
                                    <p class="cb2b2b2">
                                        <span class="fz28">￥</span>
                                        <span class="fz56 fwbold lh42 -ml10">{{item.money}}</span></p>
                                    <p class="cb2b2b2 fz22">满{{item.condition_money}}可用</p>
                                </div>
                                <div class="info ml40">
                                    <p>
                                        <i :class="item.store_id=='0'?'platformIconed':'merchatIconed'"></i>
                                        <span class="overFlow1 fz28 fwbold cb2b2b2">{{item.store_name||item.coupon_name}}</span>
                                    </p>
                                    <p class="cb2b2b2">有效期至:{{item.send_end_time}}</p>
                                </div>
                            </div>
                            <div class="divTopFr">
                                <i v-if="item.ratio=='100'"
                                        :class="[item.ratio == '100'?'noBtn':'','brs50']"></i>
                            </div>
                        </div>
                        <div class="divBottom mt10">
                            <vm-progress :percentage="item.ratio" :stroke-width="6" :show-text="false"
                                         track-color="#eee" stroke-color="#FF4862"></vm-progress>
                            <span class="cb2b2b2 fz22 ml20">剩余{{100-item.ratio}}%</span>
                        </div>
                    </div>
                    <div class="bottom cb2b2b2">
                        {{item.tips}}
                    </div>
                </li>
                <li v-if="couponList==''" class="noCouponLi">
                    <div class="noCouponDiv">
                        <img src="../../imgs/coupon/icon-no-coupon.png" alt="">
                        <p>优惠券 · 空空如也</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Coupon from '../../components/coupon/coupon';
    import {Toast} from 'mint-ui';

    export default {
        name: "index",
        data() {
            return {
                titles: [
                    {
                        title: '平台优惠券',
                        type: '1'
                    },
                    {
                        title: '商家优惠券',
                        type: '2'
                    }
                ],
                selected: '1',
                currentIndex: '0',
                coupon: {},
                couponList: [],
                loading: false,
                page: 0,
                loading: false
            }
        },
        components: {Coupon},
        mounted() {
        },
        methods: {
            typeChange(val, index) {
                this.currentIndex = index
                this.selected = val.type
            },
            getCoupon(page) {
                this.$post('coupon/getCouponList', {
                    token: this.$getCookie('token'),
                    type: this.selected,
                    page: page
                })
                    .then(res => {
                        this.coupon = res
                        if (page == '1') {
                            this.couponList = res.list
                        } else if (page > 1 && res.list != '') {
                            this.couponList = this.couponList.concat(res.list)
                        } else {
                            Toast({message: '没有数据啦', duration: 1000})
                        }
                    })
            },
            // 领取优惠券
            receiveCoupon(val, index) {
                this.$post('user/hanldeUserCoupon', {
                    coupon_id: val.coupon_id,
                    token: this.$getCookie('token')
                })
                    .then(res => {
                        Toast({
                            message: '领取成功',
                            duration: 1400
                        })
                        this.couponList[index].is_receive = '1'
                        this.getCoupon(1)
                    })
            },
            // 立即使用
            useCoupon(val, index) {
                if (val.store_id != '0') {     // 跳转到商家
                    if (this.$getCookie('terminal') == 'i') {
                        window.showStoreDetails(val.store_id)
                    } else if (this.$getCookie('terminal') == 'a') {
                        window.webview.showStoreDetails(val.store_id)
                    } else {
                        this.$router.push({
                            path: '/store/index',
                            query: {
                                store_id: val.store_id
                            }
                        })
                    }
                } else {            // 跳转到首页
                    if (this.$getCookie('terminal') == 'i') {
                        window.getHome()
                    } else if (this.$getCookie('terminal') == 'a') {
                        window.webview.getHome()
                    } else {
                        this.$router.push('/index')
                    }
                }
            },
            loadMore() {
                this.loading = true
                this.page++;
                this.getCoupon(this.page)
                this.loading = false
            },


        },
        watch: {
            selected(newVal, oldVal) {
                if (newVal != oldVal) {
                    this.page = 0;
                    this.couponList = []
                    this.loadMore()
                }

            }
        }
    }
</script>
<style scoped lang="scss">
    .coupon {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        min-height: 100%;
        .title {
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            top: 0;
            width: 750px;
            height: 80px;
            line-height: 80px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            background-color: #fff;
            border-bottom: 1px solid #eee;
            span {
                font-size: 28px;
            }
        }

        .couponDiv {
            padding: 0 23px;
            margin-top: 110px;
            ul {
                li {
                    margin-bottom: 20px;
                    background: url("../../imgs/coupon/icon-coupon-bg.png") no-repeat center /100%;
                    .top {
                        padding: 50px 30px 10px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: center;
                        .divTop {
                            position: relative;
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .divTopFl {
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                height: 80px;
                                > div {
                                    height: inherit;
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: space-around;
                                    align-items: center;
                                }
                                .money {
                                    p {
                                        text-align: center;
                                    }
                                }
                                .info {
                                    p {
                                        display: flex;
                                        justify-content: flex-start;
                                        align-items: center;
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
                                            overflow: hidden;
                                            -ms-text-overflow: ellipsis;
                                            text-overflow: ellipsis;
                                            white-space: nowrap;
                                        }
                                    }
                                }
                            }
                            .divTopFr {
                                button {
                                    width: 150px;
                                    height: 50px;
                                    line-height: 50px;
                                }
                                .noBtn {
                                    position: absolute;
                                    right: 0;
                                    top: 0;
                                    width: 132px;
                                    height: 132px;
                                    background: url("../../imgs/coupon/icon-button-overNumber.png") no-repeat center /100%;
                                }
                            }
                        }
                        .divBottom {
                            width: 100%;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            .vm-progress {
                                width: 360px;
                            }
                        }
                    }
                    .bottom {
                        padding: 30px;
                    }
                }

                /*正常的，button为立即领取或立即使用的样式*/
                .type1 {

                }
                /*已抢光*/
                .type2 {

                }
                .typeShare {
                    .divTopFl {
                        .info {
                            p {
                                span {
                                    width: 100% !important;
                                    line-height: 30px;
                                    max-height: 80px;
                                    white-space: normal !important;
                                }
                            }
                        }
                    }
                    .divTopFr {
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
                // 已领取未使用
                .nowUseBtn {
                    background: #FFF2F1;
                    color: #FF4862;
                    border: 2px solid #FF4862;
                }
                // 没有列表的
                .noCouponLi {
                    background: transparent;
                    .noCouponDiv {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        img {
                            width: 382px;
                            height: 304px;
                        }
                        p {
                            font-size: 28px;
                            color: #999;
                            margin: 50px 0;
                        }
                        a {
                            width: 310px;
                            height: 70px;
                            line-height: 70px;
                            background: linear-gradient(to right, #FF8484, #FF4862);
                            -webkit-border-radius: 8px;
                            -moz-border-radius: 8px;
                            border-radius: 8px;
                            color: #fff;
                            font-size: 28px;
                        }
                    }
                }
            }
        }

    }

</style>
