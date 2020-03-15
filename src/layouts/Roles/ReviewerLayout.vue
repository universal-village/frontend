<template>
  <transition
    name="slide-fade"
    mode="out-in"
  >
    <router-view name="reviewer" />
  </transition>
</template>

<script>
  export default {
    name: "ReviewerLayout",
  };
</script>

<style scoped>

</style>