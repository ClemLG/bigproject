<script>
export default {
  props: ["modelValue"],
  emits: ["update:modelValue"]
}
</script>

<template>
  <div v-if="modelValue" @click="$emit('update:modelValue', false)" class="overlay d-flex justify-content-center align-items-center">
    <div @click.stop class="overlay__content d-flex flex-column rounded-3 p-4">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../src/style/style";
@import "../style/style.scss";
@import "../assets/sass/variables.scss";

.overlay {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgb(35, 35, 35, 0.9);
  z-index: 1;

  &__content {
    background-color: $bg-dark-grey;
    width: 400px;
  }
}
</style>