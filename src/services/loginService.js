import { useLoginStore } from '@/stores/loginStore.js';

export function handleLogin(username, password) {
  const loginStore = useLoginStore();

  // validations 
    if( username == null || (username).trim() == ''){
      alert("Username can not be empty or spaces only.")
      return;
    }
    if( username.length <= 4 ){
      alert("Username should have at least 5 characters.")
      return;
    }
    if( username.length > 20 ){
      alert("Username is 20 characters max.")
      return;
    }
    if( password.length > 30 ){
      alert("Long passwords are hard to remember.")
    }
    if( password.length < 5 ){
      alert("Short passwords are weakly safe.")
    }
    if (/^[a-zA-Z0-9]{5,20}$/.test(username)) {
        // si todo sale bien , se llama a loginstore.loginToLocal(user , password)
        loginStore.loginToLocal(username, password);
    } else {
      return alert('Only alphanumeric characters are allowed.');
    }

}