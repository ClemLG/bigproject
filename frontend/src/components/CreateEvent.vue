<script>
import CreateEventForm from "@/components/CreateEventForm.vue";
import Modal from "@/components/ModalForm.vue";

export default {
  components: {
    Modal,
    CreateEventForm
  },

  data() {
    return {
      isVisible: false
    }
  }
}
</script>

<template>
  <b-button class="bg-primary" @click="()=>isVisible=true">Créer un tournoi</b-button>
  <Modal v-model="isVisible">
    <CreateEventForm/>
  </Modal>
</template>

<style scoped lang="scss">

</style>