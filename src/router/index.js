import Vue from 'vue'
import Router from 'vue-router'
import {getCookie} from "../config/util";
import autoLogin from '../config/autoLogin'

const IndexIndex = r => require.ensure([], () => r(require('@/view/index/index')), 'IndexIndex')
const IndexCoupon = r => require.ensure([], () => r(require('@/view/index/coupon')), 'IndexCoupon')

const DetailIndex = r => require.ensure([], () => r(require('@/view/detail/index')), 'DetailIndex')
const DetailFlow = r => require.ensure([], () => r(require('@/view/detail/flow')), 'DetailFlow')
const DetailReview = r => require.ensure([], () => r(require('@/view/detail/review')), 'DetailReview')

const ChatIndex = r => require.ensure([], () => r(require('@/view/chat/index')), 'ChatIndex')
const StoreIndex = r => require.ensure([], () => r(require('@/view/store/index')), 'StoreIndex')
const StoreGroupList = r => require.ensure([], () => r(require('@/view/store/groupList')), 'StoreGroupList')

const ListIndex = r => require.ensure([], () => r(require('@/view/list/index')), 'ListIndex')
const ListFromExlore = r => require.ensure([], () => r(require('@/view/list/fromExplore')), 'ListFromExlore')
const ListJiuList = r => require.ensure([], () => r(require('@/view/list/jiuList')), 'ListJiuList')

const PayIndex = r => require.ensure([], () => r(require('@/view/pay/index')), 'PayIndex')
const PayWxWebPay = r => require.ensure([], () => r(require('@/view/pay/wxWebPay')), 'PayWxWebPay')
const PayCoupon = r => require.ensure([], () => r(require('@/view/pay/coupon')), 'PayCoupon')
const PaySuccess = r => require.ensure([], () => r(require('@/view/pay/paySuccess')), 'PaySuccess')

const AddressIndex = r => require.ensure([], () => r(require('@/view/address/index')), 'AddressIndex')
const AddAddress = r => require.ensure([], () => r(require('@/view/address/addAddress')), 'AddAddress')

const RankingIndex = r => require.ensure([], () => r(require('@/view/ranking/index')), 'RankingIndex')

const FruitIndex = r => require.ensure([], () => r(require('@/view/fruit/index')), 'FruitIndex')

const ExploreIndex = r => require.ensure([], () => r(require('@/view/explore/index')), 'ExploreIndex')
const ExploreSearch = r => require.ensure([], () => r(require('@/view/explore/search')), 'ExploreSearch')
const ExploreSquredList = r => require.ensure([], () => r(require('@/view/explore/exploreSquredList')), 'ExploreSquredList')

const CouponIndex = r => require.ensure([], () => r(require('@/view/coupon/index')), 'CouponIndex')
const CouponGetShareCoupon = r => require.ensure([], () => r(require('@/view/coupon/getShareCoupon')), 'CouponGetShareCoupon')
const CouponTest = r => require.ensure([], () => r(require('@/view/coupon/test')), 'CouponTest')

const PromCoupon = r => require.ensure([], () => r(require('@/view/prom/Coupon')), 'PromCoupon')

const HaitaoIndex = r => require.ensure([], () => r(require('@/view/haitao/index')), 'HaitaoIndex')
const HaitaoList = r => require.ensure([], () => r(require('@/view/haitao/list')), 'HaitaoList')
const HaitaoAreaList = r => require.ensure([], () => r(require('@/view/haitao/arealist')), 'HaitaoAreaList')


const UserIndex = r => require.ensure([], () => r(require('@/view/user/index')), 'UserIndex')
const UserOrder = r => require.ensure([], () => r(require('@/view/user/order')), 'UserOrder')
const UserMyMsg = r => require.ensure([], () => r(require('@/view/user/myMsg')), 'UserMyMsg')
const UserMyCoupon = r => require.ensure([], () => r(require('@/view/user/myCoupon')), 'UserMyCoupon')
const UserMyFree = r => require.ensure([], () => r(require('@/view/user/myFree')), 'UserMyFree')
const UserMyProm = r => require.ensure([], () => r(require('@/view/user/myProm')), 'UserMyProm')
const UserMyLike = r => require.ensure([], () => r(require('@/view/user/myLike')), 'UserMyLike')
const UserMyCollection = r => require.ensure([], () => r(require('@/view/user/myCollection')), 'UserMyCollection')
const UserMyAddress = r => require.ensure([], () => r(require('@/view/user/myAddress')), 'UserMyAddress')
const UserMyFootmark = r => require.ensure([], () => r(require('@/view/user/myFootmark')), 'UserMyFootmark')
const UserHelp = r => require.ensure([], () => r(require('@/view/user/help')), 'UserHelp')
const UserSetting = r => require.ensure([], () => r(require('@/view/user/setting')), 'UserSetting')
const UserFeedback = r => require.ensure([], () => r(require('@/view/user/feedback')), 'UserFeedback')
const UserFeedbackSubmit = r => require.ensure([], () => r(require('@/view/user/feedbackSubmit')), 'UserFeedbackSubmit')


