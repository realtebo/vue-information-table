<template>
  <q-page padding>
    <q-list bordered padding class="q-mb-md">
      <q-item-label header>{{
        $t("sound department") | titleCase
      }}</q-item-label>

      <q-item tag="label">
        <q-item-section>
          <q-item-label>{{ $t("Number of people") }}</q-item-label>
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

    <q-list bordered padding class="q-mb-md">
      <q-item-label header>{{
        $t("members of your congregation") | titleCase
      }}</q-item-label>

      <q-item to="/congregation-settings/invitation" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{
            $t("invite other to join this congregation")
          }}</q-item-label>
          <q-item-label caption>{{ invitationCodeLabel }} </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Notify } from "quasar";
export default {
  name: "PageCongregationSettings",
  computed: {
    ...mapGetters("settings", [
      "noOfPeopleAtSoundDepartment",
      "invitationCode"
    ]),
    peopleAtSoundDepartment: {
      get: function() {
        return this.noOfPeopleAtSoundDepartment;
      },
      set: function(newValue) {
        this.updateSetting({
          key: "noOfPeopleAtSoundDepartment",
          value: newValue
        }).then(() => Notify.create(this.$t("Setting updated")));
      }
    },
    invitationCodeLabel: function() {
      if (this.invitationCode) {
        return this.$t("Invitation code") + ":" + this.invitationCode;
      }

      return this.$t("see istructions and generate invitation code");
    }
  },
  methods: {
    ...mapActions("settings", ["updateSetting"])
  }
};
</script>

<style></style>
