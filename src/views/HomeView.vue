<script>
// defineProps({
//   msg: {
//     type: String,
//     required: true
//   }
// })
import { useLoginStore } from '@/stores/loginStore.js';

export default {
  setup() {
    const loginStore = useLoginStore();

    const handleLogout = () => {
      loginStore.logout();
    };

    return {
      handleLogout,
    };
  },
};
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