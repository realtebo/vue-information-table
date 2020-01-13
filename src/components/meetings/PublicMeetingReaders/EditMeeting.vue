<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Edit Public Meeting's Reader</div>
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
            v-model="meetingToSubmit.who"
            :options="publishersOptions"
            label="Reader"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            label="Delete"
            color="negative"
            @click.stop="promptToDelete(id)"
          />
          <q-btn label="Save" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </template>
    <template v-else>
      <q-card-section>
        There are no publishers enabled as Reader for Pubblic Meetings. Go to
        Publishers's list and enable at least one publisher for this role
      </q-card-section>
    </template>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import addEditMeetingMixin from "../add-edit-meeting-mixin";
import editMeetingMixin from "../edit-meeting-mixin";
export default {
  mixins: [addEditMeetingMixin, editMeetingMixin],
  data() {
    return {
      meetingToSubmit: {
        when: null,
        who: null
      }
    };
  },
  computed: {
    ...mapGetters("publishers", {
      publishers: "publicMeetingReaders",
      numberOfPublishers: "numberOfPublicMeetingReaders"
    })
  },
  methods: {
    ...mapActions("publicMeetingReaders", ["updateMeeting", "deleteMeeting"])
  }
};
</script>

<style scoped></style>
