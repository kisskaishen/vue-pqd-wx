<template>
    <div class="talkHistory">
        <div v-for="item,index in list" class="list">
            <div class="userInfo">
                <div class="divFl">
                    <img :src="item.pic" alt="">
                </div>
                <div class="divFr">
                    <p>{{item.nick_name}}</p>
                    <p>{{item.display_time}}</p>
                </div>
            </div>
            <div class="content">
                <ul>
                    <li v-for="item,index in item.content">
                        <p>
                            <label v-if="item.title">{{item.title}}</label>
                            <span v-if="item.desc">{{item.desc}}</span>
                        </p>
                    </li>
                    <li>
                        <p>
                            <label v-if="item.proof_imgs.title">{{item.proof_imgs.title}}</label>
                            <img :src="item" alt="" v-for="item,index in item.proof_imgs.proof_imgs"
                                 @click="enlargeImg(item,index)">
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <!--图片放大-->
        <div class="bigImg" @click="closeImg" v-if="showBigImg">
            <img :src="bigImgUrl" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: "talkHistory",
        data() {
            return {
                info: {},
                list: [{content: [], proof_imgs: {}}],
                showBigImg: false,
                bigImgUrl: ''
            }
        },
        mounted() {
            this.getInfo()
        },
        methods: {
            getInfo() {
                this.$post('user/getOrderServiceList', {
                    order_sn: this.$route.query.order_sn,
                    token: this.$getCookie('token')
                })
                    .then(res => {
                        this.info = res
                        this.list = res.order_service
                    })
            },
            enlargeImg(val, index) {
                this.bigImgUrl = val
                this.showBigImg = true
            },
            closeImg() {
                this.showBigImg = false
            }
        }
    }
</script>

<style scoped lang="scss">
    .list {
        margin-bottom: 20px;
        background-color: #fff;
        padding: 20px;
        .userInfo {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .divFl {
                img {
                    width: 60px;
                    height: 60px;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                }
            }
            .divFr {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                p {
                    font-size: 28px;
                    &:last-child {
                        color: #999;
                        font-size: 24px;
                    }
                }
            }
        }
        .content {
            padding: 20px 0;
            ul {
                li {
                    p {
                        display: flex;
                        justify-content: flex-start;
                        align-items: flex-start;
                        padding: 6px 0;
                        label {
                            color: #444;
                            min-width: 120px;
                        }
                        span {
                            color: #888;
                        }
                        img {
                            display: inline-block;
                            width: 180px;
                            height: 180px;
                        }
                    }
                }
            }
        }
    }

    .bigImg {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        background-color: rgba(0, 0, 0, .6);
        img {
            width: 80%;
            margin: 50px auto 0;
        }
    }
</style>
