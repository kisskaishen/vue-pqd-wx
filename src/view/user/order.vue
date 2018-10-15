<template>
    <div class="order">
        <div class="swiperDiv">
            <swiper :options="swiperOptionTap" ref="mySwiperTap">
                <swiper-slide v-for="item,index in swiperData" :key="item.id"
                              :class="index==activeIndex?'active':''">
                    <span>{{item.name}}</span>
                </swiper-slide>
            </swiper>
        </div>
        <div class="list">
            <swiper :options="swiperOptionCon" ref="mySwiperCon">
                <swiper-slide>
                    <ul class="noOrderList" v-if="list==''&&total!='0'">
                        <li v-for="item in 6">
                            <img src="../../imgs/base/icon-ranking-list.png" alt="">
                        </li>
                    </ul>
                    <ul v-infinite-scroll="loadMore"
                        infinite-scroll-disabled="loading"
                        infinite-scroll-immediate-check=false
                        infinite-scroll-distance="100" v-if="list!=''">
                        <li v-for="item,index in list" v-if="list!=''&&list.length>0">
                            <!--商家信息-->
                            <router-link :to="'/store/index?store_id='+item.store_id">
                                <div class="store">
                                    <div>
                                        <img :src="item.store_logo" alt="">
                                        <span>
                                            <span>{{item.store_name}}</span>
                                            <i></i>
                                        </span>
                                    </div>
                                    <div>
                                        <span :class="item.status_info=='待付款'?'red':''">{{item.status_info}}</span>
                                    </div>
                                </div>
                            </router-link>
                            <!--商品信息-->
                            <router-link :to="'/order/detail?order_sn='+item.order_sn">
                                <div class="goods">
                                    <div class="divFl">
                                        <img :src="item.list_img" alt="商品图片">
                                    </div>
                                    <div class="divFr">
                                        <p class="goodsName">{{item.goods_name}}</p>
                                        <p>
                                            <span>{{item.spec_key_name}}</span>
                                            <label>x{{item.goods_num}}</label>
                                        </p>
                                        <p class="money">
                                            实付：<b class="red">￥{{item.order_amount}}</b><span>（免运费）</span>
                                        </p>
                                    </div>
                                </div>
                            </router-link>
                            <div class="operate">
                                <button class="cancelBtn" v-if="item.button.is_cancel_order=='1'"
                                        @click="cancelOrder(item,index)">取消订单
                                </button>
                                <button v-if="item.button.is_remind_goods=='1'"
                                        @click="remindDelivery(item,index)">提醒发货
                                </button>
                                <button v-if="item.button.is_extend_goods=='1'"
                                        @click="extend(item,index)">延长收货
                                </button>
                                <button v-if="item.button.is_shipping_info=='1'"
                                        @click="goLogistics(item,index)">查看物流
                                </button>
                                <button class="sureBtn" v-if="item.button.is_confirm_goods=='1'"
                                        @click="sureGet(item,index)">确认收货
                                </button>
                                <button class="sureBtn" v-if="item.button.is_pay_order=='1'" @click="goPay(item)">立即支付
                                </button>
                                <button class="sureBtn" v-if="item.button.is_comment=='1'" @click="goReview(item)">评价
                                </button>
                                <button class="sureBtn" v-if="item.button.is_append_comment=='1'"
                                        @click="goZhuiReview(item)">追加评价
                                </button>
                                <!--<i class="delete"></i>-->
                            </div>
                        </li>
                    </ul>

                    <div class="noListDiv" v-if="list==''&&total=='0'">
                        <img src="../../imgs/order/icon-no-order.png" alt="">
                        <span>暂无订单</span>
                    </div>
                </swiper-slide>
            </swiper>
            <div :class="iconTopShow?'toTop':''" @click="toTopClick"><span></span></div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import {MessageBox} from 'mint-ui';

    export default {
        name: "order",
        data() {
            return {
                swiperOptionTap: {
                    notNextTick: true,
                    freeMode: true,
                    freeModeMomentumRatio: 0.5,
                    slidesPerView: 'auto',
                    preventClicks: true,
                    onClick: this.activeClick
                },
                swiperOptionCon: {},
                swiperData: [
                    {
                        id: '0',
                        name: '全部'
                    },
                    {
                        id: '3',
                        name: '待付款'
                    },
                    {
                        id: '6',
                        name: '待分享'
                    },
                    {
                        id: '1',
                        name: '待发货'
                    },
                    {
                        id: '2',
                        name: '待收货'
                    },
                    {
                        id: '7',
                        name: '待评价'
                    },
                    {
                        id: '4',
                        name: '已完成'
                    },
                    {
                        id: '5',
                        name: '售后'
                    }

                ],
                activeIndex: this.$route.query.type ? this.$route.query.type : '0',
                loading: false,
                // list: [{button: {}}],
                list: [],
                page: 1,
                iconTopShow: false,
                type: this.$route.query.type ? this.$route.query.type : '0',
                total: 1
            }
        },

        mounted() {
            window.addEventListener('scroll', this.handScroll)
            for (let i = 0; i < this.swiperData.length; i++) {
                if (this.$route.query.type == this.swiperData[i].id) {
                    this.activeIndex = i
                }
            }
            this.getOrderList(1)
        },
        methods: {
            // 点击swiper
            activeClick(val) {
                this.activeIndex = val.clickedIndex
                this.swiperCenter(val)
                this.type = this.swiperData[this.activeIndex].id
                this.page = 1
                this.getOrderList(this.page)
            },
            // 居中显示
            swiperCenter(swiper) {
                const swiperWidth = swiper.container[0].clientWidth     // 屏幕宽度
                const maxTranslate = swiper.maxTranslate()      // 可滑动的总宽度（最左边和最右边的总宽）
                const maxWidth = -maxTranslate + swiperWidth / 2


                let slide = swiper.slides[swiper.clickedIndex]
                let slideLeft = slide.offsetLeft
                let slideWidth = slide.clientWidth
                let slideCenter = slideLeft + slideWidth / 2
                swiper.setWrapperTransition(300)
                if (slideCenter < swiperWidth / 2) {
                    swiper.setWrapperTranslate(0)
                } else if (slideCenter > maxWidth) {
                    swiper.setWrapperTranslate(maxTranslate)
                } else {
                    let nowTranslate = slideCenter - swiperWidth / 2
                    swiper.setWrapperTranslate(-nowTranslate)
                }
            },
            // 获取订单列表
            getOrderList(page) {
                this.$post('user/getOrderList', {
                    token: this.$getCookie('token'),
                    type: this.type,
                    page: page
                })
                    .then(res => {
                        this.total = res.total
                        if (page == '1') {
                            if (res.list == '') {
                                this.list = ''
                            } else {
                                this.list = res.list
                            }
                        } else {
                            if (res.list == '') {

                            } else {
                                this.list = this.list.concat(res.list)
                            }
                        }
                    })
            },
            // 回到顶部
            toTopClick() {
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                window.pageYOffset = 0
            },
            // 取消订单
            cancelOrder(val, index) {
                this.$post('user/cancelOrder', {
                    order_sn: val.order_sn,
                    token: this.$getCookie('token')
                })
                    .then(res => {
                        this.list[index].button.is_cancel_order = 0
                        Toast({
                            message: '取消成功',
                            duration: 1200
                        })

                    })
            },
            // 延长收货
            extend(val, index) {
                MessageBox.confirm('是否延长收货时间？每笔订单只能延长一次哦~', '提示').then(res => {
                    this.$post('user/extendCollectGoods', {
                        order_sn: val.order_sn,
                        token: this.$getCookie('token')
                    })
                        .then(res => {
                            this.list[index].button.is_extend_goods = 0
                            Toast({
                                message: '已延长收货',
                                duration: 1400
                            })
                        })
                })


            },
            // 提醒发货
            remindDelivery(val, index) {
                this.$post('user/remindGoods', {
                    order_sn: val.order_sn,
                    token: this.$getCookie('token')
                })
                    .then(res => {
                        this.list[index].button.is_remind_goods = 0

                        Toast({
                            message: '提醒发货成功',
                            duration: 1200
                        })
                    })
            },
            // 查看物流->跳转到物流详情页面
            goLogistics(val) {
                this.$router.push({
                    path: '/order/logistics',
                    query: {
                        order_sn: val.order_sn
                    }
                })
            },
            // 立即支付->跳转到详情页
            goPay(val) {
                this.$router.push({
                    path: '/order/detail',
                    query: {
                        order_sn: val.order_sn
                    }
                })
            },
            // 去评价
            goReview(val) {
                this.$router.push({
                    path: '/order/review',
                    query: {
                        order_sn: val.order_sn
                    }
                })
            },
            // 去追评
            goZhuiReview(val) {
                this.$router.push({
                    path: '/order/review',
                    query: {
                        order_sn: val.order_sn,
                        type: 'zhui'
                    }
                })
            },
            // 确认收货
            sureGet(val, index) {
                MessageBox.confirm('提交后该订单状态不可更改，要确认收货么？', '提示').then(res => {
                    this.$post('user/confirmGoods', {
                        order_sn: val.order_sn,
                        token: this.$getCookie('token')
                    })
                        .then(res => {
                            this.list[index].button.is_confirm_goods = '0'

                            Toast({
                                message: '已确认收货',
                                duration: 1400
                            })
                        })
                })
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
            // 加载更多
            loadMore() {
                this.loading = true
                this.page++;
                this.getOrderList(this.page)
                this.loading = false
            }
        }
    }
</script>

<style lang="scss">
    .swiperDiv {
        .swiper-wrapper {
            display: flex;
            justify-content: space-between;
        }
    }
</style>
<style scoped lang="scss">
    .order {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 0;
        right: 0;
        bottom: 0;
        width: 750px;
        background-color: #fff;
    }

    .swiperDiv {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 750px;
        background-color: #fff;
        z-index: 9;
        border-bottom: 2px solid #eee;
        .swiper-container {
            width: 100%;
            overflow: hidden;
            .swiper-slide {
                width: auto !important;
                text-align: center;
                padding: 22px 24px;

                span {
                    display: block;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    font-size: 28px;
                    font-family: PingFang-SC-Medium;
                }
            }
            .active {
                color: #FF4862;
                /*border-bottom: 2px solid red;*/
            }
        }
    }

    .list {
        position: relative;
        width: 100%;
        margin-top: 86px;
        .swiper-container {
            .swiper-slide {
                .noOrderList {
                    li {
                        img {
                            width: 698px;
                            margin: 0 auto;
                        }
                    }
                }
                ul {
                    li {
                        background-color: #fff;
                        padding: 40px 0;
                        border-bottom: 1px solid #eee;
                        a {
                            display: block;
                            padding: 0 26px;
                            .store {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                div {
                                    display: flex;
                                    justify-content: flex-start;
                                    align-items: center;
                                    img {
                                        display: block;
                                        width: 58px;
                                        height: 58px;
                                        margin-right: 10px;
                                    }
                                    span {
                                        display: flex;
                                        justify-content: flex-start;
                                        align-items: center;
                                        font-size: 24px;
                                        span {
                                            color: #333;
                                        }
                                        i {
                                            width: 10px;
                                            height: 18px;
                                            margin-left: 18px;
                                            background: url("../../imgs/order/icon-arrow-right.png") no-repeat center /100%;
                                        }
                                    }
                                }
                                .red {
                                    font-size: 28px;
                                }
                            }
                            .goods {
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                background-color: #fff;
                                margin: 20px 0;
                                .divFl {
                                    display: flex;
                                    justify-content: flex-start;
                                    align-items: center;
                                    margin-right: 20px;
                                    img {
                                        width: 180px;
                                        height: 180px;
                                        margin: 0;
                                    }
                                }
                                .divFr {
                                    width: 100%;
                                    display: flex;
                                    flex-direction: column;
                                    align-self: flex-start;
                                    text-align: left;
                                    .goodsName {
                                        align-items: flex-start;
                                        font-size: 30px;
                                        color: #333;
                                        line-height: 36px;
                                        height: 68px;
                                        overflow: hidden;
                                        margin-bottom: 20px;
                                    }
                                    p {
                                        width: 100%;
                                        display: flex;
                                        justify-content: space-between;
                                        align-items: center;
                                        span {
                                            color: #999;
                                            font-size: 24px;
                                        }
                                        label {
                                            font-size: 28px;
                                            color: #333;
                                        }
                                    }
                                    .money {
                                        justify-content: flex-start;
                                        font-size: 24px;
                                        color: #333;
                                        margin-top: 30px;
                                        b {
                                            font-size: 32px;
                                        }
                                        span {
                                            color: #999;
                                        }
                                    }
                                }
                            }
                        }
                        .operate {
                            display: flex;
                            justify-content: flex-end;
                            align-items: center;
                            padding: 0 26px;
                            button {
                                margin-left: 20px;
                                font-size: 28px;
                                padding: 10px 26px;
                                -webkit-border-radius: 8px;
                                -moz-border-radius: 8px;
                                border-radius: 8px;
                                border: 2px solid #ccc;
                                background: transparent;
                                color: #4c4c4c;
                            }
                            .sureBtn {
                                border: 2px solid #FF4862;
                                color: #fff;
                                background-color: #FF4862;
                            }
                            .cancelBtn {
                                color: #999;
                            }
                            .delete {
                                margin-left: 74px;
                                width: 30px;
                                height: 34px;
                                background: url("../../imgs/order/icon-delete.png") no-repeat center /100%;
                            }
                        }
                    }
                }
                .noListDiv {
                    img {
                        width: 422px;
                        height: 304px;
                        margin: 140px auto 50px;
                    }
                    span {
                        display: block;
                        font-size: 28px;
                        color: #999;
                        width: 100%;
                        text-align: center;
                    }
                }
            }
        }

    }

</style>
