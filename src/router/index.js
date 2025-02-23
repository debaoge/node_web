import Home from '@/views/Home.vue'
import News from '@/views/News.vue'
import Product from '@/views/Product.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'


const routes = [
  {
    path:'/',
    name: 'home',
    component: Home
  },
  {
    path:'/news',
    name: 'news',
    component: News
  },
  {
    path:'/product',
    name: 'product',
    component: Product
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next)=>{
  NProgress.start();
  next();
})

router.afterEach((to, from ,next)=>{
  NProgress.done()
})
export default router
