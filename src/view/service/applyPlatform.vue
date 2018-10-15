<template>
    <div class="seeLogistics">
        <div class="orderInfo">
            <p>订单信息</p>
            <div>
                <p>
                    <label>退货编号：</label>
                    <span>{{refund_info.order_sn}}</span>
                </p>
                <p>
                    <label>商品名称：</label>
                    <span>{{refund_info.goods_name}}</span>
                </p>
                <p>
                    <label>商品价格：</label>
                    <span>{{refund_info.return_money}}</span>
                </p>
                <p>
                    <label>订单状态：</label>
                    <span>{{status.order_service_name}}</span>
                </p>
            </div>
        </div>
        <div class="typeDiv">
            <p><span class="icon red">*</span>发货说明</p>
            <textarea v-model="refundRemark" rows="5" placeholder="请输入问题可增加退款/退货的成功几率"></textarea>
        </div>
        <div class="typeDiv typeImg">
            <p><span class="icon red">*</span>上传凭证<span class="tip">(最多三张)</span></p>
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
            <span>最多不超过3张图</span>
            <span>照片大小不超过5M，支持png、jpg</span>
        </div>
        <div class="applyBtn">
            <mt-button size="large" type="danger" @click="submitApply">提交申请</mt-button>
        </div>
    </div>
</template>

<script>
    let lrz = require('lrz');
    import {Toast, Indicator} from 'mint-ui';

    export default {
        name: "seeLogistics",
        data() {
            return {
                refund_info: {},
                status: {},
                refundRemark: '',
                imgList: [],
            }
        },
        mounted() {
            this.getInfo()
        },
        methods: {
            // 获取订单信息
            getInfo() {
                this.$post('user/getRefundInfo', {
                    order_sn: this.$route.query.order_sn,
                    token: this.$getCookie('token')
                })
                    .then(res => {
                        this.refund_info = res.refund_info
                        this.status = res.status
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
            // 提交申请
            submitApply() {
                this.$post('user/handlePlatformIntervention', {
                    token: this.$getCookie('token') ? this.$getCookie('token') : '',
                    order_sn: this.$route.query.order_sn,
                    desc: this.refundRemark,
                    proof_imgs: this.imgList
                })
                    .then(res => {
                        Toast({
                            message: '申请成功',
                            duration: 1200
                        })
                        setTimeout(() => {
                            this.$router.push('/user/order?type=5')
                        }, 1400)
                    })
            }

        }
    }
</script>

<style scoped lang="scss">
    .seeLogistics {
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
                    }
                    span {
                        color: #888;
                    }
                }
            }
        }
        .typeDiv {
            display: flex;
            justify-content: flex-start;
            flex-direction: column;

            textarea {
                padding: 20px;
                resize: none;
                margin-top: 20px;
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
        .applyBtn {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            .mint-button {
                height: 96px;
                font-size: 32px;
            }
        }
    }
</style>
