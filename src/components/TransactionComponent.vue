<script>
import { useCryptoStore } from '@/stores/cryptos.js';
import { useTransactionStore } from '@/stores/transactionStore.js';
import { useLoginStore } from '@/stores/loginStore.js';
import ActionButton from './buttons/actionButton.vue'
// import { useTransactionStore } from '@/stores/transactionStore.js';

export default {
  props: {
    title: String,
    bkgColor: String
    // buttonLabel: String
  },
  components: {
    ActionButton
  },
  data() {
    return {
      cryptoStore: useCryptoStore(),
      transactionStore: useTransactionStore(),
      loginStore: useLoginStore(),
      cryptoAmount: 0,
      fiatAmount: 0, // a calcular con los datos devueltos de la API
      exchangeWinnerPrice: '',   // Exchange con mejor precio
      selectedCrypto: '', // BTC, ETH, RIP, LIT, CAR
      selectedFiat: 'ARS', // AR, USD
      cryptos: [
        { name: 'Bitcoin', code: 'BTC'}, 
        { name: 'Ethereum', code: 'ETH'}, 
        { name: 'DAI', code: 'BTC'}, 
        { name: 'Solana', code: 'SOL'}, 
        { name: 'USDT', code: 'USDT'},
      ]
    }
  },
  methods: {
    async updateOnChange() {
      let key = this.selectedCrypto.toLowerCase();
      // if ( !JSON.parse(localStorage.getItem('crypto-key')) ) {
      //   this.cryptoStore.fetchCryptosPrices();
      // } 

      const cryptoStorage = JSON.parse(localStorage.getItem('crypto-key'));
      const allCryptos = cryptoStorage.cryptos;
      const exchangeList = allCryptos[key];
      let minPriceInMarket = Number.MAX_VALUE;
      let maxPriceInMarket = Number.MIN_VALUE;
      let exchangeWinner = "";

      if (exchangeList) {
      if( this.action == 'purchase') {
        // totalAsk = Precio de compra final incluyendo las comisiones de transferencia y trade
        // si quiero comprar tengo que buscar el menor precio
        Object.keys(exchangeList).forEach((key) => {
          if (exchangeList[key].totalAsk < minPriceInMarket && exchangeList[key].totalAsk != 0) {
            minPriceInMarket = exchangeList[key].totalAsk;   
            exchangeWinner = key;
          }
        });
        this.fiatAmount = (minPriceInMarket * this.cryptoAmount).toFixed(2)
      console.log(`Crypto de ${ exchangeWinner } al mejor precio: ${ minPriceInMarket }`);
      }

      // totalBid = Precio de venta final incluyendo las comisiones de transferencia y trade
      if( this.action == 'sale') {
        // si quiero vender tengo que buscar el mayor precio
        Object.keys(exchangeList).forEach((key) => {
          if (exchangeList[key].totalBid > maxPriceInMarket && exchangeList[key].totalBid != 0) {
            maxPriceInMarket = exchangeList[key].totalBid;   
            exchangeWinner = key;
          }
        });
        this.fiatAmount = (maxPriceInMarket * this.cryptoAmount).toFixed(2)
      console.log(`Crypto de ${ exchangeWinner } al mejor precio: ${ maxPriceInMarket }`);
      }
      this.exchangeWinnerPrice =  exchangeWinner.toUpperCase();
      }
      return;
    },

    async submitAction() {
      if (!this.selectedCrypto) {
        alert('Please select a crypto.')
        return
      }
      if (!this.cryptoAmount) {
        alert('Please enter a value greater than 0.')
        return
      }

      let datetime = this.getTime();
      let username = localStorage.getItem('username');
      let action = this.title == 'Sell' ? 'sale' : 'purchase';
      let transactionData = {
        user_id: username,
        action: action,
        crypto_code: this.selectedCrypto,
        crypto_amount: this.cryptoAmount,
        money: this.fiatAmount,
        datetime: datetime, // DD-MM-YYYY hh:ss
      };

        console.log( `${this.title} ${this.cryptoAmount} ${this.selectedCrypto} at ${this.fiatAmount} - ${action} ` )
        console.log(`transactionData object `, transactionData)
      let response = await this.transactionStore.addTransaction(transactionData); // API CALL
      this.resetFormValuesToNull();

      return response
    },
    getTime(){
      const fecha = new Date();
      // Extraer día, mes, año, hora
      const dd = ("0" + fecha.getDate()).slice(-2);
      const mo = ("0" + (fecha.getMonth() + 1)).slice(-2); // Los meses en JavaScript van de 0 a 11
      const yy = fecha.getFullYear();
      const hh = ("0" + fecha.getHours()).slice(-2);
      const mi = ("0" + fecha.getMinutes()).slice(-2);
      // Formatear la fecha en DD-MM-YYYY hh:mm
      const fechaFormateada = `${dd}-${mo}-${yy} ${hh}:${mi}`;

      console.log(fechaFormateada);
      return fechaFormateada
    },
    resetFormValuesToNull () {
      this.cryptoAmount = 0;
      this.exchangeWinnerPrice = '';
      this.selectedCrypto = '';
      this.fiatAmount = 0;
    }
  },

  computed: {
    // selectedCryptoValue() {
    //   this.cryptos.selectedCrypto
    // },
    action() {
      return this.title != 'Sell' ? 'purchase' : 'sale'
    }
  },
   mounted() {
    console.log("fetch crypto data - IN PROGRESS.....")
    this.cryptoStore.fetchCryptosPrices();
    console.log("fetch crypto data - DONE.")
   }
}
</script>

<template>
  <div class="container">
  <h2 :style="{ backgroundColor: LightGray, color: bkgColor }">You can <strong> {{ title.toUpperCase() }} CRYPTO </strong> here</h2>
    <form @submit.prevent="submitAction">
      <label>Quantity to {{ title }}</label>
      <input @input="updateOnChange" type="number" min="0" step="0.0000001" v-model="cryptoAmount" required />

      <label>Crypto Currency</label>
      <select @change="updateOnChange" v-model="selectedCrypto">
        <option disabled value="">Select Crypto</option>
        <option v-for="crypto in cryptos" :key="crypto" :value="crypto.code" >{{ crypto.name }}</option>
      </select>

      <hr class="divider" />

      <label>Fiat Amount</label>
      <input type="number" min="0" step="0.000000001" v-model="this.fiatAmount" value="this.fiatAmount" required disabled />
      <span v-if="this.exchangeWinnerPrice != '' "> El mejor precio lo tiene {{ this.exchangeWinnerPrice }} (incluye las comisiones de transferencia y trade)</span>

      <label>Fiat Currency</label>
      <select v-model="selectedFiat">
        <option value="ARS">Peso AR</option>
      </select>

      <ActionButton style="margin-top: 15px" :label="title" :bkgColorHover="bkgColor" />
    </form>
  </div>
</template>

<style scoped>
.container {
  border-radius: 15px;
  background-color: #f5f5f5;
  border: 1px solid #0a0a0a;
  padding: 5px;
  margin-bottom: 15px;
}

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
  opacity: 80%;
  padding: 10px 20px;
  text-align: center;
  /* font-weight: bold; */
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

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

input[type='number'] {
  -moz-appearance: textfield;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

span{
  color: grey
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
