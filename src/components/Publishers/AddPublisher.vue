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
        fullName: ""
      }
    };
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
