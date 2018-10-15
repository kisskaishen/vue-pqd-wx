<template>
    <div class="list">
        <ul v-if="goodsList!=''">
            <!--所有备注的都是7月新版-->
            <!--<li class="horizationGoods">-->
            <!--<div class="title">-->
            <!--<b>疯狂折扣标题</b>-->
            <!--<router-link to="">查看更多></router-link>-->
            <!--</div>-->
            <!--<swiper :options="swiperOptionTap" ref="mySwiperTap">-->
            <!--<swiper-slide v-for="item,index in 5" :key="index">-->
            <!--<router-link to="">-->
            <!--<img src="" :alt="index">-->
            <!--<div class="goodsName">商品名称</div>-->
            <!--<div class="goodsInfo">-->
            <!--<b>-->
            <!--￥<span>18.9</span>-->
            <!--</b>-->
            <!--<span class="singlePrice">单买￥38.6</span>-->
            <!--</div>-->
            <!--</router-link>-->
            <!--</swiper-slide>-->
            <!--</swiper>-->
            <!--<div class="shadow"></div>-->
            <!--</li>-->
            <li class="goods" v-for="item,index in goodsList" v-if="item.item_type=='0'">
                <router-link :to="'/detail/index?goods_id='+item.goods_id">
                    <div class="goodsImage">
                        <img v-lazy="item.original_img" :alt="item.goods_name" v-if="item.original_img">
                        <img src="../../imgs/base/icon-list.png" v-else>
                        <div class="dabiaoImgDiv">
                            <div class="leftUp" v-if="JSON.stringify(item.label.left_up)!='{}'"><img
                                v-lazy="item.label.left_up['120_120']" alt=""></div>
                            <div class="rightUp" v-if="JSON.stringify(item.label.right_up)!='{}'"><img
                                v-lazy="item.label.right_up['120_120']" alt=""></div>
                            <div class="centerDown" v-if="JSON.stringify(item.label.middle)!='{}'"><img
                                v-lazy="item.label.middle['698_70']" alt=""></div>
                            <div class="leftDown" v-if="JSON.stringify(item.label.left_down)!='{}'"><img
                                v-lazy="item.label.left_down['120_120']" alt=""></div>
                            <div class="rightDown" v-if="JSON.stringify(item.label.right_down)!='{}'"><img
                                v-lazy="item.label.right_down['120_120']" alt=""></div>
                        </div>
                    </div>
                    <div class="goodsName">
                        {{item.goods_name}}
                    </div>
                    <div class="goodsDetail">
                        <div class="detailFl">
                            <b><span>￥</span>{{item.prom_price}}</b>
                            <i class="quan" v-if="item.is_coupon=='1'"></i>
                            <span class="tuanNum">{{item.prom}}人团</span>
                            <span class="singlePrice">已拼<span>{{item.sales}}件</span></span>
                        </div>
                        <div class="detailFr">
                            <div class="groupingList" v-if="item.group&&item.group!=''">
                                <img :src="groupItem.photo" alt="" v-for="groupItem,groupIndex in item.group"
                                     @error="imgError(item,index)">
                            </div>
                            <button class="goDetailBtn">去拼团&nbsp;<i></i></button>
                        </div>
                    </div>
                </router-link>
            </li>
            <li class="goods couponDiv" v-else>
                <b class="lookTitle fz30 c4d4d4d"><i></i>每日好券推荐</b>
                <swiper :options="swiperOptionTap" ref="couponSwiper">
                    <swiper-slide v-for="itemCoupon,indexCoupon in item.coupon" :key="indexCoupon"
                                  :class="itemCoupon.is_share=='1'?itemCoupon.is_receive=='0'?'noGetClass':'isGetClass':itemCoupon.is_receive=='0'?'noGetShareClass':'isGetShareClass'">
                        <p @click.stop="getCoupon(itemCoupon,indexCoupon)">￥<b>{{itemCoupon.money}}</b></p>
                        <p class="fz20">使用期限</p>
                        <p @click.stop="getCoupon(itemCoupon,indexCoupon)" class="fz20">{{itemCoupon.receive_time}}</p>
                    </swiper-slide>
                    <div class="swiper-scrollbar" slot="scrollbar"></div>
                </swiper>
                <!--<div class="shadow" v-if="coupon.merchant"></div>-->
            </li>

            <!--<li class="goods" v-for="item,index in goodsList" v-if="index>=2">-->
            <!--<router-link :to="'/detail/index?goods_id='+item.goods_id">-->
            <!--<div class="goodsImage">-->
            <!--<img :src="item.original_img" :alt="item.goods_name" v-if="item.original_img">-->
            <!--<img src="../../imgs/base/icon-list.png" v-else>-->
            <!--&lt;!&ndash;<div class="dabiaoImgDiv">&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="leftUp" v-if="JSON.stringify(item.label.left_up)!='{}'"><img v-lazy="item.label.left_up['120_120']" alt=""></div>&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="rightUp" v-if="JSON.stringify(item.label.right_up)!='{}'"><img v-lazy="item.label.right_up['120_120']" alt=""></div>&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="centerDown" v-if="JSON.stringify(item.label.middle)!='{}'"><img v-lazy="item.label.middle['698_70']" alt=""></div>&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="leftDown" v-if="JSON.stringify(item.label.left_down)!='{}'"><img v-lazy="item.label.left_down['120_120']" alt=""></div>&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="rightDown" v-if="JSON.stringify(item.label.right_down)!='{}'"><img v-lazy="item.label.right_down['120_120']" alt=""></div>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--</div>-->
            <!--<div class="goodsName">-->
            <!--{{item.goods_name}}-->
            <!--</div>-->
            <!--<div class="goodsDetail">-->
            <!--<div class="detailFl">-->
            <!--<b><span>￥</span>{{item.prom_price}}</b>-->
            <!--<i class="quan" v-if="item.is_coupon=='1'"></i>-->
            <!--<span class="tuanNum">{{item.prom}}人团</span>-->
            <!--<span class="singlePrice">已拼<span>{{item.sales}}件</span></span>-->
            <!--</div>-->
            <!--<div class="detailFr">-->
            <!--<div class="groupingList" v-if="item.group&&item.group!=''">-->
            <!--<img :src="groupItem.photo" alt="" v-for="groupItem,groupIndex in item.group"-->
            <!--@error="imgError(item,index)">-->
            <!--</div>-->
            <!--<button class="goDetailBtn">去拼团&nbsp;<i></i></button>-->
            <!--</div>-->
            <!--</div>-->
            <!--</router-link>-->
            <!--</li>-->
        </ul>
        <ul v-if="goodsList==''">
            <li class="waitDiv" v-for="item,index in 4">
                <div class="goodsImage">
                    <img src="../../imgs/base/icon-index-list.png">
                </div>
            </li>
        </ul>
        <wx-config :currentUrl="shareInfo.share_path"></wx-config>
    </div>
