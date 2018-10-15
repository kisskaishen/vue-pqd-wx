<template>
    <div class="indexIndexDiv">
        <!--轮询买家-->
        <div class="fixedBox" v-if="isShowList">
            <router-link :to="'/group/detail?group_id='+item.group_id" v-for="item,index in boxList"
                         :key="item.group_id"
                         v-if="index == currentIndex">
                <img :src="item.photo" alt="">
                <p>最新订单来自{{item.nicke_name}}，{{item.show_time}}</p>
            </router-link>
        </div>
        <!--新人专享红包-->
        <div class="newUserDiv" v-if="isNewPeople">
            <div class="redDiv">
                <img src="../../imgs/index/icon-coupon1-bg.png"
                     alt="拼趣多新人专享红包"
                     :class="['newRed',newRedHover?'rotate3D':'']"
                     @click="openNewCoupon" v-if="newRed">
                <img src="../../imgs/index/icon-coupon2-bg.png" alt="拼趣多新人专享红包"
                     class="newRed" v-if="getNewCoupon">
                <div class="couponDiv">
                    <ul>
                        <li v-for="item,index in 4">
                            <i :class="index=='1'?'platformIcon':'merchatIcon'"></i>
                            <div class="divFl">
                                <p class="cff4862">
                                    <span class="fz32">￥</span>
                                    <span class="fz56">5</span>
                                </p>
                                <p class="fz22 c666">满20元可用</p>
                            </div>
                            <div class="divFr">
                                <div class="couponFl">
                                    <p class="fz28 c333 fwbold overFlow1">疯狂打折优惠</p>
                                    <p class="fz22 c666 overFlow1">有效期至 2018-08-14</p>
                                </div>
                                <div class="couponFr">
                                    <router-link to="" class="brs50 br2solidff4862 cff4862 fz24">立即使用</router-link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <i @click="closeRed"></i>
            </div>

        </div>
        <!--优惠券专区开放提示-->
        <div class="tipsDiv" v-if="!isKown&&(!this.$local.get('isKnowIndexCoupon')||JSON.stringify(this.$local.get('isKnowIndexCoupon'))=='{}')">
            <img src="../../imgs/index/icon-coupon-tips.png" alt="优惠券入口提示" @click="IKnowClick">
        </div>
        <index></index>
        <tabbar></tabbar>
    </div>
</template>

<script>
    import Index from '../../components/index.vue'
    import Tabbar from '../../components/footer'

    export default {
        data() {
            return {
                currentIndex: 0,
                boxList: [],
                isShowList: false,

                isNewPeople: false,
                newRed: false,
                newRedHover: false,
                getNewCoupon: true,
                getNewCouponHover: false,
                isKown:false
            }
        },
        components: {Index, Tabbar},
        mounted() {
            this.getBox()
            setInterval(() => {
                this.getFor()
            }, 5000)
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
            window.pageYOffset = 0
        },
        methods: {
            getBox() {
                this.$post('group/getGroupList', {})
                    .then(res => {
                        this.boxList = res
                    })
            },
            getFor() {
                this.isShowList = true;
                if (this.currentIndex <= this.boxList.length) {
                    this.currentIndex += 1
                } else {
                    this.currentIndex = 0
                }
                setTimeout(() => {
                    this.isShowList = false
                }, 3000)
            },
            // 打开新人红包
            openNewCoupon() {
                this.newRedHover = true
                setTimeout(() => {
                    this.newRed = false
                    this.getNewCoupon = true
                }, 600)
            },
            // 关闭红包按钮
            closeRed() {
                this.isNewPeople = false
            },

            // 我知道了
            IKnowClick() {
                this.isKown = true
                this.$local.set('isKnowIndexCoupon',true)
            }
        }
    }
</script>
<style scoped lang="scss">
    .indexIndexDiv {
        position: relative;
        width: 750px;
        height: 100%;
        .fixedBox {
            position: fixed;
            top: 100px;
            left: 16px;
            -webkit-border-radius: 40px;
            -moz-border-radius: 40px;
            border-radius: 40px;
            background-color: rgba(0, 0, 0, .6);
            color: #fff;
            z-index: 9;
            padding-right: 30px;
            a {
                position: relative;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 50px;
                img {
                    position: absolute;
                    left: 0;
                    top: -5px;
                    display: block;
                    width: 60px;
                    height: 60px;
                    margin-right: 20px;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                    border: 1px solid #ccc;
                }
                p {
                    color: #fff;
                    margin-left: 60px;
                }
            }
        }

        .newUserDiv {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: rgba(0, 0, 0, .8);
            z-index: 99;
            .redDiv {
                position: absolute;
                width: 750px;
                top: 50%;
                transform: translateY(-50%);
                .newRed {
                    width: 750px;
                    transition: All 0.8s ease-in-out;
                    -webkit-transition: All 0.8s ease-in-out;
                    -moz-transition: All 0.8s ease-in-out;
                    -o-transition: All 0.8s ease-in-out;
                }
                .rotate3D {
                    transform: rotate(360deg) scale(.2);
                    -webkit-transform: rotate(360deg) scale(.2);
                    -moz-transform: rotate(360deg) scale(.2);
                    -o-transform: rotate(360deg) scale(.2);
                    -ms-transform: rotate(360deg) scale(.2);
                }
                .couponDiv {
                    position: absolute;
                    top: 420px;
                    left: 86px;
                    width: 580px;
                    ul {
                        max-height: 600px;
                        overflow: scroll;
                        li {
                            position: relative;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            width: 580px;
                            height: 188px;
                            background: url("../../imgs/index/icon-coupon-bg.png") no-repeat center /100%;
                            i {
                                position: absolute;
                                left: 6px;
                                top: 10px;
                                width: 80px;
                                height: 30px;
                                margin: 0;
                            }
                            .platformIcon {
                                background: url("../../imgs/review/icon-platform.png") no-repeat center /100%;
                            }
                            .merchatIcon {
                                background: url("../../imgs/review/icon-merchat.png") no-repeat center /100%;
                            }
                            > div {
                                height: 80px;
                            }
                            .divFl {
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;
                                align-items: center;
                                width: 172px;
                                p {
                                    width: inherit;
                                    display: flex;
                                    justify-content: center;
                                    align-items: baseline;
                                    span {
                                        width: auto;
                                    }
                                }
                                .cff4862 {
                                    line-height: 42px;
                                }
                            }
                            .divFr {
                                height: 80px;
                                flex: 1;
                                display: flex;
                                justify-content: space-around;
                                align-items: center;
                                .couponFl {
                                    width: 230px;
                                    height: inherit;
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: space-between;
                                    align-items: flex-start;
                                    p {
                                        width: inherit;
                                    }
                                }
                                .couponFr {
                                    a {
                                        display: block;
                                        width: 120px;
                                        height: 50px;
                                        line-height: 50px;
                                    }
                                }
                            }
                        }
                    }
                }

                i {
                    width: 64px;
                    height: 64px;
                    background: url("../../imgs/index/icon-close.png") no-repeat center /100%;
                    margin: 40px auto;
                }

            }

        }

        .tipsDiv {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: rgba(0,0,0,.8);
            z-index: 99;
            img {
                width: 470px;
                height: 464px;
                margin-top: 57%;
                margin-left: 50%;
                transform: translate(-50%);
            }
        }
    }

</style>
