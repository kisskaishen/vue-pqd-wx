<template>
    <div class="subsetDiv" :style="{backgroundColor:subsetInfo?subsetInfo.color_rule.meeting_bg:'#56C8F1'}"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="100"
         infinite-scroll-immediate-check="false">
        <div class="bannerDiv">
            <img :src="subsetInfo.meeting_place_img" alt="" v-if="subsetInfo.meeting_place_img">
            <img src="../../imgs/base/icon-banner-menu.png" alt="" v-else style="opacity: .4;">
        </div>
        <div class="mainDiv">
            <swiper :options="swiperOptionNavbar" ref="swiperNavbar" :class="['navList',isFixed?'fixedNav':'']"
                    :style="{backgroundColor:subsetInfo?subsetInfo.color_rule.meeting_nav_bg:'#2EB5E8'}"
                    @tauchstart.self="console.log(1);">
                <swiper-slide :class="[currentIndex==index?'navActive':'','swiperSlide']"
                              v-for="(item,index) in navData" :key="item.name">
                    {{item.cat_name}}
                </swiper-slide>
            </swiper>
            <list :dataList="subsetList" :childInfoListBg="subsetInfo.color_rule"></list>
            <!--<list :dataList="subsetList" @listenParentEvent="getMoreList"></list>-->
            <div class="bottomLoadingDiv" v-if="isShowLoading">
                <img src="../../imgs/base/icon-loading.gif" alt="">
                <p>加载中...</p>
            </div>
            <p v-if="showBottom" style="text-align: center;margin-top: 10px;">----------您已拉倒底了----------</p>
        </div>
        <wx-config></wx-config>
    </div>
</template>

<script>
    import List from '../meeting/list'
    import wx from 'weixin-js-sdk';         // 引入微信sdk
    import wxConfig from '../../components/wx/wxconfig'

    export default {
        name: "subset",
        data() {
            return {
                swiperOptionNavbar: {
                    freeMode: true,
                    freeModeMomentumRatio: 0.5,
                    slidesPerView: 'auto',
                    preventClicks: true,    //滑动误触
                    onClick: this.navBarTap,
                },
                navData: [],
                isFixed: false,
                currentIndex: 0,

                subsetInfo: {color_rule: {}},           // 分会场详情
                subsetList: [],              // 分会场商品列表

                loading: false,
                page: 1,

                isShowLoading: false,
                showBottom: false
            }
        },
        components: {List, wxConfig},
        mounted() {
            this.getMeetingSubset()
            window.addEventListener('scroll', this.handleScroll)
        },
        methods: {
            // 获取二级会场信息
            getMeetingSubset() {
                this.$post('meeting/getChildMeetingInfo', {
                    meeting_child_place_sn: this.$route.query.meeting_place_sn
                })
                    .then(res => {
                        this.subsetInfo = res.meeting_info
                        this.navData = res.cat_list
                        document.title = this.subsetInfo.meeting_place_name
                        this.getMeetingList(1)
                    })
            },
            // 获取二级会场商品列表
            getMeetingList(page) {
                this.isShowLoading = true
                this.$post('meeting/getMeetingGoodsList', {
                    meeting_child_place_id: this.subsetInfo.meeting_place_id,
                    meeting_place_cat_id: this.navData[this.currentIndex].meeting_place_cat_id,
                    relation_resource_id: this.subsetInfo.relation_resource_id,
                    page: page
                })
                    .then(res => {
                        this.isShowLoading = false
                        if (res.goods_item!='') {
                            if (this.page == '1') {
                                this.subsetList = res.goods_item
                            } else {
                                this.subsetList = this.subsetList.concat(res.goods_item)
                            }
                        } else {
                            this.showBottom = true
                        }

                    })
            },
            // getMoreList() {
            //     this.page++;
            //     this.getMeetingList(this.page)
            // },
            loadMore() {
                if (this.showBottom==false) {
                    this.loading = true
                    this.page++;
                    this.getMeetingList(this.page)
                    this.loading = false
                } else {
                    this.showBottom = true
                    return;
                }

            },
            // 切换分类
            navBarTap(swiper) {
                this.currentIndex = swiper.clickedIndex
                this.subsetList = ''
                this.page = 1
                this.showBottom = false
                this.getMeetingList(1)
                this.swiperCenter(swiper);
            },
            swiperCenter(swiper) {
                const swiperWidth = swiper.container[0].clientWidth     // 屏幕宽度
                const maxTranslate = swiper.maxTranslate()      // 可滑动的总宽度（最左边和最右边的总宽）
                const maxWidth = -maxTranslate + swiperWidth / 2

                let slide = swiper.slides[swiper.clickedIndex]
                let slideLeft = slide.offsetLeft
                let slideWidth = slide.clientWidth
                let slideCenter = slideLeft + slideWidth / 2
                swiper.setWrapperTransition(300)
                if (slideCenter < swiperWidth / 2) {
                    swiper.setWrapperTranslate(0)
                } else if (slideCenter > maxWidth) {
                    swiper.setWrapperTranslate(maxTranslate)
                } else {
                    let nowTranslate = slideCenter - swiperWidth / 2
                    swiper.setWrapperTranslate(-nowTranslate)
                }
            },

            handleScroll() {
                this.scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
                if (this.scrollTop > 150) {
                    this.isFixed = true
                } else {
                    this.isFixed = false
                }
            },

            // 分享
            share() {
                wx.ready(() => {
                    // 分享朋友圈
                    wx.onMenuShareTimeline({
                        title: this.subsetInfo.share_title, // 分享标题
                        link: this.subsetInfo.share_path, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: this.subsetInfo.share_img, // 分享图标
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
                        title: this.subsetInfo.share_title, // 分享标题
                        desc: this.subsetInfo.share_desc, // 分享描述
                        link: this.subsetInfo.share_path, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: this.subsetInfo.share_img, // 分享图标
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
    .subsetDiv {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        min-height: 100%;
        /*background-color: #56C8F1;*/
        .bannerDiv {
            width: 100%;
            img {
                width: 100%;
            }
        }
        .mainDiv {
            width: 750px;
            .navList {
                width: 750px;
                /*background-color: #2EB5E8;*/
                display: flex;
                justify-content: space-between;
                align-items: center;
                overflow: scroll;

                .swiper-slide {
                    width: auto !important;
                    margin: 0 30px;
                    font-size: 32px;
                    color: #fff;
                    height: 88px;
                    line-height: 88px;

                }
                .navActive {
                    font-weight: bold;
                    color: #FFDC5B;
                    border-bottom: 4px solid #FFDC5B;
                }
            }
            .fixedNav {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 99;
            }
        }
    }

</style>
