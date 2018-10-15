<template>
  <div class="cut_price_page">
  <div :class='{"cut_price_detail":true,"dialogPicDiv_slef":is_share_false_warp}'>
      <div class="banner">
          <div class="gold_axe_tips" v-show="bargain_info.burst_count_tips">
            <div class="gold_axe_tips_text">
              {{bargain_info.burst_count_tips}}
            </div>
            <div class="right_rows">
                    </div>
                </div>
                <!-- <div class="gold_axe" v-show="bargain_info.burst_count">22222 -->
                <div class="gold_axe" v-show="bargain_info.burst_count">
                    <div class="gold_axe_warp" @click="goldenAxe(bargain_info.burst_count)">
                        <img class="participants" src="../../imgs/cut_price/gold_1.png" alt=""><span>X{{bargain_info.burst_count}}</span>
                    </div>
                </div>
                <div class="flow">
                    <button @click="goRules">活动规则</button>
                </div>
                <!-- <div class="user_infos">2222 -->
                <dl class="user_infos_warp">
                    <dt><img class="author" :src="bargain_info.user_head_img" alt=""></dt>
                </dl>
                <dd class="user_name">
                    {{bargain_info.user_nickname}}
                </dd>
                <!-- <div class="">
                    <fail-time v-if="bargain_info.down_status==1" @changeTime="upDataDetail" :status="bargain_info.down_status" :endTime="bargain_info.fail_order_time"></fail-time>
                </div> 22222-->
                <div class="times">
                    <times-cut-price v-if="isRefresh" @changeTime="upDataDetail" :order_sn="bargain_info.order_sn"
                                     :status="bargain_info.down_status" :endTime="bargain_info.end_time"
                                     :endTimeFail="bargain_info.fail_order_time"></times-cut-price>
                </div>
                <!-- <div class="times" v-if="bargain_info.down_status==2">
                    很遗憾,砍价失败
                </div>
                <div class="times" v-if="bargain_info.down_status==3">
                    恭喜您,砍价成功
                </div> -->
                <!-- </div> -->
                <img class="show_img" src="../../imgs/cut_price/bg_1.png" alt="">
                <dl class="goods_detail" @click="goDetail(bargain_info)">
                    <dt class="imgs">
                        <img class="author" :src="bargain_info.list_img" alt="">
                    </dt>
                    <dd class="warp">
                        <div class="title">
                            {{bargain_info.goods_name}}
                        </div>
                        <div class="detail">
                            <div class="detail_warp">
                                <div class="red">¥{{bargain_info.bargain_price}}</div>
                                <div class="item">{{bargain_info.sale}}人砍价成功，0元拿 &nbsp;</div>
                            </div>
                        </div>
                    </dd>
                </dl>
            </div>
            <div class="main">
                <div class="icon_warp">
                    <div class="color_line">

                    </div>
                    <div class="color_img">
                        <img class="axe_img" src="../../imgs/cut_price/axe_counts.gif" alt="">
                    </div>
                </div>
                <div class="text_result" v-show="bargain_info.surplus_price!=0">
                    已砍<span class="red">¥{{bargain_info.already_price}}</span>,剩余<span class="red">¥{{bargain_info.surplus_price}}</span>元
                </div>
                <!-- <div class="text_result" v-show="bargain_info.use.is_bargain==1">{{bargain_info.use.tips}}</div> -->
                <div v-for="childs in buttonArr" v-show="childs.is_show==1" class="btn_current"
                     @click="shareFriend(bargain_info,childs)">
                    <button>{{childs.name}}</button>
                </div>
                <div class="line_has">
                    <div class="centerTop">
                        <b>斧头帮</b>
                    </div>
                    <ul class="cut_info">
                        <li v-for="item in listData">
                            <dl class="user_info">
                                <dt>
                                    <img class="user_icon" :src="item.head_img" alt="">
                                </dt>
                                <dd>
                                    <div class="tit">{{item.nickname}}</div>
                                    <div class="detail">{{item.tips}}</div>
                                </dd>
                            </dl>
                            <dl class="price">
                                <dt>
                                    <img v-for="child in item.burst" v-show="child==1" class="participants"
                                         src="../../imgs/cut_price/silver.png" alt="">
                                    <img v-for="child in item.burst" v-show="child==2" class="participants"
                                         src="../../imgs/cut_price/gold_1.png" alt="">
                                </dt>
                                <dd>
                                    <div class="tit">
                                        砍掉<span class="red">¥{{item.count_price}}元</span>
                                    </div>
                                </dd>
                            </dl>
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
                                    <b class="red">¥{{item.prom_price}}</b>
                                    <label>已拼<span>{{item.sales}}件</span></label>
                                </p>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <!--图片显示-->
            <!-- <div class="dialogPicDiv" v-if="false"> -->
            <div class="dialogPicDiv" v-if="showPic">
                <div class="bg" @click="closePicDiv"></div>
                <div class="picDiv">
                    <img v-if="!is_false_img" class="loading_gif" src="../../imgs/cut_price/axe_pp.gif"/>
                    <div v-if="!is_false" class="dialog_warp">
                        <div class="dialog_warp_content">
                            <dl class="dialog_warp_dl">
                                <dt><img class="axe_count" src="../../imgs/cut_price/axe_counts.gif"></dt>
                                <dd v-html="slef_tips"></span></dd>
                            </dl>
                            <button class="share_btn" @click="shareBtn">
                                <div class="add_icon">
                                    <div class="add_icons">

                                    </div>
                                    <div class="text">
                                        分享给好友,继续砍价吧
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div v-if="!is_false" class="close" @click="closePicDiv"></div>
                    </div>
                    <!-- <div class="shareDiv" v-if="this.$getCookie('terminal')">
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
                    </div> -->
                </div>
            </div>

            <wx-config></wx-config>
        </div>

        <!-- 遮罩 -->
        <transition name="fade">
            <div class="modal" v-show="is_share_false">
                <div class="modal_wrapper">
                    <div class="picDiv">
                        <div class="" v-if="this.$getCookie('terminal')==''">
                            <img class="arrow_right_tip" src="../../imgs/cut_price/arrow.png"/>
                            <div class="share_tips_warp">
                                <div class="share_tips_warp_text">还差<span
                                    class="red">{{bargain_info.surplus_price}}元</span>点击右上角继续分享
                                </div>
                                <div class="share_tips_warp_text">
                                    快去喊好友帮你砍价吧
                                </div>
                            </div>
                        </div>
                        <div class="" v-else-if="this.$getCookie('terminal')!=''">
                            <div class="share_tips_warp_ios">
                                <div class="share_tips_warp_text">还差<span
                                    class="red">{{bargain_info.surplus_price}}元</span>点击按钮继续分享
                                </div>
                                <div class="share_tips_warp_text">
                                    快去喊好友帮你砍价吧
                                </div>
                            </div>
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
                      <span class="red">¥{{currentPrice || '0.00'}}</span>
                      <label>已选：<span>{{index1Item}}</span><span v-if="index2Item">+{{index2Item}}</span></label>

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
  <!--添加地址弹框-->
  <div class="addAddressDiv dialogDiv" v-if="addAddress">
      <div class="bg" @click="closeAddressDiv"></div>
      <div class="addDiv">
          <b>添加地址</b>
          <div>
              <p>
                  <input type="text" placeholder="名字" v-model="addAddressName"
                         style="border-right: 1px solid #ccc;">
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
  <!-- 遮罩 -->
    <transition name="fade">
      <div class="modal" v-show="new_help_cut">
        <div class="modal_wrapper">
            <div class="picDiv">
                <div class="" v-if="this.$getCookie('terminal')==''">
                    <div class="dialog_tip_warp">
                        <div class="closes" @click="closePicDivHelp">
                            X
                        </div>
                        <div class="img_warp">
                              <img class="author" :src="bargain_info.user_head_img" alt="">
                        </div>
                        <!-- <div class="content_text">
                            去APP中帮我砍价，一斧可以多砍<span class="red">18.8元</span>哦,获得金斧子的几率更高哦~
                        </div>tips_join_tpl -->
                        <!-- <div class="content_text">
                            <span v-show="false">送你一把<span class="glod_text">金斧子</span>,</span>你也可以免费领取商品哦,快去挑选心仪的商品吧~
                        </div> -->
                        <div class="content_text" v-html="tips_join_tpl">
                        </div>
                        <div class="btn_return"  @click="goToAPPMyCutPrice()">
                          前往APP帮忙砍价
                        </div>
                    </div>
                </div>
                <div class="" v-else-if="this.$getCookie('terminal')!=''">
                    <div class="dialog_tip_warp">
                        <div class="closes" @click="closePicDivHelp">
                            X
                        </div>
                        <div class="img_warp">
                            <img class="author" :src="bargain_info.user_head_img" alt="">
                        </div>
                        <!-- <div class="success_text">
                            谢谢你帮我砍了<span>3.98元</span>
                        </div> -->
                        <div class="content_text" v-html="tips_join_tpl">
                        </div>
                        <div class="btn_return"  @click="goToAPPMyCutPrice()">
                          前往APP帮忙砍价
                        </div>
                    </div>
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
                <div class="close" @click="closePicDivHelp"></div>
            </div>
          </div>
      </div>
  </transition>
  <!-- 遮罩 -->
    <transition name="fade">
      <div class="modal" v-show="help_cut_free">
        <div class="modal_wrapper">
            <div class="picDiv">
                <div class="" v-if="this.$getCookie('terminal')==''">
                    <div class="dialog_tip_warp">
                        <div class="closes" @click="closePicDivHelpFree">
                            X
                        </div>
                        <div class="img_warp">
                              <img class="author" :src="bargain_info.user_head_img" alt="">
                        </div>
                        <div class="content_text" v-html="tips_create_tpl">
                        </div>
                        <div class="btn_return"  @click="goToAPPMyCutPrice()">
                          前往APP帮忙砍价
                        </div>
                    </div>
                </div>
                <div class="" v-else-if="this.$getCookie('terminal')!=''">
                    <div class="dialog_tip_warp">
                        <div class="closes" @click="closePicDivHelpFree">
                            X
                        </div>
                        <div class="img_warp">
                              <img class="author" :src="bargain_info.user_head_img" alt="">
                        </div>
                        <div class="content_text" v-html="tips_create_tpl">
                        </div>
                        <div class="btn_return"  @click="goToAPPMyCutPrice()">
                          前往APP帮忙砍价
                        </div>
                    </div>
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
                <div class="close" @click="closePicDivHelpFree"></div>
            </div>
          </div>
      </div>
  </transition>

