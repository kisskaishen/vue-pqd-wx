<template>
    <div class="countDown">
        <div class="time"><span>{{str}}</span>
            <button @click="getCoupon">待领</button>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        name: "countDown",
        props: ['endTime', 'index'],
        data() {
            return {
                str: '00:00:00:00'
            }
        },
        mounted() {
            let endTime = this.endTime - parseInt(new Date().getTime() / 1000)
            let d = 0;
            let h = 23;
            let m = 59;
            let s = 59;
            setInterval(() => {
                endTime--;
                if (endTime > 0) {
                    d = Math.floor(endTime / 86400);
                    h = Math.floor(endTime / 3600 % 24);
                    m = Math.floor(endTime % 3600 / 60);
                    s = Math.floor(endTime % 60);
                    d = d < 10 ? '0' + d : d;
                    h = h < 10 ? '0' + h : h;
                    m = m < 10 ? '0' + m : m;
                    s = s < 10 ? '0' + s : s;
                    this.str = d + ':' + h + ':' + m + ':' + s;
                } else {
                    this.str = '00:00:00:00'
                }
            }, 1000)
        },
        methods:{
            getCoupon() {
                Toast({
                    message:'耐心点，还没有开放领取哦',
                    duration:1400
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .countDown {
        margin-top: 10px;
        div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            align-content: center;
            box-sizing: content-box;
            -webkit-border-radius: 40px;
            -moz-border-radius: 40px;
            border-radius: 40px;
            border: 2px solid #105cf6;
            span {
                color: #666;
                padding: 0 10px;
            }
            button {
                background-color: #105cf6;
                color: #fff;
                padding: 0 10px;
                -webkit-border-radius: 40px;
                -moz-border-radius: 40px;
                border-radius: 40px;
            }
        }
    }
</style>
