<template>
    <div class="setting">
        <div class="top">
            <img src="../../imgs/user/icon-logo.png" alt="">
            <span>版本号：v4.0.2</span>
        </div>
        <div class="center">
            <ul>
                <li v-for="item,index in menu" @click="goPage(item,index)" v-if="index!='1'">
                    <span>{{item.name}}</span>
                    <i></i>
                </li>
                <li v-for="item,index in menu" v-if="index=='1'" @click="clearStorage">
                    <span>{{item.name}}</span>
                    <i></i>
                </li>

            </ul>
        </div>
        <div class="bottom">
            <button @click="outLogin" v-if="decodeURI(this.$getCookie('loginType'))=='网页版'">退出登录</button>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'

    export default {
        name: "setting",
        data() {
            return {
                menu: [
                    {
                        url: 'feedback',
                        name: '意见反馈'
                    },
                    {
                        name: '清除缓存'
                    },
                    {
                        url: 'https://itunes.apple.com/cn/app/id1169291193',
                        name: '下载拼趣多APP'
                    }
                ],
            }
        },
        mounted() {
        },
        methods: {
            // 清除token
            clearStorage() {
                this.$clearCookie('token')
                Toast({
                    message: '清除成功',
                    duration: 1200
                })
            },
            goPage(val, index) {
                if (index == '0') {
                    this.$router.push('/user/feedback')
                } else {
                    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
                        window.location.href = "https://itunes.apple.com/cn/app/id1169291193";
                    } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
                        window.location.href = "http://imtt.dd.qq.com/16891/31516CAB239D4C899222070311D7E0CD.apk?fsname=com.jumper.spellgroup_4.0.0_45.apk&amp;csr=1bbd";
                    } else { //pc
                        window.location.href = "https://wx.pinquduo.cn";
                    }
                }
            },
            // 网页端退出登录
            outLogin() {
                this.$post('user/logout', {
                    token: this.$getCookie('token')
                })
                    .then(res => {
                        Toast({
                            message: '退出成功',
                            duration: 1200
                        })
                        this.$clearCookie('token')
                        this.$router.push('/login')
                    })

            }
        }

    }
</script>

<style scoped lang="scss">
    .setting {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #fff;
        > div {
            padding: 0 26px;
        }
        .top {
            width: 100%;
            img {
                width: 258px;
                height: 144px;
                margin: 78px auto 30px;
            }
            span {
                display: block;
                width: 100%;
                text-align: center;
                color: #999;
            }
        }
        .center {
            margin-top: 66px;
            ul {
                li {
                    height: 106px;
                    line-height: 106px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #eee;
                    span {
                        font-size: 30px;
                        color: #333;
                    }
                    i {
                        width: 10px;
                        height: 18px;
                        background: url("../../imgs/user/icon-arrow-right.png") no-repeat center /100%;
                    }
                }
            }
        }
        .bottom {
            margin-top: 40px;
            button {
                width: 100%;
                height: 98px;
                line-height: 98px;
                font-size: 32px;
                color: #fff;
                background-color: #FF4862;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                border-radius: 8px;
            }
        }
    }

</style>
