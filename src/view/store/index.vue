<template>
    <div class="store" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
        <store-info :store="storeInfo"></store-info>
        <div :class="['tabber',iconTopShow?'fixedTabber':'']">
            <ul>
                <li v-for="item,index in tabberList" @click="chooseType(item,index)"
                    :class="currentIndex==index?'currentActive':''">
                    <span>{{item.label}}</span>
                    <!--<i v-if="item.type=='2'" :class="currentIndex=='2'&&(is_desc_sales == '0' ? '':'arrowDown')"></i>-->
                    <i v-if="item.type=='3'"
                       :class="currentIndex=='3'&&(is_desc_price == '0' ? 'arrowDown' : is_desc_price == '1' ? 'arrowUp' : 'arrowDown')"></i>
                </li>
            </ul>
        </div>
        <div v-if="showNoResult" style="text-align: center;">-------------该商家暂无商品-------------</div>
        <goods-squared :goods="goodsList" v-else></goods-squared>
        <div :class="iconTopShow?'toTop':''" @click="toTopClick"><span></span></div>
    </div>
</template>

<script>
    import StoreInfo from '../../components/store/storeInfo'
    import GoodsSquared from '../../components/index/goodsSquared'
    import {Toast} from 'mint-ui'

    export default {
        name: "index",
        data() {
            return {
                page: 1,
                pageSize: '10',
                storeInfo: {},
                goodsList: [],
                tabberList: [
                    {
                        type: '0',
                        label: '默认'
                    },
                    {
                        type: '1',
                        label: '新品'
                    },
                    {
                        type: '2',
                        label: '销量'
                    },
                    {
                        type: '3',
                        label: '价格'
                    }
                ],
                currentIndex: 0,
                is_hot: '',
                is_desc_price: '',
                is_desc_sales: '',
                loading: false,
                showNoResult: false,

                iconTopShow: false
            }
        },
        mounted() {
            this.getStore()
            this.getGoods(1)
            window.addEventListener('scroll', this.pageScroll)
        },
        components: {StoreInfo, GoodsSquared},
        methods: {
            // 获取商家信息
            getStore() {
                this.$post('merchant/getMerchantInfo', {
                    store_id: this.$route.query.store_id,
                })
                    .then((res) => {
                        this.storeInfo = res
                    })
            },
            // 获取商品列表
            getGoods(page) {
                this.$post('search/search', {
                    store_id: this.$route.query.store_id,
                    is_hot: this.is_hot,
                    is_desc_price: this.is_desc_price,
                    is_desc_sales: this.is_desc_sales,
                    page: page
                })
                    .then(res => {
                        if (page == '1') {
                            if (res.list == '' || res.list == []) {
                                this.showNoResult = true
                            } else {
                                this.goodsList = res.list
                                this.showNoResult = false
                            }
                        } else {
                            if (res.list == '') {
                                this.showNoResult = false
                            } else {
                                this.goodsList = this.goodsList.concat(res.list)
                                this.showNoResult = false
                            }
                        }
                    })
            },

            // 选择
            chooseType(val, index) {
                this.currentIndex = index
                switch (val.type) {
                    case '0':
                        this.page = 1
                        this.is_hot = '0'
                        this.is_desc_price = '0'
                        this.is_desc_sales = '0'
                        this.getGoods(this.page)
                        break;
                    case '1':
                        this.page = 1
                        this.is_hot = '1'
                        this.is_desc_price = '0'
                        this.is_desc_sales = '0'
                        this.getGoods(this.page)
                        break;
                    case '2':
                        this.page = 1
                        this.is_hot = '0'
                        this.is_desc_price = '0'
                        this.is_desc_sales = this.is_desc_sales == '0' ? '2' : '2'
                        this.getGoods(this.page)
                        break;
                    case '3':
                        this.page = 1
                        this.is_hot = '0'
                        this.is_desc_price = this.is_desc_price == '0' ? '1' : this.is_desc_price == '1' ? '2' : '1'
                        this.is_desc_sales = '0'
                        this.getGoods(this.page)
                        break;
                }
            },
            loadMore() {
                this.loading = true
                this.page++;
                this.getGoods(this.page)
                this.loading = false
            },

            toTopClick() {
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                window.pageYOffset = 0
            },

            // 监听滚动方法
            pageScroll() {
                this.scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
                if (this.scrollTop > 380) {
                    this.iconTopShow = true
                } else {
                    this.iconTopShow = false
                }
            }

        }
    }
</script>

<style scoped lang="scss">
    .store {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        max-width: 750px;
        min-height: 100%;
        background-color: #fff;
        margin: 0 auto;
    }

    .fixedTabber {
        position: fixed;
        top: 88px;
        left: 0;
        right: 0;
        z-index: 99;
        max-width: 750px;
        margin: 0 auto;
    }

    .tabber {
        background-color: #fff;
        padding: 26px;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        ul {
            display: flex;
            justify-content: space-around;
            align-items: center;
            li {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 28px;
            }
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
            .currentActive {
                color: #FF4862;
            }
        }
    }
</style>
