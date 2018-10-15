import vue from 'vue'
import axios from 'axios'
import qs from 'qs'

import envLogin from './envLogin'
import guid from './guid'

import {Indicator} from 'mint-ui';
import {Toast} from 'mint-ui';
import {getCookie, clearCookie} from "./util";
import util from "./util";

axios.defaults.timeout = 15000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; 		// 请求头
axios.defaults.withCredentials = true

// console.log(process.env.NODE_ENV)
let currentUrl = window.location.hostname
if (currentUrl == 'wx.pinquduo.top') {           // 开发环境
    axios.defaults.baseURL = 'http://apitest.pinquduo.top'			// 开发公共接口
} else if (currentUrl == 'testwx.pinquduo.cn' || currentUrl == 'testwx1.pinquduo.cn') {
    axios.defaults.baseURL = 'https://apitest.pinquduo.cn'			// 测试公共接口
} else if (currentUrl == 'wx.pinquduo.cn' || currentUrl == 'config.pinquduo.net.cn') {
    axios.defaults.baseURL = 'https://api.pqdshop.com'			// 正式公共接口
} else if (currentUrl == 'localhost' || currentUrl == '127.0.0.1' || currentUrl == '192.168.1.170' || currentUrl == '192.168.1.220' || currentUrl == '192.168.1.202') {
    axios.defaults.baseURL = 'http://apitest.pinquduo.top'			// 开发公共接口
}

if (!localStorage.getItem('guids')) {
    let guids = guid()
    localStorage.setItem('guids', guids)
}
// if (process.env.NODE_ENV === 'development') {           // 开发环境
//     axios.defaults.baseURL = 'http://apitest.pinquduo.top'			// 开发公共接口
// } else if (process.env.NODE_ENV === 'testing') {
//     axios.defaults.baseURL = 'https://apitest.pinquduo.cn'			// 测试公共接口
// } else if (process.env.NODE_ENV === 'production') {
//     axios.defaults.baseURL = 'https://api.pqdshop.com'			// 正式公共接口
// }

// 请求拦截器
axios.interceptors.request.use((config) => {
        return config
    }, (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
axios.interceptors.response.use((response) => {
        return response
    }, (error) => {
        return Promise.reject(error)
    }
)

// 封装axios
export let baseUrl = axios.defaults.baseURL

// get
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: params})
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                Indicator.close();
                reject(error)
            })
    })
}

// post
export function post(url, data) {
    if (url == 'meeting/getMeetingInfo') {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(data, data.guid = localStorage.getItem('guids'), data.version = '5.0.0'))
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    } else if (url == 'user/hanldeUserCoupon') {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(data, data.guid = localStorage.getItem('guids'), data.version = '5.0.0'))
                .then((response) => {
                    if (response.data.code == '200') {
                        resolve(response.data.data.result)
                    } else if (response.data.code == '997' || response.data.code == '996') {
                        clearCookie('token')
                        envLogin()
                    } else {
                        if (data.is_gyb == '1') {
                            Toast(response.data.msg + '，前往商品页中...');
                            setTimeout(() => {
                                this.$router.push(`/detail/index?goods_id=${this.$route.query.goods_id}`)
                            }, 1000)
                        } else {
                            Toast({
                                message:response.data.msg,
                                duration:1200
                            })
                        }
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    } else if (url == 'bargain/getSpecItem') {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(data, data.guid = localStorage.getItem('guids'), data.version = '5.0.0'))
                .then((response) => {
                    if (response.data.code == '200') {
                        resolve(response.data.data.result)
                    } else if (response.data.code == '997' || response.data.code == '996') {
                        clearCookie('token')
                        envLogin()
                    } else {
                        Toast(response.data.msg);
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
    else if (url == 'buy/submit') {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(data, data.guid = localStorage.getItem('guids'), data.version = '5.0.0'))
                .then((response) => {
                    if (response.data.code == '200') {
                        resolve(response.data)
                    } else {
                        Toast(response.data.msg);
                        //     Toast(response.data.msg+'前往砍价首页...');
                        //     setTimeout(()=>{
                        //         this.$router.push(`/activity/bargain`)
                        //     },1000)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    } else {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(data, data.guid = localStorage.getItem('guids'), data.version = '5.0.0'))
                .then((response) => {
                    if (response.data.code == '200') {
                        resolve(response.data.data.result)
                    } else if (response.data.code == '997' || response.data.code == '996') {
                        clearCookie('token')
                        envLogin()
                    } else if (response.data.code == '404') {
                        this.$router.push('/error/error404')
                    } else if (response.data.code == '3000') {
                        this.$router.push('/error/errorDetail')
                    } else {
                        if (url != 'login/getTokenInfo') {
                            Toast(response.data.msg);
                        }
                    }

                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

// upload
export function upload(url, data) {
    return new Promise((resolve, reject) => {
        Indicator.open({
            text: '上传中...',
            spinnerType: 'snake'
        });
        axios.post(url, data)
            .then((response) => {
                Indicator.close();
                if (response.data.code == '200') {
                    resolve(response.data.data.result)
                } else {
                    if (url != 'login/getTokenInfo') {
                        let instance = Toast(response.data.msg);
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    }
                }

            })
            .catch((error) => {
                Indicator.close();
                Toast({
                    message: '请求失败，请重试',
                })
                reject(error)
            })
    })
}
