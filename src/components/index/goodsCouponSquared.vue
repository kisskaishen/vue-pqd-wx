<template>
    <div class="list">
        <div class="noGoodsDiv" v-if="goodsSquared==''" v-for="item,index in 8">
            <img src="../../imgs/base/icon-squared-list.png" alt="">
        </div>
        <div class="goods" v-for="item,index in goodsSquared" :key="item.goods_id" v-if="goodsSquared!=''">
            <router-link :to="{path:'/detail/index',query:{goods_id:item.goods_id}}">
                <div class="goodsImage">
                    <img v-lazy="item.goods_img" :alt="item.goods_name" v-if="item.goods_img">
                    <img src="../../imgs/base/icon-squared.png" v-else>
                </div>
                <div class="goodsName">
                    <span class="overFlow1 c333 fz30">{{item.goods_name}}</span>
                </div>
                <div class="goodsCoupon">
                    <button class="cff4862 fz28 bgfff br2solidff4862 ">{{item.coupon_money}}</button>
                </div>
                <div class="goodsDetail">
                    <span class="cff4862 fz24 mr20 fwbold">
                        ￥
                        <span class="cff4862 fz32">{{item.prom_price}}</span>
                    </span>
                    <span class="c999 fz24">￥100.00</span>
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
                }
                .goodsName {
                    span {
                        display: block;
                        width: 100%;
                        height: 30px;
                        line-height: 30px;
                        text-align: left;
                        margin: 20px 0 14px;
                    }
                }
                .goodsCoupon {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    margin-bottom: 20px;
                    button {
                        width: 128px;
                        height: 48px;
                        border-radius: 48px;
                    }
                }
                .goodsDetail {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;

                    .c999 {
                        text-decoration: line-through;
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
