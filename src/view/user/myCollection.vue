<template>
    <div class="myCollection">
        <div class="title">
            <span v-for="item,index in titles" :class="currentIndex==index?'red':''" @click="titleClick(item,index)">{{item.name}}</span>
        </div>
        <div class="collecDiv">
            <div class="goodsList" v-infinite-scroll="loadMore"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="100" v-if="currentIndex=='0'&&goodsList.length>0">
                <div class="collect divDiv" v-for="item,index in goodsList">
                    <div class="divFl">
                        <img :src="item.list_img" :alt="item.goods_name" @click="goDetail(item,index)">
                    </div>
                    <div class="divFr">
                        <p class="name">
                            {{item.goods_name}}
                            <!--<i class="icon-delete" @click="cancelCollect(item,index)"></i>-->
                        </p>
                        <p class="sale">
                            <span>{{item.prom}}人团·已领</span>
                            {{item.sales}}件
                        </p>
                        <div class="money">
                            <span class="red">￥{{item.prom_price}}</span>
                            <div class="divFr">
                                <transition name="fade">
                                    <div class="moreOpt" v-if="index==showMoreOptIndex && isShowMoreOpt">
                                        <span @click="cancelCollect(item,index)">取消收藏</span>
                                        <span @click="goStore(item,index)">进入店铺</span>
                                    </div>
                                </transition>
                                <button @click="moreOpetion(item,index)">更多</button>
                                <button class="goBtn" @click="goDetail(item,index)">发起拼团</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="storeList" v-infinite-scroll="loadMore2"
                 infinite-scroll-disabled="loading2"
                 infinite-scroll-distance="100" v-if="currentIndex=='1'&&storeList.length>0">
                <div class="collect divDiv" v-for="item,index in storeList">
                    <div class="storeDiv">
                        <div class="divFl">
                            <img :src="item.store_logo" alt="">
                            <div class="storeInfo">
                                <b>{{item.store_name}}</b>
                                <p>
                                    <label><span>已拼</span><span>{{item.virtual_sales}}</span></label>
                                    <label><span>商品数量</span><span>{{item.goods_total}}</span></label>
                                </p>
                            </div>
                        </div>
                        <div class="divFr">
                            <router-link :to="`/store/index?store_id=${item.store_id}`" class="red">进店逛逛</router-link>
                        </div>
                    </div>
                    <div class="goodsDiv">
                        <ul>
                            <li v-for="item in item.goods_items">
                                <router-link :to="`/detail/index?goods_id=${item.goods_id}`">
                                    <img :src="item.list_img" alt="">
                                    <p>{{item.goods_name}}</p>
                                    <div>
                                        <b class="red">￥{{item.prom_price}}</b>
                                        <span>已拼 <span>{{item.sales}}件</span></span>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                        <div class="shadowBg"></div>
                    </div>
                </div>
            </div>
            <div class="noCollectDiv" v-if="currentIndex=='0'&&goodsList.length<=0">
                <img src="../../imgs/user/icon-no-collect.png" alt="">
                <span>暂无收藏商品</span>
            </div>
            <div class="noCollectDiv" v-if="currentIndex=='1'&&storeList.length<=0">
                <img src="../../imgs/user/icon-no-collect.png" alt="">
                <span>暂无收藏商家</span>
            </div>
            <div class="moreGoods" style="display: none;">
                <div class="tip">
                    <b><i></i>看了又看</b>
                </div>
                <goods-squared :goods="moreGoodsList"></goods-squared>
            </div>
        </div>

    </div>
</template>

