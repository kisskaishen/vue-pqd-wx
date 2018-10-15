<template>
    <transition name="fade">
        <div class="goodsSpec" v-if="specDiv">
            <div class="specBg" @click="closeSpec"></div>
            <div class="specInfo">
                <div class="closeImg" @click="closeSpec">
                    <img src="../../imgs/detail/icon-coupon-close.png" alt="">
                </div>
                <div class="infoTop divFl">
                    <div class="topImg">
                        <img :src="keyImg" alt="图片" @click="bigImg(keyImg)">
                    </div>
                    <div class="topTxt">
                        <!--<h5>{{filterSpec.goods_name}}</h5>-->
                        <div>
                            <b v-if="buyTypeVal == '1'">￥{{promPrice||specPriceInfo.spec_goods_price[0].price}}</b>
                            <b v-if="buyTypeVal == '2'">￥{{promPrice||specPriceInfo.spec_goods_price[0].prom_price}}</b>
                            <!--<p>-->
                            <!--<span>满50减10</span>-->
                            <!--<button @click="getCouponVal">领取</button>-->
                            <!--</p>-->
                        </div>
                        <p>已选：<span>{{ind0Item}}</span><span v-if="ind1Item">+{{ind1Item}}</span></p>
                    </div>
                </div>
                <div class="hr"></div>
                <div class="specCenter">
                    <div class="infoSpec" v-if="specPriceInfo.spec.length == 1">
                        <p>{{specPriceInfo.spec[0].name}}</p>
                        <ul>
                            <li :class="{'specActive':ind0 == index}"
                                v-for="item,index in specPriceInfo.spec[0].item" :key="item.spec_item_id"
                                @click="specChoose0(item,index)">{{item.item}}
                            </li>
                        </ul>
                    </div>
                    <div class="infoSpec" v-if="specPriceInfo.spec.length == 2">
                        <p>{{specPriceInfo.spec[0].name}}</p>
                        <ul>
                            <li :class="{'specActive':ind0 == index}"
                                v-for="item,index in specPriceInfo.spec[0].item" :key="item.spec_item_id"
                                @click="specChoose0(item,index)">{{item.item}}
                            </li>
                        </ul>
                    </div>
                    <div class="infoSpec" v-if="specPriceInfo.spec.length == 2">
                        <p>{{specPriceInfo.spec[1].name}}</p>
                        <ul>
                            <li :class="{'specActive':ind1 == index}"
                                v-for="item,index in specPriceInfo.spec[1].item" :key="item.spec_item_id"
                                @click="specChoose1(item,index)">{{item.item}}
                            </li>
                        </ul>
                    </div>
                    <div class="infoSpec infoSpecNum">
                        <p>数量</p>
                        <div class="number">
                            <button @click="reduceNum" :disabled="goodsNumber<=1" class="reduceNum">-</button>
                            <input type="number" v-model="goodsNumber">
                            <button @click="addNum" class="addNum">+</button>
                        </div>
                    </div>
                    <div class="infoSpec limitInfoSpec" v-if="limitData.limit.tips!=''">
                        <i></i>
                        <span>{{limitData.limit.tips}}</span>
                    </div>
                </div>
                <div class="infoBtn">
                    <button @click="specBtn" v-if="specStorage">去结算</button>
                    <button class="isNoSpec" v-else>已售罄</button>
                </div>
            </div>
            <div class="bigImgDiv" v-if="showBigImg" @click="closeBigImg">
                <img :src="bigImgUrl" alt="">
            </div>
        </div>
    </transition>
</template>

