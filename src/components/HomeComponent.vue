<script >
import { useLoginStore } from '@/stores/loginStore.js';

export default {
  data() {
    return {
      isLoggedIn: true, // inicialmente true
      username: '',
    //   loginStore: useLoginStore() // Referencia unica
    };
  },
  // mounted() {
  //   const loginStore = useLoginStore();
  //   this.username = loginStore.username;
  //   loginStore.checkLocalStorage();
  //   console.log(`the component is now mounted.`);
  // },
  methods: {
    handleLogout() {
      this.loginStore.logout();
      this.$router.push('/login')
    }
  },
  watch: {
      'loginStore.isLoggedIn'(newValue) {
        this.isLoggedIn = newValue;
      }
    }
};
</script>

<template>
  <div class="greetings">
    <h1 class="green">You are logged in as {{ this.username }}</h1>
    <h3>
      You can 
      <span class="a2">buy</span> and
      <span class="a2">sale</span> with ease, but insightfully.
      <!-- <a href="" target="" rel="noopener">user</a> and
      <a href="" target="" rel="noopener">password</a>. -->
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

/* @media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
} */
</style>
