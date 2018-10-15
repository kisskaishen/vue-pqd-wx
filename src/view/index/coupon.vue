<template>
    <div class="indexCoupon">
        <div class="titleDiv">
            <i class="divFl"></i>
            <img src="../../imgs/coupon/icon-title.png" alt="每日神券">
            <i class="divFr"></i>
        </div>
        <div class="couponDiv">
            <swiper :options="swiperOptionTap">
                <swiper-slide v-for="item,index in couponList" :key="index">
                    <div class="couponSwiper shareCoupon" v-if="index<=1">
                        <div class="couponInfo">
                            <img src="../../imgs/coupon/icon-platform2.png" alt="优惠券" v-if="index==0">
                            <img src="../../imgs/coupon/icon-merchat2.png" alt="优惠券" v-if="index==1">
                            <p class="money">
                                <span class="fz32 cff4862">￥</span>
                                <b class="fz94 cff4862">{{item.money}}</b>
                            </p>
                            <p class="fz24 c666">满{{item.condition_money}}使用</p>
                            <p class="goodsName fz24 c333 overflow2 fwbold">{{item.coupon_name}}</p>
                        </div>
                        <div class="couponBtn" v-if="index==0">
                            <button class="fz24 cfff5dd bg75602d">分享领取￥{{item.after_share_money}}</button>
                            <p class="c75602d" @click="getCoupon(item,index)">只领取￥{{item.money}}</p>
                        </div>
                        <div class="couponBtn" v-if="index==1">
                            <button class="fz24 c75602d bgfff br2solid75602d">立即使用</button>
                        </div>
                    </div>
                    <div class="couponSwiper normalCoupon" v-if="index>1">
                        <div class="couponInfo">
                            <img src="../../imgs/coupon/icon-platform2.png" alt="优惠券" v-if="index==2">
                            <img src="../../imgs/coupon/icon-merchat2.png" alt="优惠券" v-if="index==3">
                            <p class="money">
                                <span class="fz32 cff4862">￥</span>
                                <b class="fz94 cff4862">10</b>
                            </p>
                            <p class="fz24 c666">满100使用</p>
                            <p class="goodsName fz24 c333 overflow2 fwbold">优惠券名称优惠券名称优惠券名称优惠券名称优惠券名称优惠券名称</p>
                        </div>
                        <div class="couponBtn">
                            <button class="fz24 cfff bgff4862" v-if="index==1">立即领取</button>
                            <button class="fz24 cff4862 bgfff br2solidff4862" v-else>立即使用</button>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
            <router-link to="/coupon/index" class="cff4862 fz28 bgfff">获取更多优惠券</router-link>
        </div>
        <div class="moreList">
            <b class="lookTitle fz30"><i></i>精品推荐</b>
            <goods-squared :goods="goodsList"></goods-squared>
            <p>----已经到底了----</p>
        </div>
    </div>
</template>

<script>
    import GoodsSquared from "../../components/index/goodsCouponSquared";

    export default {
        name: "indexCoupon",
        data() {
            return {
                swiperOptionTap: {
                    notNextTick: true,
                    freeMode: true,
                    speed: 500,
                    loopedSlides: true,
                    freeModeMomentumRatio: 0.5,
                    slidesPerView: 'auto',
                },
                couponList:[],               // 优惠券列表
                goodsList:[],               // 商品列表
            }
        },
        mounted() {
            this.getCouponList()
            this.getGoodsList(1)
        },
        components: {GoodsSquared},
        methods: {
            // 推荐优惠券列表
            getCouponList() {
                this.$post('coupon/getCouponPosition',{
                    position_id:'2',
                    token:this.$getCookie('token'),
                })
                    .then(res=>{
                        this.couponList = res.list
                    })
            },
            // 获取优惠券

            // 精品推荐
            getGoodsList(page) {
                this.$post('coupon/getCouponGoodsList',{
                    page:page
                })
                    .then(res=>{
                        this.goodsList = [...this.goodsList,...res.list]
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    .indexCoupon {
        .titleDiv {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 36px 0 30px;
            i {
                width: 172px;
                height: 2px;
            }
            .divFl {
                background: url("../../imgs/coupon/icon-hr-left.png") no-repeat center /100%;
            }
            .divFr {
                background: url("../../imgs/coupon/icon-hr-right.png") no-repeat center /100%;
            }
            img {
                width: 340px;
                height: 44px;
            }
        }
        .couponDiv {
            padding-left: 10px;
            .swiper-slide {
                width: 258px;
                height: 418px;
                margin-left: 14px;
                .couponSwiper {
                    width: 258px;
                    height: 418px;
                    .couponInfo {
                        position: relative;
                        > img {
                            width: 80px;
                            height: 30px;
                        }
                        p {
                            text-align: center;
                        }
                        .money {
                            display: flex;
                            justify-content: center;
                            align-items: end;
                            margin-top: 20px;
                            margin-bottom: 14px;
                            span {
                                margin-right: -10px;
                            }
                            b {
                                height: 70px;
                                line-height: 70px;
                            }
                        }
                        .goodsName {
                            padding: 0 20px;
                            margin-top: 28px;
                            height: 56px;
                            line-height: 28px;
                        }
                    }
                    .couponBtn {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        height: 96px;
                        margin-top: 56px;
                        button {
                            width: 202px;
                            height: 50px;
                            margin: 0 auto;
                            border-radius: 50px;
                        }
                        p {
                            height: 25px;
                            margin-top: 16px;
                            text-decoration: underline;
                            text-align: center;
                        }
                    }
                }
                .shareCoupon {
                    background: url("../../imgs/coupon/icon-coupon-share-hr-bg.png") no-repeat center /100%;
                }
                .normalCoupon {
                    background: url("../../imgs/coupon/icon-coupon-hr-bg.png") no-repeat center /100%;
                }

            }
            > a {
                display: block;
                margin: 36px auto;
                width: 310px;
                height: 70px;
                line-height: 70px;
                border-radius: 70px;
                border: 2px solid #ffb5c0;
            }
        }
        .moreList {
            margin-top: 80px;
            p {
                text-align: center;
                margin-top: 20px;
            }
        }
    }
</style>
