<template>
    <div>
        <div class="countDown" v-if="isShow">
            <span class="text">剩余</span>
            <span>{{day}}</span>
            <span class="slotDiv">天</span>
            <span>{{hour}}</span>
            <span class="slotDiv">时</span>
            <span>{{min}}</span>
            <span class="slotDiv">分</span>
            <span>{{sec}}</span>
            <span class="slotDiv">秒</span>
        </div>
        <div v-if="!isShow">
            已结束
        </div>
    </div>
</template>

<script>
    export default {
        props: ['endTime'],
        name: "countDown",
        data() {
            return {
                now: '',
                day: '00',
                hour: '00',
                min: '00',
                sec: '00',
                isShow: true
            }
        },
        mounted() {
            let self = this;
            let block = setInterval(function () {
                if ((self.endTime * 1000 - self.now) > 0) {
                    this.isShow = true
                    self.now = parseInt(new Date().getTime())
                    self.format((self.endTime * 1000 - self.now) / 1000)
                } else {
                    this.isShow = false
                    clearInterval(block)
                    self.day = '00'
                    self.hour = '00'
                    self.min = '00'
                    self.sec = '00'
                }
            }, 1000);


        },
        methods: {
            format(time) {
                let self = this;
                self.day = Math.floor(time / 86400)
                self.hour = Math.floor(time / 3600 % 24)
                self.min = Math.floor(time / 60 % 60)
                self.sec = Math.floor(time % 60)
                self.day = self.day < 10 ? "0" + self.day : self.day;
                self.hour = self.hour < 10 ? "0" + self.hour : self.hour;
                self.min = self.min < 10 ? "0" + self.min : self.min;
                self.sec = self.sec < 10 ? "0" + self.sec : self.sec;
            }
        }
    }
</script>

<style scoped lang="scss">
    .countDown {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            margin-right: 10px;
            background-color: #FF4862;
            color: #fff;
            width: 50px;
            height: 50px;
            -webkit-border-radius: 6px;
            -moz-border-radius: 6px;
            border-radius: 6px;
            text-align: center;
            line-height: 50px;
            font-size: 28px;
            margin: 0 4px;
        }
        .text {
            background-color: transparent;
            color: #333;
            width: auto;
        }
        .slotDiv {
            color: #333;
            background-color: transparent;
        }
    }
</style>
