<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="add" color="accent" @click="clicked" />
  </q-page-sticky>
</template>

<script>
export default {
  name: "FabAdd",
  methods: {
    clicked: function() {
      this.$emit("add");
    }
  }
};
</script>

<style></style>
