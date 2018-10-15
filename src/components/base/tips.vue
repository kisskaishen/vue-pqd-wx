<template>
    <v-mask :status="logStatus" :opacity='0.3'>
        <div class="dialog">
            <div class="close" @click="close">
                <img src="../../imgs/gift/icon-close.png" alt="">
            </div>
            <div class="title">{{title}}</div>
            <div class="content">{{content}}</div>
            <button class="btn" @click="btnClick">{{btnText}}</button>
        </div>
    </v-mask>
</template>
<script>
    import vMask from './mask'
    export default {
        props: {
            logStatus: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: "温馨提示"
            },
            content: {
                type: String,
                default: ""
            },
            btnText: {
                type: String,
                default: ""
            }
        },
        methods: {
            close() {
                this.$emit('close')
            },
            btnClick(){
                this.$emit('btnClick')
            }
        },
        components: {
            vMask
        }
    }
</script>
<style lang="scss" scoped>
    .dialog {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 40px 60px 50px;
        position: absolute;
        top: 50%;
        left: 75px;
        right: 75px;
        transform: translateY(-50%);
        background: #ffffff;
        border-radius: 20px;

        .close {
            position: absolute;
            right: 25px;
            top: 25px;
            width: 25px;
            height: 25px;

            img {
                width: 100%;
            }
        }

        .title {
            margin-bottom: 70px;
            width: 100%;
            font-size: 30px;
            color: #333333;
            text-align: center;
        }

        .content {
            margin-bottom: 50px;
            font-size: 28px;
            color: #333333;
            line-height: 40px;
        }

        .btn {
            width: 248px;
            height: 70px;
            background: #FF4862;
            border-radius: 8px;
            font-size: 28px;
        }
    }
</style>