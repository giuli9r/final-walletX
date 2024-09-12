<script >
import WelcomeToLogin from './components/WelcomeToLogin.vue'
import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import { useLoginStore } from './stores/loginStore.js'

//desde aca
export default {
  components: {
    WelcomeToLogin,
    LoginView,
    HomeView,
  },
  setup() {
    // const authStore = useAuthStore();
    const loginStore = useLoginStore()

    // Verificar el estado del login al montar el componente
    loginStore.checkLocalStorage();

    return {
      isLogged: loginStore.isLogged,
    };
  },
};
// hasta aca
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->
    <div class="wrapper">
      <WelcomeToLogin v-if="!isLogged" msg="You are not logged in yet!" />
    </div>
  </header>
  <main>
    <!-- <TheWelcome /> -->
    <LoginView v-if="!isLogged" msgLogin="LoginView from App" />
  </main>
  <div>
    <HomeView v-if="isLogged" msg="msg1 from App"  />
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
