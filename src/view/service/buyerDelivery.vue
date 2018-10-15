<template>
    <div class="buyerDelivery">
        <div class="orderInfo">
            <p>订单信息</p>
            <div>
                <p>
                    <label>退货编号：</label>
                    <span>{{refund_info.return_sn}}</span>
                </p>
                <p>
                    <label>商品名称：</label>
                    <span>{{refund_info.goods_name}}</span>
                </p>
                <p>
                    <label>支付金额：</label>
                    <span>{{refund_info.return_money}}</span>
                </p>
                <p>
                    <label>售后状态：</label>
                    <span>{{status.order_service_name}}</span>
                </p>
                <p>
                    <label>收货人：</label>
                    <span>{{refund_info.consignee}}</span>
                </p>
                <p>
                    <label>收货地址：</label>
                    <span>{{refund_info.address}}</span>
                </p>

            </div>
        </div>
        <div class="logistics">
            <div>
                <i class="red">*</i>
                <label>物流公司</label>
                <select v-model="logisticsCompany" name="" id="">
                    <option v-for="item,index in logisticsCompanyes" :key="item.id" :label="item.logistics_name"
                            :value="item.logistics_code">{{item.logistics_name}}
                    </option>
                </select>
                <img src="../../images/icon-right.png" alt="">
            </div>
            <div>
                <i class="red">*</i>
                <label>物流单号 <span>（请仔细核对物流单号）</span></label>
            </div>
            <div>
                <input type="text" v-model="logisticsOrder" placeholder="请输入物流单号">
            </div>
            <div>
                <label style="padding-left: 10px">发货说明</label>
            </div>
            <div>
                <textarea v-model="logisticsRemark" rows="5" placeholder="请输入问题可增加退款/退货的成功几率"></textarea>
            </div>
            <div>
                <span class="red">*</span>
                <label>
                    上传凭证<span class="tip">(最多三张)</span>
                </label>
            </div>
            <div>
                <div class="typeImgList">
                    <div class="imgList" v-for="item,index in imgList">
                        <i class="red" @click="deleteImg(item,index)">x</i>
                        <img :src="item" alt="">
                    </div>
                    <div class="addImg" v-if="imgList.length<3" @change="upload">
                        <input type="file">
                        <span>+</span>
                    </div>
                </div>
            </div>
            <div>
                <span>最多不超过3张图</span>
            </div>
            <div>
                <span>照片大小不超过5M，支持png、jpg</span>
            </div>
        </div>
        <div class="submitBtn">
            <mt-button type="danger" size="large" @click="submitApply">提交申请</mt-button>
        </div>
    </div>
</template>

<script>
    let lrz = require('lrz');
    import {Toast, Indicator} from 'mint-ui';

    export default {
        name: "buyerDelivery",
        data() {
            return {
                refund_info: {},     // 订单信息
                status: {},          // 状态
                logisticsCompanyes: [],        // 物流公司列表
                logisticsCompany: '',        // 物流公司
                logisticsOrder: '',          // 物流单号
                logisticsRemark: '',

                imgList: [],                 // 上传图片

            }
        },
        mounted() {
            this.getInfo()
            this.getLogistics()
        },
        methods: {
            // 获取订单信息
            getInfo() {
                this.$post('user/getRefundInfo', {
                    order_sn: this.$route.query.order_sn || '2018060914776501010',
                    token: this.$getCookie('token')
                })
                    .then(res => {
                        this.refund_info = res.refund_info
                        this.status = res.status
                    })
            },
            // 获取物流公司
            getLogistics() {
                this.$post('common/getLogisticsList', {
                    order_sn: this.$route.query.order_sn,
                    token: this.$getCookie('token'),
                    type: '3'
                })
                    .then(res => {
                        this.logisticsCompanyes = res
                    })
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
            uploadImg(img) {
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
            // 删除图片
            deleteImg(val, index) {
                this.imgList.splice(index, 1)
            },
            // 提交申请
            submitApply() {
                if (this.logisticsCompany == '') {
                    Toast({
                        message: '请选择物流公司',
                        duration: 1200
                    })
                } else if (this.logisticsOrder == '') {
                    Toast({
                        message: '请填写物流单号',
                        duration: 1200
                    })
                } else if (this.imgList == '') {
                    Toast({
                        message: '请上传凭证',
                        duration: 1200
                    })
                } else if (this.logisticsRemark == '') {
                    Toast({
                        message: '请填写相关说明',
                        duration: 1200
                    })
                } else {
                    this.$post('user/handleDeliverGoods', {
                        order_sn: this.$route.query.order_sn,
                        token: this.$getCookie('token'),
                        shipping_code: this.logisticsCompany,
                        shipping_order: this.logisticsOrder,
                        desc: this.logisticsRemark,
                        proof_imgs: JSON.stringify(this.imgList)
                    })
                        .then(res => {
                            Toast('提交成功')
                            this.$router.push({
                                path: '/service/refundDetail',
                                query: {
                                    order_sn: this.$route.query.order_sn
                                }
                            })
                        })
                }
            }

        }
    }
</script>

<style scoped lang="scss">
    .buyerDelivery {
        > div {
            padding: 20px;
            background-color: #fff;
            margin-top: 20px;
        }
        .orderInfo {
            > p {
                font-weight: bold;
                font-size: 28px;
                margin-bottom: 20px;
            }
            > div {
                p {
                    padding: 4px 0;
                    text-align: justify;
                    padding-left: 120px;
                    text-indent: -120px;
                    label {
                        min-width: 120px;
                        display: inline-block;
                        text-align: right;
                    }
                    span {
                        color: #888;
                        /*overflow: hidden;*/
                    }
                }
            }
        }
        .logistics {
            > div {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 10px 0;
                .red {
                    width: 20px;
                    height: 20px;
                }
                label {
                    min-width: 120px;
                    span {
                        color: #999;
                    }
                }
                select {
                    flex: 1;
                    border: none;
                    option {
                        color: #333;
                    }
                }
                img {
                    width: 36px;
                    height: 36px;
                }
                input[type='text'] {
                    border-top: none;
                    border-left: none;
                    border-right: none;
                    padding: 20px;
                    flex: 1;
                }
                textarea {
                    width: 666px;
                    margin: 0 auto;
                }
                .typeImgList {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    padding: 0 20px;
                    .imgList {
                        display: inline-block;
                        position: relative;
                        margin-right: 20px;
                        img {
                            width: 120px;
                            height: 120px;
                        }
                        .red {
                            position: absolute;
                            right: -15px;
                            top: -15px;
                            width: 30px;
                            height: 30px;
                            text-align: center;
                            color: #fff;
                            background-color: red;
                            -webkit-border-radius: 50%;
                            -moz-border-radius: 50%;
                            border-radius: 50%;
                        }
                    }
                    .addImg {
                        position: relative;
                        input[type='file'] {
                            position: absolute;
                            width: 120px;
                            height: 120px;
                            opacity: 0;
                        }
                        span {
                            display: block;
                            width: 120px;
                            height: 120px;
                            line-height: 120px;
                            overflow: hidden;
                            border: 1px dashed #ccc;
                            font-size: 80px;
                            text-align: center;
                        }
                    }
                }

            }
        }
        .submitBtn {
            .mint-button {
                height: 96px;
                font-size: 28px;
            }
        }
    }
</style>
