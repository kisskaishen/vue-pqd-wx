<template>
    <div class="address">
        <div class="hr" v-if="addressList.length>0"></div>
        <div class="addressDiv" v-for="item,index in addressList" :key="item.address_id" v-if="addressList.length>0">
            <div class="addressDivTop" @click="goPayPage(item,index)">
                <div class="divFl">
                    <p><b>{{item.consignee}}</b> <span>{{item.mobile}}</span></p>
                    <p><span>{{item.address_base}}{{item.address}}</span></p>
                </div>
                <!--<div :class="['divFr',item.is_default=='1'?'isDefault':'']">-->
                <!--<i></i>-->
                <!--</div>-->
            </div>

            <div class="addressDivBottom">
                <div :class="['divFl',item.is_default=='1'?'isDefault':'']" @click="setDefaultAddress(item,index)">
                    <i></i>
                    <span v-if="item.is_default=='1'">已设为默认</span>
                    <span v-else>设为默认</span>
                </div>
                <div class="divFr">
                    <button @click="editAddress(item,index)" v-if="$route.query.from=='user'">编辑</button>
                    <i @click="deleteAddress(item,index)"></i>
                </div>
            </div>
        </div>

        <div class="noAddress" v-if="addressList.length=='0'">
            <img src="../../imgs/address/icon-no-address.png" alt="">
            <p>您还没有收货地址，请新增地址</p>
        </div>

        <div class="payBtn">
            <router-link
                :to="'/address/addAddress?from=user&type=1'" v-if="this.$route.query.from == 'user'">
                <button>新增收货地址</button>
            </router-link>
            <router-link v-else
                         :to="'/address/addAddress?goods_id='+this.$route.query.goods_id+'&goods_number='+this.$route.query.goods_number+'&spec_key='+this.$route.query.spec_key+'&order_class='+this.$route.query.order_class+'&group_id='+this.$route.query.group_id+'&type=1'">
                <button>新增收货地址</button>
            </router-link>
        </div>
        <mt-popup
            v-model="popupVisible"
            position="top"
            :modal="modal">
            {{tipText}}
        </mt-popup>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import {MessageBox} from 'mint-ui';

    export default {
        name: "index",
        data() {
            return {
                addressList: [],     // 地址列表
                popupVisible: false,
                tipText: '',
                modal: false,       /// 阴影隐藏
                buttonStatus: this.$route.query.from == 'user' ? false : true
            }
        },
        mounted() {

            this.getAddressList()
        },
        methods: {
            getAddressList() {
                this.$post('user/getAddressList', {
                    token: this.$getCookie('token')
                })
                    .then(res => {
                        if (res.list == '') {
                            Toast('暂无地址')
                        }
                        this.addressList = res.list
                    })
            },
            // 选中地址
            goPayPage(val, index) {
                if (this.$route.query.from == 'user') {

                } else {
                    this.$router.push({
                        path: '/pay/index',
                        query: {
                            goods_id: this.$route.query.goods_id,
                            goods_number: this.$route.query.goods_number,
                            spec_key: this.$route.query.spec_key,
                            order_class: this.$route.query.order_class,
                            group_id: this.$route.query.group_id,
                            address_id: val.address_id
                        }
                    })
                }
            },
            // 设置默认地址
            setDefaultAddress(val, index) {
                this.$post('user/handleAddressDefault', {
                    token: this.$getCookie('token'),
                    address_id: val.address_id
                })
                    .then(res => {
                        this.getAddressList()
                    })
            },
            // 编辑地址
            editAddress(val, index) {
                this.$router.push({
                    path: '/address/addAddress',
                    query: {
                        from: 'user',
                        type: '2',           // '添加'=>'1','修改'=>'2'
                        address_id: val.address_id
                    }
                })
            },
            // 删除地址
            deleteAddress(val, index) {
                MessageBox.confirm('确定要删除此收货地址吗？')
                    .then(res => {
                        this.$post('user/delAddress', {
                            token: this.$getCookie('token'),
                            address_id: val.address_id
                        })
                            .then(res => {
                                this.popupVisible = true
                                this.tipText = '删除成功'
                                this.addressList.splice(index, 1)
                                setTimeout(() => {
                                    this.popupVisible = false
                                }, 1000)
                            })
                    })
                    .catch(err => {
                        this.popupVisible = true
                        this.tipText = '取消删除'
                        setTimeout(() => {
                            this.popupVisible = false
                        }, 1000)
                    })
            }
        }
    }
