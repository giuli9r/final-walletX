import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
  state: () => ({
    isLoggedIn: false,
    showUsername: true,
    showPassword: false,
    username: '',
    password: ''
  }),

  getters: {
    getUsername: (state) => state.username
  },

  actions: {
    loggedIn() {
      this.isLoggedIn = true
    },
    loginToLocal(u, p) {
      // Login already validated
      this.isLoggedIn = true
      this.username = u
      this.password = p
      localStorage.setItem('isLoggedIn', true)
      localStorage.setItem('username', u)
      localStorage.setItem('password', btoa(p))
    },
    logout() {
      this.isLoggedIn = false
      localStorage.clear();      
      window.location.reload()
    },
    checkLocalStorage() {
      const storedStatus = localStorage.getItem('isLoggedIn')
      this.isLoggedIn = storedStatus === true
    },
    toggleUsernameVisibility() {
      this.showUsername = !this.showUsername
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    }
  }
})
