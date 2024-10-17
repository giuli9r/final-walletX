import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    countStoreState: 1,
    products: [
      { id: 1, name: 'P1', quantity: 10, price: 1 },
      { id: 2, name: 'P2', quantity: 20, price: 112 },
      { id: 3, name: 'P3', quantity: 30, price: 12 }
    ]
  }),
  getters: {
    productCount(state) {
      return state.products.length
    },
    productsCheaperThan(state) {
      return (price) => state.products.filter((product) => product.price < price)
    }
  },
  actions: {
    addProduct(pr) {
      this.products.push(pr)
    },
    inc() {
      this.countStoreState++
    }
  },
  persist: true
})
