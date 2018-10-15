<template>
    <div class="reviewDiv">
        <ul class="reviewListDiv" v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="20">
            <li class="reviewDivDiv"
                v-for="item,index in list" @click="getImgArr(item,index)">
                <div class="reviewTop">
                    <div class="divFl">
                        <div class="divFlFl">
                            <img :src="item.user_pic" :alt="item.user_nickname">
                        </div>
                        <div class="divFlFr">
                            <p>{{item.user_nickname}}</p>
                            <div>
                                <img src="../../imgs/detail/icon-star-active.png" alt=""
                                     v-for="staritem,index in item.star">
                                <img src="../../imgs/detail/icon-star.png" alt=""
                                     v-for="staritem,index in (5-item.star)">
                            </div>
                        </div>
                    </div>
                    <div class="divFr">
                        <span>{{item.add_time}}</span>
                    </div>
                </div>
                <div class="reviewBody">
                    <p>{{item.content}}</p>
                    <ul>
                        <li v-for="item,index in item.img">
                            <img :src="item" :alt="index" @click.prevent="bigClick(item,index)">
                        </li>
                    </ul>
                </div>
                <div class="reviewBottom">
                    <span>{{item.goods_spec_name}}</span>
                </div>
                <!--first storename reply-->
                <div class="reviewMoreMore" v-if="itemList.op_type=='2'&&item.comment_id==itemList.comment_pid"
                     v-for="itemList,itemIndex in item.list">
                    <span>
                        商家回复：{{itemList.content}}
                    </span>
                </div>
                <div class="reviewMore" v-if="item.is_append=='1'&&itemList.op_type=='1'"
                     v-for="itemList,itemIndex in item.list">
                    <div class="title">
                        <p class="red">用户追评</p>
                        <span>{{itemList.add_time}}</span>
                    </div>
                    <div class="content">
                        <p>{{itemList.content}}</p>
                        <ul>
                            <li v-for="item,index in itemList.img">
                                <img :src="item" alt="" @click.prevent="bigZhuiClick(item,index)">
                            </li>
                        </ul>
                    </div>
                    <div class="spec">
                        <span>{{item.goods_spec_name}}</span>
                    </div>
                </div>

                <div class="reviewMoreMore"
                     v-if="itemList.op_type=='2'&&itemIndex>=2"
                     v-for="itemList,itemIndex in item.list">
                    <span>
                        商家回复：{{itemList.content}}
                    </span>
                </div>
            </li>
        </ul>
        <p class="tips" v-if="showBottom">--------------拉到底了----------------</p>
        <div class="swiperDiv" v-if="showBigImg" @click.prevent="closeImg">
            <swiper :options="swiperOptionTap" ref="mySwiperTap">
                <swiper-slide v-for="item,index in imgsArr" :key="index">
                    <img :src="item" :alt="index">
                </swiper-slide>
            </swiper>
        </div>
        <div class="swiperDiv" v-if="showBigZhuiImg" @click.prevent="closeImg">
            <swiper :options="swiperOptionTap" ref="mySwiperTap">
                <swiper-slide v-for="item,index in imgsZhuiArr" :key="index">
                    <img :src="item" :alt="index">
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
    export default {
        name: "review",
        data() {
            return {
                list: [],
                swiperOptionTap: {
                    freeMode: false,
                    initialSlide: '0',
                    speed: 600,
                    slidesPerView: 'auto',
                    observer: true,
                },
                // 评论
                showBigImg: false,
                imgsArr: [],
                // 追评
                showBigZhuiImg:false,
                imgsZhuiArr:[],
                bigCurrentIndexImg: '',
                page: 0,
                loading: false,
                showBottom: false,
            }
        },
        mounted() {
        },
        methods: {
            getReview(page) {
                this.$post('goods/comments', {
                    goods_id: this.$route.query.goods_id,
                    page: page
                })
                    .then(res => {
                        if (page == 1 && res.list != '') {
                            this.list = res.list
                        } else if (page > 1 && res.list != '') {
                            this.list = this.list.concat(res.list)
                        } else {
                            this.showBottom = true
                            this.loading = false
                        }
                    })
            },
            loadMore() {
                this.loading = true
                this.page++;
                this.getReview(this.page)
                this.loading = false
            },
            // 放大图片
            bigClick(val, index) {
                this.swiperOptionTap.initialSlide = index
                this.bigCurrentIndexImg = index
                this.showBigImg = true
            },
            getImgArr(val, index) {
                this.imgsArr = val.img
                this.imgsZhuiArr = val.list[0].img.length>0?val.list[0].img:val.list[1].img
            },
            // 追评
            bigZhuiClick(val,index) {
                console.log(val)
                console.log(index)
                this.swiperOptionTap.initialSlide = index
                this.showBigZhuiImg = true

            },
            closeImg() {
                this.showBigImg = false
                this.showBigZhuiImg = false
            },
        }
    }
