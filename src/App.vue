<script>
import WelcomeToLogin from './components/WelcomeToLogin.vue'
import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import { useLoginStore } from '@/stores/loginStore.js'

export default {
  components: {
    WelcomeToLogin,
    LoginView,
    HomeView,
  },
  data() {
    return {
      isLogged: false, // Inicialmente en falso,
    };
  },
  methods: {
    updateIsLogged(){
      this.isLogged = true;
      console.log(this.isLogged)
      // this.isLogged = !this.isLogged
    }
  },
  // created() {
  //   const loginStore = useLoginStore();
  //   // Verificar el estado del login al montar el componente
  //   loginStore.checkLocalStorage();
  //   // Sincronizar la variable isLogged con el estado del loginStore
  //   this.isLogged = loginStore.isLogged;
  // },
  // watch: {
  //   'loginStore.showUsername'(newValue) {
  //     this.showUsername = newValue;
  //   },
  //   'loginStore.showPassword'(newValue) {
  //     this.showPassword = newValue;
  //   },
  //   'loginStore.isLogged'(newValue) {
  //     this.isLogged = newValue;
  //   }
  // },
};
</script>

<template>

  <!-- <div v-if="!isLogged">
    <header>
      <div class="wrapper">
        <WelcomeToLogin class="" msg="You are not logged in yet!" />
      </div>
    </header>
    <main>
      <LoginView @update-bool="updateIsLogged" /> 
    </main>
  </div>
  <div v-else>
    <router-view />
  </div> -->

  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link>
  </nav>
  <router-view />

</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    background-color: rgb(248, 247, 243);
  }
  
  .logo {
    margin: 0 2rem 0 0;
  }
  
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

.transaction-box {
      width: 100%;
      padding: 15px;
    }
    
    .navbar ul {
      flex-direction: column;
      gap: 10px;
    }
    
    .nav-icons {
      display: flex;
      flex-direction: row;
      gap: 10px;
    }

/* 
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  
  .logo {
    margin: 0 2rem 0 0;
  }
  
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
/*   
  @media (max-width: 600px) {
    .transaction-box {
      width: 100%;
      padding: 15px;
    }
    
    .navbar ul {
      flex-direction: column;
      gap: 10px;
    }
    
    .nav-icons {
      display: flex;
      flex-direction: row;
      gap: 10px;
    }
  } */
</style>
