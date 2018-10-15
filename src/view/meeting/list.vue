<template>
    <div class="goodsList">
        <ul v-if="meetingList!=''||meetingList.length>0">

            <!--v-infinite-scroll="loadMore"-->
            <!--infinite-scroll-disabled="loading"-->
            <!--infinite-scroll-distance="100"-->
            <!--infinite-scroll-immediate-check="false"-->
            <!--商品列表-->
            <li v-for="item,index in meetingList" v-if="index<3"
                :style="{backgroundColor:meetingChildLiBg?meetingChildLiBg.list_bg:''}">
                <div class="detailDiv" @click="goDetail(item,index)">
                    <div class="divFl">
                        <img :src="item.goods_img" :alt="item.goods_name">
                    </div>
                    <div class="divFr">
                        <div class="name">{{item.goods_name}}</div>
                        <div class="group">
                            <div class="groupImg" v-if="item.group&&item.group!=''">
                                <img :src="item.photo" :alt="index" v-for="item,index in item.group"
                                     @error="imgError(item,index)">
                            </div>
                            <div class="groupImg defaultImg" v-if="item.group&&item.group==''">
                                <img src="../../imgs/meeting/icon-default-img.png" alt="img">
                            </div>
                            <div class="tipText">
                                {{item.tips}}
                            </div>
                        </div>
                        <div class="progress">
                            <!--<p>-->
                            <!--<vm-progress :percentage="80" :show-text="false" :stroke-width="10"-->
                            <!--stroke-color="#FFDC5B" track-color="#fff"></vm-progress>-->
                            <!--</p>-->
                            <p class="tipText">已售<span>{{item.sales||0}}件</span></p>
                        </div>
                        <div class="money">
                            <div class="moneyFl">
                                <p class="activityMoney">活动价￥<b>{{item.sale_price}}</b></p>
                                <p class="marketMoney">原价￥{{item.prom_price}}</p>
                            </div>
                            <div class="moneFr">
                                <img src="../../imgs/meeting/icon-btn.png" alt="" v-if="item.is_button_status=='1'">
                                <img src="../../imgs/meeting/icon-over-btn.png" alt="" v-else>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <!--分会场菜单-->
            <li class="menuList" v-if="$route.path=='/meeting/index'"
                :style="{backgroundImage:'url('+meetingInfo.nav_bg+')'}">
                <dl>
                    <dd v-for="item,index in meetingChildInfo" v-if="index<3">
                        <router-link
                            :to="`/meeting/subset?meetingIndex=${$route.query.meeting_place_sn}&meeting_place_sn=${item.meeting_place_sn}`">
                            <img :src="item.icon_img" alt="">
                            <button>
                                <span>{{item.meeting_place_name}}</span>
                                <i></i>
                            </button>
                        </router-link>
                    </dd>
                </dl>
            </li>
            <!--商品列表-->
            <li v-for="item,index in meetingList" v-if="3<=index && index<6"
                :style="{backgroundColor:meetingChildLiBg?meetingChildLiBg.list_bg:''}">
                <div class="detailDiv" @click="goDetail(item,index)">
                    <div class="divFl">
                        <img :src="item.goods_img" :alt="item.goods_name">
                    </div>
                    <div class="divFr">
                        <div class="name">{{item.goods_name}}</div>
                        <div class="group">
                            <div class="groupImg" v-if="item.group&&item.group!=''">
                                <img :src="item.photo" :alt="index" v-for="item,index in item.group"
                                     @error="imgError(item,index)">
                            </div>
                            <div class="groupImg defaultImg" v-if="item.group&&item.group==''">
                                <img src="../../imgs/meeting/icon-default-img.png" alt="img">
                            </div>
                            <div class="tipText">
                                {{item.tips}}
                            </div>
                        </div>
                        <div class="progress">
                            <!--<p>-->
                            <!--<vm-progress :percentage="80" :show-text="false" :stroke-width="10"-->
                            <!--stroke-color="#FFDC5B" track-color="#fff"></vm-progress>-->
                            <!--</p>-->
                            <p class="tipText">已售<span>{{item.sales||0}}件</span></p>
                        </div>
                        <div class="money">
                            <div class="moneyFl">
                                <p class="activityMoney">活动价￥<b>{{item.sale_price}}</b></p>
                                <p class="marketMoney">原价￥{{item.prom_price}}</p>
                            </div>
                            <div class="moneFr">
                                <img src="../../imgs/meeting/icon-btn.png" alt="" v-if="item.is_button_status=='1'">
                                <img src="../../imgs/meeting/icon-over-btn.png" alt="" v-else>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <!--分会场菜单-->
            <li class="menuList" v-if="$route.path=='/meeting/index'"
                :style="{backgroundImage:'url('+meetingInfo.nav_bg+')'}">
                <dl>
                    <dd v-for="item,index in meetingChildInfo" v-if="3<=index && index<6">
                        <router-link
                            :to="`/meeting/subset?meetingIndex=${$route.query.meeting_place_sn}&meeting_place_sn=${item.meeting_place_sn}`">
                            <img :src="item.icon_img" alt="">
                            <button>
                                <span>{{item.meeting_place_name}}</span>
                                <i></i>
                            </button>
                        </router-link>
                    </dd>
                </dl>
            </li>
            <!--商品列表-->
            <li v-for="item,index in meetingList" v-if="6<=index"
                :style="{backgroundColor:meetingChildLiBg?meetingChildLiBg.list_bg:''}">
                <div class="detailDiv" @click="goDetail(item,index)">
                    <div class="divFl">
                        <img :src="item.goods_img" :alt="item.goods_name">
                    </div>
                    <div class="divFr">
                        <div class="name">{{item.goods_name}}</div>
                        <div class="group">
                            <div class="groupImg" v-if="item.group&&item.group!=''">
                                <img :src="item.photo" :alt="index" v-for="item,index in item.group"
                                     @error="imgError(item,index)">
                            </div>
                            <div class="groupImg defaultImg" v-if="item.group&&item.group==''">
                                <img src="../../imgs/meeting/icon-default-img.png" alt="img">
                            </div>
                            <div class="tipText">
                                {{item.tips}}
                            </div>
                        </div>
                        <div class="progress">
                            <!--<p>-->
                            <!--<vm-progress :percentage="80" :show-text="false" :stroke-width="10"-->
                            <!--stroke-color="#FFDC5B" track-color="#fff"></vm-progress>-->
                            <!--</p>-->
                            <p class="tipText">已售<span>{{item.sales||0}}件</span></p>
                        </div>
                        <div class="money">
                            <div class="moneyFl">
                                <p class="activityMoney">活动价￥<b>{{item.sale_price}}</b></p>
                                <p class="marketMoney">原价￥{{item.prom_price}}</p>
                            </div>
                            <div class="moneFr">
                                <img src="../../imgs/meeting/icon-btn.png" alt="" v-if="item.is_button_status=='1'">
                                <img src="../../imgs/meeting/icon-over-btn.png" alt="" v-else>
                            </div>
                        </div>
                    </div>
                </div>
            </li>

        </ul>
        <ul class="noListDiv" v-else>
            <li v-for="item,index in 4">
                <img src="../../imgs/base/icon-like.png" alt="">
            </li>
        </ul>
        <div class="iconMeeting" v-if="$route.path!='/meeting/index'">
            <i @click="goMeeting"></i>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['dataList', 'childInfo', 'meetingIndexInfo', 'childInfoListBg'],
        name: "list",
        data() {
            return {
                loading: false
            }
        },
        mounted() {

        },
        computed: {
            meetingList() {
                return this.dataList
            },
            meetingChildInfo() {
                return this.childInfo
            },
            meetingInfo() {
                return this.meetingIndexInfo
            },
            meetingChildLiBg() {
                return this.childInfoListBg
            }
        },
        methods: {
            goMeeting() {
                this.$router.push({
                    path: '/meeting/index',
                    query: {
                        meeting_place_sn: this.$route.query.meetingIndex
                    }
                })
            },

            // loadMore() {
            //     this.loading = true
            //     this.$emit('listenParentEvent', true)
            //     this.loading = false
            // },

            // 去商品详情
            goDetail(val, index) {
                if (this.$getCookie('terminal') == 'i') {
                    window.showGoodsDetails(val.goods_id)
                    // window.closeWeb();          // 跳转完成后关闭web
                } else if (this.$getCookie('terminal') == 'a') {
                    window.webview.showGoodsDetails(val.goods_id)
                    // window.webview.closeWeb();          // 跳转完成后关闭web
                } else {
                    this.$router.push({
                        path: '/detail/index',
                        query: {
                            goods_id: val.goods_id
                        }
                    })
                }
            },
            imgError(val, index) {
                // this.meetingList[index].group[0].photo = 'https://cdn2.pinquduo.cn/Public/upload/logo/logo.jpg'
            }
        }
    }
