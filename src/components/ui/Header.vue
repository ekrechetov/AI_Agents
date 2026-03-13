<script setup lang="ts">
import Button from 'primevue/button'

const emit = defineEmits([ 'toggle-sidebar' ])

</script>

<template>
  <header class="header">
    <Button
      icon="pi pi-bars"
      variant="text"
      rounded
      size="large"
      aria-label="Sidebar button"
      @click="emit('toggle-sidebar')"
    />
    <h1 class="header-title">
      AI Agents
    </h1>
  </header>
</template>

<style scoped lang="scss">

  .header {
    display: flex;
    align-items: center;
    width: 100%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.6);
    background: white;
    padding: $spacer $spacer-2;

    .p-button-text {
      color: $primary-color;
    }

    &-title {
      margin-left: calc($spacer-2);
      font-family: -apple-system,BlinkMacSystemFont,Roboto,Segoe UI,Helvetica,Arial,sans-serif;
      color: $primary-color;
      font-size: 22px;
      line-height: 22px;
      letter-spacing: .05em;
      font-weight: 700;
    }
  }

@media screen and (min-width: 480px) {
  .header {
    &__title {
      font-size: 24px;
      line-height: 24px;
    }
  }
}

@media screen and (min-width: 768px) {
  .header {
    &-title {
      font-size: 30px;
      line-height: 30px;
    }
  }
}

@media screen and (min-width: 1500px) {
  .header {
    padding-bottom: $spacer-2;
    &-title {
      font-size: 36px;
      line-height: 40px;
    }
  }
}
</style>
