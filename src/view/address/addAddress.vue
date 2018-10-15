<template>
    <div class="address">
        <div>
            <label>收货人</label>
            <input type="text" v-model="username" placeholder="请输入收件人姓名">
        </div>
        <div>
            <label>联系电话</label>
            <input type="tel" v-model="userTel" placeholder="请输入联系电话">
        </div>
        <div>
            <label>选择地区</label>
            <p @click="showAreaChange">{{address||'点击选择地区'}}</p>
        </div>
        <div>
            <label>详细地址</label>
            <input type="text" v-model="detailAddress" placeholder="(如街道，小区，乡镇，村)">
        </div>

        <div class="sureBtn">
            <button @click="saveAdd">保存</button>
        </div>
        <!--<div class="bg" v-if="showArea" @click="sureAddress"></div>-->
        <!--<div v-if="showArea">地址选择</div>-->
        <!--<div class="payBtn">-->
        <!--<mt-button v-if="showArea" type="danger" @click="sureAddress">确定</mt-button>-->
        <!--</div>-->

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

    </div>
</template>

<script>
    import myaddress from '../../components/area.json'
    import {Toast} from 'mint-ui';

    export default {
        name: "addAddress",
        data() {
            return {
                username: '',
                userTel: '',
                address: '',
                detailAddress: '',

                addressArr: myaddress,

                showArea: false,
                provinceId: '',
                province: '',
                provinceIndex: '',
                cityId: '',
                city: '',
                cityIndex: '',
                districtId: '',
                district: '',
            }
        },

        mounted() {
            if (this.$route.query.address_id) {
                this.getAddressInfo()
                document.title = '编辑地址'
            }
        },
        methods: {
            // 获取已有的address信息
            getAddressInfo() {
                this.$post('user/getAddressList', {
                    token: this.$getCookie('token') ? this.$getCookie('token') : ''
                })
                    .then(res => {
                        for (let i = 0; i < res.list.length; i++) {
                            if (this.$route.query.address_id == res.list[i].address_id) {
                                this.username = res.list[i].consignee
                                this.userTel = res.list[i].mobile
                                this.address = res.list[i].address_base
                                this.detailAddress = res.list[i].address
                            }
                        }
                    })
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
            // 隐藏三级联动
            sureAddress() {
                this.showArea = false
            },

            // 点击地址
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
                this.address = `${this.province}${this.city}${this.district}`

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

            // 保存地址
            saveAdd() {
                let checkTel = /^[1][1,2,3,4,5,6,7,8,9][0-9]{9}$/;
                if (!(checkTel.test(this.userTel)) || this.nameState == '' || this.userTel == '' || this.detailAddress == '') {
                    let instance = Toast('请填写正确的信息');
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                } else {
                    if (this.$route.query.address_id) {
                        this.$post('user/handleAddress', {
                            address_id: this.$route.query.type == '2' ? this.$route.query.address_id : '',        // 修改地址的id
                            token: this.$getCookie('token'),
                            type: this.$route.query.type || '2',            // '添加'=>'1','修改'=>'2'
                            consignee: this.username,
                            province: this.provinceId,
                            city: this.cityId,
                            district: this.districtId,
                            is_default: '0',     //  0：不默认 1：默认地址
                            address_base: this.address,
                            address: this.detailAddress,
                            mobile: this.userTel,
                        })
                            .then(res => {
                                Toast('编辑成功');
                                setTimeout(() => {
                                    this.$router.push({
                                        path: '/address',
                                        query: {
                                            goods_id: this.$route.query.goods_id,
                                            goods_number: this.$route.query.goods_number,
                                            spec_key: this.$route.query.spec_key,
                                            order_class: this.$route.query.order_class,
                                            group_id: this.$route.query.group_id,
                                            from: this.$route.query.from == 'user' ? 'user' : ''
                                        }
                                    })
                                }, 1000);
                            })
                    } else {
                        this.$post('user/handleAddress', {
                            address_id: this.$route.query.type == '2' ? this.$route.query.address_id : '',        // 修改地址的id
                            token: this.$getCookie('token'),
                            type: this.$route.query.type || '1',            // '添加'=>'1','修改'=>'2'
                            consignee: this.username,
                            province: this.provinceId,
                            city: this.cityId,
                            district: this.districtId,
                            is_default: '0',     //  0：不默认 1：默认地址
                            address_base: this.address,
                            address: this.detailAddress,
                            mobile: this.userTel,
                        })
                            .then(res => {
                                Toast('添加成功');
                                setTimeout(() => {
                                    this.$router.push({
                                        path: '/address',
                                        query: {
                                            goods_id: this.$route.query.goods_id,
                                            goods_number: this.$route.query.goods_number,
                                            spec_key: this.$route.query.spec_key,
                                            order_class: this.$route.query.order_class,
                                            group_id: this.$route.query.group_id,
                                            from: this.$route.query.from == 'user' ? 'user' : ''
                                        }
                                    })
                                }, 1000);
                            })
                    }
                }
            }
        },

    }
</script>

<style scoped lang="scss">
    .address {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #fff;
        > div {
            padding: 0 26px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 106px;
            line-height: 106px;
            label {
                width: 142px;
                font-size: 28px;
                color: #333;
                text-align: left;
            }
            input {
                /*line-height: 106px;*/
                flex: 1;
                border: none;
                border-bottom: 1px solid #eee;
                border-radius: 0;
                padding: 32px 0;
                text-indent: 0;
                font-size: 28px;
            }
            > p {
                width: 100%;
                font-size: 28px;
                padding-left: 26px;
            }
        }
        .sureBtn {
            button {
                width: 698px;
                height: 98px;
                line-height: 98px;
                margin: 82px auto 0;
                font-size: 32px;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                border-radius: 8px;
                background-color: #FF4862;
            }
        }
        .chooseAddress {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin: auto;
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
