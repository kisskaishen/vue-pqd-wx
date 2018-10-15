<template>
    <div class="menuList">

        <div class="tabberList">
            <div class="swiperDiv" v-if="swiperData!=''">
                <swiper :options="swiperOptionTap" ref="mySwiperTap">
                    <swiper-slide v-for="item,index in swiperData" :key="item.id"
                                  :class="index==activeIndex?'active':''">
                        <span>{{item.name}}</span>
                    </swiper-slide>
                </swiper>
                <div class="shadow"></div>
            </div>
            <div class="noSwiperDiv" v-else>
                <img src="../imgs/base/icon-swiper-list.png" alt="" v-for="item in 6">
            </div>
        </div>
        <div class="container">
            <!--首页模块-->
            <index-list v-if="activeIndex=='0'"></index-list>
            <!--首页切换模块-->
            <!--activeIndex-1 的目的是获取子组件数组的第0个-->
            <index-squared v-else :currentId="activeIndex"></index-squared>

            <div :class="iconTopShow?'toTop':''" @click="toTopClick"><span></span></div>
        </div>
    </div>
</template>
<script>
    import IndexList from './index/indexList'
    import IndexSquared from './index/indexSquared'

    export default {
        data() {
            return {
                swiperOptionTap: {
                    notNextTick: true,
                    freeMode: true,
                    speed: 200,
                    freeModeMomentumRatio: 0.5,
                    slidesPerView: 'auto',
                    preventClicks: true,
                    onClick: this.activeClick
                },
                activeIndex: 0,
                selected: '0',
                currentId: '',
                swiperData: [],          // swiper轮换
                listData: [],             // 列表信息
                page: 1,
                scrollTop: 0,            // 距离顶部的距离
                iconTopShow: false,
            }
        },
        components: {IndexList, IndexSquared},
        computed: {},
        mounted() {
            // 获取页头swiper
            this.getSwiper();
            // 检测页面滚动
            window.addEventListener('scroll', this.handScroll)
        },
        methods: {
            // 获取导航
            getSwiper() {
                let indexObj = [{id: 0, name: '首页'}]
                this.$post('index/getNavList', {})
                    .then((res) => {
                        this.swiperData = indexObj.concat(res)
                    })
            },

            // 点击swiper
            activeClick(val) {
                if (!this.$local.get('indexData') || JSON.stringify(this.$local.get('indexData')) == '{}' || this.$local.get('indexData') == '') {
                    this.getChild()
                }
                this.activeIndex = val.clickedIndex
                this.swiperCenter(val)

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

            getChild() {
                this.$post('common/getCategory', {})
                    .then((res) => {
                        if (res) {
                            this.$local.set('indexData', res)
                        }
                    })
            },


            toTopClick() {
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                window.pageYOffset = 0
            },

            // 监听滚动方法
            handScroll() {
                this.scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
                if (this.scrollTop > 156) {
                    this.iconTopShow = true
                } else {
                    this.iconTopShow = false
                }
            }

        },
        watch: {
            activeIndex(e) {
                this.toTopClick()
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
    .tabberList {
        .swiperDiv {
            position: fixed;
            top: 0;
            left: 50%;
            width: 750px;
            transform: translate(-50%, 0);
            background-color: #fff;
            z-index: 9;
            /*padding: 0 26px;*/
            .swiper-container {
                position: relative;
                /*width: 100%;*/
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
            .shadow {
                position: absolute;
                right: 0;
                top: -10px;
                width: 50px;
                height: 86px;
                background: url("../imgs/index/icon-index-swiper-shadow.png") no-repeat center /100%;
                z-index: 99;
            }
        }

        .noSwiperDiv {
            position: fixed;
            top: 0;
            left: 50%;
            width: 100%;
            padding: 10px 26px;
            transform: translate(-50%, 0);
            max-width: 1040px;
            background-color: #fff;
            z-index: 9;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img {
                width: 116px;
                height: 50px;
                margin-right: 20px;
            }
        }

    }

    .container {
        padding-top: 90px;
    }
</style>
