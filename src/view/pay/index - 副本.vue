<template>
    <div>

        <div class="storeInfo detailsDiv">
            <router-link :to="'/store/index?store_id='+order.merchant_info.store_id" class="divFl">
                <img :src="order.merchant_info.store_logo" :alt="order.merchant_info.store_name">
                <p>{{order.merchant_info.store_name}}</p>
            </router-link>
        </div>

        <div class="goodsInfo detailsDiv">
            <img :src="order.goods_info.goods_price.img" alt="商品图片">
            <div class="divFr">
                <p>{{order.goods_info.goods_name}}</p>
                <p>{{order.goods_info.goods_price.key_name}}</p>
                <p>￥{{orderOnePrice}}/件</p>
            </div>
        </div>

        <div class="number detailsDiv divDiv">
            <div class="divFl">购买数量</div>
            <div class="divFr">
                <div>
                    <button @click="reduceBtn" v-if="number>1">-</button>
                    <input type="number" v-model="number">
                    <button @click="addBtn">+</button>
                </div>
                <p>店铺合计：￥{{orderPrice}}(全场包邮)</p>
            </div>
        </div>

        <div class="address detailsDiv">
            <router-link v-if="JSON.stringify(order.default_address_info) != '{}'"
                         :to="'/address/index?goods_id='+this.$route.query.goods_id+'&goods_number='+this.$route.query.goods_number+'&spec_key='+this.$route.query.spec_key+'&order_class='+this.$route.query.order_class+'&group_id='+this.$route.query.group_id"
                         class="divDiv">
                <div class="divFl">
                    <i></i>
                    <div>
                        <p>{{order.default_address_info.consignee}} {{order.default_address_info.mobile}}</p>
                        <p>{{order.default_address_info.address_base}}{{order.default_address_info.address}}</p>
                    </div>
                </div>
                <div class="divFr">
                    <span></span>
                </div>
            </router-link>
            <router-link v-else
                         :to="'/address/addAddress?goods_id='+this.$route.query.goods_id+'&goods_number='+this.$route.query.goods_number+'&spec_key='+this.$route.query.spec_key+'&order_class='+this.$route.query.order_class+'&group_id='+this.$route.query.group_id+'&type=1'"
                         class="divDiv">
                <div class="divFl">
                    <i></i>
                    <div>
                        请先添加收货地址
                    </div>
                </div>
                <div class="divFr">
                    <span></span>
                </div>
            </router-link>
        </div>

        <div class="couponDiv detailsDiv">
            <div class="divDiv">
                <div class="divFl">
                    店铺优惠券
                </div>
                <div class="divFr">
                    <router-link to="/user/myCoupon?from=pay&type=merchat">
                        <div v-if="useMerchatCouponList!=''">
                            <p>{{mechatCoupon.coupon_name}}</p>
                            <p>-{{mechatCoupon.money}}</p>
                        </div>
                        <p v-else>当前没有可用优惠券</p>
                    </router-link>
                    <span></span>
                </div>
            </div>
        </div>

        <div class="couponDiv detailsDiv">
            <div class="divDiv">
                <div class="divFl">
                    平台优惠券
                </div>
                <div class="divFr">
                    <router-link to="/user/myCoupon?from=pay&type=platform">
                        <div v-if="usePlatformCouponList!=''">
                            <p>{{platformCoupon.coupon_name}}</p>
                            <p>-{{platformCoupon.money}}</p>
                        </div>
                        <p v-else>当前没有可用优惠券</p>
                    </router-link>
                    <span></span>
                </div>
            </div>
        </div>

        <div class="payTypeDiv detailsDiv">
            <div class="divFl">
                <i class="icon-wxPay"></i>
                <span>{{order.pay_list[0].pay_name}}</span>
            </div>
            <div class="divFr">
                <i class="icon-check"></i>
            </div>
        </div>


        <div class="moneyDiv">
            <p>您需支付：￥{{totalPrice}}</p>
        </div>

        <div class="payBtn">
            <mt-button type="danger" @click="payClick">立即支付</mt-button>
        </div>

        <wx-config></wx-config>

    </div>
