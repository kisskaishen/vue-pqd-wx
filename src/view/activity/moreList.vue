<!--&lt;!&ndash; <template>-->
    <!--<div class="moreList"-->
         <!--v-infinite-scroll="loadMore"-->
         <!--infinite-scroll-disabled="loading"-->
         <!--infinite-scroll-distance="100">-->
        <!--<div class="banner">-->
            <!--<img :src="info.category_info.banner" alt="" v-if="info.category_info.banner">-->
            <!--&lt;!&ndash;<img src="../../assets/images/wuyi/morelistBg.png" alt="" v-else>&ndash;&gt;-->
        <!--</div>-->
        <!--<div class="swiper">-->
            <!--<ul style="display: none;">-->
                <!--<li v-for="item,index in info.activ_category_subclass" :class="index == currentIndex?'active':''"-->
                    <!--@click="indexChange(item,index)">{{item.name}}-->
                <!--</li>-->
            <!--</ul>-->
            <!--<swiper :options="swiperOptionNavbar" ref="swiperNavbar" class="ul" :class="pstAvtive?'positionUl':''" @tauchstart.self="console.log(1);">-->
                <!--&lt;!&ndash;<swiper-slide class="li" :class="currentIndex==0?'active':''">首页</swiper-slide>&ndash;&gt;-->
                <!--<swiper-slide class="li" :class="currentIndex==index?'active':''" v-for="(item,index) in info.activ_category_subclass" :key="item.name">-->
                    <!--{{item.name}}-->
                <!--</swiper-slide>-->
            <!--</swiper>-->
        <!--</div>-->
        <!--<div class="choose" :class="pstAvtive?'positionChoose':''" :style="{backgroundColor:info.category_info.bg_color}">-->
            <!--<ul>-->
                <!--<li @click="allClick()">综合</li>-->
                <!--<li @click="saleClick()">销量 <i></i></li>-->
                <!--<li @click="priceClick()">价格 <i></i></li>-->
            <!--</ul>-->
        <!--</div>-->
        <!--<div class="goodsList">-->
            <!--<ul>-->
                <!--<li v-for="item,index in goodsList" :id="item.activ_category_id">-->
                    <!--<a :href="'../goods_detail.html?goods_id='+item.goods_id" v-if="isweixin">-->
                        <!--<img :src="item.list_img" alt="">-->
                        <!--<p>-->
                            <!--<label>{{item.goods_name}}</label>-->
                        <!--</p>-->
                        <!--<p>-->
                            <!--<b>¥{{item.prom_price}}</b>-->
                            <!--<span>{{item.prom}}人团</span>-->
                        <!--</p>-->
                    <!--</a>-->
                    <!--<div @click="showAppdetail(item)" v-else>-->
                        <!--<img :src="item.list_img" alt="">-->
                        <!--<p>-->
                            <!--<label>{{item.goods_name}}</label>-->
                        <!--</p>-->
                        <!--<p>-->
                            <!--<b>¥{{item.prom_price}}</b>-->
                            <!--<span>{{item.prom}}人团</span>-->
                        <!--</p>-->
                    <!--</div>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</div>-->
        <!--<div :class="pstAvtive?'toTop':''" @click="toTopClick(step)">-->
            <!--<span></span>-->
        <!--</div>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--import {Toast} from 'mint-ui';-->


    <!--export default {-->
        <!--name: "more-list",-->
        <!--data() {-->
            <!--return {-->
                <!--swiper: ['全部'],-->
                <!--swiperOptionNavbar:{-->
                    <!--freeMode: true,-->
                    <!--freeModeMomentumRatio: 0.5,-->
                    <!--slidesPerView: 'auto',-->
                    <!--preventClicks: true,//滑动误触-->
                    <!--onClick: this.navBarTap,-->
                <!--},-->
                <!--currentIndex: '0',-->
                <!--info: {category_info: {}, activ_category_subclass: {}, goods_list: {items: []}},-->
                <!--goodsList: [],-->
                <!--loading: false,-->
                <!--page: 0,-->
                <!--id: '',-->
                <!--sort: '',        // sales/price-->
                <!--by: 'ASC',          // asc/desc-->
                <!--iconSale: '',-->
                <!--iconPrice: '',-->
                <!--isweixin: this.$route.query.isweixin,-->
                <!--pstAvtive:false,-->
                <!--scrollTop:0,-->
                <!--step:100,-->
                <!--// app信息-->
                <!--userInfoType:'',-->
                <!--terminal:'',-->
                <!--user_id:'' || getCookie('user_id'),-->
                <!--isweixin:true-->
            <!--}-->
        <!--},-->
        <!--mounted() {-->
            <!--// this.getList(1)-->
            <!--window.addEventListener('scroll',this.handScroll)-->
            <!--this.isLogin()-->

        <!--},-->
        <!--methods: {-->
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
            <!--toTopClick(i) {-->
                <!--document.body.scrollTop = 0-->
                <!--document.documentElement.scrollTop = 0-->
                <!--window.pageYOffset = 0-->

                <!--// if (document.documentElement.scrollTop >0) {-->
                <!--//     var c = setTimeout(()=>{-->
                <!--//         this.toTopClick(i)-->
                <!--//     },16)-->
                <!--// } else {-->
                <!--//     clearTimeout(c)-->
                <!--// }-->
            <!--},-->
            <!--handScroll() {-->
                <!--let self = this-->
                <!--self.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop-->
                <!--if (self.scrollTop > 156) {-->
                    <!--this.pstAvtive = true-->
                <!--} else {-->
                    <!--this.pstAvtive = false-->
                <!--}-->
            <!--},-->
            <!--indexChange(index) {-->
                <!--this.toTopClick()-->
                <!--this.page = 1-->
                <!--this.id = index == '0' ? this.$route.query.id : this.info.activ_category_subclass[index].id-->
                <!--let self = this-->
                <!--Indicator.open({-->
                    <!--text: '加载中...',-->
                    <!--spinnerType: 'double-bounce'-->
                <!--});-->
                <!--this.http('post', '/Activ/lists_pick', {-->
                    <!--id: self.id || self.$route.query.id,-->
                    <!--page: 1,-->
                    <!--sort: self.sort || '',-->
                    <!--by: self.by-->
                <!--}, function (res) {-->
                    <!--Indicator.close();-->

                    <!--if (res.status == '1') {-->
                        <!--document.title = res.result.category_info.name-->
                        <!--self.info = res.result-->
                        <!--self.goodsList = res.result.goods_list.items-->

                    <!--} else {-->
                        <!--Toast({-->
                            <!--message: res.msg,-->
                            <!--duration: 2000-->
                        <!--})-->
                    <!--}-->

                <!--})-->
            <!--},-->
            <!--getList(page) {-->
                <!--let self = this-->
                <!--Indicator.open({-->
                    <!--text: '加载中...',-->
                    <!--spinnerType: 'double-bounce'-->
                <!--});-->
                <!--this.http('post', '/Activ/lists_pick', {-->
                    <!--id: self.id || self.$route.query.id,-->
                    <!--page: page,-->
                    <!--sort: self.sort || '',-->
                    <!--by: self.by-->
                <!--}, function (res) {-->
                    <!--Indicator.close();-->

                    <!--if (res.status == '1') {-->
                        <!--document.title = res.result.category_info.name-->
                        <!--self.info = res.result-->
                        <!--if (page == '1') {-->
                            <!--self.goodsList = res.result.goods_list.items-->
                        <!--} else {-->
                            <!--if (res.result.goods_list.items == [] || res.result.goods_list.items == '') {-->
                                <!--Toast({-->
                                    <!--message: '别拉了我是有底线的',-->
                                    <!--duration: 1000-->
                                <!--})-->
                                <!--return false;-->
                            <!--} else {-->
                                <!--self.goodsList = self.goodsList.concat(res.result.goods_list.items)-->
                            <!--}-->
                        <!--}-->
                    <!--} else {-->
                        <!--Toast({-->
                            <!--message: res.msg,-->
                            <!--duration: 2000-->
                        <!--})-->
                    <!--}-->

                <!--})-->
            <!--},-->
            <!--// 上划加载更多-->
            <!--loadMore() {-->
                <!--this.loading = true-->
                <!--this.page++-->
                <!--this.getList(this.page)-->
                <!--this.loading = false-->
            <!--},-->

            <!--// 在h5页面跳转app商品详情-->
            <!--showAppdetail(val) {-->
                <!--if (this.userInfoType == 'i') {-->
                    <!--showGoodsDetails(val.goods_id.toString())-->
                <!--} else {-->
                    <!--webview.showGoodsDetails(val.goods_id.toString())-->
                <!--}-->
            <!--},-->

            <!--// 筛选-->
            <!--allClick() {-->
                <!--this.sort = ''-->
                <!--this.by = ''-->
                <!--this.getList(1)-->
            <!--},-->
            <!--saleClick() {-->
                <!--this.sort = 'sales'-->
                <!--this.by = this.by == 'DESC' ? 'ASC' : 'DESC'-->
                <!--this.getList(1)-->
            <!--},-->
            <!--priceClick() {-->
                <!--this.sort = 'price'-->
                <!--this.by = this.by == 'DESC' ? 'ASC' : 'DESC'-->
                <!--this.getList(1)-->
            <!--},-->
            <!--navBarCenter: function (swiper) {-->
                <!--const swiperWidth = swiper.container[0].clientWidth-->
                <!--const maxTranslate = swiper.maxTranslate();-->
                <!--const maxWidth = -maxTranslate + swiperWidth / 2-->
                <!--let slide = swiper.slides[swiper.clickedIndex]-->
                <!--let slideLeft = slide.offsetLeft-->
                <!--let slideWidth = slide.clientWidth-->
                <!--let slideCenter = slideLeft + slideWidth / 2-->
                <!--// 被点击slide的中心点-->
                <!--swiper.setWrapperTransition(300)-->

                <!--if (slideCenter < swiperWidth / 2) {-->

                    <!--swiper.setWrapperTranslate(0)-->

                <!--} else if (slideCenter > maxWidth) {-->

                    <!--swiper.setWrapperTranslate(maxTranslate)-->

                <!--} else {-->

                    <!--let nowTlanslate = slideCenter - swiperWidth / 2-->

                    <!--swiper.setWrapperTranslate(-nowTlanslate)-->

                <!--}-->
            <!--},-->
            <!--navBarTap () {-->
                <!--const swiperNavbar = this.$refs.swiperNavbar.swiper; //导航栏-->
                <!--this.navBarCenter(swiperNavbar);//导航栏居中-->
                <!--this.currentIndex = swiperNavbar.clickedIndex;//改变当前选中状态-->
                <!--this.indexChange(this.currentIndex)-->
            <!--},-->
        <!--}-->
    <!--}-->
