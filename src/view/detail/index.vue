<template>
    <div class="detail">
        <div class="header" v-if="!this.$route.query.pid">
            <div class="divFl" @click="goHistory">
                <img src="../../imgs/detail/icon-arrow-left.png" alt="">
            </div>
            <div class="divFr">
                <div @click="goIndex">
                    <img src="../../imgs/detail/icon-home.png" alt="">
                </div>
                <div @click="shareTip">
                    <img src="../../imgs/detail/icon-share.png" alt="">
                </div>
            </div>
        </div>
        <div class="loadingDiv" v-if="isShowLoading">
            <img src="../../imgs/base/icon-detail-banner.png" alt="">
            <img src="../../imgs/base/icon-detail-info1.png" alt="">
            <img src="../../imgs/base/icon-detail-info2.png" alt="">
            <img src="../../imgs/base/icon-detail-info3.png" alt="">
            <img src="../../imgs/base/icon-list.png" alt="">
            <img src="../../imgs/base/icon-list.png" alt="">
            <img src="../../imgs/base/icon-list.png" alt="">
        </div>
        <div v-else>
            <!--<div class="fixedApp">前往App</div>-->
            <detail-banner :banner="goodsInfo.images_list.banner" :imgsList="goodsInfo.label"></detail-banner>
            <!-- 商品基本信息 -->
            <goods-info :info="goodsInfo" :couponInfo="storeCouponList"
                        @isCouponDivShow="isCouponDivMethods"></goods-info>
            <!-- 该商品已经拼团情况 -->
            <group-info @listenShowSpec="goShowSpec"></group-info>
            <!-- 评价模块 -->
            <detail-review :info="reviewInfo" :list="reviewInfo.new"></detail-review>
            <!-- 该商品所在商家信息 -->
            <goods-store :storeInfo="goodsInfo" :storeId="goodsInfo.merchant_info.store_id"></goods-store>
            <!-- 商品其他详情信息 -->
            <goods-detail :moreInfo="goodsInfo.images_list.detail_img"></goods-detail>
            <!--操作底栏-->
            <div class="fixedBottom">
                <operate-bottom @buyClick="buyType" :bottomInfo="goodsInfo"></operate-bottom>
            </div>
            <!--规格弹框-->
            <goods-spec :specGoodsInfo="goodsInfo" :isShowSpec="showSpec" @reviseSpec="specHide"
                        :buyTypeNum="buyTypeNumVal" @isCouponDivShow="isCouponDivMethods" :limitInfo="goodsInfo"
                        :groupInfo="groupData"></goods-spec>
            <!--领券弹框-->
            <coupon-div :isCouponStatus="isCouponShow" :info="goodsInfo" :coupon='storeCouponList'
                        @closeCoupon="closeCouponDiv"></coupon-div>
        </div>

        <wx-config></wx-config>

    </div>
</template>

