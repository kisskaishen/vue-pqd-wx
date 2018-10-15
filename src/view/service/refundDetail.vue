<template>
    <div class="refundDetail">
        <div class="status">
            <span>{{status.order_service_name}}</span>
            <div v-if="refund_info.auto_time">
                <p class="topp">退款时间</p>
                <p>
                    <count-down :endTime="refund_info.auto_time"></count-down>
                </p>
            </div>
            <div v-if="refund_info.consignee||refund_info.address">
                <p class="topp">退货物流</p>
                <p>{{refund_info.consignee}}</p>
                <p>{{refund_info.address}}</p>
            </div>
            <div>
                <p>{{status.tips}}</p>
            </div>

            <mt-button @click="cancelApply"
                       v-if="status.service_button.is_cancel_refund_amount=='1' || status.service_button.is_cancel_refund_goods=='1' ||status.service_button.is_cancel_seller_goods=='1'">
                取消售后
            </mt-button>
            <mt-button @click="buyerDelivery" v-if="status.service_button.is_send_goods=='1'">我要发货</mt-button>
            <mt-button @click="seeLogistics" v-if="status.service_button.is_service_shipping_info=='1'">物流信息</mt-button>
            <mt-button @click="moneyDirection" v-if="status.service_button.is_money=='1'">钱款去向</mt-button>
            <mt-button @click="applyAgain" v-if="status.service_button.is_apply=='1'">再次申请</mt-button>
            <mt-button @click="applyPlatform" v-if="status.service_button.is_platform == '1'">申请平台介入</mt-button>
            <mt-button @click="cancelApplyPlatform" v-if="status.service_button.is_cancel_platform == '1'">取消平台介入</mt-button>
        </div>
        <div class="toConsult">
            <router-link :to="'talkHistory?order_sn='+this.$route.query.order_sn">
                <span>协商记录</span>
                <img src="../../images/icon-right.png" alt="">
            </router-link>

        </div>


        <div class="info">
            <p>
                <b>退款信息</b>
            </p>
            <div>
                <label>店铺名称</label>
                <router-link :to="'/store/index?store_id='+refund_info.store_id">
                    <span>{{refund_info.store_name}}</span>
                    <img src="../../images/icon-right.png" alt="">
                </router-link>
            </div>
            <div>
                <label>商品名称</label>
                <span>{{refund_info.goods_name}}</span>
            </div>
            <div>
                <label>退款类型</label>
                <span>{{refund_info.service_type}}</span>
            </div>
            <div>
                <label>退款金额</label>
                <span>{{refund_info.return_money}}</span>
            </div>
            <div>
                <label>退款原因</label>
                <span>{{refund_info.reason}}</span>
            </div>
            <div>
                <label>退款说明</label>
                <span>{{refund_info.desc}}</span>
            </div>
            <div>
                <label>上传图片</label>
                <img :src="item" alt="" v-for="item,index in refund_info.proof_imgs">
            </div>
            <div>
                <label>申请时间</label>
                <span>{{refund_info.auto_time}}</span>
            </div>
            <div>
                <label>退款单号</label>
                <span>{{refund_info.return_sn}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import {MessageBox} from 'mint-ui';
    import countDown from '../../components/refundCountDown'

    export default {
        data() {
            return {
                refund_info: {},
                status: {button: {}, service_button: {}}
            }
        },
        mounted() {
            this.getInfo()
        },
        components: {countDown},
        methods: {
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
            // 取消申请
            cancelApply() {
                MessageBox({
                    title: '提示',
                    message: '取消退货/退款后，您将无法再次进行退款/退货申请，请确认是否取消',
                    showCancelButton: true,
                    confirmButtonText: '是',
                    cancelButtonText: '否'
                }).then(res => {
                    if (res == 'confirm') {
                        this.$post('user/cancelOrderService', {
                            order_sn: this.$route.query.order_sn,
                            token: this.$getCookie('token')
                        })
                            .then(res => {
                                Toast({
                                    message: '取消申请成功',
                                    duration: 1400
                                })
                                setTimeout(()=>{
                                    location.reload()
                                },1000)
                            })
                    } else {
                        Toast({
                            message: '取消申请失败',
                            duration: 1200
                        })
                    }
                })

            },
            // 买家发货
            buyerDelivery() {
                this.$router.push({
                    path: 'buyerDelivery',
                    query: {
                        order_sn: this.$route.query.order_sn
                    }
                })
            },
            // 物流信息
            seeLogistics() {
                this.$router.push({
                    path: 'seeLogistics',
                    query: {
                        order_sn: this.$route.query.order_sn
                    }
                })
            },
            // 钱款去向
            moneyDirection() {
                this.$router.push({
                    path: 'moneyDirection',
                    query: {
                        order_sn: this.$route.query.order_sn
                    }
                })
            },
            // 再次申请
            applyAgain() {
                this.$router.push({
                    path:'/service/applyAfterService',
                    query:{
                        order_sn:this.$route.query.order_sn,
                        againApply:'yes'
                    }
                })
            },
            // 申请平台介入
            applyPlatform() {
                this.$router.push({
                    path:'/service/applyPlatform',
                    query:{
                        order_sn:this.$route.query.order_sn
                    }
                })
            },
            // 取消平台介入
            cancelApplyPlatform() {
                MessageBox({
                    title: '提示',
                    message: '取消后，您将无法再次进行退款/退货申请，请确认是否取消',
                    showCancelButton: true,
                    confirmButtonText: '是',
                    cancelButtonText: '否'
                }).then(res => {
                    if (res == 'confirm') {
                        this.$post('user/cancelPlatformIntervention',{
                            order_sn:this.$route.query.order_sn,
                            token: this.$getCookie('token')
                        })
                            .then(res=>{
                                Toast({
                                    message: '取消申请成功',
                                    duration: 1200
                                })
                            })
                        setTimeout(()=>{
                            location.reload()
                        },1000)
                    } else {
                        Toast({
                            message: '取消申请失败',
                            duration: 1200
                        })
                    }
                })


            }
        }
    }
</script>

<style scoped lang="scss">
    .refundDetail {
        margin-bottom: 40px;
        > div {
            width: 100%;
            background-color: #fff;
        }
        .status {
            color: #999;
            text-align: center;
            padding: 40px;
            > span {
                font-size: 40px;
            }
            > div {
                text-align: left;
                margin: 20px auto;
                .topp {
                    margin-bottom: 10px;
                    font-size: 28px;
                    color: #999;
                    text-align: center;
                }
            }
            .mint-button {
                color: #dd1b1b;
                height: 60px;
                font-size: 28px;
            }
        }
        .toConsult {
            padding: 20px;
            margin: 20px 0;
            a {
                display: flex;
                justify-content: space-between;
                align-items: center;

                width: 100%;
                color: #444;
                img {
                    display: block;
                    width: 36px;
                    height: 36px;
                }
            }

        }
        .info {
            p {
                padding: 16px 20px;
                font-size: 28px;
            }
            > div {
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                padding: 20px;
                border-bottom: 1px solid #efefef;
                a {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex: 1;
                    color: #444;
                    img {
                        display: block;
                        width: 36px;
                        height: 36px;
                    }
                }
                label {
                    font-size: 26px;
                    margin-right: 20px;
                    min-width: 120px;
                }
                > span {
                    font-size: 24px;
                }
                > img {
                    display: inline-block;
                    width: 120px;
                    height: 120px;
                    margin-right: 20px;
                }
            }
        }
    }
</style>
