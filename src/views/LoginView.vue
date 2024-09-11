<script setup>

defineProps({
  msgLogin: {
    type: String,
    required: true
  }
})

</script>

<template>
      <h3> Msg: {{ msgLogin }}</h3>
    <h2>
        Hi! Welcome to Login,
    </h2>
    <p> file inside template defined in /views/LoginView </p>
</template>

<style scoped>

</style>