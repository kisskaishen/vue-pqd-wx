<template>
    <div class="paySuccess">
        <div class="img">
            <img src="../../imgs/pay/icon-pay-success.png" alt="">
            <p>支付成功</p>
            <span>商家正在努力发货，请耐心等待！</span>
            <router-link :to="'/order/detail?order_sn='+$route.query.order_sn">
                <span>查看订单详情</span>
                <i></i>
            </router-link>
            <i class="home" @click="goHome"></i>
        </div>

        <div class="goodsList">
            <b>
                <i></i>
                <span>看了又看</span>
            </b>
            <div v-infinite-scroll="loadMore"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="100">
                <goods-squared :goods="listData"></goods-squared>
            </div>
        </div>

    </div>
</template>

<script>
    import GoodsSquared from '../../components/index/goodsSquared'

    export default {
        name: "paySuccess",
        data() {
            return {
                listData: [],
                page: 1,
                loading: false,

            }
        },
        components: {GoodsSquared},
        methods: {
            goHome() {
                this.$router.push('/index')
            },
            // 获取列表
            getList(page) {
                this.$post('search/search', {
                    page: page
                })
                    .then((res) => {
                        if (res.list == '') {
                            Toast('您已拉到底了！')
                        } else {
                            if (page == '1') {
                                this.listData = res.list
                            } else {
                                this.listData = this.listData.concat(res.list)
                            }
                        }
                    })
            },
            loadMore() {
                this.loading = true;
                this.page++;
                this.getList(this.page);
                this.loading = false;
            }
        }
    }
</script>

<style scoped lang="scss">
    .paySuccess {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        background-color: #fff;
        > div {
            padding: 0 26px;
        }
        .img {
            position: relative;
            img {
                width: 304px;
                height: 218px;
                margin: 48px auto 24px;
            }
            p {
                text-align: center;
                font-size: 36px;
                color: #333;
            }
            & > span {
                display: block;
                width: 100%;
                font-size: 28px;
                color: #999;
                text-align: center;
                margin-top: 30px;
            }
            a {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 40px;
                span {
                    color: #5BC1D7;
                    font-size: 28px;
                    margin-right: 20px;
                }
                i {
                    width: 10px;
                    height: 18px;
                    background: url("../../imgs/pay/icon-arrow-right-color1.png") no-repeat center /100%;
                }
            }
            .home {
                position: absolute;
                right: 26px;
                top: 0;
                width: 74px;
                height: 74px;
                background: url("../../imgs/pay/icon-home.png") no-repeat center /100%;
            }
        }
        .goodsList {
            margin-top: 80px;
            b {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-size: 30px;
                i {
                    width: 4px;
                    height: 16px;
                    background: rgba(255, 70, 78, 1);
                    border-radius: 2px;
                    margin-right: 16px;
                }
            }
            .list {
                padding: 0;
            }
        }
    }
</style>
