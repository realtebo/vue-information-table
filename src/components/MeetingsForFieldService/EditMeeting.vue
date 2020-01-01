<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Edit Meeting for Field Service</div>
      <q-space />
      <q-btn flat round dense icon="close" v-close-popup />
    </q-card-section>

    <template v-if="numberOfConductorsOfMeetingsForFieldService">
      <q-form @submit.prevent="submitForm">
        <q-card-section>
          <q-select
            class="q-mb-sm"
            outlined
            v-model="meetingToSubmit.who"
            :options="conductorOptions"
            label="Conductor"
          />

          <q-input outlined v-model="meetingToSubmit.when">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="meetingToSubmit.when"
                    :today-btn="true"
                    mask="YYYY-MM-DD HH:mm"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time
                    v-model="meetingToSubmit.when"
                    mask="YYYY-MM-DD HH:mm"
                    format24h
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
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
        There are no publishers enabled as conductors for Meetings for Field
        Service. Go to Publishers's list and enable at least one publisher as
        conductor for these meetings
      </q-card-section>
    </template>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EditMeeting",
  props: ["id", "meeting"],
  data() {
    return {
      meetingToSubmit: {
        when: null,
        who: null
      }
    };
  },
  computed: {
    ...mapGetters("publishers", [
      "conductorsOfMeetingsForFieldService",
      "numberOfConductorsOfMeetingsForFieldService"
    ]),
    conductorOptions: function() {
      let options = [];
      let conductors = this.conductorsOfMeetingsForFieldService;

      Object.keys(conductors).forEach(key => {
        options.push({
          label: conductors[key].fullName,
          value: key
        });
      });
      return options;
    }
  },
  mounted() {
    this.meetingToSubmit = Object.assign({}, this.meeting);
  },
  methods: {
    ...mapActions("meetingsForFieldService", [
      "updateMeeting",
      "deleteMeeting"
    ]),
    submitForm() {
      this.updateMeeting({
        id: this.is,
        updates: this.meetingToSubmit
      });
      this.$emit("close");
    },
    promptToDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Really want to delete it?",
          ok: {
            color: "primary"
          },
          cancel: {
            color: "negative"
          },
          persistent: true
        })
        .onOk(() => {
          this.deleteMeeting(id);
          this.$emit("close");
        });
    }
  }
};
</script>

<style scoped></style>
