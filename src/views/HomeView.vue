<script>
import { useLoginStore } from '@/stores/loginStore.js';
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

export default {
  data() {
    return {
      isLogged: true, // inicialmente true
      loginStore: useLoginStore() // Referencia unica
    };
  },
  components: {
    NavBar,
    Footer,
  },
  created() {
    const loginStore = useLoginStore();
    // Verificar el estado del login al montar el componente
    loginStore.checkLocalStorage();
    // Sincronizar la variable isLogged con el estado del loginStore
    this.isLogged = loginStore.isLogged;
  },
  methods: {
    handleLogout() {
      this.loginStore.logout();
      this.$router.push('/login')
    }
  },

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

  watch: {
      'loginStore.isLogged'(newValue) {
        this.isLogged = newValue;
      }
    }
};

</script>

<template>
  <div>
    <NavBar />
    <div id="main-content">
      <router-view />
    </div>
    <Footer />
  </div>

    <!-- <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
    </nav>
    <router-view></router-view>  
    <div>
      <h3> Msg: {{ msg }}</h3>
      <h2>
        Hi! Welcome to HomeView,
      </h2>
      <button @click="handleLogout">Cerrar sesión</button>
    </div> -->
</template>

<style scoped>
#main-content {
  flex-grow: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
}

</style>

