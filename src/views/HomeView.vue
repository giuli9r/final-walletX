<script setup>

defineProps({
  msg: {
    type: String,
    required: true
  }
})

</script>

<template>
    <h3> Msg: {{ msg }}</h3>
    <h2>
        Hi! Welcome to HomeView,
    </h2>
    <p> file inside template defined in /views/HomeView </p>
</template>

<style scoped>

</style>