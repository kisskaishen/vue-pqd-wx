<template>
    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="100"
         infinite-scroll-immediate-check="false"
         class="listDiv">
        <menu-squared v-if="this.$route.path != '/list/index'" :info="menuData"
                      :squaredId="activeCurrentId"></menu-squared>
        <div class="loadingSquared" v-if="listData==''&&total_page!='0'">
            <ul>
                <li v-for="item,index in 6">
                    <img src="../../imgs/base/icon-squared-list.png" alt="">
                </li>
            </ul>
        </div>
        <goods-squared :goods="listData" v-if="listData!=''"></goods-squared>
        <div class="bottomLoadingDiv" v-if="isShowLoading">
            <img src="../../imgs/base/icon-loading.gif" alt="">
            <p>加载中...</p>
        </div>
        <div class="bottomTextTip" v-if="isNoData">----------已经拉到底了----------</div>
        <div class="noDataDiv" v-if="listData==''&&total_page=='0'">
            <img src="../../imgs/user/icon-no-collect.png" alt="">
            <p>暂无列表数据</p>
        </div>
        <!--<p>-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;我是有底线的&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</p>-->
    </div>
</template>

<script>
    import MenuSquared from '../menuSquared.vue'
    import GoodsSquared from './goodsSquared.vue'
    import {Toast} from 'mint-ui';

    export default {
        props: ['currentId'],
        data() {
            return {
                menuData: [],            // 菜单列表
                page: 1,
                loading: false,
                indexData: [],
                listData: [],
                currentData: '',
                activeCurrentId: '',
                total_page: 1,
                isShowLoading: false,
                isNoData: false
            }
        },
        components: {MenuSquared, GoodsSquared},
        computed: {},
        mounted() {
            this.getInfo()
            this.getList(1)
        },
        methods: {
            // 获取本地保存的其他信息
            getInfo() {
                if (this.$route.query.from == 'child' || this.$route.query.parent_id) {

                } else {
                    if (this.currentId == '') {

                    } else {
                        this.indexData = this.$local.get('indexData')

                        this.currentData = this.indexData.category[this.currentId - 1]
                        this.menuData = this.indexData.category[this.currentId - 1].child
                        this.activeCurrentId = this.indexData.category[this.currentId - 1].id

                    }

                }
            },
            // 获取列表
            getList(page) {
                this.$post('search/search', {
                    // cate_id: this.$route.query.from == 'child' ? this.currentId : this.activeCurrentId || this.$route.query.parent_id ? this.currentId : this.activeCurrentId || '',
                    cate_id: this.$route.query.from == 'child' || this.$route.query.parent_id ? this.currentId : this.activeCurrentId,
                    is_special: this.$route.query.is_special || '',
                    page: page
                })
                    .then((res) => {
                        if (page == '1') {
                            this.listData = res.list
                        } else {
                            if (res.list != '') {
                                this.listData = this.listData.concat(res.list)
                                this.isShowLoading = false
                            } else {
                                this.isNoData = true

                            }
                        }
                    })
            },
            loadMore() {
                this.loading = true;
                this.isShowLoading = true
                this.page++;
                this.getList(this.page);
                this.loading = false;
            }
        },
        watch: {
            currentId(e) {
                this.getInfo()
                this.getList(1)
            }
        }
    }
</script>
<style scoped lang="scss">
    .listDiv {
        /*position: absolute;*/
        /*left: 0;*/
        /*right: 0;*/
        /*top: 0;*/
        /*min-height: 100%;*/
        /*background-color: #fff;*/
        .noDataDiv {
            img {
                width: 422px;
                height: 304px;
                margin: 180px auto 50px;
            }
            p {
                color: #999;
                font-size: 28px;
            }
        }
        .loadingSquared {
            ul {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                align-items: center;
                li {
                    margin-bottom: 30px;
                    img {
                        width: 336px;
                    }
                }
            }
        }
    }

    p {
        text-align: center;
        font-size: 28px;
        color: #999;
    }
</style>
