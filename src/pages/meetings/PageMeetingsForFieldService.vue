<template>
  <q-page>
    <internal-container :title="$t('meetings for field service') | titleCase">
      <scroll-area>
        <q-list
          v-if="Object.keys(meetingsSorted).length > 0"
          separator
          bordered
        >
          <q-item
            v-for="(meeting, key) in meetingsSorted"
            :key="key"
            clickable
            v-ripple
            @click="openForEdit(key, meeting)"
          >
            <q-item-section>
              <q-item-label>
                <span class="text-h6">{{ meeting.when }}</span>
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <span class="text-h6">{{ meeting.who.label }}</span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </scroll-area>

      <div class="fixed-bottom text-center q-mb-lg no-pointer-events">
        <q-btn
          round
          color="primary"
          size="24px"
          class="all-pointer-events"
          icon="add"
          @click="showAddMeeting = true"
        />
      </div>

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
import { mapGetters } from "vuex";
import AddMeeting from "../../components/meetings/MeetingsForFieldService/AddMeeting";
import EditMeeting from "../../components/meetings/MeetingsForFieldService/EditMeeting";
import ScrollArea from "../../components/Shared/ScrollArea";
import InternalContainer from "../../components/Shared/InternalContainer";
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
    ScrollArea,
    InternalContainer
  },
  computed: {
    ...mapGetters("meetingsForFieldService", ["meetingsSorted"])
  },
  methods: {
    openForEdit(key, meeting) {
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
