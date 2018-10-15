<template>
    <div class="chat">
        <!--聊天记录框-->
        <div class="chatList">
            <div class="loadingMore">
                <!--<p>更多聊天记录</p>-->
                <p>没有更多消息了</p>
            </div>
            <div class="chatMsg">
                <div class="chatMsgItem" v-for="item,index in msgData" v-if="index=='0'">
                    <p class="chatTime">{{item.msgModule.time | formatDate}}</p>
                    <div class="chatCon">
                        <div class="head_pic">
                            <img :src="item.msgModule.receiverUser.avatar" alt="">
                        </div>
                        <div class="content">
                            <p>亲，很高兴为您服务</p>
                            <ul>
                                <li>
                                    快速回复语1
                                </li>
                            </ul>
                        </div>
                        <div class="loadingImg">
                            <img src="" alt="">
                        </div>
                    </div>
                </div>
                <div class="chatMsgItem" v-for="item,index in msgData" v-if="item.goodsLink">
                    <p class="chatTime">{{item.msgModule.time | formatDate}}</p>
                    <div class="content goodsLink">
                        <div class="goodsPic">
                            <img :src="item.msgModule.goodsInfo.original_img" alt="">
                        </div>
                        <div class="goodsInfo">
                            <p>{{item.msgModule.goodsInfo.goods_name}}</p>
                            <p>
                                <span>
                                    <span>￥<b>{{item.msgModule.goodsInfo.prom_price}}</b></span>
                                    <span>{{item.msgModule.goodsInfo.prom}}人团</span>
                                </span>
                                <span @click="sendText({type:'goods'})">发送链接</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="chatMsgItem sendMsg" v-for="item,index in msgData">
                    <p class="chatTime">{{item.msgModule.time | formatDate}}</p>
                    <div class="chatCon receiverUser">
                        <div class="head_pic">
                            <img :src="item.msgModule.receiverUser.avatar" alt="">
                        </div>
                        <div class="content">
                            <p>{{item.data}}</p>
                        </div>
                        <!--<div class="loadingImg">-->
                        <!--<img src="" alt="">-->
                        <!--</div>-->
                    </div>
                    <div class="chatCon senderUser">
                        <div class="content">
                            <p>{{item.data}}</p>
                        </div>
                        <div class="head_pic">
                            <img :src="item.msgModule.senderUser.avatar" alt="">
                        </div>

                        <!--<div class="loadingImg">-->
                        <!--<img src="" alt="">-->
                        <!--</div>-->
                    </div>

                </div>
            </div>

        </div>
        <!--聊天输入框-->
        <div class="chatInput">
            <input type="text" v-model="textMsg" placeholder="请输入您的消息" @focus="getFoucsVal()">
            <input type="file" id="image" ref="sendImgInput" accept="image/*" @change="sendImg"
                   style="display: none;">
            <div class="send">
                <!--<transition name="fade" mode="out-in">-->
                <img src="../../images/icon-chat-img.png" alt="" v-if="textMsg==''"
                     @click="$refs.sendImgInput.click()">
                <mt-button type="danger" v-else @click="sendText()">发送</mt-button>
                <!--</transition>-->
            </div>
        </div>
    </div>
</template>

