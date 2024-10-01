<template>
  <footer >
    <p>© 2024 CryptoX. All rights reserved.</p>
    <ul class="footer-links">
      <li><a href="terms-of-service" target="_blank">Terms of Service</a></li>
      <li><a href="privacy-policy" target="_blank">Privacy Policy</a></li>
      <li><a href="contact-us" target="_blank">Contact Us</a></li>
    </ul>
  </footer>
</template>


<script>
export default {}
</script>

<style scoped>
footer {
  text-align: center;
  padding: 10px;
  background-color: #f8f9fa;
  position: relative;
  z-index: -999;
  bottom: 0;
  width: 100%;
}
footer ul {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 15px;
}
footer a {
  color: black;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.footer-links a {
  color: #000;
  text-decoration: none;
  font-weight: 500;
}
</style>
