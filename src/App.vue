<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'

import { useLoginStore } from './stores/loginStore.js'
const login = useLoginStore();

</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      <HelloWorld v-if="login.showDiv" msg="You are not logged in yet!" />
    </div>
  </header>
  
  <main>
    <!-- <TheWelcome /> -->
    <HomeView  v-if="login.showDiv" msg="msg1 from App"  />
    <LoginView v-if="login.showDiv" msgLogin="LoginView from App" />
  </main>


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
