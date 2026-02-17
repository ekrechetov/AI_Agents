<script setup lang="ts">
import { RouterView } from 'vue-router'
import Layout from '@/components/features/Layout.vue'
</script>

<template>
  <Layout>
    <template v-slot:page>
      <router-view />
    </template>
   </Layout>
</template>




<!-- styles remove! in main.ts for global application -->
<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  overflow: hidden;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f9fafb;
  color: #1f2937;
}

#app {
  height: 100vh;
  width: 100%;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}

/* Focus visible styles for accessibility */
:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

/* Selection styling */
::selection {
  background-color: #4f46e5;
  color: white;
}

/* Reduced motion for animations */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
