<script>
import { useLoginStore } from '@/stores/loginStore.js'
import LogoutComponent from '@/components/LogoutComponent.vue'

export default {
  data() {
    return {
      store: useLoginStore() // unica instancia de  id+Store.js en el componente
    }
  },
  components: { LogoutComponent },
  computed: {
    username() {
      let username = localStorage.getItem('username') != '' ? localStorage.getItem('username') : this.store.username ;
      return username
    },
    isLoggedIn() {
      return this.store.isLoggedIn
    }
  },
  methods: {
    increment() {
      this.store.increment() // forma para recuperar actions del Store.js
    }
  },
  mounted() {
    console.log(`The HomeView  mounted.`)
  }
}
</script>

<template>
  <div>
    <div id="main-content">
      <div class="greetings">
        <!-- <h1 class="green">You are logged in as {{ loginStore.username }}</h1> -->
        <h1 class="green">You are logged in as {{  this.username }}</h1>
        <h3>
          You can
          <span class="a2">buy</span> and <span class="a2">sale</span> with ease, but at your own
          risk.
        </h3>
        <hr class="divider" />

        <div>
          <logout-component />
        </div>
      </div>
    </div>
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

.divider {
  border: none;
  border-top: 2px solid #f0dcdc;
  margin: 18px 0;
}
</style>
