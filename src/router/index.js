import Vue from 'vue'
import router from 'vue-router'
import Home from '../components/Home'
import UserList from '../components/UserList'
import ShopList from '../components/ShopList'
import FoodList from '../components/FoodList'
import OrderList from '../components/OrderList'
import ManageList from '../components/ManageList'
import Login from '../components/Login'
import Test from '../components/Test'
import Register from '../components/Register'

Vue.use(router);

const myRouter= new router({
    routes: [{
        path: '/home',
        component: Home,
        children: [
            {
                path: '/userlist',
                component: UserList,
                meta: ['数据管理', '用户列表']
            }, {
                path: '/shoplist',
                component: ShopList,
                meta: ['数据管理', '商家列表']
            }, {
                path: '/foodlist',
                component: FoodList,
                meta: ['数据管理', '食品列表']
            }, {
                path: '/orderlist',
                component: OrderList,
                meta: ['数据管理', '订单列表']
            }, {
                path: '/managelist',
                component: ManageList,
                meta: ['数据管理', '管理员列表']
            },
        ]
    }, {
        path: '/login',
        component: Login,
    },{
        path: '/test',
        component: Test,
    },{
        path:'/',
        redirect:'/login'
    },{
        path:'/register',
        component:Register,
    }]
})

myRouter.beforeEach((to,from,next)=>{
    // console.log("这是to:",to);
    // console.log("from:",from);
    
    next()
})

export default myRouter;