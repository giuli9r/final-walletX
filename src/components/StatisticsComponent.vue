<script>
import { useCryptoStore } from '@/stores/cryptos.js';
import { useTransactionStore } from '@/stores/transactionStore.js';
import { useLoginStore } from '@/stores/loginStore.js';

export default {

  data() {
    return {
      cryptoStore: useCryptoStore(),
      transactionStore: useTransactionStore(),
      loginStore: useLoginStore(),
      wallet: [],
      totalWalletValue : 0
    }
  },
  methods: {
    formatNumberFn(number){
      return this.cryptoStore.formatNumber(number)
    },  
    async walletFn(){
      let transactionsHistory = await this.transactionStore.getHistory(this.getUsername);
      return transactionsHistory
    },
    calculateTotals(walletArray) {
      const totals = {}; // totales x crypto_code
      let totalMoney = 0; // total fiatamount 

      walletArray.forEach(transaction => {
        let action = transaction.action;
        let crypto = transaction.crypto_code.toUpperCase(); 
        let cryptoAmount = action == 'purchase' ? parseFloat(transaction.crypto_amount) : -parseFloat(transaction.crypto_amount)
        let money = action == 'sale' ? parseFloat(transaction.money) : -parseFloat(transaction.money)

        // Si la criptomoneda no existe, la inicializamos
        if (!totals[crypto]) {
          totals[crypto] = { totalMoney: 0, totalCrypto: 0 };
        }

        //  valores acumulados
        totals[crypto].totalMoney += money; // en realidad esto se calcula con el precio actual de la crypto (req a criptoya) => totals[crypto].totalCrypto * realPrice
        totals[crypto].totalCrypto += cryptoAmount;
        totalMoney += money;
      });

      Object.keys(totals).forEach(crypto => {
        const percentage = (totals[crypto].totalMoney / totalMoney) * 100;
        totals[crypto].percentage = percentage.toFixed(2);
      });

      return { totals, totalMoney };
    },

    async getHistory(){
        let data = await this.transactionStore.getHistory(localStorage.getItem('username'))
        this.wallet = data ? data : [];
      }
    
  },
  computed: {
    getUsername(){
      let user = localStorage.getItem('username') ?? '';
      return user
    },
  },
   async mounted() {
    console.log("fetch transactions - IN PROGRESS.....")
    // this.cryptoStore.fetchCryptosPrices();
    console.log("fetch transactions data - DONE.")
    let result = await this.transactionStore.updateWalletFromServer(localStorage.getItem('username'));
    let objTotales = this.calculateTotals(result);
    this.wallet = objTotales.totals;
    this.totalWalletValue = objTotales.totalMoney;
    // this.getHistory()
   }
}
</script>

<template>
  <div class="container">
    <h1 > {{ this.getUsername }}'s Wallet State</h1>
    <div>
      <table class="crypto-table">
        <thead>
          <tr>
            <th>Crypto</th>
            <th>Quantity</th>
            <th>Fiat Amount</th>
            <th>% Total Fiat Amount</th>
          </tr>
        </thead>
        <tbody>
          <!-- Iteramos sobre el objeto agrupado que contiene las criptomonedas -->
          <tr v-for="(transaction, key) in this.wallet" :key="key">
            <td>{{ key.toUpperCase() }}</td>
            <td>{{ this.formatNumberFn(transaction.totalCrypto.toFixed(4)) }}</td>
            <td>{{ this.formatNumberFn(transaction.totalMoney.toFixed(2)) }}</td>
            <td>{{ this.formatNumberFn(transaction.percentage) }}%</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2"><strong>Balance of Fiat Amount: </strong></td>
            <td colspan="2">$ {{ this.formatNumberFn(totalWalletValue.toFixed(2)) }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: #333;
  text-align: center;
  font-family: 'Arial', sans-serif;
  margin-bottom: 20px;
}

.crypto-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Arial', sans-serif;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.crypto-table thead {
  background-color: #e4f0d9;
}

.crypto-table th, .crypto-table td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
}

.crypto-table th {
  font-weight: bold;
}

.crypto-table td {
  background-color: #ffffff;
}
.crypto-table td:hover {
  background-color: #f2f3f7;
}

.crypto-table th, .crypto-table td {
  border-radius: 8px;
}

tfoot td {
  font-weight: bold;
  background-color: #f9f9f9;
}
tfoot td:hover {
  font-weight: bolder;
  background-color: #f5ebeb;
}

.crypto-table tr {
  transition: background-color 0.3s ease;
}

.crypto-table tr:hover {
  background-color: #d3e9c6;
}
</style>