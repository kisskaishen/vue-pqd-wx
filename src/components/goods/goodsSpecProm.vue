<template>
    <transition name="fade">
        <div class="goodsSpec" v-if="specDiv">
            <div class="specBg" @click="closeSpec"></div>
            <div class="specInfo">
                <div class="closeImg" @click="closeSpec">X</div>
                <div class="infoTop divFl">
                    <div class="topImg">
                        <img :src="filterSpec.spec_goods_price[ind0 || 0].img" alt="图片">
                    </div>
                    <div class="topTxt">
                        <h5>{{filterSpec.goods_name}}</h5>
                        <b>￥{{promPrice || filterSpec.spec_goods_price[ind0 || 0].prom_price}}</b>
                    </div>
                </div>
                <div v-if="filterSpec.filter_spec.length == 1">
                    <div class="infoSpec">
                        <p>{{filterSpec.filter_spec[0].title}}</p>
                        <ul>
                            <li :class="{'specActive':ind0 == index}"
                                v-for="item,index in filterSpec.filter_spec[0].items" :key="item.id"
                                @click="specChoose0(item,index)">{{item.item}}
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-if="filterSpec.filter_spec.length == 2">
                    <div class="infoSpec">
                        <p>{{filterSpec.filter_spec[0].title}}</p>
                        <ul>
                            <li :class="{'specActive':ind0 == index}"
                                v-for="item,index in filterSpec.filter_spec[0].items" :key="item.id"
                                @click="specChoose0(item,index)">{{item.item}}
                            </li>
                        </ul>
                    </div>
                    <div class="infoSpec">
                        <p>{{filterSpec.filter_spec[1].title}}</p>
                        <ul>
                            <li :class="{'specActive':ind1 == index}"
                                v-for="item,index in filterSpec.filter_spec[1].items" :key="item.id"
                                @click="specChoose1(item,index)">{{item.item}}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="infoSpec">
                    <p>数量</p>
                    <div class="number">
                        <button @click="reduceNum" v-if="number > 1">-</button>
                        <input type="number" v-model="number">
                        <button @click="addNum">+</button>
                    </div>
                </div>
                <div class="infoBtn">
                    <button @click="specBtn">确认</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        props: ['specInfo', 'isShowSpec'],
        data() {
            return {
                ind0: '',
                ind0Id: '',
                ind1: '',
                ind1Id: '',
                group1Id: '',
                group2Id: '',
                number: 1,
                isDisabled: true,
                promPrice: '',
            }
        },

        computed: {
            filterSpec() {
                return this.specInfo
            },
            specDiv() {
                return this.isShowSpec
            }
        },
        mounted() {
        },
        methods: {
            // 点击阴影关闭规格选择弹框
            closeSpec() {
                this.$emit('reviseSpec', false)
            },

            // 规格选择
            specChoose0(val, index) {
                this.ind0 = index
                this.ind0Id = val.item_id
            },
            specChoose1(val, index) {
                this.ind1 = index
                this.ind1Id = val.item_id
                this.group1Id = this.ind0Id + '_' + this.ind1Id
                this.group2Id = this.ind1Id + '_' + this.ind0Id
                for (let i = 0; i < this.specInfo.spec_goods_price.length; i++) {
                    if (this.group1Id == this.specInfo.spec_goods_price[i].key || this.group2Id == this.specInfo.spec_goods_price[i].key) {
                        this.promPrice = this.specInfo.spec_goods_price[i].prom_price
                    }
                }
            },

            addNum() {
                this.number += 1
            },
            reduceNum() {
                this.number -= 1
            },


            // 确认按钮
            specBtn() {
                this.$emit('reviseSpec', false)
                this.$router.push({path: '/pay/index', query: {payInfo: 1231}})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goodsSpec {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(#000, .6);
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
            background-color: #fff;
            z-index: 99;
            padding-bottom: 100px;
            .closeImg {
                position: absolute;
                right: 20px;
                top: -25px;
                width: 50px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-weight: bolder;
                font-size: 30px;
                color: #000;
                background-color: #fff;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                z-index: 999;
            }
            .infoTop {
                position: relative;
                padding: 0 20px;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .topImg {
                    flex: 1;
                    width: 200px;
                    height: 180px;
                    margin-right: 30px;
                    img {
                        position: absolute;
                        top: -60px;
                        width: 200px;
                        height: 200px;
                        background-color: #fff;
                        border-radius: 16px;
                    }
                }

                .topTxt {
                    flex: 2;

                    b {
                        color: red;
                        font-size: 32px;
                    }
                }

            }

            .infoSpec {
                padding: 0 20px;
                border-bottom: 1px solid #efefef;
                p {
                    padding: 20px 0;
                }
                ul {
                    padding: 10px 20px 30px;
                    li {
                        display: inline-block;
                        padding: 8px 40px;
                        background-color: #f5f5f5;
                        border-radius: 10px;
                        margin-right: 10px;
                        color: #333;
                        font-size: 14px;
                    }
                    .specActive {
                        background-color: red;
                        color: #fff;
                    }
                }
                .number {
                    margin-bottom: 20px;
                    button {
                        padding: 6px 24px;
                        font-size: 36px;
                        border-radius: 4px;
                        font-weight: bolder;
                        color: #333;
                    }
                    input {
                        width: 100px
                    }
                }
            }

            .infoBtn {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                button {
                    width: 100%;
                    height: 96px;
                    background-color: red;
                }
            }
        }
    }


</style>
