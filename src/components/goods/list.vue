<template>
    <div class="list">
        <div v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="100"
             v-if="goodsList!=''">
            <router-link :to="'/detail/index?goods_id='+item.goods_id" class="goods" v-for="item,index in goodsList"
                         :key="item.goods_id">
                <div class="goodsImg">
                    <img :src="item.list_img" :alt="item.goods_name">
                    <div class="dabiaoImgDiv">
                        <div class="leftUp" v-if="JSON.stringify(item.label.left_up)!='{}'"><img
                            :src="item.label.left_up['120_120']" alt=""></div>
                        <div class="rightUp" v-if="JSON.stringify(item.label.right_up)!='{}'"><img
                            :src="item.label.right_up['120_120']" alt=""></div>
                        <div class="centerDown" v-if="JSON.stringify(item.label.middle)!='{}'"><img
                            :src="item.label.middle['250_50']" alt=""></div>
                        <div class="leftDown" v-if="JSON.stringify(item.label.left_down)!='{}'"><img
                            :src="item.label.left_down['120_120']" alt=""></div>
                        <div class="rightDown" v-if="JSON.stringify(item.label.right_down)!='{}'"><img
                            :src="item.label.right_down['120_120']" alt=""></div>
                    </div>
                    <span class="markNum">{{index+1}}</span>
                </div>
                <div class="goodsInfo">
                    <p class="goodsName">
                        {{item.goods_name}}
                    </p>
                    <p class="goodsProm">
                        <span>{{item.prom}}人团</span>
                        <span>￥{{item.prom_price}}</span>
                        <i class="quan" v-if="item.is_coupon=='1'"></i>
                    </p>
                    <p class="goodsSingle">
                        <span>单买价格：{{item.shop_price}}</span>
                        <router-link :to="'/detail/index?goods_id='+item.goods_id"></router-link>
                    </p>
                </div>
            </router-link>
        </div>
        <div class="noListDiv" v-else>
            <img src="../../imgs/base/icon-ranking-list.png" alt="" v-for="item,index in 8">
        </div>
    </div>
</template>

<script>
    export default {
        name: "list",
        data() {
            return {
                goods: {},
                goodsList: [],
                loading: false,
                page: 1
            }
        },
        mounted() {
            this.getList(1)
        },
        methods: {
            getList(page) {
                this.$post('search/search', {
                    is_desc_sales: '2',
                    page: page
                })
                    .then(res => {
                        if (page == '1') {
                            this.goods = res
                            this.goodsList = res.list
                        } else {
                            this.goodsList = this.goodsList.concat(res.list)
                        }
                        this.loading = false

                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            loadMore() {
                this.loading = true
                this.page++
                this.getList(this.page)
                this.loading = false
            }
        }
    }
</script>

<style scoped lang="scss">
    .list {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        min-height: 100%;
        background-color: #fff;
        .goods {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            background-color: #fff;
            border-bottom: 1px solid #eee;
            padding: 10px 26px;
            margin-bottom: 10px;
            color: #333;
            text-align: left;
            &:nth-child(1) {
                .goodsImg {
                    .markNum {
                        background: url("../../images/img_fillet_09@2x.png") no-repeat center /100%;
                    }
                }
            }
            &:nth-child(2) {
                .goodsImg {
                    .markNum {
                        background: url("../../images/img_ranking_02@2x.png") no-repeat center /100%;
                    }
                }
            }
            &:nth-child(3) {
                .goodsImg {
                    .markNum {
                        background: url("../../images/img_ranking_03@2x.png") no-repeat center /100%;
                    }
                }
            }
            .goodsImg {
                position: relative;
                margin-right: 20px;
                img {
                    display: block;
                    width: 250px;
                    height: 250px;
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
                            width: 70px;
                            height: 70px;
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
                            width: 250px;
                            height: 50px;
                        }
                    }
                }
                .markNum {
                    position: absolute;
                    top: 0;
                    left: 0;
                    min-width: 40px;
                    height: 48px;
                    text-align: center;
                    line-height: 48px;
                    color: #fff;
                    background: url("../../images/img_ranking_04@2x.png") no-repeat center /100%;
                }
            }
            .goodsInfo {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                align-content: center;
                p {
                    flex: 1;
                    min-width: 416px;
                    font-size: 26px;
                }
                .goodsName {
                    height: 80px;
                    line-height: 40px;
                    font-size: 28px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -moz-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                }
                .goodsProm {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    span {
                        margin-right: 10px;
                        &:nth-child(2) {
                            color: red;
                        }
                    }
                    .quan {
                        width: 46px;
                        height: 30px;
                        margin-left: 10px;
                        background: url("../../imgs/index/icon-quan.png") no-repeat center/100%;
                    }

                }
                .goodsSingle {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    span {
                        color: #999;
                    }
                    a {
                        display: block;
                        width: 120px;
                        height: 48px;
                        background: url("../../images/icon_open_group@2x.png") no-repeat center /100%;
                    }
                }
            }
        }
        .noListDiv {
            img {
                width: 698px;
                height: 230px;
                margin: 20px auto;
            }
        }
    }
</style>
