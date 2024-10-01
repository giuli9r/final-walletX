<script>
// import { useLoginStore } from '@/stores/loginStore.js';
import { handleLogin } from '@/services/loginService.js';
import { mapState } from 'pinia';
import { mapStores } from 'pinia';
import { useLoginStore } from '@/stores/loginStore';
// import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      username: '',
      password: '',
      showUsername: true,
      showPassword: false,
      isLoggedIn: false,
    };
  },
  created() {
    // // Inicializamos las variables desde el store si existen
    // this.showUsername = this.loginStore.showUsername ?? "";
    // this.showPassword = this.loginStore.showPassword ?? "";
    // this.isLoggedIn = this.loginStore.isLoggedIn ?? false;
  },
  computed: {
    // note we are not passing an array, just one store after the other
    // each store will be accessible as its id + 'Store'
    ...mapStores(useLoginStore)
  },
  methods: {
    handleLogin() {
      // Implementar verificación de usuario
      if (this.username !== '' || this.password !== '') { 
        let check = handleLogin(this.username, this.password);
        // const router = useRouter() // Referencia unica
        // router.push('/'); // Redirige al usuario a la ruta de inicio
        if(check) {
          this.updateBool()
          this.$router.push('/')
        }
      } else {
        alert('Empty values are not allowed.');
      }
    },
    updateBool(){
      this.$emit('update-bool');
    },
    toggleUsernameVisibility() {
      this.loginStore.toggleUsernameVisibility();
    },
    togglePasswordVisibility() {
      this.loginStore.togglePasswordVisibility();
    },
    alertUP() {
      this.loginStore.alertUP();
    }
  }
};
</script>

<template>
  
  <div class="wrapper">
    <div class="login-container">
      <h2 class="green">Welcome!</h2>
      <div class="input-group">
        <label for="username">User</label>
        <div class="input-with-toggle">
          <input
          :type="this.loginStore.showUsername ? 'text' : 'password'"
          id="username"
          v-model="username"
          />
          <button @click="toggleUsernameVisibility()">
            {{ this.loginStore.showUsername ? 'Hide' : 'Show' }}
          </button>
        </div>
        
        <label for="password">Password</label>
        <div class="input-with-toggle">
          <input
          :type="this.loginStore.showPassword ? 'text' : 'password'"
          id="password"
          v-model="password"
          />
          <button @click="togglePasswordVisibility()">
            {{ this.loginStore.showPassword ? 'Hide' : 'Show' }}
          </button>
        </div>
      </div>
      
      <button 
      class="login-button" 
      @click="handleLogin()"
      >Login</button>
    
    </div>
  </div>
</template>


<style scoped>

.login-container {
  flex: auto;
  width: 340px;
  height: 380px;
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

footer{
  display: flex;
  justify-content: center; /* Centra horizontalmente */
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.input-group {
  margin-top: 22px;
  margin-bottom: 15px;
  font-weight: 200;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #666;
  margin-top: 22px;

}

.green {
text-decoration: none;
color: hsla(160, 100%, 37%, 1);
transition: 0.4s;
padding: 3px;
font-weight: 700
}

.input-with-toggle {
  display: flex;
  align-items: center;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

button {
  margin-left: 8px;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.login-button:hover {
  background-color: #218838;
}


.pa2 {
   display: flex;
    margin: 30px;
    color: #ededed69;
}

.center{
   justify-content: center
}
</style>