<!--</script>-->

<!--<style scoped lang="scss">-->
    <!--.moreList {-->
        <!--position: relative;-->
        <!--width: 100%;-->
        <!--&gt; div {-->
            <!--width: 100%;-->
        <!--}-->
        <!--.banner {-->
            <!--img {-->
                <!--display: block;-->
                <!--width: 100%;-->
                <!--height: 312px;-->
            <!--}-->
        <!--}-->
        <!--.swiper {-->
            <!--.positionUl {-->
                <!--position: fixed;-->
                <!--top: 0;-->
                <!--left: 0;-->
                <!--right: 0;-->
                <!--z-index: 99;-->
            <!--}-->
            <!--.ul {-->
                <!--width: 750px;-->
                <!--height: 88px;-->
                <!--line-height: 88px;-->
                <!--display: flex;-->
                <!--justify-content: space-between;-->
                <!--align-items: center;-->
                <!--align-content: center;-->
                <!--overflow: scroll;-->
                <!--background-color: #fff;-->
                <!--.li {-->
                    <!--color: #333;-->
                    <!--font-size: 32px;-->
                    <!--width: 180px !important;-->
                    <!--text-align: center;-->
                    <!--overflow: hidden;-->
                    <!-- -ms-text-overflow: ellipsis;-->
                    <!--text-overflow: ellipsis;-->
                    <!--white-space: nowrap;-->
                    <!--&:nth-child(1) {-->
                        <!--min-width: 120px;-->
                    <!--}-->
                <!--}-->
                <!--.active {-->
                    <!--color: #d90c0c;-->
                    <!--font-size: 36px;-->
                <!--}-->
            <!--}-->
        <!--}-->
        <!--.positionChoose {-->
            <!--position: fixed;-->
            <!--top:88px;-->
        <!--}-->
        <!--.choose {-->
            <!--background-color: #df262c;-->
            <!--ul {-->
                <!--display: flex;-->
                <!--justify-content: flex-start;-->
                <!--align-items: center;-->
                <!--align-content: center;-->
                <!--height: 88px;-->
                <!--li {-->
                    <!--position: relative;-->
                    <!--flex: 1;-->
                    <!--padding: 0 24px;-->
                    <!--color: #fff;-->
                    <!--font-size: 32px;-->
                    <!--line-height: 88px;-->
                    <!--text-align: center;-->
                    <!--i {-->
                        <!--display: inline-block;-->
                        <!--width: 10px;-->
                        <!--height: 20px;-->
                        <!--&::after {-->
                            <!--position: absolute;-->
                            <!--content: '';-->
                            <!--right: 72px;-->
                            <!--top: 48px;-->
                            <!--border-top: 10px solid #fff;-->
                            <!--border-left: 10px solid transparent;-->
                            <!--border-right: 10px solid transparent;-->
                        <!--}-->
                        <!--&::before {-->
                            <!--position: absolute;-->
                            <!--content: '';-->
                            <!--right: 72px;-->
                            <!--top: 28px;-->
                            <!--border-bottom: 10px solid #fff;-->
                            <!--border-left: 10px solid transparent;-->
                            <!--border-right: 10px solid transparent;-->
                        <!--}-->
                    <!--}-->
                <!--}-->
            <!--}-->
        <!--}-->
        <!--.goodsList {-->
            <!--padding-bottom: 40px;-->
            <!--ul {-->
                <!--display: flex;-->
                <!--flex-flow: wrap;-->
                <!--justify-content: flex-start;-->
                <!--padding: 0 10px;-->
                <!--li {-->
                    <!--margin:20px 5px 0;-->
                    <!--&:nth-child(3) {-->
                        <!--margin-right: 0;-->
                    <!--}-->
                    <!--&gt; div, a {-->
                        <!--display: block;-->
                        <!--width: 232px;-->
                        <!--background-color: #fff;-->
                        <!--img {-->
                            <!--display: block;-->
                            <!--width: 232px;-->
                            <!--height: 232px;-->
                        <!--}-->
                        <!--p {-->
                            <!--display: flex;-->
                            <!--justify-content: space-between;-->
                            <!--width: 220px;-->
                            <!--margin: 0 auto;-->
                            <!--label {-->
                                <!--width: 220px;-->
                                <!--overflow: hidden;-->
                                <!--text-overflow: ellipsis;-->
                                <!--white-space: nowrap;-->
                                <!--font-size: 28px;-->
                                <!--color: #333;-->
                            <!--}-->
                            <!--b {-->
                                <!--font-size: 28px;-->
                                <!--color: #f61027;-->
                            <!--}-->
                            <!--span {-->
                                <!--font-size: 24px;-->
                                <!--color: #ccc;-->
                            <!--}-->
                        <!--}-->
                    <!--}-->
                <!--}-->
            <!--}-->
        <!--}-->
        <!--.toTop {-->
            <!--position: fixed;-->
            <!--bottom: 100px;-->
            <!--right: 40px;-->
            <!--width: 60px;-->
            <!--height: 60px;-->
            <!-- -webkit-border-radius: 50%;-->
            <!-- -moz-border-radius: 50%;-->
            <!--border-radius: 50%;-->
            <!--background-color: #ccc;-->
            <!--display: flex;-->
            <!--justify-content: center;-->
            <!--align-items: center;-->
            <!--span {-->
                <!--display: block;-->
                <!--color: #fff;-->
                <!--width: 20px;-->
                <!--height: 20px;-->
                <!--margin-top: 6px;-->
                <!--border-right: 4px solid #fff;-->
                <!--border-top: 4px solid #fff;-->
                <!--transform: rotate(-45deg);-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</style>-->
 <!--&ndash;&gt;-->
