<template>
    <div>
        <div class="header">
            <div class="divFl">
                <div @click="goHistory">
                    <img src="../../imgs/detail/icon-arrow-left.png" alt="">
                </div>
            </div>
            <div class="divFr">
                <div @click="goIndex">
                    <img src="../../imgs/detail/icon-home.png" alt="">
                </div>
                <div @click="Ishare">
                    <img src="../../imgs/detail/icon-share.png" alt="">
                </div>
            </div>
        </div>
        <div class="storeInfo">
            <div class="storeTop">
                <div class="storeTopTop">
                    <img :src="storeData.store_logo" :alt="storeData.store_name">
                    <b>{{storeData.store_name}}</b>
                    <p>已拼：{{storeData.sales}}</p>
                </div>
                <div class="storeTopBottom">
                    <div @click="toChat">
                        <img src="../../imgs/detail/icon-message.png" alt="">
                        <span>客服</span>
                    </div>
                    <div :class="['collect' ,is_coller!='0'?'isCollect':'']" @click="collect">
                        <i></i>
                        <!--<span v-if="is_coller!='0'">收藏</span>-->
                        <span>收藏</span>
                    </div>
                </div>
            </div>
            <!--<div class="storeBottom">-->
            <!--{{storeData.introduce}}-->
            <!--</div>-->
        </div>
        <div class="coupon" v-if="coupon.merchant">
            <swiper :options="swiperOptionTap" ref="mySwiperTap">
                <swiper-slide v-for="item,index in coupon.merchant" :key="index"
                              :class="item.is_receive!='0'?'isGetClass':''">
                    <p @click="getCoupon(item,index)">￥<b>{{item.money}}</b></p>
                    <p class="ft20">使用期限</p>
                    <p @click="getCoupon(item,index)" class="ft20">至{{item.send_end_time}}</p>
                    <!--<i class="isgetedIcon" v-if="item.is_receive!='0'"></i>-->
                </swiper-slide>
            </swiper>
            <!--<div class="shadow" v-if="coupon.merchant"></div>-->
        </div>
        <div class="recommend" v-if="groupList.length>0">
            <div class="horizationGoods">
                <div class="title">
                    <b><i></i>大家正在拼</b>
                    <router-link :to="`/store/groupList?store_id=${$route.query.store_id}`">查看更多></router-link>
                </div>
                <swiper :options="swiperOptionTap" ref="mySwiperTap">
                    <swiper-slide v-for="item,index in groupList" :key="index">
                        <div class="userDiv">
                            <div class="divFl">
                                <img :src="item.photo" alt="">
                            </div>
                            <div class="divFr">
                                <p>{{item.nicke_name}}</p>
                                <p>
                                    <count-down :endTime="item.end_time"></count-down>
                                </p>
                            </div>
                        </div>
                        <router-link :to="`/group/detail?group_id=${item.group_id}`">
                            <img :src="item.goods_list_img" :alt="index">
                            <div class="goodsName">{{item.goods_name}}</div>
                            <div class="goodsInfo">
                                <b>
                                    ￥<span>{{item.goods_price}}</span>
                                </b>
                            </div>
                        </router-link>
                    </swiper-slide>
                </swiper>
                <!--<div class="shadow"></div>-->
            </div>
        </div>
        <wx-config></wx-config>
    </div>
</template>

