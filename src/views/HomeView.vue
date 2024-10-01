<script>
// import { useLoginStore } from '@/stores/loginStore.js';
// import LoginView from '@/views/LoginView.vue'
// import StatisticsView from '@/views/StatisticsView.vue'
// import HelpView from '@/views/HelpView.vue'
// import TransactionsView from '@/views/TransactionView.vue'
// import HomeComponentView from '@/components/HomeComponent.vue'

import { mapStores } from 'pinia'
import { useLoginStore } from '@/stores/loginStore'


export default {
  data() {
    return {
      
    };
  },
  components: {
    // LoginView,
    // StatisticsView,
    // HelpView, 
    // TransactionsView,
    // HomeComponentView,
  },
 
  computed: {
    // note we are not passing an array, just one store after the other
    // each store will be accessible as its id + 'Store' (loginStore)
    ...mapStores(useLoginStore)
  },

  methods: {
   
    buyStuff() {
      // use them anywhere!
      // if (this.userStore.isAuthenticated()) {
      //   await this.cartStore.buy()
      //   this.$router.push('/purchased')
      // }
    },
    showStoreHome(){
      console.log("Show Login Store from Home btn");
      console.log(useLoginStore.username);
      console.log(useLoginStore.password);
      console.log(useLoginStore.isLoggedIn);
    },
    showFromPinia(){
      this.loginStore.showStore();
    }

    
  },

};

</script>

<template>
  <div>
      <div id="main-content">
        <div class="greetings">
          <h1 class="green">You are logged in as {{ this.loginStore.username }}</h1>
          <h3>
            You can 
            <span class="a2">buy</span> and
            <span class="a2">sale</span> with ease, but at your own risk.
          </h3>
          <button @click="showStoreHome"> Click to console store From HOME</button>
          <button @click="showFromPinia"> Click to console store From PINIA</button>
      </div>
      <!-- <LoginView v-if="!this.loginStore.isLoggedIn"/>
      <TransactionsView  v-if="this.loginStore.isLoggedIn" />
      <StatisticsView  v-if="this.loginStore.isLoggedIn" />
      <HelpView  v-if="this.loginStore.isLoggedIn"/>  -->
    </div>
      <!-- <router-view /> -->
  </div>
   
</template>

<style scoped>
#main-content {
  flex-grow: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

/* @media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
} */

</style>

