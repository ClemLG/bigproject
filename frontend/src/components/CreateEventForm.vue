<script>
export default {
  data() {
    return {
      nb_users: "",
      title: "",
      game: "",
      start_date: "",
      end_date: ""
    }
  },
  methods: {
    createTournament(){
      // axios.post()
    }
  }
}
</script>

<template>
  <div class="form-container">
    <b-form @submit="createTournament">
      <b-form-group id="nb_users" label="Nombre de participants:" label-for="nb_users">
        <b-form-input id="nb_users" v-model="nb_users" type="text" placeholder="Nombre de participants" required/>
      </b-form-group>

      <b-form-group id="title" label="Titre:" label-for="title">
        <b-form-input id="input-2" v-model="title" placeholder="Le titre" required/>
      </b-form-group>

      <b-form-group id="game" label="Game:" label-for="game">
        <b-form-input id="input-3" v-model="game" placeholder="Enter game" required/>
      </b-form-group>

      <b-form-group id="start_date" label="Date de début:" label-for="start-date">
        <b-form-input id="input-4" v-model="start_date" type="date" required/>
      </b-form-group>

      <b-form-group id="end_date" label="Date de fin:" label-for="end_date">
        <b-form-input id="input-5" v-model="end_date" type="date" required/>
      </b-form-group>

      <b-button type="submit" variant="primary" aria-role="création de tournoi">Submit</b-button>
    </b-form>
  </div>
</template>

<style scoped lang="scss">

@import "../../src/style/style";
@import "../style/style.scss";
@import "../assets/sass/variables.scss";

.form-container{
  color: $white;
}
#start_date{
  color: $white;
}

#end_date{
  color:$white;
}

.b-form-input {
  color:$white;
}
</style>