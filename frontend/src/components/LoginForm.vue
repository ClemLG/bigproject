<script>
import axios from 'axios'
import {Notyf} from 'notyf'
import 'notyf/notyf.min.css'
import router from '../router/index'

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  created() {
    this.notyf = new Notyf({
      duration: 4000,
      position: {
        x: "right",
        y: "bottom"
      }
    })
  },
  methods: {
    loginUser() {
      console.log('Je passe par loginUser')
      // On vérifie que les champs soient remplis
      if (!this.email || !this.password) {
        this.notyf.error("Tous les champs doivent être remplis !")
        return
      }
      // Si ok on envoi les données
      axios.post('http://localhost:3003/api/auth/login', {
            email: this.email,
            password: this.password
          }, {withCredentials: true}) // prevoir pour toutes les requetes
          .then((response) => {
            console.log(response)
            this.notyf.success("Connection réussie")

            // On enregistre le token dans les cookies et on l'envoi sur la page main
            router.push("/main")
            console.log('Requête login envoyée')
          })
          .catch(error => {
            this.notyf.error("Erreur lors de la connexion, vérifiez que vos identifiants soient corrects")
            console.error(error)
          })
    }
  }
}
</script>

<template>
  <b-form class="login__form" @submit.prevent="loginUser">
    <b-form-group id="email" label="E-Mail" label-for="email">
      <b-form-input class="login__form__input" type="email" name="email" id="email" placeholder="Email"
                    v-model="email"/>
    </b-form-group>
    <b-form-group id="password" label="Mot de passe" label-for="password">
      <b-form-input class="login__form__input" type="password" name="password" id="password" placeholder="Mot de passe"
                    v-model="password"/>
    </b-form-group>
    <div class="d-flex justify-content-center mt-5">
      <b-button class="login__form__submit-button mb-5" type="submit">Se connecter</b-button>
    </div>
  </b-form>
</template>

<style scoped lang="scss">
@import "../assets/sass/variables.scss";

.login__form {
  color: $white;

  &__input, &__input:focus {
    background-color: $white;
  }

  &__input:focus, &__input:active {
    box-shadow: none;
    border: 1px solid transparent;
  }

  &__submit-button {
    background-color: $primary-color;
    color: #333333;
    font-weight: 700;
  }
}
</style>