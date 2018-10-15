<!--&lt;!&ndash; &lt;!&ndash; &lt;!&ndash; <template>-->
    <!--<div class="wuyi">-->
        <!--<div class="bg"></div>-->
        <!--<div class="content">-->
            <!--<div class="countDown">-->
                <!--<span>{{countDownText}}：</span>-->
                <!--<div>-->
                    <!--<span>{{day}}</span>天-->
                    <!--<span>{{hour}}</span>时-->
                    <!--<span>{{min}}</span>分-->
                    <!--<span>{{sec}}</span>秒-->
                <!--</div>-->
                <!--<div class="countDownBg"></div>-->

            <!--</div>-->
            <!--<div class="ruleDiv"><div></div><router-link to="/activity/rules">活动规则</router-link></div>-->
            <!--<div class="redDiv">-->
                <!--<div class="goBtn" @click="goRed"></div>-->
            <!--</div>-->
            <!--<div class="timeSaleDiv">-->
                <!--<div class="title">-->
                    <!--&lt;!&ndash;限时秒杀&ndash;&gt;-->
                    <!--<div class="titleCenter">-->
                        <!--<hr>-->
                        <!--<img src="" alt="">-->
                        <!--<hr>-->
                    <!--</div>-->
                    <!--<router-link :to="'/seckill?id='+msId+'&isweixin='+isweixin"  class="titleMore">更多秒杀</router-link>-->
                <!--</div>-->
                <!--<div class="sale">-->
                    <!--<div class="saleTitle">-->
                        <!--<ul>-->
                            <!--<li v-for="item,index in msData" :class="index == currentIndex ?'saleTitleActive':''" @click="indexChange(item,index)">-->
                                <!--<b>{{item.time_name}}</b>-->
                                <!--<span v-if="item.start_time-new Date().getTime()/1000<0&&item.end_time-new Date().getTime()/1000>0">抢购中</span>-->
                                <!--<span v-else-if="item.start_time-new Date().getTime()/1000>0">即将开抢</span>-->
                                <!--<span v-else-if="item.end_time-new Date().getTime()/1000<0">已结束</span>-->
                            <!--</li>-->
                        <!--</ul>-->
                    <!--</div>-->
                    <!--<div class="saleList">-->
                        <!--<ul>-->
                            <!--<li v-for="item,index in msData[msDataIndex].goods_list">-->
                                <!--<a :href="'../goods_detail.html?goods_id='+item.goods_id+'&activ_type='+item.activ_type" v-if="isweixin">-->
                                    <!--<img :src="item.list_img" alt="">-->
                                    <!--<b>{{item.goods_name}}</b>-->
                                    <!--<p>-->
                                        <!--<b>¥{{item.prom_price}}</b>-->
                                        <!--<span>¥{{item.market_price}}</span>-->
                                    <!--</p>-->
                                <!--</a>-->
                                <!--<div @click="showAppdetail(item)" v-else>-->
                                    <!--<img :src="item.list_img" alt="">-->
                                    <!--<b>{{item.goods_name}}</b>-->
                                    <!--<p>-->
                                        <!--<b>¥{{item.prom_price}}</b>-->
                                        <!--<span>¥{{item.market_price}}</span>-->
                                    <!--</p>-->
                                <!--</div>-->
                            <!--</li>-->
                        <!--</ul>-->
                        <!--<div class="shadowSale"></div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="goodsDiv" v-for="jpitem,jpindex in jpData">-->
                <!--<div class="goodsList">-->
                    <!--<div class="goods">-->
                        <!--<router-link :to="'moreList?id='+jpitem.id+'&isweixin='+isweixin">-->
                            <!--<img :src="jpitem.logo" alt="">-->
                        <!--</router-link>-->
                    <!--</div>-->
                    <!--<div class="goods" v-for="item,index in jpitem.goods_list">-->
                        <!--<a :href="'../goods_detail.html?goods_id='+item.goods_id" v-if="isweixin">-->
                            <!--<img :src="item.list_img" alt="">-->
                            <!--<p>-->
                                <!--<b>¥{{item.prom_price}}</b>-->
                                <!--<span>¥{{item.market_price}}</span>-->
                            <!--</p>-->
                        <!--</a>-->
                        <!--<div @click="showAppdetail(item)" v-else>-->
                            <!--<img :src="item.list_img" alt="">-->
                            <!--<p>-->
                                <!--<b>¥{{item.prom_price}}</b>-->
                                <!--<span>¥{{item.market_price}}</span>-->
                            <!--</p>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="redShowBg" v-if="showRedDiv || openRedShow"></div>-->
            <!--<div class="redShowDiv" >-->
                <!--<div :class="['redPic',rotateClass?'rotation':'']" v-if="showRedDiv" @click="openRed"></div>-->
                <!--<div class="redShowPic" v-if="openRedShow">-->
                    <!--<div class="redContBg"></div>-->
                    <!--<div class="redCont">-->
                        <!--<b>恭喜您获得{{redInfoList.length}}个红包</b>-->
                        <!--<p>红包已放入"我的-优惠券"</p>-->
                        <!--<div class="couponDiv">-->
                            <!--<div class="couponList" v-for="item,index in redInfoList" :key="item.store_id">-->
                                <!--<div class="coupon">-->
                                    <!--<img :src="item.store_info.store_logo" alt="">-->
                                    <!--<div>-->
                                        <!--<p>有效期至{{item.end_day}}</p>-->
                                        <!--<span>{{item.condition}}</span>-->
                                    <!--</div>-->
                                    <!--<b><span>¥</span>{{item.money|intMoney}}</b>-->
                                <!--</div>-->
                                <!--<div class="couponTip">-->
                                    <!--<span>剩余7天</span>-->
                                    <!--<span v-if="item.store_id!='0'">商家优惠券-商家</span>-->
                                    <!--<span v-else>平台优惠券-平台</span>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="redBottom">-->
                        <!--<i @click="redUse">立即使用</i>-->
                    <!--</div>-->
                    <!--<div class="redLittle redLittle1"></div>-->
                    <!--<div class="redLittle redLittle2"></div>-->
                    <!--<div class="redLittle redLittle3"></div>-->
                    <!--<div class="redLittle redLittle4"></div>-->
                <!--</div>-->
                <!--<div class="close" @click="closeRedShow" v-if="showRedDiv || openRedShow"></div>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->

    <!--export default {-->
        <!--name: "index",-->
        <!--data() {-->
            <!--return {-->
                <!--showRedDiv:false,       // 控制红包的隐藏显示-->
                <!--openRedShow:false,      // 打开红包的隐藏显示-->
                <!--rotateClass:false,-->

                <!--redInfoList:[],-->

                <!--currentIndex:'0',       // 点击时间选择得到当前点击的index-->
                <!--// 倒计时-->
                <!--newTime:'',-->
                <!--endTime:'',-->
                <!--countDownTime:'',           // 页面抬头倒计时-->
                <!--countDownText:'距离活动开始还有',-->
                <!--day:'',-->
                <!--hour:'',-->
                <!--min:'',-->
                <!--sec:'',-->
                <!--// 秒杀数据-->
                <!--msData:[{id:'',goods_list:[]}],-->
                <!--msId:'',-->
                <!--msDataIndex:'0',-->
                <!--// 精品数据-->
                <!--jpData:[{id:'',goods_list:[]}],-->

                <!--// app信息-->
                <!--userInfoType:'',-->
                <!--terminal:'',-->
                <!--user_id:'' || getCookie('user_id'),-->
                <!--isweixin:true-->
            <!--}-->
        <!--},-->
        <!--mounted() {-->
            <!--let self = this-->
            <!--this.http('post','/Activ/index_51',{},function(res){-->
                <!--self.msData = res.result.category_sec-->
                <!--self.jpData = res.result.category_pick-->
                <!--self.msId = self.msData[0].id-->
                <!--self.endTime = res.result.activ_time.start_time - res.result.now_time>0?res.result.activ_time.start_time : res.result.activ_time.end_time-->
                <!--self.countDownText = res.result.activ_time.start_time - res.result.now_time>0?'距离活动开始还有':'距离活动结束还有'-->
                <!--self.countTimeFn(self.endTime)          // 初始化调用时间倒计时-->
            <!--})-->
            <!--this.isLogin()-->
        <!--},-->
        <!--filters:{-->
            <!--intMoney(val) {-->
                <!--if (parseInt(val) == val) {-->
                    <!--return parseInt(val)-->
                <!--}-->
            <!--}-->
        <!--},-->
        <!--methods:{-->
            <!--// app跳转到活动页面时先判断是否登陆-->
            <!--isLogin() {-->
                <!--let self_ = this-->
                <!--this.isWeiXin()-->
                <!--if(this.isweixin){-->
                    <!--// alert('这里是微信')-->
                <!--}else {-->
                    <!--let u = navigator.userAgent-->
                    <!--if (u.indexOf('iPhone') > -1 ) {-->
                        <!--self_.userInfoType = getAppUserInfo().terminal-->
                        <!--self_.terminal = getAppUserInfo().terminal-->
                        <!--self_.user_id = getAppUserInfo().userId-->
                        <!--if (!self_.user_id) {-->
                            <!--showAppLoginView()-->
                        <!--}-->
                    <!--} else {-->
                        <!--self_.userInfoType = JSON.parse(webview.getAppUserInfo()).terminal-->
                        <!--self_.terminal = JSON.parse(webview.getAppUserInfo()).terminal-->
                        <!--self_.user_id = JSON.parse(webview.getAppUserInfo()).userId-->
                        <!--if (!self_.user_id) {-->
                            <!--webview.showAppLoginView()-->
                        <!--}-->
                    <!--}-->
                <!--}-->
            <!--},-->
            <!--// 判断是否是微信-->
            <!--isWeiXin() {-->
                <!--var ua = window.navigator.userAgent.toLowerCase();-->
                <!--if (ua.match(/MicroMessenger/i) == 'micromessenger'){-->
                    <!--// alert('检测是微信')-->
                    <!--this.isweixin = true-->
                    <!--return true;-->
                <!--} else {-->
                    <!--// alert('检测不是微信')-->
                    <!--this.isweixin = false-->
                    <!--return false;-->
                <!--}-->
            <!--},-->
            <!--// 在h5页面跳转app商品详情-->
            <!--showAppdetail(val) {-->
                <!--if (this.userInfoType == 'i') {-->
                    <!--showGoodsDetails(val.goods_id,val.activ_type)-->
                <!--} else {-->
                    <!--webview.showGoodsDetails(val.goods_id,val.activ_type)-->
                <!--}-->
            <!--},-->
            <!--// 倒计时函数-->
            <!--countTimeFn(timestamp) {-->
                <!--let self = this-->
                <!--let timer = setInterval(()=>{-->
                    <!--let t = timestamp - new Date().getTime() / 1000-->
                    <!--if (t > 0) {-->
                        <!--self.day = Math.floor(t/86400);-->
                        <!--self.hour=Math.floor((t/3600)%24);-->
                        <!--self.min=Math.floor((t/60)%60);-->
                        <!--self.sec=Math.floor((t/1)%60);-->
                        <!--self.hour = self.hour < 10 ? "0" + self.hour : self.hour;-->
                        <!--self.min = self.min < 10 ? "0" + self.min : self.min;-->
                        <!--self.sec = self.sec < 10 ? "0" + self.sec : self.sec;-->
                    <!--}else {-->
                        <!--clearInterval(timer)-->
                        <!--self.day = '00';-->
                        <!--self.hour='00';-->
                        <!--self.min='00';-->
                        <!--self.sec='00';-->
                    <!--}-->
                <!--},1000)-->
            <!--},-->
            <!--// 显示领取红包弹框-->
            <!--goRed() {-->
                <!--this.showRedDiv = true-->

            <!--},-->
            <!--// 关闭红包弹框-->
            <!--closeRedShow() {-->
                <!--this.showRedDiv = false-->
                <!--this.openRedShow = false-->
            <!--},-->
            <!--// 开红包-->
            <!--openRed() {-->
                <!--let self = this-->
                <!--this.http('post','Coupon/couponList_blend',{-->
                    <!--user_id:self.user_id-->
                <!--},function(res){-->
                    <!--if (res.status == '1') {-->
                        <!--self.redInfoList = res.result.list-->
                        <!--self.rotateClass = true-->
                        <!--setTimeout(()=>{-->
                            <!--self.showRedDiv = false-->
                            <!--self.openRedShow = true-->
                            <!--self.rotateClass = false-->
                            <!--myToast(res.msg)-->
                            <!--if (res.msg == '今天已经领取过') {-->
                                <!--setTimeout(()=>{-->
                                    <!--self.$router.push('/myCoupon')-->
                                <!--},1200)-->
                            <!--}-->
                        <!--},1000)-->


                    <!--}-->

                <!--})-->

            <!--},-->
            <!--// 使用红包-->
            <!--redUse() {-->
                <!--this.openRedShow = false-->
            <!--},-->
            <!--// 限时抢购时间选择-->
            <!--indexChange(val,index) {-->
                <!--let self = this-->
                <!--self.currentIndex = index-->
                <!--self.msDataIndex = index-->

                <!--self.msId = val.id-->

            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->

<!--<style scoped lang="scss">-->
    <!--.wuyi {-->
        <!--position: relative;-->
        <!--width: 100%;-->
        <!--/*height: 100%;*/-->
        <!--overflow: scroll;-->
        <!--background-color: #270156;-->
        <!--.bg {-->
            <!--position: absolute;-->
            <!--left: 0;-->
            <!--top: 0;-->
            <!--bottom: 0;-->
            <!--right: 0;-->
            <!--margin: auto;-->
            <!--/*width: 100%;*/-->
            <!--/*height: 100%;*/-->
            <!--background: red;-->
        <!--}-->
        <!--.content {-->
            <!--position: relative;-->
            <!--width: 100%;-->
            <!--/*height: 100%;*/-->
            <!--.countDown {-->
                <!--position: relative;-->
                <!--width: 100%;-->
                <!--height: 60px;-->
                <!--display: flex;-->
                <!--padding: 0 20px;-->
                <!--justify-content: space-between;-->
                <!--align-items: center;-->
                <!--.countDownBg {-->
                    <!--position: absolute;-->
                    <!--top: 0;-->
                    <!--left: 0;-->
                    <!--bottom: 0;-->
                    <!--right: 0;-->
                    <!--margin: auto;-->
                    <!--background-color:#BB85FF;-->
                    <!--opacity: .2;;-->
                <!--}-->
                <!--span {-->
                    <!--color: #FFAEAE;-->
                    <!--font-size: 26px;-->
                <!--}-->
                <!--div {-->
                    <!--color: #FFAEAE;-->
                    <!--font-size: 24px;-->
                    <!--text-align: center;-->

                    <!--span {-->
                        <!--display: inline-block;-->
                        <!--width: 40px;-->
                        <!--height: 40px;-->
                        <!--color: #fff;-->
                        <!--margin: 0 14px 0 10px;-->
                        <!-- -webkit-border-radius: 4px;-->
                        <!-- -moz-border-radius: 4px;-->
                        <!--border-radius: 4px;-->
                        <!--background-color: #4E0EA3;-->
                    <!--}-->
                <!--}-->
            <!--}-->
            <!--.ruleDiv {-->
                <!--position: absolute;-->
                <!--right: 0;-->
                <!--top: 156px;-->
                <!--width: 128px;-->
                <!--height: 44px;-->
                <!--&gt; div {-->
                    <!--position: absolute;-->
                    <!--left: 0;-->
                    <!--right: 0;-->
                    <!--bottom: 0;-->
                    <!--top: 0;-->
                    <!--margin: auto;-->
                    <!--background-color: #BB85FF;-->
                    <!--opacity: .2;-->
                    <!-- -webkit-border-radius: 44px 0 0 44px;-->
                    <!-- -moz-border-radius: 44px 0 0 44px;-->
                    <!--border-radius: 44px 0 0 44px;-->
                <!--}-->
                <!--a {-->
                    <!--display: block;-->
                    <!--position: absolute;-->
                    <!--right: 0;-->
                    <!--width: 128px;-->
                    <!--height: 44px;-->
                    <!--line-height: 44px;-->
                    <!--font-size: 24px;-->
                    <!--color: #fff;-->
                    <!--text-align: center;-->

                <!--}-->

            <!--}-->
            <!--.redDiv {-->
                <!--position: relative;-->
                <!--margin: 600px auto 0;-->
                <!--width: 576px;-->
                <!--height: 108px;-->
                <!--.goBtn {-->
                    <!--position: absolute;-->
                    <!--right: 16px;-->
                    <!--top: 10px;-->
                    <!--width: 76px;-->
                    <!--height: 76px;-->
                <!--}-->
            <!--}-->
            <!--.timeSaleDiv {-->
                <!--position: relative;-->
                <!--width: 710px;-->
                <!--margin: 40px auto;-->
                <!--.title {-->
                    <!--width: 100%;-->
                    <!--height: 80px;-->
                    <!--background-color: #4E07A9;-->
                    <!--display: flex;-->
                    <!--justify-content: center;-->
                    <!--align-items: center;-->
                    <!--.titleCenter {-->
                        <!--display: flex;-->
                        <!--align-items: center;-->
                        <!--width: 308px;-->
                        <!--margin: 0 auto;-->
                        <!--hr {-->
                            <!--margin: 0;-->
                            <!--width: 54px;-->
                            <!--border: 2px solid #FFD540;-->
                        <!--}-->
                        <!--img {-->
                            <!--width: 160px;-->
                            <!--height: 40px;-->
                            <!--margin: 0 40px;-->
                        <!--}-->
                    <!--}-->
                <!--}-->
                <!--.titleMore {-->
                    <!--position: absolute;-->
                    <!--right: 36px;-->
                    <!--width: 120px;-->
                    <!--height: 40px;-->
                    <!--line-height: 40px;-->
                    <!--border-radius: 20px;-->
                    <!--color: #FFD540;-->
                    <!--font-size: 22px;-->
                    <!--text-align: center;-->
                    <!--background-color: #7139BA;-->
                <!--}-->
            <!--}-->
            <!--.sale {-->
                <!--width: 100%;-->
                <!--.saleTitle {-->
                    <!--ul {-->
                        <!--display: flex;-->
                        <!--justify-content: flex-start;-->
                        <!--align-items: center;-->
                        <!--overflow: scroll;-->
                        <!--width: 100%;-->
                        <!--background-color: #7A21EB;-->
                        <!--li {-->
                            <!--display: flex;-->
                            <!--flex-direction: column;-->
                            <!--justify-content: center;-->
                            <!--align-items: center;-->
                            <!--min-width: 142px;-->
                            <!--height: 84px;-->
                            <!--b {-->
                                <!--font-size: 36px;-->
                                <!--color: #fff;-->
                            <!--}-->
                            <!--span {-->
                                <!--color: #4E07A9;-->
                                <!--font-size: 20px;-->
                            <!--}-->
                        <!--}-->
                        <!--.saleTitleActive {-->
                            <!--background-color: #8C32FF;-->
                            <!--span {-->
                                <!--color: #FF651A;-->
                                <!--font-size: 20px;-->
                                <!--line-height: 24px;-->
                                <!--padding: 0 8px;-->
                                <!--background-color: #FFD540;-->
                                <!-- -webkit-border-radius: 12px;-->
                                <!-- -moz-border-radius: 12px;-->
                                <!--border-radius: 12px;-->
                            <!--}-->
                        <!--}-->
                    <!--}-->
                <!--}-->
                <!--.saleList {-->
                    <!--position: relative;-->
                    <!--background-color: #8C32FF;-->
                    <!--width: 100%;-->
                    <!--ul {-->
                        <!--display: flex;-->
                        <!--justify-content: flex-start;-->
                        <!--align-items: center;-->
                        <!--overflow: scroll;-->
                        <!--width: 670px;-->
                        <!--padding: 20px 0;-->
                        <!--margin: 0 auto;-->
                        <!--li {-->
                            <!--display: flex;-->
                            <!--flex-direction: column;-->
                            <!--justify-content: center;-->
                            <!--align-items: center;-->
                            <!--margin-right: 20px;-->
                            <!--&gt;div,a {-->
                                <!--width: 188px;-->
                                <!--height: 272px;-->
                                <!--background-color: #fff;-->
                                <!--border: 4px solid #FF6D66;-->
                                <!--img {-->
                                    <!--display: block;-->
                                    <!--width: 180px;-->
                                    <!--height: 180px;-->
                                <!--}-->
                                <!--&gt; b {-->
                                    <!--display: block;-->
                                    <!--width: 180px;-->
                                    <!--overflow: hidden;-->
                                    <!--text-overflow: ellipsis;-->
                                    <!--white-space: nowrap;-->
                                    <!--font-size: 24px;-->
                                    <!--padding: 4px 0 4px 8px;-->

                                <!--}-->
                                <!--p {-->
                                    <!--display: flex;-->
                                    <!--align-items: center;-->
                                    <!--justify-content: flex-start;-->
                                    <!--width: 180px;-->
                                    <!--overflow: hidden;-->
                                    <!--text-overflow: ellipsis;-->
                                    <!--white-space: nowrap;-->
                                    <!--b {-->
                                        <!--color: #FF4E00;-->
                                        <!--margin-right: 8px;-->
                                        <!--padding-left: 8px;-->
                                        <!--font-size: 20px;-->

                                    <!--}-->
                                    <!--span {-->
                                        <!--text-decoration: line-through;-->
                                        <!--color: #999;-->
                                        <!--font-size: 20px;-->
                                    <!--}-->
                                <!--}-->
                            <!--}-->
                        <!--}-->
                    <!--}-->
                    <!--.shadowSale {-->
                        <!--position: absolute;-->
                        <!--right: 0;-->
                        <!--top: 0;-->
                        <!--width: 60px;-->
                        <!--height: 100%;-->
                        <!--z-index: 9;-->
                    <!--}-->
                <!--}-->
            <!--}-->
            <!--.goodsDiv {-->
                <!--width: 710px;-->
                <!--/*height: 355px;*/-->
                <!--margin: 20px auto 40px;-->
                <!--background-color: #fff;-->
                <!--.goodsList {-->
                    <!--display: flex;-->
                    <!--flex-wrap: wrap;-->
                    <!--justify-content: space-between;-->
                    <!--align-items: center;-->
                    <!--align-content: center;-->
                    <!--.goods:first-child {-->
                        <!--width: 468px;-->
                        <!--img {-->
                            <!--width: 100%;-->
                            <!--height: 100%;-->
                            <!--margin: 0;-->
                        <!--}-->
                        <!--p {-->
                            <!--display: none;-->
                        <!--}-->
                    <!--}-->
                    <!--.goods {-->
                        <!--width: 220px;-->
                        <!--height: 220px;-->
                        <!--margin-bottom: 20px;-->
                        <!--background-color: #fafafa;-->
                        <!--&gt;div,a {-->
                            <!--display: block;-->
                            <!--width: 100%;-->
                            <!--height: 100%;-->
                            <!--img {-->
                                <!--display: block;-->
                                <!--width: 180px;-->
                                <!--height: 180px;-->
                                <!--margin: 0 auto;-->
                            <!--}-->
                            <!--p {-->
                                <!--text-align: center;-->
                                <!--b {-->
                                    <!--font-size: 28px;-->
                                    <!--color: #F91258;-->
                                <!--}-->
                                <!--span {-->
                                    <!--font-size: 20px;-->
                                    <!--text-decoration: line-through;-->
                                <!--}-->
                            <!--}-->
                        <!--}-->
                    <!--}-->
                <!--}-->
            <!--}-->
            <!--.redShowDiv {-->
                <!--position: fixed;-->
                <!--left: 50%;-->
                <!--width: 500px;-->
                <!--margin-left: -250px;-->
                <!--top: 20%;-->
                <!--.redPic {-->
                    <!--width: 500px;-->
                    <!--height: 628px;-->
                    <!--margin: 0 auto;-->
                <!--}-->
                <!--.close {-->
                    <!--position: absolute;-->
                    <!--width: 60px;-->
                    <!--height: 60px;-->
                    <!--margin: 60px auto;-->
                    <!--left: 50%;-->
                    <!--margin-left: -30px;-->
                    <!--z-index: 999;-->
                <!--}-->
                <!--.redShowPic {-->
                    <!--position: relative;-->
                    <!--width: 500px;-->
                    <!--height: 628px;-->
                    <!--margin: 0 auto;-->
                    <!--.redCont {-->
                        <!--position: absolute;-->
                        <!--width: 432px;-->
                        <!--left: 50%;-->
                        <!--bottom: 140px;-->
                        <!--margin-left: -216px;-->
                        <!--background-color: #f5f5f5;-->
                        <!--text-align: center;-->
                        <!--border-radius: 12px;-->
                        <!--padding-top: 12px;-->
                        <!--padding-bottom: 60px;-->
                        <!--b {-->
                            <!--font-size: 36px;-->
                        <!--}-->
                        <!--p {-->
                            <!--font-size: 24px;-->
                            <!--color: #ccc;-->
                        <!--}-->
                        <!--.couponDiv {-->
                            <!--.couponList {-->
                                <!--width: 400px;-->
                                <!--margin: 8px auto;-->
                                <!--background-color: #fff;-->
                                <!--.coupon {-->
                                    <!--display: flex;-->
                                    <!--justify-content: space-between;-->
                                    <!--align-items: center;-->
                                    <!--padding: 8px 4px;-->
                                    <!--img {-->
                                        <!--display: block;-->
                                        <!--width: 56px;-->
                                        <!--height: 56px;-->
                                    <!--}-->
                                    <!--&gt; div {-->
                                        <!--display: flex;-->
                                        <!--flex-direction: column;-->
                                        <!--justify-content: flex-start;-->
                                        <!--align-items: flex-start;-->
                                        <!--p {-->
                                            <!--color: #333;-->
                                            <!--font-size: 24px;-->
                                        <!--}-->
                                        <!--span {-->
                                            <!--color: #666;-->
                                            <!--font-size: 24px;-->
                                        <!--}-->
                                    <!--}-->
                                    <!--b {-->
                                        <!--color: #f71a27;-->
                                        <!--font-size: 60px;-->
                                        <!--span {-->
                                            <!--color: #f71a27;-->
                                            <!--font-size: 28px;-->
                                        <!--}-->
                                    <!--}-->
                                <!--}-->
                                <!--.couponTip {-->
                                    <!--display: flex;-->
                                    <!--justify-content: space-between;-->
                                    <!--align-items: center;-->
                                    <!--background-color: #fbfbfb;-->
                                    <!--span {-->
                                        <!--color: #ccc;-->
                                        <!--font-size: 24px;-->
                                        <!--padding: 0 4px;-->
                                    <!--}-->
                                <!--}-->
                            <!--}-->
                        <!--}-->
                    <!--}-->
                    <!--.redContBg {-->
                        <!--position: absolute;-->
                        <!--width: 468px;-->
                        <!--height: 200px;-->
                        <!--left: 50%;-->
                        <!--bottom: 108px;-->
                        <!--margin-left: -234px;-->

                    <!--}-->
                    <!--.redBottom {-->
                        <!--position: absolute;-->
                        <!--bottom: 0;-->
                        <!--width: 500px;-->
                        <!--height: 220px;-->
                        <!--z-index: 9;-->
                        <!--i {-->
                            <!--position: absolute;-->
                            <!--display: block;-->
                            <!--width: 300px;-->
                            <!--height: 60px;-->
                            <!--line-height: 60px;-->
                            <!--text-align: center;-->
                            <!--color: #fff;-->
                            <!--left: 50%;-->
                            <!--margin-left: -150px;-->
                            <!--bottom: 36px;-->
                            <!--z-index: 99;-->
                        <!--}-->
                    <!--}-->
                    <!--.redLittle {-->
                        <!--position: absolute;-->
                    <!--}-->
                    <!--.redLittle1 {-->
                        <!--width: 52px;-->
                        <!--height: 48px;-->
                        <!--right: -20px;-->
                        <!--bottom: 220px;-->
                    <!--}-->
                    <!--.redLittle2 {-->
                        <!--width: 68px;-->
                        <!--height: 68px;-->
                        <!--right: 0;-->
                        <!--top: 32px;-->
                    <!--}-->
                    <!--.redLittle3 {-->
                        <!--width: 60px;-->
                        <!--height: 60px;-->
                        <!--right: 60px;-->
                        <!--bottom: -24px;-->
                        <!--z-index: 9;-->
                    <!--}-->
                    <!--.redLittle4 {-->
                        <!--width: 64px;-->
                        <!--height: 64px;-->
                        <!--left: -40px;-->
                        <!--top: 200px;-->
                    <!--}-->
                <!--}-->
                <!--.rotation {-->
                    <!--animation: rotation 1s linear 1;-->
                    <!-- -o-animation: rotation 1s linear 1;-->
                    <!-- -webkit-animation: rotation 1s linear 1;-->
                    <!-- -ms-animation: rotation 1s linear 1;-->
                    <!-- -moz-animation: rotation 1s linear 1;-->
                <!--}-->
            <!--}-->
            <!--.redShowBg {-->
                <!--position: fixed;-->
                <!--left: 0;-->
                <!--right: 0;-->
                <!--top: 0;-->
                <!--bottom: 0;-->
                <!--background-color: rgba(0,0,0,.4);-->
            <!--}-->
        <!--}-->
    <!--}-->
    <!--@keyframes rotation {-->
        <!--from {-->
            <!--transform: rotateY(0);-->
            <!-- -moz-transform: rotateY(0);-->
            <!-- -o-transform: rotateY(0);-->
            <!-- -webkit-transform: rotateY(0);-->
            <!-- -ms-transform: rotateY(0);-->
        <!--}-->

        <!--to {-->
            <!--transform: rotateY(360deg);-->
            <!-- -moz-transform: rotateY(360deg);-->
            <!-- -o-transform: rotateY(360deg);-->
            <!-- -webkit-transform: rotateY(360deg);-->
            <!-- -ms-transform: rotateY(360deg);-->
        <!--}-->
    <!--}-->


<!--</style>-->
 <!--&ndash;&gt; &ndash;&gt; &ndash;&gt;-->
