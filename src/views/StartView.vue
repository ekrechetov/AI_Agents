<script setup lang="ts">

</script>

<template>
  <div class="start-view">
    <div class="start-view-icon">💬</div>
    <h2>Start a conversation</h2>
    <p>Select an AI Agent from the sidebar to begin</p>
  </div>
</template>

<style scoped lang="scss">
.start-view {
  height: calc(100vh - 102px);
  margin-left: 70px;//todo: var(--sidebar-width) when it will be implemented
  margin-right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  background-color: rgb(243, 243, 229);
  text-align: center;

  &-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  h2 {
    margin: 0 0 0.5rem 0;
    color: #374151;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 1rem;
  }
}
</style>
