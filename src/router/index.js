import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // 重定向
    redirect: '/home'
  },
  {
    path: '/home', // 首页
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'popup', // 首页搜索弹出框
        component: () => import('../views/Home/popup.vue')
      },
    ]
  },
  {
   path:'/brand/:brand',
   name:'brand',
   component: () => import(/* webpackChunkName: "about" */ '../views/brand/brand.vue')
  },
  {
    path: '/channel', // 首页分类区块
    name: 'Channel',
    component: () => import(/* webpackChunkName: "about" */ '../components/channel/Channel.vue')
  },
  {
    path: '/detail', // 商品详情
    name: 'Detail',
    component: () => import(/* webpackChunkName: "about" */ '../views/details/Detail.vue')
  },
  {
    path: '/cart', // 购物车
    component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue')
  },
  {
    path: '/Category', // 分类
    component: () => import(/* webpackChunkName: "about" */ '../views/Category.vue')
  },
  {
    path: '/topic', // 专题
    component: () => import(/* webpackChunkName: "about" */ '../views/Topic.vue')
  },
  {
    path: '/user', // 用户
    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// 导航守卫，路由阻断
router.beforeEach((to, from, next) => {
  if (to.path === '/cart') {
    let token = localStorage.getItem('X-Nideshop-Token')
    if (token) {
      next()
    } else {
      Vue.prototype.$toast("请先登录")
      next('/user')
    }
  } else {
    next();
  }
})




export default router
