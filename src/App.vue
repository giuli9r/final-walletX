<script>
import Footer from '@/components/Footer.vue'
import NavBarComponent from '@/components/NavBarApp.vue'
// import { useLoginStore } from '@/stores/loginStore.js'

export default {
  created() {
    document.title = "CryptoX";
  },
  components: {
    NavBarComponent,
    Footer
  },
  // data() {
  //   return {
  //     isLoggedIn: false // Inicialmente en falso,
  //   };
  // },
  methods: {
    // updateisLoggedIn(){
    //   this.isLoggedIn = true;
    // }
  }
};
</script>

<template>
  <NavBarComponent/>
  <router-view/>
  <Footer/>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    background-color: rgb(248, 247, 243);
  }
  
  .logo {
    margin: 0 2rem 0 0;
  }
  
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

.transaction-box {
      width: 100%;
      padding: 15px;
    }
    
    .navbar ul {
      flex-direction: column;
      gap: 10px;
    }
    
    .nav-icons {
      display: flex;
      flex-direction: row;
      gap: 10px;
    }

/* 
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  
  .logo {
    margin: 0 2rem 0 0;
  }
  
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
/*   
  @media (max-width: 600px) {
    .transaction-box {
      width: 100%;
      padding: 15px;
    }
    
    .navbar ul {
      flex-direction: column;
      gap: 10px;
    }
    
    .nav-icons {
      display: flex;
      flex-direction: row;
      gap: 10px;
    }
  } */
</style>
