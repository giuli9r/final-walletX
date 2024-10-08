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
  <TransactionComponent :style="p20" bkgColor="LightGreen" title="Buy" />
</template>

<style scoped>
.login-container {
  flex: auto;
  width: 340px;
  height: 380px;
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: #b5ff93;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

footer {
  display: flex;
  justify-content: center; /* Centra horizontalmente */
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.input-group {
  margin-top: 22px;
  margin-bottom: 15px;
  font-weight: 200;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #666;
  margin-top: 22px;
}

.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  padding: 3px;
  font-weight: 700;
}

.input-with-toggle {
  display: flex;
  align-items: center;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

button {
  margin-left: 8px;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.login-button:hover {
  background-color: #218838;
}

.pa2 {
  display: flex;
  margin: 30px;
  color: #ededed69;
}

.center {
  justify-content: center;
}
</style>
