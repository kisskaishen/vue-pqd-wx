<template>
    <div class="area" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="100"
         infinite-scroll-immediate-check="false">
        <div class="banner">
            <img :src="$route.query.currentImg" alt="">
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
        name: "jiuList",
        data() {
            return {
                loading: false,
                page: 1,
                listData:[],

            }
        },
        components: {GoodsSquared},
        mounted() {
            this.getList(1)
        },
        methods: {
            getList(page) {
                this.$post('search/search', {
                    exclusive_cat: this.$route.query.id,
                    is_special: '4',
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
