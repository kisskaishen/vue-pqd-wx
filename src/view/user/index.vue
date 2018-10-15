<template>
    <div class="user">
        <div class="container">
            <div class="top">
                <div class="setting">
                    <router-link to="setting">
                        <i></i>
                    </router-link>
                </div>
                <div class="topInfo">
                    <div class="divFl">
                        <img :src="head_pic" alt="" v-if="head_pic">
                        <img src="../../images/ts_p1.jpg" alt="" v-else>
                    </div>
                    <div class="divFr">
                        <p v-if="nickname">{{nickname}}</p>
                        <p @click="toLogin" v-else>请登录/注册</p>
                    </div>
                </div>
                <div class="topMenu">
                    <ul>
                        <li v-for="item,index in topList">
                            <router-link :to="item.url">
                                <i></i>
                                <span>{{item.name}}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="center">
                <div class="centerTop">
                    <b><i></i>全部订单</b>
                    <router-link to="order">
                        <span>查看全部订单</span>
                        <i></i>
                    </router-link>
                </div>
                <div class="centerMenu horiMenu">
                    <ul>
                        <li v-for="item,index in centerList">
                            <router-link :to="'order?type='+item.type">
                                <mt-badge type="error" v-if="index == '2' && numObj.pending_delivery_count!='0'">
                                    {{numObj.pending_delivery_count}}
                                </mt-badge>
                                <mt-badge type="error" v-if="index == '1' && numObj.order_share_count!='0'">
                                    {{numObj.order_share_count}}
                                </mt-badge>
                                <mt-badge type="error" v-if="index == '0' && numObj.pay_count!='0'">
                                    {{numObj.pay_count}}
                                </mt-badge>
                                <mt-badge type="error" v-if="index == '4' && numObj.order_comment_count!='0'">
                                    {{numObj.order_comment_count}}
                                </mt-badge>
                                <mt-badge type="error" v-if="index == '3' && numObj.goods_received_count!='0'">
                                    {{numObj.goods_received_count}}
                                </mt-badge>
                                <i></i>
                                <span>{{item.name}}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="bottom">
                <div class="bottomMenu">
                    <ul>
                        <li v-for="item,index in bottomList">
                            <router-link :to="item.url">
                                <div class="divFl">
                                    <i></i>
                                    <span>{{item.name}}</span>
                                </div>
                                <div class="divFr">
                                    <i></i>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="bottomGoods">
                    <div class="tip">
                        <b><i></i>看了又看</b>
                    </div>
                    <ul v-infinite-scroll="loadMore"
                        infinite-scroll-disabled="loading"
                        infinite-scroll-distance="100">
                        <li v-for="item,index in goodsList">
                            <router-link :to="'/detail/index?goods_id='+item.goods_id">
                                <img :src="item.list_img" :alt="item.goods_name">
                                <b>{{item.goods_name}}</b>
                                <p>
                                    <b class="red">￥{{item.prom_price}}</b>
                                    <label>已拼<span>{{item.sales}}件</span></label>
                                </p>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
    import Tabbar from '../../components/footer'
    import {Toast} from 'mint-ui';

    export default {
        name: "index",
        data() {
            return {
                head_pic: '',
                nickname: '',
                list: [],
                loading: false,
                topList: [
                    {
                        url: 'myCoupon',
                        name: '我的优惠券'
                    },
                    {
                        url: 'myCollection',
                        name: '我的收藏'
                    },
                    {
                        url: 'myFootmark',
                        name: '我的足迹'
                    },
                    {
                        url: 'order?type=5',
                        name: '退款/售后'
                    }
                ],
                centerList: [
                    {
                        type: '3',
                        name: '待付款'
                    },
                    {
                        type: '6',
                        name: '待分享'
                    },
                    {
                        type: '1',
                        name: '待发货'
                    },
                    {
                        type: '2',
                        name: '待收货'
                    },
                    {
                        type: '7',
                        name: '待评价'
                    },
                ],
                bottomList: [
                    {
                        url: '/activity/like?currentIndex=2',
                        name: '我的助力'
                    },
                    {
                        url: '/address/index?from=user',
                        name: '收货地址'
                    },
                    {
                        url: 'help',
                        name: '常见问题'
                    }
                ],
                numObj: {userdetails: {}},
                goodsList:[],
                page:1,
                loading:false
            }
        },
        components: {Tabbar},
        mounted() {
            this.getUserInfo()
            this.getNum()
            this.getList(1)
        },
        methods: {
            getUserInfo() {
                this.head_pic = this.$getCookie('head_pic')
                this.nickname = decodeURI(this.$getCookie('nickname')) || this.$getCookie('user_tel') || '拼趣多用户'
            },
            // 获取小红点数字
            getNum() {
                this.$post('user/getOrderCount', {
                    token: this.$getCookie('token')
                })
                    .then(res => {
                        this.numObj = res
                    })
            },
            loadMore() {
                this.loading = true
                this.page++;
                this.getList(this.page)
                this.loading = false
            },
            // 获取商品列表
            getList(page) {
                this.$post('search/search',{
                    page:page
                })
                    .then(res=>{
                        if (res.total=='0'||res.total_page=='0') {
                            Toast({
                                message:'暂无更多数据~',
                                duration:1000
                            })
                        } else {
                            if (page=='1') {
                                this.goodsList = res.list
                            } else if (page>'1'&&res.list!=''){
                                this.goodsList = this.goodsList.concat(res.list)
                            } else {
                                Toast({
                                    message:'下拉后暂无更多数据~',
                                    duration:1000
                                })
                            }
                        }
                    })
            },
            // 跳转登录页面
            toLogin() {
                // this.$router.push('/login')
            },
        }
    }
