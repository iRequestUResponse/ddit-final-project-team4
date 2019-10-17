<template>
  <div id="specification">
    <router-link class="logo" to="/">죽방</router-link>
  </div>
</template>

<script>
export default {
  beforeMount() {
  },
}
</script>

<style scoped>
#specification {
  position: fixed;
  right: 0;
  width: 400px;
  background: #FFF;
  height: 100vh;
}

a.logo {
    color: #1564f9;
    font-size: 24pt;
    font-weight: bold;
    text-decoration: none;
}
</style>