<template>
  <div
    class="q-pa-md absolute full-width full-height"
    :class="{ column: $q.platform.is.desktop }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "InternalContainer"
};
</script>

<style></style>
