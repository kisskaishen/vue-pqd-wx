<template>
    <div class="giftDetail">
        <!--:class="{'speak-top':speakStatus}" -->
        <div class="header" :class="{'prize-header':activity.status==3}">
            <button class="rule-btn" @click="goGiftRule">活动规则</button>
            <!-- 参与活动倒计时 -->
            <div class="info-box" v-if="activity.status==1||activity.status==2">
                <div class="user">
                    <img :src="activity.user_head_img" alt="">
                    <span class="name">{{activity.user_nickname}}</span>
                </div>
                <div class="text-box" v-if="activity.status==1">
                    还剩 <count-down class="time" :futureTime="activity.end_time" :currentTime="activity.time" @end="end" @getTime="getGiftDetail"></count-down>
                    结束，赶快上车吧~
                </div>
                <div class="text-box" v-if="activity.status==2">
                    已结束，未达到开奖人数标准
                </div>
            </div>
            <!-- 开奖倒计时 -->
            <div class="prize-info-box" v-if="activity.status==3">
                <div class="countdownText">
                    开奖倒计时
                    <count-down class="time" :futureTime="activity.open_time" :currentTime="activity.time" @end="openEnd" @getTime="getGiftDetail"></count-down>
                </div>
                <div class="user">
                    <div class="avatar-box">
                        <div class="avatar-bg">
                            <span class="role">发起者</span>
                        </div>
                        <div class="avatar">
                            <img :src="activity.user_head_img" alt="">
                        </div>
                    </div>
                    <span class="name">{{activity.user_nickname}}</span>
                </div>
                <!-- <button class="speak" @click="speak">叽叽喳喳</button> -->
                <!-- 弹幕部分 -->
                <div class="bullet-screen-box">
                    <ul class="bullet-screen">
                        <transition-group name="list-complete" tag='div' v-on:before-enter="beforeEnter" v-on:enter="enter"
                            v-on:leave="leave" v-bind:css="false">
                            <li class="item-box" v-for="(item, index) in bullets" :key="item.msg_id" ref="bullet" v-if="item.showStatus">
                                <!-- bullets.length>5&& -->
                                <div class="item">
                                    <div class="avatar">
                                        <img :src="item.img" alt="">
                                    </div>
                                    <p class="text" v-html="item.content"></p>
                                </div>
                            </li>
                        </transition-group>
                    </ul>
                </div>
                <!-- 发布弹幕input -->
                <div class="input-box" v-if="activity.status==3">
                    <input class="input-text" maxlength="100" v-model="bulletText" ref="speakInput" type="text"
                        placeholder="写弹幕，100字以内哦~">
                    <button class="btn" @click="addBullet">发布</button>
                </div>
            </div>
            <!-- 中奖者 -->
            <div class="lucky-box" v-if="activity.status==4">
                <div class="user">
                    <div class="avatar-box">
                        <div class="avatar-bg">
                            <span class="role">中奖者</span>
                        </div>
                        <div class="avatar">
                            <img :src="activity.open_user_head_img" alt="">
                        </div>
                        <span class="name">{{activity.open_user_nickename}}</span>
                    </div>
                </div>
            </div>
            <!-- 商品信息 -->
            <div class="goodsInfo-box" :class="{prize:activity.status==3}">
                <div class="goodsInfo">
                    <div class="goodsImg">
                        <img :src="goods.list_img" alt="">
                    </div>
                    <div class="desc">
                        <div class="title">{{goods.goods_name}}</div>
                        <div class="user-box color-4C4C4C">
                            <span class="color-999">抽奖发起人:</span>
                            <div class="user">
                                <img :src="activity.user_head_img" alt="">
                                <span>{{activity.user_nickname}}</span>
                            </div>
                        </div>
                        <div class="price color-FF4862">￥<span class="num">{{goods.price}}</span></div>
                        <div class="lucky-people-box">
                            <div class="lucky-people">
                                {{goods.sale}}人<span class="color-999">已中奖</span>
                                <img src="../../imgs/gift/icon-arrow-right.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 当前进度、分享 -->
        <div class="share-wrapper" :class="{prize:activity.status==3}">
            <div class="progress-box">
                <span class="progress-text">当前进度</span>
                <div class="progress">
                    <div class="text color-FF4862" :class="{right:percentageR}" :style="{left:percentageTxt}" ref="pargressText">{{activity.join_number}}/{{activity.open_number}}人</div>
                    <vm-progress type="line" :striped=true :percentage="percentage" stroke-color="#FF4862" :show-text=false
                        :stroke-width="10"></vm-progress>
                </div>
            </div>
            <div class="desc">
                <img src="../../imgs/gift/icon-tips.png" alt="">
                <p class="text color-999">人满后即可开启抽奖。包括发起者在内所有参与者随机抽取一位中奖！</p>
            </div>
            <button class="share-btn" v-if="activity.is_use==1 && activity.status==1" @click="share">分享给好友，让他们一起拿</button>
            <template v-if="activity.is_use!=1 && activity.status==1">
                <button class="share-btn" @click="joinGift" v-if="activity.is_use!=2">加入TA，一起免费拿</button>
                <button class="share-btn Inactive" @click="goGift">我也要发起</button>
            </template>
            <button v-if="activity.is_use==1 && activity.status==2" class="share-btn" @click="goGift">再来一次</button>
            <button v-if="activity.status==4" class="share-btn" @click="goGift">{{activity.is_use == 1?'再来一次':'我也要发起'}}</button>
        </div>
        <!-- 参与者 -->
        <div class="partake-box">
            <div class="partakeTitle">
                参与好友<span class="color-999">({{records.length}})</span>
            </div>
            <div class="all-box" @click="showPartake">
                <div class="all">
                    <span class="color-999">查看全部</span>
                    <img src="../../imgs/gift/icon-arrow-right.png" alt="">
                </div>
            </div>
            <div class="partake">
                <div class="user" v-for="(item, index) in records.slice(0, 10)" :key="index">
                    <img :src="item.user_head_img" alt="">
                    <span class="name">{{item.user_nickname}}</span>
                </div>
            </div>
        </div>
        <!-- 更多抽奖 -->
        <div class="more-box">
            <div class="moreTitle">更多抽奖</div>
            <div class="more" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"
                infinite-scroll-immediate-check=false>
                <div class="moreItem" @click="goGoods(item.goods_id,item.activity_goods_id)" v-for="(item, index) in moreGoods.list"
                    :key="index">
                    <img :src="item.list_img" alt="">
                    <p class="desc">{{item.goods_name}}</p>
                    <div class="price-box">
                        <div class="price color-FF4862">
                            <span>￥</span>{{item.price}}
                        </div>
                        <div class="num">
                            满<span class="color-FF4862">{{item.limit_reach}}</span>人开奖
                        </div>
                    </div>
                    <button class="btn">免费送</button>
                </div>
            </div>
            <div class="spinner">
                <mt-spinner type="fading-circle" v-if="moreGoods.status"></mt-spinner>
                <p class="text" v-else>没有更多数据了~</p>
            </div>
        </div>
        <!-- 发布弹幕input -->
        <!-- <v-mask :status="speakStatus" :opacity="0" @close="hideSpeak">
            <div class="input-box" @click.stop="">
                <input class="input-text" maxlength="100" v-model="bulletText" ref="speakInput" type="text" placeholder="写弹幕，100字以内哦~">
                <button class="btn" @click="addBullet">发布</button>
            </div>
        </v-mask> -->

        <!-- 参与者弹框 -->
        <v-mask :status="partakeStatus" :opacity="0.3">
            <div class="partake-dialog">
                <div class="title">已参与好友</div>
                <div class="close" @click="closeLog('partakeStatus')">
                    <img src="../../imgs/gift/icon-close.png" alt="">
                </div>
                <div class="all">
                    <div class="user" v-for="(item, index) in records" :key="index">
                        <img :src="item.user_head_img" alt="">
                        <span class="name">{{item.user_nickname}}</span>
                    </div>
                </div>
            </div>
        </v-mask>
        <!-- 参与成功弹框 -->
        <tips :logStatus="successStatus" :title="'恭喜参与成功~'" :content="inviteText" :btnText="'帮他一把'" @btnClick='helpShare'
            @close='closeJoinLog'></tips>
        <!-- 温馨提示弹框 -->
        <tips :logStatus="dialogStatus" :content="'人数已满，正在开奖中，赶紧去重新发一个抽奖吧~'" :btnText="'我也要发起'" @close='closeLog("dialogStatus")'
            @btnClick='goGift'></tips>
        <!-- wx分享弹窗 -->
        <v-mask :status="wxShareStatus" :opacity='0.6' @close='closeWxShare'>
            <div class="wx-share">
                <img src="../../imgs/gift/wxShare.png" alt="">
                <p class="text">快去喊好友一起来抽奖吧！</p>
            </div>
        </v-mask>
        <!-- 原生分享弹窗 -->
        <v-mask :status="nativeShareStatus" :opacity='0.6'>
            <div class="native-share">
                <p class="text">快去喊好友一起来抽奖吧！</p>
                <div class="icon-box">
                    <div class="icon" @click="nativeShare(0)">
                        <img src="../../imgs/gift/icon-wx1.png" alt="">
                        <p class="wx-text">微信好友</p>
                    </div>
                    <div class="icon" @click="nativeShare(1)">
                        <img src="../../imgs/gift/icon-wx2.png" alt="">
                        <p class="wx-text">微信朋友圈</p>
                    </div>
                </div>
                <img class="close" @click="closeLog('nativeShareStatus')" src="../../imgs/gift/shareClose.png" alt="">
            </div>
        </v-mask>
        <!-- 二维码弹窗 -->
        <v-mask :status="codeStatus" :opacity='0.6'>
            <div class="img-code">
                <p class="desc">
                    怕中奖不知道？关注拼趣多官方微信公众号， 及时获取中奖信息！
                </p>
                <div class="img-box">
                    <img src="https://cdn2.pinquduo.cn/it/44105F14-6DBF-43b6-B670-C4DCC09F0F1D.png" alt="">
                </div>
                <p class="text">长按识别二维码</p>
                <img class="close" @click="closeLog('codeStatus')" src="../../imgs/gift/shareClose.png" alt="">
            </div>
        </v-mask>


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
    import { Toast, MessageBox, Indicator } from 'mint-ui'

    import countDown from '../../components/base/countDown'
    import vMask from '../../components/base/mask'
    import tips from '../../components/base/tips'

    import myaddress from '../../components/area.json'

    import wx from 'weixin-js-sdk';         // 引入微信sdk
    import wxConfig from '../../components/wx/wxconfig'

    export default {
        data() {
            return {
                goods: {},
                activity: {},
                shareInfo: {},
                subscribe: 0,

                records: [],   //参与记录

                loading: false, //加载状态
                moreGoods: {    //更多商品
                    list: [],
                    page: 1,
                    status: true
                },
                joinStatus: false,
                lastJoin: false,
                endTime: 0,

                percentage: 0,//进度条百分比
                percentageTxt: '0%',
                percentageR: false,

                ws: null,//webSocket

                bullets: [], //弹幕
                bulletsIndex: 0, //弹幕索引
                bulletText: '', //弹幕文本

                speakStatus: false,//弹幕发言
                bulletNum: 5,//弹幕发言次数
                speakTime: null, //定时发言限制
                timer30s: null, // 30秒限制
                speak30s: false, //30秒再次发言
                partakeStatus: false, //参与者弹窗
                successStatus: false,//参与成功弹窗
                dialogStatus: false, //温馨提示弹窗
                wxShareStatus: false, //微信分享
                nativeShareStatus: false, //原生分享
                codeStatus: false, //二维码弹窗

                addressShow: false, // 地址弹窗
                addAddress: false,  // 添加地址的弹框
                addressList: [],    // 地址列表

                addressArr: myaddress,
                showArea: false,//地址三级联动
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

                time: null //定时器
            }
        },
        created() {
            this.giftId = this.$route.query.users_give_activity_id
            this.getGiftDetail()
            this.getGiveRecord()
            this.getMoreList()
        },
        mounted() {
            this.$nextTick(() => {
                // this.getSocketInfo()
                // setInterval(() => {
                //     this.ws.send('{ "action": "heartbeat", "token": "202fc9b6ba6ea919fdd61add71201c3158952ab3" }');
                // }, 3000)
            })
        },
        computed: {
            inviteText() {
                let num = this.activity.open_number - this.activity.join_number
                return `再邀请${num}人就可以开奖啦`
            }
        },
        watch: {
            bullets() {
                if (this.bullets.length) {
                    clearInterval(this.time)
                    this.removeBullet()
                }
            },
            shareInfo() {
                this.wxShare()
            },
            'activity.status'(val) {
                if (val == 3) {
                    this.getSocketInfo()
                }
            }
        },
        methods: {
            // 跳转替你送首页
            goGift() {
                this.closeLog("dialogStatus")
                this.$router.push({
                    path: "/activity/gift"
                })
            },
            // 跳转规则
            goGiftRule() {
                this.$router.push({
                    path: "/activity/giftRule"
                })
            },
            // 跳转商品详情
            goGoods(goodsId, activity_goods_id) {
                this.$router.push({
                    path: "/activity/giftGoods",
                    query: {
                        goods_id: goodsId,
                        activity_goods_id: activity_goods_id
                    }
                })
            },
            //获取详情信息
            getGiftDetail(timer) {
                this.$post("give/getGiveDetails", {
                    token: this.$getCookie('token'),
                    users_give_activity_id: this.giftId
                }).then((res) => {
                    this.activity = res.activity
                    this.goods = res.goods
                    this.shareInfo = res.share
                    this.subscribe = res.subscribe
                    console.log(this.subscribe)

                    this.getPercentage(this.activity.join_number, this.activity.open_number)
                    this.textPercentage()

                    if (this.activity.status == 4) {
                        Indicator.close()
                        clearInterval(timer)
                        timer = null
                        return
                    }

                    if (this.activity.status == 3 && this.activity.is_use == 3) {
                        this.dialogStatus = true
                    }

                })
            },
            //获取参与者
            getGiveRecord() {
                this.$post("give/getGiveRecord", {
                    token: this.$getCookie('token'),
                    users_give_activity_id: this.giftId
                }).then((res) => {
                    this.records = res.record
                })
            },
            //获取更多商品
            loadMore() {
                this.loading = true
                this.getMoreList()
            },
            getMoreList() {
                this.$post("give/getGiveGoodsList", {
                    page: this.moreGoods.page
                }).then((res) => {
                    let list = res.list
                    if (list.length) {
                        this.moreGoods.list = this.moreGoods.list.concat(list)
                        this.moreGoods.page++
                        this.loading = false
                    } else {
                        this.moreGoods.status = false
                        this.loading = true
                    }
                })
            },
            //活动倒计时结束
            end() {
                Indicator.open("请稍后...")
                let timer;
                timer = setInterval(() => {
                    this.$post("give/getGiveDetails", {
                        token: this.$getCookie('token'),
                        users_give_activity_id: this.giftId
                    }).then((res) => {
                        this.activity = res.activity
                        let status = this.activity.status
                        if (status != 1) {
                            Indicator.close()
                            clearInterval(timer)
                        }
                    })
                }, 3000)
            },
            //开奖倒计时结束
            openEnd() {
                if (this.activity.status == 4) {
                    return
                }
                Indicator.open("开奖中...")
                let timer;
                timer = setInterval(() => {
                    this.getGiftDetail(timer)
                    // this.$post("give/getGiveDetails", {
                    //     token: this.$getCookie('token'),
                    //     users_give_activity_id: this.giftId
                    // }).then((res) => {
                    //     console.log(res)
                    // })
                }, 3000)
                // this.getLottery()
            },
            //轮询开奖接口
            getLottery() {
                // let timer = null
                // timer = setInterval(() => {
                // this.$post("/",{}).then((res)=>{
                //     console.log("")
                // })
                // }, 3000)
            },
            // 获取socket心跳信息
            getSocketInfo() {
                this.$post("give/createWs", {
                    token: this.$getCookie('token'),
                    users_give_activity_id: this.giftId
                }).then((res) => {
                    this.createWs(res.server_uri, res.token)
                })
            },
            //创建socket
            createWs(url, token) {
                let heartbeat;
                this.ws = new WebSocket(`${url}?${token}`)
                this.ws.onopen = (res) => {
                    heartbeat = setInterval(() => {
                        if (this.ws.readyState == 1) {
                            this.ws.send(`{ "action": "heartbeat", "token": "${token}" }`)
                        } else if (this.ws.readyState = 3) {
                            clearInterval(heartbeat)
                            heartbeat = null
                            this.createWs(url, token)
                        }
                    }, 30000)
                }
                this.ws.onmessage = this.wsCallBack

                this.ws.onerror = () => {
                    console.log('onerror')
                }
            },
            wsCallBack(res) {
                let data = JSON.parse(res.data)
                if (data.msg_id) {
                    let main = JSON.parse(data.extend)
                    let isHave = this.bullets.findIndex((value) => {
                        return value.a == data.msg_id
                    })
                    if (main.users_give_activity_id == this.giftId && isHave == -1) {
                        this.bullets.push({
                            showStatus: true,
                            content: main.content,
                            img: main.head_pic,
                            msg_id: data.msg_id
                        })

                        if (this.bullets.length > 8) {
                            this.bullets.shift()
                            this.bulletsIndex--
                        }
                    }
                }
            },
            inputFocus() {
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    setTimeout(() => {
                        document.scrollingElement.scrollTop = document.body.scrollHeight
                    }, 150);
                }
            },
            inputBlur() {
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    setTimeout(() => {
                        this.toTopClick()
                    }, 150);
                }
            },
            // 显示弹幕输入框
            speak() {
                this.speakStatus = !this.speakStatus


                // document.scrollingElement.scrollTop =
                // return

                // setTimeout(() => {
                //     this.$refs.speakInput.focus()
                // }, 200);
            },
            // speak() {
            //     this.speakStatus = true
            //     this.toTopClick()
            //     if (this.$getCookie('terminal') == 'i') {
            //         return
            //     }
            //     setTimeout(() => {
            //         this.$refs.speakInput.focus()
            //     }, 200);
            // },

            // 隐藏弹幕输入框
            hideSpeak() {
                this.speakStatus = false
            },
            // 添加弹幕
            addBullet() {
                if (this.bulletText == "") {
                    Toast("请输入内容~")
                    return
                }

                if (this.bulletNum <= 0) {
                    Toast("你发言太快了，先休息下吧~")
                    this.speak30s = true
                    if (!this.timer30s) {
                        this.timer30s = setTimeout(() => {
                            this.speak30s = false
                            this.bulletNum = 5
                            clearTimeout(this.timer30s)
                            this.timer30s = null
                        }, 300000);
                    }
                    return
                }


                this.$post("give/sendSms", {
                    token: this.$getCookie('token'),
                    users_give_activity_id: this.giftId,
                    content: this.bulletText
                }).then((res) => {
                    let bulletText = this.bulletText
                    let avatar = this.$getCookie('head_pic')
                    let random = Math.random().toString(36);
                    this.bullets.push({
                        img: avatar,
                        showStatus: true,
                        content: this.bulletText,
                        msg_id: random
                    })

                    this.bulletNum--
                    if (!this.speakTime) {
                        this.speakTime = setTimeout(() => {
                            if (!this.speak30s) {
                                this.bulletNum = 5
                                clearTimeout(this.speakTime)
                                this.speakTime = null
                            }
                        }, 3000);
                    }

                    if (this.bullets.length > 8) {
                        this.bullets.shift()
                        this.bulletsIndex--
                    }
                    this.bulletText = ''
                })
            },
            // 删除弹幕
            removeBullet() {
                let speed = 5000;

                // let list = this.bullets.filter((item) => {
                //     console.log(item)
                //     return item.showStatus == true
                // })
                // if (list.length < 4) {
                //     speed = 2500
                // } else {
                //     speed = 1000
                // }
                // clearInterval(this.time)

                this.time = setInterval(() => {
                    if (this.bullets[this.bulletsIndex]) {
                        this.bullets[this.bulletsIndex].showStatus = false
                    }
                    this.bulletsIndex++

                    // list = this.bullets.filter((item) => {
                    //     console.log(item)
                    //     return item.showStatus == true
                    // })
                    // if (list.length < 4) {
                    //     this.removeBullet()
                    // }
                    // console.log(speed)



                    if (this.bulletsIndex >= this.bullets.length) {
                        clearInterval(this.time)
                        this.time = null
                        this.bullets = []
                        this.bulletsIndex = 0
                        return
                    }

                }, speed)
            },

            // 显示参与者弹窗
            showPartake() {
                this.partakeStatus = true
            },

            //参与抽奖
            joinGift() {
                if (this.joinStatus) {
                    Toast('已参与~');
                }
                this.showAddress()
            },
            addGift() {
                this.$post('give/joinGive', {
                    token: this.$getCookie('token'),
                    users_give_activity_id: this.giftId,
                    address_id: this.address_id
                }).then((res) => {
                    this.getGiftDetail()
                    this.getGiveRecord()
                    this.joinStatus = true
                    if (res.status == 1) {
                        this.successStatus = true //开启参与成功弹窗
                    }
                    // this.endTime = 1536910410
                    // console.log(this.endTime)
                })
            },

            //帮他一把
            helpShare() {
                this.successStatus = false
                this.share()
            },
            //关闭参与成功弹窗
            closeJoinLog() {
                this.successStatus = false
                if (this.subscribe == 0) {
                    this.codeStatus = true
                }
            },
            //关闭wx分享弹窗并显示二维码
            closeWxShare() {
                this.wxShareStatus = false
                if (this.activity.is_use != 1 && this.subscribe == 0) {
                    this.codeStatus = true
                }
            },
            // 分享弹窗
            share() {
                let system = this.$getCookie('terminal')
                if (system == "i" || system == "a") {
                    this.nativeShareStatus = true
                } else {
                    this.wxShareStatus = true
                }
            },
            // 原生分享
            nativeShare(type) {
                let share_img = this.shareInfo.share_img;
                let share_url = this.shareInfo.share_url;
                let share_title = this.shareInfo.share_title;
                let share_desc = this.shareInfo.share_desc;
                if (this.$getCookie('terminal') == 'i') {
                    window.shareUrl(type, share_img, share_url, share_title, share_desc, 0)
                } else if (this.$getCookie('terminal') == 'a') {
                    window.webview.shareUrl(type, share_img, share_url, share_title, share_desc, 0)
                }
            },

            // 微信分享回调配置
            wxShare() {
                wx.ready(() => {
                    // 分享朋友圈
                    wx.onMenuShareTimeline({
                        title: this.shareInfo.share_title, // 分享标题
                        link: this.shareInfo.share_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: this.shareInfo.share_img, // 分享图标
                        // desc: this.giftInfo.share.share_desc, // 分享描述
                        success: () => {
                            alert(1)
                            this.closeWxShare()
                            Toast({
                                message: '分享成功',
                                duration: 1600
                            })
                        },
                        cancel: () => {
                            alert(2)
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
                        success: ()=> {
                            // 用户点击了分享后执行的回调函数
                            this.closeWxShare()
                            Toast({
                                message: '分享成功',
                                duration: 1600
                            })
                        },
                        cancel:  ()=> {
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
            //关闭弹窗
            closeLog(statusName) {
                this[statusName] = false
            },
            //页面置顶
            toTopClick() {
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                window.pageYOffset = 0
            },

            // 弹幕动画：
            beforeEnter(el) {
                el.style.opacity = '0'
                el.style.transform = "translate3d(0,0,0)";
            },
            enter(el, done) {
                this.$nextTick(() => {
                    el.style.opacity = '1'
                    el.style.transition = 'all 1s'
                    el.addEventListener('transitionend', done);
                })
            },
            leave(el, done) {
                el.style.opacity = '0'
                el.style.transition = 'all 0.5s'
                el.style.transform = "translate3d(0,0,0)";
                el.addEventListener('transitionend', done);
            },


            //收货地址逻辑：

            // 显示地址弹框
            showAddress() {
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
                        this.addGift()
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
                            this.addGift()
                        }, 200)
                    })
                }
            },

            //模板数据处理：
            getPercentage(current, max) {
                this.percentage = parseInt(current) / parseInt(max) * 100
            },
            textPercentage() {
                this.percentageTxt = this.percentage + '%'
                this.$nextTick(() => {
                    let ele = this.$refs.pargressText
                    let eleWidth = ele.clientWidth
                    let eleRight = ele.getBoundingClientRect().left + eleWidth

                    if (eleRight > window.innerWidth) {
                        this.percentageR = true
                    }
                })
            },
        },
        components: {
            vMask,
            tips,
            countDown,
            wxConfig
        }
    }
