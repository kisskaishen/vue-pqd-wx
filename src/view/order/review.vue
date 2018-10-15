<template>
    <div class="orderReview">
        <div class="top">
            <div class="divFl">
                <img :src="orderInfo.list_img" alt="">
            </div>
            <div class="divFr">
                <p>{{orderInfo.goods_name}}</p>
            </div>
        </div>
        <div class="content">
            <textarea v-model="contentVal" rows="4" placeholder="买到的商品还满意吗？快说说他的优点和美中不足之处吧。评论需不少于10个字"></textarea>
            <div class="imgs">
                <div class="imgList" v-for="item,index in imgList">
                    <i class="red" @click="deleteImg(item,index)"></i>
                    <img :src="item" alt="">
                </div>
                <div class="addImg" v-if="imgList.length<5" @change="upload">
                    <input type="file" accept="image/jpeg,image/jpg,image/png" captur="camera">
                    <i></i>
                    <span>{{imgList.length}}/5</span>
                </div>
            </div>
            <div class="tips">
                <div class="divFl" @click="checkOptions">
                    <i :class="isHideName?'hideName':''"></i>
                    <span>匿名</span>
                </div>
                <div class="divFr">
                    <span>你的评价能帮助其他小伙伴呦</span>
                </div>
            </div>
        </div>
        <div class="starsDiv" v-if="!this.$route.query.type||this.$route.query.type!='zhui'">
            <b><i></i>店铺评分</b>
            <div class="stars">
                <div>
                    <label>描述相符</label>
                    <ul>
                        <li v-for="(item,index) in itemClasses1" :class="item" class="star-item"
                            @click="stars1(index)" track-by="index"></li><!--性能优化 track-by 数据不改变时不会重新渲染-->
                    </ul>
                    <span>{{item1Text}}</span>
                </div>
                <div>
                    <label>物流服务</label>
                    <ul>
                        <li v-for="(item,index) in itemClasses2" :class="item" class="star-item"
                            @click="stars2(index)" track-by="index"></li><!--性能优化 track-by 数据不改变时不会重新渲染-->
                    </ul>
                    <span>{{item2Text}}</span>
                </div>
                <div>
                    <label>服务态度</label>
                    <ul>
                        <li v-for="(item,index) in itemClasses3" :class="item" class="star-item"
                            @click="stars3(index)" track-by="index"></li><!--性能优化 track-by 数据不改变时不会重新渲染-->
                    </ul>
                    <span>{{item3Text}}</span>
                </div>
            </div>
        </div>
        <div class="btn">
            <button @click="submitBtn">发表</button>
        </div>
    </div>
</template>

