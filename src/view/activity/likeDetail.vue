<template>
    <div class="likeDetail">
        <div class="goods">
            <div class="divFl">
                <img :src="likeInfo.list_img" alt="">
            </div>
            <div class="divFr">
                <p>{{likeInfo.goods_name}}</p>
                <div>
                    <p>
                        <span class="red">￥{{likeInfo.limit_price}}</span>
                        <span style="text-decoration: line-through">￥{{likeInfo.shop_price}}</span>
                    </p>
                    <p>
                        <span>助力人数：{{likeInfo.limit_reach}}人</span>
                        <span class="endPeople">剩余：{{likeInfo.left_reach}}人</span>
                    </p>
                </div>

            </div>
        </div>
        <!--<div class="endTime">-->
            <!--倒计时模块-->
        <!--</div>-->
        <div class="progress">
            <div>
                <span>助力进度</span>
                <vm-progress :percentage="percent" :text-inside="true" status="exception" :stroke-width="12"
                             striped></vm-progress>
                <!--<vm-progress type="circle" :percentage="25"></vm-progress>-->
            </div>
            <div>已有{{likeInfo.curent_reach}}小伙伴助力</div>
        </div>
        <div class="list">
            <div>
                <hr>
                <span>助力伙伴</span>
                <hr>
            </div>
            <ul>
                <li v-for="item,index in help_list">
                    <div class="divFl">
                        <img :src="item.head_img" alt="">
                    </div>
                    <div class="divFr">
                        <p>{{item.nickname}}</p>
                        <p>{{item.add_time}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="btn">
            <mt-button type="danger" size="large" @click="share" v-if="likeInfo.help_status != '2'">继续分享</mt-button>
            <mt-button type="danger" size="large" @click="goHome">回首页</mt-button>
        </div>
        <div class="remark">
            <p>活动说明</p>
            <div v-html="rule_desc">

            </div>
        </div>
        <!--<wx-config></wx-config>-->
        <div class="dialogDiv" v-if="showPic">
            <div class="bg" @click="closePicDiv">></div>
            <div class="picDiv">
                <img :src="likeInfo.share_img" alt="">
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
    // import wxConfig from '../../components/wx/wxconfig'
    export default {
        name: "likeDetail",
        data() {
            return {
                likeInfo: '',
                help_list: [],
                percent: '',
                showPic:false,
                rule_desc:''
            }
        },
        mounted() {
            this.getDetail()
        },
        // components:{wxConfig},
        methods: {
            getDetail() {
                this.$post('Helpactivity/helpInfo', {
                    token: this.$getCookie('token'),
                    help_id: this.$route.query.help_id
                })
                    .then(res => {
                        this.likeInfo = res
                        this.help_list = res.help_list
                        this.percent = (parseInt(res.curent_reach) > parseInt(res.limit_reach)?100:(parseInt(res.curent_reach) / parseInt(res.limit_reach)) * 100).toFixed(2)
                        console.log(this.percent)
                        this.rule_desc = res.rule_desc
                    })
            },
            // 继续分享
            share() {
                this.showPic = true
            },
            // 关闭弹框
            closePicDiv() {
                this.showPic = false
            },
            // 回到首页
            goHome() {
                if (this.$getCookie('terminal') == 'i') {
                    window.getHome()
                } else if (this.$getCookie('terminal') == 'a') {
                    window.webview.getHome()
                } else {
                    this.$router.push('/index')
                }
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
    .likeDetail {
        > div {
            background-color: #fff;
            padding: 20px;
            margin-bottom: 20px;
        }
        .goods {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .divFl {
                img {
                    display: block;
                    width: 160px;
                    height: 160px;
                }
            }
            .divFr {
                flex-direction: column;
                align-items: flex-start;
                align-self: stretch;
                flex: 1;
                > p {
                    font-size: 26px;
                    width: 100%;
                }
                > div {
                    width: 100%;

                    p {
                        padding: 2px 0;
                        span {
                            margin-right: 20px;
                        }
                        .red {
                            font-size: 24px;
                            font-weight: bold;
                        }
                        .endPeople {
                            color: #fff;
                            padding: 4px 8px;
                            background: linear-gradient(right, #ff4141, #fb6363);
                        }
                    }
                }
            }
        }
        .endTime {
            text-align: center;
        }
        .progress {
            div {
                display: flex;
                justify-content: space-around;
                align-items: center;
                .vm-progress {
                    width: 500px;
                }
            }
        }
        .list {
            > div {
                position: relative;
                span {
                    display: block;
                    width: 110px;
                    font-weight: bold;
                    font-size: 26px;
                    color: red;
                    margin: 0 auto;
                }
                hr {
                    position: absolute;
                    width: 100px;
                    top: 50%;
                    margin-top: -1px;
                    border: 2px solid red;
                    &:first-child {
                        left: 180px;
                    }
                    &:last-child {
                        right: 180px;
                    }
                }
            }
            ul {
                li {
                    display: flex;
                    justify-content: flex-start;
                    padding: 20px 0;
                    border-bottom: 1px solid #ccc;
                    .divFl {
                        img {
                            display: block;
                            width: 72px;
                            height: 72px;
                            -webkit-border-radius: 50%;
                            -moz-border-radius: 50%;
                            border-radius: 50%;
                        }
                    }
                    .divFr {
                        flex-direction: column;
                        align-items: flex-start;
                        align-self: center;
                    }

                }
            }
        }
        .btn {
            .mint-button {
                margin-bottom: 20px;
                font-size: 28px;
                height: 96px;
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
    }
</style>
