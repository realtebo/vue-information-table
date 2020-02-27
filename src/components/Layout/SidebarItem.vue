<template>
  <q-item clickable :to="to">
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "SidebarItem",
  props: ["to", "icon", "label", "caption"]
};
</script>

<style></style>
