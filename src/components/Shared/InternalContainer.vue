<template>
  <div class="q-pa-md absolute full-width full-height column">
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
