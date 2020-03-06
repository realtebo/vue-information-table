<template>
  <q-item clickable v-ripple @click="clicked">
    <q-item-section>
      <q-item-label>
        <span class="text-h6">{{ meeting.when }}</span>
      </q-item-label>
    </q-item-section>
    <q-item-section v-if="meeting.who">
      <q-item-label>
        <span class="text-h6">{{ meeting.who.label }}</span>
      </q-item-label>
    </q-item-section>
    <q-item-section v-if="meeting.who1">
      <q-item-label>
        <span class="text-h6">{{ meeting.who1.label }}</span>
      </q-item-label>
    </q-item-section>
    <q-item-section v-if="meeting.who2">
      <q-item-label>
        <span class="text-h6">{{ meeting.who2.label }}</span>
      </q-item-label>
    </q-item-section>
    <q-item-section v-if="meeting.who3">
      <q-item-label>
        <span class="text-h6">{{ meeting.who3.label }}</span>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "SingleEntry",
  props: ["meeting"],
  methods: {
    clicked: function() {
      this.$emit("edit");
    }
  }
};
</script>

<style></style>
