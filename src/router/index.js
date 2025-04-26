import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import CustomerView from '@/views/CustomerView.vue'
import PromoView from '@/views/PromoView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/customer_dashboard',
      name: 'customer_dashbboard',
      component: CustomerView,
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
  ],
})

export default router
