<template>
    <div>
        <div class="bottom" v-if="this.$route.query.from=='like'">
            <div class="likeBottomFl">
                助力详情
            </div>
            <div class="likeBottomFr">
                <p class="">免费领取</p>
            </div>
        </div>
        <div class="bottom" v-else>
            <div class="bottomFl">
                <div>
                    <router-link
                        :to="'/chat/index?goods_id='+this.$route.query.goods_id">
                        <i class="iconTalk"></i>
                        客服
                    </router-link>
                </div>
                <div @click="setCollect">
                    <i :class="isCollected?'iconCollected':'iconCollection'"></i>
                    收藏
                </div>

            </div>
            <div class="bottomFr" v-if="goodsInfo.is_on_sale=='1'">
                <button class="buyFl" @click="showSpec(1)">
                    <p>￥{{goodsInfo.shop_price}}</p>
                    <span>(单独购买)</span>
                </button>
                <button class="buyFr" @click="showSpec(2)">
                    <p>￥{{goodsInfo.prom_price}}</p>
                    <span>({{goodsInfo.prom}}人拼单)</span>
                </button>
            </div>
            <div class="bottomFr" v-if="goodsInfo.is_on_sale=='0'">
                <button class="noBtn">商品已下架</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        props: ['bottomInfo'],
        data() {
            return {
                isCollected: false
            }
        },
        computed: {
            goodsInfo() {
                return this.bottomInfo
            }
        },
        mounted() {
            if (this.$getCookie('token')) {
                this.isGetCollect()
            }
        },
        methods: {
            // 判断是单买还是拼团
            showSpec(val) {
                this.$emit('buyClick', val)
            },
            // 判断是否被收藏
            isGetCollect() {
                this.$post('user/isGoodsCollect', {
                    goods_id: this.$route.query.goods_id,
                    token: this.$getCookie('token') ? this.$getCookie('token') : ''
                })
                    .then(res => {
                        this.isCollected = res.is_coller == '1' ? true : false
                    })
            },
            // 点击收藏按钮
            setCollect() {
                if (this.isCollected) {
                    this.$post('user/cancelGoodsCollect', {
                        goods_id: this.$route.query.goods_id,
                        token: this.$getCookie('token') ? this.$getCookie('token') : ''
                    })
                        .then(res => {
                            Toast({
                                message: '取消收藏成功',
                                duration: 1600
                            })
                            this.isCollected = false
                        })
                } else {
                    this.$post('user/addGoodsCollect', {
                        goods_id: this.$route.query.goods_id,
                        token: this.$getCookie('token') ? this.$getCookie('token') : ''
                    })
                        .then(res => {
                            Toast({
                                message: '收藏成功',
                                duration: 1600
                            })
                            this.isCollected = true
                        })

                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    .bottom {
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 750px;
        max-width: 1500px;
        background-color: #fff;
        border-top: 2px solid #eee;
        z-index: 9;
    }

    .bottomFl {
        display: flex;
        align-items: center;
        width: 750px;
        div {
            width: 100px;
            text-align: center;
            border-right: 1px solid #ccc;
            i {
                display: block;
                width: 40px;
                height: 40px;
                margin: 0 auto;
            }
            color: #666;
            a {
                color: #666;
            }
            .iconHome {
                background: url("../images/icon_home.png") no-repeat center /100%;
            }
            .iconCollection {
                background: url("../imgs/detail/icon-goods-collect.png") no-repeat center /100%;
            }
            .iconCollected {
                background: url("../imgs/detail/icon-goods-collect-active.png") no-repeat center /100%;
            }
            .iconTalk {
                background: url("../imgs/detail/icon-message.png") no-repeat center /100%;
            }
        }

    }

    .bottomFr {
        display: flex;
        align-items: center;
        p {
            font-size: 36px;
        }
        span {
            font-size: 22px;
        }

        button {
            padding: 12px 0;
            color: #fff;
        }
        .buyFl {
            width: 275px;
            background-color: #fff;
            color: #333;
        }
        .buyFr {
            width: 275px;
            background-color: rgb(255,72,98);
        }
        .noBtn {
            width: 550px;
            line-height: 95px;
            font-size: 32px;
            color: #999;
            background: transparent;
        }
    }
</style>
