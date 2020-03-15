<template>
  <transition
    name="slide-fade"
    mode="out-in"
  >
    <router-view name="account" />
  </transition>
</template>

<script>
  export default {
    name: "AccountLayout",
  };
</script>

<style scoped>

</style>