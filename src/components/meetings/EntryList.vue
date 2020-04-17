<template>
  <q-list
    v-if="Object.keys(meetingsSorted).length > 0"
    separator
    bordered
    class="bg-white"
  >
    <single-entry
      v-for="(meeting, key) in meetingsSorted"
      :key="key"
      :meeting="meeting"
      :whenWithTime="whenWithTime"
      @edit="openForEdit(key, meeting)"
    />
  </q-list>
</template>

<script>
import SingleEntry from "./SingleEntry";
export default {
  name: "EntryList",
  props: ["namespace", "whenWithTime"],
  components: { SingleEntry },
  computed: {
    meetingsSorted() {
      return this.$store.getters[this.namespace + "/meetingsSorted"];
    }
  },
  methods: {
    openForEdit: function(key, meeting) {
      console.log("EntryList - ", this.namespace, "edit", key);
      this.$emit("edit", key, meeting);
    }
  }
};
</script>

<style></style>