<script>
    import {formatDate} from "../../config/date";

    let Base64 = require('js-base64').Base64;
    import md5 from 'js-md5';

    export default {
        name: "chat",
        data() {
            return {
                // 环信初始化（创建连接）
                conn: new WebIM.connection({
                    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
                    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
                    url: WebIM.config.xmppURL,
                    heartBeatWait: WebIM.config.heartBeatWait,
                    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
                    autoReconnectInterval: WebIM.config.autoReconnectInterval,
                    apiUrl: WebIM.config.apiURL,
                    isAutoLogin: true
                }),

                goodsInfo: {merchant_info: {}},           // 商品信息
                msgData: [],             // 消息列表(包含用户商家信息)
                // 聊天输入框
                textMsg: '',         // 内容

                user_id: Base64.decode(this.$getCookie('user_md5'))

            }
        },
        mounted() {
            this.getHistory()


        },
        filters: {
            formatDate(time) {
                var date = new Date(time * 1000)
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            },
        },
        methods: {
            // 1.进入页面先拉去历史记录
            getHistory() {
                // 判断是否有信息，这里先要确定是后台给接口还是自己走本地
                // 没有信息
                this.getWebIM()
            },
            // 2.调用环信--添加回调函数
            getWebIM() {
                // 监听回调
                this.conn.listen({
                    onOpened: function (message) {          //连接成功回调
                        // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
                        // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
                        // 则无需调用conn.setPresence();
                    },
                    onClosed: function (message) {
                    },         //连接关闭回调
                    onTextMessage: function (message) {
                        this.dealMsg(message)           // 处理文本
                    },    //收到文本消息
                    onEmojiMessage: function (message) {
                    },   //收到表情消息
                    onPictureMessage: function (message) {
                    }, //收到图片消息
                    onCmdMessage: function (message) {
                    },     //收到命令消息
                    onAudioMessage: function (message) {
                    },   //收到音频消息
                    onLocationMessage: function (message) {
                    },//收到位置消息
                    onFileMessage: function (message) {
                    },    //收到文件消息
                    onVideoMessage: function (message) {
                        var node = document.getElementById('privateVideo');
                        var option = {
                            url: message.url,
                            headers: {
                                'Accept': 'audio/mp4'
                            },
                            onFileDownloadComplete: function (response) {
                                var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
                                node.src = objectURL;
                            },
                            onFileDownloadError: function () {
                            }
                        };
                        WebIM.utils.download.call(conn, option);
                    },   //收到视频消息
                    onPresence: function (message) {
                    },       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
                    onRoster: function (message) {
                    },         //处理好友申请
                    onInviteMessage: function (message) {
                    },  //处理群组邀请
                    onOnline: function () {
                    },                  //本机网络连接成功
                    onOffline: function () {
                    },                 //本机网络掉线
                    onError: function (message) {
                    },          //失败回调
                    onBlacklistUpdate: function (list) {       //黑名单变动
                        // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
                    },
                    onReceivedMessage: function (message) {
                    },    //收到消息送达服务器回执
                    onDeliveredMessage: function (message) {
                    },   //收到消息送达客户端回执
                    onReadMessage: function (message) {
                    },        //收到消息已读回执
                    onCreateGroup: function (message) {
                    },        //创建群组成功回执（需调用createGroupNew）
                    onMutedMessage: function (message) {
                    }        //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
                })
                // 登录
                var options = {
                    apiUrl: WebIM.config.apiURL,
                    user: this.user_id,
                    pwd: md5(this.user_id + 'pinquduo'),
                    appKey: WebIM.config.appkey,
                    success: function (res) {
                        console.log('登录成功')
                    }
                };
                this.getReply()

                this.conn.open(options);
            },
            // 3.自动回复信息
            getReply() {
                this.$post('Robotreply/getReply', {
                    token: this.$getCookie('token'),
                    store_id: this.$route.query.store_id
                })
                    .then(res => {
                        console.log('这里是快捷消息列表')
                        this.getGoodsInfo()
                    })
            },
            // 4.获取商品信息
            getGoodsInfo() {
                this.$post('goods/getGoodsDetail', {
                    goods_id: this.$route.query.goods_id,
                    token: this.$getCookie('token')
                })
                    .then(res => {
                        let msgModule = this.setMsgModule()
                        this.goodsInfo = res
                        msgModule.goodsLink = true
                        msgModule.goodsInfo = {
                            goods_id: res.goods_id,
                            goods_name: res.goods_name,
                            goods_share_url: res.share_url,
                            original: res.original,
                            original_img: res.original_img,
                            prom: res.prom,
                            prom_price: res.prom_price
                        }
                        let msgItemTep = {
                            msgModule: msgModule,
                            goodsLink: true
                        }
                        this.msgData = this.msgData.concat(msgItemTep)
                    })
            },


            // 设置消息体
            setMsgModule() {
                let msgModule = {
                    // 接收者
                    receiverUser: {
                        avatar: this.goodsInfo.merchant_info.store_logo,
                        userid: this.goodsInfo.merchant_info.store_id || 1057,
                        username: this.goodsInfo.merchant_info.store_name
                    },
                    // 发送者
                    senderUser: {
                        avatar: this.$getCookie('head_pic'),
                        userid: this.$getCookie('token'),
                        username: this.$getCookie('nickname')
                    },
                    // 时间戳
                    time: parseInt(new Date().getTime() / 1000),
                    // 来源体 wx
                    terminal: 'wx'
                }
                return msgModule;
            },


            // 输入框获取焦点
            getFoucsVal() {
                // let self = this;
                // setTimeout(()=>{
                //     let ua = navigator.userAgent.toLowerCase()
                //     let temNum = parseInt(ua.substring(ua.indexOf('os')+2,ua.indexOf('like')).trim().split('_').join(''))
                //     if (temNum<1111) {
                //         window.scrollTo(0,3000)
                //     }
                // },400)
            },
            // 处理收到的消息
            dealMsg(msg) {
                console.log(msg)
            },
            // 发送图片
            sendImg() {
                let self = this;
                // 单聊发送图片消息
                var sendPrivateImg = function () {
                    var id = self.conn.getUniqueId();                   // 生成本地消息id
                    var msg = new WebIM.message('img', id);        // 创建图片消息
                    var input = document.getElementById('image');  // 选择图片的input
                    var file = WebIM.utils.getFileUrl(input);      // 将图片转化为二进制文件
                    var allowType = {
                        'jpg': true,
                        'jpeg': true,
                        'gif': true,
                        'png': true,
                        'bmp': true
                    };
                    if (file.filetype.toLowerCase() in allowType) {
                        // 设置临时消息
                        let msgModule = self.setMsgModule();
                        let temMsgId = parseInt(new Date().getTime() / 1000)            // 以时间戳作为id
                        msgModule.imageSize = self.imageSize(self.$refs.sendImgInput)
                        let msgTep = {
                            url: file.url,          // 图片url
                            to: 'store' + self.goodsInfo.merchant_info.store_id,           // 发送给商家
                            from: this.user_id,              // 发送人token
                            msgModule: msgModule,                    // 发送的消息体
                            id: temMsgId,                            // 发送的时间id
                            loading: true,
                            sendFinished: false
                        }
                        console.log(msgTep)
                        self.msgData = self.msgData.concat(msgTep)          // 记录消息
                        // self.goBottom()                 // 效果是页面上滑
                        // 见环信文档
                        var option = {
                            apiUrl: WebIM.config.apiURL,
                            file: file,
                            to: msgTep.to,                       // 接收消息对象
                            roomType: false,
                            chatType: 'singleChat',
                            onFileUploadError: function (e, id) {      // 消息上传失败
                                console.log('onFileUploadError');
                                console.log(e);
                                console.log(id);
                                for (let i = self.msgData.length - 1; i >= 0; i--) {
                                    if (self.msgData[i].id == temMsgId) {
                                        self.msgData[i].sendFinished = true
                                        self.msgData[i].loading = false
                                        return;
                                    }
                                }
                            },
                            onFileUploadComplete: function () {   // 消息上传成功
                                console.log('onFileUploadComplete');
                            },
                            success: function () {                // 消息发送成功
                                console.log('Success');
                                for (let i = self.msgData.length - 1; i >= 0; i--) {
                                    if (self.msgData[i].id == temMsgId) {
                                        self.msgData[i].loading = false
                                        self.msgData[i].id = id
                                        return;
                                    }
                                }
                            },
                            flashUpload: WebIM.flashUpload
                        };
                        msg.set(option);
                        self.conn.send(msg.body);
                    }
                };
                sendPrivateImg();       // 自调用
            },
            // 图片尺寸
            imageSize(file) {
                console.log(file)
                let render = new FileReader;
                let imageSize = {}
                render.onload = function (evt) {
                    let image = new Image();
                    image.src = evt.target.result
                    image.onload = function () {
                        imageSize.height = this.height
                        imageSize.width = this.width
                    }
                }
                render.readAsDataURL(file.files[0]);
                return imageSize
            },
            // 点击发送按按钮/点击自动回复/点击发送链接按钮
            sendText(obj) {
                console.log(obj)
                let self = this;
                let msgModule = self.setMsgModule() //获取消息体信息
                if (obj) {      // obj存在
                    if (obj.type == 'autoReply') {          // 点击自动回复
                        msgModule.autoReplyId = obj.autoReplyId         // 把消息的id添加到消息体的对象
                        console.log(msgModule)
                    } else if (obj.type == 'goods') {       // 点击商品链接
                        msgModule.goods = this.goodsInfo                // 把商品信息添加到消息体的对象
                        console.log(msgModule)

                    }
                }
                // 创建临时消息
                let temMsgId = parseInt(new Date().getTime() / 1000)            // 以时间戳作为id
                let msgTep = {
                    data: self.textMsg,          // 消息内容
                    to: 'store' + self.goodsInfo.merchant_info.store_id,           // 发送给商家
                    from: this.user_id,              // 发送人token
                    msgModule: msgModule,                    // 发送的消息体
                    id: temMsgId,                            // 发送的时间id
                    loading: true,
                    sendFinished: false
                }
                console.log(msgTep)

                // 清空输入框内容
                self.textMsg = ''
                self.msgData = self.msgData.concat(msgTep)          // 记录消息
                // self.goBottom()                 // 效果是页面上滑

                // 单聊发送文本消息（见环信开发文档）
                var sendPrivateText = function () {
                    var id = self.conn.getUniqueId();                 // 生成本地消息id
                    var msg = new WebIM.message('txt', id);      // 创建文本消息
                    msg.set({
                        msg: msgTep.data,                  // 消息内容
                        to: msgTep.to,                          // 接收消息对象（用户id）
                        roomType: false,
                        success: function (id, serverMsgId) {
                            console.log('send private text Success');
                            for (let i = self.msgData.length - 1; i >= 0; i--) {
                                if (self.msgData[i].id == temMsgId) {
                                    self.msgData[i].loading = false
                                    self.msgData[i].id = serverMsgId
                                    return;
                                }
                            }
                        },
                        fail: function (e) {
                            console.log("Send private text error");
                            for (let i = self.msgData.length - 1; i >= 0; i--) {
                                if (self.msgData[i].id == temMsgId) {
                                    self.msgData[i].sendFinished = true
                                    self.msgData[i].loading = false
                                    return;
                                }
                            }
                        }
                    });
                    msg.body.chatType = 'singleChat';
                    self.conn.send(msg.body);
                };
                sendPrivateText();              // 自调用
            },
            // 发送消息后聊天室的位置上移
            goBottom() {
                this.$nextTick(() => {
                    document.querySelector('.chatMsgItem').scrollTop = document.querySelector('.chatMsgItem').scrollHeight + 2000
                })
            },

            // 查看更多聊天记录
            loadingMoreClick() {
                alert('wait')
            },
        },

        watch: {
            msgData() {
            }
        }

    }
