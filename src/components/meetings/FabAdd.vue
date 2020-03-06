<template>
  <div class="bottom text-center q-mb-lg no-pointer-events">
    <q-btn
      round
      color="primary"
      size="24px"
      class="all-pointer-events"
      icon="add"
      @click="clicked"
    />
  </div>
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
