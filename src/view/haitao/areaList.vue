<template>
    <div class="area" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
        <div class="banner">
            <img :src="item.img" alt="" v-for="item,index in listInfo" v-if="item.id==$route.query.id">
        </div>
        <div>
            <goods-squared :goods="listData"></goods-squared>
        </div>
    </div>
</template>

<script>
    import GoodsSquared from '../../components/index/goodsSquared'
    import {Toast} from 'mint-ui';

    export default {
        name: "areaList",
        data() {
            return {
                listData: [],
                loading: false,
                page: 1,
                listInfo: [],

            }
        },
        components: {GoodsSquared},
        mounted() {
            this.getInfo()
            this.getList(1)
        },
        methods: {
            getInfo() {
                this.$post('index/getHaitao', {})
                    .then(res => {
                        this.listInfo = res.style
                    })
            },
            getList(page) {
                this.$post('search/search', {
                    countries_type: this.$route.query.id,
                    is_special: '1',
                    page: page
                })
                    .then(res => {
                        if (res.total_page != 0) {
                            if (page == '1') {
                                this.listData = []
                                this.listData = res.list
                            } else {
                                this.listData = this.listData.concat(res.list)
                            }
                        } else {
                            this.listData = []
                            Toast({
                                message: '无数据啦',
                                duration: 1400
                            })
                        }
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
    .banner {
        width: 100%;
        height: 288px;
        img {
            display: block;
            width: 100%;
            height: 100%;

        }
    }
</style>
