<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useTabbarStore } from '@/stores/tabbarStore'
import type { TabbarItemType } from '@/types'

const tabbarStore = useTabbarStore()
const router = useRouter()

interface Props {
  tab: TabbarItemType;
}

const { tab } = defineProps<Props>()

const closeTab = (event: MouseEvent): void => {
  event.preventDefault()
  event.stopPropagation()
  tabbarStore.removeTab(tab)
  router.go(-1) /* go back by one record, the same as router.back() */
}

</script>

<template>
  <RouterLink
    :to="tab.path"
    v-slot="{isActive}"
    :title="tab.label"
  >
    <div :class="['tab', isActive && 'tab-active']">
      <span class="tab-label">{{ tab.label }}</span>
      <span v-if="isActive" class="pi pi-times tab-close-icon" @click="closeTab"></span>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
}

.tab {
  display: flex;
  align-items: center;
  background: rgb(214, 212, 212);
  transition: 0.3s;
  margin-right: calc($spacer / 2);
  padding: calc($spacer / 2) $spacer;
  border-radius: 5px 12px 0 0;
  color: $primary-text-color;
  white-space: nowrap;

  &-label {
    font-size: 16px;
    color: inherit;
    font-family: -apple-system,Roboto,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;
  }

  &-close-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.5);
    width: 20px;
    height: 20px;
    border-radius: 10px;
  }

  &-close-icon:hover {
    color: rgba(0, 0, 0, 1);
    background: rgb(162, 135, 243);
  }
}

.tab-active  {
  background: rgb(180, 163, 231);
  color: black;
}
</style>
