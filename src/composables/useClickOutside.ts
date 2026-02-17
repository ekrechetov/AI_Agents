import { onMounted, onBeforeUnmount, type Ref } from 'vue'

export function useClickOutside (
  elementRef: Ref<HTMLElement | null>,
  callback: () => void
) {
  let ignoreClick = false

  const handleClick = (event: MouseEvent) => {
    if (ignoreClick) return
    const el = elementRef.value
    if (!el) return

    // If the click was outside the element, we call the callback
    if (!el.contains(event.target as Node)) {
      callback()
    }
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      callback()
      // Remove focus from the active element
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKeydown)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClick)
    document.removeEventListener('keydown', handleKeydown)
  })

  // функция, которая вызывается перед открытием, чтобы игнорировать клик, открывший панель
  const skipNextClick = () => {
    ignoreClick = true
    setTimeout(() => (ignoreClick = false), 0)
  }

  return { skipNextClick }
}
