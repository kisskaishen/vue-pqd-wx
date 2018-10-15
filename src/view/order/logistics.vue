<template>
    <div class="logistics">
        <div class="logisticsCompany">
            <div class="divFl">
                <img :src="logistics.order_info.list_img" alt="">
            </div>
            <div class="divFr">
                <p>物流公司：{{logistics.order_info.logistics_name}}</p>
                <p>物流单号：{{logistics.order_info.logistics_order_sn}}</p>
                <p>物流电话：{{logistics.order_info.logistics_mobile}}</p>
                <p>物流状态：{{logistics.order_info.logistics_status}}</p>
            </div>
        </div>
        <div class="logisticsDetail">
            <div class="address">
                <p>收货地址：{{logistics.order_info.address}}</p>
            </div>
            <ul>
                <li v-for="item,index in logistics.express" :class="index=='0'?'active':''">
                    <div class="fl">
                        <span></span>
                    </div>
                    <div class="fr">
                        <p>{{item.address}}-{{item.context}}</p>
                        <p>{{item.time}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "logistics",
        data() {
            return {
                logistics:{order_info:{},express:[]}
            }
        },
        mounted() {
            this.getLogistics()
        },
        methods:{
            getLogistics() {
                this.$post('user/getExpressInfo',{
                    order_sn:this.$route.query.order_sn,
                    token:this.$getCookie('token'),
                    type:'1'
                })
                    .then(res=>{
                        this.logistics = res
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    .logistics {
        > div {
            background-color: #fff;
            margin-bottom: 20px;
            padding: 20px;
        }
        .logisticsCompany {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .divFl {
                img {
                    width: 150px;
                    height: 150px;
                }
            }
            .divFr {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                b {
                    display: block;
                    font-size: 30px;
                    margin-bottom: 10px;
                }
                p {
                    padding: 2px 0;
                    color: #999;
                }
            }
        }
        .logisticsDetail {
            .address {
                padding: 30px 26px;
            }
            ul {
                li {
                    display: flex;
                    justify-content: flex-start;
                    margin-left: 20px;
                    border-left: 1px solid #ccc;
                    .fl {
                        position: relative;
                        span {
                            position: absolute;
                            display: block;
                            width: 40px;
                            height: 40px;
                            left: 50%;
                            margin-left: -20px;
                            top: 50%;
                            margin-top: -20px;
                            border: 2px solid #999;
                            -webkit-border-radius: 50%;
                            -moz-border-radius: 50%;
                            border-radius: 50%;
                            background-color: #fff;
                            &:after {
                                position: absolute;
                                content: '';
                                width: 24px;
                                height: 24px;
                                left: 50%;
                                margin-left: -12px;
                                top:50%;
                                margin-top: -12px;
                                background-color: #999;
                                border-radius: 50%;
                            }
                        }
                    }
                    .fr {
                        width: 100%;
                        margin-left: 40px;
                        padding: 40px 0;
                        border-bottom: 1px solid #ccc;
                    }
                }
                .active {
                    .fl {
                        span {
                            border: 2px solid red;
                            &:after {
                                background-color: red;
                            }
                        }
                    }
                    .fr {
                        p {
                            color: red;
                        }
                    }

                }
            }
        }
    }

</style>
