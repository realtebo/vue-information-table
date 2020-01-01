<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Edit publisher</div>
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
        <q-btn
          label="Delete"
          color="negative"
          @click.stop="promptToDelete(id)"
        />
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

  props: ["id", "publisher"],

  methods: {
    ...mapActions("publishers", ["updatePublisher", "deletePublisher"]),
    submitForm() {
      this.updatePublisher({
        id: this.id,
        updates: this.publisherToSubmit
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
          this.deletePublisher(id);
          this.$emit("close");
        });
    }
  },

  mounted() {
    this.publisherToSubmit = Object.assign({}, this.publisher);
  }
};
</script>

<style scoped></style>