</template>
<script>
    import {Toast} from 'mint-ui';
    import wx from 'weixin-js-sdk';         // 引入微信sdk
    import wxConfig from '../../components/wx/wxconfig'

    export default {
        data() {
            return {
                number: this.$route.query.goods_number,
                totalMoney: '',
                payInfo: {},         // 订单信息
                payCode: {},         // 支付信息
                order: {
                    goods_info: {goods_price: {}},
                    merchant_info: {},
                    default_address_info: {},
                    pay_list: [{pay_name: ''}]
                },
                orderOnePrice: 0,           // 单价
                orderPrice: 0,             // 店铺合计
                totalPrice: 0,             // 您需支付

                // 优惠券
                merchatCouponList: [],           // 商家优惠券列表
                platformCouponList: [],           // 平台优惠券列表

                useMerchatCouponList: [],            // 可用商家优惠券
                usePlatformCouponList: [],            // 可用平台优惠券

                mechatCoupon: {},                   // 商家默认优惠券
                platformCoupon: {},                   // 平台默认优惠券

                mechatCouponMoney: '',                   // 商家默认优惠券
                platformCoupon: {},            // 平台默认优惠券

                mechatCouponIndex: this.$route.query.mechatCouponIndex || 0,
                platformCouponIndex: this.$route.query.platformCouponIndex || 0
            }
        },
        mounted() {
            setTimeout(() => {
                this.getCoupon()
            }, 200)

            this.getOrder()

        },
        components: {wxConfig},
        methods: {
            // 获取优惠券
            getCoupon() {
                this.$post('buy/getOrderCoupon', {
                    goods_id: this.$route.query.goods_id,
                    token: this.$getCookie('token')
                })
                    .then(res => {
                        this.merchatCouponList = res.merchant
                        this.platformCouponList = res.platform
                        this.$session.set('payQuery', this.$route.query)
                        if (this.merchatCouponList != '' && this.platformCouponList != '') {  // 如果商家优惠券和平台优惠券同时存在，先判断平台优惠券是否可以使用---规则：先扣除商家在扣除平台

                            for (let i = 0; i < this.platformCouponList.length; i++) {
                                if (this.platformCouponList[i].condition_money < this.orderPrice) {
                                    this.usePlatformCouponList.push(this.platformCouponList[i])
                                }
                            }
                            this.platformCoupon = this.usePlatformCouponList.length > 0 ? this.usePlatformCouponList[this.platformCouponIndex] : {}             // 默认平台券
                            if (this.usePlatformCouponList.length > 0) {
                                this.totalPrice = (this.orderPrice - this.platformCoupon.money).toFixed(2)
                            } else {
                                this.totalPrice = this.orderPrice
                            }

                            for (let i = 0; i < this.merchatCouponList.length; i++) {
                                if (this.merchatCouponList[i].condition_money < this.orderPrice) {
                                    this.useMerchatCouponList.push(this.merchatCouponList[i])
                                }
                            }
                            this.mechatCoupon = this.useMerchatCouponList.length > 0 ? this.useMerchatCouponList[this.mechatCouponIndex] : {}             // 默认商家券
                            if (this.usePlatformCouponList.length > 0) {
                                this.totalPrice = (this.orderPrice - this.mechatCoupon.money).toFixed(2)
                            } else {
                                this.totalPrice = this.orderPrice
                            }

                        } else if (this.merchatCouponList != '' && this.platformCouponList == '') {       // 只存在商家优惠券
                            for (let i = 0; i < this.merchatCouponList.length; i++) {
                                if (this.merchatCouponList[i].condition_money < this.orderPrice) {
                                    this.useMerchatCouponList.push(this.merchatCouponList[i])
                                }
                            }
                            this.platformCoupon = ''
                            this.mechatCoupon = this.useMerchatCouponList.length > 0 ? this.useMerchatCouponList[this.mechatCouponIndex] : {}             // 默认商家券
                            if (this.usePlatformCouponList.length > 0) {
                                this.totalPrice = (this.orderPrice - this.mechatCoupon.money).toFixed(2)
                            } else {
                                this.totalPrice = this.orderPrice
                            }

                        } else if (this.merchatCouponList == '' && this.platformCouponList != '') {          // 只存在平台优惠券
                            for (let i = 0; i < this.platformCouponList.length; i++) {
                                if (this.platformCouponList[i].condition_money < this.orderPrice) {
                                    this.usePlatformCouponList.push(this.platformCouponList[i])
                                }
                            }
                            this.mechatCoupon = ''
                            this.platformCoupon = this.usePlatformCouponList.length > 0 ? this.usePlatformCouponList[this.platformCouponIndex] : {}             // 默认平台券
                            if (this.usePlatformCouponList.length > 0) {
                                this.totalPrice = (this.orderPrice - this.platformCoupon.money).toFixed(2)
                            } else {
                                this.totalPrice = this.orderPrice
                            }
                        }
                        this.$session.set('useMerchatCouponList', this.useMerchatCouponList)
                        this.$session.set('usePlatformCouponList', this.usePlatformCouponList)
                    })
            },
            // 获取订单信息
            getOrder() {
                this.$post('buy/getBuyInfo', {
                    token: this.$getCookie('token'),
                    goods_id: this.$route.query.goods_id,
                    goods_number: this.number,
                    spec_key: this.$route.query.spec_key,
                    address_id: this.$route.query.address_id,
                    order_class: this.$route.query.order_class,                    // 1：单买 2：拼团 3：秒杀 4：免单
                    is_group: this.$route.query.order_class == '2' ? this.$route.query.group_id ? '2' : '1' : '0',      // if order_class==2(当前类型为2即拼团类型时)，在判断是否有group_id，if true 拼团：参团
                    group_id: this.$route.query.order_class == '2' ? this.$route.query.group_id : '',               // 1：单买 2：拼团 3：秒杀 4：免单
                    time: Math.round(new Date().getTime() / 1000),
                    sign: '123',
                    referer: '1', // 1.weixin 2.ios 3.安卓 4.小程序 5.H5 6.QQ
                })
                    .then(res => {
                        this.order = res
                        this.orderOnePrice = this.$route.query.order_class == '1' ? res.goods_info.goods_price.price : res.goods_info.goods_price.prom_price
                        this.orderPrice = this.$route.query.order_class == '1' ? (res.goods_info.goods_price.price * this.number).toFixed(2) : (res.goods_info.goods_price.prom_price * this.number).toFixed(2)
                        this.totalPrice = this.$route.query.order_class == '1' ? (res.goods_info.goods_price.price * this.number).toFixed(2) : (res.goods_info.goods_price.prom_price * this.number).toFixed(2)
                    })
            },

            reduceBtn() {
                this.number = parseInt(this.number) - 1
            },
            addBtn() {
                this.number = parseInt(this.number) + 1
            },
            // 立即支付
            payClick() {
                if (JSON.stringify(this.order.default_address_info) != '{}') {
                    this.$post('buy/submit', {
                        token: this.$getCookie('token'),
                        goods_id: this.$route.query.goods_id,
                        order_class: this.$route.query.order_class,
                        spec_key: this.$route.query.spec_key,
                        goods_number: this.$route.query.goods_number,
                        is_group: this.$route.query.order_class == '2' ? this.$route.query.group_id ? '2' : '1' : '0',
                        group_id: this.$route.query.group_id,
                        referer: '1', // 1.weixin 2.ios 3.安卓 4.小程序 5.H5 6.QQ
                        sign: '132',
                        address_id: this.order.default_address_info.address_id,
                        pay_code: this.order.pay_list[0].pay_code,
                        p_coupon_code: '',
                        m_coupon_code: '',
                    })
                        .then(res => {
                            let self = this;
                            this.payInfo = res

                            wx.chooseWXPay({
                                timestamp: res.pay_code.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                nonceStr: res.pay_code.nonceStr, // 支付签名随机串，不长于 32 位
                                package: res.pay_code.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                                signType: res.pay_code.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                paySign: res.pay_code.paySign, // 支付签名
                                success: function (res) {
                                    Toast({
                                        message: '支付成功',
                                        duration: 1200
                                    })
                                    setTimeout(() => {
                                        self.$router.push({
                                            path: '/order/detail',
                                            query: {
                                                order_sn: self.payInfo.order_sn
                                            }
                                        })
                                    }, 800)


                                },
                                cancel: function (err) {
                                    setTimeout(() => {
                                        self.$router.push({
                                            path: '/order/detail',
                                            query: {
                                                order_sn: self.payInfo.order_sn
                                            }
                                        })
                                    }, 800)

                                }
                            })
                        })
                } else {
                    Toast({
                        message:'请添加收货地址',
                        duration:1600
                    })
                }

            },

        },
        watch: {
            number() {
                if (this.number < 1) {
                    Toast('购买数量至少为1');
                    this.number = 1
                } else {
                    this.orderPrice = this.$route.query.order_class == '1' ? (this.order.goods_info.goods_price.price * this.number).toFixed(2) : (this.order.goods_info.goods_price.prom_price * this.number).toFixed(2)
                    this.totalPrice = this.$route.query.order_class == '1' ? (this.order.goods_info.goods_price.price * this.number).toFixed(2) : (this.order.goods_info.goods_price.prom_price * this.number).toFixed(2)
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .storeInfo {
        padding: 20px;
        .divFl {
            color: #333;
            img {
                width: 100px;
                height: 100px;
            }
        }
    }

    .goodsInfo {
        display: flex;
        justify-content: flex-start;
        padding: 20px;
        img {
            width: 168px;
            height: 168px;
            margin-right: 20px;
        }
        .divFr {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            p {
                width: 100%;
                color: #333;
                &:nth-child(1) {
                    font-size: 28px;
                }
                &:nth-child(2) {
                    color: #999;
                }
                &:nth-child(3) {
                    text-align: right;
                }
            }
        }
    }

    .number {
        align-items: baseline;
        margin-bottom: 20px;
        padding: 20px;
        button {
            padding: 2px 10px;
            font-size: 30px;
            border-radius: 0;
            font-weight: bolder;
            color: #333;
        }
        input {
            width: 72px;
            text-align: center;
            padding: 2px;
        }
        .divFr {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            p {
                margin-top: 20px;
            }
        }
    }

    .address, .couponDiv {
        padding: 20px;
        .divFl {
            p {
                text-align: left;
            }
            i {
                width: 42px;
                height: 60px;
                margin-right: 20px;
                background: url("../../images/icon-address.png") no-repeat center /100%;
            }
        }
        .divFr {
            position: relative;
            span {
                position: absolute;
                content: '';
                right: 50%;
                top: 50%;
                margin: -10px 10px;
                width: 20px;
                height: 20px;
                border-top: 1px solid #ccc;
                border-right: 1px solid #ccc;
                transform: rotate(45deg);
            }
        }
    }

    .couponDiv {
        .divFl {
            color: #000;
        }
        .divFr {
            flex: 1;
            display: flex;
            justify-content: space-between;
            margin-left: 20px;
            a {
                color: #999;
                display: block;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                text-align: left;
                > div {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    p {
                        &:nth-child(2) {
                            margin-right: 40px;
                        }
                    }
                }
            }
            span {
                right: 0;
            }
        }
    }

    .payTypeDiv {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        .icon-wxPay {
            margin-right: 20px;
            background: url("../../images/icon-wxPay.png") no-repeat center /100%;
        }
        .icon-check {
            background: url("../../images/icon-check.png") no-repeat center /100%;
        }
    }

    .moneyDiv {
        p {
            text-align: center;
            margin-top: 40px;
        }
    }

    .payBtn {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        .mint-button {
            width: 100%;
            height: 100px;
            font-size: 30px;
        }
    }

</style>