</script>

<style lang="scss" scoped>
    .giftDetail {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        min-height: 100%;
        background: #ffffff;

        &.bot {
            padding-bottom: 102px;
        }

        &.speak-top {
            padding-top: 102px;
        }

        .color-4C4C4C {
            color: #4c4c4c;
        }

        .color-999 {
            color: #999999;
        }

        .color-FF4862 {
            color: #FF4862;
        }

        .header {
            position: relative;
            width: 100%;
            height: 558px;
            background: url("../../imgs/gift/header-bg.png") no-repeat 0 0/100%;

            &.prize-header {
                height: 680px;
                background: url("../../imgs/gift/prize-bg.png") no-repeat 0 0/100%;
            }

            .rule-btn {
                padding: 5px 16px;
                position: absolute;
                right: 25px;
                top: 47px;
                z-index: 100;
                font-size: 28px;
                color: #333333;
                background: rgba(251, 233, 32, 1);
                border-radius: 30px;
                box-shadow: 0px 4px 29px 0px rgba(241, 0, 0, 0.64);
            }

            .user {
                .name {
                    width: 200px;
                    text-align: center;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }

            .info-box {
                display: flex;
                align-items: center;
                flex-direction: column;
                color: #ffffff;

                .user {
                    margin: 76px 0 45px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;

                    img {
                        margin-bottom: 24px;
                        width: 120px;
                        height: 120px;
                        border-radius: 50%;
                    }

                    .name {
                        font-size: 28px;
                    }
                }

                .text-box {
                    font-size: 32px;

                    .time {
                        display: inline-block;
                        width: 170px;
                        color: #FBE920;
                    }
                }
            }

            .prize-info-box {
                position: relative;
                height: 100%;
                display: flex;
                align-items: center;
                flex-direction: column;
                color: #ffffff;

                .user {
                    margin-top: 135px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;

                    .avatar-box {
                        position: relative;
                        width: 194px;
                        height: 209px;

                        .avatar-bg {
                            position: absolute;
                            z-index: 10;
                            width: 194px;
                            height: 209px;
                            background: url('../../imgs/gift/Initiate.png') no-repeat 0 0/100%;

                            .role {
                                position: absolute;
                                left: 50%;
                                transform: translateX(-50%);
                                bottom: 20px;
                            }
                        }

                        .avatar {
                            position: absolute;
                            top: 35px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 145px;
                            height: 145px;
                            border-radius: 50%;
                            overflow: hidden;

                            img {
                                width: 100%;
                            }
                        }
                    }

                    .name {
                        display: inline-block;
                        width: 100%;
                        text-align: center;
                        font-size: 40px;
                        font-weight: bold;
                    }
                }

                .countdownText {
                    position: absolute;
                    left: 25px;
                    top: 44px;
                    font-size: 32px;

                    .time {
                        color: #FBE920;
                    }
                }

                /* 叽叽喳喳按钮 */
                .speak {
                    padding: 5px 10px;
                    position: absolute;
                    top: 425px;
                    right: 25px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    color: #333333;
                    background: rgba(251, 233, 32, 1);
                    border-radius: 30px;
                    box-shadow: 0px 4px 20px 0px rgba(241, 0, 0, 0.64);

                    &:before {
                        content: '';
                        margin-right: 6px;
                        width: 23px;
                        height: 26px;
                        background: url("../../imgs/gift/icon-speak.png") no-repeat 0 0/100%;
                    }
                }

                /* 弹幕 */
                .bullet-screen-box {
                    position: absolute;
                    left: 25px;
                    top: 100px;
                    right: 185px;
                    height: 370px;
                    z-index: 100;
                    overflow: hidden;

                    .bullet-screen {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        transition: all 0.1s;
                    }

                    .item-box {
                        margin-bottom: 10px;
                        overflow: hidden;
                        transition: all 0.2s;

                        &.list-complete-enter,
                        &.list-complete-leave-to {
                            opacity: 0;
                        }

                        &.list-complete-leave-active {
                            position: absolute;
                        }

                        &:last-child {
                            margin-bottom: 0;
                        }

                        .item {
                            float: left;
                            display: flex;
                            padding: 15px;
                            background: rgba(0, 0, 0, 0.6);
                            border-radius: 8px;

                            .avatar {
                                margin-right: 10px;
                                flex: 0 0 32px;
                                width: 32px;
                                height: 32px;
                                border-radius: 50%;
                                overflow: hidden;

                                img {
                                    width: 100%;
                                }
                            }

                            .text {
                                flex: 1;
                                font-size: 24px;
                                color: #FFFFFF;
                                word-break: break-all;
                            }
                        }
                    }
                }

                /* 弹幕输入框 */
                .input-box {
                    padding: 15px 25px;
                    display: flex;
                    align-items: center;
                    position: absolute;
                    left: 26px;
                    bottom: 115px;
                    right: 26px;
                    height: 60px;
                    background: #FAFAFA;
                    border-radius: 30px;
                    z-index: 101;

                    .input-text {
                        flex: 1;
                        margin-right: 100px;
                        height: 60px;
                        border: none;
                    }

                    .btn {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        right: 5px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 123px;
                        height: 52px;
                        background: #FF4862;
                        border-radius: 26px;
                        font-size: 28px;
                        color: #ffffff;
                    }
                }
            }

            .lucky-box {
                position: relative;
                height: 100%;
                display: flex;
                align-items: center;
                flex-direction: column;
                color: #ffffff;

                .user {
                    margin-top: 30px;

                    .avatar-box {
                        position: relative;
                        width: 316px;
                        height: 314px;

                        .avatar-bg {
                            position: absolute;
                            z-index: 10;
                            width: 316px;
                            height: 314px;
                            background: url('../../imgs/gift/lucky.png') no-repeat 0 0/100%;

                            .role {
                                position: absolute;
                                left: 50%;
                                transform: translateX(-50%);
                                bottom: 95px;
                            }
                        }

                        .avatar {
                            position: absolute;
                            top: 62px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 145px;
                            height: 145px;
                            border-radius: 50%;
                            overflow: hidden;

                            img {
                                width: 100%;
                            }
                        }

                        .name {
                            position: absolute;
                            bottom: 15px;
                            left: 0;
                            width: 100%;
                            text-align: center;
                            font-size: 40px;
                            font-weight: bold;
                        }
                    }
                }
            }

            .goodsInfo-box {
                padding: 0 25px;
                width: 100%;
                position: absolute;
                left: 0;
                bottom: -50px;

                /* transform: translateX(-50%); */
                &.prize {
                    bottom: -130px;
                }
            }

            .goodsInfo {
                padding: 25px;
                display: flex;
                width: 100%;
                height: 232px;
                background: #ffffff;
                border-radius: 20px;
                box-shadow: 0px 10px 30px 0px rgba(153, 153, 153, 0.16);

                .goodsImg {
                    margin-right: 20px;
                    flex: 0 0 180px;
                    width: 180px;
                    height: 180px;
                    border-radius: 8px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .desc {
                    position: relative;
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

                    .user-box {
                        margin-bottom: 5px;
                        display: flex;
                        align-items: center;
                        font-size: 24px;

                        .user {
                            margin-left: 20px;
                            display: flex;
                            align-items: center;

                            img {
                                margin-right: 8px;
                                width: 32px;
                                height: 32px;
                                border-radius: 50%;
                            }
                        }
                    }

                    .price {
                        font-size: 24px;
                        font-weight: bold;

                        .num {
                            color: #FF4862;
                            font-size: 32px;
                            font-weight: bold;
                        }
                    }

                    .lucky-people-box {
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        color: #333333;

                        .lucky-people {
                            display: flex;
                            align-items: center;
                        }

                        img {
                            margin-left: 10px;
                            width: 10px;
                            height: 18px;
                        }
                    }
                }
            }
        }

        .share-wrapper {
            margin: 120px 25px 0;
            padding-bottom: 40px;
            border-bottom: 1px solid #EEEEEE;

            &.prize {
                margin-top: 180px;
            }

            .progress-text {
                font-size: 24px;
                white-space: nowrap;
            }

            .progress-box {
                display: flex;
                align-items: center;

                .progress {
                    position: relative;
                    margin-left: 20px;
                    flex: 1;

                    .text {
                        position: absolute;
                        left: 80%;
                        transform: translateX(-50%);
                        top: -35px;
                        z-index: 10;
                        /* width: 111px; */
                        text-align: center;
                        white-space: nowrap;

                        &.right {
                            right: 0;
                            text-align: right;
                            margin-left: 0 !important;
                            left: initial !important;
                            transform: initial !important;

                            &::after {
                                display: none;
                            }
                        }

                        &::after {
                            content: '';
                            position: absolute;
                            left: 50%;
                            bottom: -16px;
                            transform: translateX(-50%);
                            height: 0px;
                            width: 0px;
                            border-bottom: 10px solid transparent;
                            border-left: 10px solid transparent;
                            border-top: 10px solid #ffffff;
                            border-right: 10px solid transparent;
                        }
                    }
                }
            }

            .desc {
                margin-top: 10px;
                display: flex;
                align-items: center;

                img {
                    margin-right: 10px;
                    width: 33px;
                    height: 33px;
                }

                .text {
                    font-size: 20px;
                    white-space: normal;
                }
            }

            .share-btn {
                margin-top: 30px;
                width: 100%;
                height: 100px;
                background: #FF4862;
                font-size: 32px;
                border-radius: 8px;

                &.Inactive {
                    margin-top: 20px;
                    background: #FF8484;
                }
            }
        }

        .partake-box {
            position: relative;
            margin: 40px 25px;

            .partakeTitle {
                display: flex;
                align-items: center;
                color: #4D4D4D;
                font-size: 30px;
                font-weight: bold;

                span {
                    font-weight: 400;
                }

                &::before {
                    content: '';
                    margin-right: 15px;
                    width: 4px;
                    height: 16px;
                    background: rgba(255, 70, 78, 1);
                    border-radius: 2px;
                }
            }

            .all-box {
                position: absolute;
                right: 0;
                top: 3px;

                .all {
                    display: flex;
                    align-items: center;

                    img {
                        margin-left: 10px;
                        width: 10px;
                        height: 18px;
                    }
                }
            }

            .partake {
                margin-top: 40px;
                display: flex;
                flex-wrap: wrap;
                align-content: space-between;
                border-bottom: 1px solid #EEEEEE;

                .user {
                    flex: 0 0 20%;
                    padding: 0 8px;
                    margin-bottom: 40px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    img {
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                    }
                }

                .name {
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    text-align: center;
                    margin-top: 10px;
                    font-size: 20px;
                    color: #4c4c4c;
                }
            }
        }

        .more-box {
            margin: 0 25px;

            .moreTitle {
                display: flex;
                align-items: center;
                color: #4D4D4D;
                font-size: 30px;
                font-weight: bold;

                &::before {
                    content: '';
                    margin-right: 15px;
                    width: 4px;
                    height: 16px;
                    background: rgba(255, 70, 78, 1);
                    border-radius: 2px;
                }
            }

            .more {
                margin-top: 40px;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;

                .moreItem {
                    margin-bottom: 40px;
                    flex: 0 0 50%;

                    &:nth-of-type(odd) {
                        padding-right: 12.5px;
                    }

                    &:nth-of-type(even) {
                        padding-left: 12.5px;
                    }

                    img {
                        width: 100%;
                        border-radius: 8px;
                    }

                    .desc {
                        margin-top: 20px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        font-size: 30px;
                        color: #333333;
                    }

                    .price-box {
                        margin-top: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        .price {
                            font-weight: bold;
                            font-size: 32px;

                            span {
                                font-size: 24px;
                            }
                        }

                        .num {
                            color: #999999;
                            font-size: 24px;
                        }
                    }

                    .btn {
                        margin-top: 14px;
                        width: 100%;
                        height: 70px;
                        font-size: 30px;
                        background: #FF4862;
                        border-radius: 35px;
                    }
                }
            }
        }

        .spinner {
            margin: 30px 0 55px;
            display: flex;
            justify-content: center;

            .text {
                color: #999999;
            }
        }

        .partake-dialog {
            padding: 0 20px 0;
            max-height: 702px;
            position: absolute;
            top: 50%;
            left: 75px;
            right: 75px;
            z-index: 101;
            transform: translateY(-50%);
            background: #ffffff;
            border-radius: 20px;

            .title {
                margin-top: 40px;
                text-align: center;
                font-size: 30px;
            }

            .close {
                position: absolute;
                right: 25px;
                top: 25px;
                width: 25px;
                height: 25px;

                img {
                    width: 100%;
                }
            }

            .all {
                margin-top: 40px;
                max-height: 550px;
                display: flex;
                flex-wrap: wrap;
                align-content: space-between;
                overflow: auto;

                .user {
                    flex: 0 0 25%;
                    padding: 0 8px;
                    margin-bottom: 40px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    img {
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                    }
                }

                .name {
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    text-align: center;
                    margin-top: 10px;
                    font-size: 20px;
                    color: #4c4c4c;
                }
            }
        }

        .wx-share {
            position: absolute;
            top: 100px;
            right: 0;
            left: 0;
            bottom: 0;

            img {
                position: absolute;
                right: 108px;
                top: 0;
                width: 78px;
                height: 95px;
            }

            .text {
                white-space: nowrap;
                position: absolute;
                top: 110px;
                left: 50%;
                transform: translateX(-50%);
                font-weight: bold;
                font-size: 36px;
                color: #ffffff;
            }
        }

        .native-share {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            position: absolute;
            left: 0;
            bottom: 131px;

            .text {
                margin-bottom: 80px;
                color: #ffffff;
                font-weight: bold;
                font-size: 36px;
            }

            .icon-box {
                display: flex;
                justify-content: space-between;
                width: 350px;

                .icon {
                    text-align: center;
                    font-size: 0;
                }

                img {
                    display: inline-block;
                    width: 120px;
                    height: 120px;
                }

                .wx-text {
                    margin-top: 15px;
                    font-size: 26px;
                    color: #ffffff;
                }
            }

            .close {
                margin-top: 115px;
                width: 64px;
                height: 64px;
            }
        }

        .img-code {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;

            p {
                font-size: 32px;
                color: #ffffff;
            }

            .desc {
                padding: 0 65px;
                line-height: 60px;
                text-align: center;
            }

            .img-box {
                margin: 100px 0 50px;
                /* padding: 12px; */
                width: 301px;
                height: 301px;
                background: #ffffff;
                border-radius: 20px;
                overflow: hidden;
            }

            img {
                width: 100%
            }

            .close {
                margin-top: 115px;
                width: 64px;
                height: 64px;
            }

        }


        /* 遮罩 */
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