<script>
    import GoodsSquared from '../../components/index/goodsSquared'
    import {Toast} from 'mint-ui';

    export default {
        name: "myCollection",
        data() {
            return {
                titles: [
                    {
                        name: '商品',
                        id: '0'
                    },
                    {
                        name: '店铺',
                        id: '1'
                    }
                ],
                currentIndex: '0',
                showMoreOptIndex: '',
                isShowMoreOpt: false,
                goodsList: [],
                page1: 0,
                loading: false,
                storeList: [],
                page2: 0,
                loading2: false,

                moreGoodsList: []
            }
        },
        mounted() {
            this.loading = true
            this.getList(1)
            this.moreGoods()
        },
        components: {GoodsSquared},
        methods: {
            // 商品/店铺切换
            titleClick(val, index) {
                this.currentIndex = index
                if (index == '0') {
                    this.page1 = 0
                    this.getList(1)
                } else {
                    this.page2 = 0
                    this.loading2 = true
                    this.getStoreList(1)
                }
            },
            getList(page) {
                this.$post('user/getGoodsCollectList', {
                    token: this.$getCookie('token'),
                    page: page
                })
                    .then(res => {
                        console.log(res.list)
                        if (this.page1 <= '1') {
                            if (res.list != '') {
                                this.goodsList = res.list
                            } else {
                                this.goodsList = ''
                            }
                        } else if (this.page1 > 1) {
                            this.goodsList = this.goodsList.concat(res.list)
                        }
                    })
            },
            // 跳转到商品详情
            goDetail(val, index) {
                this.$router.push({
                    path: '/detail/index',
                    query: {
                        goods_id: val.goods_id
                    }
                })
            },
            // 更多操作
            moreOpetion(val, index) {
                this.showMoreOptIndex = index
                this.isShowMoreOpt = !this.isShowMoreOpt
            },
            // 取消收藏
            cancelCollect(val, index) {
                this.$post('user/cancelGoodsCollect', {
                    token: this.$getCookie('token'),
                    goods_id: val.goods_id
                })
                    .then(res => {
                        Toast({
                            message: '已取消收藏',
                            duration: 1400
                        })
                        this.goodsList.splice(index, 1)
                        this.isShowMoreOpt = false
                    })
            },
            // 进入店铺
            goStore(val, index) {
                this.$router.push({
                    path: '/store/index',
                    query: {
                        store_id: val.store_id
                    }
                })
            },
            // 无限加载
            loadMore() {
                this.page1++;
                this.getList(this.page1)
                this.loading = false
            },


            // 店铺
            // 店铺收藏列表
            getStoreList(page) {
                this.$post('user/getStoreCollectList', {
                    page: page,
                    token: this.$getCookie('token') ? this.$getCookie('token') : ''
                })
                    .then(res => {
                        if (this.page2 <= '1') {
                            if (res.list != '') {
                                this.storeList = res.list
                            } else {
                                this.storeList = ''
                            }
                        } else if (this.page2 > '1') {
                            this.storeList = this.storeList.concat(res.list)
                        }
                    })
            },
            loadMore2() {
                this.page2++;
                this.getStoreList(this.page2)
                this.loading2 = false
            },


            // 看了又看
            moreGoods() {
                this.$post('search/search', {})
                    .then(res => {
                        this.moreGoodsList = res.list
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    .myCollection {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        min-height: 100%;
        background-color: #fff;
        .title {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 80px;
            border-bottom: 1px solid #eee;
            border-top: 1px solid #eee;
            span {
                font-size: 28px;
                flex: 1;
                margin: 26px 0;
                text-align: center;
                &:first-child {
                    border-right: 1px solid #eee;
                }
            }
        }
        .goodsList {
            .collect {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                background-color: #fff;
                margin-top: 20px;
                padding: 26px;
                border-bottom: 1px solid #eee;
                .divFl {
                    img {
                        display: block;
                        width: 250px;
                        height: 250px;
                    }
                }
                .divFr {
                    width: 100%;
                    flex-direction: column;
                    align-items: flex-start;
                    align-self: stretch;
                    p {
                        width: 100%;
                    }
                    .name {
                        height: 80px;
                        line-height: 40px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        font-size: 30px;
                        color: #333;
                    }
                    .sale {
                        font-size: 24px;
                        margin-top: -40px;
                        span {
                            color: #999;
                        }
                    }
                    .money {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 32px;
                        .divFr {
                            position: relative;
                            flex-direction: row;
                            justify-content: flex-end;
                            align-items: center;
                            .moreOpt {
                                position: absolute;
                                left: 30px;
                                bottom: -180px;
                                width: 160px;
                                height: 160px;
                                -webkit-border-radius: 8px;
                                -moz-border-radius: 8px;
                                border-radius: 8px;
                                background-color: #fff;
                                box-shadow: 0 2px 8px #ccc;
                                &:before {
                                    position: absolute;
                                    content: '';
                                    left: 50%;
                                    transform: translate(-50%);
                                    top: -16px;
                                    border-bottom: 20px solid #eee;
                                    border-right: 16px solid transparent;
                                    border-left: 16px solid transparent;
                                }
                                span {
                                    display: block;
                                    height: 80px;
                                    line-height: 80px;
                                    text-align: center;
                                }
                            }
                            button {
                                margin-left: 20px;
                                padding: 12px 14px;
                                -webkit-border-radius: 8px;
                                -moz-border-radius: 8px;
                                border-radius: 8px;
                                background: transparent;
                                border: 2px solid #ccc;
                                font-size: 28px;
                                color: #333;
                                box-sizing: border-box;
                            }
                            .goBtn {
                                padding: 14px 26px;
                                background: linear-gradient(to right, #FF8484, #FF4862);
                                border: none;
                                color: #fff;
                            }
                        }
                    }

                }
            }
        }
        .storeList {
            padding: 0 26px;
            .collect {
                padding: 40px 0;
                display: flex;
                flex-direction: column;
                border-bottom: 1px solid #eee;
                > div {
                    width: 100%;
                }
                .storeDiv {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .divFl {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        img {
                            display: block;
                            width: 100px;
                            height: 100px;
                            -webkit-border-radius: 50%;
                            -moz-border-radius: 50%;
                            border-radius: 50%;
                        }
                        .storeInfo {
                            display: flex;
                            justify-content: center;
                            flex-direction: column;
                            width: 400px;
                            b {
                                font-size: 30px;
                                color: #333;
                                width: 400px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                margin-bottom: 18px;
                            }
                            p {
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                label {
                                    display: flex;
                                    justify-content: flex-start;
                                    align-items: center;
                                    margin-right: 20px;
                                    span {
                                        font-size: 24px;
                                        width: auto;
                                        color: #333;
                                        &:nth-child(1) {
                                            color: #999;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .divFr {
                        a {
                            padding: 12px 20px;
                            border: 2px solid #FF4862;
                            -webkit-border-radius: 8px;
                            -moz-border-radius: 8px;
                            border-radius: 8px;
                            font-size: 28px;
                        }
                    }
                }
                .goodsDiv {
                    position: relative;
                    margin-top: 40px;
                    overflow: hidden;
                    ul {
                        position: relative;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        overflow: scroll;
                        li {
                            width: 250px;
                            margin-right: 20px;
                            a {
                                display: flex;
                                flex-direction: column;
                                align-items: flex-start;
                                justify-content: flex-start;
                                img {
                                    width: 250px;
                                    height: 250px;
                                    -webkit-border-radius: 8px;
                                    -moz-border-radius: 8px;
                                    border-radius: 8px;
                                }
                                p {
                                    max-height: 60px;
                                    line-height: 30px;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    font-size: 24px;
                                    color: #333;
                                    margin: 20px 0 22px;
                                }
                                div {
                                    width: 250px;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    .red {
                                        margin-right: 10px;
                                        font-size: 32px;
                                    }
                                    span {
                                        font-size: 24px;
                                        color: #999;
                                        span {
                                            color: #333;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .shadowBg {
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 130px;
                        height: 360px;
                        background: url("../../imgs/index/icon-goods-shadow.png") no-repeat center /100%;
                    }
                }

            }
        }
        .noCollectDiv {
            img {
                width: 422px;
                height: 304px;
                margin: 180px auto 50px;
            }
            span {
                display: block;
                font-size: 28px;
                color: #999;
                width: 100%;
                text-align: center;
            }
        }
        .moreGoods {
            margin-top: 40px;
            .tip {
                padding: 0 26px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 30px;
                b {
                    display: flex;
                    align-items: center;
                    color: #333;
                    i {
                        width: 4px;
                        height: 16px;
                        background: rgba(255, 70, 78, 1);
                        border-radius: 2px;
                        margin-right: 16px;
                    }
                }
            }
        }
    }

</style>
