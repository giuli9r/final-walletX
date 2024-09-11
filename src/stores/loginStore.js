import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', () => {
  //state
  const count = ref(10)
  const showDiv = ref(true)
  const isLogged = ref(true)
  const showUsername = ref(true)
  const showPassword = ref(false)
  
  var user = "Me";
  var password = "Secret";
  // user: ref(''),
  // pass: ref(''),
  // data: null,
  // error: null,
  // userInfo: ""

  //getters
  const doubleCount = computed(() => count.value * 5)
  
  //actions 
  function increment() {
    count.value++
  }

  function toggleUsernameVisibility() {
    showUsername.value = !showUsername.value;
  }
  function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
  }

  function loginToLocal(userP, passP){ 
    // this.user = userP;
    // var encodedPassword = btoa(passP);
    // this.pass = encodedPassword;  // ocultar password en b64
    
    //validations 
    // if( userP == null || (userP).trim() == ''){
    //   alert("Username can not be empty or spaces only.")
    //   return;
    // }
    // if( userP.length <= 4 ){
    //   alert("Username should have at least 5 characters.")
    //   return;
    // }
    // if( userP.length > 20 ){
    //   alert("Username is 20 characters max.")
    //   return;
    // }
    // if( passP.length > 35 ){
    //   alert("Long passwords are hard to remember.")
    // }
    // if( passP.length < 5 ){
    //   alert("Short passwords are weakly safe.")
    // }
    // if (/^[a-zA-Z0-9]{4,20}$/.test(userP)) {
    //   this.user = userP;
    //   var encodedPassword = btoa(passP);
    //   this.pass = encodedPassword;  // ocultar password en b64
    // } else {
    //   return alert('Only alphanumeric characters are allowed.');
    // }
    
    // // assign user and pass to localStorage
    // localStorage.setItem('userName', this.user );
    // localStorage.setItem('password', this.pass );
    // localStorage.setItem('isLogged', true );
    // this.isLogged = true;
    // //redirect
    // // router.push('/home')
    // // router.push({ path: '/home' })
    console.log("Logged IN!")
  }

  return { count, showDiv, isLogged, showUsername, showPassword, doubleCount,
    increment, toggleUsernameVisibility, togglePasswordVisibility,
    loginToLocal
   }
})
