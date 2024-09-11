import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', () => {
  //state
  const count = ref(10)
  const showDiv = ref(true)
  const isLogged = ref(true)
  
  //getters
  const doubleCount = computed(() => count.value * 5)
  
  //actions 
  function increment() {
    count.value++
  }

  return { count, showDiv, isLogged, doubleCount, increment }
})