</script>

<style scoped lang="scss">
    .goodsList {
        ul {
            width: 750px;
            overflow: hidden;
            li {
                padding: 10px;
                margin: 20px 0;
                &:nth-child(1) {
                    margin-top: 8px;
                }
                .detailDiv {
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    .divFl {
                        img {
                            width: 300px;
                            height: 300px;
                            -webkit-border-radius: 8px;
                            -moz-border-radius: 8px;
                            border-radius: 8px;
                        }
                    }
                    .divFr {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: flex-start;
                        align-self: flex-start;
                        > div {
                            width: 100%;
                            line-height: 40px;
                            text-align: left;
                        }
                        .name {
                            margin-top: 10px;
                            width: 100%;
                            max-height: 80px;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            color: #fff;
                            font-size: 28px;
                        }
                        .group {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            margin-top: 12px;
                            min-height: 60px;
                            .groupImg {
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                img {
                                    display: block;
                                    width: 60px;
                                    height: 60px;
                                    -webkit-border-radius: 50%;
                                    -moz-border-radius: 50%;
                                    border-radius: 50%;
                                    border: 4px solid #FFDC5B;
                                    margin-right: -12px;
                                }
                            }
                            .defaultImg {
                                img {
                                    border: none;
                                }
                            }
                            .tipText {
                                max-width: 320px;
                                overflow: hidden;
                                -ms-text-overflow: ellipsis;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                margin-left: 32px;
                                color: #B1DCFF;
                                opacity: .5;
                            }
                        }
                        .progress {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            margin-top: 20px;
                            min-height: 40px;
                            p {
                                flex: 1;
                                font-size: 24px;
                            }
                            .tipText {
                                color: #fff;
                                span {
                                    color: #FFDC5B;
                                }
                            }
                        }
                        .money {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-top: 10px;
                            .moneyFl {
                                p {
                                    font-size: 24px;
                                    line-height: 30px;
                                }
                                .activityMoney {
                                    color: #FFDC5B;
                                    b {
                                        font-size: 46px;
                                    }
                                }
                                .marketMoney {
                                    text-decoration: line-through;
                                    color: #B1DCFF;
                                }
                            }
                            .moneFr {
                                img {
                                    width: 150px;
                                }
                            }
                        }
                    }
                }
            }
            .menuList {
                display: flex;
                align-items: center;
                height: 380px;
                background-color: transparent;
                background-position: center;
                background-repeat: no-repeat;
                background-size: 100%;
                dl {
                    width: 100%;
                    /*overflow: scroll;*/
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    dd {
                        a {
                            img {
                                width: 210px;
                                height: 210px;
                                background: url("../../imgs/meeting/icon-menu-list.png") no-repeat center /100%;
                                -webkit-border-radius: 20px;
                                -moz-border-radius: 20px;
                                border-radius: 20px;
                                box-shadow: 4px 0 10px #00689E, -4px 0 10px #00689E, 0 4px 10px #00689E, 0 -4px 10px #00689E;
                            }
                            button {
                                width: 180px;
                                height: 50px;
                                -webkit-border-radius: 50px;
                                -moz-border-radius: 50px;
                                border-radius: 50px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                background-color: #FF6C6B;
                                margin: 20px auto 0;
                                span {
                                    max-width: 140px;
                                    overflow: hidden;
                                    -ms-text-overflow: ellipsis;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    line-height: 50px;
                                    font-size: 28px;
                                }
                                i {
                                    margin-left: 10px;
                                    width: 16px;
                                    height: 24px;
                                    background: url("../../imgs/meeting/icon-arrow.png") no-repeat center /100%;
                                }
                            }
                        }
                    }
                }
            }
        }
        .noListDiv {
            li {
                margin-top: 20px;
                img {
                    width: 100%;
                    opacity: .4;
                }
            }
        }
        .iconMeeting {
            position: fixed;
            right: 0px;
            bottom: 150px;
            width: 50px;
            height: 136px;
            i {
                display: block;
                width: inherit;
                height: inherit;
                background: url("../../imgs/meeting/icon-go-meeting.png") no-repeat center /100%;
            }
        }
    }
</style>
