import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/utils/supabase.js'

import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

import PromoView from '@/views/PromoView.vue'
import ProfileView from '@/views/ProfileView.vue'
import HistoryView from '@/views/HistoryView.vue'
import CustomerView from '@/views/CustomerView.vue'

import AdminView from '@/views/AdminView.vue'
import UsersView from '@/views/UsersView.vue'
import AdminProfile from '@/views/AdminProfile.vue'

import SignoutView from '@/views/SignoutView.vue'

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
    {
      path: '/logout',
      name: 'logout',
      component: SignoutView,
    },
    {
      path: '/admin_dashboard',
      name: 'admin_dashboard',
      component: AdminView,
    },
    {
      path: '/users_dashboard',
      name: 'users_dashboard',
      component: UsersView,
    },
    {
      path: '/admin_profile',
      name: 'admin_profile',
      component: AdminProfile,
    },
  ],
})

// Route Guard Logic
router.beforeEach(async (to, from, next) => {
  if (to.name === 'logout') return next()

  const { data } = await supabase.auth.getUser()
  const user = data?.user

  const authRoutes = ['login', 'register']
  const protectedRoutes = [
    'promo_dashboard',
    'profile_dashboard',
    'history_dashboard',
    'customer_dashboard',
    'admin_dashboard',
    'users_dashboard',
    'admin_profile',
  ]

  const adminRoutes = ['admin_dashboard', 'users_dashboard', 'admin_profile']

  // If logged in, prevent access to login/register
  if (user && authRoutes.includes(to.name)) {
    return next('/customer_dashboard')
  }

  // If NOT logged in, prevent access to protected routes
  if (!user && protectedRoutes.includes(to.name)) {
    return next('/')
  }

  // Admin route check
  if (user && adminRoutes.includes(to.name)) {
    const { data: profile, error: profileErr } = await supabase
      .from('users') // or 'admins', depending on your table
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (profileErr || !profile?.is_admin) {
      console.warn('Access denied: Not an admin')
      return next('/customer_dashboard')
    }
  }

  return next()
})



export default router
