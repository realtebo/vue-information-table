<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Add publisher</div>
      <q-space />
      <q-btn flat round dense icon="close" v-close-popup />
    </q-card-section>

    <q-form @submit.prevent="submitForm">
      <q-card-section>
        <q-input
          class="col"
          outlined
          v-model="publisherToSubmit.fullName"
          label="Full Name"
          stack-label
        />
        <q-separator />
        <q-toggle
          color="primary"
          :label="conductsMeetingsForFieldServiceLabel"
          v-model="publisherToSubmit.conductsMeetingsForFieldService"
          icon="card_travel"
        />
        <q-toggle
          color="primary"
          :label="presidesAsPublicMeetingChairmanLabel"
          v-model="publisherToSubmit.presidesAsPublicMeetingChairman"
          icon="fas fa-user-tie"
        />
        <q-toggle
          color="primary"
          :label="readsWatchtowerLabel"
          v-model="publisherToSubmit.readsWatchtower"
          icon="mdi-chess-rook"
        />
        <q-toggle
          color="primary"
          :label="assignedToSoundDepartmentLabel"
          v-model="publisherToSubmit.assignedToSoundDepartment"
          icon="mdi-surround-sound"
        />
        <q-toggle
          class="full-width"
          color="primary"
          :label="microphoneHandlerLabel"
          v-model="publisherToSubmit.microphoneHandler"
          icon="fas fa-microphone"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Save" type="submit" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddPublisher",

  data() {
    return {
      publisherToSubmit: {
        fullName: "",
        conductsMeetingsForFieldService: false,
        presidesAsPublicMeetingChairman: false,
        readsWatchtower: false,
        assignedToSoundDepartment: false,
        microphoneHandler: false
      }
    };
  },
  computed: {
    conductsMeetingsForFieldServiceLabel() {
      return (
        (this.publisherToSubmit.conductsMeetingsForFieldService
          ? ""
          : "Do Not ") + "Conducts Meeting for Field Service"
      );
    },
    presidesAsPublicMeetingChairmanLabel() {
      return (
        (this.publisherToSubmit.presidesAsPublicMeetingChairman
          ? ""
          : "Do Not ") + "Presides as Public Meeting's Chairman"
      );
    },
    readsWatchtowerLabel() {
      return (
        (this.publisherToSubmit.readsWatchtower ? "" : "Do Not ") +
        "Reads Watchtower at Public Meetings"
      );
    },
    assignedToSoundDepartmentLabel() {
      return (
        (this.publisherToSubmit.assignedToSoundDepartment ? "" : "Not ") +
        "Assigned to Sound Department"
      );
    },
    microphoneHandlerLabel() {
      return (
        (this.publisherToSubmit.microphoneHandler ? "" : "Do Not ") +
        "Serves as Microphone Handler"
      );
    }
  },
  methods: {
    ...mapActions("publishers", ["addPublisher"]),
    submitForm() {
      this.addPublisher(this.publisherToSubmit);
      this.$emit("close");
    }
  }
};
</script>

<style scoped></style>
