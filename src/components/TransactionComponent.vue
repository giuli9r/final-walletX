<script>
import ActionButton from './buttons/actionButton.vue';
import { useTransactionStore } from '@/stores/transactionStore.js';

export default {
  props: {
    title: String,
    bkgColor: String,
    buttonLabel: String,
  },
  components: {
    ActionButton,
  },
  data() {
    return {
      cryptoQuantity: 0,
      fiatQuantity: 0,
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
      console.log(`${this.buttonLabel} ${this.cryptoQuantity} ${this.selectedCrypto} at ${this.fiatQuantity} `);
    },
  },
}
</script>

<template>
  <div>
    <h2 :style="{ backgroundColor: bkgColor }" >{{ title }} crypto</h2>
    <form @submit.prevent="submitAction">
      <label>Quantity to {{ title }}</label>
      <input type="number" min="0" step="0.0000001" v-model="cryptoQuantity" required/>
      
      <label>Crypto Currency</label>
      <select v-model="selectedCrypto">
        <option disabled value="">Select Crypto</option>
        <option v-for="crypto in cryptos" :key="crypto" :value="crypto">{{ crypto }}</option>
      </select>

      <hr class="divider">

      <label>Fiat Amount</label>
      <input type="number" min="0" step="0.0000001" v-model="fiatQuantity" required/>
      <label>Fiat Currency</label>

      <select v-model="selectedFiat">
        <option value="USD">USD Dollar</option>
        <option value="EUR">Euro</option>
        <option value="ARS">Peso AR</option>
        <option value="AUD">Dolar Australiano</option>
      </select>
      
      <ActionButton style="margin-top: 15px;" :label="buttonLabel" :bkgColorHover="bkgColor"/>
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

  color: #333; 
  padding: 10px 20px; 
  text-align: center;
  border-radius: 15px; 
  border: 1px solid #b8b8b8; 
  margin: 20px auto;
  width: 75%; 
  max-width: 650px;
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

.divider {
  border: none; 
  border-top: 2px solid #f0dcdc;  
  margin: 18px 0; 
}

.divider:hover {
  border-top: 3px solid #f8aaaa;  
  margin: 18px 0; 
}
</style>