<!-- 遮罩 -->
<transition name="fade">
  <div class="modal" v-show="publicAddress">
    <div class="modal_wrapper">
        <div class="picDiv">
            <div class="" v-if="this.$getCookie('terminal')==''">
                <div class="dialog_tip_warp_PublicAddress">
                    <div class="title_text">
                        关注拼趣多官方微信
                    </div>
                    <div class="title_text">
                        您就有机会以超低价买到这件商品
                    </div>
                    <div class="img_warp">
                        <img class="id_code" src="https://cdn2.pinquduo.cn/it/44105F14-6DBF-43b6-B670-C4DCC09F0F1D.png" alt="">
                    </div>
                    <div class="title_text">
                        长按识别二维码
                    </div>
                </div>
            </div>
            <div class="" v-else-if="this.$getCookie('terminal')!=''">
                <div class="dialog_tip_warp_PublicAddress">
                    <div class="title_text">
                        关注拼趣多官方微信
                    </div>
                    <div class="title_text">
                        您就有机会以超低价买到这件商品
                    </div>
                    <div class="img_warp">
                        <img class="id_code" src="https://cdn2.pinquduo.cn/it/44105F14-6DBF-43b6-B670-C4DCC09F0F1D.png" alt="">
                    </div>
                    <div class="title_text">
                        长按识别二维码
                    </div>
                </div>
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
            <div class="close" @click="closePublicAddress"></div>
        </div>
      </div>
  </div>
