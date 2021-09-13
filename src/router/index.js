import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import store from '@/store.js';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      authRequired: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      authRequired: true
    }
  },
  {
      path: '/sign-in',
      name: 'signin',
      component: () => import('../views/Signin.vue')
  },
  {
    path: '/join',
    name: 'join',
    component: () => import('../views/Join.vue')
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
      if (!store.state.isAuthenticated) {
          next({
              path: '/sign-in'
          });
      } else {
          next();
      }
  } else {
      next();
  }
});

export default router
