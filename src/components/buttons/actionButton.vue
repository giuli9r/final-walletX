<template>
  <button type="submit" 
  class="action-button"
  :class="{ isLoading: isLoading }"
  :style="{ backgroundColor: currentBackgroundColor,  color: currentTextColor }"
  @mouseover="changeColorOnHover"
  @mouseleave="resetColor"
  >{{ label }}</button>
  <p v-show="isLoading">transaction in course...</p>
</template>

<script>
export default {
  props: {
    label: String,
    bkgColorHover: String,
    isLoading: Boolean
  },

  data() {
    return {
      currentBackgroundColor: 'dodgerblue' ,
      currentTextColor: 'white'
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
  margin-top: 12px;
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

.isLoading{
  pointer-events: none !important; /* Evita la interacción con el botón */
  opacity: 0.5 !important; 
}

</style>
