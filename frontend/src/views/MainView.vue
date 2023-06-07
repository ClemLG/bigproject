<!--JAVASCRIPT-->
<script>
import {Notyf} from 'notyf'
import 'notyf/notyf.min.css'
import axios from "axios";

export default {
  data() {
    return {
      tournamentList: []
    }
  },
  async created() {
    await this.fetchTournaments();
    this.notyf = new Notyf({
      duration: 4000,
      position: {
        x: "right",
        y: "bottom"
      }
    })
  },
  methods: {
    async fetchTournaments() {
      try {
        // Requête pour récupérer les tournois
        const response = await axios.get('http://localhost:3003/api/event/', {
          withCredentials: true
        });
        this.tournamentList = response.data
        //return this.tournamentList
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<template>
  <b-container fluid>
    <b-row class="d-flex justify-content-center justify-content-md-start">
      <b-col cols="auto">
        <header>
          <a href="/main">
            <b-img :src="require('../assets/img/dualz_logo.svg')" class="logo" alt="logo de Dualz"
                   aria-label="logo de Dualz" fluid/>
          </a>
        </header>
      </b-col>
    </b-row>
  </b-container>
  <main>
    <b-container fluid>
      <b-row class="d-flex">
        <h2>Tournois en cours</h2>
        <b-col cols="auto" v-for="(tournament, index) in tournamentList" :key="index">
          <!-- On affiches les cards de tournoi avec leurs infos -->
          <a href="">
            <div onclick="" class="card d-flex flex-column bg-primary rounded-2 p-2 text-white">
              <h3>{{tournament.title }}</h3>
              <p>Joueurs inscrits: 1/{{ tournament.nb_users }}</p>
              <p>Jeu: {{ tournament.game }}</p>
              <p>Date debut: {{ tournament.start_date }}</p>
              <p>Date fin: {{ tournament.end_date }}</p>
            </div>
          </a>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<style lang="scss" scoped>
@import "../../src/style/style";
@import "../style/style.scss";
@import "../assets/sass/variables.scss";

.logo {
  width: 120px;
}

* {
  color: $white;
}

a {
  color: inherit;
  text-decoration: none;
}

.card{
  width: 300px;
  height: 160px;
}

</style>