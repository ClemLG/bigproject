<template>
  <div class="tournament-table">
    <div class="bracket-container">
      <tournament-bracket :teams="players" :matches="matches" />
    </div>
  </div>
</template>

<script>
import TournamentBracket from 'vue-tournament-bracket';

export default {
  components: {
    TournamentBracket,
  },
  props: {
    players: Array,
    matches: Array,
  },
};
</script>

<style scoped>
.tournament-table {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bracket-container {
  width: 600px; /* Ajustez la largeur selon vos besoins */
  height: 400px; /* Ajustez la hauteur selon vos besoins */
}
</style>