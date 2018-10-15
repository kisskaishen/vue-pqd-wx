<template>
    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="100"
         infinite-scroll-immediate-check="false">
        <div class="search">
            <div class="searchDiv">
                <i></i>
                <input v-model.trim="searchVal" placeholder="搜索：分类 品牌 系列 产品" ref="inputSearch"
                       @keyup.enter="searchClick">
                <span style="color: #999" @click="clearSearchVal">取消</span>
            </div>
        </div>
        <div class="noListDiv" v-if="showNoResult">
            <div class="img">
                <img src="../../imgs/explore/icon-no-result.png" alt="">
            </div>
            <div class="cont">
                <span class="tips">抱歉，<b>“{{searchVal}}”</b>暂无搜索结果</span>
                <span class="recommendTips">我们为您推荐了一下商品</span>
            </div>
        </div>
        <div class="typeDiv" v-if="!showNoResult">
            <ul>
                <li v-for="item,index in typeList" @click="typeChange(item,index)"
                    :class="currentIndex==index?'active':''">
                    <span>{{item.name}}</span>
                    <i v-if="item.type=='2'" :class="currentIndex=='2'&&(is_desc_sales == '0' ? '':'arrowDown')"></i>
                    <i v-if="item.type=='3'"
                       :class="currentIndex=='3'&&(is_desc_price == '0' ? 'arrowDown' : is_desc_price == '1' ? 'arrowUp' : 'arrowDown')"></i>

                </li>
            </ul>
        </div>
        <div class="list" v-if="!showNoResult">
            <div class="goods" v-for="item,index in goodsSquared" :key="item.goods_id">
                <router-link :to="{path:'/detail/index',query:{goods_id:item.goods_id,store_id:item.store_id}}">
                    <div class="goodsImage">
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
                    </div>
                    <div class="goodsName">
                        {{item.goods_name}}
                    </div>
                    <div class="goodsDetail">
                        <div>
                            <b>￥{{item.prom_price}}</b>
                            <i class="quan" v-if="item.is_coupon=='1'"></i>
                        </div>
                        <span>已拼 <span>{{item.sales}}件</span></span>
                    </div>
                </router-link>
            </div>
        </div>

    </div>
</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        name: "squredList",
        data() {
            return {
                searchVal: this.$route.query.word ? this.$route.query.word : '',
                goodsSquared: [],
                loading: false,
                currentIndex: '',
                page: 1,
                is_hot: '0',
                is_desc_sales: '0',
                is_desc_price: '0',
                typeList: [
                    {
                        type: '0',
                        name: '默认'
                    },
                    {
                        type: '1',
                        name: '新品'
                    },
                    {
                        type: '2',
                        name: '销量'
                    },
                    {
                        type: '3',
                        name: '价格'
                    }
                ],
                showNoResult: false

            }
        },
        mounted() {
            this.getSqured(1)
        },
        methods: {
            getSqured(page) {
                this.$post('search/search', {
                    goods_name: this.searchVal ? this.searchVal : this.$route.query.word,
                    is_hot: this.is_hot,
                    is_desc_price: this.is_desc_price,
                    is_desc_sales: this.is_desc_sales,
                    page: page
                })
                    .then(res => {
                        if (res.list == '') {
                            Toast({
                                message: '您已拉到底了！',
                                duration: 1600
                            })
                        } else {
                            if (page == '1') {
                                if (res.list == '' || res.list == []) {
                                    this.showNoResult = true
                                } else {
                                    this.goodsSquared = res.list
                                    this.showNoResult = false
                                }
                            } else {
                                if (res.list == '') {
                                    Toast({
                                        message: '您已拉到底了！',
                                        duration: 1600
                                    })
                                    this.showNoResult = false
                                } else {
                                    this.goodsSquared = this.goodsSquared.concat(res.list)
                                    this.showNoResult = false
                                }
                            }
                        }

                    })
            },
            loadMore() {
                this.loading = true
                this.page++;
                this.getSqured(this.page)
                this.loading = false
            },
            typeChange(val, index) {
                this.currentIndex = index
                switch (val.type) {
                    case '0':
                        this.page = 1
                        this.is_hot = '0'
                        this.is_desc_price = '0'
                        this.is_desc_sales = '0'
                        this.getSqured(this.page)
                        break;
                    case '1':
                        this.page = 1
                        this.is_hot = '1'
                        this.is_desc_price = '0'
                        this.is_desc_sales = '0'
                        this.getSqured(this.page)
                        break;
                    case '2':
                        this.page = 1
                        this.is_hot = '0'
                        this.is_desc_price = '0'
                        this.is_desc_sales = this.is_desc_sales == '0' ? '2' : '2'
                        this.getSqured(this.page)
                        break;
                    case '3':
                        this.page = 1
                        this.is_hot = '0'
                        this.is_desc_price = this.is_desc_price == '0' ? '1' : this.is_desc_price == '1' ? '2' : '1'
                        this.is_desc_sales = '0'
                        this.getSqured(this.page)
                        break;
                }
                // this.page = 0;
                // this.getSqured(this.page)
            },
            searchClick() {
                this.page = 1
                this.is_hot = '0'
                this.is_desc_price = '0'
                this.is_desc_sales = '0'
                this.getSqured(this.page)
            },
            clearSearchVal() {
                this.searchVal = ''
            }
        }
    }