</transition>


<!-- 遮罩 -->
  <transition name="fade">
    <div class="modal" v-show="help_friend_cut">
      <div class="modal_wrapper">
          <div class="picDiv">
                <img v-if="!is_false_img" class="loading_gif" src="../../imgs/cut_price/axe_pp.gif"/>
              <div class="" v-if="this.$getCookie('terminal')==''&&is_false_img">
                  <div class="dialog_tip_warp">
                      <div class="closes" @click="closePicDivHelpCurrent">
                          X
                      </div>
                      <div class="img_warp">
                            <img class="author" :src="bargain_info.user_head_img" alt="">
                      </div>
                      <div class="success_text" v-html="help_news">
                      </div>
                      <div class="content_text" v-html="gold_is_true">
                      </div>
                      <div class="btn_return"  @click="goToMyCutPrice()">
                        我也要去拿
                      </div>
                  </div>
              </div>
              <div class="" v-else-if="this.$getCookie('terminal')!=''">
                  <div class="dialog_tip_warp">
                      <div class="closes" @click="closePicDivHelpCurrent">
                          X
                      </div>
                      <div class="img_warp">
                            <img class="author" :src="bargain_info.user_head_img" alt="">
                      </div>
                      <div class="success_text" v-html="help_news">
                      </div>
                      <div class="content_text" v-html="gold_is_true">
                          <!-- <span v-show="gold_is_true">送你一把<span class="glod_text">金斧子</span>,</span>你也可以免费领取商品哦,快去挑选心仪的商品吧~ -->
                          <!-- {{gold_is_true}} -->
                      </div>
                      <div class="btn_return"  @click="goToMyCutPrice()">
                        我也要去拿
                      </div>
                  </div>
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
              <div class="close" v-show="is_false_img" @click="closePicDivHelpCurrent"></div>
          </div>
        </div>
    </div>
</transition>

  </div>
</template>

<script>
    import wx from 'weixin-js-sdk';         // 引入微信sdk
    import wxConfig from '../../components/wx/wxconfig';
    import vue from 'vue';
    import {Toast} from 'mint-ui';
    import {MessageBox} from 'mint-ui';
    import myaddress from '../../components/area.json';
    import timesCutPrice from '../../components/cut_price/times_cut_price';
    import failTime from '../../components/cut_price/fail_time';

