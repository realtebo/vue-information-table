<template>
  <h5 class="q-p-none q-ma-none text-center">
    <slot></slot>
  </h5>
</template>

<script>
export default {
  name: "PageTitle"
};
</script>

<style scoped>
h5 {
  background-color: white;
  z-index: 1;
  width: 100%;
}
</style>
