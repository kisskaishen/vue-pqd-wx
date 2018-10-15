<template>
    <div class="myMsg">
        <div class="messageDiv">
            <ul v-if="chatList.length>0">
                <!--<li>-->
                    <!--<router-link to="">-->
                        <!--<div class="divFl">-->
                            <!--<img src="" alt="">-->
                        <!--</div>-->
                        <!--<div class="divFr">-->
                            <!--<p>消息提醒</p>-->
                        <!--</div>-->
                    <!--</router-link>-->
                <!--</li>-->
                <li v-for="item,index in chatList">
                    <router-link :to="`/chat/index?store_id=${item.storeId}`">
                        <div class="divFl">
                            <img :src="item.headPic" alt="">
                        </div>
                        <div class="divFr">
                            <p>{{item.userName}}</p>
                            <span>{{item.msg}}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
            <div v-else>
                <img src="../../imgs/user/icon-no-msg.png" alt="">
                <span>暂时还未收到任何消息</span>
            </div>
        </div>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
    import Tabbar from '../../components/footer'
    import {Toast} from 'mint-ui'

    export default {
        name: "myMsg",
        data() {
            return {
                chatList: []
            }
        },
        mounted() {
            // Toast('该版本暂不支持消息查看，情下载APP查看')
            this.getChatList()
        },
        components: {Tabbar},
        methods: {
            getChatList() {
                this.$post('Chat/getInfo', {
                    token: this.$getCookie('token')
                })
                    .then(res => {
                        this.chatList = res
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    .myMsg {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        min-height: 100%;
        background-color: #fff;
        .messageDiv {
            width: 100%;
            padding: 0 26px;
            ul {
                li {
                    border-bottom: 2px solid #eee;
                    a {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        width: 100%;
                        height: 136px;
                        .divFl {
                            img {
                                display: block;
                                width: 86px;
                                height: 86px;
                            }
                        }
                        .divFr {
                            width: 600px;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            align-items: flex-start;
                            text-align: left;
                            p {
                                width: 100%;
                                font-size: 32px;
                                color: #333;
                                margin-bottom: 10px;
                                overflow: hidden;
                                -ms-text-overflow: ellipsis;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            span {
                                width: 100%;
                                font-size: 24px;
                                color: #999;
                                overflow: hidden;
                                -ms-text-overflow: ellipsis;
                                text-overflow: ellipsis;
                                white-space: nowrap;

                            }
                        }
                    }
                }
            }
            > div {
                img {
                    width: 400px;
                    height: 278px;
                    margin: 120px auto 50px;
                }
                span {
                    display: block;
                    width: 100%;
                    text-align: center;
                    color: #999;
                    font-size:28px;
                }
            }
        }
    }

</style>
