<script>
import ActionButton from './buttons/actionButton.vue';
import { useTransactionStore } from '@/stores/transactionStore.js';

export default {
  props: {
    title: String,
    buttonLabel: String,
  },
  components: {
    ActionButton,
  },
  data() {
    return {
      quantity: 0,
      selectedCrypto: '',
      selectedFiat: 'USD',
      cryptos: ['Bitcoin', 'Ethereum', 'Ripple', 'Litecoin', 'Cardano'],
    }
  },
  methods: {
    submitAction() {
      if (!this.selectedCrypto) {
        alert('Please select a crypto.');
        return;
      }
      // Lógica de compra o venta
      console.log(`${this.buttonLabel} ${this.quantity} ${this.selectedCrypto}`);
    },
  },
}
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <form @submit.prevent="submitAction">
      <label>Quantity</label>
      <input type="number" v-model="quantity" required min="0" />
      
      <label>Crypto</label>
      <select v-model="selectedCrypto">
        <option disabled value="">Select Crypto</option>
        <option v-for="crypto in cryptos" :key="crypto" :value="crypto">{{ crypto }}</option>
      </select>
      
      <label>Fiat Currency</label>
      <select v-model="selectedFiat" disabled>
        <option value="USD">USD Dollar</option>
        <option value="EUR">Euro</option>
        <option value="ARS">Peso AR</option>
        <option value="AUD">Dolar Australiano</option>
      </select>
      
      <ActionButton :label="buttonLabel" />
    </form>
  </div>
</template>

<style scoped>
.transaction-box {
  width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

input[type="number"] {
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>