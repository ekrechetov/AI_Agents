<script setup lang="ts">
import { computed } from 'vue'
import TabbarItem from '@/components/features/TabbarItem.vue'
import { useConversationStore } from '@/stores/conversationStore'

const conversations = computed(() => useConversationStore().conversations)
</script>

<template>
  <ul class="tab-container">
    <li v-for="conversation in conversations" :key="conversation.id">
      <TabbarItem :conversation="conversation" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
.tab-container {
  display: flex;
  align-items: end;
  min-height: 44px;
  padding: 12px 12px 0 12px;
}
</style>