export default {
  data(){
    return{
      aleary_cut:false,//是否已经帮砍
      gold_is_true:'',
      tips_join_tpl:'',
      tips_create_tpl:'',
      help_news:'',
      help_friend_cut:false,//帮好友砍一刀
      publicAddress:false,
      help_cut_free:false,//参与者  我也要免费拿
      new_help_cut:false,
      help_cut:false,
      isRefresh:false,
      addressArr: myaddress,
      showArea: false,
      spec_id: '',                 // spec的组合id，if只有一个规格就是index1Id
      currentImg: '',              // 当前图片地址
      currentPrice: '',              // 当前商品规格的价格
      currentName: '',             // 商品名称
      addressList: [],             // 地址列表
      addAddress: false,                // 添加地址的弹框
    iconTopShow: false,
    specShow: false,         // 规格弹框
    addressShow: false,
      is_false:true,
      is_false_img:false,//砍价图片
      successData:{},
      showPic:false,
      page:1,
      loading: false,
      bargain_info:{},
      buttonArr:[],
      goodsList:[],
      listData:[],
      users_bargain_activity_id:'',
      is_share:0,
      currentIndex:1,
      shareInfo: {},
      share_img:'',
      is_share_false:false,
      is_share_false_warp:false,
      slef_tips:'',

      provinceId: '',
      provinceIndex: '',
      province: '',
      cityId: '',
      city: '',
      cityIndex: '',
      districtId: '',
      district: '',
      addAddressName: '',      // 新增名字
      addAddressTel: '',      // 新增电话
      addAddressText: '',         //  新增地址
      addAddressDetail: '',// 新增详细地址
      first_create:''
    }
  },
  components:{
    wxConfig,Toast,timesCutPrice,failTime
  },
  mounted(){
      this.users_bargain_activity_id = this.$route.query.users_bargain_activity_id;
      this.is_share = this.$route.query.is_share;
      this.activity_goods_id = this.$route.query.activity_goods_id;
      this.first_create = this.$route.query.first_create;
      this.fetch();
      this.cut_record();
  },
  created(){
    window.shareCallback = this.shareJoinBargainCallback;
  },
  methods:{
    closePicDivHelpCurrent(){
      // 打开二维码
        this.help_friend_cut = false;
        this.publicAddress = true;
        this.is_share_false_warp = true;
    },
    closePublicAddress(){
      this.publicAddress = false;
      this.is_share_false_warp = false;
    },
  closePicDivHelpFree(){
    this.help_cut_free = false;
    this.is_false_img = false;
    this.is_share_false_warp = false;
    // if(this.$getCookie('terminal')==''){
    //   this.publicAddress = true;
    //   this.is_share_false_warp = true;
    // }
    this.$router.push({path:"/activity/bargain"})
  },
  closePicDivHelp(){
    this.new_help_cut = false;
  },
    goToMyCutPrice(){
      // window.location.href = "com.jumper.spellgroup";
      this.$router.push({path:"/activity/bargain"})
    },
    goToAPPMyCutPrice(){
      window.location = "http://android.myapp.com/myapp/detail.htm?apkName=com.jumper.spellgroup&amp;amp;amp;amp;ADTAG=mobile";
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
                  setTimeout(() => {
                      // this.getPicture()
                        this.$post('bargain/goOrder', {
                            token: this.$getCookie('token'),
                            users_bargain_activity_id:this.users_bargain_activity_id,
                            address_id:this.address_id
                        })
                        .then(res => {
                            window.location.href = res.go_order_url;
                        })
                  }, 200)
              })
      }
  },
            // 选择地址
            choooseAddress(val) {
                this.address_id = val.address_id
                this.addressShow = false
                let res = `${val.consignee}   ${val.mobile}   ${val.address}${val.address_base} `
                MessageBox.confirm(res, '请您确认收货地址').then(action => {
                    if (action == 'confirm') {
                          this.gotoBuy();
                    }
                });

            },
            closeAddressDiv() {
                this.addressShow = false
                this.addAddress = false
            },
            upDataDetail() {
                this.isRefresh = false;
                this.fetch();
            },
            goldenAxe(num) {
                var self = this;
                MessageBox({
                    title: '确定要使用金斧子吗？',
                    message: '使用金斧子可以帮您再砍一刀',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '放弃'
                }).then(res => {
                    if (res == "confirm") {
                        this.$post('bargain/propJoinBargain', {
                            token: this.$getCookie('token'),
                            users_bargain_activity_id: this.users_bargain_activity_id
                        })
                            .then(res => {
                                self.is_false_img = false;
                                this.slef_tips = res.tips;
                                setTimeout(function () {
                                    self.showPic = true;
                                    self.is_false = false;
                                    self.is_false_img = true;
                                }, 1000);
                                this.fetch();
                                this.cut_record();
                            })
                    }
                })
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
    fetch(){
        var self = this;
        this.$post('bargain/getUserBargainInfo', {
            token: this.$getCookie('token'),
            users_bargain_activity_id:this.users_bargain_activity_id
        })
        .then(res => {
            // res.subscribe==0 未关注  res.subscribe==1 已关注
            this.is_new_people = res.subscribe;
            this.tips_join_tpl = res.tips.tips_join_tpl;
            this.tips_create_tpl = res.tips.tips_create_tpl;
            //需要知道是否已经砍了
            if(res.subscribe==0&&res.bargain_info.is_user!=1&&!this.aleary_cut){
              this.new_help_cut = true;
            }
            this.isRefresh = true;
            this.bargain_info = res.bargain_info;
            this.shareInfo = res.share;
            this.share_img = res.bargain_info.list_img;
            this.buttonArr = res.button;
            //发起者第一次砍价  还没有首次分享
            if(this.bargain_info.is_first_share==1&&this.bargain_info.down_status==1&&this.bargain_info.is_user==1&&this.first_create==1){
              this.showPic = true;
              this.slef_tips = res.tips.tips_first_tpl;
              this.is_false_img = false;
              setTimeout(function(){
                self.is_false = false;
                self.is_false_img = true;
              },1000)
            }
            this.share();
        })
    },
    shareBtn(){
        this.showPic = false;
        this.is_false = true;
        this.is_false_img = true;
        this.is_share_false = true;
        this.is_share_false_warp = true;
    },
    shareFriend(params,button){
        var self = this;
        if(params.is_user==0||params.is_user==2){
          if(button.flag=='join_user_share'){
              this.is_false_img = false;
              self.help_friend_cut = true;
            // 帮好友砍一刀
            // // res.subscribe==0 未关注  res.subscribe==1 已关注
              this.$post('bargain/joinBargain', {
                  is_share:this.is_share==1?1:0,
                  token: this.$getCookie('token'),
                  users_bargain_activity_id:this.users_bargain_activity_id,
              })
              .then(res => {
                  this.help_news = res.tips;
                  this.gold_is_true = res.prop_tips;
                  this.aleary_cut = true;
                  setTimeout(()=>{
                    self.is_false_img = true;
                    self.fetch();
                    self.cut_record();
                  },1000)
              })
          }else if(button.flag=='is_my_go_buy'){
            // 我也免费拿
              if(this.$getCookie('terminal')!=''){
                  this.help_cut_free = true;
                  this.is_share_false_warp = true;
              }else{
                this.$router.push({path:"/activity/bargain"})
              }
          }else if(button.flag=='is_fail_go_buy'){
            // 这个价格买
              this.gotoBuy();
          }
        }else if(params.is_user==1){
          if(button.flag=='is_user_share'){
            // 分享给好友，多砍一刀
            this.is_share_false = true;
            this.is_share_false_warp = true;
              // Toast({
              //     message: '请点击右上角分享',
              //     duration: 1400
              // })
          }else if(button.flag=='is_go_buy'){
            // 不砍价，直接买
              this.gotoBuy();
          }else if(button.flag=='is_share'){
            // 喊朋友砍一刀
            this.is_share_false = true;
            this.is_share_false_warp = true;
              // Toast({
              //     message: '请点击右上角分享',
              //     duration: 1400
              // })
          }else if(button.flag=='is_order'){
            // 查看订单
            this.$router.push({path:"/order/detail",query:{order_sn:params.order_sn}})
          }else if(button.flag=='is_fail_go_buy'){
            // 这个价格买
              this.gotoBuy();
          }else if(button.flag=='is_bargain'){
            // 再砍一单
              this.$router.push({path:"/activity/bargain"})
          }
        }
    },
    gotoBuy(){
          var self = this;
          if(this.address_id==undefined&&this.bargain_info.is_user!=1){
                this.getAddressList()
                this.addressShow = true
            // this.activity_goods_id = val.activity_goods_id;
            // this.id = val.id;
            // this.goods_id = val.goods_id;
            // this.currentName = this.list[index].goods_name
            // this.getSpec();
          }else{
            this.$post('bargain/goOrder', {
                token: this.$getCookie('token'),
                users_bargain_activity_id:this.users_bargain_activity_id,
                address_id:this.address_id
            })
            .then(res => {
                window.location.href = res.go_order_url;
            })
          }
    },
    // 获取规格
    getSpec() {
        this.$post('bargain/getSpecItem', {
            activity_goods_id: this.activity_goods_id,
            token: this.$getCookie('token')
        })
            .then(res => {
                this.specInfo = res;
                this.index1Id = this.specInfo.spec[0].item[0].spec_item_id
                this.index1Item = this.specInfo.spec[0].item[0].item
                this.index2Id = this.specInfo.spec.length == '2' ? this.specInfo.spec[1].item[0].spec_item_id : ''
                this.index2Item = this.specInfo.spec.length == '2' ? this.specInfo.spec[1].item[0].item : ''
                this.specShow = true

                        if (this.specInfo.spec.length == '1') {
                            this.groupId = this.index1Id
                        } else if (this.specInfo.spec.length == '2') {
                            this.group1Id = `${this.index1Id}_${this.index2Id}`
                            this.group2Id = `${this.index2Id}_${this.index1Id}`
                            for (let i = 0; i < this.specInfo.spec_goods_price.length; i++) {
                                if (this.group1Id == this.specInfo.spec_goods_price[i].key) {
                                    this.groupId = this.group1Id
                                } else if (this.group1Id == this.specInfo.spec_goods_price[i].key) {
                                    this.groupId = this.group2Id
                                }
                            }
                        }
                        this.specStorage = this.specInfo.spec_goods_price[0].limit_stock > 0 ? true : false
                    })
            },
            // 规格选择
            spec1Change(val, index) {
                this.index1Item = val.item;
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
                            self.promPrice = self.buyTypeNum == '1' ? this.specInfo.spec_goods_price[i].price : self.specInfo.spec_goods_price[i].prom_price
                            self.groupId = self.group1Id == this.specInfo.spec_goods_price[i].key ? self.group1Id : self.group2Id
                        }
                    }
                }
                self.specStorage = self.specInfo.spec_goods_price[self.specCurrentIndex].limit_stock > 0 ? true : false

            },
            // 显示地址弹框
            showAddress() {
                this.specShow = false
                this.getAddressList()
                this.addressShow = true
            },
            spec2Change(val, index) {
                this.index2Item = val.item;
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
                    }
                }
                self.specStorage = self.specInfo.spec_goods_price[self.specCurrentIndex].limit_stock > 0 ? true : false
            },
            // 砍价的商品详情
            goDetail(val) {
                this.$router.push({
                    path: '/activity/cutPriceGoodsDetail',
                    query: {
                        goods_id: val.goods_id,
                        from: 'cutPrice'
                    }
                })
            },
            cut_record() {
                var self = this;
                this.$post('bargain/getUserBargainRecord', {
                    token: this.$getCookie('token'),
                    users_bargain_activity_id: this.users_bargain_activity_id
                })
                    .then(res => {
                        this.listData = res.list;
                    })
            },
            // 获取商品列表
            getList(page) {
                this.$post('search/search', {
                    page: page
                })
                    .then(res => {
                        if (res.total == '0' || res.total_page == '0') {
                            Toast({
                                message: '暂无更多数据~',
                                duration: 1000
                            })
                        } else {
                            if (page == '1') {
                                this.goodsList = res.list
                            } else if (page > '1' && res.list != '') {
                                this.goodsList = this.goodsList.concat(res.list)
                            } else {
                                Toast({
                                    message: '下拉后暂无更多数据~',
                                    duration: 1000
                                })
                            }
                        }
                    })
            },
            loadMore() {
                this.loading = true
                this.page++;
                this.getList(this.page)
                this.loading = false
            },
            goRules() {
                // this.$router.push({path:'/activity/cutPriceRules'})
                this.$router.push('/activity/cutPriceRules')
            },
            // 关闭弹框
            closePicDiv() {
                this.showPic = false;
                this.is_share_false = false;
                this.is_share_false_warp = false;
            },
            // 分享
            shareWx() {
                this.showPic = false;
                this.is_share_false = false;
                this.is_share_false_warp = false;
                var share_img = this.shareInfo.share_img;
                var share_url = this.shareInfo.share_url;
                var share_title = this.shareInfo.share_title;
                var share_desc = this.shareInfo.share_desc;
                if (this.$getCookie('terminal') == 'i') {
                    window.shareUrl(0, share_img, share_url, share_title, share_desc, '1')
                } else if (this.$getCookie('terminal') == 'a') {
                    window.webview.shareUrl(0, share_img, share_url, share_title, share_desc, '1')
                }
            },
            sharePyq() {
                this.showPic = false;
                this.is_share_false = false;
                this.is_share_false_warp = false;
                var share_img = this.shareInfo.share_img;
                var share_url = this.shareInfo.share_url;
                var share_title = this.shareInfo.share_title;
                var share_desc = this.shareInfo.share_desc;
                if (this.$getCookie('terminal') == 'i') {
                    window.shareUrl(1, share_img, share_url, share_title, share_desc, '1')
                } else if (this.$getCookie('terminal') == 'a') {
                    window.webview.shareUrl(1, share_img, share_url, share_title, share_desc, '1')
                }
            },

            // 分享成功后统计分享次数
            getShareNumber() {
                this.$post('goods/setShareCount', {
                    token: this.$getCookie('token'),
                    goods_id: this.bargain_info.goods_id
                })
                    .then(res => {

                    })
            },
            shareJoinBargainCallback() {
                this.$post('bargain/shareJoinBargain', {
                    token: this.$getCookie('token'),
                    users_bargain_activity_id: this.users_bargain_activity_id
                })
                    .then(res => {
                        if (res.tips != '') {
                            Toast({
                                message: res.tips,
                                duration: 5000
                            })
                        }
                        this.fetch();
                        this.cut_record();
                    })
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
                            self.shareJoinBargainCallback();
                            // Toast({
                            //     message: '分享成功',
                            //     duration: 1600
                            // })
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
                        success: function (res) {
                            // 用户点击了分享后执行的回调函数
                            self.shareJoinBargainCallback();
                            // Toast({
                            //     message: '分享成功',
                            //     duration: 1600
                            // })
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
<style lang="scss">
// <div class="dialog_tip_warp_PublicAddress">
//   <div class="title_text">
//       关注拼趣多官方微信
//   </div>
//   <div class="title_text">
//       您就有机会以超低价买到这件商品
//   </div>
//   <div class="img_warp">
//
//   </div>
//   <div class="title_text">
//       长按识别二维码
//   </div>
// </div>
.dialog_tip_warp_PublicAddress{
  width:490px;
  font-size:32px;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:60px;
  position: fixed;
  top:200px;
  left:50%;
  margin-left:-245px;
  text-align: center;
  .img_warp{
    width:301px;
    height:301px;
    background:rgba(255,255,255,1);
    border-radius:20px;
    margin:96px auto 50px;
    .id_code{
      width:280px;
      height:280px;
      margin: 0 auto;
    }
  }
}
.glod_text{
  color:#FFC700;
  font-size:32px;
  width:150px;
  display: inline-block;
  text-align: right;
  position: relative;
}
.glod_text::before{
  display: block;
  content:'';
  position: absolute;
  left:10px;
  top:0;
  width:40px;
  height:40px;
  background:url("../../imgs/cut_price/gold_1.png") no-repeat center /100%;
}
.dialog_tip_warp{
  position:fixed;
  left:50%;
  top:200px;
  width:656px;
  height:436px;
  margin-left:-328px;
  background:rgba(255,255,255,1);
  border-radius:20px;
  box-shadow:0px 0px 21px 0px rgba(0,0,0,0.2);
  text-align: center;
    .closes {
        position: absolute;
        top:20px;
        right:20px;
        text-align: center;
        z-index:9999;
        width: 60px;
        height: 60px;
        color:#000;
        font-size:32px;
        // background: url("../../imgs/like/icon-close.png") no-repeat center /100%;
    }
  .img_warp{
    width:80px;
    height:80px;
    border-radius:50%;
    margin:50px auto 20px;
    .author{
        width:80px;
        height:80px;
        border-radius:50%;
    }
  }
  .success_text{
      width:100%;
      height:27px;
      font-size:28px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:40px;
      span{
        color:#FF4862;
      }
  }
  .content_text{
    width:600px;
    height:76px;
    font-size:32px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:45px;
    margin:32px auto 40px;
  }
  .btn_return{
    width:288px;
    height:70px;
    line-height: 70px;
    background:rgba(255,72,98,1);
    border-radius:8px;
    margin:0 auto;
  }
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

    .cut_price_page {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .dialogPicDiv_slef {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: 0;
        z-index: 999;
        -webkit-filter: blur(10px);
        overflow: hidden;
    }

    .modal {
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.7);
        z-index: 1000;
        width: 100%;
        color: #fff;
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

    .share_tips_warp {
        width: 544px;
        position: absolute;
        top: 200px;
        left: 50%;
        text-align: center;
        margin-left: -272px;
        z-index: 9999;
        .share_tips_warp_text {
            font-size: 36px;
            margin-top: 20px;
        }
        .wx_icon_warp {
            .wx_icon {
                width: 120px;
                height: 120px;
                margin: 100px auto 0;
                background: url("../../imgs/cut_price/wx_btn.png") no-repeat center /100%;
            }
            .wx_text {
                font-size: 26px;
                margin-top: 15px;
            }
        }
    }

    .share_tips_warp_ios {
        width: 544px;
        position: absolute;
        bottom: 500px;
        left: 50%;
        text-align: center;
        margin-left: -272px;
        z-index: 9999;
        .share_tips_warp_text {
            font-size: 36px;
            margin-top: 20px;
        }
        .wx_icon_warp {
            .wx_icon {
                width: 120px;
                height: 120px;
                margin: 100px auto 0;
                background: url("../../imgs/cut_price/wx_btn.png") no-repeat center /100%;
            }
            .wx_text {
                font-size: 26px;
                margin-top: 15px;
            }
        }
    }

    .btn_current {
        button {
            width: 100%;
            height: 98px;
            line-height: 98px;
            background: #FF4862;
            text-align: center;
            border-radius: 10px;
            margin-top: 40px;
            font-size: 34px;
            color: #fff;
        }
        .disabledClass {
            background: #ccc;
        }
    }

    .dialogPicDiv {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: 0;
        z-index: 99;
        background-color: transparent;
        .bg {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(0, 0, 0, .9) !important;
        }
        .picDiv {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            .loading_gif {
                border: 0;
            }
            img {
                display: block;
                width: 500px;
                margin: 80px auto 0;
                border: 2px solid #eee;
                border-radius: 10px;
            }
            .close {
                position: absolute;
                width: 60px;
                height: 60px;
                margin: 0 auto;
                left: 50%;
                margin-left: -30px;
                bottom: -50px;
                background: url("../../imgs/like/icon-close.png") no-repeat center /100%;
            }
        }
    }

    .dialog_warp {
        width: 700px;
        height: 700px;
        margin: 10% auto;
        background: url("../../imgs/cut_price/dialog.png") no-repeat center /100%;
        position: relative;
        .dialog_warp_content {
            position: absolute;
            bottom: 100px;
            left: 0;
            width: 100%;
            font-size: 32px;
            color: #333;
            text-align: center;
            .dialog_warp_dl {
                dt {
                    img.axe_count {
                        width: 200px;
                        height: 200px;
                        margin: 0 auto;
                        border: 0;
                    }
                }
                dd {
                    width: 520px;
                    margin: 0 auto 34px;
                    line-height: 42px;
                    .cash {
                        font-size: 42px;
                        color: #FF4862
                    }
                }
            }
            .share_btn {
                background: rgba(255, 72, 98, 1);
                font-size: 28px;
                color: #fff;
                // padding:14px 32px;
                width: 498px;
                height: 86px;
                border-radius: 48px 48px 48px 48px;
                .add_icon {
                    display: inline-block;
                    margin: 18px 0;
                    line-height: 49px;
                    overflow: hidden;
                    .add_icons {
                        float: left;
                        width: 60px;
                        height: 49px;
                        margin-right: 10px;
                        background: url("../../imgs/cut_price/wx_logo.png") no-repeat center /100%;
                    }
                    .text {
                        float: left;
                    }
                }
            }
        }
    }

    .btn_next {
        margin-top: 20px;
        width: 100%;
        height: 98px;
        line-height: 98px;
        background: #FF8484;
        text-align: center;
        border-radius: 10px;
    }

    .cut_price_detail {
        .loading_gif {
            position: fixed;
            left: 0;
            bottom: 0;
            right: 0;
            top: 0;
            width: 100%;
            height: 900px;
            z-index: 999;
        }
        .bottomGoods {
            margin-top: 20px;
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
                        & > b {
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
        .banner {
            position: relative;
            margin-bottom: 120px;
            .gold_axe_tips {
                position: absolute;
                right: 26px;
                top: 180px;
                width: 168px;
                font-size: 22px;
                color: #333;
                background: yellow;
                border-radius: 10px;
                .gold_axe_tips_text {
                    line-height: 1.5;
                    padding: 5px 10px;
                }
                .right_rows {
                    position: absolute;
                    width: 0px;
                    height: 0px;
                    line-height: 0px; /*为了防止ie下出现题型*/
                    // border-bottom: 20px solid yellow;
                    border-width: 16px;
                    border-color: transparent transparent yellow transparent;
                    border-style: dashed dashed solid dashed;
                    right: 40px;
                    top: -30px;
                }
            }
            .gold_axe {
                position: absolute;
                right: 0;
                top: 100px;
                width: 150px;
                height: 60px;
                background: #fff;
                border-radius: 30px 0 0 30px;
                z-index: 99;
                .gold_axe_warp {
                    overflow: hidden;
                    padding-left: 30px;
                    margin-top: 10px;
                    .participants {
                        width: 37px;
                        heiht: 44px;
                        display: block;
                        float: left;
                    }
                    span {
                        line-height: 50px;
                        font-size: 32px;
                        margin-left: 10px;
                    }
                }
            }
            .flow {
                width: 148px;
                height: 46px;
                position: absolute;
                right: 26px;
                top: 40px;
                z-index: 2;
                button {
                    // position: absolute;
                    // right: 26px;
                    // top: 40px;
                    width: 148px;
                    height: 46px;
                    font-size: 28px;
                    line-height: 48px;
                    border-radius: 46px;
                    display: block;
                    background-color: #FBE920;
                    color: #333;
                    font-weight: bold;
                    // z-index: 2;
                }
            }
            // .user_infos{
            // position: absolute;
            // width:100%;
            // left:0;
            // top:50px;
            // color:#fff;
            // z-index:1;
            .user_name {
                width: 100%;
                margin: 14px 0 0 0;
                text-align: center;
                position: absolute;
                left: 0;
                top: 170px;
                color: #fff;
            }
            .user_infos_warp {
                position: absolute;
                width: 100%;
                left: 50%;
                top: 50px;
                color: #fff;
                z-index: 1;
                width: 120px;
                margin: 0 auto;
                margin-left: -60px;
                .author {
                    width: 120px;
                    height: 120px;
                    margin: 0 auto;
                    border-radius: 50%;
                }
            }
            .times {
                position: absolute;
                width: 100%;
                left: 0;
                top: 210px;
                color: #fff;
                z-index: 1;
                font-size: 36px;
                margin: 30px 0 0 0;
                text-align: center;
            }
            // }
            .show_img {
                width: 100%;
                height: 461px;
                background: #fff;
            }
            dl.goods_detail {
                box-shadow: 0px 10px 30px 0px rgba(153, 153, 153, 0.16);
                position: absolute;
                left: 5%;
                top: 323px;
                width: 90%;
                height: 232px;
                overflow: hidden;
                background: #fff;
                padding: 26px;
                margin: 0 auto;
                border-radius: 10px;
                overflow: hidden;
                dt.imgs {
                    width: 180px;
                    height: 180px;
                    float: left;
                    .author {
                        width: 180px;
                        height: 180px;
                    }
                }
                dd.warp {
                    height: 180px;
                    // padding-left: 200px;
                    margin-left: 200px;
                    position: relative;
                    overflow: hidden;
                    .title {
                        font-size: 30px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    .detail {
                        position: absolute;
                        left: 0;
                        bottom: 0px;
                        font-size: 24px;
                        width: 100%;
                        // padding-left:200px;
                        .detail_warp {
                            overflow: hidden;
                        }
                        .red {
                            float: left;
                            font-size: 32px;
                        }
                        .item {
                            float: right;
                            position: relative;
                            padding-right: 10px;
                        }
                        .item:before {
                            display: block;
                            content: '';
                            position: absolute;
                            right: 0;
                            top: 6px;
                            width: 10px;
                            height: 18px;
                            background: url("../../imgs/user/icon-arrow-right.png") no-repeat center /100%;
                        }
                    }
                }
            }
        }
        .main {
            width: 100%;
            padding: 20px;
            .icon_warp {
                position: relative;
                height: 60px;
                .color_line {
                    margin: 26px 0;
                    width: 100%;
                    height: 4px;
                    background: -webkit-linear-gradient(to left, blue, red, blue);
                    background: linear-gradient(to left, #fff, red, #fff);
                }
                .color_img {
                    position: absolute;
                    left: 50%;
                    top: 0;
                    width: 100px;
                    height: 100px;
                    background: #fff;
                    margin-left: -30px;
                    margin-top: -40px;
                    .axe_img {
                        width: 100px;
                        height: 100px;
                    }
                }
            }
            .text_result {
                text-align: center;
                font-size: 32px;
            }
        }
        .centerTop {
            position: relative;
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
            margin: 20px 0;
            font-size: 30px;
        }
        .centerTop::before {
            display: block;
            content: '';
            position: absolute;
            left: 0;
            top: 12px;
            width: 4px;
            height: 16px;
            background: rgba(255, 70, 78, 1);
            border-radius: 2px;
        }
        .line_has {
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            margin: 40px 0 0 0;
        }
        .cut_info {
            li {
                margin: 40px 0;
                display: flex;
                justify-content: space-between;
                .user_info {
                    display: flex;
                    justify-content: space-between;
                    dt {
                        width: 80px;
                        height: 80px;
                        .user_icon {
                            width: 80px;
                            height: 80px;
                            border-radius: 50%;
                        }
                    }
                    dd {
                        margin-left: 20px;
                        position: relative;
                        .tit {
                            font-size: 28px;
                            color: #000;
                            width: 300px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .detail {
                            font-size: 24px;
                            color: #ccc;
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            white-space: nowrap;
                        }
                    }
                }
                .price {
                    display: flex;
                    justify-content: space-between;
                    dt {
                        margin-right: 20px;
                        display: flex;
                        justify-content: space-between;
                        .participants {
                            width: 37px;
                            height: 44px;
                            margin-top: 20px;
                        }
                    }
                    dd {
                        height: 80px;
                        line-height: 80px;
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
</style>
