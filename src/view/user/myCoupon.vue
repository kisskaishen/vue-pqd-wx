<template>
    <div class="myCoupon">
        <div class="title" v-if="this.$route.query.from!='pay'">
            <span v-for="item,index in titles" @click="typeChange(item,index)" :class="index==currentIndex?'red':''">{{item.title}}</span>
        </div>

        <div class="couponDiv">
            <ul v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="100">
                <li v-for="item,index in couponList" v-if="selected=='1'" class="type1">
                    <div class="top">
                        <div class="divFl">
                            <div class="money">
                                <p class="cFF4862"><span class="fz28">￥</span><span
                                    class="fz56 fwbold">{{item.money}}</span></p>
                                <p class="c666 fz22">满{{item.condition}}可用</p>
                            </div>
                            <div class="info">
                                <p>
                                    <i :class="item.store_id==''?'platformIcon':'merchatIcon'"></i>
                                    <span class="overFlow1">{{item.store_name||item.coupon_name}}</span>
                                </p>
                                <p class="cB2B2B2">{{item.use_end_time}}</p>
                            </div>
                        </div>
                        <div class="divFr">
                            <button @click="toUse(item,val)" class="cFF4862">立即使用</button>
                        </div>
                    </div>
                    <div class="bottom cB2B2B2 overFlow1">
                        {{item.coupon_name}}
                    </div>
                </li>
                <li v-if="couponList==''" class="noCouponLi">
                    <div class="noCouponDiv">
                        <img src="../../imgs/coupon/icon-no-coupon.png" alt="">
                        <p>优惠券 · 空空如也</p>
                        <router-link to="/coupon/index" v-if="selected=='1'&&couponList==''">领取优惠券</router-link>
                    </div>
                </li>
                <li v-for="item,index in couponList" v-if="selected=='2'" class="type2">
                    <div class="top">
                        <div class="divFl">
                            <div class="money">
                                <p class="c999">
                                    <span class="fz28">￥</span>
                                    <span class="fz56">{{item.money}}</span>
                                </p>
                                <p class="c999 fz22">满{{item.condition}}可用</p>
                            </div>
                            <div class="info">
                                <p>
                                    <i :class="item.store_id==''?'platformIconed':'merchatIconed'"></i>
                                    <span class="overFlow1 cb2b2b2">{{item.store_name||item.coupon_name}}</span>
                                </p>
                                <p class="cb2b2b2">{{item.use_end_time}}</p>
                            </div>
                        </div>
                        <div class="divFr">
                            <button class="breee bgeee cb2b2b2">已使用</button>
                        </div>
                    </div>
                    <div class="bottom cb2b2b2 overFlow1">
                        {{item.coupon_name}}
                    </div>
                </li>
                <li v-for="item,index in couponList" v-if="selected=='3'" class="type2 type3">
                    <div class="top">
                        <div class="divFl">
                            <div class="money">
                                <p class="c999">
                                    <span class="fz28">￥</span>
                                    <span class="fz56">{{item.money}}</span>
                                </p>
                                <p class="c999 fz22">满{{item.condition}}可用</p>
                            </div>
                            <div class="info">
                                <p>
                                    <i :class="item.store_id==''?'platformIconed':'merchatIconed'"></i>
                                    <span class="overFlow1 cb2b2b2">{{item.store_name||item.coupon_name}}</span>
                                </p>
                                <p class="cb2b2b2">{{item.use_end_time}}</p>
                            </div>
                        </div>
                        <div class="divFr">
                            <img src="../../imgs/coupon/icon-button-overTime.png" alt="">
                        </div>
                    </div>
                    <div class="bottom cb2b2b2 overFlow1">
                        {{item.coupon_name}}
                    </div>
                </li>
            </ul>
            <router-link v-if="selected=='1'&&couponList!=''&&this.$route.query.from!='pay'" to="/coupon/index">领取优惠券
            </router-link>
            <button v-if="this.$route.query.from=='pay'" class="noUseCouponA" @click="noUserCoupon">不使用优惠券</button>
        </div>
    </div>
</template>

