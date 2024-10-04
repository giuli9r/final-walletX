<script>
import { useLoginStore } from '@/stores/loginStore'
export default {
  data() {
    return {
      store: useLoginStore()
    }
  },
  mounted() {
    console.log('Log out is mounted')
  },
  methods: {
    logout() {
      console.log('Logging out!')
      this.store.logout()
    }
  }
}
</script>

<template>
  <div>
    <button @click="this.logout()">Log Out</button>
    <p>(byebye)</p>
  </div>
</template>

<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
