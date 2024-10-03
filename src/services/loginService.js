
export function handleLogin(username, password) {

  // validations 
    if( username == null || (username).trim() == ''){
      alert("Username can not be empty or spaces only.")
      return false;
    }
    if( password == null || (password).trim() == ''){
      alert("Password can not be empty or spaces only.")
      return false;
    }
    if( username.length <= 4 ){
      alert("Username should have at least 5 characters.")
      return false;
    }
    if( username.length > 20 ){
      alert("Username is 20 characters max.")
      return false;
    }
    if( password.length > 30 ){
      alert("Long passwords are hard to remember.")
    }
    if( password.length < 5 ){
      alert("Short passwords are weakly safe.")
    }
    if (/^[a-zA-Z0-9]{5,20}$/.test(username)) {
        // si todo sale bien , se retorna true para modificar el store
        // loginStore.loginToLocal(username, password);
        // router.push('/');
        return true;
    } else {
      alert('Only alphanumeric characters are allowed.');
      return false;
    }
}