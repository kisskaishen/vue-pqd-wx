<template>
    <div>
        <div class="remark">
            <div class="title"><i></i><span>商品详情</span></div>
            <div :class="['cont',isOpen?'isOpenCont':'']">
                <div>{{goodsInfo.goods_remark}}</div>
                <div class="shadow" v-if="isOpen"></div>
            </div>
            <div>
                <button @click="reviseRemark">{{isOpen?'展开':'收起'}}</button>
            </div>
        </div>
<!-- 1 -->

    </div>
</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        props: ['storeInfo', 'storeId'],
        data() {
            return {
                swiperOptionTap: {
                    notNextTick: true,
                    freeMode: true,
                    autoplay: false,
                    speed: 1000,
                    loopedSlides: true,
                    freeModeMomentumRatio: 0.5,
                    slidesPerView: 'auto',
                    preventClicks: true,
                    onClick: this.activeClick
                },
                isCollected: false,
                isOpen: false,
                store_id: '',
                is_coller: '',           // 是否被收藏  0=>'未被收藏'
            }
        },

        mounted() {
            this.isOpen = true
            this.store_id = this.storeId

            setTimeout(() => {
                this.store_id = this.storeId
                this.is_coller = this.storeInfo.store_coller.is_store_coller
            }, 600)
        },
        computed: {
            store() {
                return this.storeInfo.merchant_info
            },
            goodsInfo() {
                return this.storeInfo
            }
        },
        methods: {

            collect() {
                if (this.is_coller  == '0') {
                    this.$post('user/addStoreCollect', {
                        store_id: this.store_id,
                        token: this.$getCookie('token') ? this.$getCookie('token') : ''
                    })
                        .then(res => {
                            this.is_coller = 1
                            Toast({
                                message: '已收藏',
                                duration: 1200
                            })
                        })

                } else {
                    this.$post('user/cancelStoreCollect', {
                        store_id: this.store_id,
                        token: this.$getCookie('token') ? this.$getCookie('token') : ''
                    })
                        .then(res => {
                            this.is_coller = 0
                            Toast({
                                message: '已取消收藏',
                                duration: 1200
                            })
                        })

                }
            },

            // 展开收起
            reviseRemark() {
                this.isOpen = !this.isOpen
            }
        },
        watch:{
            '$route'(to,from) {
                location.reload()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goodsStore {
        display: flex;
        justify-content: space-between;
        margin-top: 0;
        padding: 20px 26px;
        .storeFl {
            a {
                img {
                    width: 86px;
                    height: 86px;
                    /*border: 1px solid #ccc;*/
                }
                .storeName {
                    p {
                        text-align: left;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        height: 40px;
                        line-height: 40px;
                        b {
                            color: #333;
                            font-size: 30px;
                            width: auto;
                        }
                        img {
                            width: 120px;
                            height: 30px;
                            border: none;
                            margin-left: 10px;
                        }
                        span {
                            width: auto;
                            margin-right: 20px;
                        }
                    }
                }
            }
        }

        .storeFr {
            .collect {
                display: flex;
                justify-content: center;
                align-items: center;
                border: 2px solid #ccc;
                padding: 14px 0;
                width: 154px;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                i {
                    display: inline-block;
                    width: 34px;
                    height: 34px;
                    vertical-align: middle;
                    margin-right: 12px;
                    background: url("../../imgs/detail/icon-collect.png") no-repeat center /100%;
                }
                span {
                    display: inline-block;
                    color: #999;
                }
            }
            .isCollect {
                border: 2px solid #ff6842;
                padding: 14px 0;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                i {
                    display: inline-block;
                    width: 34px;
                    height: 34px;
                    vertical-align: middle;
                    margin-right: 12px;
                    background: url("../../imgs/detail/icon-collect-active.png") no-repeat center /100%;
                }
                span {
                    color: #ff6842;
                }
            }
        }
    }

    .recommend {
        background-color: #fff;
        padding: 40px 0;
    }

    .horizationGoods {
        position: relative;
        width: 698px;
        margin: 0 auto;
        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            b {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 30px;
                color: #4d4d4d;
                i {
                    width: 4px;
                    height: 16px;
                    background: rgba(255, 70, 78, 1);
                    border-radius: 2px;
                    margin-right: 20px;
                }
            }
            a {
                font-size: 24px;
            }
        }
        .swiper-container {
            .swiper-slide {
                width: 250px;
                margin-right: 20px;
                a {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    img {
                        display: block;
                        width: 250px;
                        height: 250px;
                    }
                    .goodsName {
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        font-size: 24px;
                        color: #333;
                        margin: 20px 0 24px;
                    }
                    .goodsInfo {
                        b {
                            font-size: 24px;
                            color: #ff4862;
                            span {
                                font-size: 32px;
                            }
                        }
                        .singlePrice {
                            margin-left: 20px;
                            font-size: 24px;
                            color: #999;
                        }
                    }
                }
            }
        }
        .shadow {
            position: absolute;
            right: 0;
            top: 50px;
            width: 130px;
            height: 380px;
            background: url("../../imgs/index/icon-goods-shadow.png") no-repeat center /100%;
            z-index: 9;
        }
    }

    .remark {
        padding: 10px 26px 0;
        background-color: #fff;
        color: #999;
        font-size: 28px;
        .title {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 20px 0;
            i {
                width: 4px;
                height: 16px;
                background: rgba(255, 70, 78, 1);
                border-radius: 2px;
                margin-right: 20px;
            }
            span {
                color: #333;
                font-size: 30px;
                font-weight: bold;
            }
        }
        .isOpenCont {
            position: relative;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
            font-size: 28px;
            color: #999;
            max-height: 144px;
            .shadow {
                position: absolute;
                bottom: -10px;
                left: 0;
                right: 0;
                height: 100px;
                background: url("../../imgs/detail/icon-shadow-top.png") no-repeat center /100%;
            }
        }
        button {
            display: block;
            width: 154px;
            height: 50px;
            line-height: 50px;
            border: 2px solid #CCCCCC;
            background-color: #fff;
            font-size: 28px;
            color: #333;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            margin: 30px auto;
        }
    }

</style>
