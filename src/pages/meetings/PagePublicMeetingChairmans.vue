<template>
  <q-page>
    <internal-container
      :title="($t('chairmans') + ' ' + $t('for public meeting')) | titleCase"
    >
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

      <div class="fixed-bottom text-center q-mb-lg no-pointer-events">
        <q-btn
          round
          color="primary"
          size="24px"
          class="all-pointer-events"
          icon="add"
          @click="showAdd = true"
        />
      </div>

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
import { mapGetters } from "vuex";
import AddMeeting from "../../components/meetings/PublicMeetingChairmans/AddMeeting";
import EditMeeting from "../../components/meetings/PublicMeetingChairmans/EditMeeting";
import ScrollArea from "../../components/Shared/ScrollArea";
import InternalContainer from "../../components/Shared/InternalContainer";
import SingleEntry from "../../components/meetings/shared/SingleEntry";

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
    ScrollArea,
    SingleEntry,
    InternalContainer
  },
  computed: {
    ...mapGetters("publicMeetingChairmans", ["meetingsSorted"])
  },
  methods: {
    openForEdit(key, meeting) {
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
