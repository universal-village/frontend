<template>
  <transition
    name="slide-fade"
    mode="out-in"
  >
    <router-view name="author" />
  </transition>
</template>

<script>
  export default {
    name: "AuthorLayout",
  };
</script>

<style scoped>

</style>