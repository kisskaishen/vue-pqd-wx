<template>
    <div class="error">
        <div class="errorDiv">
            <img src="../../imgs/error/icon-404.png" alt="">
            <p>您访问的页面不见了</p>
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
            width: 398px;
            margin: 176px auto 0;
            img {
                width: 398px;
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
                width: 310px;
                height: 70px;
                line-height: 70px;
                color: #ffff;
                font-size: 28px;
                background: linear-gradient(to right, #FF8484, #FF4862);
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                border-radius: 8px;
                margin: 0 auto;
            }
        }
    }
</style>
