<template>
  <div class="form-container">
    <b-form @submit="createTournament">
      <b-form-group id="nb_users" label="Nombre de participants:" label-for="nb_users">
        <b-form-input id="nb_users" v-model="nb_users" type="text" placeholder="Nombre de participants"
                      required></b-form-input>
      </b-form-group>

      <b-form-group id="title" label="Titre:" label-for="title">
        <b-form-input id="title" v-model="title" placeholder="Le titre" required></b-form-input>
      </b-form-group>

      <b-form-group id="game" label="Game:" label-for="game">
        <b-form-input id="game" v-model="game" placeholder="Enter game" required></b-form-input>
      </b-form-group>

      <b-form-group id="start_date" label="Date de début:" label-for="start-date">
        <b-form-input id="start_date" v-model="start_date" type="date" required></b-form-input>
      </b-form-group>

      <b-form-group id="end_date" label="Date de fin:" label-for="end_date">
        <b-form-input id="end_date" v-model="end_date" type="date" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" role="button">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import {Notyf} from 'notyf';
import 'notyf/notyf.min.css';

export default {
  data() {
    return {
      nb_users: "",
      title: "",
      game: "",
      start_date: "",
      end_date: ""
    };
  },
  created() {
    this.notyf = new Notyf({
      duration: 4000,
      position: {
        x: "right",
        y: "bottom"
      }
    });
  },
  methods: {
    async createTournament() {
      try {
        const tournamentData = {
          nb_users: this.nb_users,
          title: this.title,
          game: this.game,
          start_date: this.start_date,
          end_date: this.end_date
        };

        await axios.post('http://localhost:3003/api/event/create', tournamentData, {
          withCredentials: true,
          headers:{
            "Content-Type": "application/json"
          }
        });
        // Tournoi créé avec succès
        this.notyf.success("Tournoi créé avec succès");
        window.location.reload()
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../src/style/style";
@import "../style/style.scss";
@import "../assets/sass/variables.scss";

.form-container {
  color: $white;
}

#start_date {
  color: $white;
}

#end_date {
  color: $white;
}

.b-form-input {
  color: $white;
}
</style>