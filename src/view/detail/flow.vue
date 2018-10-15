<template>
    <div class="flow">
        <div class="top">
            <img src="../../imgs/detail/icon-detail-flow.png" alt="">
            <ul>
                <li>选择心仪商品</li>
                <li>支付开团或参团</li>
                <li>邀请好友参团，拼团</li>
                <li>团满发货，不满退款</li>
            </ul>
        </div>
        <div class="text">
            <div>
                <p>开团方式</p>
                <span>选择你喜欢的商品支付开团成功后，可分享商品给好友，或通过参团码参团</span>
            </div>
            <div>
                <p>参团方式</p>
                <span>进入到朋友分享的页面，点击“立即参团”的按钮，付款后即可成功，也可以通过参团人分享的参团码来进行拼团</span>
            </div>
            <div>
                <p>拼团失败</p>
                <span>团长开团达到24小时没有完成指定的拼团人数，则拼团失败，将退还支付款项</span>
            </div>
            <div>
                <p>退款</p>
                <span>拼团失败的款项将在1~2个工作日内退还至原支付平台（原路径返回），具体到账时间以（微信、支付宝、QQ支付）为准，请留意查收</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "flow"
    }
</script>

<style scoped lang="scss">
    .flow {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        min-height: 100%;
        padding: 30px 48px;
        background-color: #fff;
        .top {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 24px 0 30px;
            border-bottom: 1px solid #eee;
            img {
                width: 86px;
                height: 464px;
                margin-right: 20px;
            }
            ul {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                align-self: stretch;
                padding: 12px 0;
                li {
                    font-size: 24px;
                    color: #333;
                }
            }
        }
        .text {
            padding: 10px 0;
            > div {
                p {
                    color: #333;
                    font-size: 28px;
                    font-weight: bold;
                    margin: 30px 0 20px;
                }
                span {
                    color: #4c4c4c;
                    font-size: 24px;
                    line-height: 40px;
                }
            }
        }
    }
</style>
