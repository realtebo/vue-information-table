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
        fullName: ""
      }
    };
  },

  computed: {},

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
