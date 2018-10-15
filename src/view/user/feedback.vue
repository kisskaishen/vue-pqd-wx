<template>
    <div class="feedback">
        <div class="tip">
            <b>
                <i></i>
                <span>请选择反馈问题的类型</span>
            </b>
        </div>
        <div class="list">
            <ul>
                <li v-for="item,index in list">
                    <router-link :to="'feedbackSubmit?id='+item.id">
                        <span>{{item.title}}</span>
                        <i></i>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "feedback",
        data() {
            return {
                list:[]
            }
        },
        mounted() {
            this.getTypeList()
        },
        methods:{
            getTypeList() {
                this.$post('common/feedbackType',{})
                    .then(res=>{
                        this.list = res
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    .feedback {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #fff;
        > div {
            padding: 0 26px;
        }
        .tip {
            margin-top: 40px;
            b {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                i {
                    width:4px;
                    height:16px;
                    background:rgba(255,70,78,1);
                    border-radius:2px;
                    margin-right: 16px;
                }
                span {
                    font-size: 30px;
                    color: #4D4D4D;
                }
            }

        }
        .list {
            ul {
                margin-top: 40px;
                li {
                    a {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height: 106px;
                        line-height: 106px;
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
        }
    }
</style>
