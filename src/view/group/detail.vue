<template>
    <div class="groupDetail">
        <div class="goods">
            <router-link :to="'/detail/index?goods_id='+groupInfo.goods_info.goods_id">
                <div class="divFl">
                    <img :src="groupInfo.goods_info.list_img" alt="">
                </div>
                <div class="divFr">
                    <p>{{groupInfo.goods_info.goods_name}}</p>
                    <p class="otherInfo">
                        <label>
                            <!--<span>{{groupInfo.goods_info.prom}}人团</span>-->
                            <b class="red">￥{{groupInfo.goods_info.prom_price}}</b>
                            <span>已拼{{groupInfo.goods_info.sales}}件</span>

                        </label>
                    </p>
                </div>
            </router-link>
            <!--<div class="flow">-->
            <!--<div>-->
            <!--<p>-->
            <!--<span style="color: #333;">拼单流程</span>-->
            <!--<span style="color: #999;">(若人数不足将自动退款)</span>-->
            <!--</p>-->
            <!--<p @click="remarkClick">说明></p>-->
            <!--</div>-->
            <!--<div>-->
            <!--<span><i>1</i>支付开团/参团</span>-->
            <!--<span><i>2</i>邀请参团</span>-->
            <!--<span><i>3</i>人满成团</span>-->
            <!--</div>-->
            <!--</div>-->
        </div>
        <div class="group">
            <div class="groupImg">
                <p v-if="groupInfo.list.length < groupInfo.goods_num"><i class="wait"></i>正在拼团...</p>
                <p v-if="groupInfo.list.length < groupInfo.goods_num" style="color: #999;font-size: 14px;">
                    还差{{(groupInfo.goods_num-groupInfo.list.length<0?'0':groupInfo.goods_num-groupInfo.list.length)||'1'}}人，
                    <group-count-down :endTime="groupInfo.end_time"></group-count-down>
                </p>
                <p v-else><i class="success"></i>拼团成功</p>
                <div>
                    <div v-for="item,index in groupInfo.list">
                        <!--<img src="../../images/icon-king.png" alt="" class="king">-->
                        <img :src="item.photo" alt="" @error="imgError(item,index)">
                    </div>
                    <div>
                        <img src="../../images/img-unknown.png" alt=""
                             v-if="groupInfo.list.length < groupInfo.goods_num">
                    </div>
                </div>

            </div>
            <div class="groupOperate">
                <button
                    v-if="groupInfo.is_share=='1'&&groupInfo.group_status!='2'" @click="Ishare">
                    立即分享
                </button>
                <button v-if="groupInfo.group_status=='2'||groupInfo.group_status=='3'"
                        @click="openGroup">
                    再拼一单
                </button>
                <button
                    v-if="groupInfo.group_status=='1'&&groupInfo.is_share=='0'" @click="joinGroup">参与拼团
                </button>
            </div>

        </div>
        <!--<div class="groupList">-->
        <!--&lt;!&ndash;<div class="groupList" v-if="groupInfo.group_status=='2'">&ndash;&gt;-->
        <!--<div v-for="item in groupInfo.list">-->
        <!--<p><img :src="item.photo" alt="头像"></p>-->
        <!--<p><span>{{item.nick_name}}</span></p>-->
        <!--<p><span>{{item.add_time|formatDate}}</span></p>-->
        <!--<p><span>{{item.is_group=='1'?'开团':'参团'}}</span></p>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="groupTip">-->
        <!--<div v-for="item,index in groupInfo.goods_tips">-->
        <!--<i></i>-->
        <!--<span>{{item.name}}</span>-->
        <!--</div>-->
        <!--</div>-->
        <div class="goodsList">
            <b><i></i>看了又看</b>
            <goods-squared :goods="goodsList"></goods-squared>
            <span>----没有更多数据了----</span>
        </div>
        <wx-config></wx-config>

    </div>
</template>

