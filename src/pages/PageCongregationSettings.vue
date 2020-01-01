<template>
  <q-page padding>
    <q-list bordered padding class="q-mb-md">
      <q-item-label header>Sound Department</q-item-label>

      <q-item tag="label">
        <q-item-section>
          <q-item-label>Number of people</q-item-label>
          <q-item-label caption>{{ peopleAtSoundDepartment }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-slider
            style="min-width: 200px;"
            v-model="peopleAtSoundDepartment"
            :min="1"
            :max="3"
            :steps="1"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PageCongregationSettings",
  computed: {
    ...mapGetters("settings", ["noOfPeopleAtSoundDepartment"]),
    peopleAtSoundDepartment: {
      get: function() {
        return this.noOfPeopleAtSoundDepartment;
      },
      set: function(newValue) {
        console.log(
          "trying to set new value of peopleAtSoundDepartment",
          newValue
        );
        this.updateSetting({
          key: "noOfPeopleAtSoundDepartment",
          value: newValue
        });
      }
    }
  },
  methods: {
    ...mapActions("settings", ["updateSetting"])
  }
};
</script>

<style></style>
