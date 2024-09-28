<script>
import { mapStores } from 'pinia'
import { useLoginStore } from '@/stores/loginStore'

export default {
 
  data(){
    return {
      isLoggedIn: localStorage.getItem('isLoggedIn')?? 0
    }
  },
  components:{

  },
  computed: {
    // note we are not passing an array, just one store after the other
    // each store will be accessible as its id + 'Store'
    ...mapStores(useLoginStore)
  },

};
</script>


<template>
  <nav class="navbar">
    <ul class="nav-links">
      <li v-if="this.loginStore.isLoggedIn" >
        <router-link to="/">Home</router-link>
      </li>
      <li v-if="this.loginStore.isLoggedIn" >
        <router-link to="/transactions">Transactions</router-link>
      </li>
      <li v-if="this.loginStore.isLoggedIn" >
        <router-link to="/statistics">Statistics</router-link>
      </li>
      <li v-if="this.loginStore.isLoggedIn" >
        <router-link to="/history">History</router-link>
      </li>
      <li v-if="this.loginStore.isLoggedIn" >
        <router-link to="/help">Help</router-link>
      </li>

      <li v-if="!this.loginStore.isLoggedIn">
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





<!-- <template>
    <nav>
      <ul>
        <li><router-link to="/transactions">Transactions</router-link></li>
        <li><router-link to="/statistics">Statistics</router-link></li>
        <li><router-link to="/history">History</router-link></li>
        <li><router-link to="/help">Help</router-link></li>
      </ul>
      <div class="icons">
        <button @mouseover="showTooltip = true" @mouseleave="showTooltip = false">
          <i class="fa fa-wallet"></i>
          <span v-if="showTooltip">CryptoX de usuario</span>
        </button>
        <button>
          <i class="fa fa-bell"></i>
        </button>
        <button @click="logout">
          <i class="fa fa-sign-out"></i>
        </button>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showTooltip: false,
      }
    },
    methods: {
      logout() {
        // Lógica de logout
        console.log("Logout")
      },
    },
  }
  </script>
  
  <style scoped>
  /* Estilos del nav */
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .icons button {
    margin: 0 10px;
  }

  .navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links a {
  text-decoration: none;
  color: #000;
  font-weight: 500;
}

.nav-icons button {
  background: none;
  border: none;
  margin-left: 15px;
  cursor: pointer;
}

.nav-icons i {
  font-size: 1.5rem;
  color: #000;
}

.tooltip {
  position: absolute;
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  top: 40px;
  white-space: nowrap;
}
</style> -->