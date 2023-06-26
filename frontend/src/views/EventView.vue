<template>
  <div>
    <h2 v-if="tournament">{{ tournament.title }}</h2>
    <TournamentTable :players="players" :matches="matches" v-if="tournament" />
  </div>
</template>

<script>
import TournamentTable from "@/components/TournamentTable.vue";
import axios from "axios";
import {Notyf} from "notyf";

export default {
  components: {
    TournamentTable,
  },
  async created() {
    this.notyf = new Notyf({
      duration: 4000,
      position: {
        x: "right",
        y: "bottom"
      }
    })
  },
  data() {
    return {
      tournament: null,
      players: [],
      matches: [],
    };
  },
  mounted() {
    this.fetchTournamentData(this.$route.params.eventId);
  },
  methods: {
    async fetchTournamentData(eventId) {
      try {
        const response = await axios.get(
            `http://localhost:3003/api/event/${eventId}`,
            {
              withCredentials: true,
            }
        );
        const data = response.data;
        if (data && data.title && data.users && data.Matches) {
          this.tournament = data;
          this.players = data.users.map(user => ({
            id: user.id,
            name: user.name,
          }));
          this.matches = data.Matches.map(match => ({
            id: match.id,
            team1: match.player1.name,
            team2: match.player2.name,
          }));
        } else {
          console.error("Réponse de l'API incomplète :", data);
        }
        this.notyf.success("Données du tournoi récupérées avec succès");
      } catch (error) {
        console.error(
            "Erreur lors de la récupération des données du tournoi :",
            error
        );
      }
    },
  },
};
</script>

<style scoped>
/* Ajoutez des styles CSS personnalisés ici */
</style>