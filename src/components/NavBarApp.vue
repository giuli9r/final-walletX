<script>
import { mapStores, mapState } from 'pinia'
import { useLoginStore } from '@/stores/loginStore.js'

export default {
  data() {
    return {
      // isLoggedIn: false // Inicialmente en falso,
    }
  },
  components: {},
  computed: {
    // note we are not passing an array, just one store after the other
    // each store will be accessible as its id + 'Store'
    ...mapState(useLoginStore, ['username', 'isLoggedIn']),
    ...mapStores(useLoginStore)
  },
  mounted() {
    console.log(`The NavBar view  mounted.`)
    console.log(`Detecting user logged....`)
    console.log('Var: ' + localStorage.getItem('isLoggedIn'))
    // this.loginStore.checkLocalStorage();
  },
  methods: {
    updateisLoggedIn() {
      this.isLoggedIn = true
    }
  }
}
</script>

<template>
  <nav class="navbar">
    <ul class="nav-links">
      <li v-if="this.loginStore.isLoggedIn" >
      <!-- <li v-if="this.isLoggedIn"> -->
        <router-link to="/">Home</router-link>
      </li>
      <li v-if="this.loginStore.isLoggedIn" >
      <!-- <li v-if="this.isLoggedIn"> -->
        <router-link to="/transactions">Transactions</router-link>
      </li>
      <li v-if="this.loginStore.isLoggedIn" >
      <!-- <li v-if="this.isLoggedIn"> -->
        <router-link to="/statistics">Statistics</router-link>
      </li>
      <li v-if="this.loginStore.isLoggedIn" >
      <!-- <li v-if="this.isLoggedIn"> -->
        <router-link to="/history">History</router-link>
      </li>
      <li v-if="this.loginStore.isLoggedIn" >
      <!-- <li v-if="this.isLoggedIn"> -->
        <router-link to="/help">Help</router-link>
      </li>
      <li v-if="this.loginStore.isLoggedIn" >
      <!-- <li v-if="this.isLoggedIn"> -->
        <router-link to="/example">Example</router-link>
      </li>

      <li v-if="!this.loginStore.isLoggedIn" >
      <!-- <li v-if="this.isLoggedIn"> -->
        <router-link to="/login">Log In</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #fff;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links li {
  font-size: 1.1rem;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.nav-links a:hover {
  color: #000;
  border-bottom: 2px solid #000;
}

.nav-links a.router-link-exact-active {
  color: #000;
  border-bottom: 2px solid #000;
}
</style>

