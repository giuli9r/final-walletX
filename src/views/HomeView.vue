<script>
import { useLoginStore } from '@/stores/loginStore'
import {  mapStores, mapState, mapActions, mapGetters  } from 'pinia'

export default {
  data() {
    return {
      username: ''
    };
  },
  components: {
  },
  computed: {
    // each store will be accessible as its id + 'Store' (loginStore)
    ...mapState(useLoginStore, ['username', 'password', 'isLoggedIn' ]),
    ...mapStores(useLoginStore),    // loginStore.isLoggedIn, loginStore.showUserName, loginStore.username
  },
  methods: {
    ...mapActions(useLoginStore, [ 'logout',
                                  'checkLocalStorage',
      ]),
    showStoreHome(){
      console.log("Show Login Store from Home btn");
      console.log(this.loginStore.isLoggedIn);
      console.log(this.loginStore.username);
      console.log(this.loginStore.password);
    },
    showFromPinia(){
      this.loginStore.showStore();
    },
    updateisLoggedIn(){
      this.isLoggedIn = true;
    }
  },
  mounted() {
    console.log(`The HomeView  mounted.`)
    this.username = localStorage.getItem('username')?? 'ASD';
    // this.loginStore.loggedIn()
  },

};

</script>

<template>
  <div>
      <div id="main-content">
        <div class="greetings">
          <!-- <h1 class="green">You are logged in as {{ loginStore.username }}</h1> -->
          <h1 class="green">You are logged in as {{ this.username }}</h1>
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

