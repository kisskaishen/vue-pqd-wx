<template>
    <div class="countDown">
        <div class="time"><span>{{str}}</span></div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        name: "countDown",
        props: ['endTime'],
        data() {
            return {
                str: '00时00分'
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
                    this.str = d + '天' + h + '时' + m + '分' + s + '秒';
                } else {
                    this.str = '00时00分'
                }
            }, 1000)
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
    .countDown {
        .time {
            color: #FF4862;
        }
    }
</style>
