<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Add Christian Life Meeting Prayers</div>
      <q-space />
      <q-btn flat round dense icon="close" v-close-popup />
    </q-card-section>

    <template v-if="numberOfPublishers">
      <q-form @submit.prevent="submitForm">
        <q-card-section>
          <q-input outlined v-model="meetingToSubmit.when" class="q-mb-sm">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="meetingToSubmit.when"
                    :today-btn="true"
                    :first-day-of-week="1"
                    mask="YYYY-MM-DD"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-select
            class="q-mb-sm"
            outlined
            v-model="meetingToSubmit.who1"
            :options="publishersOptions"
            label="First"
          />

          <q-select
            class="q-mb-sm"
            outlined
            v-model="meetingToSubmit.who2"
            :options="publishersOptions"
            label="Second"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Save" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </template>
    <template v-else>
      <q-card-section>
        There are no publishers that offers prayer at Christian Life Meeeting.
        list and enable at least one publisher for this assignment
      </q-card-section>
    </template>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import addMeetingMixin from "../add-meeting-mixin";
import addEditMeetingMixin from "../add-edit-meeting-mixin";
export default {
  mixins: [addMeetingMixin, addEditMeetingMixin],
  data() {
    return {
      meetingToSubmit: {
        when: null,
        who1: null,
        who2: null
      }
    };
  },
  computed: {
    ...mapGetters("publishers", {
      publishers: "christianLifePrayers",
      numberOfPublishers: "numberOfChristianLifePrayers"
    })
  },
  methods: {
    ...mapActions("christianLifePrayers", ["addMeeting"])
  }
};
</script>

<style scoped></style>
