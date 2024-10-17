<template>
  <button type="submit" 
  class="action-button"
  :style="{ backgroundColor: currentBackgroundColor,  color: currentTextColor }"
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
      currentBackgroundColor: 'dodgerblue' ,
      currentTextColor: 'white', 
    };
  },
  methods: {
    changeColorOnHover() {
      this.currentBackgroundColor = this.bkgColorHover;
      this.currentTextColor = 'black';  //
    },
    resetColor() {
      this.currentBackgroundColor = 'dodgerblue'; 
      this.currentTextColor = 'white';  
    }
  }
}
</script>

<style scoped>

.action-button {
  width: 20%;
  padding: 14px 28px;
  font-size: 16px;
  background-color: #424242;
  color: white;
  /* font-size: 1rem; */
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

</style>