</script>

<style scoped lang="scss">
    .container {
        padding-bottom: 40px;
        > div {
            padding: 0 26px;
        }
        .top {
            position: relative;
            .setting {
                display: flex;
                justify-content: flex-end;
                padding-top: 20px;
                i {
                    width: 60px;
                    height: 60px;
                    background: url("../../imgs/user/icon-setting.png") no-repeat center /100%;
                }
            }
            .topInfo {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                align-content: center;
                img {
                    display: block;
                    width: 150px;
                    height: 150px;
                    margin: 0;

                    border: 4px solid #fff;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                }
                p {
                    color: #fff;
                    margin-left: 32px;
                    font-size: 40px;
                    font-weight: bold;
                    color: #333;
                }
            }
            .topMenu {
                padding: 64px 0 40px;
                border-bottom: 1px solid #eee;
                ul {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    li {
                        a {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            i {

                            }
                            span {
                                display: block;
                                font-size: 24px;
                                color: #333;
                                margin-top: 20px;
                            }
                        }

                        &:nth-child(1) {
                            i {
                                background: url("../../imgs/user/icon-coupon.png") no-repeat center /100%;

                            }
                        }
                        &:nth-child(2) {
                            i {
                                background: url("../../imgs/user/icon-collection.png") no-repeat center /100%;

                            }
                        }
                        &:nth-child(3) {
                            border: none;
                            i {
                                background: url("../../imgs/user/icon-footmark.png") no-repeat center /100%;

                            }
                        }
                        &:nth-child(4) {
                            i {
                                background: url("../../imgs/user/icon-service.png") no-repeat center /100%;

                            }
                        }
                    }
                }
            }
        }
        .center {
            background-color: #fff;
            margin-top: 40px;
            .centerTop {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 30px;
                b {
                    display: flex;
                    align-items: center;
                    color: #333;
                    i {
                        width: 4px;
                        height: 16px;
                        background: rgba(255, 70, 78, 1);
                        border-radius: 2px;
                        margin-right: 16px;
                    }
                }
                a {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    span {
                        font-size: 24px;
                        color: #999;
                        margin-right: 10px;
                    }
                    i {
                        width: 10px;
                        height: 18px;
                        background: url("../../imgs/user/icon-arrow-right.png") no-repeat center /100%;
                    }
                }
            }
            .centerMenu {
                border-bottom: 1px solid #eee;
                ul {
                    li {
                        a {
                            position: relative;
                            i {
                                width: 60px;
                                height: 60px;
                            }
                            .mint-badge {
                                position: absolute;
                                top: -10px;
                                right: 20px;
                                width: 36px;
                                height: 36px;
                                text-align: center;
                                font-size: 20px;
                                padding: 0;
                                margin: 0;
                                line-height: 32px;
                                -webkit-border-radius: 50%;
                                -moz-border-radius: 50%;
                                border-radius: 50%;
                            }
                        }
                        &:nth-child(1) {
                            i {
                                background: url("../../imgs/user/icon-wait-money.png") no-repeat center bottom /100% 100%;

                            }
                        }
                        &:nth-child(2) {
                            i {
                                background: url("../../imgs/user/icon-share.png") no-repeat center bottom /100% 100%;

                            }
                        }
                        &:nth-child(3) {
                            i {
                                background: url("../../imgs/user/icon-wait-delivery.png") no-repeat center bottom /100% 100%;

                            }
                        }
                        &:nth-child(4) {
                            i {
                                background: url("../../imgs/user/icon-revice-delivery.png") no-repeat center bottom /100% 100%;

                            }
                        }
                        &:nth-child(5) {
                            i {
                                background: url("../../imgs/user/icon-eval.png") no-repeat center bottom /100% 100%;

                            }
                        }
                    }
                }
            }
        }
        .bottom {
            .bottomMenu {
                margin: 20px 0 60px;
                background-color: #fff;
                ul {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    li {
                        width: 100%;
                        padding: 30px 0;
                        border-bottom: 1px solid #eee;
                        a {
                            position: relative;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            width: 100%;
                            font-size: 30px;
                            color: #333;
                            .divFl {
                                i {
                                    width: 44px;
                                    height: 44px;
                                }
                                span {
                                    margin-left: 16px;
                                    width: auto;
                                }
                            }
                            .divFr {
                                i {
                                    width: 10px;
                                    height: 18px;
                                    background: url("../../imgs/user/icon-arrow-right.png") no-repeat center /100%;
                                }
                            }

                        }
                        &:nth-child(1) {
                            i {
                                background: url("../../imgs/user/icon-like.png") no-repeat center bottom /100% 100%;
                            }
                        }
                        &:nth-child(2) {
                            i {
                                background: url("../../imgs/user/icon-address.png") no-repeat center bottom /100% 100%;
                            }
                        }
                        &:nth-child(3) {
                            margin: 0;
                            i {
                                background: url("../../imgs/user/icon-help.png") no-repeat center bottom /100% 100%;

                            }
                        }
                    }
                }
            }
            .bottomGoods {
                .tip {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 30px;
                    b {
                        display: flex;
                        align-items: center;
                        color: #333;
                        i {
                            width: 4px;
                            height: 16px;
                            background: rgba(255, 70, 78, 1);
                            border-radius: 2px;
                            margin-right: 16px;
                        }
                    }
                }
                ul {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    margin-top: 40px;
                    li {
                        margin-bottom: 54px;
                        a {
                            display: block;
                            text-align: left;
                            width: 336px;
                            img {
                                width: 336px;
                                height: 336px;
                                -webkit-border-radius: 8px;
                                -moz-border-radius: 8px;
                                border-radius: 8px;
                            }
                            &>b {
                                display: block;
                                width: 100%;
                                font-size: 30px;
                                line-height: 40px;
                                max-height: 80px;
                                overflow: hidden;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                color: #333;
                                margin: 16px 0 24px;
                            }
                            p {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                b {
                                    font-size: 32px;
                                }
                                label {
                                    font-size: 24px;
                                    color: #999;
                                    span {
                                        color: #333;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            & > p {
                margin-top: 60px;
                color: #888;
                text-align: center;
            }
        }
        .horiMenu {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            ul {
                width: 100%;
                display: flex;
                li {
                    flex: 1;
                    margin: 30px 0;
                    a {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        color: #666;
                        font-size: 24px;
                        i {
                            width: 54px;
                            height: 54px;
                        }
                        span {
                            font-size: 26px;
                            margin-top: 10px;
                        }
                        .mint-badge {
                            padding: 4px !important;
                        }
                    }

                }
            }
        }
    }
</style>
