<template>
  <q-page class="bg-grey-3 ">
    <internal-container :title="fullTitle">
      <entry-list
        :namespace="namespace"
        :whenWithTime="whenWithTime"
        @edit="openForEdit"
      />

      <fab-add @add="showAdd = true" v-if="isAdmin" />

      <q-dialog v-model="showAdd" persistent>
        <add-edit
          mode="add"
          :subject="pageTitle"
          :subject2="pageTitle2"
          :namespace="namespace"
          :hasWhen="hasWhen"
          :whenWithTime="whenWithTime"
          :hasWho="hasWho"
          :whoLabel="whoLabel"
          :hasWho1="hasWho1"
          :who1Label="who1Label"
          :hasWho2="hasWho2"
          :who2Label="who2Label"
          :hasWho3="hasWho3"
          :who3Label="who3Label"
          @close="showAdd = false"
        />
      </q-dialog>

      <q-dialog v-model="showEdit" persistent>
        <add-edit
          mode="edit"
          :subject="pageTitle"
          :subject2="pageTitle2"
          :namespace="namespace"
          :id="meetingKeySelected"
          :meeting="meetingSelected"
          :hasWhen="hasWhen"
          :whenWithTime="whenWithTime"
          :hasWho="hasWho"
          :whoLabel="whoLabel"
          :hasWho1="hasWho1"
          :who1Label="who1Label"
          :hasWho2="hasWho2"
          :who2Label="who2Label"
          :hasWho3="hasWho3"
          :who3Label="who3Label"
          @close="closeEdit()"
        />
      </q-dialog>
    </internal-container>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import AddEdit from "./AddEdit";
import EntryList from "./EntryList";
import FabAdd from "./FabAdd";
import InternalContainer from "../Shared/InternalContainer";

export default {
  name: "Assignments",
  components: { AddEdit, EntryList, FabAdd, InternalContainer },
  props: {
    pageTitle: { type: String, required: true },
    pageTitle2: { type: String, default: null },

    subject: String,
    subject2: String,

    namespace: String,
    id: String,
    meeting: Object,

    hasWhen: Boolean,
    whenWithTime: Boolean,

    hasWho: Boolean,
    whoLabel: { type: String, default: "" },

    hasWho1: Boolean,
    who1Label: { type: String, default: "" },

    hasWho2: Boolean,
    who2Label: { type: String, default: "" },

    hasWho3: Boolean,
    who3Label: { type: String, default: "" }
  },
  data() {
    return {
      showAdd: false,
      showEdit: false,
      meetingSelected: null,
      meetingKeySelected: null
    };
  },
  computed: {
    ...mapState("membership", ["isAdmin"]),
    fullTitle() {
      return this.pageTitle + (this.pageTitle2 ? " " + this.pageTitle2 : "");
    }
  },
  methods: {
    openForEdit(key, meeting) {
      if (!this.isAdmin) return;
      this.meetingKeySelected = key;
      this.meetingSelected = meeting;
      this.showEdit = true;
    },
    closeEdit() {
      this.meetingKeySelected = null;
      this.meetingSelected = null;
      this.showEdit = false;
    }
  }
};
</script>

<style></style>
