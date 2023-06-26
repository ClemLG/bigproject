<script>
import axios from "axios";

export default {
  name: 'appHeader',
  methods: {
    async logout() {
      try {
        await axios.post('http://localhost:3003/api/auth/logout', null, {
          withCredentials: true
        });
        this.$router.push('/');
      } catch (error) {
        console.error(error);
        // Gérer les erreurs de déconnexion
      }
    }
  }
}
</script>

<template>
  <b-container fluid>
    <header>
      <b-row>
        <b-col class="d-flex align-items-center justify-content-between">
          <a href="/main">
            <b-img :src="require('../assets/img/dualz_logo.svg')" class="logo" alt="logo de Dualz"
                   aria-label="logo de Dualz" fluid/>
          </a>
          <b-button class="bg-secondary" @click="logout">Déconnexion</b-button>
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