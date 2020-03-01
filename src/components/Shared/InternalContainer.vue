<template>
  <div
    class="q-pa-md absolute full-width full-height"
    :class="{ column: $q.platform.is.desktop }"
  >
    <page-title>{{ title }}</page-title>
    <slot></slot>
  </div>
</template>

<script>
import PageTitle from "../../components/Shared/PageTitle";
export default {
  name: "InternalContainer",
  props: ["title"],
  components: {
    PageTitle
  }
};
</script>

<style></style>
