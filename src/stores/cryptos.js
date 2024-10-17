import axios from 'axios'
import { defineStore } from 'pinia'

export const useCryptoStore = defineStore('crypto', {
  state: () => ({
    cached: false,
    cryptos: {
      btc: null,
      eth: null,
      dai: null,
      sol: null,
      usdt: null,
    }
  }),

  getters: {},

  actions: {
    
    async fetchCryptosPrices() {
      // if (this.cached) {
      //   console.log("crypto data already cached")
      //   return;
      // }
      try {
        for (let cryptoCode in this.cryptos) {
          const criptoResponse = await axios.get(
            `https://criptoya.com/api/${cryptoCode}/ars/1` // 'https://criptoya.com/api/BTC/ARS/0.1'
          )
          this.cryptos[cryptoCode] = criptoResponse.data
        }
        // console.log(this.cryptos);
        this.cached = true;
      } catch (error) {
        console.log('Error fetching cryptocurrency prices:', error)
      }
    },
    formatNumber(number) {
      const numStr = number.toString();
      const parts = numStr.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return parts.join(',');
    },
  },
  persist: {
    key: 'crypto-key',
    storage: localStorage,
  },
})