<script>

    import DetailBanner from '../../components/goods/detailBanner'
    import GoodsInfo from '../../components/goods/goodsInfo'
    import GroupInfo from '../../components/goods/groupInfo'
    import DetailReview from '../../components/goods/detailReview'
    import GoodsStore from '../../components/goods/goodsStore'
    import GoodsDetail from '../../components/goods/goodsDetail'

    import OperateBottom from '../../components/operateBottom'
    import GoodsSpec from '../../components/goods/GoodsSpec'
    import CouponDiv from '../../components/goods/couponDiv'
    import {Toast} from 'mint-ui';

    import wx from 'weixin-js-sdk';         // 引入微信sdk
    import wxConfig from '../../components/wx/wxconfig'


    export default {
        data() {
            return {
                scrollTop: '',
                showSpec: this.$route.query.group_id ? true : false,
                goodsInfo: {
                    images_list: {banner: [], detail_img: []},
                    merchant_info: {},
                    store_coller: {},
                    comment_tags: {new: {}, tags: []}
                },
                reviewInfo: {new: {}, tags: []},      // 评价
                groupInfo: '',
                storeInfo: '',
                shareInfo: {},

                groupData:'',           // 拼团id

                ind0: '',
                ind1: '',
                number: 1,
                isDisabled: true,
                buyTypeNumVal: this.$route.query.group_id ? '2' : '',

                isCouponShow: false,
                storeCouponList: {merchant: [], tips: []},   // 优惠券
                isShowLoading: true,

                url: '',
            }
        },
        components: {
            DetailBanner,
            GoodsInfo,
            GroupInfo,
            DetailReview,
            GoodsStore,
            GoodsDetail,
            OperateBottom,
            GoodsSpec,
            CouponDiv,
            wxConfig
        },
        created() {
        },
        // mixins: [assign],
        mounted() {
            window.addEventListener('scrollTop', this.scroll())
            this.getGoodsInfo()         // 商品详情
            this.getGroup()
        },

        methods: {
            scroll() {
                this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            },

            // 点击拼团列表中的团
            goShowSpec(val) {
                this.groupData = val.group_id
                this.showSpec = true
            },

            // 父传子，控制spec的隐藏显示
            buyType(val) {
                // this.buyTypeNumVal  == '1' ? '单买 ':'拼团'
                this.buyTypeNumVal = val
                this.showSpec = true
            },
            // 关闭规格弹框
            specHide(val) {
                this.showSpec = val
            },
            // 子传父,判断是否显示couponDiv
            isCouponDivMethods(val) {
                this.isCouponShow = val
            },
            // 关闭优惠券
            closeCouponDiv() {
                this.isCouponShow = false
            },
            shareTip() {
                Toast({
                    message: '请点击右上角分享',
                    duration: 1400
                })
            },
            // 获取商品详情
            getGoodsInfo() {
                this.$post('goods/getGoodsDetail', {
                    goods_id: this.$route.query.goods_id,
                    token: this.$getCookie('token') ? this.$getCookie('token') : '',
                    pid:this.$route.query.pid,
                    custom_parameters:this.$route.query.custom_parameters
                })
                    .then((res) => {
                        this.goodsInfo = res
                        this.reviewInfo = res.comment_tags
                        this.isShowLoading = false
                        this.getCoupon()
                        this.shareInfo = res.share
                        this.share()
                    })
            },
            // 获取优惠券
            getCoupon() {
                let self = this;
                self.$post('merchant/getMerchantCouponList', {
                    token: self.$getCookie('token') ? self.$getCookie('token') : '',
                    store_id: self.goodsInfo.store_id
                })
                    .then(res => {
                        self.storeCouponList = res
                    })
            },
            // 获取拼团详信息
            getGroup() {
                this.$post('group/getGoodsGroupList', {
                    goods_id: this.$route.query.goods_id
                })
                    .then((res) => {
                        this.groupInfo = res
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

            // 分享成功后统计分享次数
            getShareNumber() {
                this.$post('goods/setShareCount', {
                    goods_id: this.$route.query.goods_id
                })
                    .then(res => {

                    })
            },

            // 分享
            share() {
                wx.ready(() => {
                    // 分享朋友圈
                    wx.onMenuShareTimeline({
                        title: this.shareInfo.share_title, // 分享标题
                        link: this.shareInfo.share_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: this.shareInfo.share_img, // 分享图标
                        success: function () {
                            this.getShareNumber()
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
                            this.getShareNumber()
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

        },
        // watch: {
        //     '$route'(to, from) {
        //         console.log(to)
        //     }
        // }

    }
</script>

<style lang="scss" scoped>
    .detail {
        margin-bottom: 120px;
        .header {
            position: absolute;
            top: 18px;
            left: 0;
            right: 0;
            height: 88px;
            padding: 0 26px;
            background-color: transparent;
            display: flex;
            justify-content: space-between;
            z-index: 99;
            > div {
                img {
                    width: 74px;
                    height: 74px;
                    z-index: 999;
                }
            }
            .divFr {
                img {
                    margin-left: 20px;
                }
            }
        }

        .loadingDiv {
            img {
                width: 698px;
                margin: 20px auto;
                &:nth-child(1) {
                    width: 750px;
                    margin: 0 auto;
                }
            }
        }
    }

    .fixedApp {
        position: fixed;
        top: 40px;
        right: 0;
        padding: 10px 30px;
        border-radius: 8px;
        background-color: #ff7500;
        color: #fff;
        z-index: 99;
    }


</style>

