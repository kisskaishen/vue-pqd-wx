<template>
    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="100">
        <index-banner :banner="bannerData"></index-banner>
        <menu-list :info="menuData" :meeting="meetingData"></menu-list>
        <!--活动入口-->
        <div class="enter" v-if="isShowMeeting">
            <a :href="meetingData.open_url">
                <img :src="meetingData.ad_img" alt="活动入口">
            </a>
        </div>
        <!--活动弹框-->
        <div class="dialogDiv" v-if="isShowDialog">
            <a :href="meetingDialog.open_url">
                <img :src="meetingDialog.ad_img" alt="">
                <!--<b>{{countNum}}</b>-->
            </a>
            <i @click="closeDialog"></i>
        </div>
        <!--首页商品列表-->
        <goods-list :list="listData" @listenGoodsList="refreshList"></goods-list>

        <div class="bottomLoadingDiv" v-if="isShowLoading">
            <img src="../../imgs/base/icon-loading.gif" alt="">
            <p>加载中...</p>
        </div>
        <div class="bottomTextTip" v-if="isNoData">----------已经拉到底了----------</div>
    </div>
</template>

<script>
    import IndexBanner from './banner'
    import MenuList from '../menuList.vue'
    import GoodsList from './goodsList.vue'

    export default {
        data() {
            return {
                bannerData: [],          // 首页banner
                menuData: [],            // 菜单列表
                meetingData: {},             // 会场入口信息
                meetingDialog: {},           // 弹窗主会场信息
                listData: [],            // 首页商品列表
                page: 1,
                loading: false,
                enterInfo: {homeBanner: {}},
                isShowLoading: false,
                isNoData: false,

                isShowMeeting: false,            // 是否显示会场入口
                isShowDialog: false,            // 是否显示会场弹框
                countNum: 0,
                currentTime: 0,                  // 当前时间戳，用于判断是否显示活动入口的条件之一
            }
        },
        components: {IndexBanner, MenuList, GoodsList},
        mounted() {
            // this.getInfo(1)
            this.currentTime = Math.round(new Date().getTime() / 1000)
            this.getIndex()
            this.getList(1)
        },
        methods: {
            // 获取menu和banner图
            getIndex() {
                this.$post('index/getIndex', {})
                    .then((res) => {

                        this.bannerData = res.ad_list
                        this.menuData = res.column_list
                        this.meetingData = res.middle_ad_list[0]
                        this.meetingDialog = res.scene
                        if (this.meetingData != '' && this.meetingData.end_time > this.currentTime && this.currentTime > this.meetingData.start_time) {
                            // if (this.meetingData != '') {
                            this.isShowMeeting = true
                        }
                        if (this.meetingDialog != '' && this.meetingDialog.end_time > this.currentTime && this.currentTime > this.meetingDialog.start_time && this.$session.get('hadShow') != true) {
                            // if (this.meetingDialog != '') {
                            this.countNum = res.scene.second
                            this.isShowDialog = true
                            this.$session.set('hadShow', true)
                            let time = setInterval(() => {
                                if (this.countNum > 0) {
                                    this.countNum--;
                                } else {
                                    clearInterval(time)
                                    this.isShowDialog = false
                                }
                            }, 1000)
                        }
                    })
            },
            // 手动关闭弹框
            closeDialog() {
                this.isShowDialog = false
            },
            // 商品列表
            getList(page) {
                this.$post('search/index', {
                    is_coupon:'1',
                    page: page,
                })
                    .then((res) => {
                        if (page == '1') {
                            this.listData = res.list
                        } else {
                            this.listData = this.listData.concat(res.list)
                            this.isNoData = true
                        }
                    })
            },

            // 重新加载商品（优惠券）列表
            refreshList() {
                this.getList(this.page)
            },
            // 加载更多
            loadMore() {
                this.loading = true
                this.page++
                this.isShowLoading = true
                this.getList(this.page)
                this.loading = false
            }

        }
    }
</script>
<style scoped lang="scss">
    .enter {
        /*display: block;*/
        width: 100%;
        border-top: 16px solid #F5F5F5;
        border-bottom: 16px solid #F5F5F5;
        a {
            width: inherit;
            img {
                width: 100%;
                height: 230px;
            }
        }
    }

    .dialogDiv {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background: rgba(0, 0, 0, .4);
        z-index: 99;
        a {
            display: block;
            width: 578px;
            height: 780px;
            margin: 140px auto 0;
            img {
                width: 578px;
                height: 780px;
                border-radius: 40px;
            }
            b {
                position: absolute;
                right: 20px;
                top: 20px;
                z-index: 999;
                font-size: 40px;
                color: #fff;
            }
        }
        i {
            display: block;
            margin: 100px auto 0;
            width: 70px;
            height: 70px;
            background: url("../../imgs/meeting/icon-close.png") no-repeat center /100%;
            z-index: 999;
        }

    }

</style>
