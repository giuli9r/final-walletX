<template>
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
</style>