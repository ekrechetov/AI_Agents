<script setup lang="ts">
import TabbarItem from '@/components/features/TabbarItem.vue'
import { useTabbarStore } from '@/stores/tabbarStore'

const tabbarStore = useTabbarStore()

</script>

<template>
  <ul class="tab-container">
    <li v-for="tab in tabbarStore.tabs" :key="tab.label">
      <TabbarItem :tab="tab" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
.tab-container {
	display: flex;
	background: rgb(247, 245, 245);
	padding: 12px 12px 0 12px;
}
</style>
