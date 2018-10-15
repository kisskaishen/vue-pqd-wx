<template>
    <div class="search">
        <div class="searchDiv">
            <i></i>
            <input v-model.trim="searchVal" placeholder="搜索：分类 品牌 系列 产品" ref="inputSearch" v-focus @keyup.enter="searchClick(searchVal)">
            <!--<mt-button type="danger" >搜索</mt-button>-->
            <span style="color: #999" @click="clearSearchVal">取消</span>
        </div>
        <div class="list">
            <ul>
                <li v-for="item,index in wordList" @click="searchClick(item)">
                    {{item}}
                </li>
            </ul>
        </div>
        <div class="history" v-if="!historyList">
            <p>
                <span>最近搜索</span>
                <span @click="deleteHistory"><i></i>清除历史记录</span>
            </p>
            <ul>
                <li v-for="item,index in historyList" @click="searchClick(item)">{{item}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        name: "search",
        data() {
            return {
                searchVal: '',
                wordList:[],
                historyList: []
            }
        },
        directives: {
            focus: {
                inserted: function (el, {value}) {
                    el.focus();
                }
            }
        },

        mounted() {
            this.$nextTick(() => {
                this.$refs['inputSearch'].focus()
            })
        },
        methods: {
            searchClick(val) {
                if (this.searchVal=='') {
                    Toast({
                        message: '请输入搜索内容',
                        duration: 2000
                    });
                    return;
                } else {
                    this.$router.push({
                        path: '/explore/exploreSquredList',
                        query: {
                            word: val
                        }
                    })
                }
            },
            deleteHistory() {
                this.historyList = []
                this.$local.delete('searchHistory')
            },
            clearSearchVal() {
                this.searchVal = ''
            },
            getWordList(word) {
                this.$post('index/suggest',{
                    q:word
                })
                    .then(res=>{
                        this.wordList = res.list
                    })
            }
        },
        watch:{
            searchVal(e) {
                this.getWordList(e)
            }
        }
    }
</script>

<style scoped lang="scss">
    .search {
        .searchDiv {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 20px;
            background-color: #fff;
            i {
                width: 40px;
                height: 44px;
                background: url("../../imgs/explore/icon-search.png") no-repeat center /100%;
            }
            input {
                flex: 1;
                border: none;
                padding: 20px;
                font-size: 28px;
            }
            .mint-button {
                height: 60px;
                padding: 0 40px;
            }
        }
        .list {
            padding: 0 26px;
            ul {
                li {
                    height: 106px;
                    line-height: 106px;
                    border-top: 1px solid #eee;
                }
            }
        }
        .history {
            width: 100%;
            padding: 10px 40px;
            margin-top: 20px;
            background-color: #fff;
            p {
                display: flex;
                justify-content: space-between;
                span {
                    &:nth-child(2) {
                        color: #d81e06;
                        i {
                            display: inline-block;
                            vertical-align: middle;
                            width: 40px;
                            height: 40px;
                            margin-right: 10px;
                            background: url("../../images/delete.png") no-repeat center /100%;
                        }
                    }
                }
            }
            ul {
                display: flex;
                flex-wrap: wrap;
                li {
                    max-width: 670px;
                    padding: 10px 20px;
                    margin: 8px 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    background-color: #ccc;
                    -webkit-border-radius: 4px;
                    -moz-border-radius: 4px;
                    border-radius: 4px;
                }
            }
        }
    }
</style>
