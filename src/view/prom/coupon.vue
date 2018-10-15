<template>
    <div class="promCoupon">
        <div class="couponDiv">
            <!--<div class="couponDiv" v-if="isShowLoading">-->
            <div class="couponBg">
                <div class="couponTop" v-if="isShowLoading">
                    <p>
                        <b class="ft80">￥</b>
                        <b class="ft120">{{detailInfo.coupon_discount}}</b>
                    </p>
                    <p>
                        <span
                            class="ft28 ft4c4c4c">{{detailInfo.coupon_time_desc}}</span>
                    </p>
                </div>
                <div class="couponTop" v-else>
                    <p class="ft80" style="padding-top: 40px">优惠券失效</p>
                    <p>(tips:失效原因可能为商品无设置优惠券)</p>
                </div>
                <div class="couponBottom">
                    <div class="goodsDiv">
                        <div class="divFl">
                            <img :src="detailInfo.goods_list_img" alt="">
                        </div>
                        <div class="divFr">
                            <div class="goodsName ft30 fr333">{{detailInfo.goods_name}}</div>
                            <div class="marketMoney ft24 fr333">现价￥{{detailInfo.min_group_price}}</div>
                            <div class="couponMoney" v-if="isShowLoading">
                                <p>
                                    <i></i>
                                    <span class="ftFF4862">
                                        <label>￥</label>
                                        <b class="ft42">{{detailInfo.discount_price}}</b>
                                    </span>
                                </p>
                                <p class="ft999">已领{{detailInfo.sale}}件</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="couponTips">
                    <p v-for="item,index in detailInfo.tips">
                        <i></i>
                        <span>{{item.name}}</span>
                    </p>
                </div>
            </div>
            <div class="couponBtn">
                <p class="ft34 ftFF4862" @click.stop="getCoupon(detailInfo)" v-if="isShowLoading">一键抢券</p>
                <p class="ft34 ftFF4862" @click="goDetail()" v-else>前往详情</p>
            </div>
        </div>
        <div class="moreList">
            <!--<div class="moreList" v-if="isShowLoading">-->
            <b><i></i>看了又看</b>
            <div class="goodsList">
                <div class="goods" v-for="item,index in goodsList" :key="item.goods_id" @click="getCoupon(item,index)">
                    <div class="goodsImage">
                        <img :src="item.goods_list_img" :alt="item.goods_name">
                    </div>
                    <div class="goodsName">
                        <span>{{item.goods_name}}</span>
                    </div>
                    <div class="goodsDetail">
                        <b>折后价:￥{{item.discount_price}}</b>
                        <span style="text-decoration: line-through">￥{{item.min_group_price}}</span>
                    </div>
                    <div class="btn">
                        <button @click="getCoupon(item,index)">一键抢券</button>
                    </div>
                </div>
            </div>
            <p>----没有更多数据了----</p>
        </div>
        <div class="loading">

        </div>
    </div>
</template>

<script>
    import {Toast, Indicator} from 'mint-ui';
    import autoLogin from '../../config/autoLogin'

    export default {
        name: "coupon",
        data() {
            return {
                isShowLoading: false,
                detailInfo: {tips: []},
                uuid: '',
                goodsList: [],
            }
        },
        mounted() {
            Indicator.open();
            // this.$setCookie('canBack',true)
            this.getDetail()
        },
        methods: {
            // 详情信息
            getDetail() {
                this.$post('prom/coupon', {
                    goods_id: this.$route.query.goods_id,
                    pid: this.$route.query.pid,
                    custom_parameters: this.$route.query.custom_parameters
                })
                    .then(res => {
                        Indicator.close();
                        this.detailInfo = res.detail
                        this.uuid = res.uuid
                        if (res.detail.coupon_id == '') {
                            this.isShowLoading = false
                        } else {
                            // 有优惠券的时候
                            this.isShowLoading = true
                        }
                        this.getGoodsList()

                        // if (res.detail.coupon_id == ''&&this.$getCookie('canBack')) {       // 没有优惠券直接跳转到商品详情页面
                        //     setTimeout(() => {
                        //         if (this.$getCookie('terminal') == 'i') {
                        //             window.showGoodsDetail(this.detailInfo.goods_id,this.uuid)
                        //         } else if (this.$getCookie('terminal') == 'a') {
                        //             window.webview.showGoodsDetail(this.detailInfo.goods_id,this.uuid)
                        //         } else {
                        //             this.$router.push(`/detail/index?goods_id=${res.detail.goods_id}`)
                        //             // this.$setCookie('canBack',false)
                        //         }
                        //     }, 200)
                        // } else {
                        //     this.isShowLoading = true
                        //     this.getGoodsList()
                        // }
                    })
            },
            // 前往商品详情
            goDetail() {
                if (this.$getCookie('terminal') == 'i') {
                    window.showGoodsDetail(this.detailInfo.goods_id, this.uuid)
                } else if (this.$getCookie('terminal') == 'a') {
                    window.webview.showGoodsDetail(this.detailInfo.goods_id, this.uuid)
                } else {
                    this.$router.push(`/detail/index?goods_id=${this.detailInfo.goods_id}`)
                }
            },
            // 领取优惠券
            getCoupon(val, index) {         // 点击领取优惠券直接跳转到商品详情页面
                if (this.$getCookie('token')) {
                    this.$post('user/hanldeUserCoupon', {
                        coupon_id: val.coupon_id,
                        token: this.$getCookie('token'),
                        is_gyb:1                // 判断是否是高拥宝的领取优惠券
                    })
                        .then(res => {
                            Toast('抢券成功，前往商品页中...')
                            setTimeout(() => {
                                if (this.$getCookie('terminal') == 'i') {
                                    window.showGoodsDetail(this.detailInfo.goods_id, this.uuid)
                                } else if (this.$getCookie('terminal') == 'a') {
                                    window.webview.showGoodsDetail(this.detailInfo.goods_id, this.uuid)
                                } else {
                                    this.$router.push(`/detail/index?goods_id=${val.goods_id}`)
                                }
                            }, 1000)
                        })
                } else {
                    autoLogin()
                }
            },
            // 猜你喜欢
            getGoodsList() {
                this.$post('prom/goodslist', {
                    p_cat_id: this.detailInfo.p_cat_id,
                    token: this.$getCookie('token')
                })
                    .then(res => {
                        this.goodsList = res.list
                    })
            },
        }
    }