const OrderDetail = r => require.ensure([], () => r(require('@/view/order/detail')), 'OrderDetail')
const GroupDetail = r => require.ensure([], () => r(require('@/view/group/detail')), 'GroupDetail')
const OrderLogistics = r => require.ensure([], () => r(require('@/view/order/logistics')), 'OrderLogistics')
const OrderReview = r => require.ensure([], () => r(require('@/view/order/review')), 'OrderReview')
const OrderReviewSuccess = r => require.ensure([], () => r(require('@/view/order/reviewSuccess')), 'OrderReviewSuccess')
const OrderReviewSuccessCoupon = r => require.ensure([], () => r(require('@/view/order/reviewSuccessCoupon')), 'OrderReviewSuccessCoupon')

const ApplyAfterService = r => require.ensure([], () => r(require('@/view/service/applyAfterService')), 'ApplyAfterService')
const RefundDetail = r => require.ensure([], () => r(require('@/view/service/refundDetail')), 'RefundDetail')
const TalkHistory = r => require.ensure([], () => r(require('@/view/service/talkHistory')), 'TalkHistory')
const BuyerDelivery = r => require.ensure([], () => r(require('@/view/service/buyerDelivery')), 'BuyerDelivery')
const SeeLogistics = r => require.ensure([], () => r(require('@/view/service/seeLogistics')), 'SeeLogistics')
const MoneyDirection = r => require.ensure([], () => r(require('@/view/service/moneyDirection')), 'MoneyDirection')
const ApplyPlatform = r => require.ensure([], () => r(require('@/view/service/applyPlatform')), 'ApplyPlatform')
// 11

// 活动专区
const ActivityWuyi = r => require.ensure([], () => r(require('@/view/activity/wuyi')), 'ActivityWuyi')
const ActivityWuyiRules = r => require.ensure([], () => r(require('@/view/activity/rules')), 'ActivityWuyiRules')
const ActivityWuyiMoreList = r => require.ensure([], () => r(require('@/view/activity/moreList')), 'ActivityWuyiMoreList')

const ActivityLike = r => require.ensure([], () => r(require('@/view/activity/like')), 'ActivityLike')
const ActivityLikeDetail = r => require.ensure([], () => r(require('@/view/activity/likeDetail')), 'ActivityLikeDetail')
const ActivityLikeRules = r => require.ensure([], () => r(require('@/view/activity/likeRules')), 'ActivityLikeRules')
const ActivityGetNewCoupon = r => require.ensure([], () => r(require('@/view/activity/getNewCoupon')), 'ActivityGetNewCoupon')

//趣多替你送
const ActivityGift = r => require.ensure([], () => r(require('@/view/activity/gift')), 'ActivityGift')
const ActivityGiftDetail = r => require.ensure([], () => r(require('@/view/activity/giftDetail')), 'ActivityGiftDetail')
const ActivityGiftGoods = r => require.ensure([], () => r(require('@/view/activity/giftGoods')), 'ActivityGiftGoods')
const ActivityGiftRule = r => require.ensure([], () => r(require('@/view/activity/giftRule')), 'ActivityGiftRule')

//为我砍价
const cutPrice = r => require.ensure([], () => r(require('@/view/activity/cut_price')), 'cutPrice')
const cutPriceDetail = r => require.ensure([], () => r(require('@/view/activity/cut_price_detail')), 'cutPriceDetail')
const cutPriceGoodsDetail = r => require.ensure([], () => r(require('@/view/activity/cut_price_goods_detail')), 'cutPriceGoodsDetail')
const cutPriceRules = r => require.ensure([], () => r(require('@/view/activity/cut_price_rules')), 'cutPriceRules')
const cutPricePay = r => require.ensure([], () => r(require('@/view/activity/cut_price_pay')), 'cutPricePay')

