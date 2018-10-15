<template>
    <div class="fruit" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="100">
        <list :goods="goodsList"></list>
        <tabbar></tabbar>
        <div :class="iconTopShow?'toTop':''" @click="toTopClick"><span></span></div>
    </div>
</template>

<script>
    import List from '../../components/index/goodsSquared'
    import Tabbar from '../../components/footer'
    import { Toast } from 'mint-ui';
    export default {
        name: "index",
        data() {
            return {
                goods: {},
                goodsList: [],
                loading:false,
                page:0,
                scrollTop:0,            // 距离顶部的距离
                iconTopShow:false,
            }
        },
        components: {List, Tabbar},
        mounted() {
            window.addEventListener('scroll', this.handScroll)
        },
        methods: {
            getList(page) {
                this.$post('search/search', {
                    is_special: '12',
                    page: page
                })
                    .then(res => {
                        this.goodsList = this.goodsList.concat(res.list)
                        if (res.list == '') {
                            Toast({
                                message: '别拉了，我是有底线的',
                                duration: 2000
                            });
                        }
                    })
            },
            // 监听滚动方法
            handScroll() {
                this.scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
                if (this.scrollTop > 156) {
                    this.iconTopShow = true
                } else {
                    this.iconTopShow = false
                }
            },
            toTopClick() {
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                window.pageYOffset = 0
            },
            loadMore() {
                this.loading = true
                this.page ++
                this.getList(this.page)
                this.loading = false
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
