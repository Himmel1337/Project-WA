import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ArticlesView from '../views/ReservationView.vue'
import ReservationDetail from '../views/ReservationDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/reservations',
      name: 'reservations',
      component: ArticlesView
    },
    {
      path: '/reservations/:id',
      name: 'reservation-detail',
      component: ReservationDetail
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
  ]
})

export default router
