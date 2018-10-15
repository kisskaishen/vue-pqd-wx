<template>
    <div class="footer">
        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="1">
                <img slot="icon" src="../imgs/footer/icon-footer-index-active.png" v-if="selected == '1'">
                <img slot="icon" src="../imgs/footer/icon-footer-index.png" v-else>
                首页
            </mt-tab-item>
            <mt-tab-item id="2">
                <img slot="icon" src="../imgs/footer/icon-footer-ranking-active.png" v-if="selected == '2'">
                <img slot="icon" src="../imgs/footer/icon-footer-ranking.png" v-else>
                排行榜
            </mt-tab-item>

            <mt-tab-item id="3">
                <img slot="icon" src="../imgs/footer/icon-footer-explore-active.png" v-if="selected == '3'">
                <img slot="icon" src="../imgs/footer/icon-footer-explore.png" v-else>
                搜索
            </mt-tab-item>
            <mt-tab-item id="4">
                <img slot="icon" src="../imgs/footer/icon-footer-message-active.png" v-if="selected == '4'">
                <img slot="icon" src="../imgs/footer/icon-footer-message.png" v-else>
                消息
            </mt-tab-item>
            <mt-tab-item id="5">
                <img slot="icon" src="../imgs/footer/icon-footer-user-active.png" v-if="selected == '5'">
                <img slot="icon" src="../imgs/footer/icon-footer-user.png" v-else>
                个人中心
            </mt-tab-item>
            <!--<mt-tab-item id="1">-->
                <!--<img slot="icon" src="../imgs/footer/icon-footer-index-active.png" v-if="selected == '1'">-->
                <!--<img slot="icon" src="../imgs/footer/icon-footer-index.png" v-else>-->
                <!--首页-->
            <!--</mt-tab-item>-->
            <!--<mt-tab-item id="2">-->
                <!--<img slot="icon" src="../imgs/footer/icon-footer-ranking-active.png" v-if="selected == '2'">-->
                <!--<img slot="icon" src="../imgs/footer/icon-footer-ranking.png" v-else>-->
                <!--排行榜-->
            <!--</mt-tab-item>-->
            <!--<mt-tab-item id="3">-->
                <!--<img slot="icon" src="../imgs/footer/icon-footer-fruit-active.png" v-if="selected == '3'">-->
                <!--<img slot="icon" src="../imgs/footer/icon-footer-fruit.png" v-else>-->
                <!--品质水果-->
            <!--</mt-tab-item>-->
            <!--<mt-tab-item id="4">-->

                <!--<img slot="icon" src="../imgs/footer/icon-footer-explore-active.png" v-if="selected == '4'">-->
                <!--<img slot="icon" src="../imgs/footer/icon-footer-explore.png" v-else>-->
                <!--搜索-->
            <!--</mt-tab-item>-->
            <!--<mt-tab-item id="5">-->
                <!--<img slot="icon" src="../imgs/footer/icon-footer-user-active.png" v-if="selected == '5'">-->
                <!--<img slot="icon" src="../imgs/footer/icon-footer-user.png" v-else>-->
                <!--个人中心-->
            <!--</mt-tab-item>-->
            <!--<mt-tab-item id="1">-->
                <!--<img slot="icon" src="../images/icon_home_page_active.png" v-if="selected == '1'">-->
                <!--<img slot="icon" src="../images/icon_home_page.png" v-else>-->
                <!--首页-->
            <!--</mt-tab-item>-->
            <!--<mt-tab-item id="2">-->
                <!--<img slot="icon" src="../images/icon_ranking_active.png" v-if="selected == '2'">-->
                <!--<img slot="icon" src="../images/icon_ranking.png" v-else>-->
                <!--排行榜-->
            <!--</mt-tab-item>-->
            <!--<mt-tab-item id="3">-->
                <!--<img slot="icon" src="../images/icon_fruit_active.png" v-if="selected == '3'">-->
                <!--<img slot="icon" src="../images/icon_fruit.png" v-else>-->
                <!--品质水果-->
            <!--</mt-tab-item>-->
            <!--<mt-tab-item id="4">-->
                <!--<img slot="icon" src="../images/icon_explore_active.png" v-if="selected == '4'">-->
                <!--<img slot="icon" src="../images/icon_explore.png" v-else>-->
                <!--搜索-->
            <!--</mt-tab-item>-->
            <!--<mt-tab-item id="5">-->
                <!--<img slot="icon" src="../images/icon_user_active.png" v-if="selected == '5'">-->
                <!--<img slot="icon" src="../images/icon_user.png" v-else>-->
                <!--个人中心-->
            <!--</mt-tab-item>-->
        </mt-tabbar>
    </div>
</template>

<script>
    import {Tabbar, TabItem} from 'mint-ui';

    export default {
        data() {
            return {
                selected: '',
            }
        },
        mounted() {
            this.getSelected(this.$route.path)
        },
        methods: {
            getSelected(url) {
                switch (url) {
                    case '/':
                        this.selected = '1'
                        break;
                    case '/index':
                        this.selected = '1'
                        break;
                    case '/index/index':
                        this.selected = '1'
                        break;
                    case '/ranking':
                        this.selected = '2'
                        break;
                    case '/ranking/index':
                        this.selected = '2'
                        break;
                    case '/explore':
                        this.selected = '3'
                        break;
                    case '/explore/index':
                        this.selected = '3'
                        break;
                    case '/user/myMsg':
                        this.selected = '4'
                        break;
                    case '/user':
                        this.selected = '5'
                        break;
                    case '/user/index':
                        this.selected = '5'
                        break;
                }
            }
        },
        watch: {
            selected(val) {
                switch (val) {
                    case '1':
                        this.$router.push('/index')
                        break;
                    case '2':
                        this.$router.push('/ranking/index')
                        break;
                    case '3':
                        this.$router.push('/explore/index')
                        break;
                    case '4':
                        this.$router.push('/user/myMsg')
                        break;

                    case '5':
                        this.$router.push('/user/index')
                        break;

                }
            }
        }
    }
</script>

<style lang="scss">
    .footer {
        width: 750px;
        height: 100px;
        .mint-tabbar {
            width: inherit;
            height: 100px;
            margin: 0 auto;
            .mint-tab-item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                align-content: center;
                .mint-tab-item-icon {
                    width: 40px;
                    height: 40px;
                }
                .mint-tab-item-label {
                    font-size: 22px;
                }
            }
            .is-selected {
                color: #ff4862 !important;
                background-color: transparent;
                /*border-bottom: 1px solid #f13d3c !important;*/
            }
        }

    }

</style>
