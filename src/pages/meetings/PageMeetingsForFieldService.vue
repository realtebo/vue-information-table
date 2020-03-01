<template>
  <q-page>
    <internal-container :title="$t('meetings for field service') | titleCase">
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

      <q-dialog v-model="showAddMeeting" persistent>
        <add-meeting @close="showAddMeeting = false" />
      </q-dialog>

      <q-dialog v-model="showEditMeeting" persistent>
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
import AddMeeting from "../../components/meetings/MeetingsForFieldService/AddMeeting";
import EditMeeting from "../../components/meetings/MeetingsForFieldService/EditMeeting";
import ScrollArea from "../../components/Shared/ScrollArea";
import InternalContainer from "../../components/Shared/InternalContainer";
import SingleEntry from "../../components/meetings/shared/SingleEntry";
import FabAdd from "../../components/meetings/shared/FabAdd";

export default {
  name: "PageMeetingsForFieldService",
  data() {
    return {
      showAddMeeting: false,
      showEditMeeting: false,
      meetingSelected: null,
      meetingKeySelected: null
    };
  },
  components: {
    AddMeeting,
    EditMeeting,
    FabAdd,
    ScrollArea,
    SingleEntry,
    InternalContainer
  },
  computed: {
    ...mapState("membership", ["isAdmin"]),
    ...mapGetters("meetingsForFieldService", ["meetingsSorted"])
  },
  methods: {
    openForEdit(key, meeting) {
      if (!this.isAdmin) return;
      this.meetingKeySelected = key;
      this.meetingSelected = meeting;
      this.showEditMeeting = true;
    },
    closeEdit() {
      this.meetingKeySelected = null;
      this.meetingSelected = null;
      this.showEditMeeting = false;
    }
  }
};
</script>
