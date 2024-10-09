import axios from 'axios';
import { defineStore } from 'pinia'


const API_BASE_URL = 'https://laboratorio-36cf.restdb.io/rest/transactions';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {'X-APIKEY': '64a5ccf686d8c5d256ed8fce'},
});


export const useTransactionStore = defineStore('transaction', {
  
  state: () => ({
    transactions: [],
    wallet: {
      btc: null,
      eth: null,
      dai: null,
      sol: null,
      usdt: null,
      fiatAmount: 0
     },

  }),

  getters: {
    getTransactions(state) {
      return state.transactions
    }
  },
  
  actions: {

    updateWalletState ( transactionObj ) {
      let action = transactionObj.action
      let crypto_code = transactionObj.crypto_code  // siempre minuscula
      let crypto_amount = (action === 'purchase') ? transactionObj.crypto_amount : -transactionObj.crypto_amount;
      let fiatAmount = (action === 'purchase') ?  transactionObj.money : -transactionObj.money;

      // Inicializamos btc/eth/sol... si es null
      this.wallet[crypto_code] = this.wallet[crypto_code] || {};
      this.wallet[crypto_code]['amount'] += crypto_amount;
      this.wallet.fiatAmount += fiatAmount;
  
      return
    },

    async addTransaction(transactionObj) {
      try {
        console.log('TransactionStore Data:', transactionObj);
        /** console.log
          user_id: username,  action: action,  crypto_code: this.selectedCrypto,
          crypto_amount: this.cryptoAmount, money: this.fiatAmount,  datetime: new Date(),
        */
        console.log("Checking availability....")
        this.checkingAvailability(transactionObj);
        console.log('POST REQUEST IN PROGRESS....'); // add realoading
        const response = await apiClient.post('', transactionObj);
        console.log('POST RESPONSE READY');

        // add transaction to local storage and update wallet values
        this.transactions.push(transactionObj)
        this.updateWalletState(transactionObj);
        console.log("transaction added, wallet state and transaction-key storage updated ")
        console.log('Response Data:', response.data);
        return response.data;

      } catch (error) {
        console.error('Error when adding new transaction:', error);
        if (error.response) {
          console.log('Server Response:', error.response.data);
        }
        console.log(error)
      }
    },

    deleteTransaction(transactionID){

      try {
        this.transactions.pop()
        /**
         CALL TO API WITH AXIOS.DELETE
          ID_TRANSACTION 
         */
        console.log("Transaction deleted: " + transactionID)
      } catch (error) {
        console.log(error)
      }
      
    },

    editTransaction(transactionID){
      try {
        this.transactions;
        /**
         CALL TO API WITH AXIOS.PATH
         TRANSACTION_ID, NEW_PARAMS
         */
        console.log("Transaction edited: " + transactionID)
      } catch (error) {
        console.log(error)
      }
    },

    checkingAvailability( transactionObj) {
      console.log(transactionObj)
      console.log("You can continue.")
      return
    }

  },

  persist: {
    key: 'transaction-key',
    storage: localStorage,
  },

})