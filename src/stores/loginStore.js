import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', {
  state: () => ({
    isLoggedIn: false,
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
    showStore(){
      console.log("Show From Login Store")
      console.log(this.isLoggedIn)
      console.log("count_ "+ this.count)
      console.log(this.showUsername)
      console.log(this.username)
      console.log(this.password)
    },
    loginToLocal(u, p) {
      // Login already validated
      this.isLoggedIn = true;
      this.username = u;
      this.password = p;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', u);
      localStorage.setItem('password', btoa(p));
    },
    logout() {
      this.isLoggedIn = false;
      localStorage.setItem('isLoggedIn', 'false');
      alert("Logged out!");
    },
    checkLocalStorage() {
      const storedStatus = localStorage.getItem('isLoggedIn');
      this.isLoggedIn = storedStatus === 'true';
    },
    toggleUsernameVisibility() {
      this.showUsername = !this.showUsername;
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
  }

});