</script>

<style scoped lang="scss">
    .reviewDiv {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        min-height: 100%;
        background-color: #fff;
        .reviewListDiv {
            padding: 0 26px;
            .reviewDivDiv {
                padding: 40px 0;
                border-bottom: 1px solid #eee;
                .reviewTop {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .divFl {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        .divFlFl {
                            img {
                                width: 80px;
                                height: 80px;
                                -webkit-border-radius: 50%;
                                -moz-border-radius: 50%;
                                border-radius: 50%;
                            }
                        }
                        .divFlFr {
                            p {
                                color: #61B2C2;
                                font-size: 28px;
                                line-height: 48px;
                            }
                            > div {
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                img {
                                    width: 20px;
                                    height: 20px;
                                    margin-right: 8px;
                                }
                            }
                        }
                    }
                    .divFr {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        align-self: center;
                        line-height: 40px;

                        span {
                            color: #999;
                            font-size: 24px;
                        }
                    }
                }
                .reviewBody {
                    margin: 30px 0;
                    p {
                        color: #333;
                        word-wrap:break-word;
                        font-size: 30px;
                    }
                    ul {
                        margin-top: 24px;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        flex-wrap: wrap;
                        li {
                            &:nth-child(3n) {
                                margin-right: 0;
                            }
                            margin-right: 10px;
                            margin-bottom: 10px;
                            img {
                                width: 226px;
                                height: 226px;
                                -webkit-border-radius: 8px;
                                -moz-border-radius: 8px;
                                border-radius: 8px;
                            }
                        }
                    }
                }
                .reviewBottom {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    span {
                        color: #999;
                        font-size: 28px;
                        margin-right: 40px;
                    }
                }
                .reviewMore {
                    margin-top: 50px;
                    .title {
                        display: flex;
                        /*flex-direction: column;*/
                        justify-content: space-between;
                        align-items: flex-start;
                        align-self: center;
                        line-height: 40px;
                        p {
                            color: #61B2C2;
                            font-size: 28px;
                        }
                        span {
                            color: #999;
                            font-size: 24px;
                        }
                    }
                    .content {
                        margin: 30px 0 20px;
                        p {
                            color: #333;
                            font-size: 30px;
                        }
                        ul {
                            margin-top: 24px;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            flex-wrap: wrap;
                            li {
                                &:nth-child(3n) {
                                    margin-right: 0;
                                }
                                margin-right: 10px;
                                margin-bottom: 10px;
                                img {
                                    width: 226px;
                                    height: 226px;
                                    -webkit-border-radius: 8px;
                                    -moz-border-radius: 8px;
                                    border-radius: 8px;
                                }
                            }
                        }
                    }
                    .spec {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        margin: 20px 0;
                        span {
                            color: #999;
                            font-size: 28px;
                            margin-right: 40px;
                        }
                    }
                }
                .reviewMoreMore {
                    position: relative;
                    width: 100%;
                    background-color: #eee;
                    padding: 28px 26px;
                    margin-top: 40px;
                    -webkit-border-radius: 20px;
                    -moz-border-radius: 20px;
                    border-radius: 20px;
                    &::after {
                        position: absolute;
                        content: '';
                        left: 50px;
                        top: -20px;
                        border-bottom: 20px solid #eee;
                        border-left: 20px solid transparent;
                        border-right: 20px solid transparent;
                    }
                    span {
                        color: #4c4c4c;
                        font-size: 28px;
                    }
                }
            }
        }
        .tips {
            width: 100%;
            font-size: 28px;
            color: #999;
            text-align: center;
        }
        .swiperDiv {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 1);
            .swiper-container {
                position: relative;
                width: 100%;
                height: 100%;
                .swiper-wrapper {
                    .swiper-slide {
                        img {
                            position: absolute;
                            left: 0;
                            right: 0;
                            top: 0;
                            bottom: 0;
                            margin: auto;
                            z-index: 999;
                            width: 750px;
                            /*height: 750px;*/
                        }
                    }
                }
            }
        }

    }
</style>
