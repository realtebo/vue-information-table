<template>
  <q-page>
    <internal-container
      :title="
        ($t('watchtower\'s readers') + ' ' + $t('for public meeting'))
          | titleCase
      "
    >
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
import AddMeeting from "../../components/meetings/PublicMeetingReaders/AddMeeting";
import EditMeeting from "../../components/meetings/PublicMeetingReaders/EditMeeting";
import ScrollArea from "../../components/Shared/ScrollArea";
import InternalContainer from "../../components/Shared/InternalContainer";
export default {
  name: "PagePublicMeetingReaders",
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
    ...mapGetters("publicMeetingReaders", ["meetingsSorted"])
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
