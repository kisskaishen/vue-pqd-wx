<template>
    <div class="orderDetail">
        <div class="orderInfo">
            <div class="status">
                <p>{{orderInfo.status_info}}</p>
                <span v-if="JSON.stringify(orderInfo.tips)!='{}'&&orderInfo.tips.time!='0'">
                    <count-down :endTime="orderInfo.tips.time"></count-down>
                </span>
                <span v-if="orderInfo.tips.title">{{orderInfo.tips.title}}</span>
                <!--<span v-if="orderInfo.status_info=='待付款'">-->
                <!--&lt;!&ndash;请在<span class="red">26:35</span>分钟内付款&ndash;&gt;-->
                <!--请尽快支付，逾期将取消订单</span>-->
                <!--<span v-if="orderInfo.status_info=='待发货'">卖家正在马不停蹄的备货中，请耐心等待</span>-->
                <!--<span v-if="orderInfo.status_info=='待收货'">还剩<span class="red">26时8分</span>自动确认</span>-->
                <!--<span v-if="orderInfo.status_info=='交易完成'">赶紧去拆开包裹吧</span>-->
                <!--<div class="buttonDiv">-->
                <!--<button v-if="orderInfo.detail_order_service_button.title" @click="applyService">{{orderInfo.detail_order_service_button.title}}</button>-->
                <!--<button><i></i>联系卖家</button>-->
                <!--</div>-->
            </div>
            <div class="logisticsDiv">
                <router-link :to="'/order/logistics?order_sn='+orderInfo.order_sn" v-for="item,index in logistics"
                             :key="item.time" v-if="index=='0'">
                    <div class="divFl">
                        <img src="../../imgs/order/icon-logistics.png" alt="">
                        <div class="divFlCont">
                            <!--<p>查看物流详情</p>-->
                            <p>{{item.context}}</p>
                            <span>{{item.time}}</span>
                        </div>
                    </div>
                    <div class="divFr">
                        <img src="../../imgs/order/icon-arrow-right.png" alt="">
                    </div>
                </router-link>
            </div>
            <div class="address">
                <img src="../../imgs/pay/icon-address.png" alt="">
                <div class="addressInfo">
                    <p><b>{{orderInfo.shipping_info.consignee}}</b> {{orderInfo.shipping_info.mobile}}</p>
                    <p>{{orderInfo.shipping_info.address}}</p>
                </div>
            </div>
            <div class="hr"></div>
            <div class="goodsDiv">
                <div class="store">
                    <router-link :to="'/store/index?store_id='+orderInfo.store_id">
                        <div>
                            <img :src="orderInfo.store_logo" alt="">
                            <span>
                                <span>{{orderInfo.store_name}}</span>
                                <i></i>
                            </span>
                        </div>
                        <!--<div>-->
                        <!--<span class="red">{{orderInfo.status_info}}</span>-->
                        <!--</div>-->
                    </router-link>
                </div>
                <div class="goods">
                    <router-link :to="'/detail/index?goods_id='+orderInfo.goods_id+'&store_id='+orderInfo.store_id">
                        <div class="divFl">
                            <img :src="orderInfo.list_img" alt="商品图片">
                        </div>

                        <div class="divFr">
                            <p class="goodsName">{{orderInfo.goods_name}}</p>
                            <p>
                                <span>{{orderInfo.spec_key_name}}</span>
                                <label>x{{orderInfo.goods_num}}</label>
                            </p>
                            <p class="money">
                                实付：<b class="red">￥{{orderInfo.order_amount}}</b><span>（免运费）</span>
                            </p>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="groupInfo" v-if="orderInfo.order_class=='2'&&JSON.stringify(orderInfo.group)!='{}'">
                <div class="divTop">
                    <img src="../../imgs/order/icon-pintuan.png" alt="">
                    <span v-if="orderInfo.group.need_num!='0'">正在拼团，还差{{orderInfo.group.need_num}}人
                        <group-count-down :endTime="orderInfo.group.end_time"></group-count-down>
                        </span>
                    <span v-else>拼团成功</span>
                </div>
                <div class="divBottom">
                    <div class="divFl">
                        <img :src="item.photo" alt="" v-for="item in orderInfo.group.list || 2">
                        <img src="../../imgs/order/icon-waiting-header.png" alt="" v-if="orderInfo.group.need_num!='0'">
                    </div>
                    <div class="divFr">
                        <button @click="goGroup(orderInfo.group)">
                            {{orderInfo.group.button_title||'拼团详情'}}
                        </button>
                    </div>
                </div>
            </div>
            <div class="payDiv" v-if="orderInfo.button.is_pay_order=='1'">
                <div class="divFl">
                    <img src="../../imgs/pay/icon-ali-pay.png" alt="" v-if="orderInfo.pay_code=='alipayweb'">
                    <img src="../../imgs/pay/icon-wx-pay.png" alt="" v-else>
                    <span>{{orderInfo.pay_name}}</span>
                </div>
                <div class="divFr">
                    <i></i>
                </div>
            </div>
            <div class="contact">
                <div>
                    <router-link :to="'/chat/index?goods_id='+orderInfo.goods_id+'&store_id='+orderInfo.store_id">
                        <i></i><span>联系卖家</span>
                    </router-link>
                </div>
                <div>
                    <a :href="'tel:'+orderInfo.store_mobile">
                        <i></i><span>拨打电话</span>
                    </a>
                </div>
            </div>
            <div class="orderDiv">
                <p>订单编号：{{orderInfo.order_sn}}</p>
                <p>支付方式：{{orderInfo.pay_name}}</p>
                <p>下单时间：{{orderInfo.add_time}}</p>
                <p v-if="orderInfo.logistics_name">物流名称：{{orderInfo.logistics_name}}</p>
                <p v-if="orderInfo.logistics_sn">物流编号：{{orderInfo.logistics_sn}}</p>
                <p v-if="orderInfo.delivery_time">发货时间：{{orderInfo.delivery_time}}</p>
            </div>
        </div>
        <div class="moreList">
            <b><i></i>看了又看</b>
            <goods-squared :goods="goodsList"></goods-squared>
            <p>----没有更多数据了----</p>
        </div>
        <div class="operate"
             v-if="orderInfo.button.is_cancel_order=='1'||orderInfo.button.is_remind_goods=='1'||orderInfo.button.is_extend_goods=='1'||orderInfo.button.is_shipping_info=='1'||orderInfo.button.is_confirm_goods=='1'||orderInfo.button.is_pay_order=='1'||orderInfo.detail_order_service_button.title">
            <div class="money">
                <p v-if="orderInfo.status_info=='待付款'">实付款：<b class="red">￥{{orderInfo.order_amount}}</b></p>
            </div>
            <div class="btnDiv">
                <button class="cancelBtn" v-if="orderInfo.button.is_cancel_order=='1'"
                        @click="cancelOrder()">取消订单
                </button>
                <button v-if="orderInfo.detail_order_service_button.title" @click="applyService">
                    {{orderInfo.detail_order_service_button.title}}
                </button>
                <button v-if="orderInfo.button.is_remind_goods=='1'"
                        @click="remindDelivery()">提醒发货
                </button>
                <button v-if="orderInfo.button.is_extend_goods=='1'"
                        @click="extend()">延长收货
                </button>
                <!--<button v-if="orderInfo.button.is_shipping_info=='1'"-->
                <!--@click="goLogistics()">物流详情-->
                <!--</button>-->
                <button class="sureBtn" v-if="orderInfo.button.is_confirm_goods=='1'"
                        @click="sureGet()">确认收货
                </button>
                <button class="sureBtn" v-if="orderInfo.button.is_pay_order=='1'" @click="goPay()">立即支付
                </button>
                <button class="sureBtn" v-if="orderInfo.button.is_comment=='1'" @click="goReview()">评价
                </button>
                <button class="sureBtn" v-if="orderInfo.button.is_append_comment=='1'" @click="goZhuiReview()">追加评价
                </button>
            </div>
        </div>
        <wx-config></wx-config>
    </div>
