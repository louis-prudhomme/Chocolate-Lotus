import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '@/views/About.vue'
import SearchCard from '@/views/SearchCard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: SearchCard
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  routes
})

export default router
