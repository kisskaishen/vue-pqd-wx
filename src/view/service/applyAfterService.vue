<template>
    <div class="service">
        <div class="goods">
            <div class="goodsInfo">
                <div class="divFl">
                    <img :src="goodsInfo.list_img" alt="商品图片">
                </div>
                <div class="divFr">
                    <p>{{goodsInfo.goods_name}}</p>
                    <span>规格</span>
                    <p>
                        <b class="red">￥{{goodsInfo.order_amount}}</b>
                        <span>x1</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="type">
            <div class="typeDiv typeSelect typeSelect2">
                <p>是否收货</p>
                <span>{{this.$route.query.type=='1'?'已收到宝贝':'未收到宝贝'}}</span>
            </div>
            <div class="typeDiv typeSelect">
                <p>申请类型</p>
                <select v-model="refundType">
                    <option v-for="item,index in refundTypes" :value="item.service_type">{{item.service_name}}</option>
                </select>
            </div>

            <div class="typeDiv typeSelect">
                <p>申请原因</p>
                <select v-model="refundReason">
                    <option v-for="item,index in refundReasons" :value="item">{{item}}</option>
                </select>
            </div>
            <div class="typeDiv typeHrInput">
                <!--<p><span class="icon red">*</span>退款额度（元）<span class="tip">(最高可退款{{goodsInfo.order_amount}}金额)</span>-->
                <p>退款额度</p>
                <input type="number" class="red" v-model="refundMoney" placeholder="退款金额">
                <span class="tip">最高可退{{goodsInfo.order_amount}}</span>
            </div>
            <div class="typeDiv typeInput">
                <p>退款说明</p>
                <textarea v-model="refundRemark" rows="2" placeholder="问题描述越详细，可以提高您的申请成功率"></textarea>
            </div>
            <div class="typeDiv typeHrInput typeHrInput2">
                <p>联系电话</p>
                <input type="number" v-model="tel" placeholder="联系电话">
            </div>
            <div class="typeDiv typeImg">
                <p>上传凭证</p>
                <div class="typeImgList">
                    <div class="imgList" v-for="item,index in imgList">
                        <i class="red" @click="deleteImg(item,index)"></i>
                        <img :src="item" alt="">
                    </div>
                    <div class="addImg" v-if="imgList.length<3" @change="upload">
                        <input type="file" accept="image/jpeg,image/jpg,image/png" captur="camera">
                        <i></i>
                        <span>{{imgList.length}}/3</span>
                    </div>
                </div>
                <!--<span>最多不超过3张图</span>-->
                <!--<span>照片大小不超过5M，支持png、jpg</span>-->
            </div>

        </div>
        <div class="applyBtn">
            <button size="large" @click="submitApply">提交申请</button>
        </div>
    </div>
</template>

<script>
    let lrz = require('lrz');
    import {Toast, Indicator} from 'mint-ui';

    export default {
        name: "applyAfterService",
        data() {
            return {
                goodsInfo: '',
                // 退款方式
                refundTypes: '',
                refundType: '',
                // 退款金额
                refundMoney: '',
                // 退款理由
                refundReasons: [],
                refundReason: '',
                // 退款说明
                refundRemark: '',
                // 退款电话
                tel: '',
                // 上传凭证
                imgList: [],

            }
        },
        mounted() {
            this.getInfo()
        },
        methods: {
            // 获取申请信息
            getInfo() {
                this.$post('user/getOrderServiceConfig', {
                    token: this.$getCookie('token'),
                    type: this.$route.query.type,
                    order_sn: this.$route.query.order_sn
                })
                    .then(res => {
                        this.refundTypes = [{service_name: '请选择退款方式'}].concat(res.service_type)
                        this.refundType = '请选择退款方式'
                        this.refundReasons = ['请选择退款理由'].concat(res.reason)
                        this.refundReason = '请选择退款理由'
                        this.goodsInfo = res.order_goods
                        this.refundMoney = res.order_goods.order_amount
                    })

            },
            // 删除图片
            deleteImg(val, index) {
                this.imgList.splice(index, 1)
            },
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
            uploadImg (img) {
                // instance.close();
                let data = new FormData();
                data.append('_uimg', img)
                data.append('_utype', 'base64')
                data.append('type', 'default')
                // data.append('picture', e.target.files[0])
                this.$upload('Upload/index', data)
                    .then(res => {
                        this.imgList.push(res)
                    })
            },
            // 提交申请
            submitApply() {
                if (this.refundType == '请选择退款方式') {
                    Toast({
                        message: '请选择退款方式',
                        duration: 1400
                    })
                } else if (this.refundMoney == '' || this.refundMoney == '0') {
                    Toast({
                        message: '请输入退款金额',
                        duration: 1400
                    })
                } else if (this.refundMoney > this.$route.query.money) {
                    Toast({
                        message: '退款金额不能超过' + this.$route.query.money + '元',
                        duration: 1400
                    })
                } else if (this.refundReason == '请选择退款理由') {
                    Toast({
                        message: '请选择退款理由',
                        duration: 1400
                    })
                } else if (this.refundRemark == '') {
                    Toast({
                        message: '请填写退款说明',
                        duration: 1400
                    })
                } else if (this.imgList == []) {
                    Toast({
                        message: '请上传凭证',
                        duration: 1400
                    })
                } else {
                    if (this.$route.query.againApply == 'yes') {
                        this.$post('user/againRefund', {
                            token: this.$getCookie('token'),
                            order_sn: this.$route.query.order_sn,
                            service_type: this.refundType,
                            return_money: this.refundMoney,
                            reason: this.refundReason,
                            desc: this.refundRemark,
                            proof_imgs: JSON.stringify(this.imgList),
                        })
                            .then(res => {
                                Toast({
                                    message: '申请已提交，请等待商家处理~',
                                    duration: 1600
                                })
                                setTimeout(() => {
                                    this.$router.push('/user/order?type=5')
                                }, 1400)
                            })
                    } else {
                        this.$post('user/refundAmountOrder', {
                            token: this.$getCookie('token'),
                            order_sn: this.$route.query.order_sn,
                            service_type: this.refundType,
                            return_money: this.refundMoney,
                            reason: this.refundReason,
                            desc: this.refundRemark,
                            proof_imgs: JSON.stringify(this.imgList),
                        })
                            .then(res => {
                                Toast({
                                    message: '申请已提交，请等待商家处理~',
                                    duration: 1600
                                })
                                setTimeout(() => {
                                    this.$router.push('/user/order?type=5')
                                }, 1400)
                            })
                    }
                }

            },

        },
    }
