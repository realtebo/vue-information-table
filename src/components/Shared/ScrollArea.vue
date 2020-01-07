<template>
  <q-scroll-area class="q-my-lg q-scroll-area-custom">
    <slot></slot>
  </q-scroll-area>
</template>

<script>
export default {
  name: "ScrollArea"
};
</script>

<style lang="scss" scoped>
.q-scroll-area-custom {
  display: flex;
  flex-grow: 1;
}
</style>
