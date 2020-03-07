<template>
  <q-item clickable v-ripple @click="clicked">
    <q-item-section>
      <q-item-label>
        {{ dayOfWeek(meeting.when) }}
        <br />
        <span v-if="whenWithTime === true" class="text-h6">
          {{ localizeDateTime(meeting.when) }}
        </span>
        <span v-else class="text-h6">
          {{ localizeDate(meeting.when) }}
        </span>
      </q-item-label>
    </q-item-section>
    <q-item-section>
      <q-item-label v-if="meeting.who">
        <span style="font-size: 1.1rem; line-height: 1.2rem; ">{{
          meeting.who.label
        }}</span>
      </q-item-label>
      <q-item-label v-if="meeting.who1">
        <span style="font-size: 1.1rem; line-height: 1.2rem;">{{
          meeting.who1.label
        }}</span>
      </q-item-label>
      <q-item-label v-if="meeting.who2">
        <span style="font-size: 1.1rem; line-height: 1.2rem;">{{
          meeting.who2.label
        }}</span>
      </q-item-label>
      <q-item-label v-if="meeting.who3">
        <span style="font-size: 1.1rem; line-height: 1.2rem;">{{
          meeting.who3.label
        }}</span>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import date_utils from "../../mixins/dates-utils";

export default {
  name: "SingleEntry",
  props: ["meeting", "whenWithTime"],
  mixins: [date_utils],
  methods: {
    clicked: function() {
      this.$emit("edit");
    }
  }
};
</script>

<style></style>
