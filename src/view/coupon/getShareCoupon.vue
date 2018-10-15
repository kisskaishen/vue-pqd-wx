<template>
    <div class="getShareCoupon">
        <canvas id="canvas" class="brs20 canvas"></canvas>
        <div class="couponDiv">
            <div class="banner">
                <img src="../../imgs/coupon/icon-share-bg.png" alt="拼趣多优惠券">
            </div>
            <div class="coupon brs20 bgfff">
                <div class="goodsDiv">
                    <img :src="goodInfo.goods_img" :alt="goodInfo.goods_name" class="brs8 divFl mr20">
                    <div class="divFr">
                        <div class="goodsName overflow2 c333 fz30">{{goodInfo.goods_name}}</div>
                        <div class="other">
                            <p>
                                <img :src="goodInfo.share_head_pic" :alt="goodInfo.share_nickename" v-for="item,index in 2"
                                     class="head brs50">
                                <span class="c999 fz24 ml20">差你成团</span>
                            </p>
                            <p class="fz24">
                                <span class="c333">{{goodInfo.sales}}</span>
                                <span class="c999">笔成交</span>
                            </p>
                        </div>
                        <div class="other">
                            <p>
                                <img src="../../imgs/coupon/icon-nowMoney.png" alt="" class="nowMoney">
                                <span class="fz24 cff4862" style="margin-top: 2px">￥</span>
                                <span class="fz32 fwbold cff4862">{{goodInfo.prom_price}}</span>
                                <img src="../../imgs/coupon/icon-quan.png" alt="" class="quan ml10">
                            </p>
                            <p>
                                <button class="fz24 bgff4862">立即抢</button>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="getCoupon">

                    <div class="showCouponDiv" style="display: none;" v-for="item,index in couponArr">
                        <div class="divFl">
                            <p class="cFF4862"><span class="fz28">￥</span><span
                                class="fz56 fwbold">{{item.money}}</span></p>
                            <p class="c666 fz22">满{{item.condition}}可用</p>
                        </div>
                        <div class="divFr">
                            <div class="info">
                                <p class="overFlow1 fwbold fz28">{{item.coupon_name}}</p>
                                <p class="c666 fz24">{{item.use_end_time}}</p>
                            </div>
                            <button class="cFF4862 ml10" @click="nowUse(item,index)">立即使用</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="moreList">
            <b class="lookTitle fz30"><i></i>看了又看</b>
            <goods-squared :goods="goodsList"></goods-squared>
            <p>----已经到底了----</p>
        </div>

    </div>
</template>

<script>
    // import {Toast} from 'mint-ui';
    // import autoLogin from '../../config/autoLogin'
    import GoodsSquared from "../../components/index/goodsCouponSquared";

    $(function () {
        function init() {
            var myCanvasObject = document.getElementById("canvas");

            var ctx = myCanvasObject.getContext("2d");
            var width = myCanvasObject.width
            var height = myCanvasObject.height
            //绘制黑色矩形
            ctx.beginPath();
            ctx.fillStyle = "#939393";
            ctx.rect(0, 0, width, height);
            ctx.closePath();
            ctx.fill();

            var isDown = false; //鼠标是否按下标志
            var pointerArr = []; //鼠标移动坐标数组
            var xPointer = 0;//鼠标当前x坐标
            var yPointer = 0;//鼠标当前y坐标


            //pc，移动事件兼容写法
            var hastouch = "ontouchstart" in window ? true : false,
                tapstart = hastouch ? "touchstart" : "mousedown",
                tapmove = hastouch ? "touchmove" : "mousemove",
                tapend = hastouch ? "touchend" : "mouseup";


            //鼠标按下
            myCanvasObject.addEventListener(tapstart, function (event) {
                console.log(event)
                var e = window.event || event;//2017-12-06
                this.style.cursor = "move";
                isDown = true;
                xPointer = hastouch ? e.targetTouches[0].pageX : e.clientX - this.offsetLeft;
                yPointer = hastouch ? e.targetTouches[0].pageY - 320 : e.clientY - this.offsetTop;
                ;

                pointerArr.push([xPointer, yPointer]);
                circleReset(ctx);
            });


            //鼠标按下后拖动
            myCanvasObject.addEventListener(tapmove, function (event) {
                console.log(event)
                var e = window.event || event;//2017-12-06
                if (isDown) {
                    xPointer = hastouch ? e.targetTouches[0].pageX : e.clientX - this.offsetLeft;
                    ;
                    yPointer = hastouch ? e.targetTouches[0].pageY - 320 : e.clientY - this.offsetTop;
                    ;
                    console.log(xPointer)
                    console.log(yPointer)
                    pointerArr.push([xPointer, yPointer]);
                    circleReset(ctx);
                }
            });


            //鼠标抬起取消事件
            myCanvasObject.addEventListener(tapend, function (event) {
                isDown = false;
                pointerArr = [];
            });


            //圆形橡皮檫
            function circleReset(ctx) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(pointerArr[0][0], pointerArr[0][1]);
                ctx.lineCap = "round";　　 //设置线条两端为圆弧
                ctx.lineJoin = "round";　　 //设置线条转折为圆弧
                ctx.lineWidth = 40;
                ctx.globalCompositeOperation = "destination-out";
                if (pointerArr.length == 1) {
                    ctx.lineTo(pointerArr[0][0] + 1, pointerArr[0][1] + 1);
                } else {
                    for (var i = 1; i < pointerArr.length; i++) {
                        ctx.lineTo(pointerArr[i][0], pointerArr[i][1]);
                        ctx.moveTo(pointerArr[i][0], pointerArr[i][1]);
                    }
                }
                ctx.closePath();
                ctx.stroke();
                ctx.restore();
                setTimeout(() => {
                    $('#canvas').hide();
                    $('.showCouponDiv').show();
                }, 1200)
            }
        }

        init()
    })

    export default {
        name: "getShareCoupon",
        data() {
            return {
                goodInfo:{},            // 商品详情
                couponArr:[],            // 优惠券数组
                goodsList: []
            }
        },
        components: {GoodsSquared},
        mounted() {
            this.getDetail()
            this.getGoodsList(1)
        },
        methods: {
            // 详情
            getDetail() {
                this.$post('share/getCouponShare',{
                    coupon_share_record_id:this.$route.query.coupon_share_record_id,
                    token:this.$getCookie('this.$getCookie')?this.$getCookie('token'):''
                })
                    .then(res=>{
                        this.goodInfo = res.goods_info
                        this.couponArr = res.coupon
                    })
            },
            // 立即使用
            nowUse(val,index) {
                // 这里要跳去哪里，店铺页？首页？if this，少store_id
                console.log(val)
                console.log(index)
            },
            // 猜你喜欢
            getGoodsList(page) {
                this.$post('coupon/getCouponGoodsList', {
                    page: page
                })
                    .then(res => {
                        this.goodsList = [...this.goodsList, ...res.list]
                    })
            },
        }
    }
