<template>
    <div class="myLike">
        <div class="list" v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="100">
            <div class="goods" v-for="item,index in list">
                <div class="divFl">
                    <img :src="item.list_img" alt="">
                </div>
                <div class="divFr">
                    <p class="goodsName">{{item.goods_name}}</p>
                    <p v-if="item.limit_reach>item.curent_reach">需<span
                        class="red">{{item.limit_reach}}</span>人助力,还差<span class="red">{{item.left_reach}}</span>人
                    </p>
                    <p>助力截止时间{{item.end_time_format}}</p>
                    <p class="operate">
                        <span>
                            <b class="red">￥0.00</b>
                        </span>
                        <mt-button type="primary" plain @click="likeDetailClick(item,index)">助力详情</mt-button>
                        <mt-button type="danger" v-if="item.help_status=='1'" @click="getPicture(item)">继续分享</mt-button>
                        <mt-button type="danger" plain v-if="item.help_status=='2'" @click="orderDetail(item,index)">
                            订单详情
                        </mt-button>
                        <mt-button type="default" disabled v-if="item.help_status=='3'">已结束</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!--图片显示-->
        <div class="dialogDiv" v-if="showPic">
            <div class="bg" @click="closePicDiv">></div>
            <div class="picDiv">
                <img :src="share_img" alt="">
                <div class="close" @click="closePicDiv"></div>
                <div class="shareDiv" v-if="this.$getCookie('terminal')">
                    <p>分享到</p>
                    <div class="shareDivWhere">
                        <div @click="shareWx">
                            <i></i>
                            <span>微信</span>
                        </div>
                        <div @click="sharePyq">
                            <i></i>
                            <span>朋友圈</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        name: "myLike",
        data() {
            return {
                loading: false,
                list: [],
                page: 0,
                total_page: 0,
                showPic: false,
                share_img: ''
            }
        },
        mounted() {
        },
        methods: {
            // 拼团列表
            getList(page) {
                this.$post('user/getHelpActivityList', {
                    page: page,
                    token: this.$getCookie('token')
                })
                    .then(res => {
                        this.list = this.list.concat(res.list)
                        this.total_page = res.total_page
                    })
            },
            // 助力状态
            likeDetailClick(val, index) {
                this.$router.push({
                    path: '/activity/likeDetail',
                    query: {
                        help_id: val.id
                    }
                })
            },
            // 订单详情=》已完成显示。跳转到订单详情
            orderDetail(val, index) {
                this.$router.push({
                    path: '/order/detail',
                    query: {
                        order_sn: val.order_sn
                    }
                })
            },

            loadMore() {
                this.loading = true
                this.page++
                this.getList(this.page)
                this.loading = false
            },
            // 生成图片
            getPicture(val) {
                this.showPic = true
                this.share_img = val.share_img
            },
            // 关闭图片
            closePicDiv() {
                this.showPic = false
            },
            // 分享
            shareWx() {
                if (this.$getCookie('terminal') == 'i') {
                    window.share(0, this.share_img)
                } else if (this.$getCookie('terminal') == 'a') {
                    window.webview.share(0, this.share_img)
                }
            },
            sharePyq() {
                if (this.$getCookie('terminal') == 'i') {
                    window.share(1, this.share_img)
                } else if (this.$getCookie('terminal') == 'a') {
                    window.webview.share(1, this.share_img)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .list {
        .goods {
            margin-top: 20px;
            padding: 20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            background-color: #fff;
            .divFl {
                img {
                    display: block;
                    width: 264px;
                    height: 264px;
                }
            }
            .divFr {
                flex-direction: column;
                align-items: flex-start;
                width: 100%;
                p {
                    width: 100%;
                    color: #999;
                    padding: 2px 0;
                }
                .goodsName {
                    font-size: 30px;
                    margin-bottom: 20px;
                    color: #444;
                }
                .operate {
                    flex: 1;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    > span {
                        b {
                            font-size: 32px;
                        }
                        span {
                            text-decoration: line-through;
                            color: #999;
                        }
                    }
                }
            }
        }

    }

    .dialogDiv {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: 0;
        z-index: 9;
        background-color: transparent;
        .bg {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(0, 0, 0, .6) !important;
        }
        .picDiv {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            img {
                display: block;
                width: 500px;
                margin: 80px auto 20px;
                border: 1px solid #ccc;
                border-radius: 20px;
            }
            .close {
                position: absolute;
                width: 100px;
                height: 100px;
                left: 50%;
                margin-left: -50px;
                background: url("../../images/icon-close.png") no-repeat center /100%;
            }
            .shareDiv {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: #fff;
                padding: 20px;
                p {
                    font-size: 30px;
                    padding: 20px 0;
                    text-align: center;
                }
                .shareDivWhere {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    > div {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        margin: 0 20px;
                        i {
                            display: block;
                            width: 80px;
                            height: 80px;
                        }
                        span {
                            color: #333;
                            font-size: 30px;
                        }
                        &:nth-child(1) {
                            i {
                                background: url("../../images/icon-share-wx.png") no-repeat center /100%;
                            }
                        }
                        &:nth-child(2) {
                            i {
                                background: url("../../images/icon-share-pyq.png") no-repeat center /100%;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
