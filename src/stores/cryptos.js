import axios from 'axios'
import { defineStore } from 'pinia'

export const useCryptoStore = defineStore('crypto', {
  state: () => ({
    criptos: {
      btc: null,
      eth: null,
      dai: null,
      sol: null,
      usdt: null
    }
  }),

  getters: {},

  actions: {
    async fetchCryptosPrices() {
      try {
        for (const criptoCode in this.criptos) {
          const criptoResponse = await axios.get(
            `https://criptoya.com/api/${criptoCode}/ars/1` // 'https://criptoya.com/api/BTC/ARS/0.1'
          )
          this.criptos[criptoCode]['ars'] = criptoResponse.data
        }
      } catch (error) {
        console.log('Error fetching cryptocurrency prices:', error)
      }
    }
  }
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
