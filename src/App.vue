<script>
import WelcomeToLogin from './components/WelcomeToLogin.vue'
import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import { useLoginStore } from './stores/loginStore.js'

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
  created() {
    // const loginStore = useLoginStore();

    // // Verificar el estado del login al montar el componente
    // loginStore.checkLocalStorage();
    // // Sincronizar la variable isLogged con el estado del loginStore
    // this.isLogged = loginStore.isLogged;
  },
  watch: {
    'loginStore.showUsername'(newValue) {
      this.showUsername = newValue;
    },
    'loginStore.showPassword'(newValue) {
      this.showPassword = newValue;
    },
    'loginStore.isLogged'(newValue) {
      this.isLogged = newValue;
    }
  },
};
</script>

<template>
  <header>
    <div class="wrapper">
      <WelcomeToLogin v-show="!isLogged" msg="You are not logged in yet!" />
    </div>
  </header>
  <main>
    <LoginView v-show="!isLogged" />
  </main>
  <div>
    <HomeView v-show="isLogged" />
  </div>

</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

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
}
</style>
