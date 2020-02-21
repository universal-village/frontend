<template>
  <transition
    name="slide-fade"
    mode="out-in"
  >
    <router-view name="member" />
  </transition>
</template>

<script>
  export default {
    name: "MemberLayout",
  };
</script>

<style scoped>

</style>