<script>
    import autoLogin from '../../config/autoLogin'
    import {Toast} from 'mint-ui'

    export default {
        props: ['specGoodsInfo', 'isShowSpec', 'buyTypeNum', 'limitInfo', 'groupInfo'],
        data() {
            return {
                specPriceInfo: {spec: [{item: []}], spec_goods_price: [{prom_price: ''}]},

                ind0: '0',
                ind0Id: '',
                ind0Item: '',
                ind1: '0',
                ind1Id: '',
                ind1Item: '',
                groupId: '',             // 用于最终的spec_key，或者为group1Id或者为group2Id
                group1Id: '',           // 规格1的id_规格2的id
                group2Id: '',           // 规格2的id_规格1的id
                goodsNumber: 1,
                isDisabled: true,
                price: '',       // 选中后的价格
                promPrice: '',       // 选中后的价格
                keyName: '',         // 选中后的名字
                keyImg: '',         // 选中后的图片
                specStorage: true,      // 按钮状态，true为确认按钮/false为售罄状态
                specCurrentIndex: '0',

                bigImgUrl: '',
                showBigImg: false,

                maxNumber: '1',
                buyTypeNumber: '', // '1'=>'单买 ,'2'=>'拼团'

                groupInfoId: '',

            }
        },

        computed: {
            filterSpec() {
                return this.specGoodsInfo
            },
            specDiv() {
                return this.isShowSpec
            },
            buyTypeVal() {
                return this.buyTypeNum          // '1'=>'单买 ,'2'=>'拼团'
            },
            limitData() {
                return this.limitInfo
            }
        },
        mounted() {
            this.groupInfoId = this.$route.query.group_id ? this.$route.query.group_id : ''
            this.getSpecPrice()
        },
        methods: {
            // 领取优惠券
            getCouponVal() {
                this.$emit('isCouponDivShow', true)
            },
            // 获取价格规则getGroup() {
            getSpecPrice() {
                let self = this
                this.$post('goods/getGoodsSpecPrice', {
                    goods_id: this.$route.query.goods_id
                })
                    .then((res) => {
                        if (res.spec_goods_price != '' && res.spec != '') {
                            this.specPriceInfo = res
                            this.ind0Id = res.spec[0].item[0].spec_item_id          // 页面加载显示自动选中第一个
                            this.ind0Item = res.spec[0].item[0].item          // 页面加载显示自动选中第一个
                            this.ind1Id = res.spec.length == '2' ? res.spec[1].item[0].spec_item_id : '' // 页面加载先判断如果有两个规则的话，自动选中第二条规则的第一个，否则为空
                            this.ind1Item = res.spec.length == '2' ? res.spec[1].item[0].item : '' // 页面加载先判断如果有两个规则的话，自动选中第二条规则的第一个，否则为空
                            if (this.specPriceInfo.spec.length == '1') {
                                this.groupId = this.ind0Id
                                for (let i = 0; i < this.specPriceInfo.spec_goods_price.length; i++) {
                                    if (this.groupId == this.specPriceInfo.spec_goods_price[i].key) {
                                        this.specStorage = this.specPriceInfo.spec_goods_price[i].store_count > 0 ? true : false
                                        this.promPrice = this.buyTypeNumber == '1' ? this.specPriceInfo.spec_goods_price[i].price : this.specPriceInfo.spec_goods_price[i].prom_price// 页面加载先判断是拼团还是单买，单买=>1,拼团=>2,显示相应的价格
                                    }
                                }
                            } else if (this.specPriceInfo.spec.length == '2') {
                                this.group1Id = `${this.ind0Id}_${this.ind1Id}`
                                this.group2Id = `${this.ind1Id}_${this.ind0Id}`
                                for (let i = 0; i < this.specPriceInfo.spec_goods_price.length; i++) {
                                    if (this.group1Id == this.specPriceInfo.spec_goods_price[i].key) {
                                        this.groupId = this.group1Id
                                    } else if (this.group2Id == this.specPriceInfo.spec_goods_price[i].key) {
                                        this.groupId = this.group2Id
                                    }
                                }
                            }
                            for (let i = 0; i < this.specPriceInfo.spec_goods_price.length; i++) {
                                if (this.groupId == this.specPriceInfo.spec_goods_price[i].key) {
                                    this.specStorage = this.specPriceInfo.spec_goods_price[i].store_count > 0 ? true : false
                                    this.promPrice = this.buyTypeNumber == '1' ? this.specPriceInfo.spec_goods_price[i].price : this.specPriceInfo.spec_goods_price[i].prom_price// 页面加载先判断是拼团还是单买，单买=>1,拼团=>2,显示相应的价格
                                }
                            }
                            this.keyImg = this.specPriceInfo.spec_goods_price[this.specCurrentIndex].img
                            this.maxNumber = parseInt(this.limitInfo.limit.limit_single_num)
                        } else {
                            Toast({
                                message: '此商品无规格，不支持购买',
                            })
                        }
                    })
            },
            // 点击阴影关闭规格选择弹框
            closeSpec() {
                this.$emit('reviseSpec', false)
                this.promPrice = ''
                this.ind0 = 0
                this.ind1 = 0
            },

            // 规格选择
            specChoose0(val, index) {
                this.ind0 = index
                this.ind0Id = val.spec_item_id           // 点击一个规格，获取到ind0Id值
                this.ind0Item = val.item
                if (this.specPriceInfo.spec.length == '1') {
                    this.groupId = this.ind0Id
                    for (let i = 0; i < this.specPriceInfo.spec_goods_price.length; i++) {
                        if (this.groupId == this.specPriceInfo.spec_goods_price[i].key) {
                            this.specCurrentIndex = i
                            this.promPrice = this.buyTypeNumber == '1' ? this.specPriceInfo.spec_goods_price[i].price : this.specPriceInfo.spec_goods_price[i].prom_price
                            this.keyImg = this.specPriceInfo.spec_goods_price[i].img
                        }
                    }
                } else if (this.specPriceInfo.spec.length == '2') {
                    if (!this.ind1Id) {                 // 只点击第一个，if 第二个值不存在（不点击），默认为第二个值得第一个
                        this.ind1Id = this.specPriceInfo.spec.length == '2' ? this.specPriceInfo.spec[1].item[0].spec_item_id : ''
                    }
                    this.group1Id = this.ind0Id + '_' + this.ind1Id         // 当有两个规格的时候，有出现过这种情况    规格1的id_规格2的id/规格2的id_规格1的id,
                    this.group2Id = this.ind1Id + '_' + this.ind0Id

                    // 循环遍历确定是    规格1的id_规格2的id  还是  规格2的id_规格1的id，然后确定其价格
                    for (let i = 0; i < this.specPriceInfo.spec_goods_price.length; i++) {
                        if (this.group1Id == this.specPriceInfo.spec_goods_price[i].key || this.group2Id == this.specPriceInfo.spec_goods_price[i].key) {
                            this.specCurrentIndex = i
                            this.promPrice = this.buyTypeNumber == '1' ? this.specPriceInfo.spec_goods_price[i].price : this.specPriceInfo.spec_goods_price[i].prom_price
                            this.groupId = this.group1Id == this.specPriceInfo.spec_goods_price[i].key ? this.group1Id : this.group2Id
                        }
                    }
                }
                this.keyImg = this.specPriceInfo.spec_goods_price[this.specCurrentIndex].img
                this.specStorage = this.specPriceInfo.spec_goods_price[this.specCurrentIndex].store_count > 0 ? true : false
            },
            specChoose1(val, index) {
                this.ind1 = index
                this.ind1Id = val.spec_item_id
                this.ind1Item = val.item

                if (!this.ind0Id) {                 // 只点击第二个，if 第一个值不存在（不点击），默认为第一个值得第一个
                    this.ind0Id = this.specPriceInfo.spec[0].item[0].spec_item_id
                }
                this.group1Id = this.ind0Id + '_' + this.ind1Id
                this.group2Id = this.ind1Id + '_' + this.ind0Id
                for (let i = 0; i < this.specPriceInfo.spec_goods_price.length; i++) {
                    if (this.group1Id == this.specPriceInfo.spec_goods_price[i].key || this.group2Id == this.specPriceInfo.spec_goods_price[i].key) {
                        this.specCurrentIndex = i
                        this.promPrice = this.buyTypeNumber == '1' ? this.specPriceInfo.spec_goods_price[i].price : this.specPriceInfo.spec_goods_price[i].prom_price
                        this.groupId = this.group1Id == this.specPriceInfo.spec_goods_price[i].key ? this.group1Id : this.group2Id
                        this.keyName = this.specPriceInfo.spec_goods_price[i].key_name
                        this.keyImg = this.specPriceInfo.spec_goods_price[i].img
                    }
                }
                this.keyImg = this.specPriceInfo.spec_goods_price[this.specCurrentIndex].img
                this.specStorage = this.specPriceInfo.spec_goods_price[this.specCurrentIndex].store_count > 0 ? true : false
            },

            addNum() {
                this.goodsNumber += 1
            },
            reduceNum() {
                this.goodsNumber -= 1
            },

            // 放大图片
            bigImg(val) {
                this.bigImgUrl = val
                this.showBigImg = true
            },
            closeBigImg() {
                this.bigImgUrl = ''
                this.showBigImg = false
            },


            // 确认按钮
            specBtn() {
                if (!this.$getCookie('token')) {
                    autoLogin()
                    return;
                }
                if (this.specPriceInfo.spec == '' || JSON.stringify(this.specPriceInfo.spec) == '{}') {
                    Toast('此商品暂不能购买')
                    return;
                } else {
                    this.groupId = this.specPriceInfo.spec.length == '2' ? this.ind0Id + '_' + this.ind1Id : this.ind0Id
                    this.$emit('reviseSpec', false)
                    this.$router.push({
                        path: '/pay/index',
                        query: {
                            goods_id: this.$route.query.goods_id,
                            goods_number: this.goodsNumber,
                            spec_key: this.groupId,
                            order_class: this.groupInfoId ? '2' : this.buyTypeNum,      // 1：单买 2：拼团 3：秒杀 4：免单
                            group_id: this.groupInfoId ? this.groupInfoId : '',
                            // group_id: this.$route.query.group_id ? this.$route.query.group_id : '',
                            is_group: this.groupInfoId ? '2' : '1'
                        }
                    })
                }
            }
        },
        watch: {
            groupInfo(val) {
                this.groupInfoId = val
            },
            buyTypeVal(val) {
                console.log(val)
                this.buyTypeNumber = val
                this.getSpecPrice()
            },
            goodsNumber(e) {
                let self = this
                if (e > self.maxNumber) {
                    self.goodsNumber = self.maxNumber
                    Toast(`此商品最多购买${self.maxNumber}件`);
                } else {
                    self.goodsNumber = e
                }
                // if (this.goodsNumber < 1 || this.goodsNumber > 100) {
                //
                //     //  else {
                //     //     Toast('购买数量范围为1-99');
                //     //     this.goodsNumber = 1
                //     // }
                // }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goodsSpec {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 750px;
        background-color: rgba(#000, .6);
        z-index: 9;
        .specBg {
            position: absolute;
            right: 0;
            left: 0;
            top: 0;
            bottom: 0;
        }
        .specInfo {
            position: absolute;
            width: 100%;
            bottom: 0;
            max-height: 1000px;
            overflow: scroll;
            background-color: #fff;
            z-index: 999;
            -webkit-border-radius: 20px 20px 0 0;
            -moz-border-radius: 20px 20px 0 0;
            border-radius: 20px 20px 0 0;
            .closeImg {
                position: absolute;
                right: 26px;
                top: 40px;
                z-index: 9999;
                img {
                    width: 26px;
                    height: 26px;
                }
            }
            > .hr {
                width: 698px;
                margin: 0 auto 30px;
                height: 1px;
                background-color: #eee;
            }
            .infoTop {
                position: relative;
                padding: 26px;
                /*border-bottom: 1px solid #eee;*/
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .topImg {
                    width: 176px;
                    height: 176px;
                    margin-right: 20px;
                    img {
                        width: 176px;
                        height: 176px;
                        background-color: #fff;
                        border-radius: 8px;
                        border: 2px solid #eee;
                        margin-right: 0;
                    }
                }

                .topTxt {
                    > div {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        b {
                            width: auto;
                            font-size: 36px;
                            color: #FF4862;
                            font-weight: normal;
                            margin-right: 20px;
                        }
                        p {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            span {
                                width: auto;
                            }
                            button {
                                width: 68px;
                                height: 34px;
                                margin-left: 20px;
                                color: #FF4862;
                                background-color: #FFF2F1;
                            }
                        }
                    }
                    > p {
                        font-size: 28px;
                        color: #333;
                        margin-top: 10px;
                        width: 488px;
                        overflow: hidden;
                        -ms-text-overflow: ellipsis;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        span {
                            display: inline;
                        }
                    }
                }

            }
            .specCenter {
                max-height: 520px;
                overflow: scroll;
                .infoSpec {
                    padding: 0 26px;
                    p {
                        padding: 20px 0;
                        font-size: 28px;
                    }
                    ul {
                        li {
                            display: inline-block;
                            padding: 14px 26px;
                            background-color: #fff;
                            border-radius: 8px;
                            margin-right: 20px;
                            margin-bottom: 20px;
                            color: #333;
                            font-size: 24px;
                            border: 2px solid #ccc;
                        }
                        .specActive {
                            color: #FF4862;
                            border: 2px solid #FF8484;
                        }
                    }
                }
                .infoSpecNum {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    p {
                        font-size: 28px;
                    }
                    .number {
                        padding: 20px 0;
                        display: flex;
                        justify-content: center;
                        button {
                            width: 76px;
                            height: 70px;
                            font-size: 40px;
                            color: #333;
                            background-color: transparent;
                            border: 2px solid #999;
                        }
                        .addNum {
                            -webkit-border-radius: 0 8px 8px 0;
                            -moz-border-radius: 0 8px 8px 0;
                            border-radius: 0 8px 8px 0;
                        }
                        .reduceNum {
                            -webkit-border-radius: 8px 0 0 8px;
                            -moz-border-radius: 8px 0 0 8px;
                            border-radius: 8px 0 0 8px;
                        }
                        input {
                            width: 100px;
                            height: 70px;
                            border: none;
                            border-top: 2px solid #999;
                            border-bottom: 2px solid #999;
                            text-align: center;
                            -webkit-border-radius: 0;
                            -moz-border-radius: 0;
                            border-radius: 0;
                        }
                    }
                }
            }

        }
        .limitInfoSpec {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            max-height: 80px;
            line-height: 40px;
            i {
                width: 60px;
                height: 30px;
                background: url("../../imgs/detail/icon-xg.png") no-repeat center /100%;
            }
            span {
                margin-left: 20px;
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                color: #666666;
            }
        }
        .infoBtn {
            width: 700px;
            margin: 76px auto;
            button {
                width: 100%;
                height: 100px;
                font-size: 32px !important;
                background-color: #FF4862;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                border-radius: 8px;
            }
            .isNoSpec {
                background-color: #CCCCCC;
            }
        }
        .bigImgDiv {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: #000;
            z-index: 999;
            img {
                position: absolute;
                width: 100%;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }


</style>
