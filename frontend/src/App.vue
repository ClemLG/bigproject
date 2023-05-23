<template>
  <router-view/>
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

nav {
  padding: 32px;

  a {
    font-weight: bold;
    color: $links;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
