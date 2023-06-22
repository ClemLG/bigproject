<!--JAVASCRIPT-->
<script>
import {Notyf} from 'notyf'
import 'notyf/notyf.min.css'
import axios from "axios";
import Header from "@/components/Header.vue";
import CreateEvent from "@/components/CreateEvent.vue"

export default {
  components: {
    Header,
    CreateEvent
  },
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
  <Header class="mb-4"/>
  <main class="d-flex flex-column">
    <b-container fluid>
      <b-row>
        <b-col>
          <CreateEvent/>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid>
      <b-row class="d-flex">
        <h2>Tournois en cours</h2>
        <b-col cols="auto" v-for="(tournament, index) in tournamentList" :key="index">
          <!-- On affiches les cards de tournoi avec leurs infos -->
          <a href="">
            <div onclick="" class="card d-flex flex-column bg-primary rounded-2 p-2">
              <h3>{{ tournament.title }}</h3>
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

a {
  color: inherit;
  text-decoration: none;
}

* {
  color: $white;
}

main {
  row-gap: 32px;

  .btn {
    background: $primary-color;
    color: $bg-dark-grey;
    font-weight: bold;
  }
}

.card {
  h3, p {
    color: $bg-dark-grey;
  }

  width: 300px;
  height: 160px;
}

</style>