<template>
    <div class="reviewDiv">
        <div class="goodsReviews" v-if="reviewTotal!='0'">
            <div class="reviewsTop">
                <b class="tips"><i></i>商品评价({{reviewTotal}})</b>
                <router-link :to="'/detail/review?goods_id='+$route.query.goods_id">
                    <span>查看全部></span>
                </router-link>
            </div>
            <!--<div class="reviewsTip">-->
            <!--<span v-for="item,index in 3" :key="item" :class="currentIndex==index?'active':''">很舒服(100)</span>-->
            <!--</div>-->
            <div class="reviewList">
                <div class="review">
                    <div class="reviewTop">
                        <div class="divFl">
                            <img :src="reviewData.user_pic" alt="">
                        </div>
                        <div class="divFr">
                            <p>{{reviewData.user_nickname}}</p>
                            <span>{{reviewData.add_time}}</span>
                        </div>
                    </div>
                    <div class="reviewBody">
                        <p>{{reviewData.content}}</p>
                        <!--<ul>-->
                        <!--<li v-for="item,index in 5">-->
                        <!--<img src="" alt="">-->
                        <!--</li>-->
                        <!--</ul>-->
                    </div>
                    <div class="reviewBottom">
                        <span>{{reviewData.goods_spec_name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['info', 'list'],
        data() {
            return {
                currentIndex: '0'
            }
        },
        computed: {
            reviewTotal() {
                return this.info.total
            },
            reviewData() {
                return this.list
            }
        },
        mounted() {

        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .reviewDiv {
        padding: 0 26px;
    }

    .goodsReviews {
        .reviewsTop {
            display: flex;
            justify-content: space-between;
            align-items: center;
            align-content: center;
            margin: 40px 0;
            b {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-size: 30px;
                color: #4d4d4d;
                i {
                    margin-right: 16px;
                    width: 4px;
                    height: 16px;
                    background: rgba(255, 70, 78, 1);
                    border-radius: 2px;
                }
            }
            a {
                span {
                    color: #999;
                    font-size: 24px;
                }
            }
        }
        .reviewsTip {
            display: flex;
            justify-content: flex-start;
            span {
                border-radius: 8px;
                color: #4c4c4c;
                border: 2px solid #ccc;
                padding: 18px 26px;
                margin-right: 20px;
                font-size: 24px;
            }
            .active {
                border: 2px solid #FF8484;
                color: #FF8484;
            }
        }
        .reviewList {
            .review {
                .reviewTop {
                    display: flex;
                    // justify-content: flex-start;
                    // align-items: center;
                    .divFl {
                        img {
                            width: 80px;
                            height: 80px;
                            -webkit-border-radius: 50%;
                            -moz-border-radius: 50%;
                            border-radius: 50%;
                        }
                    }
                    .divFr {
                        display: flex;
                        flex-direction: column;
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
                }
                .reviewBody {
                    margin: 30px 0;
                    width:100%;
                    p {
                        color: #333;
                        word-wrap:break-word;
                        font-size: 30px;
                    }
                    ul {
                        overflow: scroll;
                        margin-top: 24px;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        li {
                            margin-right: 10px;
                            margin-bottom: 10px;
                            img {
                                width: 150px;
                                height: 150px;
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
            }
        }
    }
</style>
