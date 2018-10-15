<template>
    <div class="countDown">
        <span>{{time}}</span>
    </div>
</template>

<script>
    export default {
        props: ['endTime','status'],
        name: "countDown",
        data() {
            return {
                now: 0,
                timer:null
            }
        },
        mounted() {
            let self = this;
                clearInterval(this.timer);
                    self.now = new Date().getTime() / 1000
            this.timer = setInterval(function () {
                self.now = new Date().getTime() / 1000
            }, 1000);
        },
        computed: {
            time() {
                if(this.status==2){
                  if (this.endTime - this.now > 0) {
                      return '购买剩余时间'+' ' + this.format(this.endTime - this.now)
                  } else {
                      clearInterval(this.timer);
                      return ""
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
      margin-top:5px;
        span {
            color: #666;
        }
    }
</style>
