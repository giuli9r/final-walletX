<script>
import NavBarComponent from '@/components/NavBarApp.vue'
import FooterComponent from '@/components/Footer.vue'
// refactor to clean code after this commit

export default {
  created() {
    document.title = 'CryptoX'
  },
  components: {
    NavBarComponent,
    FooterComponent
  },
  mounted() {
    console.log(`The root view  mounted.`)
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<template>
  <NavBarComponent />
  <router-view />
  <FooterComponent />
</template>

<style scoped>
header {
  line-height: 1.5;
  display: flex;
  place-items: center;
  padding-right: calc(var(--section-gap) / 2);
  background-color: rgb(248, 247, 243);
}

header .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}
</style>