<script>
    import Coupon from '../../components/user/coupon';
    import {Toast} from 'mint-ui';

    export default {
        name: "my-coupon",
        data() {
            return {
                titles: [
                    {
                        title: '未使用',
                        type: '1'
                    },
                    {
                        title: '已使用',
                        type: '2'
                    },
                    {
                        title: '已过期',
                        type: '3'
                    }
                ],
                selected: '1',
                currentIndex: '0',
                couponList: [],
                sessionList: [],             // 从订单页面拿到的优惠券的数据
                page: 0,
                iconTopShow: false
            }
        },
        components: {Coupon},
        mounted() {
            window.addEventListener('scroll', this.handScroll)
            if (this.$route.query.type) {
                this.sessionList = this.$route.query.type == 'platform' ? this.$session.get('usePlatformCouponList') : this.$session.get('useMerchatCouponList')
                this.couponList = this.sessionList
            } else {
                this.getCoupon(1)
            }

        },
        methods: {
            // title选择
            typeChange(val, index) {
                this.currentIndex = index
                this.selected = val.type
                this.page = 0
            },
            getCoupon(page) {
                this.$post('user/getCouponList', {
                    type: this.selected,
                    token: this.$getCookie('token'),
                    page: page
                })
                    .then(res => {
                        if (page == '1' && res.total_page > '0') {
                            this.couponList = res.list
                        } else {
                            if (res.list == '') {
                                // Toast({message: '没有更多数据啦', duration: 1000})
                            } else {
                                this.couponList = this.couponList.concat(res.list)
                            }
                        }
                    })
            },
            loadMore() {
                this.loading = true
                this.page++;
                if (this.page > 1) {
                    this.getCoupon(this.page)
                }
                this.loading = false
            },
            // 去使用优惠券
            toUse(val, index) {
                if (val.store_id != '') {     // 跳转到商家
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
            toTopClick() {
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                window.pageYOffset = 0
            },

            // 监听滚动方法
            handScroll() {
                this.scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
                if (this.scrollTop > 156) {
                    this.iconTopShow = true
                } else {
                    this.iconTopShow = false
                }
            },
            // 不使用优惠券
            noUserCoupon() {
                this.$router.push({
                    path: '/pay/index',
                    query: {
                        goods_id: this.$route.query.goods_id,
                        goods_number: this.$route.query.goods_number,
                        spec_key: this.$route.query.spec_key,
                        order_class: this.$route.query.order_class,
                        group_id: this.$route.query.group_id,
                        is_group: this.$route.query.is_group,
                        usePlatform: 'no',
                    }
                })
            }
        },
        watch: {
            selected(val) {
                this.couponList = []
                this.selected = val
                this.page = 1
                this.toTopClick()
                this.getCoupon(this.page)

            }
        }
    }
</script>

<style scoped lang="scss">
    .myCoupon {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        min-height: 100%;
        background-color: #F5F5F5;
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
            margin-top: 90px;
            ul {
                padding-bottom: 100px;
                li {
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
                                width: 180px;
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
                                margin-left: 10px;
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
                                        overflow: hidden;
                                        -ms-text-overflow: ellipsis;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
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
                                font-size: 24px;
                                width: 150px;
                                height: 50px;
                                line-height: 50px;
                                -webkit-border-radius: 50px;
                                -moz-border-radius: 50px;
                                border-radius: 50px;
                                /*background: linear-gradient(to right, #FF8484, #FF4862);*/
                                background-color: #fff;
                                border: 2px solid #FF4862;
                            }
                        }
                    }
                    .bottom {
                        padding: 16px 30px;
                    }
                }
                /*未使用*/
                .type1 {

                }
                /*已使用/已过期*/
                .type2 {

                }
                /*已过期*/
                .type3 {
                    position: relative;
                    .divFr {
                        img {
                            position: absolute;
                            right: 0;
                            top: 10px;
                            width: 132px;
                            height: 132px;
                        }
                    }
                }
                .noCouponLi {
                    background: transparent;
                    .noCouponDiv {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding-top: 60px;
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
            > a {
                position: fixed;
                bottom: 20px;
                width: 698px;
                height: 98px;
                line-height: 98px;
                color: #fff;
                font-size: 32px;
                background-color: #FF4862;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                border-radius: 8px;
            }
            .noUseCouponA {
                position: fixed;
                bottom: 20px;
                width: 698px;
                height: 98px;
                line-height: 98px;
                color: #FF4862;
                font-size: 32px;
                border: 2px solid #FF4862;
                background: #fff;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                border-radius: 8px;
            }
        }
    }

</style>
