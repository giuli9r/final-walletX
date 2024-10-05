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
    wallet: { },

  }),

  getters: {
    getWallet(state) {
      return state.wallet
    }
  },
  
  actions: {

    updateWalletState ( CRYPTO_CODE, CRYPTO_AMOUNT, ACTION ) {
      switch (ACTION) {
        case 'purchase':
          apiClient.get();
          break;
      
        case 'sell':
        
        break;
        default:
          break;
      }
      return
    },

    addTransaction(transactionObj) {
      try {
        this.transactions.push(transactionObj)
        /**
           CALL TO API WITH AXIOS.POST
          CRYPTO_CODE, CRYPTO_AMOUNT, FIAT_AMOUNT ,ACTION
        */
        console.log("transaction added")
      } catch (error) {
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
    }

  },
})