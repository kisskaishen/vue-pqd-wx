<template>
    <div class="reviewSuccess">
        <img src="../../imgs/review/icon-thx.png" alt="拼趣多优惠券" class="img1">
        <p class="fz30 c999">打开礼包将有大几率获得神秘大礼</p>
        <img src="../../imgs/review/icon-thx-red.png" alt="拼趣多优惠券" class="img2">
        <router-link to="/order/reviewSuccessCoupon" class="brs8 bgff4862 fz28 cfff">打开礼包</router-link>
    </div>
</template>

<script>
    export default {
        name: "reviewSuccess"
    }
</script>

<style scoped lang="scss">
    .reviewSuccess {
        .img1 {
            width: 356px;
            height: 56px;
            margin: 98px auto 48px;
        }
        p {
            text-align: center;
        }
        .img2 {
            width: 512px;
            height: 334px;
            margin: 136px auto 50px;
        }
        a {
            display: block;
            width: 310px;
            height: 70px;
            line-height: 70px;
            margin: 0 auto;
        }
    }
</style>
