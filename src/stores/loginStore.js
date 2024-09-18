import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', {
  state: () => ({
    isLogged: false,
    count : 10,
    showUsername : true,
    showPassword : false,
    username : "",
    password : "",
  }),
  
  getters: {
    doubleCount2: (state) => state.count * 2
  },
  
  actions: {
    increment() {
      this.count++
    },
    alertUP() {
      if(this.username){
        alert(this.username +" logged")
        return 
      } else { 
        alert("Not logged yet")
      }
    },

    loginToLocal(u, p) {
      // Login already validated
      this.isLogged = true;
      this.username = u;
      this.password = p;
      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('username', u);
      localStorage.setItem('password', btoa(p));
    },

    login() {
      this.isLogged = true;
      localStorage.setItem('isLogged', 'true');
    },
    logout() {
      this.isLogged = false;
      localStorage.setItem('isLogged', 'false');
      alert("Logged out!");
    },
    checkLocalStorage() {
      const storedStatus = localStorage.getItem('isLogged');
      this.isLogged = storedStatus === 'true';
    },
    toggleUsernameVisibility() {
      this.showUsername = !this.showUsername;
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
  }

});
