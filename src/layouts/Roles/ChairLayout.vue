<template>
  <transition
    name="slide-fade"
    mode="out-in"
  >
    <router-view name="chair" />
  </transition>
</template>

<script>
  export default {
    name: "ChairLayout",
  };
</script>

<style scoped>

</style>