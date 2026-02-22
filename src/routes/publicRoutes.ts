import StartView from '@/views/StartView.vue'
import FriendlyChatView from '@/views/friendlyChat/FriendlyChatView.vue'
import PdfExtractorView from '@/views/pdfExtractor/PdfExtractorView.vue'
import type { RouteRecordRaw } from 'vue-router'

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'startView',
    component: StartView,
    // meta: {
    //   title: 'AI Agents - Start'
    // }
  },
    {
    path: '/friendly-ai-chat',
    name: 'friendlyAiChatView',
    component: FriendlyChatView
  },
  {
    path: '/pdf-extractor',
    name: 'PdfExtractorView',
    component: PdfExtractorView
  }
]
