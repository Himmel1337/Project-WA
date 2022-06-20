import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

import ReservationsView from '../views/ReservationsView.vue'
import ReservationDetailView from '../views/ReservationDetailView.vue'
import AddReservationView from '../views/AddReservationView.vue';
import ManipulationReservation from "../views/ManipulationReservation.vue";

import FlightsView from '../views/FlightsView.vue'
import FlightDetailView from '../views/FlightDetailView.vue'
import AddFlightView from '../views/AddFlightView.vue';

import RegisterView from '../views/RegistrationView.vue'
import AuthSection from "../AuthSection.vue";
import LoginView from '../views/LoginView.vue';
import {useUserStore} from '../stores/UserStore';

import NotificationView from '../views/NotificationView.vue';
import AddNotificationView from '../views/AddNotificationView.vue';
import ArchiveNotification from "../views/ArchiveNotification.vue";


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
      path: '/auth',
      name: 'auth',
      component: AuthSection,
      beforeEnter: checkAuthentication,
      children: [
        {
          path: 'notification',
          name: 'notification',
          component: NotificationView
        },
        {
          path: 'addNotification',
          name: 'addNotification',
          component: AddNotificationView
        },
        {
          path: 'archiveNotification',
          name: 'archiveNotification',
          component: ArchiveNotification
        },
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
        {
          path: 'manipulationReservation',
          name: 'manipulationReservation',
          component: ManipulationReservation
        },
        {
          path: 'addReservation',
          name: 'addReservation',
          component: AddReservationView
        },
        {
          path: 'flights',
          name: 'flights',
          component: FlightsView
        },
        {
          path: 'flights/:id',
          name: 'flight-detail',
          component: FlightDetailView
        },
        {
          path: 'addFlight',
          name: 'addFlight',
          component: AddFlightView
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