<script>
    // import {formatDate} from "../../config/date";
    import countDown from '../../components/groupCountDown'
    import wx from 'weixin-js-sdk';         // 引入微信sdk
    import {Toast} from 'mint-ui';
    import wxConfig from '../../components/wx/wxconfig'


    export default {
        name: "storeInfo",
        props: ['store', 'list'],
        data() {
            return {
                swiperOptionTap: {
                    notNextTick: true,
                    freeMode: true,
                    autoplay: false,
                    loopedSlides: true,
                    freeModeMomentumRatio: 0.5,
                    slidesPerView: 'auto',
                    preventClicks: true,
                    onClick: this.activeClick
                },
                isPlain: false,
                coupon: {merchant: [], tips: []},
                is_coller: '',
                groupList: [],
                shareInfo: {},
            }
        },
        computed: {
            storeData() {
                return this.store
            },
            listData() {
                return this.list
            }
        },
        components: {countDown, wxConfig},
        mounted() {
            this.getCouponList()
            this.getGroupList()
            if (this.$getCookie('token')) {
                this.isCollect()
            }
            setTimeout(() => {
                this.shareInfo = this.store.share
            }, 1000)
        },
        methods: {
            // 获取优惠券
            getCouponList() {
                this.$post('merchant/getMerchantCouponList', {
                    token: this.$getCookie('token'),
                    store_id: this.$route.query.store_id
                })
                    .then(res => {
                        this.coupon = res
                    })
            },
            // 领取优惠券
            getCoupon(val, index) {
                if (val.is_receive == '0') {
                    this.$post('user/hanldeUserCoupon', {
                        token: this.$getCookie('token')?this.$getCookie('token'):'',
                        coupon_id: val.coupon_id
                    })
                        .then(res => {
                            Toast({
                                message: '领取成功',
                                duration: 1400
                            })
                            this.getCouponList()
                        })
                } else {
                    Toast({
                        message: '每人仅限领取一次哦~',
                        duration: 1400
                    })
                }
            },
            // 判断是否被收藏
            isCollect() {
                this.$post('user/isStoreCollect', {
                    store_id: this.$route.query.store_id,
                    token: this.$getCookie('token') ? this.$getCookie('token') : ''
                })
                    .then(res => {
                        this.is_coller = res.is_coller
                    })
            },
            collect() {
                if (this.is_coller == '0') {
                    this.$post('user/addStoreCollect', {
                        store_id: this.$route.query.store_id,
                        token: this.$getCookie('token') ? this.$getCookie('token') : ''
                    })
                        .then(res => {
                            this.is_coller = 1
                            Toast({
                                message: '已收藏',
                                duration: 1200
                            })
                        })

                } else {
                    this.$post('user/cancelStoreCollect', {
                        store_id: this.$route.query.store_id,
                        token: this.$getCookie('token') ? this.$getCookie('token') : ''
                    })
                        .then(res => {
                            this.is_coller = 0
                            Toast({
                                message: '已取消收藏',
                                duration: 1200
                            })
                        })

                }
            },

            // 点击客服聊天
            toChat() {
                this.$router.push({
                    path: '/chat/index',
                    query: {
                        store_id: this.$route.query.store_id
                    }
                })
            },
            // 获取拼团
            getGroupList() {
                this.$post('group/getStoreGroupList', {
                    store_id: this.$route.query.store_id
                })
                    .then(res => {
                        this.groupList = res.list
                    })
            },
            // 条件筛选
            plainChange() {
                this.isPlain = !this.isPlain
            },
            plain2Change() {
                this.isPlain = !this.isPlain
            },
            chatStore() {
                this.$router.push({
                    path: '/chat/index',
                    query: {
                        store_id: this.storeData.store_id
                    }
                })
            },

            // 返回上一页
            goHistory() {
                history.go(-1)
            },
            // 回到首页
            goIndex() {
                this.$router.push('/index')
            },
            // 立即分享
            Ishare() {
                Toast({
                    message: '请点击右上角分享',
                    duration: 1200,
                })
            },
            // 立即分享
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
    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        max-width: 750px;
        height: 88px;
        padding: 0 26px;
        display: flex;
        justify-content: space-between;
        z-index: 99;
        margin: 0 auto;
        background-color: #fff;
        > div {
            img {
                width: 74px;
                height: 74px;
            }
        }
        .divFr {
            img {
                margin-left: 40px;
            }
        }
    }

    .storeInfo {
        width: 100%;
        margin-top: 88px;
        background-color: #fff;
        > div {
            padding: 0 26px;
        }
        .storeTop {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            > div {
                width: 100%;
            }
            .storeTopTop {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                img {
                    width: 100px;
                    height: 100px;
                    border: 2px solid #eee;
                }
                b {
                    color: #333;
                    font-size: 36px;
                    margin: 30px 0 20px;
                }
                p {
                    color: #999;
                    font-size: 24px;
                }

            }
            .storeTopBottom {
                width: 60%;
                margin: 50px 0;
                display: flex;
                justify-content: space-around;
                align-items: center;
                > div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img {
                        width: 40px;
                        height: 40px;
                        margin-right: 10px;
                    }
                    span {
                        color: #4c4c4c;
                        font-size: 28px;
                    }
                }
                .collect {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    i {
                        display: inline-block;
                        width: 40px;
                        height: 40px;
                        vertical-align: middle;
                        margin-right: 12px;
                        background: url("../../imgs/detail/icon-goods-collect.png") no-repeat center /100%;
                    }
                    span {
                        display: inline-block;
                    }
                }
                .isCollect {
                    i {
                        background: url("../../imgs/detail/icon-goods-collect-active.png") no-repeat center /100%;
                    }
                    span {
                        color: #ff6842;
                    }
                }

            }
        }
    }

    .coupon {
        background-color: #fff;
        padding: 0 26px;
        position: relative;

        .swiper-container {
            .swiper-slide {
                position: relative;
                width: 312px;
                height: 150px;
                margin-right: 20px;
                background: url("../../imgs/detail/icon-coupon-store-bg.png") no-repeat center /100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                p {
                    margin-left: -60px;
                    font-size: 28px;
                    color: #fff;
                    b {
                        font-size: 58px;
                    }
                }
                .isgetedIcon {
                    position: absolute;
                    right: 10px;
                    top: 10px;
                    width: 34px;
                    height: 34px;
                    background: url("../../imgs/detail/icon-coupon-isget.png") no-repeat center /100%;
                }
            }
            .isGetClass {
                position: relative;
                background: url("../../imgs/detail/icon-coupon-store-bged.png") no-repeat center /100%;
                p {
                    margin-left: -60px;
                    font-size: 28px;
                    color: #FF4862;
                    b {
                        font-size: 58px;
                    }
                }
            }
        }
        .shadow {
            position: absolute;
            right: 0;
            top: 50px;
            width: 130px;
            height: 380px;
            background: url("../../imgs/index/icon-goods-shadow.png") no-repeat center /100%;
            z-index: 99;
        }

    }

    .recommend {
        position: relative;
        background-color: #fff;
        padding: 40px 0;
        .horizationGoods {
            position: relative;
            width: 698px;
            margin: 0 auto;
            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                b {
                    font-size: 30px;
                    color: #4d4d4d;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    i {
                        width: 4px;
                        height: 16px;
                        background: rgba(255, 70, 78, 1);
                        border-radius: 2px;
                        margin-right: 20px;
                    }
                }
                a {
                    font-size: 24px;
                }
            }
            .swiper-container {
                .swiper-slide {
                    width: 250px;
                    margin-right: 20px;
                    .userDiv {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        margin-bottom: 20px;
                        .divFl {
                            margin-right: 10px;
                            > img {
                                display: block;
                                width: 54px;
                                height: 54px;
                                -webkit-border-radius: 50%;
                                -moz-border-radius: 50%;
                                border-radius: 50%;
                                margin-right: 0;
                            }
                        }
                        .divFr {
                            display: flex;
                            flex-direction: column;
                            justify-content: flex-start;
                            align-items: flex-start;
                            p {
                                font-size: 24px;
                                color: #4C4C4C;
                                width: 180px;
                                overflow: hidden;
                                -ms-text-overflow: ellipsis;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                    a {
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: flex-start;
                        .userDiv {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            .divFl {
                                margin-right: 10px;
                                > img {
                                    display: block;
                                    wdith: 54px;
                                    height: 54px;
                                    -webkit-border-radius: 50%;
                                    -moz-border-radius: 50%;
                                    border-radius: 50%;
                                }
                            }
                            .divFr {
                                p {
                                    font-size: 24px;
                                    color: #4C4C4C;
                                }
                            }
                        }
                        img {
                            display: block;
                            width: 250px;
                            height: 250px;
                        }
                        .goodsName {
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            font-size: 24px;
                            height: 60px;
                            line-height: 30px;
                            color: #333;
                            margin: 20px 0 24px;
                        }
                        .goodsInfo {
                            b {
                                font-size: 24px;
                                color: #ff4862;
                                span {
                                    font-size: 32px;
                                }
                            }
                        }
                    }
                }
            }
            .shadow {
                position: absolute;
                right: 0;
                top: 50px;
                width: 130px;
                height: 380px;
                background: url("../../imgs/index/icon-goods-shadow.png") no-repeat center /100%;
                z-index: 9;
            }
        }

    }

    /*.title {*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*align-items: center;*/
    /*background-color: #fff;*/
    /*padding: 20px !important;*/
    /*margin: 20px 0;*/
    /*> div {*/
    /*color: #333;*/
    /*}*/
    /*.mint-button {*/

    /*}*/
    /*}*/
</style>
