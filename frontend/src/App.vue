<script setup>
    import {RouterView} from 'vue-router'
</script>

<template>
  <RouterView/>
</template>

<style lang="scss">
@import "./assets/sass/variables.scss";
@import "./style/style.scss";

*, *:before, *:after {
  font-family: PT Sans, Helvetica, Arial, sans-serif;
}

body {
  background-color: $bg-dark-grey;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

p {
  margin: 0!important;
}
</style>
