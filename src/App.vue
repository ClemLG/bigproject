<template>
    <router-view/>
</template>

<style lang="scss">
@import "./assets/sass/variables.scss";
*, *:before, *:after {
    font-family: Poppins, Helvetica, Arial, sans-serif;
}

body {
    background-color: $bg-dark-grey;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
