<template>
  <transition
    name="slide-fade"
    mode="out-in"
  >
    <router-view name="dashboard" />
  </transition>
</template>

<script>
  export default {
    name: "DashboardLayout",
  };
</script>

<style scoped>

</style>