<script>
    let lrz = require('lrz');
    import {Toast, Indicator} from 'mint-ui';

    export default {
        name: "review",
        data() {
            return {
                orderInfo: {},
                contentVal: '',      // 评价内容
                imgList: [],         // 上传图片列表
                isHideName: false,      // false=>不是匿名
                score1: 5,              // 描述相符
                score2: 5,              // 物流服务
                score3: 5,              // 服务态度

                item1Text: '',
                item2Text: '',
                item3Text: '',

            }
        },
        mounted() {
            this.getOrder()
        },
        computed: {
            itemClasses1() {
                let result = []; // 返回的是一个数组,用来遍历输出星星
                let score = Math.floor(this.score1 * 2) / 2; // 计算所有星星的数量
                let integer = Math.floor(score); // 整数星星判断
                for (let i = 0; i < integer; i++) { // 整数星星使用on
                    result.push("on"); // 一个整数星星就push一个CLS_ON到数组
                }
                while (result.length < 5) {// 余下的用无星星补全,使用off
                    result.push("off");
                }
                switch (score) {
                    case 0:
                        this.item1Text = '';
                        break;
                    case 1:
                        this.item1Text = '非常差';
                        break;
                    case 2:
                        this.item1Text = '差';
                        break;
                    case 3:
                        this.item1Text = '一般';
                        break;
                    case 4:
                        this.item1Text = '好';
                        break;
                    case 5:
                        this.item1Text = '非常好';
                        break;
                }
                return result;
            },
            itemClasses2() {
                let result = []; // 返回的是一个数组,用来遍历输出星星
                let score = Math.floor(this.score2 * 2) / 2; // 计算所有星星的数量
                let integer = Math.floor(score); // 整数星星判断
                for (let i = 0; i < integer; i++) { // 整数星星使用on
                    result.push("on"); // 一个整数星星就push一个CLS_ON到数组
                }
                while (result.length < 5) {// 余下的用无星星补全,使用off
                    result.push("off");
                }
                switch (score) {
                    case 0:
                        this.item2Text = '';
                        break;
                    case 1:
                        this.item2Text = '非常差';
                        break;
                    case 2:
                        this.item2Text = '差';
                        break;
                    case 3:
                        this.item2Text = '一般';
                        break;
                    case 4:
                        this.item2Text = '好';
                        break;
                    case 5:
                        this.item2Text = '非常好';
                        break;
                }
                return result;
            },
            itemClasses3() {
                let result = []; // 返回的是一个数组,用来遍历输出星星
                let score = Math.floor(this.score3 * 2) / 2; // 计算所有星星的数量
                let integer = Math.floor(score); // 整数星星判断
                for (let i = 0; i < integer; i++) { // 整数星星使用on
                    result.push("on"); // 一个整数星星就push一个CLS_ON到数组
                }
                while (result.length < 5) {// 余下的用无星星补全,使用off
                    result.push("off");
                }
                switch (score) {
                    case 0:
                        this.item3Text = '';
                        break;
                    case 1:
                        this.item3Text = '非常差';
                        break;
                    case 2:
                        this.item3Text = '差';
                        break;
                    case 3:
                        this.item3Text = '一般';
                        break;
                    case 4:
                        this.item3Text = '好';
                        break;
                    case 5:
                        this.item3Text = '非常好';
                        break;
                }
                return result;
            }
        },
        methods: {
            // 获取订单详情
            getOrder() {
                this.$post('user/getOrderDetail', {
                    token: this.$getCookie('token'),
                    order_sn: this.$route.query.order_sn
                })
                    .then(res => {
                        this.orderInfo = res
                    })
            },
            // 上传图片
            upload(e) {
                let self = this
                let imgInfo = ''
                Indicator.open({
                    text: '图片上传中...',
                    spinnerType: 'snake'
                });
                lrz(e.target.files[0], {quality: .4})
                    .then(function (res) {
                        imgInfo = res.base64
                        self.uploadImg(imgInfo)
                    })
                    .always(function () {
                        // 清空文件上传控件的值
                        e.target.value = null;
                    });

            },
            uploadImg(img) {
                let data = new FormData();
                data.append('_uimg', img)
                data.append('_utype', 'base64')
                data.append('type', 'default')
                this.$upload('Upload/index', data)
                    .then(res => {
                        this.imgList.push(res)
                    })
            },
            // 删除
            deleteImg(val, index) {
                this.imgList.splice(index, 1)
            },

            // 匿名？
            checkOptions() {
                this.isHideName = !this.isHideName
            },

            stars1(index) {
                this.score1 = index + 1
            },
            stars2(index) {
                this.score2 = index + 1
            },
            stars3(index) {
                this.score3 = index + 1
            },

            submitInfo() {
                if (this.$route.query.type == 'zhui') {
                    this.$post('user/appendCommentOrder', {
                        order_sn: this.$route.query.order_sn,
                        content: this.contentVal == '' ? '' : this.contentVal,
                        is_hide_user: this.isHideName == true ? '1' : '2',
                        img: JSON.stringify(this.imgList),
                        token: this.$getCookie('token') ? this.$getCookie('token') : ''
                    })
                        .then(res => {
                            Toast({
                                message: '追评评价',
                                duration: 1000
                            })
                            setTimeout(() => {
                                this.$router.push({
                                    path: '/detail/review',
                                    query: {
                                        goods_id: this.orderInfo.goods_id
                                    }
                                })
                            }, 1000)
                        })
                } else {
                    this.$post('user/commentOrder', {
                        order_sn: this.$route.query.order_sn,
                        content: this.contentVal,
                        deliver_rank: this.score2,
                        goods_rank: this.score1,
                        service_rank: this.score3,
                        is_hide_user: this.isHideName == true ? '1' : '2',
                        img: JSON.stringify(this.imgList),
                        token: this.$getCookie('token') ? this.$getCookie('token') : ''
                    })
                        .then(res => {
                            Toast({
                                message: '评价成功',
                                duration: 1000
                            })
                            setTimeout(() => {
                                this.$router.push({
                                    path: '/detail/review',
                                    query: {
                                        goods_id: this.orderInfo.goods_id
                                    }
                                })
                            }, 1000)
                        })
                }
            },

            // 发表
            submitBtn() {
                if (this.contentVal != '' && this.contentVal.length > 10) {
                    this.submitInfo()
                } else if (this.contentVal == '') {
                    this.submitInfo()
                } else {
                    Toast({
                        message: '评论不能少于10个字',
                        duration: 1400
                    })
                }

            }
        },
    }
