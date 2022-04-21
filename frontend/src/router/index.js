import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ReservationsView from '../views/ReservationsView.vue'
import ReservationDetailView from '../views/ReservationDetailView.vue'
import SignUpView from '../views/SignUpView.vue'

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
      component: ReservationsView
    },
    {
      path: '/reservations/:id',
      name: 'reservation-detail',
      component: ReservationDetailView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
  ]
})

export default router
