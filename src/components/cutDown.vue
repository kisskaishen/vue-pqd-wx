<template>
    <div class="countDown">
        <p>{{time}}</p>
    </div>
</template>

<script>
    export default {
        props: ['endTime','status'],
        name: "countDown",
        data() {
            return {
                now: 0,
                cutPriceTimer:null,
            }
        },
        mounted() {
            let self = this;
            clearInterval(this.cutPriceTimer);
            self.now = new Date().getTime() / 1000
            this.cutPriceTimer = setInterval(function () {
                self.now = new Date().getTime() / 1000
            }, 1000);
        },
        computed: {
            time() {
                if(this.status==1){
                  if (this.endTime - this.now > 0) {
                      return '剩余' + this.format(this.endTime - this.now)
                  } else {
                      clearInterval(this.cutPriceTimer);
                      return "砍价结束"
                  }
                }
            }
        },
        methods: {
            format(time) {
                let day = Math.floor(time / 86400)
                let hour = Math.floor(time / 3600 % 24)
                let min = Math.floor(time / 60 % 60)
                let sec = Math.floor(time % 60)
                day = day < 10 ? "0" + day : day;
                hour = hour < 10 ? "0" + hour : hour;
                min = min < 10 ? "0" + min : min;
                sec = sec < 10 ? "0" + sec : sec;
                if (day == '00') {
                    return hour + ':' + min + ':' + sec;
                } else {
                    return day + ':' + hour + ':' + min + ':' + sec;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .countDown {
        p {
            color: #666;
            padding:0 10px;
        }
    }
</style>
