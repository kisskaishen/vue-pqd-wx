<template>
    <div class="childSwiper">
        <div class="swiperDiv">
            <swiper :options="swiperOptionTap" ref="mySwiperTap" v-if="!this.$route.query.is_special">
                <swiper-slide :class="activeIndex==0?'active':''"><span>全部</span></swiper-slide>
                <swiper-slide v-for="item,index in swiperData" :key="item.id"
                              :class="index+1==activeIndex?'active':''">
                    <span>{{item.name}}</span>
                </swiper-slide>
            </swiper>
        </div>

        <div class="jiuInfo" v-if="this.$route.query.is_special=='4'">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="item,index in jiuBanner" :key="item.ad_id">
                    <img :src="item.ad_code" :alt="item.ad_name">
                </mt-swipe-item>
            </mt-swipe>
            <ul>
                <li v-for="item,index in jiuMenu">
                    <router-link :to="'jiuList?id='+item.id+'&currentImg='+item.banner">
                        <div class="divFl">
                            <img :src="item.img" alt="">
                        </div>
                        <div class="divFr">
                            <p>{{item.name}}</p>
                            <span>{{item.introduction}}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <div
            v-if="this.$route.query.is_special=='11'||this.$route.query.is_special=='9'">
            <mt-swipe :auto="4000" v-if="BannerList!=''">
                <mt-swipe-item v-for="item,index in BannerList" :key="item.ad_id">
                    <img :src="item.ad_code" :alt="item.ad_name">
                </mt-swipe-item>
            </mt-swipe>
            <div class="noBannerDiv" v-else>
                <img src="../../imgs/base/icon-banner-menu.png" alt="">
            </div>
        </div>
        <div :class="this.$route.query.is_special?'':'container'">
            <index-squared :currentId="selected"></index-squared>
        </div>
        <div :class="iconTopShow?'toTop':''" @click="toTopClick"><span></span></div>
    </div>
</template>
<script>
    import IndexSquared from '../index/indexSquared'

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
                selected: this.$route.query.id ? this.$route.query.id : '', //导航栏id，第几个的id

                swiperData: [],          // swiper子集轮换
                iconTopShow: false,
                scrollTop: 0,            // 距离顶部的距离

                type: '',

                BannerList: [],
                jiuBanner: [],           // 9.9banner
                jiuMenu: [],             // 9.9菜单
            }
        },
        components: {IndexSquared},
        computed: {},
        mounted() {
            let self = this;
            if (this.$route.query.is_special == '4') {
                self.getJiuInfo()
            }

            switch (this.$route.query.is_special) {
                case '12':
                    window.document.title = '品质水果';
                    break;
                case '9':
                    window.document.title = '趣多严选';
                    this.type = '5'
                    break;
                case '13':
                    window.document.title = '家居优品';
                    break;
                case '4':
                    window.document.title = '9.9专区';
                    break;
                case '14':
                    window.document.title = '品牌清仓';
                    break;
                case '11':
                    window.document.title = '省钱大法';
                    this.type = '3'
                    break;
            }
            self.getBanner()

            self.getInfo()


            // 检测页面滚动
            window.addEventListener('scroll', this.handScroll)
        },
        methods: {
            // 获取本地保存的其他信息
            getInfo() {
                this.indexData = this.$local.get('indexData')
                for (let i = 0; i < this.indexData.category.length; i++) {
                    if (this.$route.query.parent_id == this.indexData.category[i].id) {
                        for (let j = 0; j < this.indexData.category[i].child.length; j++) {
                            if (this.$route.query.id == this.indexData.category[i].child[j].id) {
                                this.swiperData = this.indexData.category[i].child[j].child
                                this.selected = this.indexData.category[i].child[j].id
                            }
                        }
                    } else if (this.$route.query.id == this.indexData.category[i].id) {
                        this.swiperData = this.indexData.category[i].child
                        this.selected = this.indexData.category[i].id
                    }
                    // else {
                    //     this.selected = ''
                    // }
                }
            },
            // 9.9专区
            getJiuInfo() {
                this.$post('index/getJiu', {})
                    .then(res => {
                        this.jiuBanner = res.ad_list
                        this.jiuMenu = res.exclusive
                    })
            },
            // 其他的
            getBanner() {
                this.$post('index/getIndexAd', {
                    type: this.type
                })
                    .then(res => {
                        this.BannerList = res.list
                    })
            },
            // 点击swiper
            activeClick(val) {

                this.activeIndex = val.clickedIndex
                this.swiperCenter(val)
                if (val.clickedIndex=='0') {
                    this.selected = this.$route.query.id
                }
                this.selected = this.swiperData[this.activeIndex - 1].id            // 获取当前点击的id值

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
        .noSwiperDiv {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img {
                display: inline-block;
                width: 116px;
                height: 50px;
                margin-right: 20px;
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
    .noBannerDiv {
        img {
            width: 100%;
            height: 280px;
        }
    }
</style>
