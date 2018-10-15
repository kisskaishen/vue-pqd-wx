<template>
    <div class="likeDiv">
        <div class="like">
            <div class="banner">
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="item,index in bannerList" :key="item.ad_id">
                        <img :src="item.ad_code" :alt="item.ad_name">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <!--已购买的，新版没有看到，2018/06/28 09：28-->
            <!--<div class="swiperHorization">-->
            <!--<swiper :options="swiperOptionTap" ref="mySwiperTap">-->
            <!--<swiper-slide v-for="item,index in messageList" :key="item.id">-->
            <!--<span>恭喜：{{item.nickname}}成功获得了</span>-->
            <!--<span class="red">{{item.goods_name}}</span>-->
            <!--</swiper-slide>-->
            <!--</swiper>-->
            <!--</div>-->
            <div class="flow">
                <button @click="goRules">活动规则</button>
                <img src="../../imgs/like/icon-flow.png" alt="" v-if="currentIndex=='1'">
                <img src="../../imgs/like/icon-flow-myFree.png" alt="" v-if="currentIndex=='2'">
            </div>
            <!--<div class="myFree">-->
            <!--<b>我的免单</b>-->
            <!--<router-link to="/user/myLike">点击查看></router-link>-->
            <!--</div>-->
            <div class="list" v-infinite-scroll="loadMore"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="100"
                 infinite-scroll-immediate-check=false
                 v-if="currentIndex=='1'&&list!=''">
                <div class="goods" v-for="item,index in list">
                    <!--<div @click="goDetail(item,index)">-->
                    <div>
                        <div class="divFl">
                            <img :src="item.list_img || ''" alt="">
                        </div>
                        <div class="divFr">
                            <p class="goodsName">{{item.goods_name}}</p>
                            <p>需{{item.limit_reach}}人助力</p>
                            <p class="operate">
                        <span>
                            <b class="red">￥{{item.limit_price}}</b>
                            <span>已领 <span>{{item.sales}}件</span></span>
                        </span>
                                <button @click.stop="showSpecDiv(item,index)"
                                        v-if="item.going == '0'&&item.limit_total_stock>0">马上抢<i></i>
                                </button>
                                <button @click.stop="goAgain(item,index)" v-if="item.going == '1'">继续分享<i></i>
                                </button>
                                <button class="failBtn" disabled v-if="item.limit_total_stock<=0">已售罄</button>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="bottomLoadingDiv" v-if="isShowLoading">
                    <img src="../../imgs/base/icon-loading.gif" alt="">
                    <p>加载中...</p>
                </div>
                <div class="bottomTextTip" v-if="isNoData">----------已经拉到底了----------</div>

            </div>
            <div class="noGoodsList" v-if="currentIndex=='1'&&list==''&&total_page!='0'">
                <img src="../../imgs/base/icon-like.png" :alt="index" v-for="item,index in 6">
            </div>
            <div class="noGoodsData" v-if="currentIndex=='1'&&list==''&&total_page=='0'">
                <img src="../../imgs/order/icon-no-order.png">
                <p>暂无助力列表</p>
            </div>


            <div class="list" v-infinite-scroll="loadMore"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="100"
                 infinite-scroll-immediate-check=false
                 v-if="currentIndex=='2'&&myList!=''">
                <div class="goods" v-for="item,index in myList">
                    <!--<div @click="goDetail(item,index)">-->
                    <div>
                        <div class="divFl">
                            <img :src="item.list_img || ''" alt="">
                        </div>
                        <div class="divFr">
                            <p class="goodsName">{{item.goods_name}}</p>
                            <p>需{{item.limit_reach}}人助力,还差<span class="red">{{item.left_reach}}人</span></p>
                            <p class="operate">
                                <span>
                                    <b class="red">￥{{item.limit_price}}</b>
                                </span>
                                <button class="detailBtn" @click.stop="likeDetailClick(item,index)">助力详情</button>
                                <button @click.stop="goAgain(item,index)" v-if="item.help_status=='1'">继续分享</button>
                                <button class="failBtn" disabled v-if="item.help_status == '2'">已完成</button>
                                <button class="failBtn" disabled v-if="item.help_status == '3'">已结束</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="noGoodsList" v-if="currentIndex=='2'&&myList==''&&total_page!='0'">
                <img src="../../imgs/base/icon-like.png" :alt="index" v-for="item,index in 6">
            </div>
            <div class="noGoodsData" v-if="currentIndex=='2'&&myList==''&&total_page=='0'">
                <img src="../../imgs/order/icon-no-order.png">
                <p>暂无我的免单</p>
            </div>
            <div class="bottom">
                <div class="optsBtn" :class="currentIndex=='1'?'active1':'active2'">
                    <button @click="typeChange1"><i></i>今日免单</button>
                    <button @click="typeChange2"><i></i>我的免单</button>
                </div>
            </div>
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
                            <label>已选：{{key_name}}</label>

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
                                :disabled="item.store_count=='0'?true:false"
                                @click="spec1Change(item,index)">
                                <span>{{item.item}}</span>
                                <span v-if="item.store_count=='0'">（已售罄）</span>
                            </li>
                        </ul>
                    </div>
                    <div class="infoSpec" v-if="specInfo.spec.length == '2'">
                        <p>{{specInfo.spec[1].name}}</p>
                        <ul>
                            <li v-for="item,index in specInfo.spec[1].item" :class="index==current2Index?'active':''"
                                :disabled="item.store_count=='0'?true:false"
                                @click="spec2Change(item,index)">
                                <span>{{item.item}}</span>
                                <span v-if="item.store_count=='0'">（已售罄）</span>
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
        <!--助力列表-->
        <div class="dialogDiv likeDetail" v-if="likeDetailIsShow">
            <div class="bg" @click="closeLikeDetail"></div>
            <div class="likeDetailDiv">
                <div class="title">
                    <p>好友助力详情</p>
                    <i @click="closeLikeDetail"></i>
                </div>
                <ul>
                    <li v-for="item,index in help_list" v-if="help_list.length>0">
                        <div class="divFl">
                            <img :src="item.head_img" alt="头像">
                            <div class="info">
                                <p>{{item.nickname || 'nickname'}}</p>
                                <span>{{item.add_time || '助力时间'}}</span>
                            </div>
                        </div>
                        <div class="divFr">
                            {{item.tips|| '助力状态'}}
                        </div>
                    </li>
                    <li v-else>暂无好友助力</li>
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

        <!--图片显示-->
        <div class="dialogPicDiv" v-if="showPic">
            <div class="bg" @click="closePicDiv"></div>
            <div class="picDiv">
                <img :src="likeInfo.share_img || share_img" alt="">

                <div class="shareDiv" v-if="this.$getCookie('terminal')">
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
                <div class="close" @click="closePicDiv"></div>
            </div>
        </div>

        <!--新人助力弹出框-->
        <div class="newUserDiologDiv" v-if="newUserDiolog">
            <div class="bg" @click="closenewUserDiologDiv"></div>
            <div class="newUser">
                <div class="title">
                    <p> 新人验证</p>
                    <i class="close" @click="closenewUserDiologDiv"></i>

                </div>
                <div>
                    <img :src="newUserCaptchaImg" alt="">
                    <i @click="refreshImg"></i>
                </div>
                <input type="text" v-model="newUserCaptchaVal" placeholder="请输入新人助力验证码">
                <p>完成身份验证即可为他助力成功</p>
                <mt-button type="danger" @click="sureNewUserCaptcha">确定</mt-button>
                <router-link to="/index">去首页 <i></i></router-link>
            </div>
        </div>
        <div :class="iconTopShow?'toTop':''" @click="toTopClick"><span></span></div>
    </div>
