<template>
    <div class="likeRules">
        <p>1、邀请好友助力，邀请人数满足助力条件，则团长获得免单商品；</p>

        <p>2、参与帮忙助力的用户必须为平台新用户，一个用户只能帮忙参与一次助力。</p>

        <p>3、同一个用户在24小时内，对一件商品只能发起一次助力。助力失败后，可再次发起。</p>

        <p>4、同一件商品，单个用户多次助力成功情况下，只能免费获得一件。</p>

        <p>5、若平台发现用户刷单等欺骗行为，平台有权利终止其获得的免单商品；</p>

        <p>6、若用户助力开团失败，平台为用户提供随机金额的优惠券作为补偿；</p>

        <p>7、活动最终解释权（法律范围之内）归拼趣多所有；</p>
    </div>
</template>

<script>
    export default {
        name: "likeRules",
        data() {
            return {

            }
        },
        mounted() {
            document.title='助力规则'
        }
    }
</script>

<style scoped lang="scss">
    .likeRules {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        min-height: 100%;
        background-color: #fff;
        padding: 40px 78px;
        p {
            font-size: 28px;
            line-height: 40px;
            margin-bottom: 60px;
        }
    }
</style>
