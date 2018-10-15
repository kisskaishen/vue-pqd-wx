<template>
    <div class="myFootmark">
        <div class="list">
            <ul v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="100">
                <li v-for="item,index in list">
                    <div @click="checkIconClickParent(item,index)">
                        <div class="tip">
                            <i></i>
                            <span>{{item.day}}</span>
                        </div>
                        <div class="goods"
                             v-for="item,index in item.items" :key="item.goods_id">
                            <i :class="item.isCheck?'checkIcon':''" v-if="isShowIcon"
                               @click="checkIconClick(item,index)"></i>
                            <router-link :to="`/detail/index?goods_id=${item.goods_id}`">
                                <div class="divFl">
                                    <img :src="item.list_img" alt="">
                                </div>
                                <div class="divFr">
                                    <p class="name">{{item.goods_name}}</p>
                                    <p class="spec">
                                        <label>{{item.prom}}人拼团 · 已拼{{item.sales}}</label>
                                    </p>
                                    <p class="money">
                                        <b class="red">￥{{item.prom_price}}</b>
                                        <!--<span class="red">领券有优惠</span>-->
                                    </p>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="bottom" v-if="list.length>0">
            <div class="opts" v-if="isEdit">
                <span></span>
                <button @click="editBtn">编辑</button>
            </div>
            <div class="opts" v-else>
                <span>
                    <i @click="changeAll" :class="isAllIcon?'isAll':''"></i>全选
                </span>
                <button @click="deleteBtn">删除</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'

    export default {
        name: "myFootmark",
        data() {
            return {
                list: [],
                loading: false,
                page: 0,
                isCheck: true,
                currentIndex: '',
                parentIndex: '',
                isEdit: true,
                isAllIcon: false,
                isShowIcon: false,
                arrIds: [],
            }
        },
        mounted() {
        },
        methods: {
            getList(page) {
                this.$post('user/getFootprints', {
                    page: page,
                    token: this.$getCookie('token') ? this.$getCookie('token') : ''
                })
                    .then(res => {
                        if (page == '1') {
                            this.list = res.list
                        } else if (page > '1' && res.list != '') {
                            this.list = this.list.concat(res.list)
                        } else {
                            Toast({
                                message: '已拉倒底了',
                                duration: 1000
                            })
                        }
                    })
            },
            loadMore() {
                this.loading = true
                this.page++
                this.getList(this.page)
                this.loading = false
            },

            // 编辑
            editBtn() {
                this.isEdit = false
                this.isShowIcon = true
            },

            // 删除
            deleteBtn() {
                this.$post('user/delFootprints',{
                    ids: this.arrIds.join(','),
                    token:this.$getCookie('token')?this.$getCookie('token'):''
                })
                    .then(res=>{
                        this.isEdit = true
                        this.getList(1)

                        this.isShowIcon = false
                    })
            },

            // 点击全选
            changeAll() {
                this.isAllIcon = !this.isAllIcon
                if (this.isAllIcon) {
                    for (let i = 0; i < this.list.length; i++) {
                        for (let j = 0; j < this.list[i].items.length; j++) {
                            this.list[i].items[j].isCheck = true
                            this.arrIds.push(this.list[i].items[j].id)
                        }
                    }
                    console.log(this.arrIds)
                    console.log(JSON.stringify(this.arrIds))
                } else {
                    for (let i = 0; i < this.list.length; i++) {
                        for (let j = 0; j < this.list[i].items.length; j++) {
                            this.list[i].items[j].isCheck = false
                        }
                    }
                    this.arrIds = []
                }
            },

            checkIconClickParent(val, index) {
                this.parentIndex = index
            },
            // 选择图标
            checkIconClick(val, index) {
                console.log(this.arrIds)
                setTimeout(() => {
                    this.currentIndex = index
                    this.list[this.parentIndex].items[this.currentIndex].isCheck = !val.isCheck
                    this.arrIds.push(val.id)
                }, 100)


                // for (let i = 0; i < this.list.length; i++) {
                //     for (let j = 0; j < this.list[i].items.length; j++) {
                //         if (this.list[i].items[j].isCheck = false) {
                //             this.isAllIcon = false
                //         }
                //     }
                // }

            },


        }
    }
</script>

<style scoped lang="scss">
    .myFootmark {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        min-height: 100%;
        background-color: #fff;
    }

    .list {
        padding: 0 26px 100px;
        ul {
            li {
                position: relative;
                margin-top: 40px;
                border-bottom: 1px solid #eee;
                .tip {
                    margin-bottom: 30px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    i {
                        width: 4px;
                        height: 16px;
                        background: rgba(255, 70, 78, 1);
                        border-radius: 2px;
                        margin-right: 16px;
                    }
                    span {
                        font-size: 28px;
                        color: #333;
                    }
                }
                .goods {
                    position: relative;
                    margin-bottom: 40px;
                    > i {
                        position: absolute;
                        left: 14px;
                        top: 14px;
                        width: 34px;
                        height: 34px;
                        background: url("../../imgs/user/icon-noCheck.png") no-repeat center /100%;
                        z-index: 9;
                    }
                    .checkIcon {
                        background: url("../../imgs/user/icon-check.png") no-repeat center /100%;
                    }
                    input[type='checkbox'] {
                        position: absolute;
                        left: 14px;
                        top: 14px;
                        width: 34px;
                        height: 34px;
                    }
                    a {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        .divFl {
                            img {
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
                            align-items: flex-start;
                            align-self: stretch;
                            p {
                                text-align: left;
                                width: 100%;
                            }
                            .name {
                                font-size: 30px;
                                color: #333;
                                max-height: 80px;
                                line-height: 40px;
                                overflow: hidden;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                text-overflow: ellipsis;
                            }
                            .spec {
                                font-size: 24px;
                                color: #999;
                                span {
                                    color: #333;
                                }
                            }
                            .money {
                                b {
                                    font-size: 32px;
                                }
                                span {
                                    font-size: 28px;
                                }
                            }
                        }
                    }

                }
            }
        }
    }

    .bottom {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100px;
        line-height: 100px;
        border-top: 1px solid #eee;
        background: #fff;
        .opts {
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
                padding-left: 36px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-size: 30px;
                i {
                    width: 34px;
                    height: 34px;
                    margin-right: 16px;
                    background: url("../../imgs/user/icon-noCheck.png") no-repeat center /100%;
                }
                .isAll {
                    background: url("../../imgs/user/icon-check.png") no-repeat center /100%;
                }
            }
            button {
                width: 276px;
                height: 100px;
                line-height: 100px;
                color: #fff;
                background-color: #FF4862;
            }
        }
    }
</style>
