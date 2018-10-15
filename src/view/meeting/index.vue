<template>
    <div class="meeting" :style="{backgroundColor:meetingInfo.color_rule?meetingInfo.color_rule.meeting_bg:''}">
        <div class="bannerDiv">
            <img :src="meetingInfo.meeting_place_img" alt="" v-if="meetingInfo.meeting_place_img">
            <img src="../../imgs/base/icon-detail-banner.png" alt="" v-else style="opacity: .4">
        </div>
        <div class="listDiv">
            <list :dataList="meetingList" :childInfo="meetingChildInfo" :meetingIndexInfo="meetingInfo"
                  :childInfoListBg="meetingInfo.color_rule"></list>
        </div>
        <wx-config></wx-config>
        <div class="meetingNoDiv" v-if="isShowModel">
            <img src="../../imgs/meeting/icon-other.png" alt="">
        </div>
        <div class="meetingOverDiv" v-if="isShowOver">
            <div class="overDiv">
                <p>{{tipsMsg}}</p>
                <button @click="goIndex">回到首页</button>
            </div>
        </div>

    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import List from '../meeting/list'
    import wx from 'weixin-js-sdk';         // 引入微信sdk
    import wxConfig from '../../components/wx/wxconfig'


    export default {
        name: "index",
        data() {
            return {
                meetingInfo: {color_rule: {}},
                meetingList: [],
                meetingChildInfo: {},
                isShowModel: false,
                isShowOver: false,
                tipsMsg: '您来晚啦，活动已结束，下次更精彩哦~'
            }
        },
        components: {List, wxConfig},
        mounted() {
            this.getMeetingIndex()
            this.share()
        },
        methods: {
            getMeetingIndex() {
                this.$post('meeting/getMeetingInfo', {
                    meeting_place_sn: this.$route.query.meeting_place_sn
                })
                    .then(res => {
                        if (res.code == '200') {
                            this.meetingInfo = res.data.result.meeting_info
                            this.meetingList = res.data.result.goods_item
                            this.meetingChildInfo = res.data.result.child_meeting
                            document.title = this.meetingInfo.meeting_place_name
                        } else {
                            if (res.code == 'F0150002') {
                                this.isShowModel = false
                                this.tipsMsg = res.msg
                                this.isShowOver = true
                            } else {
                                this.isShowModel = true
                                Toast(res.msg);
                            }
                        }
                        // F0150001 =》 活动会场信息不存在
                        // F0150002 =》 您来晚啦，活动已结束，下次更精彩哦~
                        //     F0150003 =》 活动会场已关闭
                        // F0150004 =》 活动会场还未开始，敬请期待

                    })
            },

            // 回到首页
            goIndex() {
                if (this.$getCookie('terminal') == 'i') {
                    window.getHome()
                } else if (this.$getCookie('terminal') == 'a') {
                    window.webview.getHome()
                } else {
                    this.$router.push('/index')
                }
            },

            // 分享
            share() {
                wx.ready(() => {
                    // 分享朋友圈
                    wx.onMenuShareTimeline({
                        title: this.meetingInfo.share_title, // 分享标题
                        link: this.meetingInfo.share_path, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: this.meetingInfo.share_img, // 分享图标
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
                        title: this.meetingInfo.share_title, // 分享标题
                        desc: this.meetingInfo.share_desc, // 分享描述
                        link: this.meetingInfo.share_path, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: this.meetingInfo.share_img, // 分享图标
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
                wx.error((err) => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .meeting {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        min-height: 100%;
        /*background-color: #3D9DEC;*/
        .bannerDiv {
            img {
                width: 100%;
            }
        }
        .listDiv {

        }
        .meetingNoDiv {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            min-height: 100%;
            z-index: 999;
            img {
                width: 100%;
            }
        }
        .meetingOverDiv {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            min-height: 100%;
            z-index: 999;
            background-color: rgba(0, 0, 0, .4);
            .overDiv {
                position: absolute;
                width: 540px;
                height: 314px;
                padding: 80px 80px 40px;
                background-color: #fff;
                -webkit-border-radius: 20px;
                -moz-border-radius: 20px;
                border-radius: 20px;
                left: 50%;
                margin-left: -270px;
                top: 50%;
                margin-top: -157px;
                p {
                    font-size: 32px;
                    color: #333;
                    font-weight: bold;
                    text-align: center;
                }
                button {
                    display: block;
                    width: 224px;
                    height: 60px;
                    line-height: 60px;
                    -webkit-border-radius: 60px;
                    -moz-border-radius: 60px;
                    border-radius: 60px;
                    color: #fff;
                    background-color: #FF4862;
                    font-size: 28px;
                    margin: 60px auto 0;
                }
            }

        }
    }
</style>