</script>

<style scoped lang="scss">
    .getShareCoupon {
        position: relative;
        width: 750px;
        margin: 0 auto;
    }

    #canvas {
        width: 678px;
        height: 278px;
        background: url("../../imgs/index/icon-coupon-bg.png") no-repeat center /100%;
    }

    .canvas {
        position: absolute;
        top: 680px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9;
    }

    .couponDiv {
        position: relative;
        min-height: 936px;
        .banner {
            img {
                width: 750px;
            }
        }
        .coupon {
            position: absolute;
            top: 396px;
            left: 50%;
            transform: translateX(-50%);
            width: 698px;
            padding: 26px 10px 10px;
            box-shadow: 0px 10px 30px 0px rgba(153, 153, 153, 0.16);
            .goodsDiv {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 0 16px;
                .divFl {
                    width: 180px;
                    height: 180px;
                }
                .divFr {
                    flex: 1;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    align-content: stretch;
                    flex-direction: column;
                    padding: 10px 0;
                    > div {
                        width: 100%;
                        /*line-height: 40px;*/
                        padding: 5px 0;
                    }
                    .goodsName {
                        max-height: 80px;
                        line-height: 40px;
                    }
                    .other {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        p {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            .head {
                                width: 32px;
                                height: 30px;
                                margin-right: -10px;
                            }
                            .nowMoney {
                                width: 72px;
                                height: 36px;
                            }
                            .quan {
                                width: 46px;
                                height: 30px;
                            }
                            button {
                                width: 150px;
                                height: 50px;
                                line-height: 50px;
                                -webkit-border-radius: 50px;
                                -moz-border-radius: 50px;
                                border-radius: 50px;
                            }
                        }
                    }
                }
            }
            .getCoupon {
                margin-top: 26px;
                background-color: #F5F5F5;

                .showCouponDiv {
                    width: 608px;
                    min-height: 222px;
                    margin: 0 auto;
                    padding: 0 20px;
                    background: url("../../imgs/index/icon-coupon-bg.png") no-repeat center /100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .divFl {
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: center;
                        width: 140px;
                        p {
                            display: flex;
                            justify-content: center;
                            align-items: baseline;
                            span {
                                width: auto;
                            }

                        }
                    }
                    .divFr {
                        width: 380px;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        .info {
                            width: 234px;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            align-items: flex-start;
                            margin-left: 10px;
                            p {
                                line-height: 44px;
                                width: 234px;
                            }
                        }
                        button {
                            font-size: 24px;
                            width: 120px;
                            height: 50px;
                            line-height: 50px;
                            -webkit-border-radius: 50px;
                            -moz-border-radius: 50px;
                            border-radius: 50px;
                            background-color: #fff;
                            border: 2px solid #FF4862;
                        }
                    }
                }
            }
        }

    }

    .moreList {
        margin-top: 40px;
        b {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0 26px;
            background-color: #fff;
            i {
                width: 4px;
                height: 16px;
                margin-right: 16px;
                background: rgba(255, 70, 78, 1);
                border-radius: 2px;
            }
        }
        p {
            text-align: center;
        }
        .goodsList {
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
            padding: 0 18px;
            .goods {
                width: 336px;
                padding-bottom: 10px;
                margin: 20px 0 0;
                background-color: #fff;
                &:nth-child(2n) {
                    margin-right: 0;
                }
                .goodsImage {
                    img {
                        display: block;
                        width: 100%;
                        height: 336px;
                        -webkit-border-radius: 8px;
                        -moz-border-radius: 8px;
                        border-radius: 8px;
                    }
                }
                .goodsName {
                    span {
                        display: block;
                        width: 100%;
                        height: 84px;
                        line-height: 42px;
                        font-size: 30px;
                        color: #333;
                        text-align: left;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        line-clamp: 2;
                        margin: 12px 0;
                    }
                }
                .goodsDetail {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    b {
                        color: #F13D3C;
                        font-size: 32px;
                        margin-right: 20px;
                        padding: 0;
                    }
                    span {
                        font-size: 24px;
                        color: #4c4c4c;
                        span {
                            color: #999;
                        }
                    }
                }
                .btn {
                    margin-top: 16px;
                    button {
                        width: 100%;
                        height: 66px;
                        line-height: 66px;
                        background-color: #FF4862;
                        -webkit-border-radius: 66px;
                        -moz-border-radius: 66px;
                        border-radius: 66px;
                    }
                }
            }

        }
    }
</style>
