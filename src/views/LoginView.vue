<script >
import { useLoginStore } from '@/stores/loginStore.js';
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  setup() {
    const loginStore = useLoginStore();
    const showUsername = loginStore.showUsername;
    const showPassword = loginStore.showPassword;
    const logged = loginStore.isLogged;
    const toggleUsernameVisibility = () => { loginStore.toggleUsernameVisibility }
    const togglePasswordVisibility = () => { loginStore.togglePasswordVisibility }

    const handleLogin = () => {
      // Aquí podrías implementar una verificación del usuario real
      if (username.value !== '' && password.value !== '') {
        loginStore.loginToLocal(username.value, password.value );
      } else {
        alert('Credenciales incorrectas');
      }
    }
    const alertUP = () => {
      loginStore.alertUP();
    };

    return {
      handleLogin, showUsername, showPassword, logged, toggleUsernameVisibility, togglePasswordVisibility, alertUP
    };

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
          :type="showUsername ? 'text' : 'password'"
          id="username"
          v-model="username"
          />
          <button @click="toggleUsernameVisibility()">
            {{ showUsername ? 'Hide' : 'Show' }}
          </button>
        </div>
        
        <label for="password">Password</label>
        <div class="input-with-toggle">
          <input
          :type="showPassword ? 'text' : 'password'"
          id="password"
          v-model="password"
          />
          <button @click="togglePasswordVisibility()">
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
        </div>
      </div>
      
      <button class="login-button" @click="handleLogin(username.value, password.value)">Login</button>
      <button id="showUP" style="margin-top: 20px; font-size: 0.9em;" v-show="!logged" @click="alertUP()">
        Show User and Encrypted Password 
      </button>
      <p style="font-size: 0.8em; color: #999; margin-top: 10px;" v-show="logged">Login Info: logged</p>
      <p style="font-size: 0.8em; color: #999; margin-top: 10px;" v-show="!logged">Login Info: not logged</p>
    </div>
    <footer class="green">
      <span class="pa"> © 2024 Final S.A. All Rights Reserved. </span>
    </footer>
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