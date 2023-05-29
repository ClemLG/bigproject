<!--JAVASCRIPT-->
<script>
import {Notyf} from 'notyf'
import 'notyf/notyf.min.css'

export default {
  components: {
  },
  data() {
    return {
      tournamentList: []
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
  // methods: {
  //   getTournaments() {
  //     // Requête pour récupérer les tournois
  //     axios.get('http://localhost:3003/api/', {
  //       headers: {
  //         'Authorization': `Bearer ${cookies.getItem('token')}`
  //       }
  //     })
  //         .then(response => {
  //         })
  //         .catch(e => {
  //           console.log(e)
  //         })
  //   }
  // },
  // beforeMount() {
  //   console.log('récupération des tournois au chargement')
  // }
}
</script>

<!--HTML-->
<!--<template>-->
<!--</template>-->