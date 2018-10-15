<template>
    <div class="container" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
        <div class="swiperDiv">
            <swiper :options="swiperOptionTap" ref="mySwiperTap">
                <swiper-slide :class="activeIndex==0?'active':''">首页</swiper-slide>
                <swiper-slide v-for="item,index in swiperData" :key="item.id"
                              :class="index+1==activeIndex?'active':''">
                    {{item.name}}
                </swiper-slide>
            </swiper>
        </div>
        <div >
            <goods-squared :goods="listData"></goods-squared>
        </div>
        <div :class="iconTopShow?'toTop':''" @click="toTopClick"><span></span></div>
    </div>
</template>
<script>
    import GoodsSquared from '../../components/index/goodsSquared'
    import {Toast} from 'mint-ui';
    export default {
        data() {
            return {
                swiperOptionTap: {
                    notNextTick: true,
                    freeMode: true,
                    freeModeMomentumRatio: 0.5,
                    slidesPerView: 'auto',
                    preventClicks: true,
                    onClick: this.activeClick
                },
                selected: '',            // 当前选择的id
                activeIndex: 0,             // 第几个
                listData: [],            // 商品列表
                swiperData: [],          // swiper子集轮换
                iconTopShow: false,
                scrollTop: 0,            // 距离顶部的距离
                loading: false,
                page: 1
            }
        },
        components: {GoodsSquared},
        computed: {},
        mounted() {
            this.getInfo()
            this.getList(1)
            // 检测页面滚动
            window.addEventListener('scroll', this.handScroll)
        },
        methods: {
            // 获取本地保存的其他信息
            getInfo() {
                if (this.$route.query.id) {
                    for(let i=0;i<this.$local.get('indexData').haitao.child.length;i++) {
                        if (this.$route.query.id==this.$local.get('indexData').haitao.child[i].id) {
                            this.swiperData = this.$local.get('indexData').haitao.child[i].child
                        }
                    }
                } else {
                    this.swiperData = this.$local.get('indexData').haitao.child
                }
            },
            // 点击swiper
            activeClick(val) {

                this.activeIndex = val.clickedIndex
                this.swiperCenter(val)
                this.selected = this.activeIndex == '0' ? '' : this.swiperData[this.activeIndex - 1].id            // 获取当前点击的id值
                this.toTopClick()
                this.page = 1
                this.getList(this.page)

            },
            // 居中显示
            swiperCenter(swiper) {
                const swiperWidth = swiper.container[0].clientWidth     // 屏幕宽度
                const maxTranslate = swiper.maxTranslate()      // 可滑动的总宽度（最左边和最右边的总宽）
                const maxWidth = -maxTranslate + swiperWidth / 2


                let slide = swiper.slides[swiper.clickedIndex]
                let slideLeft = slide.offsetLeft
                let slideWidth = slide.clientWidth
                let slideCenter = slideLeft + slideWidth / 2

                swiper.setWrapperTransition(300)
                if (slideCenter < slideWidth / 2) {
                    swiper.setWrapperTranslate(0)
                } else if (slideCenter > maxWidth) {
                    swiper.setWrapperTranslate(maxTranslate)
                } else {
                    let nowTranslate = slideCenter - swiperWidth / 2
                    swiper.setWrapperTranslate(-nowTranslate)
                }

            },
            getList(page) {
                this.$post('search/search', {
                    haitao_cate_id: this.selected || this.$route.query.id,
                    is_special: '1',
                    page: page
                })
                    .then(res => {
                        console.log(res)
                        if (res.total_page != 0) {
                            if (page == '1') {
                                this.listData = []
                                this.listData = res.list
                            } else {
                                this.listData = this.listData.concat(res.list)
                            }
                        } else {
                            this.listData = []
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
                this.page++
                this.getList(this.page)
                this.loading = false
            }
        }
    }
</script>
<style lang="scss">
    .swiperDiv {
        .swiper-wrapper {
            display: flex;
            justify-content: space-between;
        }
    }
</style>
<style lang="scss" scoped>
    .swiperDiv {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 750px;
        background-color: #fff;
        z-index: 9;
        .swiper-container {
            width: 100%;
            overflow: hidden;
            .swiper-slide {
                width: auto !important;
                padding: 16px 24px;
                text-align: center;
            }
            .active {
                color: red;
                border-bottom: 2px solid red;
                font-weight: bold;
            }
        }
    }

    .container {
        margin-top: 68px;
    }

    .toTop {
        position: fixed;
        bottom: 100px;
        right: 40px;
        width: 60px;
        height: 60px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        background-color: #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            display: block;
            color: #fff;
            width: 20px;
            height: 20px;
            margin-top: 6px;
            border-right: 4px solid #fff;
            border-top: 4px solid #fff;
            transform: rotate(-45deg);
        }
    }
</style>
