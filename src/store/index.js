import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { loginRequest, isLoginRequest, sendResgisterMsgRequest, searchResgisterMsgRequest,sendClearMsgRequest,getUserList } from '../api/index';


const store = new Vuex.Store({
    state: {
        loginCode: 0,
        regisCode: 0,
        canRelogin:false,
        //采用本地存储储存用户名字，就不用再存入store里
        // username:"",
        userlist:[],
    },
    mutations: {
        LOGINREQUEST(state, res) {
            state.loginCode = res;
        },
        ISLOGINREQUEST(state, res) {
            state.loginCode = res;
        },
        SEARCHREGISTERMSG(state, res) {
            state.regisCode = res;
        },
        GETUSERLIST(state,res) {
            state.userlist=res;
        }
    },
    actions: {
        // 登录校验
        async loginrequest(context, usermsg) {
            const res = await loginRequest(usermsg).then((res) => {
                let resul = res.data;
                return resul;
            }).catch(function (error) {
                console.log(typeof error.message)
                return error.message;
            });
            context.commit("LOGINREQUEST", res.loginCode);
            return res;
        },
        // 过期校验
        async isloginrequest(context) {
            const res = await isLoginRequest().then((res) => {
                let resul = res.data;
                return resul;
            }).catch(function (error) {
                console.log(typeof error.message)
                return error.message;
            });
            context.commit("ISLOGINREQUEST", res.loginCode);
            return res;
        },
        // 注册信息(点击)
        async sendresgistermsg(context, usermsg) {
            const res = await sendResgisterMsgRequest(usermsg).then((res) => {
                let resul = res.data;
                console.log(resul);
                return resul;
            }).catch(function (error) {
                console.log(typeof error.message)
                return error.message;
            });
            // context.commit("SENDREGISTERMSG", res.regisCode);
            return res;
        },
        // 注册信息（用户名查询）
        async searchresgistermsgrequest(context, usermsg) {
            const res = await searchResgisterMsgRequest(usermsg).then((res) => {
                let resul = res.data;
                console.log(resul);
                return resul;
            }).catch(function (error) {
                console.log(typeof error.message)
                return error.message;
            });
            context.commit("SEARCHREGISTERMSG", res.regisCode);
            return res;
        },
        // 用户退出登录
        async sendclearmsgrequest(context) {
            const res = await sendClearMsgRequest().then((res) => {
                let resul = res.data;
                return resul;
            }).catch(function (error) {
                console.log(typeof error.message)
                return error.message;
            });
            return res;
        },
        // 获取用户登录信息
        async getuserlist(context) {
            const res = await getUserList().then((res) => {
                let resul = res.data;
                return resul;
            }).catch(function (error) {
                console.log(typeof error.message)
                return error.message;
            });
            context.commit("GETUSERLIST", res);
            return res;
        },
    },
    getters: {

    },
    modules: {
    }
});

export default store