import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const showDiv = ref(true)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, showDiv, doubleCount, increment }
})
