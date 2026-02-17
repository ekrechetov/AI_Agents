<template>
  <button
    :class="[
      'btn',
      `btn-${variant}`,
      `btn-${size}`,
      { 'btn-disabled': disabled }
    ]"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  ariaLabel?: string
}

defineProps<Props>()
defineEmits<{
  click: []
}>()
</script>

<style scoped>
.btn {
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.btn:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

/* Sizes */
.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn-md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* Variants */
.btn-primary {
  background-color: #4f46e5;
  color: white;
}

.btn-primary:hover:not(.btn-disabled) {
  background-color: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.btn-secondary {
  background-color: #e5e7eb;
  color: #1f2937;
}

.btn-secondary:hover:not(.btn-disabled) {
  background-color: #d1d5db;
}

.btn-ghost {
  background-color: transparent;
  color: #4f46e5;
}

.btn-ghost:hover:not(.btn-disabled) {
  background-color: rgba(79, 70, 229, 0.1);
}

.btn-danger {
  background-color: #ef4444;
  color: white;
}

.btn-danger:hover:not(.btn-disabled) {
  background-color: #dc2626;
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
