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
        presidesAsPublicMeetingChairman: false
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
