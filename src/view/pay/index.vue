<template>
    <div class="payDiv">
        <wx-config></wx-config>
        <div class="addressDiv" v-if="JSON.stringify(order.default_address_info)!='{}'">
            <div class="addressDivFl">
                <i></i>
                <div class="addressDivInfo">
                    <router-link
                        :to="'/address/index?goods_id='+this.$route.query.goods_id+'&goods_number='+this.$route.query.goods_number+'&spec_key='+this.$route.query.spec_key+'&order_class='+this.$route.query.order_class+'&group_id='+this.$route.query.group_id">
                        <p>
                            <b>{{order.default_address_info.consignee}}</b>
                            <span>{{order.default_address_info.mobile}}</span>
                        </p>
                        <span>{{order.default_address_info.address_base}}{{order.default_address_info.address}}</span>
                    </router-link>
                </div>
            </div>
            <div class="addressDivFr">
                <i></i>
            </div>
        </div>
        <div class="addressDiv noAddressDiv" v-else>
            <div class="addressDivFl">
                <i></i>
                <div class="addressDivInfo">
                    <router-link
                        :to="'/address/addAddress?goods_id='+this.$route.query.goods_id+'&goods_number='+this.$route.query.goods_number+'&spec_key='+this.$route.query.spec_key+'&order_class='+this.$route.query.order_class+'&group_id='+this.$route.query.group_id+'&type=1'"
                        class="divDiv">
                        <p>添加一个收货地址</p>
                    </router-link>
                </div>
            </div>
            <div class="addressDivFr">
                <i></i>
            </div>
        </div>
        <div class="addressHr"></div>
        <div class="payInfo">
            <!--商家信息-->
            <div class="storeInfo">
                <router-link :to="'/store/index?store_id='+order.merchant_info.store_id" class="divFl">
                    <img :src="order.merchant_info.store_logo" alt="商家logo">
                    <p>{{order.merchant_info.store_name}}</p>
                </router-link>
            </div>
            <!--商品信息-->
            <div class="goodsInfo">
                <router-link :to="'/detail/index?goods_id='+order.goods_info.goods_id">
                    <img :src="order.goods_info.goods_price.img" alt="商品图片">
                    <div class="divFr">
                        <p>{{order.goods_info.goods_name}}</p>
                        <p>{{order.goods_info.goods_price.key_name}}</p>
                        <p>
                            <label>￥<b>{{orderOnePrice}}</b></label>
                            <span>x{{number || '1'}}</span>
                        </p>
                    </div>
                </router-link>
            </div>
            <!--购买数量-->
            <div class="numberDiv">
                <div class="divFl">购买数量</div>
                <div class="divFr">
                    <div class="number">
                        <button @click="reduceNum" :disabled="number<=1" class="reduceNum">-</button>
                        <input type="number" v-model="number">
                        <button @click="addNum" class="addNum">+</button>
                    </div>
                </div>
            </div>
            <!--优惠券-->
            <div class="couponDiv">
                <div class="divDiv">
                    <div class="divFl">
                        店铺优惠券
                    </div>
                    <div class="divFr">
                        <router-link
                            :to="'/pay/coupon?goods_id='+this.$route.query.goods_id+'&goods_number='+this.number+
                            '&spec_key='+this.$route.query.spec_key+'&order_class='+this.$route.query.order_class+'&group_id='+this.$route.query.group_id+
                            '&is_group='+this.$route.query.is_group+'&usePlatform='+this.$route.query.usePlatform+
                            '&useMerchat='+this.$route.query.useMerchat+'&from=pay&type=merchat&mechatCouponIndex=0'">
                            <div
                                v-if="useMerchatCouponList!=''&&(!this.$route.query.useMerchat||this.$route.query.useMerchat=='undefined')">
                                <p>{{mechatCoupon.coupon_name}}</p>
                                <p>-{{mechatCoupon.money}}</p>
                            </div>
                            <div v-else-if="useMerchatCouponList!=''&&this.$route.query.useMerchat=='no'">
                                不使用优惠券
                            </div>
                            <p v-else>当前没有可用店铺优惠券</p>
                        </router-link>
                        <i></i>
                    </div>
                </div>
            </div>
            <div class="couponDiv">
                <div class="divDiv">
                    <div class="divFl">
                        平台优惠券
                    </div>
                    <div class="divFr">
                        <router-link
                            :to="'/pay/coupon?goods_id='+this.$route.query.goods_id+'&goods_number='+this.number+
                            '&spec_key='+this.$route.query.spec_key+'&order_class='+this.$route.query.order_class+'&group_id='+this.$route.query.group_id+
                            '&is_group='+this.$route.query.is_group+'&usePlatform='+this.$route.query.usePlatform+
                            '&useMerchat='+this.$route.query.useMerchat+'&from=pay&type=platform&platformCouponIndex=0'">
                            <div
                                v-if="usePlatformCouponList!=''&&(!this.$route.query.usePlatform||this.$route.query.usePlatform=='undefined')">
                                <p>{{platformCoupon.coupon_name}}</p>
                                <p>-{{platformCoupon.money}}</p>
                            </div>
                            <div v-else-if="usePlatformCouponList!=''&&$route.query.usePlatform=='no'">
                                不使用优惠券
                            </div>
                            <p v-else>当前没有可用平台优惠券</p>
                        </router-link>
                        <i></i>
                    </div>
                </div>
            </div>
            <!--支付方式-->
            <div class="payTypeDiv" v-for="item,index in order.pay_list" @click="changePayType(item,index)">
                <div class="divFl">
                    <i :class="item.pay_code=='alipayweb'?'icon-aliPay':'icon-wxPay'"></i>
                    <span>{{item.pay_name}}</span>
                </div>
                <div class="divFr">
                    <i :class="currentIndex==index?'icon-check':'icon-no-check'"></i>
                </div>
            </div>
        </div>

        <div class="payBtnDiv">
            <div class="payBottom">
                <p>
                    <label>实付款:</label>
                    <b v-if="surePrice">￥{{totalPrice}}</b>
                    <span>免运费</span>
                </p>
                <button @click="payClick">立即支付</button>
            </div>
        </div>

        <!--<div v-html="payInfo.pay_code" ></div>-->
        <!--<div class="tipsWxPayDiv" v-if="this.$getCookie('isWxPayed')">-->
        <!--<div class="tipsDiv">-->
        <!--<p class="c333 ft34">请确认微信支付是否完成？</p>-->
        <!--<p class="cFF4862 ft34" @click="wxPayOk">已完成支付</p>-->
        <!--<p class="c999 ft30" @click="wxPayOk">支付遇到问题？重新支付</p>-->
        <!--</div>-->
        <!--</div>-->

    </div>
