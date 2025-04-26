import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import PromoView from '@/views/PromoView.vue'
import ProfileView from '@/views/ProfileView.vue'
import HistoryView from '@/views/HistoryView.vue'
import CustomerView from '@/views/CustomerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/promo_dashboard',
      name: 'promo_dashboard',
      component: PromoView,
    },
    {
      path: '/profile_dashboard',
      name: 'profile_dashboard',
      component: ProfileView,
    },
    {
      path: '/history_dashboard',
      name: 'history_dashboard',
      component: HistoryView,
    },
    {
      path: '/customer_dashboard',
      name: 'customer_dashboard',
      component: CustomerView,
    },
  ],
})

export default router
