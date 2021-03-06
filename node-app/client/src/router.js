import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import infoShow from './views/infoShow.vue'
import FundList from './views/FundList.vue'
// import { NOTFOUND } from 'dns';


Vue.use(Router)

const router =new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component:Index,
      children:[
        {
          path:"",
          component:Home
        },
        {
          path:"/home",
          name:'home',
          component:Home
        },
        {
          path:"/infoshow",
          name:'infoshow',
          component:infoShow
        },
        {
          path:"/fundlist",
          name:'fundlist',
          component:FundList
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component:Register
    },
    {
      path: '/login',
      name: 'login',
      component:Login
    },
    {
      path: '*',
      name: '/404',
      component:NotFound
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
//路由守卫
router.beforeEach((to,from,next)=>{
  const isLogin=localStorage.eleToken?true:false;
  if(to.path=='/login'||to.path=='/register'){
    next();
  }else {
    isLogin?next():next("/login");
  }
})
export default router;