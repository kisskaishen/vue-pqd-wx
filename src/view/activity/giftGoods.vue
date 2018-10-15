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
                <!-- <div @click="shareTip">
                    <img src="../../imgs/detail/icon-share.png" alt="">
                </div> -->
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
            <!-- <goods-info :info="goodsInfo" :couponInfo="storeCouponList" @isCouponDivShow="isCouponDivMethods"></goods-info> -->
            <div class="goodsBaseInfo">
                <div class="top">
                    <div class="price">
                        <div class="pqdPrice">
                            <b><span>￥</span>{{goodsInfo.market_price}}</b>
                        </div>
                        <!-- <div class="salePrice">
                            <span class="marketPrice">￥{{goodsInfo.market_price}}</span>
                        </div> -->
                        <div class="tips" v-if="goodsInfo.activity.tips!=''">
                            <p>{{goodsInfo.activity.tips}}</p>
                        </div>
                    </div>
                    <div class="saleNum">
                        <span>已售{{goodsInfo.sales}}件</span>
                    </div>
                </div>
                <div class="goodsName">
                    <b>{{goodsInfo.goods_name}}</b>
                </div>
                <div class="tip" v-if="goodsInfo.goods_tips">
                    <div v-for="item,index in goodsInfo.goods_tips" :key="item.type">
                        <i></i>
                        <span>{{item.name}}</span>
                    </div>
                </div>
            </div>

            <!-- 该商品已经拼团情况 -->
            <!-- <group-info @listenShowSpec="goShowSpec"></group-info> -->
            <!-- 评价模块 -->
            <detail-review :info="reviewInfo" :list="reviewInfo.new"></detail-review>
            <!-- 该商品所在商家信息 -->
            <goods-store :storeInfo="goodsInfo" :storeId="goodsInfo.merchant_info.store_id"></goods-store>
            <!-- 商品其他详情信息 -->
            <goods-detail :moreInfo="goodsInfo.images_list.detail_img"></goods-detail>
            <!--操作底栏-->
            <!-- <div class="fixedBottom">
                <operate-bottom @buyClick="buyType" :bottomInfo="goodsInfo"></operate-bottom>
            </div> -->
            <!--规格弹框-->
            <!-- <goods-spec :specGoodsInfo="goodsInfo" :isShowSpec="showSpec" @reviseSpec="specHide" :buyTypeNum="buyTypeNumVal"
                @isCouponDivShow="isCouponDivMethods" :limitInfo="goodsInfo" :groupInfo="groupData"></goods-spec> -->
            <!--领券弹框-->
            <!-- <coupon-div :isCouponStatus="isCouponShow" :info="goodsInfo" :coupon='storeCouponList' @closeCoupon="closeCouponDiv"></coupon-div> -->

            <div class="fixed-btn-box">
                <button class="fixed-btn" v-if="btnStatus==1" @click.stop="showSpecDiv">免费送</button>
                <button class="fixed-btn abnormal" v-if="btnStatus==2" @click.stop="">已售罄</button>
            </div>

            <!--规格弹框-->
            <div class="specDiv dialogDiv" v-if="specShow">
                <div class="bg" @click="closeSpecDiv"></div>
                <div class="spec">
                    <div class="goodsInfo">
                        <div class="divFl">
                            <img :src="currentImg||specInfo.spec_goods_price[0].img" alt="">
                            <div class="info">
                                <!-- <p>{{currentName}}</p> -->
                                <p>{{goodsInfo.goods_name}}</p>
                                <span class="red">￥{{goodsInfo.market_price || '0.00'}}</span>
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
    import { Toast, MessageBox } from 'mint-ui';

    import wx from 'weixin-js-sdk';         // 引入微信sdk
    import wxConfig from '../../components/wx/wxconfig'

    import myaddress from '../../components/area.json'


    export default {
        data() {
            return {
                scrollTop: '',
                showSpec: this.$route.query.group_id ? true : false,
                goodsInfo: {
                    images_list: { banner: [], detail_img: [] },
                    merchant_info: {},
                    store_coller: {},
                    comment_tags: { new: {}, tags: [] }
                },
                reviewInfo: { new: {}, tags: [] },      // 评价
                groupInfo: '',
                storeInfo: '',
                shareInfo: {},

                groupData: '',           // 拼团id

                ind0: '',
                ind1: '',
                number: 1,
                isDisabled: true,
                buyTypeNumVal: this.$route.query.group_id ? '2' : '',

                isCouponShow: false,
                storeCouponList: { merchant: [], tips: [] },   // 优惠券
                isShowLoading: true,

                url: '',

                specShow: false,    //规格弹窗
                addressShow: false, // 地址弹窗

                goods_id: '',                // 商品id
                // activity_goods_id: '',       // 活动ID
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
            this.btnStatus = this.$route.query.isBtn
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
            // isCouponDivMethods(val) {
            //     this.isCouponShow = val
            // },
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
                    token: this.$getCookie('token') ? this.$getCookie('token') : ''
                }).then((res) => {
                    this.goodsInfo = res
                    this.reviewInfo = res.comment_tags
                    this.isShowLoading = false
                    this.getCoupon()
                    this.shareInfo = res.share
                    this.share()
                    this.goodsInfo.market_price = this.$route.query.price
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
                        title: this.shareInfo.share_title, // 分享标题
                        desc: this.shareInfo.share_desc, // 分享描述
                        link: this.shareInfo.share_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: this.shareInfo.share_img, // 分享图标
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

            // 点击我要它显示规格弹框
            showSpecDiv(val, index) {
                this.goods_id = this.$route.query.goods_id
                this.activity_goods_id = this.$route.query.activity_goods_id
                // this.currentName = this['goods' + (this.goodsIndex + 1)].list[index].goods_name
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
                    }, 500);
                })
            },

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

            >div {
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

        .fixed-btn-box {
            padding: 20px 25px;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 100;
            background: #fff;

            .fixed-btn {
                width: 100%;
                height: 100px;
                background: #FF4862;
                color: #ffffff;
                font-size: 32px;
                border-radius: 8px;

                &.abnormal {
                    background-color: #CCCCCC;
                }
            }
        }
    }

    .goodsBaseInfo {
        position: relative;
        margin-top: -20px;
        -webkit-border-radius: 30px;
        -moz-border-radius: 30px;
        border-radius: 20px;
        background-color: #fff;
        width: 100%;

        >div {
            padding: 0 26px;
        }

        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #666;
            font-size: 24px;

            .price {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 20px 0 10px;

                .pqdPrice {
                    margin-right: 20px;
                    font-size: 58px;
                    color: #ff4842;

                    span {
                        font-size: 28px;
                    }
                }

                .salePrice {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    font-size: 24px;
                    line-height: 28px;

                    .marketPrice {
                        text-decoration: line-through;
                        color: #999;
                    }

                    /*text-decoration: line-through;*/
                    /*font-size: 20px;*/
                }

                .tips {
                    margin-left: 20px;

                    p {
                        padding: 4px 8px;
                        background-color: #FDE750;
                        color: #333;
                        position: relative;

                        &:after {
                            position: absolute;
                            content: '';
                            left: -16px;
                            top: 50%;
                            transform: translateY(-50%);
                            border-right: 12px solid #FDE750;
                            border-top: 10px solid transparent;
                            border-bottom: 10px solid transparent;
                        }

                    }
                }
            }

            .saleNum {
                color: #4c4c4c;
                font-size: 28px;
            }
        }

        .topCoupon {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            button {
                color: #ff4862;
                padding: 10px 20px;
                background-color: #fff2f1;
                border-radius: 6px;
            }

            p {
                max-width: 240px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                span {
                    color: #4c4c4c;
                }
            }
        }

        .couponDiv {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 26px 20px;
            color: #666;

            >div {
                display: flex;
                justify-content: flex-start;
                align-items: center;

                >div {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    padding: 16px 0;
                    margin-right: 20px;

                    i {
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        margin-right: 10px;
                        vertical-align: middle;
                        background: url("../../imgs/detail/icon-quan.png") no-repeat center /100%;
                        box-sizing: border-box;
                    }

                    span {
                        color: #4C4C4C;
                    }

                }
            }

            >i {
                width: 10px;
                height: 18px;
                background: url("../../imgs/index/icon-arrow-right-gray.png") no-repeat center /100%;
            }
        }

        .coupon {
            background-color: #fff;

            /*border-bottom: 1px solid #ccc;*/
            a {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 100%;
                padding: 10px 0;

                >div {
                    margin-right: 20px;

                    i {
                        display: inline-block;
                        width: 40px;
                        height: 40px;
                        text-align: center;
                        line-height: 44px;
                        margin-right: 8px;
                        font-style: normal;
                        -webkit-border-radius: 6px;
                        -moz-border-radius: 6px;
                        border-radius: 6px;
                        color: #fff;
                        background-color: red;
                    }

                    span {
                        color: #888;
                    }
                }
            }
        }

        .goodsName {
            padding: 0 26px;
            background-color: #fff;

            b {
                display: block;
                font-size: 28px;
                color: #000;
                font-weight: normal;
                line-height: 54px;
                font-size: 36px;

            }

            span {
                font-size: 20px;
                color: #666;
            }
        }

        .tip {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0 26px 20px;
            border-bottom: 1px solid #eee;

            >div {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 10px 0;
                margin-right: 20px;

                i {
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    margin-right: 10px;
                    vertical-align: middle;
                    background: url("../../imgs/detail/icon-tip.png") no-repeat center /100%;
                    box-sizing: border-box;
                }

                span {
                    color: #4C4C4C;
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
</style>