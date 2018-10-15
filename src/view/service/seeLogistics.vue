<template>
    <div class="seeLogistics">
        <div class="orderInfo">
            <p>订单信息</p>
            <div>
                <p>
                    <label>订单编号：</label>
                    <span>{{refund_info.order_sn}}</span>
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
            </div>
        </div>
        <div class="logistics">
            <div class="logisticsInfo">
                <div class="divFl">
                    <img :src="logisticsInfo.order_info.list_img" alt="">
                </div>
                <div class="divFr">
                    <p>
                        <label>物流单号</label>
                        <span>{{logisticsInfo.order_info.logistics_order_sn}}</span>
                    </p>
                    <p>
                        <label>物流公司</label>
                        <span>{{logisticsInfo.order_info.logistics_name}}</span>
                    </p>
                    <p>
                        <label>物流电话</label>
                        <span>{{logisticsInfo.order_info.logistics_mobile}}</span>
                    </p>
                    <p>
                        <label>物流状态</label>
                        <span>{{logisticsInfo.order_info.logistics_status}}</span>
                    </p>
                </div>
            </div>
            <div class="logisticsList">
                <ul>
                    <li>暂不支持快递公司的物流信息查询，请到其他平台查询</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "seeLogistics",
        data() {
            return {
                refund_info:{},
                status:{},
                logisticsInfo:{order_info:{},express:{}}
            }
        },
        mounted() {
            this.getInfo()
            this.getLogistics()
        },
        methods:{
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
            getLogistics() {
                this.$post('user/getExpressInfo', {
                    order_sn: this.$route.query.order_sn,
                    type:'3',
                    token: this.$getCookie('token')
                })
                    .then(res => {
                        this.logisticsInfo = res
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
        .logistics {
            .logisticsInfo {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding-bottom: 20px;
                border-bottom: 1px solid #eee;
                .divFl {
                    img {
                        display: block;
                        width: 136px;
                        height: 136px;
                    }
                }
                .divFr {
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    text-align: left;
                    p {
                        width: 100%;
                        padding: 2px 0;
                        label {
                            display: inline-block;
                            width: 100px;
                            color: #000;
                        }
                        span {
                            color: #666;
                        }
                    }
                }
            }
        }
        .logisticsList {
            margin-top: 20px;
        }
    }
</style>