// 会场专区
const MeetingIndex = r => require.ensure([], () => r(require('@/view/meeting/index')), 'MeetingIndex')
const MeetingSubset = r => require.ensure([], () => r(require('@/view/meeting/subset')), 'MeetingSubset')


// 登录
const LoginIndex = r => require.ensure([], () => r(require('@/view/login/index')), 'LoginIndex')
const LoginProtocol = r => require.ensure([], () => r(require('@/view/login/protocol')), 'LoginProtocol')


// 错误提示
const ErrorDetail = r => require.ensure([], () => r(require('@/view/error/errorDetail')), 'ErrorDetail')
const Error404 = r => require.ensure([], () => r(require('@/view/error/error404')), 'Error404')
const ErrorNoWifi = r => require.ensure([], () => r(require('@/view/error/errorNoWifi')), 'ErrorNoWifi')
const ErrorNoDns = r => require.ensure([], () => r(require('@/view/error/errorNoDns')), 'ErrorNoDns')

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        // 首页
        {
            path: '/',
            redirect: '/index',
            component: IndexIndex,
            children: [
                {
                    path: '/index',
                    component: IndexIndex,
                    meta: {
                        title: '拼趣多商城',
                        login: false
                    }
                }
            ],
            meta: {
                title: '拼趣多商城',
                login: false
            }
        },
        // 首页优惠券中心
        {
            path: '/index/coupon',
            component: IndexCoupon,
            meta: {
                title: '优惠券中心',
                login: true
            }
        },
        // 商品详情页
        {
            path: '/detail',
            component: DetailIndex,
            children: [
                {
                    path: '/detail/index',
                    component: DetailIndex,
                    meta: {
                        title: '商品详情',
                        login: false
                    },
                    // beforeEnter: (to, from, next) => {
                    //     if (navigator.userAgent.toLowerCase().indexOf('iphone') !== -1 && to.path !== location.pathname) {
                    //         location.assign(to.fullPath)
                    //         next()
                    //     } else {
                    //         next()
                    //     }
                    // }
                }
            ],
            meta: {
                title: '商品详情',
                login: false
            }
        },

        // 商品详情页--拼团流程
        {
            path: '/detail/flow',
            component: DetailFlow,
            meta: {
                title: '拼团流程',
                login: false
            }
        },

        // 商品详情页--评价列表
        {
            path: '/detail/review',
            component: DetailReview,
            meta: {
                title: '评价列表',
                login: false
            }
        },


        // 环信聊天室
        {
            path: '/chat',
            component: ChatIndex,
            children: [
                {
                    path: '/chat/index',
                    component: ChatIndex,
                    meta: {
                        title: '',
                        login: true
                    }
                }
            ],
            meta: {
                title: '',
                login: true
            }
        },
        // 商家页面
        {
            path: '/store',
            component: StoreIndex,
            children: [
                {
                    path: '/store/index',
                    component: StoreIndex,
                    meta: {
                        title: '商家详情',
                        login: false
                    }
                }
            ],
            meta: {
                title: '商家详情',
                login: false
            }
        },
        {
            path: '/store/groupList',
            component: StoreGroupList,
            meta: {
                title: '大家都在拼',
                login: false
            }
        },

        // 海淘专区
        {
            path: '/haitao',
            component: HaitaoIndex,
            children: [
                {
                    path: '/haitao/index',
                    component: HaitaoIndex,
                    meta: {
                        title: '海淘专区',
                        login: false
                    }
                }
            ],
            meta: {
                title: '海淘专区',
                login: false
            }
        },
        // 海淘专区列表
        {
            path: '/haitao/list',
            component: HaitaoList,
            meta: {
                title: '海淘专区列表',
                login: false
            }
        },
        // 海淘专区地区馆
        {
            path: '/haitao/areaList',
            component: HaitaoAreaList,
            meta: {
                title: '海淘专区地区馆',
                login: false
            }
        },
        // list页面
        {
            path: '/list',
            component: ListIndex,
            children: [
                {
                    path: '/list/index',
                    component: ListIndex,
                    meta: {
                        title: '商品列表',
                        login: false
                    }
                }
            ],
            meta: {
                title: '商品列表',
                login: false
            }
        },

        {
            path: '/list/fromExplore',
            component: ListFromExlore,
            meta: {
                title: '商品列表',
                login: false
            }
        },


        // 九块九List
        {
            path: '/list/jiuList',
            component: ListJiuList,
            meta: {
                title: '九块九专区',
                login: false
            }
        },

        // 商品支付页面
        {
            path: '/pay',
            component: PayIndex,
            children: [
                {
                    path: '/pay/index',
                    component: PayIndex,
                    meta: {
                        title: '支付详情',
                        login: true
                    }
                }
            ],
            meta: {
                title: '支付详情',
                login: true
            }
        },
        {
            path: '/pay/wxWebPay',
            component: PayWxWebPay,
            meta: {
                title: '支付确认',
                login: true
            }
        },

        // 支付优惠券
        {
            path: '/pay/coupon',
            component: PayCoupon,
            meta: {
                title: '支付成功',
                login: true
            }
        },

        // 单买支付成功后
        {
            path: '/pay/paySuccess',
            component: PaySuccess,
            meta: {
                title: '支付成功',
                login: true
            }
        },

        // 地址列表
        {
            path: '/address',
            component: AddressIndex,
            children: [
                {
                    path: '/address/index',
                    component: AddressIndex,
                    meta: {
                        title: '地址列表',
                        login: true
                    }
                }
            ],
            meta: {
                title: '地址列表',
                login: true
            }
        },
        // 新增地址
        {
            path: '/address/addAddress',
            component: AddAddress,
            meta: {
                title: '新增地址',
                login: true
            }
        },
        // 排行榜
        {
            path: '/ranking',
            component: RankingIndex,
            children: [
                {
                    path: '/ranking/index',
                    component: RankingIndex,
                }
            ],
            meta: {
                title: '排行榜',
                login: false
            }
        },
        // 品质水果
        {
            path: '/fruit',
            component: FruitIndex,
            children: [
                {
                    path: '/fruit/index',
                    component: FruitIndex,
                    meta: {
                        title: '品质水果',
                        login: false
                    }
                }
            ],
            meta: {
                title: '品质水果',
                login: false
            }
        },
        // 探索
        {
            path: '/explore',
            component: ExploreIndex,
            children: [
                {
                    path: '/explore/index',
                    component: ExploreIndex,
                    meta: {
                        title: '搜索',
                        login: false
                    }
                }
            ],
            meta: {
                title: '搜索',
                login: false
            }
        },

        {
            path: '/explore/search',
            component: ExploreSearch,
            meta: {
                title: '搜索商品',
                login: false
            }
        },
        {
            path: '/explore/exploreSquredList',
            component: ExploreSquredList,
            meta: {
                title: '商品列表',
                login: false
            }
        },

        // 个人中心
        {
            path: '/user/index',
            component: UserIndex,
            meta: {
                title: '个人中心',
                login: true
            }
        },
        // 个人中心-我的订单
        {
            path: '/user/order',
            component: UserOrder,
            meta: {
                title: '我的订单',
                login: true
            }
        },
        // 个人中心-我的消息
        {
            path: '/user/myMsg',
            component: UserMyMsg,
            meta: {
                title: '我的消息',
                login: true
            }
        },
        // 个人中心-我的优惠券
        {
            path: '/user/myCoupon',
            component: UserMyCoupon,
            meta: {
                title: '我的优惠券',
                login: true
            }
        },
        // 个人中心-我的免单
        {
            path: '/user/myFree',
            component: UserMyFree,
            meta: {
                title: '我的免单',
                login: true
            }
        },
        // 个人中心-我的拼团
        {
            path: '/user/myProm',
            component: UserMyProm,
            meta: {
                title: '我的拼团',
                login: true
            }
        },
        // 个人中心-为我助力
        {
            path: '/user/myLike',
            component: UserMyLike,
            meta: {
                title: '为我助力',
                login: true
            }
        },
        // 个人中心-我的收藏
        {
            path: '/user/myCollection',
            component: UserMyCollection,
            meta: {
                title: '我的收藏',
                login: true
            }
        },
        // 个人中心-收货地址
        {
            path: '/user/myAddress',
            component: UserMyAddress,
            meta: {
                title: '收货地址',
                login: true
            }
        },
        // 个人中心-我的足迹
        {
            path: '/user/myFootmark',
            component: UserMyFootmark,
            meta: {
                title: '我的足迹',
                login: true
            }
        },
        // 个人中心-常见问题
        {
            path: '/user/help',
            component: UserHelp,
            meta: {
                title: '常见问题',
                login: false
            }
        },
        // 个人中心-设置页面
        {
            path: '/user/setting',
            component: UserSetting,
            meta: {
                title: '设置',
                login: true
            }
        },
        // 个人中心-反馈分类页面
        {
            path: '/user/feedback',
            component: UserFeedback,
            meta: {
                title: '意见反馈',
                login: true
            }
        },
        // 个人中心-填写意见反馈
        {
            path: '/user/feedbackSubmit',
            component: UserFeedbackSubmit,
            meta: {
                title: '填写意见反馈',
                login: true
            }
        },


        // 优惠券
        {
            path: '/coupon',
            component: CouponIndex,
            children: [
                {
                    path: '/coupon/index',
                    component: CouponIndex,
                    meta: {
                        title: '领取优惠券',
                        login: true
                    }
                }
            ],
            meta: {
                title: '领取优惠券',
                login: true
            }
        },
        // 分享刮奖
        {
            path: '/coupon/getShareCoupon',
            component: CouponGetShareCoupon,
            meta: {
                title: '拼趣多',
                login: true
            }
        },
        {
            path: '/coupon/test',
            component: CouponTest,
            meta: {
                title: '拼趣多',
                login: true
            }
        },

        {
            path: '/prom/coupon',
            component: PromCoupon,
            meta: {
                title: '拼趣多福利券',
                login: false
            }
        },


        // 订单详情
        {
            path: '/order/detail',
            component: OrderDetail,
            meta: {
                title: '订单详情',
                login: true
            },
            // beforeEnter: (to, from, next) => {
            //     if (navigator.userAgent.toLowerCase().indexOf('iphone') !== -1 && to.path !== location.pathname) {
            //         location.assign(to.fullPath)
            //     }
            //     next()
            // }
        },

        // 拼团详情
        {
            path: '/group/detail',
            component: GroupDetail,
            meta: {
                title: '拼团详情',
                login: false
            },
            // beforeEnter: (to, from, next) => {
            //     if (navigator.userAgent.toLowerCase().indexOf('iphone') !== -1 && to.path !== location.pathname) {
            //         location.assign(to.fullPath)
            //         next()
            //     } else {
            //         next()
            //     }
            // }
        },

        // 物流信息
        {
            path: '/order/logistics',
            component: OrderLogistics,
            meta: {
                title: '物流信息',
                login: true
            }
        },
        // 订单评价
        {
            path: '/order/review',
            component: OrderReview,
            meta: {
                title: '发表评价',
                login: true
            }
        },
        // 评价成功
        {
            path: '/order/reviewSuccess',
            component: OrderReviewSuccess,
            meta: {
                title: '评价成功',
                login: true
            }
        },
        // 评价成功的优惠券
        {
            path: '/order/reviewSuccessCoupon',
            component: OrderReviewSuccessCoupon,
            meta: {
                title: '评价成功',
                login: true
            }
        },
        // 售后系统--申请售后
        {
            path: '/service/applyAfterService',
            component: ApplyAfterService,
            meta: {
                title: '申请售后',
                login: true
            }
        },
        // 售后系统--售后详情
        {
            path: '/service/refundDetail',
            component: RefundDetail,
            meta: {
                title: '售后详情',
                login: true
            }
        },
        // 售后系统--协商记录
        {
            path: '/service/talkHistory',
            component: TalkHistory,
            meta: {
                title: '协商记录',
                login: true
            }
        },
        // 售后系统--买家发货
        {
            path: '/service/buyerDelivery',
            component: BuyerDelivery,
            meta: {
                title: '买家发货',
                login: true
            }
        },
        // 售后系统--物流信息
        {
            path: '/service/seeLogistics',
            component: SeeLogistics,
            meta: {
                title: '物流信息',
                login: true
            }
        },
        // 售后系统--钱款去向
        {
            path: '/service/moneyDirection',
            component: MoneyDirection,
            meta: {
                title: '钱款去向',
                login: true
            }
        },
        // 售后系统--申请平台介入
        {
            path: '/service/applyPlatform',
            component: ApplyPlatform,
            meta: {
                title: '申请平台介入',
                login: true
            }
        },

        // 活动专区
        {
            path: '/activity/wuyi',
            component: ActivityWuyi,
            meta: {
                title: '五一会场',
                login: true
            }
        },
        {
            path: '/activity/rules',
            component: ActivityWuyiRules,
            meta: {
                title: '五一会场规则',
                login: true
            }
        },
        {
            path: '/activity/moreList',
            component: ActivityWuyiMoreList,
            meta: {
                title: '五一会场--系列专场',
                login: true
            }
        },
        // 为我砍价
        {
            path: '/activity/bargain',
            component: cutPrice,
            meta: {
                title: '为我砍价',
                login: true
            }
        },
        // 为我砍价---砍价详情
        {
            path: '/activity/bargain/info',
            component: cutPriceDetail,
            meta: {
                title: '砍价详情',
                login: true
            }
        },
        // 商品详情
        {
            path: '/activity/cutPriceGoodsDetail',
            component: cutPriceGoodsDetail,
            meta: {
                title: '商品详情',
                login: true
            }
        },
        // 砍价规则
        {
            path: '/activity/cutPriceRules',
            component: cutPriceRules,
            meta: {
                title: '砍价规则',
                login: false
            }
        },
        // 提交订单
        {
            path: '/activity/cutPricePay',
            component: cutPricePay,
            meta: {
                title: '提交订单',
                login: true
            }
        },
        // 为我助力
        {
            path: '/activity/like',
            component: ActivityLike,
            meta: {
                title: '为我助力',
                login: true
            }
        },
        // 为我助力---助力详情
        {
            path: '/activity/likeDetail',
            component: ActivityLikeDetail,
            meta: {
                title: '助力详情',
                login: true
            }
        },
        // 为我助力---助力详情
        {
            path: '/activity/getNewCoupon',
            component: ActivityGetNewCoupon,
            meta: {
                title: '新人红包',
                login: true
            }
        },
        // 为我助力---助力规则
        {
            path: '/activity/likeRules',
            component: ActivityLikeRules,
            meta: {
                title: '助力规则',
                login: false
            }
        },
        // 趣多替你送
        {
            path: '/activity/gift',
            component: ActivityGift,
            meta: {
                title: '趣多替你送',
                login: true
            }
        },
        // 趣多替你送---详情
        {
            path: '/activity/giftDetail',
            component: ActivityGiftDetail,
            meta: {
                title: '趣多替你送',
                login: true
            }
        },
        // 趣多替你送---商品详情
        {
            path: '/activity/giftGoods',
            component: ActivityGiftGoods,
            meta: {
                title: '商品详情',
                login: true
            }
        },
        // 趣多替你送---趣多替你送规则
        {
            path: '/activity/giftRule',
            component: ActivityGiftRule,
            meta: {
                title: '趣多替你送规则',
                login: true
            }
        },
        // 会场专区
        {
            path: '/meeting/index',
            component: MeetingIndex,
            meta: {
                title: '会场中心',
                login: false
            },
            // beforeEnter: (to, from, next) => {
            //     alert(123)
            //     if (navigator.userAgent.toLowerCase().indexOf('iphone') !== -1 && to.path !== location.pathname) {
            //         alert(12112)
            //         location.assign(to.fullPath)
            //         alert(45)
            //         next()
            //         alert(333)
            //
            //     } else {
            //         next()
            //     }
            // }
        },
        // 会场专区
        {
            path: '/meeting/subset',
            component: MeetingSubset,
            meta: {
                title: '分会场',
                login: false
            },
            // beforeEnter: (to, from, next) => {
            //     if (navigator.userAgent.toLowerCase().indexOf('iphone') !== -1 && to.path !== location.pathname) {
            //         location.assign(to.fullPath)
            //     }
            //     next()
            // }
        },


        // 登录
        {
            path: '/login',
            component: LoginIndex,
            children: [
                {
                    path: '/login/index',
                    component: LoginIndex,
                    meta: {
                        title: '登录',
                    }
                }
            ],
            meta: {
                title: '登录',
            }
        },
        // 登录
        {
            path: '/login/protocol',
            component: LoginProtocol,
            meta: {
                title: '拼趣多用户协议',
                login: false
            }
        },

        // 商品不存在
        {
            path: '/error/errorDetail',
            component: ErrorDetail,
            meta: {
                title: '商品不存在',
                login: false
            }
        },
        // 404
        {
            path: '/error/error404',
            component: Error404,
            meta: {
                title: '页面不见了',
                login: false
            }
        },
        // // noWifi
        // {
        //     path: '/error/errorNoWifi',
        //     component: ErrorNoWifi,
        //     meta: {
        //         title: '网络连接断开',
        //         login: false
        //     }
        // },
        // 404
        {
            path: '/error/errorNoDns',
            component: ErrorNoDns,
            meta: {
                title: 'DNS解析错误',
                login: false
            }
        },


    ]
})

