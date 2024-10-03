<script>
import { useProductStore } from '@/stores/exampleStore.js'
import {  mapStores, mapState, mapActions  } from 'pinia'

export default {
  data() {
    return {
      count : 1,
      viewName: "Example",
       pToAdd: { id: 5, name: "p5", quantity: 23, price: 32}
    };
  },
  computed: {
    ...mapState(useProductStore, ['countStoreState']),
    ...mapStores(useProductStore),
    // gives read access to this.count and this.double
  },
  methods: {
    ...mapActions(useProductStore, ['inc']),
  },
  mounted() {
    console.log(`The ${this.viewName} view  mounted.`)
  }
  
};
</script>

<template>
  
  <h2>{{ this.viewName }}</h2>
  <button @click="inc">Count is: {{ productStore.countStoreState }}</button>
  <button @click="sayHi">Hi!</button>

 <ul>
  <li v-for="product in productStore.products" :key="product.id">
    <p>Producto: {{ product.name }} </p>
    <p>Prquantityducto: {{ product.quantity }} </p>
    <p>price: {{ product.price }} </p>
  </li>
 </ul>

 <p>Cantidad: {{ productStore.productCount }}</p>
 <ul>
  <li v-for="product in productStore.productsCheaperThan(10)" :key="product.id">
    <p> Less than 10: {{ product.name }} </p>
  </li>
 </ul>
 <button @click="productStore.addProduct( this.pToAdd)">Add</button>
</template>

<style scoped>
h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
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
</style>
