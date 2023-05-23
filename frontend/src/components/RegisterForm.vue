<script>
import axios from 'axios'
import {Notyf} from 'notyf'
import 'notyf/notyf.min.css'

// eslint-disable-next-line vue/no-export-in-script-setup
export default {
  name: 'RegisterForm',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirm: '',
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
    addUser() {
      console.log('Je passe par addUser')
      // On vérifie que les champs contiennent les informations
      if (!this.username || !this.email || !this.password || !this.confirm) {
        this.notyf.error("Tous les champs sont obligatoires !")
        return
      }

      //Vérification de la concordance des deux mots de passe
      if (this.confirm !== this.password) {
        this.notyf.error("Les deux mots de passe ne matchent pas !")
        return
      }

      //Si ok on envoi les données
      axios.post(`http://localhost:3003/api/auth/register`, {
        username: this.username,
        email: this.email,
        password: this.password
      })
          .then((response) => {
            console.log(response)
            this.notyf.success('Votre compte a bien été créé ! Veuillez à présent confirmer votre inscription')
            console.log('requete register envoyée')
          })
          .catch(() => {
            this.notyf.error("Erreur lors de l'inscription, assurez vous que tous les champs soient remplis correctement")
          })
    }
  }
}
</script>

<template>
  <b-form class="register__form" @submit.prevent="addUser">
    <b-form-group id="username" label="Nom d'utilisateur" label-for="username" label-class="mb-0">
      <b-form-input class="register__form__input" type="text" name="username" id="username"
                    placeholder="Nom d'utilisateur" v-model="username"></b-form-input>
    </b-form-group>
    <b-form-group id="email" label="E-Mail" label-for="email" label-class="mb-0">
      <b-form-input class="register__form__input" type="email" name="email" id="email" placeholder="Email"
                    v-model="email"></b-form-input>
    </b-form-group>
    <b-form-group id="password" label="Mot de passe" label-for="password" label-class="mb-0">
      <b-form-input class="register__form__input" type="password" name="password" id="password"
                    placeholder="Mot de passe" v-model="password"></b-form-input>
    </b-form-group>
    <b-form-group id="confirm" label="Confirmation mot de passe" label-for="confirm" label-class="mb-0">
      <b-form-input class="register__form__input" type="password" name="confirm" id="confirm"
                    placeholder="Confirmation mot de passe " v-model="confirm"></b-form-input>
    </b-form-group>
    <div class="d-flex justify-content-center my-4">
      <b-button class="register__form__submit-button" type="submit" aria-role="soumission du formulaire d'inscription">
        S'inscrire
      </b-button>
    </div>
  </b-form>
</template>

<style scoped lang="scss">
@import "../assets/sass/variables.scss";

.register__form {
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
    color: #000000;
    font-weight: 500;
  }

}
</style>