</script>
<style lang="scss">
    .mint-msgbox {
        .mint-msgbox-header {
            padding: 20px 0 0;
            .mint-msgbox-title {
                font-size: 28px;
            }
        }
        .mint-msgbox-content {
            padding: 60px 0;
            .mint-msgbox-message {
                font-size: 30px;
            }
        }
        .mint-msgbox-btns {
            height: auto;
            .mint-msgbox-btn {
                padding: 20px 0;
            }
            .mint-msgbox-cancel {
                color: #888;
            }
        }
    }

    .address {
        .mint-popup {
            width: 100%;
            padding: 30px;
            text-align: center;
            background-color: rgba(0, 0, 0, .7);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            color: #fff;
            font-size: 30px;
        }
    }
</style>
<style scoped lang="scss">
    .address {
        padding-bottom: 120px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        min-height: 100%;
        background-color: #fff;
        .hr {
            width: 100%;
            height: 10px;
            background: url("../../imgs/address/icon-hr-bg.png") no-repeat center /100%;
        }
        .addressDiv {
            padding: 0 26px;
            user-select: none;
            width: 100%;
            position: relative;
            .addressDivTop {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .divFl {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    p {
                        width: 100%;
                        display: flex;
                        justify-content: flex-start;
                        align-items: flex-end;
                        overflow: hidden;
                        &:first-child {
                            margin: 30px 0 20px;
                        }
                        b {
                            width: auto;
                            display: inline-block;
                            font-size: 30px;
                            margin-right: 32px;
                            line-height: 40px;
                        }
                        span {
                            width: auto;
                            white-space: normal;
                            font-size: 28px;
                            color: #333;
                            line-height: 40px;
                        }
                    }
                }
                .divFr {
                    i {
                        width: 50px;
                        height: 50px;
                        background: url("../../imgs/address/icon-no-check.png") no-repeat center /96%;
                    }
                }
                .isDefault {
                    i {
                        background: url("../../imgs/address/icon-check.png") no-repeat center /96%;

                    }
                }
            }
            .addressDivBottom {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 2px solid #eee;
                .divFl {
                    i {
                        width: 34px;
                        height: 34px;
                        margin-right: 20px;
                        background: url("../../imgs/address/icon-no-check.png") no-repeat center /96%;
                    }
                    span {
                        color: #999999;
                        font-size: 28px;
                    }
                }
                .isDefault {
                    i {
                        background: url("../../imgs/address/icon-checked.png") no-repeat center /96%;
                    }
                    span {
                        color: #FF4862;
                    }
                }
                .divFr {
                    margin: 26px 0 20px;

                    button {
                        width: 84px;
                        height: 40px;
                        line-height: 40px;
                        background-color: #fff;
                        border: 2px solid #ccc;
                        -webkit-border-radius: 8px;
                        -moz-border-radius: 8px;
                        border-radius: 8px;
                        /*margin: 36px 0 30px;*/
                        font-size: 24px;
                        color: #4C4C4C;
                    }
                    i {
                        width: 30px;
                        height: 34px;
                        background: url("../../imgs/address/icon-delete.png") no-repeat center /100%;
                        margin-left: 74px;
                    }
                }
            }
        }
        .noAddress {
            width: 100%;
            img {
                width: 302px;
                height: 268px;
                margin: 250px auto 80px;
            }
            p {
                width: 100%;
                text-align: center;
                color: #999;
                font-size: 28px;
            }
        }
        .payBtn {
            width: 698px;
            margin: 40px auto 0;
            button {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 310px;
                height: 70px;
                margin: 0 auto;
                background: linear-gradient(to right, #ff8484, #ff4862);
                border-radius: 8px;
                font-size: 28px;
            }
        }
    }
</style>
