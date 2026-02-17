import { onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'

export function useClickOutside(
  elementRef: Ref<HTMLElement | null>,
  callback: () => void
): void {
  const handleClickOutside = (event: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
}

export function useSidebarToggle() {
  const isAnimating = ref(false)

  const handleAnimation = () => {
    if (!isAnimating.value) {
      isAnimating.value = true
      setTimeout(() => {
        isAnimating.value = false
      }, 300)
    }
  }

  return {
    isAnimating,
    handleAnimation
  }
}
