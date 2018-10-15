<template>
    <div class="banner">

        <mt-swipe :auto="4000" :showIndicators="false" @change="handleChange">
            <mt-swipe-item v-for="item,index in bannerImg" :key="item.origin">
                <img :src="item.image_url" alt="商品图片">
            </mt-swipe-item>
        </mt-swipe>
        <!--<div class="imgDiv">-->
        <div class="dabiaoImgDiv">
            <div class="leftUp" v-if="JSON.stringify(imgsListData.left_up)!='{}'"><img :src="imgsListData.left_up['120_120']" alt=""></div>
            <div class="rightUp" v-if="JSON.stringify(imgsListData.right_up)!='{}'"><img :src="imgsListData.right_up['120_120']" alt=""></div>
            <div class="centerDown" v-if="JSON.stringify(imgsListData.middle)!='{}'"><img :src="imgsListData.middle['750_120']" alt=""></div>
            <div class="leftDown" v-if="JSON.stringify(imgsListData.left_down)!='{}'"><img :src="imgsListData.left_down['120_120']" alt=""></div>
            <div class="rightDown" v-if="JSON.stringify(imgsListData.right_down)!='{}'"><img :src="imgsListData.right_down['120_120']" alt=""></div>
        </div>
        <div class="switchDiv">
            {{index}}/{{bannerImg.length}}
        </div>

    </div>
</template>

<script>
    import {Swipe, SwipeItem} from 'mint-ui';

    export default {
        props: ['banner', 'imgsList'],
        data() {
            return {
                index: 1
            }
        },
        computed: {
            bannerImg() {
                return this.banner
            },
            imgsListData() {
                return this.imgsList
            }
        },
        mounted() {

        },
        methods: {
            handleChange(index) {
                this.index = index + 1
            }
        }
    }
</script>

<style lang="scss" scoped>
    .banner {
        position: relative;
        .mint-swipe {
            height: 750px;
            .mint-swipe-items-wrap {
                .mint-swipe-item {
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .mint-swipe-indicators {
                .mint-swipe-indicator {
                    width: 18px;
                    height: 18px;
                    margin: 0 10px;
                }
                .is-active {
                    background-color: red;
                }
            }
        }
        .dabiaoImgDiv {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 20px;
            width: 100%;
            > div {
                position: absolute;
                img {
                    width: 120px;
                    height: 120px;
                }
            }
            .leftUp {
                left: 0;
                top: 0;
            }
            .leftDown {
                left: 0;
                bottom: 0;
            }
            .rightUp {
                right: 0;
                top: 0;
            }
            .rightDown {
                right: 0;
                bottom: 0;
            }
            .centerDown {
                left: 0;
                right: 0;
                bottom: 0;
                img {
                    width: 750px;
                    height: 120px;
                }
            }

        }
        .switchDiv {
            position: absolute;
            right: 30px;
            bottom: 40px;
            padding: 10px 20px;
            background-color: #fff;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            color: #000;
            opacity: .8;
        }
    }
</style>
