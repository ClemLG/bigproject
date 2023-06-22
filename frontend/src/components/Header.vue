<script>
export default {
  name: 'appHeader'
}
</script>

<template>
  <b-container fluid>
    <header>
      <b-row class="d-flex align-items-center">
        <b-col cols="auto">
          <a href="/main">
            <b-img :src="require('../assets/img/dualz_logo.svg')" class="logo" alt="logo de Dualz"
                   aria-label="logo de Dualz" fluid/>
          </a>
        </b-col>
      </b-row>
    </header>
  </b-container>
</template>

<style scoped lang="scss">
@import "../../src/style/style";
@import "../style/style.scss";
@import "../assets/sass/variables.scss";

.logo {
  width: 120px;
}

</style>