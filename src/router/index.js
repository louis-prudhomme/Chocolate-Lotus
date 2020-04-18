import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '@/views/About.vue'
import SearchCard from '@/views/SearchCard.vue'
import Display from '@/views/DisplayCard.vue'
import Decks from '@/views/DisplayDecks.vue'
import DeckDock from '@/views/DeckDock.vue'

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
  },
  {
    path: '/display',
    name: 'Display',
    component: Display,
    props: true
  },
  {
    path: '/dock',
    name: 'Dock',
    component: DeckDock,
    props: true
  },
  {
    path: '/decks',
    name: 'Decks',
    component: Decks
  }
]

const router = new VueRouter({
  routes
})

export default router
