<script>
import HistoryComponent from '@/components/HistoryComponent.vue';

export default {
  components: { HistoryComponent },
  data() {
    return {
      count : 1,
      viewName: "History of transactions",
    };
  },
  
  methods: {
    increment() {
      this.count++
    },
    sayHi(){
        alert(this.viewName)
    }
  },
  mounted() {
    console.log(`The ${this.viewName} view  mounted.`)
  }

};
</script>

<template>
  <br>
  <h2>{{ this.viewName }}</h2>
  <history-component style="width: 100%"></history-component>

</template>

<style scoped>
h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

</style>