</script>

<style scoped lang="scss">
    .couponDiv {
        width: 750px;
        height: 950px;
        padding-top: 150px;
        background: url("../../imgs/prom/icon-bg.png") no-repeat center /100%;
        .couponBg {
            width: 750px;
            height: 618px;
            background: url("../../imgs/prom/icon-coupon-bg.png") no-repeat center /100%;
            .couponTop {
                p {
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    b {
                        color: #E4314B;
                        margin-top: 28px;
                        margin-bottom: 6px;
                    }
                }
            }
            .couponBottom {
                .goodsDiv {
                    margin-top: 78px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    padding: 0 50px;
                    .divFl {
                        img {
                            display: block;
                            width: 250px;
                            height: 250px;
                        }
                    }
                    .divFr {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: flex-start;
                        align-self: stretch;
                        > div {
                            width: 100%;
                        }
                        .goodsName {
                            margin-top: 10px;
                            height: 80px;
                            line-height: 40px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                        }
                        .marketMoney {
                            margin-top: 68px;
                            margin-bottom: 20px;
                            line-height: 24px;
                        }
                        .couponMoney {
                            display: flex;
                            justify-content: space-between;
                            align-items: flex-end;
                            p {
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                i {
                                    width: 104px;
                                    height: 42px;
                                    background: url("../../imgs/prom/icon-coupon-money.png") no-repeat center /100%;
                                }
                                span {
                                    label {
                                        margin-right: -10px;
                                        margin-left: 10px;
                                    }
                                    b {

                                    }
                                }
                            }
                            .ft999 {
                                line-height: 40px;
                            }
                        }
                    }
                }
            }
            .couponTips {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 14px 80px;
                p {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    i {
                        display: block;
                        width: 24px;
                        height: 24px;
                        background: url("../../imgs/prom/icon-coupon-right.png") no-repeat center /100%;
                    }
                    span {
                        padding-left: 10px;
                    }
                }
            }
        }
        .couponBtn {
            margin-top: 26px;
            p {
                width: 714px;
                height: 114px;
                line-height: 114px;
                margin: 0 auto;
                background: url("../../imgs/prom/icon-btn.png") no-repeat center /100%;
                text-align: center;
            }
        }
    }

    .moreList {
        margin-top: 40px;
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
        .goodsList {
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
            padding: 0 18px;
            .goods {
                width: 336px;
                padding-bottom: 10px;
                margin: 20px 0 0;
                background-color: #fff;
                &:nth-child(2n) {
                    margin-right: 0;
                }
                .goodsImage {
                    img {
                        display: block;
                        width: 100%;
                        height: 336px;
                        -webkit-border-radius: 8px;
                        -moz-border-radius: 8px;
                        border-radius: 8px;
                    }
                }
                .goodsName {
                    span {
                        display: block;
                        width: 100%;
                        height: 84px;
                        line-height: 42px;
                        font-size: 30px;
                        color: #333;
                        text-align: left;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        line-clamp: 2;
                        margin: 12px 0;
                    }
                }
                .goodsDetail {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    b {
                        color: #F13D3C;
                        font-size: 32px;
                        margin-right: 20px;
                        padding: 0;
                    }
                    span {
                        font-size: 24px;
                        color: #4c4c4c;
                        span {
                            color: #999;
                        }
                    }
                }
                .btn {
                    margin-top: 16px;
                    button {
                        width: 100%;
                        height: 66px;
                        line-height: 66px;
                        background-color: #FF4862;
                        -webkit-border-radius: 66px;
                        -moz-border-radius: 66px;
                        border-radius: 66px;
                    }
                }
            }

        }
    }
</style>