<script>
    import {formatDate} from "../../config/date";
    import groupCountDown from '../../components/groupCountDown'
    import GoodsSquared from "../../components/index/goodsSquared";
    import wx from 'weixin-js-sdk';         // 引入微信sdk
    import wxConfig from '../../components/wx/wxconfig'

    import {Toast} from 'mint-ui';


    export default {
        name: "group-detail",
        data() {
            return {
                groupInfo: {goods_info: {}, list: [], goods_tips: []},
                cat_id: '',
                shareInfo: {},
                goodsList: [],       //

            }
        },
        components: {formatDate, groupCountDown, GoodsSquared, wxConfig},
        mounted() {
            this.getGroup()
        },
        filters: {
            formatDate(time) {
                let date = new Date(time * 1000)
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            }
        },
        methods: {
            getGroup() {
                let self = this;
                self.$post('group/getGroupInfo', {
                    group_id: self.$route.query.group_id,
                    token: self.$getCookie('token') ? self.$getCookie('token') : ''
                })
                    .then(res => {
                        self.groupInfo = res
                        self.cat_id = res.goods_info.cat_id
                        self.getGoodsList()
                        self.shareInfo = res.share
                        self.share()
                    })
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                window.pageYOffset = 0
            },
            // 相关推荐
            getGoodsList() {
                let self = this;
                this.$post('search/search', {
                    cate_id: self.cat_id,
                })
                    .then(res => {
                        this.goodsList = res.list
                    })
            },
            // 说明介绍
            remarkClick() {
                this.$router.push('/detail/flow')
            },
            imgError(val, index) {
                this.groupInfo.list[index].photo = 'https://cdn2.pinquduo.cn/Public/upload/logo/logo.jpg'
            },
            // 立即分享
            Ishare() {
                Toast({
                    message: '请点击右上角分享',
                    duration: 2000,
                })
            },
            // 再拼一单
            openGroup() {
                this.$router.push({
                    path: '/detail/index',
                    query: {
                        goods_id: this.groupInfo.goods_id,
                        store_id: this.groupInfo.store_id,
                    }
                })
            },
            // 立即参团
            joinGroup() {
                this.$router.push({
                    path: '/detail/index',
                    query: {
                        goods_id: this.groupInfo.goods_id,
                        store_id: this.groupInfo.store_id,
                        group_id: this.groupInfo.group_id,
                    }
                })
            },
            share() {
                wx.ready(() => {
                    // 分享朋友圈
                    wx.onMenuShareTimeline({
                        title: this.shareInfo.share_title, // 分享标题
                        link: this.shareInfo.share_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: this.shareInfo.share_img, // 分享图标
                        success: function () {
                            Toast({
                                message: '分享成功',
                                duration: 1600
                            })
                        },
                        cancel: function () {
                            Toast({
                                message: '分享失败',
                                duration: 1600
                            })
                        }
                    })
                    // 分享给朋友
                    wx.onMenuShareAppMessage({
                        title: this.shareInfo.share_title, // 分享标题
                        desc: this.shareInfo.share_desc, // 分享描述
                        link: this.shareInfo.share_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: this.shareInfo.share_img, // 分享图标
                        success: function () {
                            // 用户点击了分享后执行的回调函数
                            Toast({
                                message: '分享成功',
                                duration: 1600
                            })
                        },
                        cancel: function () {
                            Toast({
                                message: '分享失败',
                                duration: 1600
                            })
                        }
                    });
                })
            },


        }
    }
</script>