</template>
<script>
    import {Toast, Indicator} from 'mint-ui';
    import {MessageBox} from 'mint-ui';
    import wx from 'weixin-js-sdk';         // 引入微信sdk
    import wxConfig from '../../components/wx/wxconfig'

    export default {
        data() {
            return {
                loading: false,
                iconTopShow: false,
                specShow: false,         // 规格弹框
                addressShow: false,
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
                surePrice: false,            // 最终价格确定
                orderOnePrice: 0,           // 单价
                orderPrice: 0,             // 店铺合计
                totalPrice: 0,             // 您需支付
                noCouponTotalPrice: 0,             // 在没有优惠券情况下的金额

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
                platformCouponIndex: this.$route.query.platformCouponIndex || 0,
                referer: '',

                currentIndex: 0,
                payType: '',         // 支付类型（微信：weixin_mweb，支付宝：alipayweb）

                maxNumber: '1',

            }
        },
        mounted() {
            if (this.$getCookie('isWeixin')) {
                this.referer = '1'
            } else if (this.$getCookie('isQQ')) {
                this.referer = '6'
            } else if (decodeURI(this.$getCookie('loginType')) == '网页版') {
                this.referer = '5'
            }
            // setTimeout(() => {
            //     this.getCoupon()
            // }, 200)

            this.getOrder()


            if (this.$getCookie('isWxPayed')) {
                setTimeout(()=>{
                    this.$clearCookie('isWxPayed')
                    this.$router.push(`/pay/wxWebPay?order_sn=${this.$getCookie('currentOrderSn')}`)
                },250)
            }

        },
        components: {wxConfig},
        methods: {
            // 获取优惠券
            getCoupon() {
                let self = this
                self.$post('buy/getOrderCoupon', {
                    goods_id: self.$route.query.goods_id,
                    token: self.$getCookie('token')
                })
                    .then(res => {
                        self.merchatCouponList = res.merchant
                        self.platformCouponList = res.platform
                        self.$session.set('payQuery', self.$route.query)
                        if (self.merchatCouponList != '' && self.platformCouponList != '') {  // 如果商家优惠券和平台优惠券同时存在，先判断平台优惠券是否可以使用---规则：先扣除商家在扣除平台
                            console.log('商家券和平台券同时存在')
                            console.log(self.orderPrice)

                            // 2018.09.07上午10：30左右，需求改成先减商家，再减去平台，参与人王晖/王庆/何梦强/两个测试（旁听）
                            // 先循环商家优惠券列表，如果有满足金额不大于需要支付金额的，进入可用商家券列表
                            for (let i = 0; i < self.merchatCouponList.length; i++) {
                                if (self.merchatCouponList[i].condition_money <= self.orderPrice) {
                                    self.useMerchatCouponList.push(self.merchatCouponList[i])
                                }
                            }
                            console.log('可用商家券列表:')
                            console.log(self.useMerchatCouponList)          // 可用商家券列表
                            // 默认商家券,一般是第一个，当然也可以在列表中修改第几个，
                            // 在url上面显示mechatCouponIndex这个字段是第几个
                            self.mechatCoupon = self.useMerchatCouponList.length > 0 ? self.useMerchatCouponList[self.mechatCouponIndex] : {}
                            console.log('默认的商家券或者是修改的有mechatCouponIndex的优惠券')
                            console.log(self.mechatCoupon)
                            if (self.$route.query.mechatCoupon == 'no') {
                                self.mechatCoupon = ''
                            }
                            if (self.useMerchatCouponList.length > 0 && this.$route.query.useMerchat != 'no') {
                                self.totalPrice = (self.totalPrice - self.mechatCoupon.money).toFixed(2)
                            } else {
                                self.totalPrice = self.totalPrice
                            }
                            // 商家券判断完成，开始判断平台券
                            // 判断减去商家券之后的支付金额totalPrice是否不小于循环后的平台券的数组中的满足金额，true进入可用平台全列表
                            for (let i = 0; i < self.platformCouponList.length; i++) {
                                if (self.platformCouponList[i].condition_money <= self.totalPrice) {
                                    self.usePlatformCouponList.push(self.platformCouponList[i])
                                }
                            }
                            console.log('可用平台券列表:')
                            console.log(self.usePlatformCouponList)          // 可用平台券列表
                            // 默认平台券,一般是第一个，当然也可以在列表中修改第几个，
                            // 在url上面显示platformCouponIndex这个字段是第几个
                            self.platformCoupon = self.usePlatformCouponList.length > 0 ? self.usePlatformCouponList[self.platformCouponIndex] : {}             // 默认平台券
                            if (self.$route.query.platformCoupon == 'no') {
                                self.platformCoupon = ''
                            }
                            if (self.usePlatformCouponList.length > 0 && this.$route.query.usePlatform != 'no') {
                                self.totalPrice = (self.totalPrice - self.platformCoupon.money).toFixed(2)
                            } else {
                                self.totalPrice = self.totalPrice
                            }


                        } else if (this.merchatCouponList != '' && this.platformCouponList == '') {       // 只存在商家优惠券---------------------------------------
                            console.log('只有商家券存在')

                            for (let i = 0; i < this.merchatCouponList.length; i++) {
                                if (this.merchatCouponList[i].condition_money <= this.orderPrice) {
                                    this.useMerchatCouponList.push(this.merchatCouponList[i])
                                }
                            }
                            this.platformCoupon = ''
                            this.mechatCoupon = this.useMerchatCouponList.length > 0 ? this.useMerchatCouponList[this.mechatCouponIndex] : {}             // 默认商家券
                            if (this.$route.query.useMerchat == 'no') {
                                this.mechatCoupon = ''
                            }
                            if (this.useMerchatCouponList.length > 0 && this.$route.query.useMerchat != 'no') {
                                this.totalPrice = (this.orderPrice - this.mechatCoupon.money).toFixed(2)
                            } else {
                                this.totalPrice = this.orderPrice
                            }
                        } else if (this.merchatCouponList == '' && this.platformCouponList != '') {          // 只存在平台优惠券------------------------------------
                            console.log('只有平台券存在')

                            for (let i = 0; i < this.platformCouponList.length; i++) {
                                if (this.platformCouponList[i].condition_money <= this.orderPrice) {
                                    this.usePlatformCouponList.push(this.platformCouponList[i])
                                }
                            }
                            this.mechatCoupon = ''
                            this.platformCoupon = this.usePlatformCouponList.length > 0 ? this.usePlatformCouponList[this.platformCouponIndex] : {}             // 默认平台券
                            if (this.$route.query.platformCoupon == 'no') {
                                this.platformCoupon = ''
                            }
                            if (this.usePlatformCouponList.length > 0 && this.$route.query.usePlatform != 'no') {
                                this.totalPrice = (this.orderPrice - this.platformCoupon.money).toFixed(2)
                            } else {
                                this.totalPrice = this.orderPrice
                            }

                        }
                        this.$session.set('useMerchatCouponList', this.useMerchatCouponList)
                        this.$session.set('usePlatformCouponList', this.usePlatformCouponList)

                        this.totalPrice = this.totalPrice < 0 ? 0 : this.totalPrice
                        setTimeout(() => {
                            this.surePrice = true
                        }, 200)
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
                    referer: this.referer, // 1.weixin 2.ios 3.安卓 4.小程序 5.H5 6.QQ
                })
                    .then(res => {
                        this.order = res
                        this.payType = res.pay_list[0].pay_code
                        this.orderOnePrice = this.$route.query.order_class == '1' ? res.goods_info.goods_price.price : res.goods_info.goods_price.prom_price
                        this.orderPrice = this.$route.query.order_class == '1' ? (this.orderOnePrice * this.number).toFixed(2) : (this.orderOnePrice * this.number).toFixed(2)
                        this.totalPrice = this.$route.query.order_class == '1' ? (this.orderOnePrice * this.number).toFixed(2) : (this.orderOnePrice * this.number).toFixed(2)
                        this.noCouponTotalPrice = this.$route.query.order_class == '1' ? (this.orderOnePrice * this.number).toFixed(2) : (this.orderOnePrice * this.number).toFixed(2)
                        this.maxNumber = parseInt(res.goods_info.limit_single_num)
                        this.getCoupon()
                    })
            },

            reduceNum() {
                this.number = parseInt(this.number) - 1
            },
            addNum() {
                this.number = parseInt(this.number) + 1
            },
            // 选择支付方式
            changePayType(val, index) {
                this.currentIndex = index
                this.payType = val.pay_code
            },
            // 立即支付
            payClick() {
                let self = this;
                if (this.referer) {
                    if (JSON.stringify(this.order.default_address_info) != '{}') {
                        this.$post('buy/submit', {
                            token: this.$getCookie('token'),
                            goods_id: this.$route.query.goods_id,
                            order_class: this.$route.query.order_class,
                            spec_key: this.$route.query.spec_key,
                            goods_number: this.number,
                            is_group: this.$route.query.order_class == '2' ? this.$route.query.group_id ? '2' : '1' : '0',
                            group_id: this.$route.query.group_id,
                            referer: this.referer, // 1.weixin 2.ios 3.安卓 4.小程序 5.H5 6.QQ
                            sign: '132',
                            address_id: this.order.default_address_info.address_id,
                            pay_code: this.payType,
                            p_coupon_code: this.platformCoupon ? this.platformCoupon.coupon_code : '',
                            m_coupon_code: this.mechatCoupon ? this.mechatCoupon.coupon_code : '',
                        })
                            .then(res => {
                                this.payInfo = res.data.result
                                this.$setCookie('currentOrderSn', this.payInfo.order_sn)
                                if (this.referer == '1') {
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
                                            // 如果是单买，跳转到中间提示页面,否则直接跳转到订单详情
                                            // alert('this.$route.query.order_class')
                                            // alert(this.$route.query.order_class)
                                            // if (this.$route.query.order_class=='1') {
                                            //     setTimeout(() => {
                                            //         self.$router.push({
                                            //             path: '/pay/paySuccess',
                                            //             query: {
                                            //                 order_sn: self.payInfo.order_sn
                                            //             }
                                            //         })
                                            //     }, 800)
                                            // } else {
                                            setTimeout(() => {
                                                self.$router.push({
                                                    path: '/order/detail',
                                                    query: {
                                                        order_sn: self.payInfo.order_sn
                                                    }
                                                })
                                            }, 800)
                                            // }

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
                                } else {
                                    if (this.payType == 'alipayweb') {
                                        const div = document.createElement('div');
                                        div.innerHTML = this.payInfo.pay_code;
                                        document.body.appendChild(div)
                                        document.forms['alipaysubmit'].submit();
                                    } else if (this.payType == 'weixin_mweb') {
                                        Indicator.open();
                                        this.$setCookie('isWxPayed', true)
                                        setTimeout(() => {
                                            Indicator.close();
                                            location.href = this.payInfo.pay_code
                                        }, 600)
                                    }
                                }
                            })
                    } else {
                        Toast({
                            message: '请添加收货地址',
                            duration: 1600
                        })
                    }
                } else {
                    Toast({
                        message: '本商品仅限微信、QQ、支付宝购买',
                        duration: 1400
                    })
                }

            },
            // 微信H5支付完成
            wxPayOk() {
                setTimeout(() => {
                    let self = this
                    this.$router.push({
                        path: '/order/detail',
                        query: {
                            order_sn: self.$getCookie('currentOrderSn')
                        }
                    })
                    this.$clearCookie('isWxPayed')
                    this.$clearCookie('currentOrderSn')
                }, 300)
            }
        },
        watch: {
            number(e) {
                console.log(e)
                this.surePrice = false
                this.merchatCouponList = []           // 商家优惠券列表
                this.platformCouponList = []          // 平台优惠券列表

                this.useMerchatCouponList = []            // 可用商家优惠券
                this.usePlatformCouponList = []            // 可用平台优惠券

                this.mechatCoupon = {}                  // 商家默认优惠券
                this.platformCoupon = {}                  // 平台默认优惠券

                this.mechatCouponMoney = ''                  // 商家默认优惠券
                this.platformCoupon = {}           // 平台默认优惠券
                this.getOrder()
                if (e > this.maxNumber) {
                    this.number = this.maxNumber
                    Toast(`此商品最多购买${this.maxNumber}件`);
                } else {
                    this.number = e
                    // this.getCoupon()
                    // this.orderPrice = this.$route.query.order_class == '1' ? ((this.orderOnePrice * this.number) - (this.platformCoupon.money ? this.platformCoupon.money : 0) - (this.mechatCoupon.money ? this.mechatCoupon.money : 0)).toFixed(2) : ((this.orderOnePrice * this.number) - (this.platformCoupon.money ? this.platformCoupon.money : 0) - (this.mechatCoupon.money ? this.mechatCoupon.money : 0)).toFixed(2)
                    // this.totalPrice = this.$route.query.order_class == '1' ? ((this.orderOnePrice * this.number) - (this.platformCoupon.money ? this.platformCoupon.money : 0) - (this.mechatCoupon.money ? this.mechatCoupon.money : 0)).toFixed(2) : ((this.orderOnePrice * this.number) - (this.platformCoupon.money ? this.platformCoupon.money : 0) - (this.mechatCoupon.money ? this.mechatCoupon.money : 0)).toFixed(2)
                }
            },
            $route(to, from) {
                console.log(to)
                console.log(from)
                this.$clearCookie('isWxPayed')
                this.$clearCookie('currentOrderSn')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .payDiv {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background-color: #fff;
        padding-bottom: 140px;
        /*地址*/
        .addressDiv {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 40px 26px;
            .addressDivFl {
                flex: 1;
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                i {
                    width: 40px;
                    height: 40px;
                    background: url("../../imgs/pay/icon-address.png") no-repeat center /100%;
                }
                .addressDivInfo {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin-left: 32px;
                    a {
                        width: 600px;
                        flex: 1;
                        color: #333;
                        text-align: left;
                        p {
                            width: 100%;
                            margin-bottom: 20px;
                            b {
                                font-size: 30px;
                                margin-right: 32px;
                            }
                            span {
                                font-size: 28px;
                            }
                        }
                        > span {
                            font-size: 28px;
                        }
                    }
                }
            }
            .addressDivFr {
                i {
                    width: 10px;
                    height: 18px;
                    background: url("../../imgs/pay/icon-arrow-right.png") no-repeat center /100%;
                }
            }
        }
        .noAddressDiv {
            .addressDivFl {
                align-items: center;
                i {
                    width: 80px;
                    height: 80px;
                    background: url("../../imgs/pay/icon-add-address.png") no-repeat center /100%;
                }
                .addressDivInfo {
                    flex-direction: row;
                    a {
                        p {
                            margin: 0;
                            font-size: 30px;
                        }
                    }
                }
            }

        }
        .addressHr {
            width: 100%;
            height: 10px;
            background: url("../../imgs/pay/icon-hr-bg.png") no-repeat center /100%;
        }
        /*除了地址*/
        .payInfo {
            padding: 40px 26px;
            .storeInfo {
                a {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    img {
                        width: 58px;
                        height: 58px;
                        margin-right: 14px;
                    }
                    p {
                        color: #333;
                        font-size: 30px;
                        font-weight: bold;
                    }
                }
            }
            .goodsInfo {
                a {
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    margin-top: 30px;
                    text-align: left;
                    img {
                        width: 180px;
                        height: 180px;
                        border: 2px solid #eee;
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
                                font-size: 30px;
                                height: 80px;
                                line-height: 40px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;

                            }
                            &:nth-child(2) {
                                color: #999;
                                font-size: 24px;
                                margin: 24px 0 33px;
                            }
                            &:nth-child(3) {
                                label {
                                    font-size: 24px;
                                    color: rgba(255, 72, 98, 1);
                                    margin-right: 22px;
                                    b {
                                        font-size: 32px;
                                        font-weight: normal;
                                    }
                                }
                                span {
                                    font-size: 28px;
                                    color: rgba(76, 76, 76, 1);
                                }
                            }
                        }
                    }
                }
            }
            .numberDiv {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 30px;
                border-bottom: 1px solid #eee;
                .divFl {
                    font-size: 28px;
                    color: #4d4d4d;
                }
                .divFr {
                    .number {
                        padding: 20px 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        button {
                            width: 76px;
                            height: 70px;
                            font-size: 40px;
                            color: #333;
                            background-color: transparent;
                            border: 2px solid #999;
                        }
                        .addNum {
                            -webkit-border-radius: 0 8px 8px 0;
                            -moz-border-radius: 0 8px 8px 0;
                            border-radius: 0 8px 8px 0;
                            font-weight: normal;
                        }
                        .reduceNum {
                            -webkit-border-radius: 8px 0 0 8px;
                            -moz-border-radius: 8px 0 0 8px;
                            border-radius: 8px 0 0 8px;
                            font-weight: normal;
                        }
                        input {
                            width: 100px;
                            height: 70px;
                            border: none;
                            border-top: 2px solid #999;
                            border-bottom: 2px solid #999;
                            text-align: center;
                            -webkit-border-radius: 0;
                            -moz-border-radius: 0;
                            border-radius: 0;
                        }
                    }
                }
            }
            .couponDiv {
                padding: 20px 0;
                align-items: center;
                .divFl {
                    color: #4c4c4c;
                    font-size: 28px;
                }
                .divFr {
                    flex: 1;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    margin-left: 20px;
                    a {
                        display: block;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                        font-size: 28px;
                        > div {
                            display: flex;
                            justify-content: flex-end;
                            align-items: center;
                            p {
                                color: #FF4862;
                                &:nth-child(1) {
                                    margin-right: 22px;
                                }
                                &:nth-child(2) {
                                    margin-right: 22px;
                                }
                            }
                        }
                        > p {
                            text-align: right;
                            color: #999;
                            margin-right: 22px;
                        }
                    }
                    > i {
                        width: 10px;
                        height: 18px;
                        background: url("../../imgs/pay/icon-arrow-right.png") no-repeat center/100%;
                    }
                }
            }
            .payTypeDiv {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 40px;
                margin-top: 20px;
                border-top: 2px solid #eee;
                .icon-wxPay {
                    width: 40px;
                    height: 38px;
                    margin-right: 26px;
                    background: url("../../imgs/pay/icon-wx-pay.png") no-repeat center /96%;
                }
                .icon-aliPay {
                    width: 40px;
                    height: 38px;
                    margin-right: 26px;
                    background: url("../../imgs/pay/icon-ali-pay.png") no-repeat center /96%;
                }
                .icon-check {
                    width: 50px;
                    height: 50px;
                    background: url("../../imgs/pay/icon-check.png") no-repeat center /96%;
                }
                .icon-no-check {
                    width: 50px;
                    height: 50px;
                    background: url("../../imgs/pay/icon-no-check.png") no-repeat center /96%;
                }
                span {
                    font-size: 28px;
                    color: #333;
                }
            }
        }
    }

    .payBtnDiv {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 750px;
        border-top: 2px solid #eee;
        .payBottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            background-color: #fff;
            > p {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 28px;
                color: #FF4862;
                label {
                    color: #333;
                }
                b {
                    font-size: 36px;
                    margin: 0 10px 0 16px;
                }
                span {
                }
            }
            button {
                width: 275px;
                height: 97px;
                font-size: 36px;
                color: #fff;
                background-color: #FF4862;
            }
        }
    }

    .tipsWxPayDiv {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(40, 40, 40, 1);
        .tipsDiv {
            width: 600px;
            margin-left: 50%;
            margin-top: 50%;
            transform: translate(-50%);
            background-color: #fff;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            border-radius: 20px;
            p {
                text-align: center;
            }
            .c333 {
                padding: 40px 0;
                border-bottom: 1px solid #999;
            }
            .cFF4862 {
                padding: 30px 0;
                border-bottom: 1px solid #999;
            }
            .c999 {
                padding: 30px 0;
            }
        }
    }


</style>
