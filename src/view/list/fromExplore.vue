<template>
    <div class="childSwiper" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="100"
         infinite-scroll-immediate-check="false">
        <div class="swiperDiv">
            <swiper :options="swiperOptionTap" ref="mySwiperTap" v-if="!this.$route.query.is_special">
                <swiper-slide :class="activeIndex==0?'active':''"><span>全部</span></swiper-slide>
                <swiper-slide v-for="item,index in swiperData" :key="item.id"
                              :class="index+1==activeIndex?'active':''">
                    <span>{{item.name}}</span>
                </swiper-slide>
            </swiper>
        </div>
        <div class="container">
            <goods-squared :goods="listData"></goods-squared>
        </div>
        <div :class="iconTopShow?'toTop':''" @click="toTopClick"><span></span></div>
    </div>
</template>
<script>
    import GoodsSquared from '../../components/index/goodsSquared'

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
                activeIndex: 0,             // 第几个
                selected: this.$route.query.id, //导航栏id，第几个的id

                swiperData: [],          // swiper子集轮换
                listData:[],        //s
                iconTopShow: false,
                scrollTop: 0,            // 距离顶部的距离
                loading:false,
                page:1
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
                this.indexData = this.$local.get('indexData').category
                for (let i = 0; i < this.indexData.length; i++) {
                    if (this.$route.query.parent_id == this.indexData[i].id) {
                        for (let j = 0; j < this.indexData[i].child.length; j++) {
                            if (this.$route.query.id == this.indexData[i].child[j].id) {
                                this.swiperData = this.indexData[i].child[j].child
                                this.selected = this.indexData[i].child[j].id
                            }
                        }
                    }
                }
            },
            getList(page) {
                this.$post('search/search',{
                    cate_id:this.selected || this.$route.query.id,
                    page:page
                })
                    .then(res=>{
                        if (page == '1') {
                            this.listData = res.list
                        } else {
                            this.listData = this.listData.concat(res.list)
                        }
                    })
            },
            // 点击swiper
            activeClick(val) {
                this.activeIndex = val.clickedIndex
                this.swiperCenter(val)
                if (val.clickedIndex=='0') {
                    this.selected = this.$route.query.id
                } else {
                    this.selected = this.swiperData[this.activeIndex - 1].id            // 获取当前点击的id值
                }
                this.page = 0
                this.loadMore()
                this.toTopClick()
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
                if (slideCenter < swiperWidth / 2) {
                    swiper.setWrapperTranslate(0)
                } else if (slideCenter > maxWidth) {
                    swiper.setWrapperTranslate(maxTranslate)
                } else {
                    let nowTranslate = slideCenter - swiperWidth / 2
                    swiper.setWrapperTranslate(-nowTranslate)
                }
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
            justify-content: flex-start;
            align-items: center;
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
            overflow: hidden;
            padding: 0 26px;
            overflow: hidden;
            .swiper-slide {
                width: auto !important;
                text-align: center;
                font-size: 30px;
                padding: 16px 0;
                span {
                    display: block;
                    padding: 4px 28px;
                    user-select: none;
                }
            }
            .active {
                span {
                    color: #fff;
                    background: linear-gradient(to right, #ff8484, #ff464e);
                    box-shadow: 0px 2px 0 #ff464e;
                    border-radius: 40px;
                }
            }
        }
    }

    .container {
        margin-top: 68px;
    }

    .mint-swipe {
        width: 100%;
        height: 280px;
        .mint-swipe-item {
            img {
                width: 100%;
                height: 280px;
            }
        }
    }

    .jiuInfo {
        width: 100%;

        ul {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            align-items: center;
            background-color: #fff;
            li {
                width: 50%;
                border-right: 1px solid #eee;
                border-bottom: 1px solid #eee;
                a {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    width: 100%;
                    padding: 4px;
                    .divFl {
                        img {
                            width: 100px;
                            height: 100px;
                            margin-right: 10px;
                        }
                    }
                    .divFr {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: flex-start;
                        text-align: left;
                        p {
                            width: 100%;
                            color: #333;
                            font-size: 28px;
                        }
                        span {
                            width: 100%;
                        }
                    }
                }
                &:nth-child(2n) {
                    border: none;
                }
            }
        }
    }
</style>
