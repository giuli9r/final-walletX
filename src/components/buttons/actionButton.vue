<template>
  <button type="submit" class="action-button">{{ label }}</button>
</template>

<script>
export default {
  props: {
    label: String,
  },
}
</script>

<style scoped>
button {
  background-color: rgb(94, 92, 92);
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.action-button {
  width: 100%;
  padding: 10px;
  background-color: #3a3a3a;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #333;
}
</style>
