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
  mounted() {
    console.log(`The root view  mounted.`)
    console.log(`Detecting user logged....`)
    console.log('Var: '+ localStorage.getItem('isLoggedIn'))
    },
    data() {
      return {
        // isLoggedIn: false // Inicialmente en falso {no needed}
      };
    },
    methods: {
      // updateisLoggedIn(){                 {no needed}
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
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    background-color: rgb(248, 247, 243);
}
  
header .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}
</style>
