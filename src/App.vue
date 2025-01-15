<template>
  <v-app>
    <router-view name="header"></router-view>
    <router-view/>
  </v-app>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
<script setup lang="ts">
</script>