</script>

<style scoped lang="scss">
    .chat {
        padding: 20px;
        .chatList {
            .loadingMore {
                p {
                    text-align: center;
                }
                margin-bottom: 20px;
            }
            .chatMsg {
                .chatMsgItem {
                    .chatTime {
                        text-align: center;
                        margin-top: 20px;
                        color: red;
                    }
                    .chatCon {
                        .head_pic {
                            img {
                                display: block;
                                width: 60px;
                                height: 60px;
                                -webkit-border-radius: 50%;
                                -moz-border-radius: 50%;
                                border-radius: 50%;
                                margin-right: 20px;
                            }
                        }
                        .content {
                            background-color: #fff;
                            padding: 20px;
                            -webkit-border-radius: 16px;
                            -moz-border-radius: 16px;
                            border-radius: 16px;
                            max-width: 520px;
                            ul {
                                padding: 10px 0;
                                li {
                                    padding: 10px 0;
                                    border-top: 1px solid #ccc;
                                    border-bottom: 1px solid #ccc;
                                }
                            }
                        }
                        /*.loadingImg {*/
                        /*img {*/

                        /*}*/
                        /*}*/
                    }
                    .receiverUser {
                        display: flex;
                        justify-content: flex-start;
                        align-items: flex-start;
                    }
                    .senderUser {
                        display: flex;
                        justify-content: flex-end;
                        align-items: flex-start;
                    }
                }
                .goodsLink {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    background-color: #fff;
                    margin-left: 80px;
                    padding: 20px;
                    max-width: 520px;
                    .goodsPic {
                        display: block;
                        width: 100px;
                        height: 100px;
                        img {
                            display: block;
                            height: 100px;
                            width: 100px;
                        }
                    }
                    .goodsInfo {
                        flex: 1;
                        p {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            > span {
                                &:first-child {
                                    span {
                                        &:first-child {
                                            color: red;
                                            margin-right: 10px;
                                            b {
                                                font-size: 26px;
                                            }
                                        }
                                        &:last-child {
                                            color: #999;
                                        }
                                    }
                                }
                                &:last-child {
                                    color: red;
                                    padding: 4px 8px;
                                    border: 1px solid red;
                                    -webkit-border-radius: 12px;
                                    -moz-border-radius: 12px;
                                    border-radius: 12px;
                                }
                            }
                        }
                    }
                }
            }
        }
        .chatInput {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 20px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            background-color: #fff;
            input[type='text'] {
                flex: 5;
                padding: 20px;
            }
            .send {
                flex: 1;
                img {
                    margin: 0 auto;
                    display: block;
                    width: 50px;
                    height: 50px;
                }
                .mint-button {
                    display: block;
                    margin: 0 auto;
                }
            }
        }
    }
</style>
