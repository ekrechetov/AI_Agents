import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { authRoutes } from '@/routes/authRoutes'
import { publicRoutes } from '@/routes/publicRoutes'

const routes = [
  ...publicRoutes,
  ...authRoutes,
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: NotFoundPage
  // }
] as RouteRecordRaw[]

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes
})

// Update document title on route change
router.beforeEach((to, _from, next) => {
  const title = to.meta.title as string | undefined
  if (title) {
    document.title = title
  }
  next()
})

export default router
