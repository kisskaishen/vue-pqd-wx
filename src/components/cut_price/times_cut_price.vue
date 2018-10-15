<template>
    <div class="countDown">
        <span class="white_text" v-show="is_show1">砍价剩余时间&nbsp;</span>
        <span v-show="is_show1">{{time}}</span>
        <span class="white_text" v-show="is_show2">砍价结束</span>
        <span class="white_text" v-show="is_show3">恭喜您，砍价成功</span>
        <span class="white_text" v-show="is_show_fail1">砍价结束，优惠时间剩余</span>
        <span v-show="is_show_fail1">{{time}}</span>
        <span class="white_text" v-show="is_show_fail2">砍价失败，该商品已购买</span>
        <span class="white_text" v-show="is_show_fail3">砍价结束，优惠时间已过</span>
    </div>
</template>

<script>
    export default {
        props: ['endTime','status','order_sn','endTimeFail'],
        name: "countDown",
        data() {
            return {
                now: 0,
                is_show1:false,
                is_show2:false,
                is_show3:false,
                is_show_fail1:false,
                is_show_fail2:false,
                is_show_fail3:false,
                timer:null,
                failTimer:null,
                failNow:0,
            }
        },
        mounted() {
          console.log("重新刷新")
            let self = this;
            clearInterval(this.timer);
            this.timer = setInterval(function () {
                self.now = new Date().getTime() / 1000
            }, 1000);
            clearInterval(this.failTimer);
            this.failTimer = setInterval(function () {
                self.failNow = new Date().getTime() / 1000
            }, 1000);
        },
        computed: {
            time() {
                  if(this.status==3){
                      this.is_show1 = false;
                      this.is_show2 = false;
                      this.is_show3 = true;
                      // return '砍价成功'
                  }else if(this.status==2){
                      // return '砍价失败'
                      if(this.endTimeFail - this.now > 0){
                          //优惠时间显示
                            this.is_show_fail1 = true;
                            this.is_show_fail2 = false;
                            this.is_show_fail3 = false;
                            return this.format(this.endTimeFail - this.failNow)
                      }else if(this.endTimeFail - this.failNow <= 0){
                            this.is_show_fail1 = false;
                            this.is_show_fail2 = false;
                            this.is_show_fail3 = true;
                            // this.$emit("changeTime");
                            clearInterval(this.failTimer);
                      }
                  }else if(this.status==1){
                    // 砍价剩余时间
                    if (this.endTime - this.now > 0) {
                        this.is_show1 = true;
                        this.is_show2 = false;
                        this.is_show3 = false;
                        return this.format(this.endTime - this.now)
                    }else{
                        this.is_show1 = false;
                        this.$emit("changeTime");
                        clearInterval(this.timer);
                    }
                  }else if(this.status==4){
                    this.is_show_fail1 = false;
                    this.is_show_fail2 = true;
                    this.is_show_fail3 = false;
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
        span {
          color:yellow;
        }
        .white_text{
          color:#fff;
        }
    }
</style>
