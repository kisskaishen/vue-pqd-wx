<template>
    <div class="menu">
        <swiper :options="swiperOptionTap" ref="couponSwiper" v-if="menu!=''">
            <swiper-slide v-for="item,index in menu" :key="item.shopping_column_id">
                <div class="nav_list" @click="goToAddress(item)">
                    <img :src="item.column_logo">
                    <span>{{item.column_name}}</span>
                </div>
            </swiper-slide>
            <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
        <ul v-else>
            <li v-for="item in 10">
                <img src="../imgs/base/icon-menu-list.png" alt="">
            </li>
        </ul>

    </div>
</template>

<script>
    export default {
        props: ['info','meeting'],
        data() {
            return {
                swiperOptionTap: {
                    notNextTick: true,
                    freeMode: true,
                    // autoplay: 2000,
                    speed: 500,
                    loopedSlides: true,
                    freeModeMomentumRatio: 0.5,
                    slidesPerView: 'auto',
                    preventClicks: true,
                    onClick: this.activeClick,
                    scrollbar:'.swiper-scrollbar',
                },
            }
        },
        computed: {
            menu() {
                return this.info
            },
            meetingList() {
                return this.meeting
            }
        },
        mounted() {
        },
        methods: {
            goToAddress(item){
              window.location.href = item.link;
            },
            goPage(val, index) {
                console.log(val)
                location.href = val.link
            }
        }
    }
</script>
<style lang="scss">
    .menu {
        .swiper-wrapper {
            margin-bottom: 30px;
        }
        .swiper-scrollbar {
            opacity:1 !important;
            width: 218px;
            height: 10px;
            border: 1px solid #eee;
            margin-left: 50%;
            transform: translateX(-50%);
            .swiper-scrollbar-drag {
                background-color: #FF0000;
            }
        }
    }
</style>
<style lang="scss" scoped>
    .menu {
        width: 100%;
        padding: 16px 0;
        background-color: #fff;
        /*max-height: 346px;*/
        .swiper-container {
            display: flex;
            flex-deraction: row;
            flex-wrap: wrap;
            align-items: center;
            .swiper-slide {
                width: 20%;
                /*width: 25%;*/
                height: 160px;
                a ,.nav_list{
                    display: block;
                    padding: 12px;
                    text-align: center;
                    img {
                        display: block;
                        margin: 0 auto;
                        /*width: 80px;*/
                        height: 80px;
                    }
                    span {
                        display: block;
                        color: #666;
                        margin-top: 10px;
                    }
                }
                > img {
                    margin: 0 auto;
                    width: 100px;
                }
            }
        }
    }
</style>
