import Vue from 'vue'
import VueRouter from 'vue-router'
import Clock from '@/views/Clock.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Clock',
    component: Clock,
    children: [
      // {
      //   path: '/about',
      //   name: 'about',
      //   component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      // }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
