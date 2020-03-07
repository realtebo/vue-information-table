<template>
  <q-item>
    <q-item-section center thumbnail class="q-ml-none">
      <q-icon :name="icon" size="3rem" />
    </q-item-section>

    <q-item-section>
      <q-item-label caption>{{ title | titleCase }}</q-item-label>
      <q-item-label>
        <template v-if="itemType === 'object'">
          <div class="q-my-xs" v-for="(value, key) in items" :key="`ci_${key}`">
            {{ withTime ? key + ": " : "" }} {{ value }}
          </div>
        </template>
        <template v-if="itemType === 'string'">
          {{ items }}
        </template>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "CalendarItem",
  props: ["icon", "title", "items", "withTime"],
  computed: {
    itemType: function() {
      return typeof this.items;
    },
    count: function() {
      if (typeof this.items === "object") {
        return this.items ? Object.keys(this.items).length : 0;
      }
      if (typeof this.items === "string") {
        return 1;
      }
      return 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.q-item__label {
  &.q-item__label--caption {
    border-bottom: 1px solid $secondary;
  }
}
</style>
