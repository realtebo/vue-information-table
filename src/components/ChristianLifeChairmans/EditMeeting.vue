<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Edit Christian Life Meeting's Chairman</div>
      <q-space />
      <q-btn flat round dense icon="close" v-close-popup />
    </q-card-section>

    <template v-if="numberOfChristianLifeChairmans">
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
            label="Chairman"
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
        There are no publishers enabled as Chairman for Christian Life Meetings.
        Go to Publishers's list and enable at least one publisher for this role
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
      "christianLifeChairmans",
      "numberOfChristianLifeChairmans"
    ]),
    publishersOptions: function() {
      let options = [];
      let publishers = this.christianLifeChairmans;
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
    ...mapActions("christianLifeChairmans", ["updateMeeting", "deleteMeeting"]),
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
