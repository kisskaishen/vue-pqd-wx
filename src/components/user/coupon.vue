<template>
    <div class="coupon">
        <ul  v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="100">
            <li>
                div
            </li>
            <!--<li v-for="item,index in couponList">-->
                <!--<div class="couponTop">-->
                    <!--<div class="couponTopFl">-->
                        <!--<div class="couponTopFl1">-->
                            <!--<p>￥<b>{{item.money}}</b></p>-->
                            <!--<span>满{{item.condition}}可用</span>-->
                        <!--</div>-->
                        <!--<div class="couponTopFl2">-->
                            <!--<p>{{item.store_id==''?'平台券':'商家券'}}：{{item.store_name}}</p>-->
                            <!--<span>-{{item.use_end_time}}</span>-->
                            <!--&lt;!&ndash;<span>-可叠加</span>&ndash;&gt;-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="couponTopFr" v-if="isShow">-->
                        <!--<span @click="chooseCoupon(item,index)">选择</span>-->
                    <!--</div>-->
                    <!--<div class="couponTopFr" v-else>-->
                        <!--<span @click="nowUse(item)">立即使用</span>-->
                        <!--&lt;!&ndash;<router-link to="/index" v-if="item.store_id==''"></router-link>&ndash;&gt;-->
                        <!--&lt;!&ndash;<router-link :to="'/store/index?store_id='+item.store_id" v-else>立即使用</router-link>&ndash;&gt;-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="couponBottom">-->
                    <!--<span>用户：{{userName}}</span>-->
                    <!--<span>限{{item.store_name||'平台'}}可用</span>-->
                <!--</div>-->
            <!--</li>-->
        </ul>

    </div>
</template>

<script>
    import {formatDate} from "../../config/date";

    export default {
        name: "coupon",
        props: ['list'],
        data() {
            return {
                userName: decodeURI(this.$getCookie('nickname')),
                isShow: this.$route.query.from == 'pay' ? true : false
            }
        },
        computed: {
            couponList() {
                return this.list
            }
        },
        mounted() {

        },
        filters: {
            formatDate(time) {
                var date = new Date(time * 1000)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            },
            formatDay(time) {
                var countDate = new Date(time * 1000) - new Date().getTime()
                return parseInt(countDate / 86400000)
            }
        },
        methods: {
            // 立即使用
            nowUse(val) {
                if (val.store_id == '') {
                    if (this.$getCookie('terminal') == 'i') {
                        window.getHome()
                    } else if (this.$getCookie('terminal') == 'a') {
                        window.webview.getHome()
                    } else {
                        this.$router.push('/index')
                    }
                } else {
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
                }
            },
            // 选择优惠券，返回到支付页面
            chooseCoupon(val, index) {
                if (this.$route.query.type=='platform') {
                    this.$router.push({
                        path: '/pay/index',
                        query: {
                            goods_id: this.$session.get('payQuery').goods_id,
                            goods_number: this.$session.get('payQuery').goods_number,
                            group_id: this.$session.get('payQuery').group_id,
                            order_class: this.$session.get('payQuery').order_class,
                            spec_key: this.$session.get('payQuery').spec_key,
                            platformCouponIndex: index
                        }
                    })
                } else if (this.$route.query.type=='merchat') {
                    this.$router.push({
                        path: '/pay/index',
                        query: {
                            goods_id: this.$session.get('payQuery').goods_id,
                            goods_number: this.$session.get('payQuery').goods_number,
                            group_id: this.$session.get('payQuery').group_id,
                            order_class: this.$session.get('payQuery').order_class,
                            spec_key: this.$session.get('payQuery').spec_key,
                            mechatCouponIndex: index
                        }
                    })
                }
            }
        }

    }
</script>

<style scoped lang="scss">
    .coupon {
        border: 2px solid #eee;
        ul {
            li {
                width: 698px;
                margin: 0 auto 20px;
                padding-top: 58px;
                background-color: #fff2f1;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                border-radius: 8px;
                .couponTop {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .couponTopFl {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        .couponTopFl1 {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            padding: 20px;
                            p {
                                color: #f61027;
                                font-size: 28px;
                                b {
                                    font-size: 58px;
                                }
                            }
                        }
                        .couponTopFl2 {
                            margin-left: 20px;
                            p {
                                width: 320px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                font-size: 28px;
                            }
                            span {
                                display: block;
                                color: #ccc;
                            }
                        }
                    }
                    .couponTopFr {
                        padding-right: 40px;
                        a, span {
                            display: block;
                            width: 120px;
                            padding: 4px 10px;
                            -webkit-border-radius: 42px;
                            -moz-border-radius: 42px;
                            border-radius: 42px;
                            margin-bottom: 10px;
                            color: #fff;
                            background-color: red;
                            text-align: center;
                        }
                        p {
                            color: #f61027;
                        }
                    }
                }
                .couponBottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 20px;
                    border-top: 2px dashed #EDC9C9;
                    span {
                        color: #ccc;
                    }
                }
            }
        }
        > p {
            text-align: center;
            margin-top: 20px;
        }
    }
</style>
