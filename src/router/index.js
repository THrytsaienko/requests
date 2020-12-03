import Vue from 'vue'
import VueRouter from 'vue-router'
import OmdbPage from '../views/Omdb.vue'
// import JsonPage from '../views/Json.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'OmdbPage',
    component: OmdbPage
  },
  {
    path: '/json',
    name: 'JsonPage',
    component: () => import('../views/Json.vue')
  },
  {
    path: '/jsonPost',
    name: 'JsonPostPage',
    component: () => import('../views/JsonPost.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