</template>

<script>
    import wx from 'weixin-js-sdk';         // 引入微信sdk
    import GoodsSquared from "../../components/index/goodsSquared";
    import {MessageBox, Toast} from 'mint-ui';
    import CountDown from '../../components/order/countDown'
    import GroupCountDown from '../../components/groupCountDown'
    import wxConfig from '../../components/wx/wxconfig'

    export default {
        name: "detail",
        data() {
            return {
                orderInfo: {
                    shipping_info: {},
                    detail_order_service_button: {},
                    button: {},
                    group: {list: {}},
                    tips: {}
                },
                goodsList: [],
                logistics: []
            }
        },
        mounted() {
            this.getOrder()
            this.getLogistics()
        },
        components: {
            GoodsSquared,
            wxConfig,
            CountDown,
            GroupCountDown
        },
        methods: {
            // 获取订单详情
            getOrder() {
                this.$post('user/getOrderDetail', {
                    token: this.$getCookie('token'),
                    order_sn: this.$route.query.order_sn
                })
                    .then(res => {
                        this.orderInfo = res
                        this.getGoodsList()
                    })
            },
            // 物流信息
            getLogistics() {
                this.$post('user/getExpressInfo', {
                    token: this.$getCookie('token'),
                    order_sn: this.$route.query.order_sn,
                    type: '1'
                })
                    .then(res => {
                        this.logistics = res.express
                    })
            },
            // 查看拼团详情页面
            goGroup(val) {
                if (val.url == '') {
                    this.$router.push({
                        path: '/group/detail',
                        query: {
                            group_id: this.orderInfo.group_id
                        }
                    })
                } else {
                    this.$router.push({
                        path: '/activity/likeDetail',
                        query: {
                            help_id: val.url.split('=')[1]
                        }
                    })
                }

            },
            // 猜你喜欢
            getGoodsList() {
                let self = this;
                this.$post('search/search', {
                    cate_id: self.orderInfo.cat_id,
                })
                    .then(res => {
                        this.goodsList = res.list
                    })
            },

            // 申请售后
            applyService() {
                if (this.orderInfo.detail_order_service_button.type == '1') {
                    MessageBox({
                        title: '提示',
                        message: '您是否已收到物品?',
                        showCancelButton: true,
                        confirmButtonText: '是',
                        cancelButtonText: '否'
                    }).then(res => {
                        if (res == 'confirm') {
                            this.$router.push({
                                path: '/service/applyAfterService',
                                query: {
                                    order_sn: this.$route.query.order_sn,
                                    type: '1',           // 1:已收货 2:未收货
                                    money: this.orderInfo.order_amount
                                }
                            })
                        } else {
                            this.$router.push({
                                path: '/service/applyAfterService',
                                query: {
                                    order_sn: this.$route.query.order_sn,
                                    type: '2',           // 1:已收货 2:未收货
                                    money: this.orderInfo.order_amount
                                }
                            })
                        }
                    })
                } else if (this.orderInfo.detail_order_service_button.type == '2') {
                    this.$router.push({
                        path: '/service/refundDetail',
                        query: {
                            order_sn: this.$route.query.order_sn,
                        }
                    })
                }
            },
            // 取消订单
            cancelOrder() {
                this.$post('user/cancelOrder', {
                    order_sn: this.$route.query.order_sn,
                    token: this.$getCookie('token')
                })
                    .then(res => {
                        Toast({
                            message: '取消成功'
                        })
                        setTimeout(() => {
                            location.reload()
                        }, 1000)
                    })
            },
            // 延长收货
            extend() {
                MessageBox.confirm('是否延长收货时间？每笔订单只能延长一次哦~', '提示').then(res => {
                    this.$post('user/extendCollectGoods', {
                        order_sn: this.$route.query.order_sn,
                        token: this.$getCookie('token')
                    })
                        .then(res => {
                            Toast({
                                message: '已延长收货',
                                duration: 1400
                            })
                        })
                })
            },
            // 提醒发货
            remindDelivery() {
                this.$post('user/remindGoods', {
                    order_sn: this.$route.query.order_sn,
                    token: this.$getCookie('token')
                })
                    .then(res => {
                        Toast({
                            message: '提醒发货成功',
                            duration: 1200
                        })
                        setTimeout(() => {
                            location.reload()
                        }, 1400)
                    })
            },
            // 物流详情->跳转到物流详情页面
            goLogistics() {
                this.$router.push({
                    path: '/order/logistics',
                    query: {
                        order_sn: this.$route.query.order_sn
                    }
                })
            },
            // 立即支付
            goPay() {
                this.$post('user/getPay', {
                    order_sn: this.$route.query.order_sn,
                    token: this.$getCookie('token') ? this.$getCookie('token') : '',
                    pay_code: this.orderInfo.pay_code,
                })
                    .then(res => {
                        if (this.orderInfo.pay_code == 'alipayweb') {
                            const div = document.createElement('div');
                            div.innerHTML = res;
                            document.body.appendChild(div)
                            document.forms['alipaysubmit'].submit();
                        } else if (this.orderInfo.pay_code == 'weixin_mweb') {
                            window.location.href = res
                        } else {
                            wx.chooseWXPay({
                                timestamp: res.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                nonceStr: res.nonceStr, // 支付签名随机串，不长于 32 位
                                package: res.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                                signType: res.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                paySign: res.paySign, // 支付签名
                                success: function (res) {
                                    wx.chooseWXPay({
                                        timestamp: this.payInfo.pay_code.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                        nonceStr: this.payInfo.pay_code.nonceStr, // 支付签名随机串，不长于 32 位
                                        package: this.payInfo.pay_code.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                                        signType: this.payInfo.pay_code.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                        paySign: this.payInfo.pay_code.paySign, // 支付签名
                                        success: function (res) {
                                            Toast({
                                                message: '支付成功',
                                                duration: 1200
                                            })
                                            setTimeout(() => {
                                                location.reload()
                                            }, 800)
                                        },
                                        cancel: function (err) {
                                            MessageBox({
                                                title: '确定要放弃付款吗？',
                                                message: '未支付订单将在不久后自动关闭，请尽快支付！?',
                                                showCancelButton: true,
                                                confirmButtonText: '继续支付',
                                                cancelButtonText: '暂时放弃'
                                            }).then(res => {
                                                self.$router.push({
                                                    path: '/order/detail',
                                                    query: {
                                                        order_sn: self.payInfo.order_sn
                                                    }
                                                })
                                            })
                                        }
                                    })
                                },
                                cancel: function () {
                                    setTimeout(() => {
                                        self.$router.push({
                                            path: '/order/detail',
                                            query: {
                                                order_sn: this.$route.query.order_sn
                                            }
                                        })
                                    }, 800)
                                }
                            })
                        }
                    })
                this.getOrder()
                this.getLogistics()

            },
            // 确认收货
            sureGet() {
                MessageBox.confirm('提交后该订单状态不可更改，要确认收货么？', '提示').then(res => {
                    this.$post('user/confirmGoods', {
                        order_sn: this.$route.query.order_sn,
                        token: this.$getCookie('token')
                    })
                        .then(res => {
                            Toast({
                                message: '已确认收货',
                                duration: 1400
                            })
                            setTimeout(() => {
                                location.reload()
                            }, 1000)
                        })
                })
            },
            // 去评价
            goReview() {
                this.$router.push({
                    path: '/order/review',
                    query: {
                        order_sn: this.$route.query.order_sn
                    }
                })
            },
            // 去追评
            goZhuiReview() {
                this.$router.push({
                    path: '/order/review',
                    query: {
                        order_sn: this.$route.query.order_sn,
                        type: 'zhui'
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .orderInfo {
        background-color: #fff;
        > div {
            background-color: #fff;
            padding: 0 26px;
        }
        .status {
            position: relative;
            padding: 40px 0;
            margin: 0 auto;
            width: 698px;
            text-align: center;
            border-bottom: 1px solid #eee;
            p {
                color: #333;
                font-size: 36px;
                margin-bottom: 10px;
            }
            span {
                display: block;
                font-size: 28px;
                color: #999;
                margin-top: 10px;
                line-height: 40px;
                .red {
                    margin: 0;
                }
            }
            .buttonDiv {
                display: flex;
                justify-content: center;
                align-items: center;
                button {
                    margin: 0 20px;
                    padding: 10px 24px;
                    border: 2px solid #ccc;
                    color: #4C4C4C;
                    font-size: 28px;
                    background: transparent;
                    -webkit-border-radius: 8px;
                    -moz-border-radius: 8px;
                    border-radius: 8px;
                    margin-top: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    i {
                        width: 40px;
                        height: 40px;
                        margin-right: 10px;
                        background: url("../../imgs/order/icon-message-red.png") no-repeat center /100%;
                    }
                }
            }
        }
        .logisticsDiv {
            a {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 40px 0;
                border-bottom: 1px solid #eee;
                .divFl {
                    img {
                        width: 40px;
                        height: 40px;
                    }
                    .divFlCont {
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        text-align: left;
                        p {
                            color: #3C963C;
                            font-size: 28px;
                            line-height: 40px;
                            max-height: 80px;
                            overflow: hidden;
                        }
                        span {
                            margin-top: 24px;
                            color: #999;
                            font-size: 24px;
                        }
                    }
                }
                .divFr {
                    img {
                        width: 10px;
                        height: 18px;
                    }
                }
            }
        }
        .address {
            padding: 36px 26px;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            img {
                width: 40px;
                height: 40px;
                margin-right: 28px;
            }
            .addressInfo {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                align-self: center;
                p {
                    font-size: 28px;
                    line-height: 40px;
                    b {
                        display: inline-block;
                        font-size: 30px;
                        margin-bottom: 20px;
                        margin-right: 32px;
                    }
                }
            }
        }
        .hr {
            width: 100%;
            height: 10px;
            background: url("../../imgs/address/icon-hr-bg.png") no-repeat center /100%;
        }
        .goodsDiv {
            padding: 40px 26px;
            .store {
                a {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #333;
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
                            color: #333;
                            i {
                                width: 10px;
                                height: 18px;
                                margin-left: 18px;
                                background: url("../../imgs/order/icon-arrow-right.png") no-repeat center /100%;
                            }
                        }
                    }
                }
            }
            .goods {
                a {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    background-color: #fff;
                    margin: 20px 0;
                    width: 100%;
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
                        flex: 1;
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

        }
        .groupInfo {
            display: flex;
            flex-direction: column;
            /*justify-content: space-between;*/
            align-items: center;
            margin: 0 auto;
            width: 698px;
            padding: 0 0 40px 0;
            border-bottom: 1px solid #eee;
            .divTop {
                display: flex;
                justify-content: flex-start;
                align-self: flex-start;
                align-items: center;
                font-size: 28px;
                img {
                    width: 40px;
                    height: 40px;
                    margin-right: 16px;
                }
                span {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                }
            }
            .divBottom {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-left: 56px;
                margin-top: 20px;
                font-size: 28px;
                .divFl {
                    img {
                        width: 80px;
                        height: 80px;
                        margin-right: 10px;
                        -webkit-border-radius: 50%;
                        -moz-border-radius: 50%;
                        border-radius: 50%;
                        border: 2px dashed #eee;
                    }
                }
                .divFr {
                    button {
                        width: 162px;
                        height: 60px;
                        line-height: 60px;
                        background: transparent;
                        border-radius: 8px;
                        color: #4c4c4c;
                        border: 2px solid #ccc;
                    }
                }
            }
        }

        .payDiv {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .divFl {
                img {
                    width: 40px;
                    height: 40px;
                }
                span {
                    font-size: 28px;
                }
            }
            .divFr {
                i {
                    width: 50px;
                    height: 50px;
                    background: url("../../imgs/pay/icon-check.png") no-repeat center /100%;
                }
            }
        }
        .contact {
            display: flex;
            justify-content: space-around;
            align-items: center;
            background-color: #fff;
            padding: 40px 0;
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            > div {
                a {
                    padding: 18px 86px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 2px solid #ccc;
                    -webkit-border-radius: 8px;
                    -moz-border-radius: 8px;
                    border-radius: 8px;
                    color: #333;
                    font-size: 28px;
                    i {
                        width: 40px;
                        height: 40px;
                        margin-right: 10px;

                    }
                }
                &:nth-child(1) {
                    a {
                        i {
                            background: url("../../imgs/order/icon-message.png") no-repeat center /100%;
                        }
                    }
                }
                &:nth-child(2) {
                    a {
                        i {
                            background: url("../../imgs/order/icon-calling.png") no-repeat center /100%;
                        }
                    }
                }
            }
        }

        .orderDiv {
            p {
                color: #999;
                line-height: 34px;
                margin-bottom: 30px;
                font-size: 28px;
            }
        }
    }

    .moreList {
        margin-bottom: 100px;
        b {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0 26px;
            background-color: #fff;
            i {
                width: 4px;
                height: 16px;
                margin-right: 16px;
                background: rgba(255, 70, 78, 1);
                border-radius: 2px;
            }
        }
        p {
            text-align: center;
        }
    }

    .operate {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100px;
        background-color: #fff;
        .money {
            font-size: 28px;
            .red {
                font-size: 36px;
            }
        }
        .btnDiv {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            button {
                margin-left: 20px;
                font-size: 28px;
                padding: 16px 26px;
                color: #4c4c4c;
                font-size: 28px;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                border-radius: 8px;
                border: 2px solid #ccc;
            }
            .cancelBtn {
                padding: 12px 22px;
                color: #4C4C4C;
                background: transparent;
            }
            .sureBtn {
                border: none;
                color: #fff;
                background-color: #FF4862;
            }
        }
    }
</style>
