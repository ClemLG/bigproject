<script>
import axios from "axios";
import {Notyf} from 'notyf'
import 'notyf/notyf.min.css'
import Header from "@/components/Header.vue"
import CreateEvent from "@/components/CreateEvent.vue"
import router from '../router/index'

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
    await this.fetchEvents();
    this.notyf = new Notyf({
      duration: 4000,
      position: {
        x: "right",
        y: "bottom"
      }
    })
  },
  methods: {
    //On récupère tous les evenements
    async fetchEvents() {
      try {
        const response = await axios.get('http://localhost:3003/api/event/', {
          withCredentials: true
        });
        this.tournamentList = response.data
      } catch (error) {
        console.log(error)
      }
    },

    // On rejoint un tournoi
    async joinTournament(tournamentId) {
      try {
        const headers = {
          'Content-Type': 'application/json'
        };

        await axios.post(`http://localhost:3003/api/event/${tournamentId}/join`, {}, {
          withCredentials: true,
          headers: headers
        });

        this.notyf.success("Tournoi rejoint avec succès");
        // Rediriger l'utilisateur vers la vue du tournoi
        router.push(`/event/${tournamentId}`);
      } catch (error) {
        console.error(error);
      }
    }
  },
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
      <b-row class="d-flex cards-row">
        <h2>Tournois en cours</h2>
        <b-col cols="col-sm-12 col-md-auto" v-for="tournament in tournamentList" :key="tournament.id">
          <!-- On affiche les cards de tournoi avec leurs infos -->
          <div class="card d-flex flex-column bg-secondary rounded-2 p-2">
            <h3>{{ tournament.title }}</h3>
            <p>Max joueurs: {{ tournament.nb_users }}</p>
            <p>Jeu: {{ tournament.game }}</p>
            <p>Date début: {{ tournament.start_date }}</p>
            <p>Date fin: {{ tournament.end_date }}</p>
            <b-button class="bg-primary" @click="joinTournament(tournament.id)"> Joindre</b-button>
          </div>
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
    background: $bg-dark-grey;
    color: $white;
    font-weight: bold;
  }
}

.cards-row {
  row-gap: 16px;
}

.card {
  h3, p {
    color: $white;
  }

  button {
    color: $bg-dark-grey;
  }
}
</style>