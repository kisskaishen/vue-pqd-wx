<template>
    <div class="list">
        <div class="noGoodsDiv" v-if="goodsSquared==''" v-for="item,index in 8">
            <img src="../../imgs/base/icon-squared-list.png" alt="">
        </div>
        <div class="goods" v-for="item,index in goodsSquared" :key="item.goods_id" v-if="goodsSquared!=''">
            <router-link :to="{path:'/detail/index',query:{goods_id:item.goods_id}}">
                <div class="goodsImage">
                    <img v-lazy="item.list_img" :alt="item.goods_name" v-if="item.list_img">
                    <img src="../../imgs/base/icon-squared.png" v-else>
                    <div class="dabiaoImgDiv" v-if="item.label">
                        <div class="leftUp" v-if="JSON.stringify(item.label.left_up)!='{}'"><img v-lazy="item.label.left_up['120_120']" alt=""></div>
                        <div class="rightUp" v-if="JSON.stringify(item.label.right_up)!='{}'"><img v-lazy="item.label.right_up['120_120']" alt=""></div>
                        <div class="centerDown" v-if="JSON.stringify(item.label.middle)!='{}'"><img v-lazy="item.label.middle['336_70']" alt=""></div>
                        <div class="leftDown" v-if="JSON.stringify(item.label.left_down)!='{}'"><img v-lazy="item.label.left_down['120_120']" alt=""></div>
                        <div class="rightDown" v-if="JSON.stringify(item.label.right_down)!='{}'"><img v-lazy="item.label.right_down['120_120']" alt=""></div>
                    </div>
                </div>
                <div class="goodsName">
                    <span>{{item.goods_name}}</span>
                </div>
                <div class="goodsDetail">
                    <div>
                        <b>￥{{item.prom_price}}</b>
                        <i class="quan" v-if="item.is_coupon=='1'"></i>
                    </div>
                    <span><span>已拼</span>{{item.sales}}件</span>
                </div>
            </router-link>
        </div>

    </div>
</template>

<script>
    export default {
        props: ['goods'],
        data() {
            return {}
        },
        computed: {
            goodsSquared() {
                return this.goods
            }
        },
        mounted() {

        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background-color: #fff;
        padding: 0 18px;
        .goods {
            width: 336px;
            padding-bottom: 10px;
            margin: 20px 0 0;
            background-color: #fff;
            &:nth-child(2n) {
                margin-right: 0;
            }
            a {
                .goodsImage {
                    position: relative;
                    img {
                        display: block;
                        width: 100%;
                        height: 336px;
                        -webkit-border-radius: 8px;
                        -moz-border-radius: 8px;
                        border-radius: 8px;
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
                                width: 336px;
                                height: 70px;
                            }
                        }
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
                    align-items: center;
                    justify-content: space-between;
                    > div {
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        b {
                            color: #F13D3C;
                            font-size: 32px;
                            margin-right: 20px;
                        }
                        .quan {
                            width: 46px;
                            height: 30px;
                            background: url("../../imgs/index/icon-quan.png") no-repeat center/100%;
                        }
                    }
                    span {
                        font-size: 24px;
                        color: #4c4c4c;
                        span {
                            color: #999;
                        }
                    }

                }
            }
        }
        .noGoodsDiv {
            padding-bottom: 10px;
            margin: 20px 0 0;
            background-color: #fff;
            img {
                width: 336px;
                height: 492px;
            }
        }
    }
</style>
