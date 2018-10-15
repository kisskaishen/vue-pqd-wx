<template>
    <div :class='{"detail":true,"dialogPicDiv_slef":is_share_false}'>
        <div class="header">
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
            <!-- 该商品所在商家信息 -->
            <goods-store :storeInfo="goodsInfo" :storeId="goodsInfo.merchant_info.store_id"></goods-store>
            <div class="btn_current_warp">
                <!-- <button class="btn_current" @click="showSpecDiv(item,index,item.price)">我要免费拿</button> -->
                <button class="btn_current" @click="showSpecDiv(goodsInfo,'400')">我要免费拿</button>
            </div>
            <!-- 评价模块 -->
            <detail-review :info="reviewInfo" :list="reviewInfo.new"></detail-review>
            <div class="box_warp">
            </div>
        </div>

        <wx-config></wx-config>


        <!-- 遮罩 -->
        <transition name="fade">
            <div class="modal" v-show="is_share_false">
                <div class="modal_wrapper">
                    <div class="picDiv">
                        <div class="" v-if="this.$getCookie('terminal')!=''">
                            <div class="shareDiv">
                                <div class="shareDivWhere">
                                    <div @click="shareWx">
                                        <i></i>
                                        <span>微信好友</span>
                                    </div>
                                    <div @click="sharePyq">
                                        <i></i>
                                        <span>微信朋友圈</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="close" @click="closePicDiv"></div>
                    </div>
                </div>
            </div>
        </transition>


        <!--规格弹框-->
        <div class="specDiv dialogDiv" v-if="specShow">
            <div class="bg" @click="closeSpecDiv"></div>
            <div class="spec">
                <div class="goodsInfo">
                    <div class="divFl">
                        <img :src="currentImg||specInfo.spec_goods_price[0].img" alt="">
                        <div class="info">
                            <p>{{currentName}}</p>
                            <span class="red showCash">¥{{currentPrice || '0.00'}} <span class="oldCash">¥{{currentOldprice}}</span></span>



                            <!-- <label>已选：<span>{{index1Item}}</span><span v-if="index2Item">+{{index2Item}}</span></label>key_name -->
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
                                :disabled="item.limit_stock=='0'?true:false"
                                @click="spec1Change(item,index)">
                                <span>{{item.item}}</span>
                                <span v-if="item.limit_stock=='0'">（已售罄）</span>
                            </li>
                        </ul>
                    </div>
                    <div class="infoSpec" v-if="specInfo.spec.length == '2'">
                        <p>{{specInfo.spec[1].name}}</p>
                        <ul>
                            <li v-for="item,index in specInfo.spec[1].item" :class="index==current2Index?'active':''"
                                :disabled="item.limit_stock=='0'?true:false"
                                @click="spec2Change(item,index)">
                                <span>{{item.item}}</span>
                                <span v-if="item.limit_stock=='0'">（已售罄）</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="submitBtn">
                    <button @click="showAddress" v-if="specStorage">免费抢</button>
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

    </div>
</template>

