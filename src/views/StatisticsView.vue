<script>
import StatisticsComponent from '@/components/StatisticsComponent.vue';

export default {
  components: { StatisticsComponent },
  data() {
    return {
      count: 1,
      viewName: 'Statistics'
    }
  },

  methods: {
  },
  mounted() {
    console.log(`The ${this.viewName} view  mounted.`)
  }
}
</script>

<template>
  <h2>{{ this.viewName }} of transactions</h2>
  <statistics-component></statistics-component>
</template>

<style scoped>
.login-container {
  flex: auto;
  width: 340px;
  height: 380px;
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f5f5f5;
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
