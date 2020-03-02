<template>
  <q-page>
    <internal-container
      :title="($t('chairmans') + ' ' + $t('for public meeting')) | titleCase"
    >
      <entry-list namespace="publicMeetingChairmans" @edit="openForEdit" />

      <fab-add @add="showAdd = true" v-if="isAdmin" />

      <q-dialog v-model="showAdd" persistent>
        <add-meeting @close="showAdd = false" />
      </q-dialog>

      <q-dialog v-model="showEdit" persistent>
        <edit-meeting
          @close="closeEdit()"
          :id="meetingKeySelected"
          :meeting="meetingSelected"
        />
      </q-dialog>
    </internal-container>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import AddMeeting from "../../components/meetings/PublicMeetingChairmans/AddMeeting";
import EditMeeting from "../../components/meetings/PublicMeetingChairmans/EditMeeting";
import EntryList from "../../components/meetings/Shared/EntryList";
import InternalContainer from "../../components/Shared/InternalContainer";
import FabAdd from "../../components/meetings/Shared/FabAdd";

export default {
  name: "PagePublicMeetingChairmans",
  data() {
    return {
      showAdd: false,
      showEdit: false,
      meetingSelected: null,
      meetingKeySelected: null
    };
  },
  components: {
    AddMeeting,
    EditMeeting,
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
