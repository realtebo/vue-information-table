<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">{{ $t("Publisher's data") }}</div>
      <q-space />
      <q-btn flat round dense icon="close" v-close-popup />
    </q-card-section>

    <q-form @submit.prevent="submitForm">
      <q-card-section>
        <q-input
          class="col"
          outlined
          v-model="publisherToSubmit.fullName"
          :label="$t('Surname And Name')"
          stack-label
        />
        <q-toggle
          color="primary"
          :label="$t('meetings for field service') | titleCase"
          v-model="publisherToSubmit.conductsMeetingsForFieldService"
          icon="card_travel"
        />
        <q-toggle
          class="full-width"
          color="primary"
          :label="($t('chairman') + ' ' + $t('for public meeting')) | titleCase"
          v-model="publisherToSubmit.presidesAsPublicMeetingChairman"
          icon="fas fa-user-tie"
        />
        <q-toggle
          class="full-width"
          color="primary"
          :label="$t('watchtower reader') | titleCase"
          v-model="publisherToSubmit.readsWatchtower"
          icon="mdi-chess-rook"
        />
        <q-toggle
          class="full-width"
          color="primary"
          :label="$t('sound department') | titleCase"
          v-model="publisherToSubmit.assignedToSoundDepartment"
          icon="mdi-surround-sound"
        />
        <q-toggle
          class="full-width"
          color="primary"
          :label="$t('microphone handler') | titleCase"
          v-model="publisherToSubmit.microphoneHandler"
          icon="fas fa-microphone"
        />
        <q-toggle
          class="full-width"
          color="primary"
          :label="$t('attendant') | titleCase"
          v-model="publisherToSubmit.attendant"
          icon="mdi-shield-account"
        />
        <q-toggle
          class="full-width"
          color="primary"
          :label="
            ($t('chairman') + ' ' + $t('for christian life meeting'))
              | titleCase
          "
          v-model="publisherToSubmit.presidesAsChristianLifeChairman"
          icon="fas fa-user-tie"
        />
        <q-toggle
          class="full-width"
          color="primary"
          :label="$t('book study reader') | titleCase"
          v-model="publisherToSubmit.readsBook"
          icon="mdi-book-open-page-variant"
        />
        <q-toggle
          color="primary"
          :label="
            ($t('prayers') + ' ' + $t('for christian life meeting')) | titleCase
          "
          v-model="publisherToSubmit.offersPrayerAtChristianLifeMeetings"
          icon="fas fa-praying-hands"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-if="mode === 'edit'"
          :label="$t('Delete')"
          color="negative"
          @click.stop="promptToDelete(id)"
        />
        <q-btn :label="$t('Save')" type="submit" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddPublisher",
  props: ["mode", "id", "publisher"],
  data() {
    return {
      publisherToSubmit: {
        fullName: "",
        conductsMeetingsForFieldService: false,
        presidesAsPublicMeetingChairman: false,
        readsWatchtower: false,
        assignedToSoundDepartment: false,
        microphoneHandler: false,
        attendant: false,
        presidesAsChristianLifeChairman: false,
        readsBook: false,
        offersPrayerAtChristianLifeMeetings: false
      }
    };
  },
  methods: {
    ...mapActions("publishers", ["addPublisher", "deletePublisher"]),
    submitForm() {
      if (this.mode === "add") {
        this.addPublisher(this.publisherToSubmit);
      } else {
        this.deletePublisher(this.id);
        this.addPublisher(this.publisherToSubmit);
      }
      this.$emit("close");
    },
    promptToDelete(id) {
      this.$q
        .dialog({
          title: this.$t("Confirm"),
          message: this.$t("Do you really want to delete it?"),
          ok: { color: "negative", label: this.$t("Yes") },
          cancel: { color: "primary", label: this.$t("No") },
          persistent: true
        })
        .onOk(() => {
          this.deletePublisher(id);
          this.$emit("close");
        });
    }
  },
  mounted() {
    if (this.mode === "edit") {
      this.publisherToSubmit = Object.assign({}, this.publisher);
    }
  }
};
</script>

<style scoped></style>
