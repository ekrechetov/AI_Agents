import StartView from '@/views/StartView.vue'
// import AiChatView from '@/views/AiChatView.vue'
import type { RouteRecordRaw } from 'vue-router'

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'startView',
    component: StartView,
    meta: {
      title: 'AI Agents - Start'
    }
  },
  //   {
  //   path: '/ai-chat',
  //   name: 'aiChatPage',
  //   component: ChatView
  // },
  // {
  //   path: '/ai-pdf',
  //   name: 'aiPdfPage',
  //   component: AiPdfPage
  // }
]
