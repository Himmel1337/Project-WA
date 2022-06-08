import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ReservationsView from '../views/ReservationsView.vue'
import ReservationDetailView from '../views/ReservationDetailView.vue'
import RegisterView from '../views/RegisterView.vue'
import AuthSection from "../AuthSection.vue";
import LoginView from "../views/LoginView.vue";
import AddReservationView from "../views/AddReservationView.vue";
import {useUserStore} from "../stores/UserStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/addReservation',
      name: 'addReservation',
      component: AddReservationView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthSection,
      beforeEnter: checkAuthentication,
      children: [
        {
          path: 'reservations',
          name: 'reservations',
          component: ReservationsView
        },
        {
          path: 'reservations/:id',
          name: 'reservation-detail',
          component: ReservationDetailView
        },
      ]
    }
  ]
})

function checkAuthentication(to, from, next) {
  const store = useUserStore();
  if (store.isAuthenticated) {
    next();
  } else {
    store.setLoginMessage("Please, log in to access the private section of the web.")
    store.setAfterLoginRoute(to)
    next({name: 'login'})
  }
}

export default router
