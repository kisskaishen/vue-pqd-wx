<template>
    <span class="countDown">{{countDown}}</span>
</template>
<script>
    export default {
        props: ["futureTime", "currentTime"],
        data() {
            return {
                countDown: "",
                endTime: null,
                timer: null,
                serverTimer: null
            }
        },
        mounted() {
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    console.log('离开页面')
                } else {
                    this.$emit('getTime')
                }
            });
            clearInterval(this.serverTimer)
            this.serverTimer = setInterval(this.getServerTime, 10000)

            this.endTime = (parseInt(this.futureTime) - parseInt(this.currentTime)) * 100 //parseInt(new Date().getTime() / 1000)) * 100
            clearInterval(this.timer)
            this.timer = setInterval(this.ms, 10)
        },
        watch: {
            futureTime(val) {
                this.endTime = (parseInt(this.futureTime) - parseInt(this.currentTime)) * 100
                clearInterval(this.timer)
                this.timer = setInterval(this.ms, 10)
            },
            currentTime(val) {
                this.endTime = (parseInt(this.futureTime) - parseInt(this.currentTime)) * 100
            }
        },
        methods: {
            //时、分、秒、毫秒倒计时
            ms() {

                --this.endTime

                if (this.endTime > 0) {
                    // let d = Math.floor(this.endTime / 100 / 86400) //天

                    let h = Math.floor(this.endTime / 100 / 3600) //时

                    let m = Math.floor(this.endTime / 100 % 86400 % 3600 / 60); //分

                    let s = Math.floor(this.endTime / 100 % 60) //秒

                    let ms = Math.floor(this.endTime % 100).toString(); //毫秒

                    // d = d < 10 ? '0' + d : d;
                    h = h < 10 ? '0' + h : h;
                    m = m < 10 ? '0' + m : m;
                    s = s < 10 ? '0' + s : s;
                    ms = ms < 10 ? '0' + ms : ms;

                    this.countDown = `${h}:${m}:${s}.${ms}`

                } else {
                    clearInterval(this.timer)
                    clearInterval(this.serverTimer)
                    this.countDown = '00:00:00'
                    this.$emit('end')
                }
            },
            getServerTime() {
                this.$emit('getTime')
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>