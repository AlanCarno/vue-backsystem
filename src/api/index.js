import axios from "axios";

// 创建axios实例
const instance = axios.create({
    baseURL: 'http://127.0.0.1:8001',
    withCredentials: true,
    timeout: 3000,
});

// 请求拦截器
instance.interceptors.request.use(function (config) {
    // 对请求数据做点什么
    return config
}, function (error) {
    // 对请求错误做点什么
    return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
// 初次（持续登录）接口请求
export const isLoginRequest = () => instance.get('/api/islogin');
// 登录接口请求
export const loginRequest = (usermsg) => instance.post('/api/login', usermsg);
// 注册信息接口(用户名查询)
export const searchResgisterMsgRequest = (usermsg) => instance.post('/api/registersearch', usermsg);
// 注册信息接口(点击之后)
export const sendResgisterMsgRequest = (usermsg) => instance.post('/api/register', usermsg);
// 清除用户服务器存储的session
export const sendClearMsgRequest = () => instance.get('/api/clearuser');
// 获取用户信息列表
export const getUserList = () => instance.get('/api/getuserlist');







// 测试接口请求
export const testSend = (usermsg) => instance.get('/api/testVue', usermsg);




