<template>
    <div>
        <div class="fixedBox" v-if="isShowList">
            <router-link :to="'/group/detail?group_id='+item.group_id" v-for="item,index in boxList" :key="item.group_id"
                         v-if="index == currentIndex">
                <img :src="item.photo" alt="">
                <p>最新订单来自{{item.nicke_name}}，{{item.show_time}}</p>
            </router-link>
        </div>
        <index></index>
        <tabbar></tabbar>
    </div>
</template>

<script>
    import Index from '../../components/index.vue'
    import Tabbar from '../../components/footer'

    export default {
        data() {
            return {
                currentIndex: 0,
                boxList: [],
                isShowList: false,
            }
        },
        components: {Index, Tabbar},
        mounted() {
            this.getBox()
            setInterval(() => {
                this.getFor()
            }, 5000)
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
            window.pageYOffset = 0
        },
        methods: {
            getBox() {
                this.$post('group/getGroupList', {})
                    .then(res => {
                        this.boxList = res
                    })
            },
            getFor() {
                this.isShowList = true;
                if (this.currentIndex <= this.boxList.length) {
                    this.currentIndex+=1
                } else {
                    this.currentIndex = 0
                }
                setTimeout(()=>{
                    this.isShowList = false
                },3000)


            }
        }
    }
</script>
<style scoped lang="scss">
    .fixedBox {
        position: fixed;
        top: 100px;
        left: 16px;
        -webkit-border-radius: 40px;
        -moz-border-radius: 40px;
        border-radius: 40px;
        background-color: rgba(0, 0, 0, .6);
        color: #fff;
        z-index: 9999;
        padding-right: 30px;
        a {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 50px;
            img {
                position: absolute;
                left: 0;
                top: -5px;
                display: block;
                width: 60px;
                height: 60px;
                margin-right: 20px;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                border: 1px solid #ccc;
            }
            p {
                color: #fff;
                margin-left: 60px;
            }
        }
    }
</style>
