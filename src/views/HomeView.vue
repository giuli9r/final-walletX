<script>
import { useLoginStore } from '@/stores/loginStore.js';

export default {
  methods: {
    handleLogout() {
      const loginStore = useLoginStore();
      loginStore.logout();
    }
  }
};

// idea - buscar si el usuario ya se logueo, al momento de montar el componente
// methods: {
//     checkLocalStorageSessionState() {
//       return localStorage.getItem('loginStore.isLogged')
//     }
//   },
//   mounted() {
//     // methods can be called in lifecycle hooks, or other methods!
//     this.checkLocalStorageSessionState()
//   }

</script>

<template>
    <h3> Msg: {{ msg }}</h3>
    <h2>
        Hi! Welcome to HomeView,
    </h2>
    <p> file inside template defined in /views/HomeView </p>
    <button @click="handleLogout">Cerrar sesión</button>
</template>

<style scoped>

</style>