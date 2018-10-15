<template>
    <div class="goodsBaseInfo">
        <div class="top">
            <div class="price">
                <div class="pqdPrice">
                    <b><span>￥</span>{{goodsInfo.prom_price}}</b>
                </div>
                <div class="salePrice">
                    <span class="marketPrice">￥{{goodsInfo.market_price}}</span>
                </div>
                <div class="tips" v-if="goodsInfo.activity.tips!=''">
                    <p>{{goodsInfo.activity.tips}}</p>
                </div>
            </div>
            <div class="saleNum">
                <span>已售{{goodsInfo.sales}}件</span>
            </div>
        </div>
        <div class="couponDiv" v-if="couponList.merchant&&couponList.merchant.length>0" @click="getCouponBtn">
            <div>
                <div v-for="item,index in couponList.tips" :key="item.type">
                    <i></i>
                    <span>{{item.name}}</span>
                </div>
            </div>
            <i></i>
        </div>
        <!--<div class="topCoupon" v-if="couponList.merchant&&couponList.merchant.length>0" @click="getCouponBtn">-->
            <!--<button>领券</button>-->
            <!--<p>-->
                <!--<span v-for="item,index in couponList.merchant">{{item.name}}</span>-->
            <!--</p>-->
        <!--</div>-->
        <div class="goodsName">
            <b>{{goodsInfo.goods_name}}</b>
        </div>
        <div class="tip" v-if="goodsInfo.goods_tips">
            <div v-for="item,index in goodsInfo.goods_tips" :key="item.type">
                <i></i>
                <span>{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['info', 'couponInfo'],
        data() {
            return {
                isShowCouponDiv: false
            }
        },
        computed: {
            goodsInfo() {
                return this.info
            },
            couponList() {
                return this.couponInfo
            }
        },
        mounted() {
        },
        methods: {
            // 点击领券
            getCouponBtn() {
                this.$emit('isCouponDivShow', true)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goodsBaseInfo {
        position: relative;
        margin-top: -20px;
        -webkit-border-radius: 30px;
        -moz-border-radius: 30px;
        border-radius: 20px;
        background-color: #fff;
        width: 100%;
        > div {
            padding: 0 26px;
        }
        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #666;
            font-size: 24px;

            .price {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 20px 0 10px;
                .pqdPrice {
                    margin-right: 20px;
                    font-size: 58px;
                    color: #ff4842;
                    span {
                        font-size: 28px;
                    }
                }
                .salePrice {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    font-size: 24px;
                    line-height: 28px;
                    .marketPrice {
                        text-decoration: line-through;
                        color: #999;
                    }

                    /*text-decoration: line-through;*/
                    /*font-size: 20px;*/
                }
                .tips {
                    margin-left: 20px;
                    p {
                        padding: 4px 8px;
                        background-color: #FDE750;
                        color: #333;
                        position: relative;
                        &:after {
                            position: absolute;
                            content: '';
                            left: -16px;
                            top: 50%;
                            transform: translateY(-50%);
                            border-right: 12px solid #FDE750;
                            border-top: 10px solid transparent;
                            border-bottom: 10px solid transparent;
                        }

                    }
                }
            }
            .saleNum {
                color: #4c4c4c;
                font-size: 28px;
            }
        }
        .topCoupon {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            button {
                color: #ff4862;
                padding: 10px 20px;
                background-color: #fff2f1;
                border-radius: 6px;
            }
            p {
                max-width: 240px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                span {
                    color: #4c4c4c;
                }
            }
        }
        .couponDiv {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 26px 20px;
            color: #666;
            > div {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                > div {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    padding: 16px 0;
                    margin-right: 20px;
                    i {
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        margin-right: 10px;
                        vertical-align: middle;
                        background: url("../../imgs/detail/icon-quan.png") no-repeat center /100%;
                        box-sizing: border-box;
                    }
                    span {
                        color: #4C4C4C;
                    }

                }
            }
            > i {
                width: 10px;
                height: 18px;
                background: url("../../imgs/index/icon-arrow-right-gray.png") no-repeat center /100%;
            }
        }
        .coupon {
            background-color: #fff;
            /*border-bottom: 1px solid #ccc;*/
            a {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 100%;
                padding: 10px 0;
                > div {
                    margin-right: 20px;
                    i {
                        display: inline-block;
                        width: 40px;
                        height: 40px;
                        text-align: center;
                        line-height: 44px;
                        margin-right: 8px;
                        font-style: normal;
                        -webkit-border-radius: 6px;
                        -moz-border-radius: 6px;
                        border-radius: 6px;
                        color: #fff;
                        background-color: red;
                    }
                    span {
                        color: #888;
                    }
                }
            }
        }
        .goodsName {
            padding: 0 26px;
            background-color: #fff;
            b {
                display: block;
                font-size: 28px;
                color: #000;
                font-weight: normal;
                line-height: 54px;
                font-size: 36px;

            }
            span {
                font-size: 20px;
                color: #666;
            }
        }
        .tip {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0 26px 20px;
            border-bottom: 1px solid #eee;
            > div {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 10px 0;
                margin-right: 20px;
                i {
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    margin-right: 10px;
                    vertical-align: middle;
                    background: url("../../imgs/detail/icon-tip.png") no-repeat center /100%;
                    box-sizing: border-box;
                }
                span {
                    color: #4C4C4C;
                }

            }
        }
    }
</style>
