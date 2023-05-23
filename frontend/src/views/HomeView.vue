<template>
  <section class="background"></section>
  <b-container class="home__container">
    <b-row align-h="center" align-v="center">
      <b-col cols="12" md="8">
        <header class="d-flex flex-column align-items-center mb-4">
          <a @click="reloadPage" aria-label="rechargement de la page">
            <b-img :src="require('../assets/img/dualz_logo.svg')" alt="logo de Dualz" aria-label="logo de Dualz" fluid/>
          </a>
          <h1>Prêt pour la compet ?</h1>
          <h2>C'est par ici</h2>
          <p>Dualz est une application qui offre aux passionnés de jeux vidéo la possibilité de créer et de rejoindre
            des tournois en ligne. Préparez-vous à affronter de nouveaux défis, à rencontrer de nouveaux adversaires et
            à vivre des moments de jeu inoubliables avec Dualz. L'excitation des tournois vous attend.
          </p>
        </header>
      </b-col>
      <b-col cols="12" md="4">
        <b-card class="home__container__card">
          <SwitchAuth class="mb-4" :current-view="currentView" @switch="onSwitch"/>
          <RegisterForm v-if="currentView === 'register'"/>
          <LoginForm v-if="currentView === 'login'"/>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue'
import LoginForm from '@/components/LoginForm.vue'
import SwitchAuth from '@/components/SwitchAuth.vue'

export default {
  components: {
    RegisterForm,
    LoginForm,
    SwitchAuth
  },
  data() {
    return {
      currentView: 'register',
    }
  },
  methods: {
    onSwitch(view) {
      console.log('je passe par onSwitch')
      // LE BUT ICI:  MODIFIER LA VALEUR DE CURRENTVIEW
      this.currentView = view
    },
    reloadPage() {
      this.$router.go()
    }
  }
}
</script>


<style lang="scss">
@import "../../src/style/style";
@import "../style/style.scss";
@import "../assets/sass/variables.scss";

.background {
  background-image: url("../assets/img/2207_w026_n002_2268b_p1_2268.jpg");
  width: 100%;
  height: 100%;
  filter: blur(4px);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
}

.home__container {
  &__card {
    background-color: $secondary-color !important;
  }

  h1, h2, p {
    color: $white;
  }
}

.home__container, .home__container > .row {
  min-height: 100vh;
}
</style>