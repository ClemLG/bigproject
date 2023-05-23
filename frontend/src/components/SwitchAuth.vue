<script>
export default {
  props: {
    currentView: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="switch">
    <a @click="$emit('switch', 'register')" :class="{ active: currentView === 'register' }"
       aria-label="switch vers inscription">INSCRIPTION</a>
    <p class="mx-2 text-white">|</p>
    <a @click="$emit('switch', 'login')" :class="{ active: currentView === 'login' }"
       aria-label="switch vers connexion">CONNEXION</a>
  </div>
</template>

<style scoped lang="scss">
@import "../../src/style/style";
@import "../assets/sass/variables.scss";

.switch {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  font-size: 1.4rem;

  a {
    text-decoration: none;
    color: $white;
    cursor: pointer;
    @include mobile-s {
      font-size: 1.2rem;
    }

    &.active {
      color: $links;
      font-weight: bold;
    }
  }
}
</style>