<script>
// import { mapStores } from 'pinia';
import TransactionComponent from '@/components/TransactionComponent.vue'

export default {
  data() {
    return {
      count: 1,
      viewName: 'Transaction',
      p20: 'padding: 50px',
      mw75: 'max-width: 75%',
      currentDate: ''
    }
  },
  components: {
    TransactionComponent
  },

  methods: {
    increment() {
      this.count++
    },
    sayHi() {
      alert(this.viewName)
    }
  },
  mounted() {
    let dateObj = new Date();
    let options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    };
    // this.currentDate = dateObj.toLocaleDateString("es-AR", options)
    this.currentDate = dateObj.toLocaleDateString("en-US", options)
    console.log(`The ${this.viewName} view  mounted.`)
  }
}
</script>

<template>
  <h4 style="text-align: center">You are ready to star your movements</h4>
  <div style="text-align: center; margin-top: 20px;">
      <p>Today's Date: {{ currentDate }}</p>
  </div>

  <TransactionComponent :style="p20" bkgColor="Tomato" title="Sell" />
  <TransactionComponent :style="p20" bkgColor="Green" title="Buy" />
</template>

<style scoped>
h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

</style>
