<template>
    <div class="banner">
        <!--<mt-swipe :auto="8000">-->
        <!--<mt-swipe-item v-for="item,index in banner" :key="item.ad_id" >-->
        <!--<img :src="item.ad_code" :alt="item.ad_name" @click="bannerToPage(item)">-->
        <!--</mt-swipe-item>-->
        <!--</mt-swipe>-->
        <swiper :options="swiperOptionTap" ref="mySwiperTap" v-if="bannerImg!=''">
            <swiper-slide v-for="item,index in bannerImg" :key="index" @click.native="bannerToPage(item,index)">
                <img :src="item.ad_code" :alt="item.ad_name">
            </swiper-slide>
        </swiper>
        <img src="../../imgs/base/icon-list.png" v-else>
    </div>
</template>

<script>
    import {showDetail} from '../../utils/goDetail'
    export default {
        props: ['banner'],
        data() {
            return {
                swiperOptionTap: {
                    notNextTick: false,
                    freeMode: false,
                    autoplay: 2000,
                    speed: 300,
                    centeredSlides: true,
                    loop: true,
                    slidesPerView: 'auto',
                    loopedSlides: 8,
                    preventClicks: true,
                    observer: true,
                    onClick: this.activeClick
                },
            }
        },
        computed: {
            bannerImg() {
                return this.banner
            }
        },
        mounted() {

        },
        methods: {
            bannerToPage(val, index) {
                return
                location.href = val.ad_link
            },
            // 点击swiper
            activeClick(val) {
                // console.log(val.clickedIndex % this.$refs.mySwiperTap.swiper.loopedSlides)
                // console.log(val.clickedIndex)
                this.activeIndex = val.clickedIndex % this.$refs.mySwiperTap.swiper.loopedSlides
                location.href = this.banner[this.activeIndex].ad_link
                // showDetail()

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
                if (slideCenter < slideWidth / 2) {
                    swiper.setWrapperTranslate(0)
                } else if (slideCenter > maxWidth) {
                    swiper.setWrapperTranslate(maxTranslate)
                } else {
                    let nowTranslate = slideCenter - swiperWidth / 2
                    swiper.setWrapperTranslate(-nowTranslate)
                }
            },
        },
    }
</script>

<style lang="scss">
    .banner {
        /*.mint-swipe {*/
        /*height: 325px;*/
        /*.mint-swipe-item {*/
        /*img {*/
        /*width: 690px;*/
        /*height: 320px;*/
        /*margin: 6px auto;*/
        /*border-radius: 20px;*/
        /*}*/
        /*}*/
        /*.mint-swipe-indicators {*/
        /*.mint-swipe-indicator {*/
        /*width: 18px;*/
        /*height: 18px;*/
        /*margin: 0 10px;*/
        /*}*/
        /*.is-active {*/
        /*background-color: #df2728;*/
        /*}*/
        /*}*/
        /*}*/
        background-color: #fff;
        > img {
            width: 698px;
            height: 320px;
            margin: 0 auto;
            border-radius: 20px;
        }
        .swiper-container {
            width: 100%;
            .swiper-slide {
                width: 690px;
                margin: 6px 8px;
                img {
                    display: block;
                    width: 100%;
                    height: 320px;
                    border-radius: 20px;
                    /*border: 2px solid #ccc;*/
                }
            }
        }
    }
</style>
