<script>
export default {
  data() {
    return {
      count: 0,
      title: "History",
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },

  methods: {
    increment() {
      this.count++
    },
    sayHi(){
        alert(this.title)
    }
  },
  computed: {
    // a computed getter
    publishedBooksMessage() {
      // `this` points to the component instance
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  },

  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
    <h2>{{ this.title }}</h2>
  <button @click="increment">Count is: {{ count }}</button>
</template>