router.beforeEach((to, from, next) => {

    if (to.fullPath != '/login') {
        if (to.fullPath != '/user/setting') {
            router.app.$session.set('loginBeforeUrl', router.history.pending.fullPath)
        } else {
            router.app.$session.set('loginBeforeUrl', '/index')
        }
    }
    if (to.matched.some((item) => item.meta.login)) {
        let token = getCookie('token')
        if (token) {
            if (getCookie('terminal') == 'i') {
                if (to.path == '/detail/index' && !to.query.pid) {
                    window.showGoodsDetails(to.query.goods_id)
                    window.closeWeb();          // 跳转完成后关闭web
                } else if (to.path == '/detail/index' && to.query.pid) {
                    window.showGoodsDetailss(to.query.goods_id, to.query.pid, to.query.custom_parameters)
                    window.closeWeb();          // 跳转完成后关闭web
                }
                next()
            } else if (getCookie('terminal') == 'a') {
                if (to.path == '/detail/index') {
                    window.webview.showGoodsDetails(to.query.goods_id)
                    window.webview.closeWeb();          // 跳转完成后关闭web
                } else if (to.path == '/detail/index' && to.query.pid) {
                    window.webview.showGoodsDetailss(to.query.goods_id, to.query.pid, to.query.custom_parameters)
                    window.webview.closeWeb();          // 跳转完成后关闭web
                }
                next()
            } else {
                next()
            }
        } else {
            autoLogin()
        }
    } else {
        if (getCookie('terminal') == 'i') {
            if (to.path == '/detail/index') {
                window.showGoodsDetails(to.query.goods_id)
                setTimeout(() => {
                    window.closeWeb();          // 跳转完成后关闭web
                }, 500)
            } else if (to.path == '/detail/index' && to.query.pid) {
                window.showGoodsDetailss(to.query.goods_id, to.query.pid, to.query.custom_parameters)
                window.closeWeb();          // 跳转完成后关闭web
            }
            next()
        } else if (getCookie('terminal') == 'a') {
            if (to.path == '/detail/index') {
                window.webview.showGoodsDetails(to.query.goods_id)
                window.webview.closeWeb();          // 跳转完成后关闭web
            } else if (to.path == '/detail/index' && to.query.pid) {
                window.webview.showGoodsDetailss(to.query.goods_id, to.query.pid, to.query.custom_parameters)
                window.webview.closeWeb();          // 跳转完成后关闭web
            }
            next()
        } else {
            next()
        }
        // next()
    }

    if (navigator.userAgent.toLowerCase().indexOf('iphone') !== -1 && to.path !== location.pathname) {
        // if (to.path=='/detail/index'&&to.path=='/group/detail' ) {
        location.assign(to.fullPath)
        // }
        // 此处不可使用location.replace
    } else {
        next()
    }
    // if (to.fullPath != '/login') {
    //     // if (to.fullPath != '/user/setting') {
    //     router.app.$session.set('loginBeforeUrl', router.history.pending.fullPath)
    //     // } else {
    //     //     router.app.$session.set('loginBeforeUrl', '/index')
    //     // }
    // }
    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?f4bd853098f0530998ed0819882c3f4f";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();

    // <script src="https://s13.cnzz.com/z_stat.php?id=1274135038&web_id=1274135038" language="JavaScript"></script>
    // 用于微信分享jssdk---ios的坑，必须是首次进入
    // if (!sessionStorage.getItem('sessionUrl') && navigator.userAgent.toLowerCase().indexOf('iphone') !== -1) {
    //     sessionStorage.setItem('sessionUrl', window.location.origin)
    // }

    if (to.meta.title) {
        window.document.title = to.meta.title
    }
})

router.afterEach((to, from, next) => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    window.pageYOffset = 0
})

export default router;
