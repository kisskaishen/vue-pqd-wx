<template>
    <div>
        <div class="groupInfo detailsDiv" v-if="groupList.length>'0'">
            <div class="tip">
                <b><i></i>{{groupList.length}}人拼团中，可直接参与</b>
                <router-link to="flow">拼团流程></router-link>
            </div>
            <div class="groupBodyHorization" v-if="groupList.length>2">
                <swiper :options="swiperOptionTap" ref="mySwiperTap">
                    <swiper-slide v-for="item,index in groupList" :key="item.group_id">
                        <div class="groupSwiper" @click="goGroup(item,index)">
                        <!--<router-link-->
                            <!--:to="'/detail/index?goods_id='+$route.query.goods_id+'&group_id='+item.group_id">-->
                            <div class="top">
                                <img :src="item.photo" :alt="index" v-if="item.photo" @error="imgError(item,index)">
                                <span>{{item.nicke_name}}</span>
                            </div>
                            <div class="center">
                                <p>还差 <span>{{item.order_pay_num}}人</span>拼成</p>
                                <p>
                                    <count-down :endTime="item.end_time"></count-down>
                                </p>
                            </div>
                            <button>去拼团 <i></i></button>
                        <!--</router-link>-->
                        </div>
                    </swiper-slide>
                </swiper>
                <div class="shadow"></div>
            </div>
            <div class="groupBody" v-else>
                <div class="bodyList divDiv" v-for="item,index in groupList" :key="item.group_id">
                    <div class="bodyListFl divFl">
                        <img :src="item.photo" alt="头像" @error="imgError(item,index)">
                        <div>
                            <p class="name">{{item.nicke_name}}</p>
                            <p>
                                <span>还差<b>{{item.order_pay_num}}人</b>拼团</span>
                                <span><count-down :endTime="item.end_time"></count-down></span>
                            </p>
                        </div>
                    </div>
                    <div class="bodyListFr divFr">
                        <div>
                            <router-link
                                :to="'/detail/index?goods_id='+$route.query.goods_id+'&group_id='+item.group_id">
                                参与拼单>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import countDown from '../../components/groupCountDown'

    export default {
        data() {
            return {
                groupList: [],
                swiperOptionTap: {
                    notNextTick: true,
                    freeMode: true,
                    autoplay: false,
                    loopedSlides: true,
                    freeModeMomentumRatio: 0.5,
                    slidesPerView: 'auto',
                    preventClicks: true,
                    onClick: this.activeClick
                },

            }
        },
        mounted() {
            this.getGroupList()
        },
        components: {countDown},

        methods: {
            getGroupList() {
                this.$post('group/getGoodsGroupList', {
                    goods_id: this.$route.query.goods_id
                })
                    .then(res => {
                        this.groupList = res.list
                    })
            },
            // 点击显示规格选择，记得带上group_id
            goGroup(val,index) {
                this.$emit('listenShowSpec',val)
            },
            imgError(val,index) {
                this.groupList[index].photo = 'https://cdn2.pinquduo.cn/Public/upload/logo/logo.jpg'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .groupInfo {
        padding: 30px 0 0;
        .tip {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 26px 10px;
            font-size: 30px;

            b {
                display: flex;
                align-items: center;
                color: #333;
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
        .groupBodyHorization {
            position: relative;
            padding: 20px 0;
            border-bottom: 1px solid #eee;
            .swiper-container {
                .swiper-slide {
                    width: 300px;
                    .groupSwiper {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        width: 300px;
                        border-right: 1px solid #eee;
                        .top {
                            img {
                                display: block;
                                width: 120px;
                                height: 120px;
                                margin: 0 auto;
                                -webkit-border-radius: 50%;
                                -moz-border-radius: 50%;
                                border-radius: 50%;
                                border: 2px solid #eee;
                            }
                            span {
                                display: block;
                                width: 240px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                text-align: center;
                                margin: 0 auto;
                                font-size: 28px;
                                color: #333;
                                height: 60px;
                                line-height: 40px;
                                /*padding: 10px 0 16px;*/
                            }
                        }
                        .center {
                            p {
                                color: #999;
                                margin-bottom: 6px;
                                font-size: 24px;
                                span {
                                    color: #ff4862;
                                }
                            }
                        }

                        button {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background: linear-gradient(to right, #ff8484, #ff464e);
                            -webkit-border-radius: 10px;
                            -moz-border-radius: 10px;
                            border-radius: 10px;
                            font-size: 28px;
                            padding: 8px 34px;
                            margin: 10px 0 20px;
                            i {
                                margin-left: 16px;
                                width: 10px;
                                height: 18px;
                                background: url("../../imgs/index/icon-arrow-right.png") no-repeat center /100%;
                            }
                        }
                    }
                }

            }
            .shadow {
                position: absolute;
                right: 0;
                top: 0px;
                width: 130px;
                height: 380px;
                background: url("../../imgs/index/icon-goods-shadow.png") no-repeat center /100%;
                z-index: 9;
            }
        }
        .groupBody {
            padding: 0 26px;
            border-bottom: 2px solid #eee;
            .bodyList {
                display: flex;
                justify-content: space-between;
                margin: 20px 0;
                overflow: hidden;

                .bodyListFl {
                    img {
                        width: 120px;
                        height: 120px;
                        -webkit-border-radius: 50%;
                        -moz-border-radius: 50%;
                        border-radius: 50%;
                    }
                    > div {
                        p {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            span {
                                display: flex;
                                color: #999;
                                width: auto;
                                b {
                                    width: auto;
                                    font-weight: normal;
                                    color: #ff464e;
                                }
                            }
                        }
                        .name {
                            display: block;
                            width: 380px;
                            font-size: 28px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }

                    }
                }
                .bodyListFr {
                    display: flex;
                    align-items: center;
                    align-content: center;
                    justify-content: space-between;
                    a {
                        display: block;
                        background: linear-gradient(to right, #ff8484, #ff464e);
                        -webkit-border-radius: 10px;
                        -moz-border-radius: 10px;
                        border-radius: 10px;
                        font-size: 28px;
                        padding: 6px 14px;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
