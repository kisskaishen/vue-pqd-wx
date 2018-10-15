<template>
    <div class="coupon">
        <ul>
            <li v-for="item,index in couponList">
                <div class="couponTop">
                    <div class="couponTopFl">
                        <div class="couponTopFl1">
                            <img :src="item.store_logo" alt="">
                            <p>{{item.store_name}}</p>
                        </div>
                        <div class="couponTopFl2">
                            <p style="padding: 6px 0;">{{item.coupon_name}}</p>
                            <p class="price">￥<b>{{item.money}}</b></p>
                            <span>--可叠加使用</span>
                            <span>--满{{item.condition_money}}减{{item.money}}</span>
                        </div>
                    </div>
                    <div class="couponTopFr">
                        <vm-progress v-if="item.is_receive == '2'" type="circle" :percentage="item.ratio"
                                     stroke-color="#105cf6" :width="40" :stroke-width="4"></vm-progress>
                        <vm-progress v-if="item.is_receive == '1'" type="circle" :percentage="item.ratio"
                                     stroke-color="#f61027" :width="40" :stroke-width="4"></vm-progress>
                        <vm-progress v-if="item.is_receive == '0'" type="circle" :percentage="item.send_num"
                                     stroke-color="#ef4f4f" :width="40" :stroke-width="4"></vm-progress>
                        <vm-progress v-if="item.is_receive == '3'" type="circle" :percentage="item.send_num"
                                     stroke-color="#f69d10" :width="40" :stroke-width="4"></vm-progress>
                        <countDown v-if="item.is_receive == '2'" :index="index" :endTime="item.start_time"></countDown>
                        <!--<mt-button type="danger" v-if="item.is_receive == '0'" @click.capture="getCoupon(item)">领取-->
                        <!--</mt-button>-->
                        <mt-button type="danger" v-if="item.is_receive == '0'" @click="receiveCoupon(item,index)">领取
                        </mt-button>
                        <mt-button type="danger" disabled v-if="item.is_receive == '1'">已领取</mt-button>
                        <mt-button type="danger" disabled v-if="item.is_receive == '3'">已抢光</mt-button>
                    </div>
                </div>
                <div class="couponBottom">
                    <span>活动有效期到{{item.send_end_time}}</span>
                    <span>{{item.tips}}</span>
                </div>
            </li>
        </ul>
        <p>------我是有底线的------</p>
    </div>
</template>

<script>
    import CountDown from './countDown'
    import {Toast} from 'mint-ui'

    export default {
        name: "coupon",
        props: ['list','id'],
        data() {
            return {
            }
        },
        computed: {
            couponList() {
                return this.list
            }
        },
        components: {CountDown},
        mounted() {
        },

        methods: {
            // goIndex(val) {
            //     if (this.id == '1') {
            //         if (this.$getCookie('terminal') == 'i') {
            //             window.getHome()
            //         } else if (this.$getCookie('terminal') == 'a') {
            //             window.webview.getHome()
            //         } else {
            //             this.$router.push('/index')
            //         }
            //     } else if (this.id=='2'){
            //         if (this.$getCookie('terminal') == 'i') {
            //             window.showStoreDetails(val.store_id)
            //         } else if (this.$getCookie('terminal') == 'a') {
            //             window.webview.showStoreDetails(val.store_id)
            //         } else {
            //             this.$router.push({
            //                 path:'/store/index',
            //                 query:{
            //                     store_id:val.store_id
            //                 }
            //             })
            //         }
            //
            //
            //     }
            // },
            receiveCoupon(val,index) {
                this.$post('user/hanldeUserCoupon', {
                    coupon_id: val.coupon_id,
                    token: this.$getCookie('token')
                })
                    .then(res => {
                        Toast({
                            message: '领取成功',
                            duration: 1400
                        })
                        this.list[index].is_receive = '1'
                    })

            }
        }

    }
</script>

<style scoped lang="scss">
    .coupon {
        ul {
            li {
                width: 720px;
                margin: 0 auto 20px;
                background-color: #fff;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                text-align: left;
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
                            border-right: 1px solid #eee;
                            img {
                                display: block;
                                width: 76px;
                                height: 76px;
                                -webkit-border-radius: 50%;
                                -moz-border-radius: 50%;
                                border-radius: 50%;
                            }
                            p {
                                width: 120px;
                                text-align: center;
                                overflow: hidden;
                                -ms-text-overflow: ellipsis;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                        .couponTopFl2 {
                            margin-left: 20px;
                            p {
                                color: #333;
                                font-size: 26px;
                                b {
                                    font-size: 34px;
                                }
                            }
                            span {
                                display: block;
                                color: #ccc;
                            }
                            .price {
                                color: #105cf6;
                            }
                        }
                    }
                    .couponTopFr {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: flex-end;
                        justify-content: center;
                        padding-right: 40px;

                    }
                }
                .couponBottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #FBFBFB;
                    padding: 10px 20px;
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
