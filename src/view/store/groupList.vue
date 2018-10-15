<template>
    <div class="groupList">
        <ul v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="100">
            <li class="groupDiv" v-for="item,index in groupList">
                <router-link :to="`/group/detail?group_id=${item.group_id}`">
                    <div class="top">
                        <div class="divFl">
                            <img :src="item.photo" alt="">
                        </div>
                        <div class="divFr">
                            <p class="nickname">{{item.nicke_name}}</p>
                            <p>还差 <span class="red">1人</span>拼成,
                                <count-down :endTime="item.end_time"></count-down>
                            </p>
                        </div>
                    </div>
                    <div class="body">
                        <div class="divFl">
                            <img :src="item.goods_list_img" alt="">
                        </div>
                        <div class="divFr">
                            <p class="name">{{item.goods_name}}</p>
                            <!--<p class="sale">已拼 <span>11件</span></p>-->
                            <p class="money">
                                <b class="red">￥{{item.goods_price}}</b>
                                <button>去拼团<i></i></button>
                            </p>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import countDown from '../../components/groupCountDown'

    export default {
        name: "groupList",
        data() {
            return {
                groupList: [],
                loading: false,
                page: 0
            }
        },
        mounted() {
        },
        components: {countDown},

        methods: {
            getList(page) {
                this.$post('group/getStoreGroupList', {
                    store_id: this.$route.query.store_id,
                    page: page
                })
                    .then(res => {
                        if (page == '1' && res.total_page > 0) {
                            this.groupList = res.list
                        } else if (page > 1 && res.list != '') {
                            this.groupList = this.groupList.concat(res.list)
                        } else {
                            Toast({
                                message: '无更多数据啦~~',
                                duration: 1200
                            })
                        }
                    })
            },
            loadMore() {
                this.loading = true
                this.page++
                this.getList(this.page)
                this.loading = false
            }
        }
    }
</script>

<style scoped lang="scss">
    .groupList {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        min-height: 100%;
        background-color: #fff;
        .groupDiv {
            padding: 0 26px;
            a {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                padding: 40px 0;
                border-bottom: 1px solid #ececec;
                .top {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    .divFl {
                        img {
                            display: block;
                            width: 80px;
                            height: 80px;
                            -webkit-border-radius: 50%;
                            -moz-border-radius: 50%;
                            border-radius: 50%;
                        }
                    }
                    .divFr {
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: flex-start;
                        line-height: 40px;
                        p {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            font-size: 24px;
                        }
                        .nickname {
                            font-size: 28px;
                            color: #61B2C2;
                        }
                    }
                }
                .body {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    margin-top: 30px;
                    .divFl {
                        img {
                            display: block;
                            width: 250px;
                            height: 250px;
                            -webkit-border-radius: 8px;
                            -moz-border-radius: 8px;
                            border-radius: 8px;
                        }
                    }
                    .divFr {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-self: stretch;
                        align-content: stretch;
                        padding: 10px 0;
                        p {
                            width: 100%;
                            text-align: left;
                        }
                        .name {
                            max-height: 80px;
                            line-height: 40px;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            font-size: 30px;
                            color: #333;
                        }
                        .sale {
                            margin-top: -40px;
                            span {
                                color: #333;
                            }
                        }
                        .money {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .red {
                                font-size: 32px;
                            }
                            button {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                background: linear-gradient(to right, #FF8484, #FF4862);
                                padding: 12px 30px;
                                -webkit-border-radius: 8px;
                                -moz-border-radius: 8px;
                                border-radius: 8px;
                                font-size: 28px;
                                i {
                                    margin-left: 10px;
                                    width: 10px;
                                    height: 18px;
                                    background: url("../../imgs/index/icon-arrow-right.png") no-repeat center /100%;
                                }
                            }
                        }
                    }

                }
            }
        }
    }
</style>
