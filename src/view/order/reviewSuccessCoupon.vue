<template>
    <div class="reviewSuccessCoupon">
        <img src="../../imgs/review/icon-thx.png" alt="拼趣多优惠券" class="img1">
        <p class="fz24 c4c4c4c brs8">优惠券已放入“个人”—“优惠券中心”</p>
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
                            <p class="fz22 c666 overFlow1">2018.08.14~2018.08.27</p>
                        </div>
                        <div class="couponFr">
                            <router-link to="" class="brs50 br2solidff4862 cff4862 fz24">立即使用</router-link>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="btn">
            <router-link to="/user/index" class="brs8 bgfff fz28 cff4862 br2solidff4862">返回个人中心</router-link>
            <router-link to="/user/myCoupon" class="brs8 bgff4862 fz28 cfff ">查看我的优惠券</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "reviewSuccessCoupon"
    }
</script>

<style scoped lang="scss">
    .reviewSuccessCoupon {
        .img1 {
            width: 356px;
            height: 56px;
            margin: 98px auto 34px;
        }
        > p {
            width: 632px;
            height: 58px;
            line-height: 58px;
            text-align: center;
            margin: 0 auto;
            background-color: #FFF8E6;
        }
        .couponDiv {
            width: 668px;
            margin: 40px auto;
            ul {
                max-height: 740px;
                overflow: scroll;
                li {
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 668px;
                    height: 222px;
                    padding: 0 40px 0 0;
                    background: url("../../imgs/review/icon-coupon-bg.png") no-repeat center /100%;
                    i {
                        position: absolute;
                        left: 20px;
                        top: 26px;
                        width: 80px;
                        height: 30px;
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
                        width: 210px;
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
                        justify-content: space-between;
                        align-items: center;
                        .couponFl {
                            width: 260px;
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
                                width: 150px;
                                height: 50px;
                                line-height: 50px;
                            }
                        }
                    }
                }
            }
        }

        .btn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 550px;
            margin: 0 auto;
            a {
                width: 250px;
                height: 70px;
                line-height: 70px;
            }
        }
    }

</style>
