<template>
    <div class="explore">
        <div class="search">
            <router-link to="search">
                <i></i>
                <span>搜索商品</span>
            </router-link>
            <hr>
        </div>
        <div class="exploreDiv">
            <div class="exploreMenu">
                <ul>
                    <li v-for="item,index in indexData" @click="memuClick(item,index)"
                        :class="currentIndex == index?'active':''">
                        <!--<img :src="item.logo" alt="">-->
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="exploreList">
                <div class="title">
                    <hr class="hrFl">
                    <p>{{this.indexData[this.currentIndex].name}}</p>
                    <hr class="hrFr">
                </div>
                <ul>
                    <li v-for="item,index in indexData[currentIndex].child">
                        <router-link :to="'/list/fromExplore?parent_id='+item.parent_id+'&id='+item.id"
                                     v-if="item.parent_id!='0'">
                            <img :src="item.img" alt="">
                            <span>{{item.name}}</span>
                        </router-link>
                        <router-link :to="'/haitao/list?id='+item.id" v-else>
                            <img :src="item.img" alt="">
                            <span>{{item.name}}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <tabbar></tabbar>
    </div>
</template>

<script>
    import Tabbar from '../../components/footer'

    export default {
        name: "index",
        data() {
            return {
                indexData: [{child: []}],           // 缓存总数据，是页面刚加载的时候缓存起来的
                indexData2: {},           // 缓存总数据，是页面刚加载的时候缓存起来的
                indexData2Child: [],
                currentIndex: '0'
            }
        },
        components: {Tabbar},
        mounted() {
            this.getIndexData()
        },
        methods: {
            getIndexData() {
                this.$post('common/getCategory', {})
                    .then((res) => {
                        if (res) {
                            this.$local.set('indexData', res)
                            this.indexData = this.$local.get('indexData').category
                            this.indexData2 = this.$local.get('indexData').haitao
                            this.indexData.push(this.indexData2)
                        }
                    })
            },
            memuClick(val, index) {
                this.currentIndex = index
            },
            haitaoClick(val) {
                this.currentIndex = val
                this.indexData2Child = this.$local.get('indexData').haitao.child
            }
        }
    }
</script>

<style scoped lang="scss">
    .search {
        position: relative;
        width: 750px;
        height: 100%;
        background-color: #fff;
        border-bottom: 1px solid #fdfdfd;
        a {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 90%;
            height: 88px;
            font-size: 28px;
            margin: 0 auto;
            color: #999;
            i {
                width: 40px;
                height: 44px;
                margin-right: 34px;
                background: url("../../imgs/explore/icon-search.png") no-repeat center /100%;
            }
        }
        hr {
            width: 698px;
            margin: 0 auto;
            border-top: 2px solid #eee;
        }
    }

    .exploreDiv {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        /*position: absolute;*/
        /*top: 90px;*/
        /*bottom: 100px;*/
        /*left: 0;*/
        /*right: 0;*/
        /*width: 750px;*/
        /*margin: auto;*/
        /*background-color: #fff;*/
        .exploreMenu {
            width: 160px;
            height: 100%;
            overflow: scroll;
            border-right: 1px solid #eee;
            li {
                width: 160px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 44px 0;
                img {
                    width: 40px;
                    height: 40px;
                    margin-right: 10px;
                }
                span {
                    font-size: 28px;
                    color: #4c4c4c;
                }
            }
            .active {
                background-color: #fff;
                border-right: 4px solid #FF4862;
                font-size: 28px;
                color: #FF4862;
            }
        }
        .exploreList {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-self: flex-start;
            padding: 56px 0 0 0;
            height: 100%;
            overflow: scroll;
            border-left: 1px solid #eee;
            .title {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                p {
                    height:30px;
                    font-size:32px;
                    color:#333;
                    line-height:40px;
                }
                hr {
                    position: absolute;
                    width: 80px;
                    border: 1px solid #ccc;
                    top: 20px;
                }
                .hrFl {
                    left: 100px;
                }
                .hrFr {
                    right: 100px;
                }
            }
            ul {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                align-content: flex-start;
                background-color: #fff;
                height: 100%;
                overflow-y: scroll;
                margin-top: 40px;
                padding-left: 50px;
                li {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 120px;
                    height: 172px;
                    margin-bottom: 60px;
                    margin-right: 56px;
                    &:nth-child(3n) {
                        margin-right: 0;
                    }
                    a {
                        img {
                            width: 120px;
                            height: 120px;
                        }
                        span {
                            display: block;
                            color: #999;
                            font-size: 24px;
                            margin-top: 14px;
                        }
                    }
                }
            }


        }
    }
</style>