</script>

<style scoped lang="scss">
    .service {
        padding-bottom: 80px;
        > div {
            padding: 0 26px;
        }
        .goods {
            padding: 40px 26px 0;
            .goodsInfo {
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                padding-bottom: 40px;
                border-bottom: 1px solid #eee;
                .divFl {
                    img {
                        width: 180px;
                        height: 180px;
                        margin-right: 20px;
                    }
                }
                .divFr {
                    flex-direction: column;
                    align-items: flex-start;
                    align-self: center;
                    > p {
                        font-size: 30px;
                        color: #333;
                        line-height: 40px;
                        b {
                            font-size: 32px;
                            margin-right: 22px;
                        }
                        span {
                            font-size: 28px;
                            color: #4c4c4c;
                        }
                    }
                    > span {
                        font-size: 24px;
                        color: #999;
                        margin: 20px 0 28px;
                    }
                }

            }
        }

        .type {
            margin: 50px 0;
            background-color: #fff;
            .typeDiv {
                display: flex;
                justify-content: flex-start;
                margin-bottom: 50px;
                font-size: 30px;
                color: #333;
                > p {
                    font-size: 28px;
                    margin-right: 34px;
                    .red {
                        margin-right: 8px;
                    }
                    .tip {
                        font-size: 24px;
                        color: #999;
                    }
                }

            }
            .typeSelect {
                display: flex;
                align-items: center;
                position: relative;
                align-items: center;
                select {
                    border: none;
                    padding: 0;
                    flex: 1;
                    font-size: 30px;
                    line-height: 40px;
                    border-bottom: 1px solid #eee;
                }
                &:after {
                    position: absolute;
                    content: '';
                    right: 0;
                    width: 18px;
                    height: 10px;
                    background: url("../../imgs/service/icon-arrow-bottom.png") no-repeat center /100%;
                }
            }
            .typeSelect2 {
                &:after {
                    background: none;
                }
            }
            .typeHrInput {
                align-items: center;
                input {
                    border: none;
                    font-size: 30px;
                    font-weight: bold;
                }
                .tip {
                    font-size: 24px;
                    color: #999;
                }
            }
            .typeHrInput2 {
                input {
                    font-weight: normal;
                }
            }
            .typeInput {
                flex-direction: column;
                input {
                    padding: 30px;
                    border: none;
                    font-size: 30px;
                }
                textarea {
                    border: none;
                    padding: 40px 2px;
                    font-size: 30px;
                    resize: none;
                    border-bottom: 2px solid #eee;
                }
            }
            .typeImg {
                flex-direction: column;
                > span {
                    font-size: 24px;
                }
                .typeImgList {
                    margin-top: 20px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    .imgList {
                        display: inline-block;
                        position: relative;
                        margin-right: 36px;
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
            }
        }
        .applyBtn {
            /*position: fixed;*/
            /*left: 0;*/
            /*right: 0;*/
            /*bottom: 0;*/
            margin-top: 70px;
            button {
                width: 100%;
                height: 96px;
                line-height: 96px;
                font-size: 32px;
                color: #fff;
                background-color: #FF4862;
                border-radius: 8px;
            }
        }
    }

</style>
