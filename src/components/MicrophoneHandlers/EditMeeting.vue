<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Edit Microphone Handlers</div>
      <q-space />
      <q-btn flat round dense icon="close" v-close-popup />
    </q-card-section>

    <template v-if="numberOfMicrophoneHandlers">
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

          <q-select
            class="q-mb-sm"
            outlined
            v-model="meetingToSubmit.who3"
            :options="publishersOptions"
            label="Third"
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
        There are no publishers assigned to this department. Go to Publishers's
        list and enable at least one publisher for this assignment
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
        who1: null,
        who2: null,
        who3: null
      }
    };
  },
  computed: {
    ...mapGetters("publishers", [
      "microphoneHandlers",
      "numberOfMicrophoneHandlers"
    ]),
    publishersOptions: function() {
      let options = [];
      let publishers = this.microphoneHandlers;
      Object.keys(publishers).forEach(key => {
        options.push({
          label: publishers[key].fullName,
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
    ...mapActions("microphoneHandlers", ["updateMeeting", "deleteMeeting"]),
    submitForm() {
      this.updateMeeting({
        id: this.id,
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
