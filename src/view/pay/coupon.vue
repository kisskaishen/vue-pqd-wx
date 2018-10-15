<template>
    <div class="myCoupon">
        <div class="couponDiv">
            <ul v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="100"
                infinite-scroll-immediate-check="false">
                <li v-for="item,index in couponList">
                    <div class="top">
                        <div class="divFl">
                            <div class="money">
                                <p class="red">￥<span>{{item.money}}</span></p>
                                <p>满{{item.condition_money}}可用</p>
                            </div>
                            <div class="info">
                                <p>{{item.store_name||item.coupon_name}}</p>
                                <p>有效期至{{item.use_end_time}}</p>
                            </div>
                        </div>
                        <div class="divFr">
                            <button @click="toUse(item,index)">立即使用</button>
                        </div>
                    </div>
                    <div class="bottom">
                        {{item.coupon_name}}
                    </div>
                </li>
            </ul>
            <!--<router-link v-if="selected=='1'&&couponList!=''&&this.$route.query.from!='pay'" to="/coupon/index">领取优惠券-->
            <!--</router-link>-->
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
                sessionList: [],             // 从订单页面拿到的优惠券的数据
                couponList: [],
                page: 1,
                iconTopShow: false
            }
        },
        components: {Coupon},
        mounted() {
            window.addEventListener('scroll', this.handScroll)
            this.sessionList = this.$route.query.type == 'platform' ? this.$session.get('usePlatformCouponList') : this.$session.get('useMerchatCouponList')
            this.couponList = this.sessionList
        },
        methods: {
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
                if (this.$route.query.type == 'merchat') {
                    this.$router.push({
                        path: '/pay/index',
                        query: {
                            goods_id: this.$route.query.goods_id,
                            goods_number: this.$route.query.goods_number,
                            spec_key: this.$route.query.spec_key,
                            order_class: this.$route.query.order_class,
                            group_id: this.$route.query.group_id,
                            is_group: this.$route.query.is_group,
                            usePlatform: this.$route.query.usePlatform,
                            mechatCouponIndex: index,
                        }
                    })
                } else if (this.$route.query.type == 'platform') {
                    this.$router.push({
                        path: '/pay/index',
                        query: {
                            goods_id: this.$route.query.goods_id,
                            goods_number: this.$route.query.goods_number,
                            spec_key: this.$route.query.spec_key,
                            order_class: this.$route.query.order_class,
                            group_id: this.$route.query.group_id,
                            is_group: this.$route.query.is_group,
                            useMerchat: this.$route.query.useMerchat,
                            platformCouponIndex: index,
                        }
                    })
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
                if (this.$route.query.type == 'merchat') {
                    this.$router.push({
                        path: '/pay/index',
                        query: {
                            goods_id: this.$route.query.goods_id,
                            goods_number: this.$route.query.goods_number,
                            spec_key: this.$route.query.spec_key,
                            order_class: this.$route.query.order_class,
                            group_id: this.$route.query.group_id,
                            is_group: this.$route.query.is_group,
                            usePlatform: this.$route.query.usePlatform,
                            useMerchat: 'no'
                        }
                    })
                } else if (this.$route.query.type == 'platform') {
                    this.$router.push({
                        path: '/pay/index',
                        query: {
                            goods_id: this.$route.query.goods_id,
                            goods_number: this.$route.query.goods_number,
                            spec_key: this.$route.query.spec_key,
                            order_class: this.$route.query.order_class,
                            group_id: this.$route.query.group_id,
                            is_group: this.$route.query.is_group,
                            useMerchat: this.$route.query.useMerchat,
                            usePlatform: 'no'
                        }
                    })
                }

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
        background-color: #fff;
        .couponDiv {
            padding: 0 26px;
            margin-top: 90px;
            ul {
                padding-bottom: 100px;
                li {
                    margin-bottom: 30px;
                    .top {
                        padding: 50px 30px;
                        -webkit-border-radius: 8px 8px 20px 20px;
                        -moz-border-radius: 8px 8px 20px 20px;
                        border-radius: 8px 8px 20px 20px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background-color: #FFF2F1;
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
                                    color: #FF8484;
                                }
                                .red {
                                    font-size: 28px;
                                    span {
                                        width: auto;
                                        font-size: 58px;
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
                                    line-height: 44px;
                                    width: 320px;
                                    overflow: hidden;
                                    -ms-text-overflow: ellipsis;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    &:nth-child(1) {
                                        font-size: 28px;
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
                                color: #fff;
                                font-size: 24px;
                                min-width: 140px;
                                padding: 8px 20px;
                                -webkit-border-radius: 50px;
                                -moz-border-radius: 50px;
                                border-radius: 50px;
                                background: linear-gradient(to right, #FF8484, #FF4862);
                            }
                        }
                    }
                    .bottom {
                        background-color: #FFF2F1;
                        padding: 16px 30px;
                        -webkit-border-radius: 20px 20px 8px 8px;
                        -moz-border-radius: 20px 20px 8px 8px;
                        border-radius: 20px 20px 8px 8px;
                        border-top: 2px dashed #EDC9C9;
                    }
                }
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
