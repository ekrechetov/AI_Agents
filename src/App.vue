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
