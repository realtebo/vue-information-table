<template>
  <q-page class="q-pa-sm">
    <div class="q-pa-md absolute full-width full-height column">
      <h4 class="q-mt-none q-pt-sm">Meetings for Field Service</h4>

      <q-scroll-area class="q-scroll-area-meetings">
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
      </q-scroll-area>

      <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
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
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import AddMeeting from "../components/MeetingsForFieldService/AddMeeting";
import EditMeeting from "../components/MeetingsForFieldService/EditMeeting";
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
    EditMeeting
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

<style lang="scss" scoped>
.full-height {
  height: 99% !important;
}
.full-width {
  width: 99% !important;
}
.q-scroll-area-meetings {
  display: flex;
  flex-grow: 1;
  .mobile & {
    flex-basis: 100px;
  }
}
</style>
