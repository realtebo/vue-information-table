<template>
  <q-page>
    <internal-container :title="$t('microphone handlers') | titleCase">
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
            <q-item-section v-if="meeting.who1">
              <q-item-label>
                <span class="text-h6">{{ meeting.who1.label }}</span>
              </q-item-label>
            </q-item-section>
            <q-item-section v-if="meeting.who2">
              <q-item-label>
                <span class="text-h6">{{ meeting.who2.label }}</span>
              </q-item-label>
            </q-item-section>
            <q-item-section v-if="meeting.who3">
              <q-item-label>
                <span class="text-h6">{{ meeting.who3.label }}</span>
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
import AddMeeting from "../../components/meetings/MicrophoneHandlers/AddMeeting";
import EditMeeting from "../../components/meetings/MicrophoneHandlers/EditMeeting";
import ScrollArea from "../../components/Shared/ScrollArea";
import InternalContainer from "../../components/Shared/InternalContainer";
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
    ScrollArea,
    InternalContainer
  },
  computed: {
    ...mapGetters("microphoneHandlers", ["meetingsSorted"])
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