</script>

<style scoped lang="scss">
    .orderReview {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        min-height: 100%;
        background-color: #fff;
        > div {
            padding: 0 26px;
        }
        .top {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 40px 26px;
            border-bottom: 1px solid #eee;
            .divFl {
                img {
                    width: 100px;
                    height: 100px;
                }
            }
            .divFr {
                display: flex;
                justify-content: center;
                align-items: center;
                p {
                    max-height: 80px;
                    line-height: 40px;
                    color: #333;
                    font-size: 30px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }
            }
        }
        .content {
            margin: 30px 0;
            textarea {
                width: 100%;
                border: none;
                font-size: 30px;
                resize: none;
            }
            .imgs {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: wrap;
                margin-top: 20px;
                .imgList {
                    position: relative;
                    margin-right: 20px;
                    margin-bottom: 16px;
                    img {
                        width: 150px;
                        height: 150px;
                    }
                    .red {
                        position: absolute;
                        right: -20px;
                        top: -20px;
                        width: 40px;
                        height: 40px;
                        text-align: center;
                        color: #fff;
                        background: url("../../imgs/service/icon-image-close.png") no-repeat center /100%;
                        -webkit-border-radius: 50%;
                        -moz-border-radius: 50%;
                        border-radius: 50%;
                    }
                }
                .addImg {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 150px;
                    height: 150px;
                    border: 2px dashed #ccc;
                    input[type='file'] {
                        position: absolute;
                        width: 150px;
                        height: 150px;
                        left: 0;
                        right: 0;
                        opacity: 0;
                    }
                    i {
                        display: block;
                        width: 46px;
                        height: 46px;
                        line-height: 46px;
                        background: url("../../imgs/service/icon-camera.png") no-repeat center /100%;
                    }
                    span {
                        color: #999;
                        font-size: 24px;
                        margin-top: 10px;
                    }
                }
            }
            .tips {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 76px 0 38px;
                .divFl {
                    i {
                        width: 34px;
                        height: 34px;
                        background: url("../../imgs/user/icon-no-check.png") no-repeat center /100%;
                    }
                    .hideName {
                        background: url("../../imgs/user/icon-check.png") no-repeat center /100%;
                    }
                    span {
                        width: auto;
                        font-size: 28px;
                        color: #333;
                        margin-left: 20px;
                    }
                }
                .divFr {
                    span {
                        font-size: 28px;
                        color: #999;
                    }
                }
            }
        }
        .starsDiv {
            > b {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                color: #4D4D4D;
                font-size: 30px;
                i {
                    width: 4px;
                    height: 16px;
                    background: rgba(255, 70, 78, 1);
                    border-radius: 2px;
                    margin-right: 16px;
                }
            }
            .stars {
                margin-top: 40px;
                > div {
                    padding: 20px 0;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    label {
                        font-size: 28px;
                        color: #4d4d4d;
                    }
                    ul {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        margin-left: 40px;
                        li {
                            width: 40px;
                            height: 38px;
                            background: url("../../imgs/detail/icon-goods-collect.png") no-repeat center /100%;
                            margin-right: 40px;
                        }
                        .on {
                            background: url("../../imgs/detail/icon-goods-collect-active.png") no-repeat center /100%;
                        }
                    }
                    span {
                        font-size: 28px;
                        color: #4d4d4d;
                    }
                }
            }
        }
        .btn {
            margin-top: 80px;
            button {
                width: 100%;
                height: 98px;
                line-height: 98px;
                background-color: #ff4862;
                color: #fff;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                border-radius: 8px;
            }
        }
    }
</style>