<style scoped lang="scss">
    .groupDetail {
        > div {
            width: 100%;
            padding: 26px;
            background-color: #fff;
        }
    }

    .goods {
        > a {
            padding-top: 14px;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            .divFl {
                img {
                    display: block;
                    width: 180px;
                    height: 180px;
                }
            }
            .divFr {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                align-self: stretch;
                p {
                    text-align: left;
                    color: #333;
                    font-size: 28px;
                    width: 100%;
                    overflow: hidden;
                    -ms-text-overflow: ellipsis;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    line-height: 40px;
                    max-height: 80px;
                }
                .otherInfo {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    label {
                        font-size: 32px;
                        span {
                            color: #999;
                            font-size: 24px;
                        }

                    }
                }
            }
        }
        .flow {
            width: 100%;
            border-top: 1px solid #eee;
            padding: 10px 20px;
            > div {
                width: 100%;
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
                span {
                    color: #999;
                    i {
                        vertical-align: middle;
                        display: inline-block;
                        width: 26px;
                        height: 26px;
                        color: #fff;
                        background-color: #999;
                        text-align: center;
                        -webkit-border-radius: 50%;
                        -moz-border-radius: 50%;
                        border-radius: 50%;
                    }
                }
            }
        }
    }

    .group {
        margin-top: 20px;
        .groupImg {
            > div {
                display: flex;
                justify-content: center;
                padding: 26px 0;

                > div {
                    position: relative;
                    margin-top: 40px;
                    img {
                        display: block;
                        width: 80px;
                        height: 80px;
                        -webkit-border-radius: 50%;
                        -moz-border-radius: 50%;
                        border-radius: 50%;
                        overflow: hidden;
                        margin: 0 8px;
                    }
                    .king {
                        position: absolute;
                        width: 36px;
                        height: 24px;
                        left: 50%;
                        margin-left: -18px;
                        top: -20px;
                        -webkit-border-radius: 0;
                        -moz-border-radius: 0;
                        border-radius: 0;
                    }
                }
            }
            > p {
                text-align: center;
                margin-top: 10px;
                font-size: 36px;
                display: flex;
                justify-content: center;
                align-items: center;
                label {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                i {
                    width: 42px;
                    height: 42px;
                    margin-right: 10px;
                }
                .success {
                    background: url("../../imgs/group/icon-success.png") no-repeat center /100%;
                }
                .wait {
                    background: url("../../imgs/group/icon-wait.png") no-repeat center /100%;
                }
            }
        }
        .groupOperate {
            margin-top: 40px;
            padding-bottom: 40px;
            border-bottom: 1px solid #eee;
            button {
                width: 698px;
                height: 98px;
                line-height: 98px;
                background-color: #FF4862;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                border-radius: 8px;
                font-weight: bold;
                font-size: 32px;
            }
            .joinGroup {
                width: 200px;
                height: 200px !important;
                margin: 0 auto;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                font-size: 30px;
                a {
                    display: block;
                    color: #fff;
                }
            }
        }
    }

    .groupList {
        margin-top: 20px;
        > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            -webkit-border-radius: 80px;
            -moz-border-radius: 80px;
            border-radius: 80px;
            border: 2px solid #f13d3c;
            margin: 20px auto;
            p {
                flex: 2;
                span {
                    display: block;
                    width: 100%;
                }
                &:nth-child(1) {
                    flex: 1;
                    img {
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                    }
                }
                &:nth-child(2) {
                    span {
                        overflow: hidden;
                        -ms-text-overflow: ellipsis;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        max-width: 240px;
                    }
                }
                &:nth-child(3) {
                    span {
                    }
                }
                &:nth-child(4) {
                    flex: 1;
                    span {
                        text-align: center;
                    }
                }
            }
        }
    }

    .groupTip {
        display: flex;
        justify-content: space-around;
        color: #666;
        border-top: 1px solid #eee;
        i {
            display: inline-block;
            width: 30px;
            height: 30px;
            vertical-align: middle;
            background: url("../../images/icon-check.png") no-repeat center /100%;
            box-sizing: border-box;
        }
    }

    .goodsList {
        padding: 0 !important;
        background: transparent !important;
        > b {
            padding: 0 26px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            i {
                width: 4px;
                height: 16px;
                margin-right: 14px;
                background: rgba(255, 70, 78, 1);
                border-radius: 2px;
            }
        }
        span {
            display: block;
            text-align: center;
        }
    }
</style>