</script>

<style scoped lang="scss">
    .search {
        .searchDiv {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 20px;
            background-color: #fff;
            i {
                width: 40px;
                height: 44px;
                background: url("../../imgs/explore/icon-search.png") no-repeat center /100%;
            }
            input {
                flex: 1;
                border: none;
                padding: 20px;
            }
            .mint-button {
                height: 60px;
                padding: 0 40px;
            }
        }
    }

    .noListDiv {
        .img {
            img {
                width: 356px;
                height: 274px;
                margin: 80px auto;
            }
        }
        .cont {
            span {
                display: block;
                width: 100%;
                font-size: 28px;
                color: #999;
                text-align: center;
                b {
                    color: #4c4c4c;
                }
            }
            .recommendTips {
                margin: 40px 0 60px;
            }
        }
    }

    .typeDiv {
        width: 100%;
        ul {
            display: flex;
            justify-content: space-between;
            align-items: center;
            li {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 24px 0;
                span {
                    color: #4c4c4c;
                    font-size: 28px;
                }
                i {
                    margin-left: 10px;
                    width: 18px;
                    height: 24px;
                    background: url("../../imgs/explore/icon-default.png") no-repeat center/100%;
                }
                .arrowUp {
                    background: url("../../imgs/explore/icon-arrow-top.png") no-repeat center/100%;
                }
                .arrowDown {
                    background: url("../../imgs/explore/icon-arrow-bottom.png") no-repeat center/100%;
                }
            }
            .active {
                span {
                    color: #FF4862;
                }
            }
        }
    }

    .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-bottom: 120px;
        padding: 0 26px;
        .goods {
            width: 336px;
            padding-bottom: 10px;
            margin: 0 26px 60px 0;
            background-color: #fff;
            &:nth-child(2n) {
                margin-right: 0;
            }
            .goodsImage {
                position: relative;
                img {
                    display: block;
                    width: 336px;
                    height: 336px;
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
                height: 72px;
                line-height: 36px;
                overflow: hidden;
                font-size: 26px;
                color: #444;
                text-align: left;
            }
            .goodsDetail {
                display: flex;
                align-content: center;
                justify-content: space-between;
                > div {
                    flex: 1;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    b {
                        color: #F13D3C;
                        font-size: 30px;
                        margin-right: 20px;
                    }
                    .quan {
                        width: 46px;
                        height: 30px;
                        background: url("../../imgs/index/icon-quan.png") no-repeat center/100%;
                    }

                }
                span {
                    margin: 0;
                    span {
                        margin: 0;
                        color: #333;
                    }
                }
                .detailFr {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

            }
        }
    }

</style>