<script>

    import DetailBanner from '../../components/goods/detailBanner'
    import GoodsInfo from '../../components/cut_price/cut_price_goods_info'
    import GroupInfo from '../../components/goods/groupInfo'
    import DetailReview from '../../components/goods/detailReview'
    import GoodsStore from '../../components/cut_price/cut_price_detail'
    import GoodsDetail from '../../components/goods/goodsDetail'

    import OperateBottom from '../../components/operateBottom'
    import GoodsSpec from '../../components/goods/GoodsSpec'
    import CouponDiv from '../../components/goods/couponDiv'
    import {Toast, MessageBox, Indicator} from 'mint-ui';

    import wx from 'weixin-js-sdk';         // 引入微信sdk
    import wxConfig from '../../components/wx/wxconfig'


    export default {
        data() {
            return {
              goods_id: '',                // 商品id
              activity_goods_id: '',       //活动ID
              id: '',                  // 用于规格
              specInfo: {spec: [{item: []}], spec_goods_price: []},                 // 规格信息
              current1Index: '0',
              index1Id: '',
              index1Item: '',
              current2Index: '0',
              index2Id: '',
              index2Item: '',
              currentIndex: this.$route.query.currentIndex == '2' ? '2' : '1',
                spec_id: '',                 // spec的组合id，if只有一个规格就是index1Id
                currentImg: '',              // 当前图片地址
                currentPrice: '',              // 当前商品规格的价格
                currentName: '',             // 商品名称
                addressList: [],             // 地址列表
                addAddress: false,                // 添加地址的弹框
                specShow: false,         // 规格弹框
                addressShow: false,
                specShow: false,         // 规格弹框
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

                ind0: '',
                ind1: '',
                number: 1,
                isDisabled: true,
                buyTypeNumVal: this.$route.query.group_id ? '2' : '',

                isCouponShow: false,
                storeCouponList: {merchant: [], tips: []},   // 优惠券
                isShowLoading: true,

                url: '',
                showPic: false,
                is_share_false: false,
                activity_goods_id:'',
                users_bargain_activity_id:''
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
          this.activity_goods_id = this.$route.query.activity_goods_id;
            this.users_bargain_activity_id = this.$route.query.users_bargain_activity_id;
        },
        // mixins: [assign],
        mounted() {
            window.addEventListener('scrollTop', this.scroll())
            this.getGoodsInfo()         // 商品详情
            this.getGroup()
        },

        methods: {
          getPicture() {
              let self = this;
              // Indicator.open({
              //     text: '砍价中...',
              //     spinnerType: 'snake'
              // });
              var isApp = 1;
              // isApp==1  app  isApp==2  h5
              if(this.$getCookie('terminal')!=''){
                isApp = 1;
              }else{
                isApp = 2;
              }
              this.$post('bargain/createBargain', {
                  token: this.$getCookie('token'),
                  activity_goods_id: this.activity_goods_id,
                  goods_id: this.goods_id,
                  goods_spec_key: this.groupId,
                  address_id: this.address_id,
                  is_app:isApp
              })
                  .then(res => {
                      // console.log(JSON.stringify(res))
                      // this.likeInfo = res
                      // this.share_img = res.share_img
                      // Indicator.close();
                      self.$router.push({
                          path: "/activity/bargain/info",
                          query: {
                              users_bargain_activity_id: res.users_bargain_activity_id,
                              is_show: '1',
                              first_create: '1',
                              activity_goods_id:this.activity_goods_id,
                          }
                      })
                      // this.showPic = true
                  })
                  .catch(err => {
                      // Indicator.close();
                  })
          },
          // 点击马上抢显示规格弹框
          showSpecDiv(val,oldPrice, ev) {
              var oEvent = ev || event;
              this.id = val.id;
              this.goods_id = val.goods_id;
              this.currentName = val.goods_name
              this.currentOldprice = oldPrice;
              this.getSpec();
              oEvent.cancelBubble = true;
          },
          // 显示地址弹框
          showAddress() {
              this.specShow = false
              this.getAddressList()
              this.addressShow = true
          },
          // 获取地址列表
          getAddressList() {
              // let self = this
              this.$post('user/getAddressList', {
                  token: this.$getCookie('token')
              })
                  .then(res => {
                      this.addressList = res.list
                  })
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
                  })
                      .then(res => {
                          this.address_id = res.address_id
                          this.addAddress = false
                          this.addAddressName = ''
                          this.addAddressText = ''
                          this.address_base = ''
                          this.mobile = ''
                          // setTimeout(() => {
                          //     self.getPicture()
                          // }, 200)
                          // self.$router.push({
                          //     path: "/activity/bargain/info",
                          //     query: {
                          //         users_bargain_activity_id: res.users_bargain_activity_id,
                          //         is_show: '1',
                          //         first_create: '1',
                          //         activity_goods_id:this.activity_goods_id,
                          //     }
                          // })
                      })
              }
          },
          // 选择地址
          choooseAddress(val) {
              var self = this;
              this.address_id = val.address_id
              this.addressShow = false
              let res = `${val.consignee}   ${val.mobile}   ${val.address}${val.address_base} `
              MessageBox.confirm(res, '请您确认收货地址').then(action => {
                  if (action == 'confirm') {
                    this.getPicture()
                  }
              });

          },
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
          closeAddressDiv() {
              this.addressShow = false
              this.addAddress = false
          },
          // 获取规格
          getSpec() {
              this.$post('bargain/getSpecItem', {
                  activity_goods_id: this.activity_goods_id,
                  token: this.$getCookie('token')
              })
                  .then(res => {
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
          // 规格选择   // 规格1
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
          // 规格2
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
            goToCutPriceActive() {
                // this.$router.push({path: "/activity/bargain"})
            },
            scroll() {
                this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
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
            closePicDiv() {
                this.showPic = false;
                this.is_share_false = false;
            },
            shareTip() {
                if (this.$getCookie('terminal') == '') {
                    Toast({
                        message: '请点击右上角分享',
                        duration: 1400
                    })
                } else {
                    this.showPic = true;
                    this.is_share_false = true;
                }
            },
            // 获取商品详情
            getGoodsInfo() {
                this.$post('goods/getGoodsDetail', {
                    goods_id: this.$route.query.goods_id,
                    token: this.$getCookie('token') ? this.$getCookie('token') : ''
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
                // let self = this;
                // self.$post('merchant/getMerchantCouponList', {
                //     token: self.$getCookie('token') ? self.$getCookie('token') : '',
                //     store_id: self.goodsInfo.store_id
                // })
                //     .then(res => {
                //         self.storeCouponList = res
                //     })
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
            shareWx() {
                var share_img = this.shareInfo.share_img;
                var share_url = this.shareInfo.share_url;
                var share_title = this.shareInfo.share_title;
                var share_desc = this.shareInfo.share_desc;
                if (this.$getCookie('terminal') == 'i') {
                    window.shareUrl(0, share_img, share_url, share_title, share_desc)
                } else if (this.$getCookie('terminal') == 'a') {
                    window.webview.shareUrl(0, share_img, share_url, share_title, share_desc)
                }
            },
            sharePyq() {
                var share_img = this.shareInfo.share_img;
                var share_url = this.shareInfo.share_url;
                var share_title = this.shareInfo.share_title;
                var share_desc = this.shareInfo.share_desc;
                if (this.$getCookie('terminal') == 'i') {
                    window.shareUrl(1, share_img, share_url, share_title, share_desc)
                } else if (this.$getCookie('terminal') == 'a') {
                    window.webview.shareUrl(1, share_img, share_url, share_title, share_desc)
                }
            },
            // 分享
            share() {
                var self = this;
                wx.ready(() => {
                    // 分享朋友圈
                    wx.onMenuShareTimeline({
                        title: this.shareInfo.share_title, // 分享标题
                        link: this.shareInfo.share_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: this.shareInfo.share_img, // 分享图标
                        success: function () {
                            self.getShareNumber()
                            Toast({
                                message: '分享成功',
                                duration: 1600
                            })
                        },
                        cancel: function () {
                            self.getShareNumber()
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
                            self.getShareNumber()
                            Toast({
                                message: '分享成功',
                                duration: 1600
                            })
                        },
                        cancel: function () {
                            self.getShareNumber()
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
        width: 100%;
        height: 100%;
    }

    .dialogPicDiv_slef {
        /* // position: absolute;
      // left: 0;
      // right: 0;
      // bottom: 0;
      // top: 0;
      // margin: 0;
      // z-index: 2;
      // -webkit-filter: blur(10px);
      // overflow: hidden; */
    }

    .shareDiv {
        position: fixed;
        bottom: 200px;
        left: 0;
        right: 0;
        padding: 20px;

        .shareDivWhere {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;

            > div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 0 50px;

                i {
                    display: block;
                    width: 120px;
                    height: 120px;
                    margin-bottom: 16px;
                }

                span {
                    font-size: 26px;
                    color: #fff;
                }

                &:nth-child(1) {
                    i {
                        background: url("../../imgs/like/icon-share-wx.png") no-repeat center /100%;
                    }
                }

                &:nth-child(2) {
                    i {
                        background: url("../../imgs/like/icon-share-pyq.png") no-repeat center /100%;
                    }
                }
            }
        }
    }

    .modal {
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.7);
        z-index: 1000;
        width: 100%;
        color: #fff;
        overflow: hidden;

        .modal_wrapper {
            .close {
                position: absolute;
                bottom: 55px;
                left: 50%;
                text-align: center;
                margin-left: -30px;
                z-index: 9999;
                width: 60px;
                height: 60px;
                background: url("../../imgs/like/icon-close.png") no-repeat center /100%;
            }

            .arrow_right_tip {
                position: absolute;
                right: 60px;
                top: 20px;
                width: 80px;
                height: 100px;
            }
        }
    }

    .box_warp {
        width:100%;
        height: 160px;
    }

    .btn_current_warp {
        width: 100%;
        text-align: center;
        position: fixed;
        bottom: 0;
        left: 0;
        background: rgba(255, 255, 255, 1);
    }

    .btn_current {
        width: 90%;
        height: 98px;
        line-height: 98px;
        background: #FF4862;
        text-align: center;
        border-radius: 10px;
        margin: 0 auto;
        margin: 20px 0;
        font-size: 34px;
    }

    .detail {
        margin-bottom: 60px;

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
                    > div {
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
        > div {
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

    .picker {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 500px;
        background-color: #fff;
        z-index: 999;
    }

    .payBtn {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 999;
        .mint-button {
            width: 100%;
            height: 100px;
            font-size: 30px;
        }
    }

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
                    > div {
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
        > div {
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

    .picker {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 500px;
        background-color: #fff;
        z-index: 999;
    }

    .payBtn {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 999;
        .mint-button {
            width: 100%;
            height: 100px;
            font-size: 30px;
        }
    }

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
                    .showCash{
                      display: inline-block;
                      width:240px;
                    }
                    .oldCash{
                      display: inline-block;
                      width:120px;
                      line-height: 24px;
                      font-size:24px;
                      color:#999;
                      margin-left:20px;
                      text-decoration:line-through;
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
                        & > span {
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
                > p {
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
</style>
