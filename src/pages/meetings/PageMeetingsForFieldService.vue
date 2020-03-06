<template>
  <q-page>
    <internal-container :title="$t('meetings for field service') | titleCase">
      <entry-list namespace="meetingsForFieldService" @edit="openForEdit" />

      <fab-add @add="showAdd = true" v-if="isAdmin" />

      <q-dialog v-model="showAdd" persistent>
        <!-- <add-meeting @close="showAdd = false" /> -->
        <add-edit
          mode="add"
          subject="meetings for field service"
          namespace="meetingsForFieldService"
          :hasWhen="true"
          :whenWithTime="true"
          :hasWho="true"
          :whoLabel="$t('conductor') | titleCase"
          @close="showAdd = false"
        />
      </q-dialog>

      <q-dialog v-model="showEdit" persistent>
        <add-edit
          mode="edit"
          subject="meetings for field service"
          namespace="meetingsForFieldService"
          :id="meetingKeySelected"
          :meeting="meetingSelected"
          :hasWhen="true"
          :whenWithTime="true"
          :hasWho="true"
          :whoLabel="$t('conductor') | titleCase"
          @close="closeEdit()"
        />
      </q-dialog>
    </internal-container>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import AddEdit from "../../components/meetings/Shared/AddEdit";
import EntryList from "../../components/meetings/Shared/EntryList";
import FabAdd from "../../components/meetings/Shared/FabAdd";
import InternalContainer from "../../components/Shared/InternalContainer";

export default {
  name: "PageMeetingsForFieldService",
  data() {
    return {
      showAdd: false,
      showEdit: false,
      meetingSelected: null,
      meetingKeySelected: null
    };
  },
  components: {
    AddEdit,
    EntryList,
    FabAdd,
    InternalContainer
  },
  computed: {
    ...mapState("membership", ["isAdmin"])
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
