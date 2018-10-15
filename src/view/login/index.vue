<template>
    <div class="login">
        <div class="logo">
            <img src="../../images/login_logo.png" alt="这里是logo">
        </div>
        <div class="form">
            <div class="mobile">
                <input type="tel" v-model="mobile" placeholder="请输入手机号" @blur="checkMobile">
            </div>
            <div class="captcha">
                <input type="tel" v-model="captcha" placeholder="请输入验证码">
                <span @click="getCaptcha" v-if="isShowCaptcha">获取验证码</span>
                <span v-else style="color: #999;">({{endTime}}S)重新获取</span>
                <!--<mt-button @click="getCaptcha" type="default" plain disabled>获取验证码</mt-button>-->
            </div>
            <div class="loginBtn">
                <mt-button type="danger" @click="submitBtn" :disabled="disabled">登录</mt-button>
            </div>
            <div class="tip">
                <mt-checklist
                    v-model="checkVal"
                    :options="checkOptions">我已阅读并同意
                </mt-checklist>
                <router-link to="/login/protocol">拼趣多用户协议</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import md5 from 'js-md5';
    import {Toast} from 'mint-ui';
    import {Indicator} from 'mint-ui';
    import randomStr from '../../config/randomStr'

    export default {
        name: "index",
        data() {
            return {
                nowTime: '',
                no_str: '',
                mobile: '',
                captcha: '',
                checkOptions: [
                    {
                        label: '我已阅读并同意',
                        value: '1'
                    }
                ],
                checkVal: ['1'],

                userInfo: '',   //登录成功后的用户信息
                disabled: false,
                isShowCaptcha: true,
                endTime: 60
            }
        },
        mounted() {
        },
        methods: {
            // 手机号验证
            checkMobile() {
                if (this.mobile == '') {
                    Toast({
                        message: '请填写手机号',
                        duration: 1200
                    })
                } else if (!/^1[34578]\d{9}$/.test(this.mobile)) {
                    Toast({
                        message: '请填写正确的手机号',
                        duration: 1200
                    })
                }
            },
            // 获取验证码
            getCaptcha() {
                this.nowTime = new Date().getTime()
                this.no_str = randomStr(32)
                this.$post('common/sendCode', {
                    mobile: this.mobile,
                    no_str: this.no_str,
                    time_str: this.nowTime,
                    sing: md5('235B7F44FD858C5E7C148E7D97033CD0mobile=' + this.mobile + '&no_str=' + this.no_str + '&sign_type=md5&time_str=' + this.nowTime + '235B7F44FD858C5E7C148E7D97033CD0'),
                    sign_type: 'md5',
                })
                    .then(res => {
                        Toast({
                            message: '短信发送成功',
                            duration: 1600
                        })
                        this.isShowCaptcha = false
                        let time = setInterval(() => {
                            if (this.endTime > 0) {
                                this.endTime--;
                            } else {
                                clearInterval(time)
                                this.isShowCaptcha = true
                                this.endTime = '60'
                            }
                        }, 1000)


                    })
            },
            // 验证码验证
            checkCaptcha() {
            },
            // 登录
            submitBtn() {
                this.$post('login/login', {
                    type: 1,
                    mobile: this.mobile,
                    sms_code: this.captcha
                })
                    .then(res => {
                        Indicator.open('登陆中...');
                        this.$setCookie('head_pic', res.head_pic)
                        this.$setCookie('nickname', res.nickname)
                        this.$setCookie('user_md5', res.user_md5)
                        this.$setCookie('token', res.token)
                        this.$setCookie('time', res.time)
                        this.$setCookie('user_tel', this.mobile)            // 手机号登录保存号码
                        setTimeout(() => {
                            Indicator.close()
                        }, 600)
                        if (this.$session.get('loginBeforeUrl')) {
                            this.$router.push(this.$session.get('loginBeforeUrl'))
                        } else {
                            this.$router.push('/index')
                        }

                    })
            }
        },
        watch: {
            checkVal() {
                if (this.checkVal == '') {
                    this.disabled = true
                } else {
                    this.disabled = false
                }
            }
        }
    }
</script>
<style lang="scss">
    .tip {
        .mint-checklist {
            margin: 0;
            padding: 0;
            .mint-checklist-title {
                margin: 0;
            }
            .mint-checkbox-core {
                width: 32px;
                height: 32px;
            }
            .mint-checkbox-input:checked + .mint-checkbox-core {
                background-color: #ff4862;
                border-color: #ff4862;
            }
            .mint-checkbox-core::after {
                width: 12px;
                height: 20px;
                left: 8px;
                top: 0px;
            }
            .mint-checklist-label {
                padding: 0;
            }
            .mint-checkbox-label {
                color: #999;
            }
        }
    }
</style>
<style scoped lang="scss">
    .login {
        position: absolute;
        width: 100%;
        max-width: 1500px;
        height: 100%;
        left: 0;
        top: 0;
        right: 0;
        margin: auto;
        background-color: #fff;
        .logo {
            padding: 52px 0 160px;
            img {
                width: 256px;
                height: 144px;
                margin: 0 auto;
            }
        }
        .form {
            > div {
                width: 600px;
                height: 98px;
                margin: 0 auto;
                font-size: 32px;
                input {
                    width: 100%;
                    padding: 26px 0;
                    font-size: 32px;
                    border: none;
                    border-bottom: 2px solid #eee;
                }

            }
            .loginBtn {
                .mint-button {
                    width: 100%;
                    height: 98px;
                    border-radius: 8px;
                    font-size: 36px;
                    background-color: #ff4862;
                    box-shadow: 0 0 4px #ff464e;
                }
            }
            .captcha {
                position: relative;
                margin: 26px auto 100px;
                span {
                    position: absolute;
                    right: 0;
                    top: 20px;
                    color: #4c4c4c;
                }
            }
            .tip {
                display: flex;
                justify-content: center;
                align-content: center;
                align-items: center;
                font-size: 24px;
                a {
                    color: #ff4862;
                    margin-top: -4px;
                }
            }
        }
    }
</style>
