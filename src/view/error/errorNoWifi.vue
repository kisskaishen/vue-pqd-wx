<template>
    <div class="error">
        <div class="errorDiv">
            <img src="../../imgs/error/icon-no-wifi.png" alt="">
            <p>网络连接断开</p>
            <router-link to="/index">返回首页</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "errorDetail"
    }
</script>

<style scoped lang="scss">
    .error {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        min-height: 100%;
        background-color: #fff;
        .errorDiv {
            width: 310px;
            margin: 176px auto 0;
            img {
                width: 180px;
                margin: 0 auto;
            }
            p {
                text-align: center;
                color: #999;
                font-size: 28px;
                margin: 48px 0;
            }
            a {
                display: block;
                width: 100%;
                height: 70px;
                line-height: 70px;
                color: #ffff;
                font-size: 28px;
                background: linear-gradient(to right, #FF8484, #FF4862);
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                border-radius: 8px;
            }
        }
    }
</style>
