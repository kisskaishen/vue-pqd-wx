<template>
    <div class="haitaoDiv" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="100">
        <ul class="menu">
            <li v-for="item,index in menuList">
                <router-link :to="'areaList?id='+item.id">
                    <div>
                        <img :src="item.logo" alt="">
                    </div>
                    <span>{{item.name}}</span>
                </router-link>
            </li>
        </ul>
        <div class="haitao">
            <div>
                <b>海淘分类</b>
                <router-link to="list">查看全部></router-link>
            </div>
            <ul class="haitaoUl">
                <li v-for="item,index in swiperList">
                    <router-link :to="'list?id='+item.id">
                        <img :src="item.logo" alt="">
                    </router-link>
                </li>
            </ul>
        </div>
        <ul>
            <li></li>
        </ul>

        <goods-list :list="listData"></goods-list>

    </div>
</template>

<script>
    import GoodsList from '../../components/index/goodsList'

    export default {
        name: "index",
        data() {
            return {
                menuList: [],
                swiperList:[],
                listData: [],
                loading:false,
                page:1
            }
        },
        components: {GoodsList},
        mounted() {
            this.getMenuList()
            this.getSwiper()
            this.getGoodsList(1)
        },
        methods: {
            getMenuList() {
                this.$post('index/getHaitao', {})
                    .then(res => {
                        this.menuList = res.style
                    })
            },
            getSwiper() {
                this.swiperList = this.$local.get('indexData').haitao.child
            },
            getGoodsList(page) {
                this.$post('search/search',{
                    is_special:'1',
                    page:page
                })
                    .then(res=>{
                        if (page=='1') {
                            this.listData=res.list
                        } else {
                            this.listData=this.listData.concat(res.list)
                        }
                    })
            },
            loadMore() {
                this.loading = true
                this.page++;
                this.getGoodsList(this.page)
                this.loading = true
            }
        }
    }
</script>

<style scoped lang="scss">
    .haitaoDiv {
        width: 100%;
        .menu {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            overflow: scroll;
            padding: 20px 0;
            background-color: #fff;
            li {
                margin: 0 8px;
                a {
                    display: block;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                    div {
                        border: 2px solid #ffc5c5;
                        -webkit-border-radius: 50%;
                        -moz-border-radius: 50%;
                        border-radius: 50%;
                        img {
                            display: block;
                            width: 132px;
                            height: 132px;
                            margin: 8px;
                            -webkit-border-radius: 50%;
                            -moz-border-radius: 50%;
                            border-radius: 50%;
                        }
                    }
                    span {
                        font-size: 28px;
                        padding-top: 10px;
                    }

                }
            }
        }
        .haitao {
            margin: 20px 0;
            padding: 20px 0;
            background-color: #fff;
            > div {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
                padding: 0 20px;
                b {
                    border-left: 8px solid red;
                    padding-left: 10px;
                    font-size: 26px;
                    color: #333;
                }
                a {
                    font-size: 24px;
                }
            }
            .haitaoUl {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-right: 12px;
                overflow: scroll;
                li {
                    margin-right: 12px;
                    border: none;

                    a {
                        display: block;
                        width: 216px;
                        height: 134px;
                        border: none;

                        img {
                            display: block;
                            width: 216px;
                            height: 134px;
                            border: none;
                        }
                    }
                }
            }
        }
    }
</style>
