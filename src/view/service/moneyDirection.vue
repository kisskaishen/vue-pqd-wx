<template>
    <div class="moneyDirection">
        <div class="moneyInfo">
            <div>
                <label>退款金额</label>
                <span class="red">￥0.01</span>
            </div>
            <div>
                <label>退款账户</label>
                <span>微信支付</span>
            </div>
        </div>
        <div class="moneyList">
            <ul>
                <li>
                    <p>
                        <label>同意退款</label>
                        <span>2018-05-22-05:03:24</span>
                    </p>
                </li>
                <li>
                    <p>
                        <label>微信支付受理退款</label>
                        <span>2018-05-22-05:03:24</span>
                    </p>
                    <p style="color: #888;">退款会有一定延迟，用他零钱支付的退款20分钟内到账，请耐心等候</p>
                </li>
                <li>
                    <p>
                        <label>退款成功</label>
                        <span>2018-05-22-05:03:24</span>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "moneyDirection"
    }
</script>

<style scoped lang="scss">
    .moneyDirection {
        >div {
            padding: 20px;
            background-color: #fff;
            margin-bottom: 20px;
        }
        .moneyInfo {
            > div {
                padding: 4px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
        .moneyList {
            ul {
                li {
                    padding: 12px 0;
                    p {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                }
            }
        }
    }
</style>