</template>

<script>
    import {Toast, MessageBox} from 'mint-ui';
    import wx from 'weixin-js-sdk';         // 引入微信sdk
    import wxConfig from '../../components/wx/wxconfig'

    export default {
        props: ['list'],
        data() {
            return {
                page: 1,
                swiperOptionTap: {
                    notNextTick: true,
                    freeMode: true,
                    // autoplay: 2000,
                    speed: 500,
                    loopedSlides: true,
                    freeModeMomentumRatio: 0.5,
                    slidesPerView: 'auto',
                    preventClicks: true,
                    onClick: this.activeClick,
                    scrollbar: '.swiper-scrollbar',
                },
                shareInfo:{},           // 分享信息
            }
        },
        computed: {
            goodsList() {
                return this.list
            }
        },
        components: {wxConfig},
        mounted() {

        },
        methods: {
            // 点击swiper
            activeClick(val) {
                this.activeIndex = val.clickedIndex
            },
            imgError(val, index) {
                this.list[index].group[0].photo = 'https://cdn2.pinquduo.cn/Public/upload/logo/logo.jpg'
                // this.list[index].group[1].photo = 'https://cdn2.pinquduo.cn/Public/upload/logo/logo.jpg'
            },
            // 获取分享信息
            getShareInfo(coupon_id) {
                this.$post('coupon/getCouponShareInfo',{
                    coupon_id: coupon_id,
                    token: this.$getCookie('token')?this.$getCookie('token'):''
                })
                    .then(res=>{
                        this.shareInfo = res
                    })
            },
            // 领取优惠券
            getCoupon(val, index) {
                if (val.is_share - 1 == 1) {
                    MessageBox({
                        title: '',
                        message: `<br/><span class="fz32 c333">分享后可获得<b class="cff4862">${val.after_share_money}元</b>优惠券</span><br/><br/><span class="fz28 c999">(当前面额为${val.money}元)</span>`,
                        showCancelButton: true,
                        confirmButtonText: '分享领取',
                        cancelButtonText: '直接领取'
                    })
                        .then(res => {
                            if (res == 'confirm') {
                                this.getShareInfo(val.coupon_id)
                                // 分享
                                wx.ready(() => {
                                    // 分享朋友圈
                                    wx.onMenuShareTimeline({
                                        title: this.shareInfo.share_title, // 分享标题
                                        link: this.shareInfo.share_path, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                        imgUrl: this.shareInfo.share_img, // 分享图标
                                        success: function () {
                                            Toast({
                                                message: '分享成功',
                                                duration: 1600
                                            })
                                            this.$post('user/hanldeUserCoupon', {
                                                coupon_id: val.coupon_id,
                                                token: this.$getCookie('token')?this.$getCookie('token'):'',
                                                is_share: val.is_share - 1
                                            })
                                                .then(res => {
                                                    Toast({
                                                        message: '领取成功~',
                                                        duration: 1200
                                                    })
                                                    this.$emit('listenGoodsList')
                                                })
                                        },
                                        cancel: function () {
                                            Toast({
                                                message: '分享失败',
                                                duration: 1600
                                            })
                                        }
                                    })
                                    // 分享给朋友
                                    wx.onMenuShareAppMessage({
                                        title: this.shareInfo.share_title, // 分享标题
                                        desc: this.shareInfo.share_desc, // 分享描述
                                        link: this.shareInfo.share_path, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                        imgUrl: this.shareInfo.share_img, // 分享图标
                                        success: function () {
                                            Toast({
                                                message: '分享成功',
                                                duration: 1600
                                            })
                                            this.$post('user/hanldeUserCoupon', {
                                                coupon_id: val.coupon_id,
                                                token: this.$getCookie('token')?this.$getCookie('token'):'',
                                                is_share: val.is_share - 1
                                            })
                                                .then(res => {
                                                    Toast({
                                                        message: '领取成功~',
                                                        duration: 1200
                                                    })
                                                    this.$emit('listenGoodsList')
                                                })
                                        },
                                        cancel: function () {
                                            Toast({
                                                message: '分享失败',
                                                duration: 1600
                                            })
                                        }
                                    });

                                })
                                wx.error((err) => {
                                    console.log(err)
                                })
                            } else {
                                this.$post('user/hanldeUserCoupon', {
                                    coupon_id: val.coupon_id,
                                    token: this.$getCookie('token')?this.$getCookie('token'):'',
                                    is_share: val.is_share - 1
                                })
                                    .then(res => {
                                        Toast({
                                            message: '领取成功~',
                                            duration: 1200
                                        })
                                        this.$emit('listenGoodsList')
                                    })
                            }
                        })
                } else {
                    this.$post('user/hanldeUserCoupon', {
                        coupon_id: val.coupon_id,
                        token: this.$getCookie('token')?this.$getCookie('token'):'',
                        is_share: val.is_share - 1
                    })
                        .then(res => {
                            Toast({
                                message: '领取成功~',
                                duration: 1200
                            })
                            this.$emit('listenGoodsList')
                        })
                }
            }
        }
    }
