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
      totalWalletValue : 0,
      totalWalletValueSellAll : 0,
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
      let totalMoney = 0; // total fiatamount as sell/buy balance
      let totalMoneyAllSell = 0; // total fiatamount if we sale all
      const cryptos = JSON.parse(localStorage.getItem('crypto-key')).cryptos  // cryptos
      const bestBidPrices = this.getBestBidPrice(cryptos);


      walletArray.forEach( (transaction) => {
        let action = transaction.action;
        let crypto = transaction.crypto_code.toUpperCase(); 
        let cryptoAmount = action == 'purchase' ? parseFloat(transaction.crypto_amount) : -parseFloat(transaction.crypto_amount)
        let money = action == 'sale' ? parseFloat(transaction.money) : -parseFloat(transaction.money)

        // Si la criptomoneda no existe, la inicializamos
        if (!totals[crypto]) {
          totals[crypto] = { totalMoney: 0, totalCrypto: 0 , result_proftis: 0}; // totalMoney: total moneda corriente al precio de crypto HOY
        }
   
        let crypto_codeL = crypto.toLowerCase()
        let resultado = bestBidPrices.filter(obj => obj.hasOwnProperty(crypto_codeL));
        let bid_price_updated = resultado[0][crypto_codeL]

        //  valores acumulados
        totals[crypto].totalMoney +=  ( cryptoAmount * bid_price_updated); // se calcula con el precio actual de la crypto  => (req a criptoya) => totals[crypto].totalCrypto * crypto_price
        totals[crypto].totalCrypto += cryptoAmount;
        // totalMoneyAllSell += totals[crypto].totalMoney;

        totalMoney += money; // total de moneda corriente per crypto (deriva del momento transaccion)
        totals[crypto].result_proftis  += money; // Profit/Loss per Crypto
      });

      // total fiat amount si vendemos todo
      Object.keys(totals).forEach(crypto => {
        totalMoneyAllSell += totals[crypto].totalMoney;
      });

      Object.keys(totals).forEach(crypto => {
        const percentage = (totals[crypto].totalMoney / totalMoneyAllSell) * 100;
        totals[crypto].percentage = Math.abs(percentage.toFixed(2));
      });

      return { totals, totalMoney, totalMoneyAllSell };
    },
    getBestBidPrice(cryptos){
      let keys = Object.keys(cryptos);
      console.log(keys)
      const cryptoStorage = JSON.parse(localStorage.getItem('crypto-key'));
      const allCryptos = cryptoStorage.cryptos;
      const bestPricesArray = [];

      keys.forEach(key => {
        // let key = crypto.toLowerCase();
        // const cryptoStorage = JSON.parse(localStorage.getItem('crypto-key'));
        // const allCryptos = cryptoStorage.cryptos;
        let obj = {};
        const exchangeList = allCryptos[key] ?? {};
        let maxPriceInMarket = Number.MIN_VALUE;
        let exchangeWinner = "";

        // totalBid = Precio de venta final incluyendo las comisiones de transferencia y trade
        // si quiero vender tengo que buscar el mayor precio
        Object.keys(exchangeList).forEach((name) => {
          if (exchangeList[name].totalBid > maxPriceInMarket && exchangeList[name].totalBid != 0) {
            maxPriceInMarket = exchangeList[name].totalBid;   
            exchangeWinner = name;
          }
        });
        console.log(`Crypto ${ key } de ${ exchangeWinner } al mejor precio para la venta: ${ maxPriceInMarket }`);
        // GUARDAR EN UN ARRAY EL OBJETO {crypto: maxPriceInMarket}
        obj[key] = maxPriceInMarket
        bestPricesArray.push(obj)
    });
      return bestPricesArray ?? []
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
    differenceMade(){
      // Bien pensado?
      let totalWalletValueSellAllABS = Math.abs(this.totalWalletValueSellAll)
      let totalWalletValueABS = Math.abs(this.totalWalletValue)
      if ( totalWalletValueSellAllABS > totalWalletValueABS) {
        return totalWalletValueSellAllABS - totalWalletValueABS
      }
      return totalWalletValueABS - totalWalletValueSellAllABS
    }
  },
   async mounted() {
    console.log("fetch transactions - IN PROGRESS.....")
    this.cryptoStore.fetchCryptosPrices();
    console.log("fetch transactions data - DONE.")
    let result = await this.transactionStore.updateWalletFromServer(localStorage.getItem('username'));
    let objTotales = this.calculateTotals(result);
    this.wallet = objTotales.totals;

    // this.totalWalletValueSellAll = objTotales.totalMoneyAllSell;
    this.totalWalletValueSellAll = objTotales.totalMoneyAllSell  >= 0 ? objTotales.totalMoneyAllSell : 0;

    this.totalWalletValue = objTotales.totalMoney;
    // this.totalWalletValue = objTotales.totalMoney >= 0 ? objTotales.totalMoney : 0;
    
    // this.getHistory()  IDLE?
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
            <th>Last minute Fiat Amount</th>
            <th>% Total Fiat Amount</th>
            <th>Profit/Loss per Crypto</th>
          </tr>
        </thead>
        <tbody>
          <!-- Iteramos sobre el objeto agrupado que contiene las criptomonedas -->
          <tr v-for="(transaction, key) in this.wallet" :key="key" >
            <td>{{ key.toUpperCase() }}</td>
            <td>{{ this.formatNumberFn(transaction.totalCrypto.toFixed(4)) }}</td>
            <td>{{ this.formatNumberFn(transaction.totalMoney.toFixed(2)) }}</td>
            <td>{{ this.formatNumberFn(transaction.percentage) }}%</td>
            <td>{{ this.formatNumberFn(transaction.result_proftis.toFixed(2)) }}</td>
            <!-- <td>{{ this.formatNumberFn(1500) }}</td> -->
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2"><strong>Total Fiat Value (if sold): </strong></td>
            <td colspan="3">$ {{ this.formatNumberFn(totalWalletValueSellAll.toFixed(2)) }}</td>
          </tr>
          <tr>
            <td colspan="2"><strong>Current Fiat Balance: </strong></td>
            <td colspan="3">$ {{ this.formatNumberFn(totalWalletValue.toFixed(2)) }}</td>
          </tr>
          <tr>
            <td colspan="2"><strong>Profit/Loss from Selling: </strong></td>
            <td colspan="3">$ {{ this.formatNumberFn(differenceMade.toFixed(2)) }}</td>
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

tfoot{
  border-top: 2px solid #949292;
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