<template>
  <button type="submit" 
  class="action-button"
  :style="{ backgroundColor: currentBackgroundColor }"
  @mouseover="changeColorOnHover"
  @mouseleave="resetColor"
  >{{ label }}</button>
</template>

<script>
export default {
  props: {
    label: String,
    bkgColorHover: String,
  },

  data() {
    return {
      bkgColorHover: 'green',  
      currentBackgroundColor: 'black' 
    };
  },
  methods: {
    changeColorOnHover() {
      this.currentBackgroundColor = this.bkgColorHover;
    },
    resetColor() {
      this.currentBackgroundColor = 'black'; 
    }
  }


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
  background-color: #088b1e;
}
</style>
