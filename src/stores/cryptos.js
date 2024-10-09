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
        console.log(this.cryptos);
        this.cached = true;
      } catch (error) {
        console.log('Error fetching cryptocurrency prices:', error)
      }
    }
  },
  persist: {
    key: 'crypto-key',
    storage: localStorage,
  },
})

/**
 * 
 * fetch("https://criptoya.com/api/{coin}/{fiat}/{volumen}")
  .then(response => response.json())
  .then(data => console.log(data));

    {
    "argenbtc": {
        "ask": 75491198.09,
        "totalAsk": 75491198.09,
        "bid": 73056000,
        "totalBid": 73056000,
        "time": 1727997889
    },
    "buenbit": {
        "ask": 74882400,
        "totalAsk": 74882400,
        "bid": 73056000,
        "totalBid": 73056000,
        "time": 1727997894
    },
    "ripio": {
        "ask": 75396327.92,
        "totalAsk": 75773309.56,
        "bid": 73265795.98,
        "totalBid": 72899467,
        "time": 1727997901
     }
    }

 */
