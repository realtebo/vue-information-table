<template>
  <q-page>
    <internal-container :title="$t('microphone handlers') | titleCase">
      <scroll-area>
        <q-list
          v-if="Object.keys(meetingsSorted).length > 0"
          separator
          bordered
        >
          <single-entry
            v-for="(meeting, key) in meetingsSorted"
            :key="key"
            :meeting="meeting"
            @edit="openForEdit(key, meeting)"
          />
        </q-list>
      </scroll-area>

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
import AddMeeting from "../../components/meetings/MicrophoneHandlers/AddMeeting";
import EditMeeting from "../../components/meetings/MicrophoneHandlers/EditMeeting";
import ScrollArea from "../../components/Shared/ScrollArea";
import InternalContainer from "../../components/Shared/InternalContainer";
import SingleEntry from "../../components/meetings/Shared/SingleEntry";
import FabAdd from "../../components/meetings/Shared/FabAdd";

export default {
  name: "PageMicrophoneHandlers",
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
    //EntryList,
    FabAdd,
    ScrollArea,
    SingleEntry,
    InternalContainer
  },
  computed: {
    ...mapState("membership", ["isAdmin"]),
    ...mapGetters("microphoneHandlers", ["meetingsSorted"])
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