</script>

<style lang="scss">
    .couponDiv {
        .swiper-wrapper {
            margin-bottom: 30px;
        }
        .swiper-scrollbar {
            opacity: 1 !important;
            width: 218px;
            height: 10px;
            border: 1px solid #eee;
            margin-left: 50%;
            transform: translateX(-50%);
            .swiper-scrollbar-drag {
                background-color: #FF0000;
            }
        }
    }
</style>
<style lang="scss" scoped>
    .list {
        width: 100%;
        margin-bottom: 120px;
        background-color: #fff;
        .goods {
            width: 100%;
            padding-bottom: 10px;
            background-color: #fff;
            &:nth-child(1) {
                padding-top: 10px;
            }
            hr {
                width: 698px;
                margin: 0 auto;
                border-top: 1px solid #eee;
            }
            a {
                display: block;
                width: 698px;
                margin: 30px auto 0;
                padding-bottom: 30px;
                border-bottom: 1px solid #eee;
            }
            .goodsImage {
                position: relative;
                img {
                    display: block;
                    width: 100%;
                    height: 330px;
                    border-radius: 20px;
                    /*border: 2px solid #eee;*/
                }
                .dabiaoImgDiv {
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    width: 100%;
                    > div {
                        position: absolute;
                        img {
                            width: 90px;
                            height: 90px;
                            border: none;
                            -webkit-border-radius: 0;
                            -moz-border-radius: 0;
                            border-radius: 0;
                        }
                    }
                    .leftUp {
                        left: 0;
                        top: 0;
                    }
                    .leftDown {
                        left: 0;
                        bottom: 0;
                    }
                    .rightUp {
                        right: 0;
                        top: 0;
                    }
                    .rightDown {
                        right: 0;
                        bottom: 0;
                    }
                    .centerDown {
                        left: 0;
                        right: 0;
                        bottom: 0;
                        img {
                            width: 698px;
                            height: 90px;
                        }
                    }
                }
            }
            .goodsName {
                margin: 20px 0 22px;
                font-size: 30px;
                color: #333;
                text-align: left;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .goodsDetail {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                .detailFl {
                    display: flex;
                    justify-content: center;
                    align-items: baseline;
                    b {
                        color: #ff4862;
                        font-size: 40px;
                        span {
                            font-size: 28px;
                        }
                    }
                    .quan {
                        width: 46px;
                        height: 30px;
                        margin-left: 10px;
                        background: url("../../imgs/index/icon-quan.png") no-repeat center/100%;
                    }
                    span {
                        font-size: 24px;
                    }
                    .tuanNum {
                        color: #333;
                        margin-left: 20px;
                    }
                    .singlePrice {
                        margin-left: 30px;
                        color: #999;
                        span {
                            color: #333;
                        }
                    }
                }
                .detailFr {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .groupingList {
                        display: flex;
                        justify-content: flex-start;
                        margin-right: 20px;
                        img {
                            display: block;
                            width: 54px;
                            height: 54px;
                            border: 1px solid #ccc;
                            -webkit-border-radius: 50%;
                            -moz-border-radius: 50%;
                            border-radius: 50%;
                            &:nth-child(2) {
                                margin-left: -14px;
                            }
                        }
                    }
                    .goDetailBtn {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: linear-gradient(to right, #ff8484, #ff464e);
                        -webkit-border-radius: 10px;
                        -moz-border-radius: 10px;
                        border-radius: 10px;
                        font-size: 28px;
                        width: 162px;
                        line-height: 60px;
                        i {
                            width: 10px;
                            height: 18px;
                            margin-left: 10px;
                            background: url("../../imgs/index/icon-arrow-right.png") no-repeat center /100%;
                        }
                    }
                }

            }
        }
        .couponDiv {
            position: relative;
            .swiper-container {
                padding: 26px;
                .swiper-slide {
                    position: relative;
                    width: 312px;
                    height: 150px;
                    margin-right: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p {
                        margin-left: -60px;
                        font-size: 28px;
                        color: #fff;
                        b {
                            font-size: 58px;
                        }
                    }
                }
                .noGetClass {
                    position: relative;
                    background: url("../../imgs/detail/icon-coupon-store-bg.png") no-repeat center /100%;
                }
                .isGetClass {
                    position: relative;
                    background: url("../../imgs/detail/icon-coupon-store-bged.png") no-repeat center /100%;
                    p {
                        color: #FF4862;
                    }
                }
                .noGetShareClass {
                    position: relative;
                    p {
                        color: #FF4862;
                    }
                    .fz20 {
                        color: #666;
                    }
                    background: url("../../imgs/detail/icon-coupon-store-share-bg.png") no-repeat center /100%;
                }
                .isGetShareClass {
                    position: relative;
                    background: url("../../imgs/detail/icon-coupon-store-share-bged.png") no-repeat center /100%;
                    p {
                        color: #FF4862;
                    }
                    .fz20 {
                        color: #666;
                    }
                }
            }
            .shadow {
                position: absolute;
                right: 0;
                top: 50px;
                width: 130px;
                height: 380px;
                background: url("../../imgs/index/icon-goods-shadow.png") no-repeat center /100%;
                z-index: 99;
            }

        }
        .horizationGoods {
            position: relative;
            width: 698px;
            margin: 0 auto;
            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                b {
                    border-left: 4px solid #ff4862;
                    padding-left: 18px;
                    font-size: 30px;
                    color: #4d4d4d;
                }
                a {
                    font-size: 24px;
                }
            }
            .swiper-container {
                .swiper-slide {
                    width: 250px;
                    margin-right: 20px;
                    a {
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: flex-start;
                        img {
                            display: block;
                            width: 250px;
                            height: 250px;
                            border: 1px solid red;
                        }
                        .goodsName {
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            font-size: 24px;
                            color: #333;
                            margin-top: 20px;
                        }
                        .goodsInfo {
                            b {
                                font-size: 24px;
                                color: #ff4862;
                                span {
                                    font-size: 32px;
                                }
                            }
                            .singlePrice {
                                margin-left: 20px;
                                font-size: 24px;
                                color: #999;
                            }
                        }
                    }
                }
            }
            .shadow {
                position: absolute;
                right: 0;
                top: 50px;
                width: 130px;
                height: 380px;
                background: url("../../imgs/index/icon-goods-shadow.png") no-repeat center /100%;
                z-index: 99;
            }
        }
        .waitDiv {
            .goodsImage {
                width: 698px;
                margin: 30px auto;
                img {
                    width: 100%;
                    height: 580px;
                }
            }
        }
    }
</style>