</template>

<script>
    import {Toast, MessageBox, Indicator} from 'mint-ui';
    import myaddress from '../../components/area.json'

    function guid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }


    export default {
        name: "like",
        data() {
            return {
                swiperOptionTap: {
                    direction: 'vertical',
                    initialSlide: 0,//设定初始化时slide的索引
                    loop: true,  //无限滚动
                    speed: 600,//滑动速度
                    autoplay: 1600,//自动切换的时间间隔
                },
                loading: false,
                iconTopShow: false,
                specShow: false,         // 规格弹框
                addressShow: false,
                bannerList: [],              // banner
                messageList: [],              // 成功助力循环列表
                page: 0,
                list: [],
                myList: [],
                total_page: 1,

                groupId: '',
                group1Id: '',
                group2Id: '',
                specCurrentIndex: '',

                key_name:'',            // 已选规格

                goods_id: '',                // 商品id
                id: '',                  // 用于规格
                specInfo: {spec: [{item: []}], spec_goods_price: []},                 // 规格信息
                current1Index: '0',
                index1Id: '',
                index1Item: '',
                current2Index: '0',
                index2Id: '',
                index2Item: '',

                specStorage: true,


                currentIndex: this.$route.query.currentIndex == '2' ? '2' : '1',

                spec_id: '',                 // spec的组合id，if只有一个规格就是index1Id
                currentImg: '',              // 当前图片地址
                currentPrice: '',              // 当前商品规格的价格
                specCurrentIndex:'',                // 当前位置
                currentName: '',             // 商品名称
                addressList: [],             // 地址列表
                addAddress: false,                // 添加地址的弹框
                likeDetailIsShow: false,             // 好友助力列表

                addressArr: myaddress,

                showArea: false,
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
                likeInfo: '',
                showPic: false,
                share_img: '',

                help_list: [],           // 好友助力列表

                // 新人验证助力弹出框
                rand: guid(),

                newUserDiolog: false,
                newUserCaptchaImg: '',
                newUserCaptchaVal: '',
                referer: '',     // 来源，根据terminal判断， 1.weixin 2.ios 3.安卓 4.小程序 5.H5 6.QQ

                isShowLoading: false,           // 显示loading
                isNoData: false                 // 显示底部提示
            }
        },
        mounted() {
            let self = this;
            document.title = '为我助力'
            self.getBanner()
            if (self.$route.query.currentIndex == '2') {
                self.getLikedList(1)
            } else {
                self.getList(1)
            }
            self.isNewPeople()
            window.addEventListener('scroll', self.handleScroll)
        },

        methods: {
            // 获取banner
            getBanner() {
                let self = this
                self.$post('index/getIndexAd', {
                    type: 4
                })
                    .then(res => {
                        self.bannerList = res.list
                    })

            },
            // 获取成功助力
            getMessageList() {
                this.$post('Helpactivity/getHelpOkList', {})
                    .then(res => {
                        this.messageList = res
                    })
            },
            // 助力商品列表
            getList(page) {
                this.$post('Helpactivity/list', {
                    token: this.$getCookie('token'),
                    page: page
                })
                    .then(res => {
                        this.total_page = res.total_page
                        if (res.list == '' || res.list == null) {
                            this.isNoData = true
                            this.isShowLoading = false
                        } else {
                            if (page == '1') {
                                this.list = res.list
                            } else {
                                this.list = this.list.concat(res.list)
                            }
                            this.isShowLoading = false
                        }
                    })

            },
            // 我的助力列表
            getLikedList(page) {
                // let self = this
                this.$post('user/getHelpActivityList', {
                    token: this.$getCookie('token'),
                    page: page
                })
                    .then(res => {
                        this.total_page = res.total_page
                        if (page == '1') {
                            if (res.list == '' || res.list == null) {
                                this.myList = ''
                            } else {
                                this.myList = res.list
                            }
                        } else {
                            if (res.list == '' || res.list == null) {
                                this.isNoData = true
                            } else {
                                this.myList = this.myList.concat(res.list)
                            }
                        }
                        this.isShowLoading = false
                    })
            },
            // 查看助力详情
            likeDetailClick(val, index) {
                this.$post('Helpactivity/helpInfo', {
                    token: this.$getCookie('token'),
                    help_id: val.id
                })
                    .then(res => {
                        this.likeDetailIsShow = true
                        this.help_list = res.help_list
                    })
            },

            // 关闭好友助力列表
            closeLikeDetail() {
                this.likeDetailIsShow = false
            },

            typeChange1() {
                this.currentIndex = '1'
                this.page = 0
                this.getList(1)
            },
            typeChange2() {
                this.currentIndex = '2'
                this.page = 0
                this.getLikedList(1)
            },

            // 活动规则
            goRules() {
                this.$router.push('/activity/likeRules')
            },

            // 助力的商品详情
            goDetail(val, index) {
                this.$router.push({
                    path: '/detail/index',
                    query: {
                        goods_id: val.goods_id,
                        from: 'like'
                    }
                })
            },
            // 监听滑动事件
            handleScroll() {
                this.scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
                if (this.scrollTop > 156) {
                    this.iconTopShow = true
                } else {
                    this.iconTopShow = false
                }
            },
            toTopClick() {
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                window.pageYOffset = 0
            },
            // 加载更多
            loadMore() {
                if (this.total_page >= this.page) {
                    if (this.currentIndex == '1') {
                        this.loading = true
                        this.page++
                        this.isShowLoading = true
                        this.getList(this.page)
                        this.loading = false
                    } else if (this.currentIndex == '2') {
                        this.loading = true
                        this.page++
                        this.isShowLoading = true
                        this.getLikedList(this.page)
                        this.loading = false
                    }
                }
            },
            // 判断是否显示新人弹框
            isNewPeople() {
                if (this.$route.query.help_id) {
                    this.newUserDiolog = true
                    this.newUserCaptchaImg = this.$baseUrl + '/Helpactivity/capatch?rand=' + this.rand
                } else {
                    this.newUserDiolog = false
                }
            },
            // 刷新验证码
            refreshImg() {
                this.rand = guid()
                this.newUserCaptchaImg = this.$baseUrl + '/Helpactivity/capatch?rand=' + this.rand
            },
            // 关闭新人认证弹框
            closenewUserDiologDiv() {
                this.newUserDiolog = false
            },
            // 输入新人验证码后点击确定
            sureNewUserCaptcha() {
                if (this.newUserCaptchaVal == '') {
                    Toast({
                        message: '请输入助力验证码',
                        duration: 1600
                    })
                } else {
                    if (this.$getCookie('terminal') == 'i') {
                        this.referer = '2'
                    } else if (this.$getCookie('terminal') == 'a') {
                        this.referer = '3'
                    } else {
                        this.referer = '1'
                    }
                    this.$post('Helpactivity/checkHelpUser', {
                        help_id: this.$route.query.help_id,
                        token: this.$getCookie('token')
                    })
                        .then(res => {
                            this.$post('Helpactivity/help', {
                                help_id: this.$route.query.help_id,
                                token: this.$getCookie('token'),
                                capatch: this.newUserCaptchaVal,
                                rand: this.rand,
                                referer: this.referer
                            })
                                .then(res => {
                                    Toast({
                                        message: '助力成功',
                                        duration: 1400
                                    })
                                    setTimeout(() => {
                                        this.newUserDiolog = false
                                        this.$router.push('/index')
                                    }, 1200)
                                })
                        })
                }
            },
            // 点击继续分享
            goAgain(val, index) {
                this.showPic = true
                this.share_img = val.share_img
            },
            // 点击马上抢显示规格弹框
            showSpecDiv(val, index) {
                this.goods_id = val.goods_id
                this.id = val.id
                this.currentName = this.list[index].goods_name
                this.getSpec()
            },
            // 获取规格
            getSpec() {
                this.$post('Helpactivity/getGoodsSpecPrice', {
                    id: this.id,
                    goods_id: this.goods_id
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
                                    this.specStorage = this.specInfo.spec_goods_price[i].store_count > 0 ? true : false
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
                                this.specStorage = this.specInfo.spec_goods_price[i].store_count > 0 ? true : false
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
                self.specStorage = self.specInfo.spec_goods_price[self.specCurrentIndex].store_count > 0 ? true : false

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
                self.specStorage = self.specInfo.spec_goods_price[self.specCurrentIndex].store_count > 0 ? true : false
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
            closeAddressDiv() {
                this.addressShow = false
                this.addAddress = false
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
                            setTimeout(() => {
                                this.getPicture()
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
                        this.getPicture()
                    }
                });

            },
            // 关闭弹框
            closePicDiv() {
                this.showPic = false
            },
            // 生成图片接口,两处可以调用，1有地址，手动点击选择地址后调用/2无地址，添加地址后确定后调用
            getPicture() {
                let self = this;
                Indicator.open({
                    text: '获取图片中...',
                    spinnerType: 'snake'
                });
                this.$post('Helpactivity/build', {
                    token: this.$getCookie('token'),
                    id: this.id,
                    goods_id: this.goods_id,
                    spec_key: this.groupId,
                    address_id: this.address_id
                })
                    .then(res => {
                        this.likeInfo = res
                        this.share_img = res.share_img
                        Indicator.close();
                        this.showPic = true
                    })
                    .catch(err => {
                        Indicator.close();
                    })

            },
            // 分享
            shareWx() {
                if (this.$getCookie('terminal') == 'i') {
                    window.share(0, this.share_img)
                } else if (this.$getCookie('terminal') == 'a') {
                    window.webview.share(0, this.share_img)
                }
            },
            sharePyq() {
                if (this.$getCookie('terminal') == 'i') {
                    window.share(1, this.share_img)
                } else if (this.$getCookie('terminal') == 'a') {
                    window.webview.share(1, this.share_img)
                }
            }
        },
        watch: {

        }
    }
</script>
<style lang="scss">
    .like {
        .banner {
            padding: 0 !important;
            .mint-swipe {
                height: 354px;
                .mint-swipe-item {
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .mint-swipe-indicators {
                    .mint-swipe-indicator {
                        width: 18px;
                        height: 18px;
                        margin: 0 10px;
                    }
                    .is-active {
                        background-color: #df2728;
                    }
                }
            }
        }
    }

    .swiperHorization {
        height: 80px;
        line-height: 80px;
        overflow: hidden;
        border-bottom: 1px solid #ccc;
        .swiper-container-vertical {
            height: 80px;
            .swiper-slide {
                width: 710px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

        }
    }

</style>

<style scoped lang="scss">
    .likeDiv {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        min-height: 100%;
        background-color: #fff;
    }

    .like {
        > div {
            width: 100%;
            background-color: #fff;
            padding: 0 26px;
        }
        /*.swiperHorization {*/
        /*width: 750px;*/
        /*height: 80px;*/
        /*line-height: 80px;*/

        /*border-bottom: 1px solid #ccc;*/
        /*.swiper-slide {*/

        /*}*/
        /*}*/
        /*.myFree {*/
        /*display: flex;*/
        /*justify-content: space-between;*/
        /*padding: 20px;*/
        /*b {*/
        /*border-left: 8px solid red;*/
        /*padding-left: 10px;*/
        /*font-size: 26px;*/
        /*color: #333;*/
        /*}*/
        /*a {*/
        /*font-size: 24px;*/
        /*}*/
        /*}*/
        .flow {
            padding: 0;
            position: absolute;
            top: 316px;
            background: transparent;
            img {
                width: 100%;
            }
            button {
                position: absolute;
                right: 26px;
                top: -46px;
                width: 148px;
                height: 46px;
                border-radius: 46px;
                background-color: #FBE920;
                color: #333;
                font-weight: bold;
            }
        }
        .noGoodsList {
            margin-top: 80px;
            img {
                width: 698px;
                margin: 16px auto;
            }
        }
        .noGoodsData {
            margin-top: 80px;
            img {
                width: 422px;
                height: 304px;
                margin: 20px auto;
            }
            p {
                text-align: center;
                color: #999;
            }
        }
        .list {
            background-color: transparent;
            padding: 0;
            margin: 80px 0 120px;
            .goods {
                margin-top: 20px;
                padding: 0 26px;
                > div {
                    padding: 30px 0;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    background-color: #fff;
                    border-bottom: 1px solid #eee;
                    .divFl {
                        img {
                            display: block;
                            width: 250px;
                            height: 250px;
                        }
                    }
                    .divFr {
                        width: 100%;
                        flex-direction: column;
                        justify-content: space-between;
                        align-self: stretch;
                        align-items: flex-start;
                        align-content: stretch;
                        p {
                            width: 100%;
                            color: #999;
                            text-align: left;
                        }
                        .goodsName {
                            font-size: 30px;
                            margin-bottom: 20px;
                            color: #444;
                            line-height: 40px;
                            max-height: 80px;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            -ms-text-overflow: ellipsis;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            margin-bottom: -40px;
                        }
                        .operate {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            > span {
                                b {
                                    font-size: 32px;
                                    margin-right: 10px;
                                }
                                span {
                                    font-size: 24px;
                                    color: #999;
                                    span {
                                        color: #333;
                                    }
                                }
                            }
                            button {
                                display: flex;
                                -webkit-justify-content: center;
                                justify-content: center;
                                -webkit-align-items: center;
                                align-items: center;
                                width: 162px;
                                height: 60px;
                                -webkit-border-radius: 8px;
                                -moz-border-radius: 8px;
                                border-radius: 8px;
                                font-size: 28px;
                                background: linear-gradient(to right, #FF8484, #FF4862);
                                i {
                                    margin-left: 10px;
                                    width: 10px;
                                    height: 24px;
                                    background: url("../../imgs/index/icon-arrow-right.png") no-repeat center /100%;
                                }
                            }
                            .detailBtn {
                                color: #999;
                                border: 2px solid #ccc;
                                background: transparent;
                            }
                            .failBtn {
                                background: #eee;
                                color: #999;
                            }
                        }
                    }
                }

            }

        }
        .bottom {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100px;
            padding: 0;
            .optsBtn {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-top: 1px solid #eee;
                button {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100px;
                    line-height: 100px;
                    text-align: center;
                    font-size: 30px;
                    i {
                        vertical-align: middle;
                        margin-right: 10px;
                        width: 36px;
                        height: 36px;
                    }
                    &:nth-child(1) {
                        background-color: #FF4862;
                        color: #fff;
                        i {
                            background: url("../../imgs/like/icon-free.png") no-repeat center /100%;
                        }
                    }
                    &:nth-child(2) {
                        background-color: #fff;
                        color: #333;
                        i {
                            background: url("../../imgs/like/icon-myFree-active.png") no-repeat center /100%;
                        }
                    }
                }
            }
            .active1 {
                button {
                    &:nth-child(1) {
                        background-color: #FF4862;
                        color: #fff;
                        i {
                            background: url("../../imgs/like/icon-free.png") no-repeat center /100%;
                        }
                    }
                    &:nth-child(2) {
                        background-color: #fff;
                        color: #333;
                        i {
                            background: url("../../imgs/like/icon-myFree-active.png") no-repeat center /100%;
                        }
                    }
                }
            }
            .active2 {
                button {
                    &:nth-child(1) {
                        background-color: #fff;
                        color: #333;
                        i {
                            background: url("../../imgs/like/icon-free-active.png") no-repeat center /100%;
                        }
                    }
                    &:nth-child(2) {
                        background-color: #FF4862;
                        color: #fff;
                        i {
                            background: url("../../imgs/like/icon-myFree.png") no-repeat center /100%;
                        }
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

    .likeDetailDiv {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 24%;
        width: 698px;
        max-height: 696px;
        min-height: 200px;
        background-color: #fff;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        padding: 26px;
        .title {
            text-align: center;
            position: relative;
            font-size: 30px;
            color: #333;
            padding-bottom: 40px;
            border-bottom: 1px solid #eee;
            i {
                position: absolute;
                top: 0;
                right: 0;
                width: 26px;
                height: 26px;
                background: url("../../imgs/detail/icon-coupon-close.png") no-repeat center /100%;
            }
        }
        ul {
            overflow: scroll;
            li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #eee;
                padding: 20px 0;
                .divFl {
                    img {
                        width: 80px;
                        height: 80px;
                        -webkit-border-radius: 50%;
                        -moz-border-radius: 50%;
                        border-radius: 50%;
                        display: block;
                    }
                    .info {
                        p {
                            width: 400px;
                            overflow: hidden;
                            -ms-text-overflow: ellipsis;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-size: 28px;
                            color: #4C4C4C;
                            margin-bottom: 10px;
                        }
                        span {
                            color: #999;
                        }
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
            background-color: rgba(0, 0, 0, .6) !important;
        }
        .picDiv {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
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
                left: 50%;
                margin-left: -30px;
                bottom: 50px;
                background: url("../../imgs/like/icon-close.png") no-repeat center /100%;
            }

            .shareDiv {
                position: fixed;
                bottom: 120px;
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
        }
    }

    .newUserDiologDiv {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: 0;
        z-index: 9;
        background-color: transparent;
        .bg {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(0, 0, 0, .6) !important;
        }
        .newUser {
            position: absolute;
            top: 30%;
            margin-top: -100px;
            /*bottom: 0;*/
            left: 100px;
            right: 100px;
            padding: 26px;
            background-color: #fff;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            > div {
                position: relative;
                img {
                    display: block;
                    margin: 0 auto;
                }
                i {
                    position: absolute;
                    right: -20px;
                    top: 50%;
                    margin-top: -30px;
                    width: 60px;
                    height: 60px;
                    background: url("../../images/icon-refresh.png") no-repeat center /100%;
                }
            }
            .title {
                position: relative;
                border-bottom: 1px solid #eee;
                margin-bottom: 30px;
                padding-bottom: 20px;
                p {
                    font-size: 30px;
                    color: #333;
                }
                .close {
                    position: absolute;
                    right: 0;
                    top: 0;
                    margin: 0;
                    width: 26px;
                    height: 26px;
                    background: url("../../imgs/detail/icon-coupon-close.png") no-repeat center /100%;
                }
            }
            p {
                padding: 10px 0;
                color: #888;
                text-align: center;
            }
            input {
                margin: 20px auto;
                padding: 20px;
            }
            a {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                color: #5BC1D7;
                i {
                    width: 10px;
                    height: 18px;
                    margin-left: 10px;
                    background: url("../../imgs/pay/icon-arrow-right-color1.png") no-repeat center /100%;
                }
            }
            .mint-button {
                width: 200px;
                margin: 0 auto;
                height: 60px;
                font-size: 30px;
            }

        }
    }
</style>
