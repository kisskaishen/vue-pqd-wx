<template>
    <div class="feedbackSubmit">
        <div class="title">
            <div class="divFl">{{textType}}</div>
            <div class="divFr">您还可以输入{{textNum}}字</div>
        </div>
        <div class="content">
            <textarea v-model="contentVal" rows="4" placeholder="请提出宝贵意见，我们将不断优化您的使用体验" ref="count"></textarea>
            <div class="imgs">
                <div class="imgList" v-for="item,index in imgList">
                    <i class="red" @click="deleteImg(item,index)"></i>
                    <img :src="item" alt="">
                </div>
                <div class="addImg" v-if="imgList.length<5" @change="upload">
                    <input type="file" accept="image/jpeg,image/jpg,image/png" captur="camera">
                    <i></i>
                    <span>{{imgList.length}}/5</span>
                </div>
            </div>
            <div class="tips">
                <div class="divFl"><label>联系电话</label></div>
                <div class="divFr"><input type="tel" v-model="tel" placeholder="请输入手机号"></div>
            </div>
        </div>
        <div class="btnDiv">
            <button @click="submitBtn">提交</button>
        </div>

    </div>
</template>

<script>
    let lrz = require('lrz');
    import {Toast, Indicator} from 'mint-ui';

    export default {
        name: "feedbackSubmit",
        data() {
            return {
                textType: '',
                textNum: '500',
                contentVal: '',
                imgList: [],
                tel: ''
            }
        },
        mounted() {
            switch (this.$route.query.id) {
                case '1':
                    this.textType = '新功能建议';
                    break;
                case '2':
                    this.textType = '功能异常&体验问题';
                    break;
                case '3':
                    this.textType = '服务投诉';
                    break;
            }
            document.title = this.textType
        },
        methods: {
            // 上传图片
            upload(e) {
                let self = this
                let imgInfo = ''
                Indicator.open({
                    text: '图片上传中...',
                    spinnerType: 'snake'
                });
                lrz(e.target.files[0], {quality: .4})
                    .then(function (res) {
                        imgInfo = res.base64
                        self.uploadImg(imgInfo)
                    })
                    .always(function () {
                        // 清空文件上传控件的值
                        e.target.value = null;
                    });

            },
            uploadImg(img) {
                let data = new FormData();
                data.append('_uimg', img)
                data.append('_utype', 'base64')
                data.append('type', 'default')
                this.$upload('Upload/index', data)
                    .then(res => {
                        this.imgList.push(res)
                    })
            },
            // 删除
            deleteImg(val, index) {
                this.imgList.splice(index, 1)
            },

            submitBtn() {
                var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (this.tel == '' || myreg.test(this.tel)) {
                    this.$post('user/addfeedback', {
                        token: this.$getCookie('token'),
                        msg_type: this.$route.query.id,
                        msg_content: this.contentVal,
                        msg_img: JSON.stringify(this.imgList),
                        user_mobile: this.tel,
                    })
                        .then(res => {
                            Toast({
                                message: '提交成功！',
                                duration: 1200
                            })
                            setTimeout(()=>{
                                this.$router.push('/user/index')
                            },1000)
                        })
                } else {
                    Toast('请输入正确的手机号')
                }

            },
        },
        watch: {
            contentVal(e) {
                this.textNum = 500 - this.$refs.count.value.length
            }
        }
    }
</script>

<style scoped lang="scss">
    .feedbackSubmit {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        min-height: 100%;
        background-color: #fff;
        > div {
            padding: 0 26px;
        }
        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 40px 26px;
            .divFl {
                font-size: 30px;
                color: #333;
            }
            .divFr {
                font-size: 24px;
                color: #999;
            }
        }
        .content {
            textarea {
                border: none;
                width: 100%;
                font-size: 30px;
            }
            .imgs {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: wrap;
                margin-top: 20px;
                .imgList {
                    position: relative;
                    margin-right: 20px;
                    margin-bottom: 16px;
                    img {
                        width: 150px;
                        height: 150px;
                    }
                    .red {
                        position: absolute;
                        right: -20px;
                        top: -20px;
                        width: 40px;
                        height: 40px;
                        text-align: center;
                        color: #fff;
                        background: url("../../imgs/service/icon-image-close.png") no-repeat center /100%;
                        -webkit-border-radius: 50%;
                        -moz-border-radius: 50%;
                        border-radius: 50%;
                    }
                }
                .addImg {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 150px;
                    height: 150px;
                    border: 2px dashed #ccc;
                    input[type='file'] {
                        position: absolute;
                        width: 150px;
                        height: 150px;
                        left: 0;
                        right: 0;
                        opacity: 0;
                    }
                    i {
                        display: block;
                        width: 46px;
                        height: 46px;
                        line-height: 46px;
                        background: url("../../imgs/service/icon-camera.png") no-repeat center /100%;
                    }
                    span {
                        color: #999;
                        font-size: 24px;
                        margin-top: 10px;
                    }
                }
            }
            .tips {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-top: 80px;
                .divFl {
                    label {
                        width: 120px;
                        font-size: 28px;
                        color: #333;
                    }
                }
                .divFr {
                    margin-left: 30px;
                    input {
                        border: none;
                        width: 560px;
                    }
                }
            }
        }
        .btnDiv {
            margin-top: 120px;
            button {
                width: 100%;
                height: 98px;
                line-height: 98px;
                background-color: #FF4862;
                font-size: 32px;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                border-radius: 8px;
            }
        }

    }
</style>
