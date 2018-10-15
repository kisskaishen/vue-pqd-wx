<template>
    <div class="gift">
        <!-- 开团浮窗 -->
        <!-- <div class="fixedBox" v-if="isShowList">
            <router-link :to="'/group/detail?group_id='+item.group_id" v-for="item,index in boxList" :key="item.group_id"
                v-if="index == boxIndex">
                <img :src="item.photo" alt="">
                <p>最新订单来自{{item.nicke_name}}，{{item.show_time}}</p>
            </router-link>
        </div> -->
        <!-- 页头 -->
        <div class="header">
            <div class="banner">
                <img :src="giftInfo.info.cover_img" alt="">
            </div>
            <button class="rule-btn" @click="goRule">活动规则</button>
            <div class="process">
                <img src="../../imgs/gift/process.png" alt="">
            </div>
        </div>
        <!-- 可选商品列表 -->
        <div class="listWrapper" ref="listWrapper" v-if="currentIndex==1">
            <div class="tab" :class="{fix:tabFix}">
                <div v-for="(item, index) in giftInfo.cats_type" :key="index" :class="{active:goodsIndex==index}"
                    @click="switchGoods(index)">{{item.label}}</div>
            </div>
            <div class="list" v-if="goodsIndex==0" v-infinite-scroll="loadMore" infinite-scroll-disabled="goods1.loading"
                infinite-scroll-distance="10" infinite-scroll-immediate-check=false>
                <div class="item" v-for="(item, index) in goods1.list" @click="goGoods(item.goods_id,item.activity_goods_id,item.is_button,item.price)">
                    <div class="img-box">
                        <img :src="item.list_img" alt="">
                    </div>
                    <div class="desc-box">
                        <div class="title">{{item.goods_name}}</div>
                        <div class="sponsor-box">
                            <div class="sponsor">
                                <p class="text">赞助商：{{item.store_name}}</p>
                            </div>
                            <div class="icon-box">
                                <!-- <img class="icon-sponsor" :src="item.store_logo" alt=""> -->
                                <img class="icon-sponsor" :src="item.store_logo" alt="">
                                <img class="icon-arrow-right" src="../../imgs/gift/icon-arrow-right.png" alt="">
                            </div>
                        </div>
                        <div class="num-box">
                            ￥{{item.price}} <span>已送</span>{{item.sale}}件
                        </div>
                        <div class="bot-box">
                            <p>满<span>{{item.limit_reach}}人</span>开奖</p>
                            <button @click.stop="showSpecDiv(item,index)" class="normal" v-if="item.is_button==1">免费送</button>
                            <button class="abnormal" @click.stop="" v-else>已售罄</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list" v-if="goodsIndex==1" v-infinite-scroll="loadMore" infinite-scroll-disabled="goods2.loading"
                infinite-scroll-distance="10" infinite-scroll-immediate-check=false>
                <div class="item" v-for="(item, index) in goods2.list" @click="goGoods(item.goods_id,item.activity_goods_id,item.is_button,item.price)">
                    <div class="img-box">
                        <img :src="item.list_img" alt="">
                    </div>
                    <div class="desc-box">
                        <div class="title">{{item.goods_name}}</div>
                        <div class="sponsor-box">
                            <div class="sponsor">
                                <p class="text">赞助商：{{item.store_name}}</p>
                            </div>
                            <div class="icon-box">
                                <!-- <img class="icon-sponsor" :src="item.store_logo" alt=""> -->
                                <img class="icon-sponsor" :src="item.store_logo" alt="">
                                <img class="icon-arrow-right" src="../../imgs/gift/icon-arrow-right.png" alt="">
                            </div>
                        </div>
                        <div class="num-box">
                            ￥{{item.price}} <span>已送</span>{{item.sale}}件
                        </div>
                        <div class="bot-box">
                            <p>满<span>{{item.limit_reach}}人</span>开奖</p>
                            <button @click.stop="showSpecDiv(item,index)" class="normal" v-if="item.is_button==1">免费送</button>
                            <button class="abnormal" @click.stop="" v-else>已售罄</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list" v-if="goodsIndex==2" v-infinite-scroll="loadMore" infinite-scroll-disabled="goods3.loading"
                infinite-scroll-distance="10" infinite-scroll-immediate-check=false>
                <div class="item" v-for="(item, index) in goods3.list" @click="goGoods(item.goods_id,item.activity_goods_id,item.is_button,item.price)">
                    <div class="img-box">
                        <img :src="item.list_img" alt="">
                    </div>
                    <div class="desc-box">
                        <div class="title">{{item.goods_name}}</div>
                        <div class="sponsor-box">
                            <div class="sponsor">
                                <p class="text">赞助商：{{item.store_name}}</p>
                            </div>
                            <div class="icon-box">
                                <!-- <img class="icon-sponsor" :src="item.store_logo" alt=""> -->
                                <img class="icon-sponsor" :src="item.store_logo" alt="">
                                <img class="icon-arrow-right" src="../../imgs/gift/icon-arrow-right.png" alt="">
                            </div>
                        </div>
                        <div class="num-box">
                            ￥{{item.price}} <span>已送</span>{{item.sale}}件
                        </div>
                        <div class="bot-box">
                            <p>满<span>{{item.limit_reach}}人</span>开奖</p>
                            <button @click.stop="showSpecDiv(item,index)" class="normal" v-if="item.is_button==1">免费送</button>
                            <button class="abnormal" @click.stop="" v-else>已售罄</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="spinner">
                <mt-spinner type="fading-circle" v-if="spinner==1"></mt-spinner>
                <p class="text" v-if="spinner==0">没有更多数据了~</p>
            </div>
        </div>
        <!-- 我的抽奖列表 -->
        <div class="prizeList" v-if="currentIndex==2">
            <div class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="myGoods.loading"
                infinite-scroll-distance="100" infinite-scroll-immediate-check=false>
                <div class="item" v-for="item in myGoods.list" @click="goDetail(item.users_give_activity_id)">
                    <div class="img-box">
                        <div class="goodsTips" :class="{'color-FF4862':item.status==4}">
                            <span>{{prizeStatus(item.status,item.is_use)}}</span>
                            <count-down v-if="item.status==1" :futureTime="item.end_time" :currentTime="item.time"></count-down>
                            <count-down v-if="item.status==3" :futureTime="item.open_time" :currentTime="item.time"></count-down>
                        </div>
                        <!-- <div class="lucky" v-if="item.is_user_open==2">恭喜您已中奖</div> -->
                        <img :src="item.list_img" alt="">
                    </div>
                    <div class="desc-box">
                        <div class="title">{{item.goods_name}}</div>
                        <div class="num-box">
                            <p>￥{{item.price}}
                                <span class="color-999" v-if="item.cat_name">({{item.cat_name}})</span>
                                <!-- <span class="color-4C4C4C">已送</span>{{item.sale}}件 -->
                            </p>
                        </div>
                        <div class="result">
                            <p>
                                开奖结果：
                                <span class="color-FF4862" v-if="item.status!=2">{{item.open_result}}</span>
                                <span class="color-999" v-if="item.status==2">{{item.open_result}}</span>
                            </p>
                        </div>
                        <div class="bot-box" v-if="item.status != 4">
                            <div class="progress-box">
                                <div class="text">
                                    <span class="color-FF4862">{{item.join_number}}/{{item.open_number}}人</span>
                                </div>
                                <vm-progress type="line" :striped="item.status!=2" :percentage="percentage(item.join_number,item.open_number)"
                                    :stroke-color="item.status!=2?'#FF4862':'#b1b1b1'" :show-text=false :stroke-width="10"></vm-progress>
                            </div>
                            <button v-if="item.status!=2" :class="[item.is_button==3?'abnormal':'normal']">{{prizeBtnText(item.is_button)}}</button>
                        </div>
                        <div class="lucky" v-if="item.status == 4">
                            <span class="color-FF4862">中奖者：</span>
                            <!-- <img :src="item.open_user_head_img" alt=""> -->
                            <img :src="item.open_user_head_img" alt="">
                            <span class="lucky-name color-4C4C4C">{{item.open_user_nickename}}</span>
                            <button v-if="item.is_user_open==2" @click.stop="goOrderDetail(item.order_sn)" class="abnormal">{{prizeBtnText(item.is_button)}}</button>
                            <button v-if="item.is_user_open==1" :class="[item.is_button==3?'abnormal':'normal']">{{prizeBtnText(item.is_button)}}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="spinner">
                <mt-spinner type="fading-circle" v-if="spinner==1"></mt-spinner>
                <p class="text" v-if="spinner==0">没有更多数据了~</p>
            </div>
        </div>
        <!-- 底部悬浮按钮 -->
        <div class="btn-box" :class="currentIndex==1?'activeGoods':'activeLottery'">
            <button @click="switchItem(1)">可选商品</button>
            <button @click="switchItem(2)">我的抽奖</button>
        </div>
        <!--规格弹框-->
        <div class="specDiv dialogDiv" v-if="specShow">
            <div class="bg" @click="closeSpecDiv"></div>
            <div class="spec">
                <div class="goodsInfo">
                    <div class="divFl">
                        <img :src="currentImg||specInfo.spec_goods_price[0].img" alt="">
                        <div class="info">
                            <p>{{currentName}}</p>
                            <span class="red">￥{{currentPrice || '0.00'}}</span>
                            <!-- <label>已选：<span>{{index1Item}}</span><span v-if="index2Item">+{{index2Item}}</span></label> -->
                            <label>已选：<span>{{key_name}}</span></label>
                        </div>
                    </div>
                    <div class="divFr">
                        <img src="../../imgs/detail/icon-coupon-close.png" alt="" @click="closeSpecDiv">
                    </div>
                </div>
                <div class="goodsSpec">
                    <div class="infoSpec">
                        <p>{{specInfo.spec[0].name}}</p>
                        <ul>
                            <li v-for="item,index in specInfo.spec[0].item" :class="index==current1Index?'active':''"
                                :disabled="item.store_count=='0'?true:false" @click="spec1Change(item,index)">
                                <span>{{item.item}}</span>
                                <span v-if="item.store_count=='0'">（已售罄）</span>
                            </li>
                        </ul>
                    </div>
                    <div class="infoSpec" v-if="specInfo.spec.length == '2'">
                        <p>{{specInfo.spec[1].name}}</p>
                        <ul>
                            <li v-for="item,index in specInfo.spec[1].item" :class="index==current2Index?'active':''"
                                :disabled="item.store_count=='0'?true:false" @click="spec2Change(item,index)">
                                <span>{{item.item}}</span>
                                <span v-if="item.store_count=='0'">（已售罄）</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="submitBtn">
                    <button @click="showAddress" v-if="specStorage">免费送</button>
                    <button class="isNoSpec" v-else>已售罄</button>

                </div>
            </div>
        </div>
        <!--地址弹框-->
        <div class="addressDiv dialogDiv" v-if="addressShow">
            <div class="bg" @click="closeAddressDiv"></div>
            <div class="address">
                <ul>
                    <li>
                        <p>选择收货地址</p>
                        <img src="../../imgs/detail/icon-coupon-close.png" alt="" @click="closeAddressDiv">
                    </li>
                    <li v-for="item,index in addressList" @click="choooseAddress(item)">
                        <div>
                            <p><b>{{item.consignee}}</b> {{item.mobile}}</p>
                            <p>{{item.address_base}}{{item.address}}</p>
                        </div>
                        <img src="../../imgs/index/icon-arrow-right-gray.png" alt="">
                    </li>
                    <li @click="showAddAddressDiv">
                        <p>添加收货地址</p>
                        <img src="../../imgs/index/icon-arrow-right-gray.png" alt="">
                    </li>
                </ul>
            </div>
        </div>
        <!--添加地址弹框-->
        <div class="addAddressDiv dialogDiv" v-if="addAddress">
            <div class="bg" @click="closeAddressDiv"></div>
            <div class="addDiv">
                <b>添加地址</b>
                <div>
                    <p>
                        <input type="text" placeholder="名字" v-model="addAddressName" style="border-right: 1px solid #ccc;">
                        <input type="number" v-model="addAddressTel" placeholder="电话">
                    </p>
                    <p @click="showAreaChange">{{addAddressText||'请选择所在地区'}}</p>
                    <p>
                        <input type="text" v-model="addAddressDetail" placeholder="请填写详情地址">
                    </p>
                    <p>
                        <mt-button type="danger" @click="saveAddress">保存</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!--地址选择框-->
        <div class="chooseAddress" v-if="showArea">
            <div class="bg"></div>
            <div class="addressDiv">
                <div class="addressTop">
                    <div class="divFl">
                        <span @click="provinceClick">{{province || '请选择'}}</span>
                        <span @click="cityClick" v-if="province">{{city || '请选择'}}</span>
                        <span v-if="city">{{district || '请选择'}}</span>
                    </div>
                    <div class="divFr">
                        <i @click="sureAddress"></i>
                    </div>
                </div>
                <div class="addressBody">
                    <ul>
                        <li v-for="item,index in addressArr" @click="addressClick(item,index)">
                            {{item.region_name}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <wx-config></wx-config>
    </div>
</template>

<script>
    import countDown from '../../components/base/countDown'
    import { Toast, MessageBox, } from 'mint-ui';
    import myaddress from '../../components/area.json'

    import wx from 'weixin-js-sdk';         // 引入微信sdk
    import wxConfig from '../../components/wx/wxconfig'

    export default {
        name: "gift",
        data() {
            return {
                giftInfo: {
                    cats_type: {},
                    info: {},
                    share: {},
                },
                goods1: {
                    page: 1,
                    status: true,
                    loading: false,
                    list: []
                },
                goods2: {
                    page: 1,
                    status: true,
                    loading: false,
                    list: []
                },
                goods3: {
                    page: 1,
                    status: true,
                    loading: false,
                    list: []
                },
                myGoods: {
                    page: 1,
                    status: true,
                    loading: false,
                    list: []
                },
                scrollTop: 0,
                listWrapperTop: null,
                currentIndex: 1,
                goodsIndex: 0,   //可选商品选下索引
                loading: false,  //加载状态

                boxList: [],
                boxIndex: 0,
                isShowList: false,  //头部浮窗
                specShow: false,    //规格弹窗
                addressShow: false, // 地址弹窗


                goods_id: '',                // 商品id
                activity_goods_id: '',       // 活动ID
                activity_goods_id: '',       // 用于规格
                specInfo: { spec: [{ item: [] }], spec_goods_price: [] },                 // 规格信息
                current1Index: '0',
                index1Id: '',
                index1Item: '',
                current2Index: '0',
                index2Id: '',
                index2Item: '',

                specStorage: true,

                spec_id: '',                 // spec的组合id，if只有一个规格就是index1Id
                currentImg: '',              // 当前图片地址
                currentPrice: '',            // 当前商品规格的价格
                currentName: '',             // 商品名称
                addressList: [],             // 地址列表
                addAddress: false,           // 添加地址的弹框

                addressArr: myaddress,

                showArea: false,        //地址三级联动
                provinceId: '',
                provinceIndex: '',
                province: '',
                cityId: '',
                city: '',
                cityIndex: '',
                districtId: '',
                district: '',
                addAddressName: '',     // 新增名字
                addAddressTel: '',      // 新增电话
                addAddressText: '',     // 新增地址
                addAddressDetail: '',   // 新增详细地址
            }
        },
        created() {
            this.getGift()
            this.getGoodsList(1, 1)
            this.getMyGoodsList(1)
        },
        mounted() {
            this.$nextTick(() => {
                this.getListWrapperTop()
                window.addEventListener('scroll', this.handScroll)
            })
            // setTimeout(() => {
            //     this.getListWrapperTop()
            //     window.addEventListener('scroll', this.handScroll)
            // }, 300);

            // this.getBox()
            // setInterval(() => {
            //     this.getFor()
            // }, 5000)
        },
        watch: {
            currentIndex(val) {
                // if (val == 1 && !this.listWrapperTop) {
                if (val == 1) {
                    window.addEventListener('scroll', this.handScroll)
                    // setTimeout(() => {
                    //     this.getListWrapperTop()
                    // }, 200)
                }
            }

        },
        computed: {
            tabFix() {
                return this.scrollTop > this.listWrapperTop
                // return this.scrollTop > 402
            },
            spinner() {
                if (this.currentIndex == 1) {
                    let type = this.goodsIndex + 1
                    if (this['goods' + type].page == 1 && this['goods' + type].list.length > 0 && this['goods' + type].list.length < 10) {
                        return 3
                    }
                    return this['goods' + type].status ? 1 : 0
                } else {
                    if (this.myGoods.page == 1 && this.myGoods.list.length > 0 && this.myGoods.list.length < 10) {
                        return 3
                    }
                    return this.myGoods.status ? 1 : 0
                }
            }
        },
        methods: {
            //跳转活动详情
            goDetail(id) {
                this.$router.push({
                    path: "/activity/giftDetail",
                    query: {
                        users_give_activity_id: id
                    }
                })
            },
            goOrderDetail(orderSn) {
                this.$router.push({
                    path: "/order/detail",
                    query: {
                        order_sn: orderSn
                    }
                })
            },
            // 跳转商品详情
            goGoods(goodsId, activity_goods_id, isBtn, price) {
                this.$router.push({
                    path: "/activity/giftGoods",
                    query: {
                        goods_id: goodsId,
                        activity_goods_id: activity_goods_id,
                        isBtn: isBtn,
                        price: price
                    }
                })
            },
            // 跳转活动规则
            goRule() {
                this.$router.push('/activity/giftRule')
            },
            // 监听滚动方法
            handScroll(e) {
                this.scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
            },
            getListWrapperTop() {
                let listWrapper = this.$refs.listWrapper;
                if (this.$refs.listWrapper) {
                    this.listWrapperTop = this.$refs.listWrapper.offsetTop;
                    // alert(this.listWrapperTop)
                    window.addEventListener('scroll', this.handScroll)
                }
            },
            //切换商品
            switchGoods(index) {
                let type = index + 1
                if (!this['goods' + type].list.length) {
                    this['goods' + type].loading = true
                    this.getGoodsList(type, 1)
                }
                this.goodsIndex = index
            },
            switchItem(index) {
                this.currentIndex = index
                this.toTopClick()
            },
            //获取活动信息
            getGift() {
                this.$post('give/getGiveInfo', {}).then((res) => {
                    this.giftInfo = res
                    document.title = this.giftInfo.info.activity_name
                    this.share()
                    this.$local.set("giftRule", { ruleText: this.giftInfo.info.rule_desc })
                })
            },
            //头部浮窗:
            getBox() {
                this.$post('group/getGroupList', {})
                    .then(res => {
                        this.boxList = res
                    })
            },
            getFor() {
                this.isShowList = true;
                if (this.boxIndex <= this.boxList.length) {
                    this.boxIndex += 1
                } else {
                    this.boxIndex = 0
                }
                setTimeout(() => {
                    this.isShowList = false
                }, 3000)
            },

            // 微信分享回调配置
            share() {
                wx.ready(() => {
                    // 分享朋友圈
                    wx.onMenuShareTimeline({
                        title: this.giftInfo.share.share_title, // 分享标题
                        link: this.giftInfo.share.share_path, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: this.giftInfo.share.share_img, // 分享图标
                        // desc: this.giftInfo.share.share_desc, // 分享描述
                        success: function () {
                            // this.getShareNumber()
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
                        title: this.giftInfo.share.share_title, // 分享标题
                        desc: this.giftInfo.share.share_desc, // 分享描述
                        link: this.giftInfo.share.share_path, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: this.giftInfo.share.share_img, // 分享图标
                        success: function () {
                            // 用户点击了分享后执行的回调函数
                            // this.getShareNumber()
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
            },
            //获取商品列表
            getGoodsList(type, page) {
                if (!this['goods' + type].status) {
                    return
                }

                this.$post('give/getGiveGoodsList', {
                    cats_type: type,
                    page: page
                }).then((res) => {
                    let list = res.list
                    if (list.length) {
                        this['goods' + type].list = this['goods' + type].list.concat(list)
                    } else {
                        this['goods' + type].status = false
                    }
                })
            },
            //获取我的抽奖列表
            getMyGoodsList(page) {
                if (!this.myGoods.status) {
                    return
                }
                this.$post('give/getGiveUserGoodsList', {
                    page: page,
                    token: this.$getCookie('token') ? this.$getCookie('token') : ''
                }).then((res) => {
                    let list = res.list
                    if (list.length) {
                        this.myGoods.list = this.myGoods.list.concat(list)
                    } else {
                        this.myGoods.status = false
                    }
                })
            },
            // 加载更多
            loadMore() {
                if (this.currentIndex == 1) {
                    let type = this.goodsIndex + 1
                    let goods = this['goods' + type]
                    goods.loading = true
                    goods.page++
                    this.getGoodsList(type, goods.page)
                    goods.loading = false
                } else {
                    this.myGoods.loading = true
                    this.myGoods.page++
                    this.getMyGoodsList(this.myGoods.page)
                    this.myGoods.loading = false
                }
            },

            //页面置顶
            toTopClick() {
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                window.pageYOffset = 0
            },

            // 点击我要它显示规格弹框
            showSpecDiv(val, index) {
                this.goods_id = val.goods_id
                this.activity_goods_id = val.activity_goods_id
                this.currentName = this['goods' + (this.goodsIndex + 1)].list[index].goods_name
                this.currentPrice = val.price
                this.getSpec()
            },
            // 获取规格
            getSpec() {
                this.$post('give/getGiveGoodsSpec', {
                    activity_goods_id: this.activity_goods_id
                }).then(res => {
                    this.specInfo = res
                    this.index1Id = this.specInfo.spec[0].item[0].spec_item_id
                    this.index1Item = this.specInfo.spec[0].item[0].item
                    this.index2Id = this.specInfo.spec.length == '2' ? this.specInfo.spec[1].item[0].spec_item_id : ''
                    this.index2Item = this.specInfo.spec.length == '2' ? this.specInfo.spec[1].item[0].item : ''
                    this.specShow = true

                    // 单规格
                    if (this.specInfo.spec.length == '1') {
                        this.groupId = this.index1Id
                        for (let i = 0; i < this.specInfo.spec_goods_price.length; i++) {
                            if (this.groupId == this.specInfo.spec_goods_price[i].key) {
                                this.specStorage = this.specInfo.spec_goods_price[i].limit_stock > 0 ? true : false
                                this.specCurrentIndex = i
                            }

                        }
                    } else if (this.specInfo.spec.length == '2') {
                        // 双规格
                        this.group1Id = `${this.index1Id}_${this.index2Id}`
                        this.group2Id = `${this.index2Id}_${this.index1Id}`
                        for (let i = 0; i < this.specInfo.spec_goods_price.length; i++) {
                            if (this.group1Id == this.specInfo.spec_goods_price[i].key) {
                                this.groupId = this.group1Id
                                this.specCurrentIndex = i
                            } else if (this.group2Id == this.specInfo.spec_goods_price[i].key) {
                                this.groupId = this.group2Id
                                this.specCurrentIndex = i
                            }

                        }
                    }
                    for (let i = 0; i < this.specInfo.spec_goods_price.length; i++) {
                        if (this.groupId == this.specInfo.spec_goods_price[i].key) {
                            this.specStorage = this.specInfo.spec_goods_price[i].limit_stock > 0 ? true : false
                            this.specCurrentIndex = i
                        }
                    }
                    this.currentImg = this.specInfo.spec_goods_price[this.specCurrentIndex].img
                    this.key_name = this.specInfo.spec_goods_price[this.specCurrentIndex].key_name
                })
            },
            // 规格选择
            spec1Change(val, index) {
                let self = this
                self.current1Index = index
                self.index1Id = val.spec_item_id
                if (self.specInfo.spec.length == '1') {
                    self.groupId = self.index1Id
                    for (let i = 0; i < self.specInfo.spec_goods_price.length; i++) {
                        if (self.groupId == self.specInfo.spec_goods_price[i].key) {
                            self.specCurrentIndex = i
                            self.currentImg = self.specInfo.spec_goods_price[i].img
                        }
                    }

                } else if (self.specInfo.spec.length == '2') {
                    if (!self.index2Id) {                 // 只点击第一个，if 第二个值不存在（不点击），默认为第二个值得第一个
                        self.index2Id = self.specInfo.spec.length == '2' ? self.specInfo.spec[1].item[0].spec_item_id : ''
                    }
                    self.group1Id = self.index1Id + '_' + self.index2Id         // 当有两个规格的时候，有出现过这种情况    规格1的id_规格2的id/规格2的id_规格1的id,
                    self.group2Id = self.index2Id + '_' + self.index1Id

                    // 循环遍历确定是    规格1的id_规格2的id  还是  规格2的id_规格1的id，然后确定其价格
                    for (let i = 0; i < self.specInfo.spec_goods_price.length; i++) {
                        if (self.group1Id == self.specInfo.spec_goods_price[i].key || self.group2Id == self.specInfo.spec_goods_price[i].key) {
                            self.specCurrentIndex = i
                            self.currentImg = self.specInfo.spec_goods_price[i].img
                            self.groupId = self.group1Id == this.specInfo.spec_goods_price[i].key ? self.group1Id : self.group2Id
                        }
                    }
                }
                this.key_name = this.specInfo.spec_goods_price[this.specCurrentIndex].key_name
                self.specStorage = self.specInfo.spec_goods_price[self.specCurrentIndex].limit_stock > 0 ? true : false
                // console.log('guige1='+self.groupId)
            },
            spec2Change(val, index) {
                let self = this

                self.current2Index = index
                self.index2Id = val.spec_item_id
                if (!self.index1Id) {                 // 只点击第二个，if 第一个值不存在（不点击），默认为第一个值得第一个
                    self.index1Id = self.specInfo.spec[0].item[0].spec_item_id
                }
                self.group1Id = self.index1Id + '_' + self.index2Id
                self.group2Id = self.index2Id + '_' + self.index1Id
                for (let i = 0; i < self.specInfo.spec_goods_price.length; i++) {
                    if (self.group1Id == self.specInfo.spec_goods_price[i].key || self.group2Id == self.specInfo.spec_goods_price[i].key) {
                        self.specCurrentIndex = i
                        self.currentImg = self.specInfo.spec_goods_price[i].img
                        self.groupId = self.group1Id == this.specInfo.spec_goods_price[i].key ? self.group1Id : self.group2Id
                    }
                }
                this.key_name = this.specInfo.spec_goods_price[this.specCurrentIndex].key_name
                self.specStorage = self.specInfo.spec_goods_price[self.specCurrentIndex].limit_stock > 0 ? true : false
                // console.log('guige2='+self.groupId)
            },
            // 不同规格显示不同的图片和价格

            // 点击阴影关闭
            closeSpecDiv() {
                this.specShow = false
                this.currentImg = ''
                this.current2Index = '0'
                this.current1Index = '0'
                this.group1Id = ''
                this.group2Id = ''
                this.groupId = ''
            },
            // 显示地址弹框
            showAddress() {
                this.specShow = false
                this.getAddressList()
                this.addressShow = true
            },
            closeAddressDiv() {
                this.addressShow = false
                this.addAddress = false
            },
            // 获取地址列表
            getAddressList() {
                // let self = this
                this.$post('user/getAddressList', {
                    token: this.$getCookie('token')
                }).then(res => {
                    this.addressList = res.list
                })
            },
            // 选择地址
            choooseAddress(val) {
                this.address_id = val.address_id
                this.addressShow = false
                let res = `${val.consignee}   ${val.mobile}   ${val.address}${val.address_base} `
                MessageBox.confirm(res, '请您确认收货地址').then(action => {
                    if (action == 'confirm') {
                        this.createGive()
                    }
                });

            },
            // 添加地址
            showAddAddressDiv() {
                this.addressShow = false
                this.addAddress = true
            },
            // 显示三级联动
            showAreaChange() {
                this.showArea = true
                this.addressArr = myaddress
                this.provinceId = ''
                this.province = ''
                this.cityId = ''
                this.city = ''
                this.districtId = ''
                this.district = ''
                this.address = ''
            },
            // 省份选择
            provinceClick() {
                this.addressArr = myaddress
                this.cityId = ''
                this.city = ''
                this.districtId = ''
                this.district = ''
            },
            // 市选择
            cityClick() {
                this.addressArr = myaddress[this.provinceIndex].children
                this.districtId = ''
                this.district = ''
            },
            // 点击区县并关闭
            addressClick(val, index) {
                this.addressArr = val.children
                if (val.parent_id == '100000') {
                    this.province = val.region_name
                    this.provinceId = val.region_id
                    this.provinceIndex = index
                } else if (val.parent_id == this.provinceId) {
                    this.city = val.region_name
                    this.cityId = val.region_id
                    this.cityIndex = index
                } else if (!val.children && val.parent_id == this.cityId) {
                    this.district = val.region_name
                    this.districtId = val.region_id
                    this.sureAddress()
                }
                this.addAddressText = `${this.province}${this.city}${this.district}`
            },
            // 隐藏三级联动
            sureAddress() {
                this.showArea = false
            },
            // 保存地址
            saveAddress() {
                let checkTel = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.addAddressTel)) || this.addAddressName == '' || this.addAddressTel == '' || this.addAddressText == '' || this.addAddressDetail == '') {
                    let instance = Toast('请填写正确的地址信息');
                    setTimeout(() => {
                        instance.close();
                    }, 1600);
                } else {
                    let self = this
                    this.$post('user/handleAddress', {
                        token: this.$getCookie('token'),
                        type: '1',            // '添加'=>'1','修改'=>'2'
                        consignee: this.addAddressName,
                        province: this.provinceId,
                        city: this.cityId,
                        district: this.districtId,
                        is_default: '0',     //  0：不默认 1：默认地址
                        address_base: this.addAddressText,
                        address: this.addAddressDetail,
                        mobile: this.addAddressTel,
                    }).then(res => {
                        this.address_id = res.address_id
                        this.addAddress = false
                        this.addAddressName = ''
                        this.addAddressText = ''
                        this.address_base = ''
                        this.mobile = ''
                        setTimeout(() => {
                            this.createGive()
                        }, 200)
                    })
                }
            },
            //创建趣多替你送
            createGive() {
                this.$post('give/createGive', {
                    token: this.$getCookie('token'),
                    activity_goods_id: this.activity_goods_id,
                    goods_id: this.goods_id,
                    goods_spec_key: this.groupId,
                    address_id: this.address_id
                }).then((res) => {
                    setTimeout(() => {
                        this.$router.push({
                            path: "/activity/giftDetail",
                            query: {
                                users_give_activity_id: res.users_give_activity_id
                            }
                        })
                    }, 100);
                })
            },

            //模板数据处理:
            prizeBtnText(type) {
                // "is_button": "按钮 1:继续邀请 2:去围观 3:再来一次 4：查看订单"
                return ['继续邀请', '去围观', '再来一次', '查看订单'][type - 1]
            },
            prizeStatus(status, isUse) {
                // "status": "状态  1:活动进行中 2:活动失效 3:开奖进行中 4:开奖结束",
                // "isUse": "1:发起者  2:参与者",,
                if (status == 1) {
                    return '剩余'
                } else if (status == 3) {
                    return '开奖中'
                } else if (status == 2) {
                    if (isUse == 1) {
                        return '发起失败'
                    } else if (isUse == 2) {
                        return '参与失败'
                    }
                } else if (status == 4) {
                    if (isUse == 1) {
                        return '发起成功'
                    } else if (isUse == 2) {
                        return '参与成功'
                    }
                }
                // return ['剩余', '开奖失败', '开奖倒计时', '已开奖'][status - 1]
            },
            percentage(current, max) {
                return current / max * 100
            }
        },
        components: {
            wxConfig,
            countDown
        }
    }
</script>

<style lang="scss" scoped>
    .gift {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        min-height: 100%;
        background: #ffffff;

        /* 左上角浮窗样式 */
        .fixedBox {
            position: fixed;
            top: 40px;
            left: 16px;
            -webkit-border-radius: 40px;
            -moz-border-radius: 40px;
            border-radius: 40px;
            background-color: rgba(0, 0, 0, .6);
            color: #fff;
            z-index: 9999;
            padding-right: 30px;

            a {
                position: relative;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 50px;

                img {
                    position: absolute;
                    left: 0;
                    top: -5px;
                    display: block;
                    width: 60px;
                    height: 60px;
                    margin-right: 20px;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                    border: 1px solid #ccc;
                }

                p {
                    color: #fff;
                    margin-left: 70px;
                }
            }
        }

        .header {
            padding-bottom: 88px;
            position: relative;
            width: 100%;
            background: #ffffff;

            img {
                width: 100%;
            }

            .banner {
                img {
                    width: 100%;
                    height: 354px;
                }
            }

            .rule-btn {
                padding: 5px 16px;
                position: absolute;
                right: 25px;
                bottom: 160px;
                font-size: 28px;
                /* font-weight: bold; */
                color: #333333;
                background: rgba(251, 233, 32, 1);
                border-radius: 50px;
                box-shadow: 0px 4px 29px 0px rgba(241, 0, 0, 0.64);
            }

            .process {
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
                width: 100%;
                height: 144px;
            }
        }

        .listWrapper {
            padding-top: 120px;
            padding-bottom: 100px;
            position: relative;
            background: #ffffff;

            .tab {
                position: absolute;
                top: 0;
                width: 100%;
                background: #ffffff;
                display: flex;
                height: 80px;
                border-bottom: 1px solid #eeeeee;

                &.fix {
                    position: fixed;
                    top: 0;
                    width: 100%;
                }

                >div {
                    flex: 1;
                    text-align: center;
                    font-size: 28px;
                    color: #4C4C4C;
                    line-height: 80px;

                    &.active {
                        position: relative;
                        color: #FF4862;

                        &::after {
                            content: '';
                            position: absolute;
                            bottom: 0;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 112px;
                            height: 4px;
                            background: #FF4862;
                            border-radius: 2px;
                        }
                    }
                }
            }

            .list {
                .item {
                    padding: 0 26px;
                    margin-bottom: 60px;
                    display: flex;
                    height: 250px;

                    .img-box {
                        margin-right: 20px;
                        flex: 0 0 250px;
                        width: 250px;
                        height: 250px;

                        img {
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .desc-box {
                        display: flex;
                        flex: 1;
                        flex-direction: column;
                        justify-content: space-between;

                        .title {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            font-size: 30px;
                            color: #333333;
                        }

                        .sponsor-box {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            .sponsor {
                                flex: 1;
                                overflow: hidden;

                                .text {
                                    font-size: 24px;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 1;
                                    overflow: hidden;
                                }
                            }

                            .icon-box {
                                flex: 0 0 84px;
                                display: flex;
                                align-items: center;
                            }

                            .icon-sponsor {
                                margin-right: 15px;
                                width: 58px;
                                height: 58px;
                                border-radius: 6px;
                            }

                            .icon-arrow-right {
                                width: 10px;
                                height: 18px;
                            }
                        }

                        .num-box {
                            font-size: 24px;
                            color: #4C4C4C;

                            span {
                                color: #999999;
                            }
                        }

                        .bot-box {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;

                            p {
                                font-size: 24px;
                                color: #999999;

                                span {
                                    font-size: 32px;
                                    color: #FF4862;
                                }
                            }

                            button {
                                /* display: flex;
                                align-items: center;
                                justify-content: center; */
                                width: 162px;
                                height: 60px;
                                border-radius: 8px;
                                font-size: 28px;
                                text-align: center;

                                &.normal {
                                    background: linear-gradient(90deg, rgba(255, 72, 98, 1) 0%, rgba(255, 132, 132, 1) 100%);
                                }

                                &.abnormal {
                                    background: #D9D9D9;
                                }
                            }
                        }
                    }
                }
            }
        }

        .prizeList {
            padding-top: 20px;
            padding-bottom: 100px;
            position: relative;
            background: #ffffff;

            .color-FF4862 {
                color: #FF4862;
            }

            .color-4C4C4C {
                color: #4C4C4C;
            }

            .color-999 {
                color: #999999;
            }

            .list {
                .item {
                    padding: 0 26px;
                    margin-bottom: 80px;
                    display: flex;
                    height: 250px;

                    .img-box {
                        position: relative;
                        margin-right: 20px;
                        flex: 0 0 250px;
                        width: 250px;
                        height: 250px;

                        >div {
                            padding-right: 10px;
                            position: absolute;
                            left: 0;
                            top: 15px;
                            height: 40px;
                            line-height: 42px;
                            background: rgba(255, 255, 255, 0.7);
                            border-radius: 0px 20px 20px 0px;
                        }

                        .goodsTips {
                            top: 15px;
                            padding: 0 10px;

                            &.normal {
                                color: #FF4862;
                            }
                        }

                        .lucky {
                            top: 66px;
                            color: #FF4862;

                            &::before {
                                content: '';
                                display: inline-block;
                                vertical-align: middle;
                                margin: 0 8px 0 10px;
                                width: 32px;
                                height: 32px;
                                background: url("../../imgs/gift/icon-prize.png") no-repeat 0 0/100%;
                            }
                        }

                        img {
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .desc-box {
                        display: flex;
                        flex: 1;
                        flex-direction: column;
                        justify-content: space-between;

                        .title {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            line-height: 35px;
                            font-size: 30px;
                            color: #333333;
                        }

                        .num-box {
                            font-size: 24px;
                        }

                        .result {
                            margin-bottom: 8px;
                        }

                        .bot-box {
                            position: relative;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;

                            .progress-box {
                                position: relative;
                                font-size: 0;
                                width: 244px;
                                height: 20px;

                                .text {
                                    position: absolute;
                                    bottom: 20px;
                                    width: 280px;
                                    font-size: 22px;
                                }

                                .progress {
                                    position: absolute;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    width: 244px;
                                    height: 20px;
                                    background: #FF4862;
                                    border-radius: 10px;
                                }
                            }

                            button {
                                /* margin-left: 20px; */
                                width: 160px;
                                height: 60px;
                                text-align: center;
                                border-radius: 8px;
                                font-size: 28px;

                                &.normal {
                                    background: linear-gradient(90deg, rgba(255, 72, 98, 1) 0%, rgba(255, 132, 132, 1) 100%);
                                }

                                &.abnormal {
                                    color: #4C4C4C;
                                    background: #ffffff;
                                    border: 1px solid #CCCCCC;
                                }
                            }
                        }

                        .lucky {
                            display: flex;
                            align-items: center;

                            .color-FF4862 {
                                /* font-size: 12px; */
                                white-space: nowrap;
                            }

                            .lucky-name {
                                width: 90px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }

                            img {
                                margin-right: 8px;
                                width: 54px;
                                height: 54px;
                            }

                            button {
                                margin-left: 20px;
                                width: 160px;
                                height: 60px;
                                border-radius: 8px;
                                font-size: 28px;

                                &.normal {
                                    background: linear-gradient(90deg, rgba(255, 72, 98, 1) 0%, rgba(255, 132, 132, 1) 100%);
                                }

                                &.abnormal {
                                    color: #4C4C4C;
                                    background: #ffffff;
                                    border: 1px solid #CCCCCC;
                                }
                            }
                        }
                    }
                }
            }
        }

        .spinner {
            margin-bottom: 60px;
            display: flex;
            justify-content: center;

            .text {
                color: #999999;
            }
        }

        .btn-box {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100px;
            font-size: 0;

            &.activeGoods {
                button:nth-child(1) {
                    background: #FF4862;

                    &::before {
                        background: url('../../imgs/gift/icon-goods.png') no-repeat center/100%
                    }
                }

                button:nth-child(2) {
                    color: #333333;

                    &::before {
                        background: url('../../imgs/gift/icon-lottery-active.png') no-repeat center/100%
                    }
                }
            }

            &.activeLottery {
                button:nth-child(1) {
                    color: #333333;

                    &::before {
                        background: url('../../imgs/gift/icon-goods-active.png') no-repeat center/100%
                    }
                }

                button:nth-child(2) {
                    background: #FF4862;

                    &::before {
                        background: url('../../imgs/gift/icon-lottery.png') no-repeat center/100%
                    }
                }
            }

            button {
                position: relative;
                display: inline-block;
                vertical-align: top;
                width: 50%;
                height: 100px;
                text-align: center;
                font-size: 28px;
                background: #FFFFFF;

                &::before {
                    content: '';
                    margin-top: -5px;
                    margin-right: 10px;
                    display: inline-block;
                    vertical-align: middle;
                    width: 36px;
                    height: 36px;
                }
            }
        }

        .dialogDiv {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            margin: 0;
            z-index: 999;

            .bg {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background-color: rgba(0, 0, 0, .6);
            }
        }

        /* 规格弹框 */
        .specDiv {
            .spec {
                position: absolute;
                top: auto;
                bottom: 0;
                left: 0;
                right: 0;
                width: 100%;
                padding: 26px;
                max-height: 1032px;
                overflow: scroll;
                background-color: #fff;
                border-radius: 20px 20px 0px 0px;

                .goodsInfo {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 26px;

                    .divFl {
                        flex: 1;

                        img {
                            display: block;
                            width: 176px;
                            height: 176px;
                        }

                        .info {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            align-self: stretch;
                            justify-content: space-between;
                            width: 454px;

                            p {
                                width: 100%;
                                line-height: 40px;
                                max-height: 80px;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                -ms-text-overflow: ellipsis;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                font-size: 36px;
                            }

                            &>span {
                                font-size: 36px;
                            }

                            label {
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                font-size: 28px;

                                span {
                                    width: auto;
                                    color: #333;
                                }
                            }
                        }
                    }

                    .divFr {
                        img {
                            width: 26px;
                            height: 26px;
                        }
                    }
                }

                .infoSpec {
                    padding: 20px;
                    margin-bottom: 60px;

                    >p {
                        color: #888;
                    }

                    ul {
                        display: flex;
                        justify-content: flex-start;
                        flex-wrap: wrap;

                        li {
                            padding: 20px 24px;
                            background-color: #fff;
                            margin-right: 20px;
                            margin-top: 20px;
                            color: #4c4c4c;
                            border: 2px solid #ccc;
                            -webkit-border-radius: 8px;
                            -moz-border-radius: 8px;
                            border-radius: 8px;
                            font-size: 24px;
                        }

                        .active {
                            border: 2px solid #FF8484;
                            color: #FF8484;
                        }
                    }
                }

                .submitBtn {
                    button {
                        width: 100%;
                        background-color: #FF4862;
                        font-size: 32px;
                        height: 96px;
                        line-height: 96px;
                        -webkit-border-radius: 8px;
                        -moz-border-radius: 8px;
                        border-radius: 8px;
                    }

                    .isNoSpec {
                        background-color: #CCCCCC;
                    }
                }
            }
        }

        /* 地址弹框 */
        .addressDiv {
            .address {
                position: absolute;
                top: auto;
                bottom: 0;
                left: 0;
                right: 0;
                width: 100%;
                background-color: #fff;
                border-radius: 20px 20px 0px 0px;

                ul {
                    padding: 40px 26px;
                    max-height: 1200px;
                    min-height: 800px;
                    overflow: scroll;

                    li {
                        width: 100%;
                        border-bottom: 1px solid #eeee;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: #999;
                        padding: 40px 0;

                        >div {
                            p {
                                padding: 8px 0;
                                color: #4c4c4c;
                                font-size: 30px;
                            }
                        }

                        img {
                            width: 10px;
                            height: 18px;
                        }

                        &:nth-child(1) {
                            position: relative;
                            justify-content: center;
                            color: #333;
                            font-size: 30px;
                            padding: 0 0 40px;

                            img {
                                position: absolute;
                                right: 0px;
                                width: 26px;
                                height: 26px;
                            }
                        }

                        &:last-child {
                            color: #333;
                            font-size: 30px;
                        }
                    }
                }
            }
        }

        /* 添加地址弹框 */
        .addDiv {
            position: absolute;
            width: 600px;
            margin-left: -300px;
            margin-top: -400px;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            border-radius: 20px;
            top: 50%;
            left: 50%;
            background-color: #fff;

            b {
                padding: 40px 0;
                text-align: center;
                display: block;
                font-size: 30px;
            }

            >div {
                padding: 20px;

                p {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    padding: 20px 0;
                    border-top: 1px solid #ccc;
                    font-size: 28px;

                    input {
                        flex: 1;
                        width: 140px;
                        border: none;
                        font-size: 28px;
                    }

                    .mint-button {
                        width: 160px;
                        height: 160px;
                        -webkit-border-radius: 50%;
                        -moz-border-radius: 50%;
                        border-radius: 50%;
                        margin: 0 auto;
                    }
                }
            }
        }

        /* 地址选择弹框 */
        .chooseAddress {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin: auto;
            z-index: 999;
            background: rgba(0, 0, 0, .6);

            .addressDiv {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 600px;
                padding: 0 26px;
                background-color: #fff;
                -webkit-border-radius: 20px 20px 0 0;
                -moz-border-radius: 20px 20px 0 0;
                border-radius: 20px 20px 0 0;

                .addressTop {
                    height: 100px;
                    line-height: 100px;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .divFl {
                        span {
                            width: auto;
                            font-size: 30px;
                            color: #4c4c4c;
                            margin-right: 20px;
                            border-bottom: 4px solid #FF4862;
                        }
                    }

                    .divFr {
                        i {
                            width: 28px;
                            height: 28px;
                            background: url("../../imgs/address/icon-close-addressChoose.png") no-repeat center /100%;
                        }
                    }
                }

                .addressBody {
                    max-height: 500px;
                    overflow: scroll;

                    ul {
                        li {
                            height: 80px;
                            line-height: 80px;
                            font-size: 30px;
                            color: #4c4c4c;
                        }
                    }
                }

            }
        }
    }
</style>