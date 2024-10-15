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
      btc: { amount : 0.00 },
      eth: { amount : 0.00 },
      dai: { amount : 0.00 },
      sol: { amount : 0.00 },
      usdt: { amount : 0.00 },
      fiatAmount: 0.00
     },
  }),

  getters: {
    getTransactionsStore(state) {
      return state.transactions
    }
  },
  
  actions: {

    newValues(transactionObj) {
      if (transactionObj.money == undefined || transactionObj.crypto_code == undefined ){
        alert("ERROR! Missing values.")
        return false
      }
      const { crypto_code, crypto_amount, money } = transactionObj;
      let obj = {};
      if(crypto_amount) {
        obj.crypto_amount = crypto_amount
      }
      if (crypto_code){
        obj.crypto_code = crypto_code.toLowerCase()
      }
      if(money) {
        obj.money = money
      }
      return obj ?? false;
    },

    /** C.R.U.D */

    async addTransaction(transactionObj) {
      try {
        console.log('TransactionStore Data:', transactionObj);
        /** console.log
          user_id: username,  action: action,  crypto_code: this.selectedCrypto,
          crypto_amount: this.cryptoAmount, money: this.fiatAmount,  datetime: new Date(),
        */
        console.log("Checking availability....")
        let canOperate = await this.checkingAvailability(transactionObj)
        if ( !canOperate ) return;

        console.log('POST REQUEST IN PROGRESS....'); // add realoading
        const response = await apiClient.post('', transactionObj);
        console.log('POST RESPONSE READY');

        // add transaction to local storage and update wallet values
        this.saveTransactionLocal(transactionObj, response.data);
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

    async editTransaction(transactionEdited){
      try {
        let transactionObj = transactionEdited       
        let newValues = this.newValues(transactionObj);
        if (!newValues) return false

        let response = await apiClient.patch(`${API_BASE_URL}/${transactionObj._id}`, newValues);
        console.log('EDIT RESPONSE READY');
        console.log(response.data);
        this.updateWalletState(transactionObj)
        return response.data;
      } catch (error) {
        alert("Error in transactionStore.editTransaction")
        console.log(error)
      }
    },

    async deleteTransaction(transactionObj){
      let id = transactionObj._id;
      try {
        if (id == undefined || id == null){
          alert("ERROR! Missing values.")
          return false
        }
        let url = `https://laboratorio3-f36a.restdb.io/rest/transactions/${id}`
        let response = await apiClient.delete(url, '');
        
        console.log('DELETE RESPONSE READY');
        console.log(response.data);
 
        alert("Transaction DELETED: " + id)
        this.updateWalletState(transactionObj)  // mejorar
      } catch (error) {
        console.log(error)
      }
    },

     /** FUNCTIONS */
     
    async getHistory(username) {
      try {
        const response = await apiClient.get(`${API_BASE_URL}?q={"user_id":"${username}"}`);
        return response.data;
      } catch (error) {
        console.error('Error returning the data: ', error);
      }
    },

    updateWalletState ( transactionObj ) {
      let action = transactionObj.action
      let crypto_code = (transactionObj.crypto_code).toLowerCase()  // siempre minuscula
      let crypto_amount = (action === 'purchase') ? transactionObj.crypto_amount : -transactionObj.crypto_amount;
      let fiatAmount = (action === 'sale') ?  transactionObj.money : -transactionObj.money;

      // Inicializamos btc/eth/sol... si es null
      this.wallet[crypto_code] = this.wallet[crypto_code] || {};
      this.wallet[crypto_code]['amount'] = this.wallet[crypto_code]['amount'] || 0;
      this.wallet[crypto_code]['amount'] += crypto_amount;
      this.wallet.fiatAmount = this.wallet.fiatAmount || 0.00;
      this.wallet.fiatAmount = parseFloat(this.wallet.fiatAmount) + parseFloat(fiatAmount);
      return
    },

    async checkingAvailability( transactionObj ) {
      await this.updateWalletFromServer(transactionObj.user_id); // Updatear wallet con datos del servidor
      let action = transactionObj.action
      let crypto_code = (transactionObj.crypto_code).toLowerCase()  // siempre minuscula
      let fiatAmount = transactionObj.money;  // dinero que necesito para comprar la crypto

      // restricciones de venta y compra
      if (action == 'sale') {
        let crypto_amount_available = this.wallet[crypto_code]['amount'] || 0.00;
        if( transactionObj.crypto_amount > crypto_amount_available ){
          alert(`Transaction not allowed. Not enought ${crypto_code.toUpperCase()} to sell.` )
          return false;
        }
        return true;
      } else {
        if (fiatAmount > this.wallet.fiatAmount){ // si gasto mas de lo que tengo
          alert(`Be careful! Not enought money in account to buy ${crypto_code.toUpperCase()}. ${this.wallet.fiatAmount} remaining. \n Don't worry, we wiil deposite $10.000.000 for this transaction (interest applies).`)
          this.wallet.fiatAmount += 10000000;
          return true;
        }
        // return true;
      }
      console.log("You can continue.")
      return true;
    },
    
    saveTransactionLocal(transactionObj, data) {
      transactionObj.id = data._id != null ? data._id : Math.floor(1000000000 + Math.random() * 9000000000);
      this.transactions.push(transactionObj)
    },

    async updateWalletFromServer(username){
      try {
        const response = await apiClient.get(`${API_BASE_URL}?q={"user_id":"${username}"}`);
    
        for (const transaction of response.data) {
          if (transaction.crypto_code && transaction.action) {
            let cryptoCode = transaction.crypto_code.toLowerCase();
    
            if (this.wallet[cryptoCode]['amount'] === undefined) {
              this.wallet[cryptoCode]['amount'] = 0;
            }
            this.wallet[cryptoCode]['amount'] += transaction.action === 'purchase' ? parseFloat(transaction.crypto_amount) : -parseFloat(transaction.crypto_amount);
           
          }
        }
    
      } catch (error) {
        console.error('Error returning wallet state from server.', error);
      }
    },

  },

  persist: {
    key: 'transaction-key',
    storage: localStorage,
  },

})