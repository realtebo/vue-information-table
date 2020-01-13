<template>
  <q-page>
    <internal-container>
      <page-title>Publishers of {{ memberOf.name }}</page-title>

      <scroll-area>
        <q-list
          v-if="Object.keys(publishersSorted).length > 0"
          separator
          bordered
        >
          <q-item
            v-for="(publisher, key) in publishersSorted"
            :key="key"
            clickable
            v-ripple
            @click="openForEdit(key, publisher)"
          >
            <q-item-section>
              <q-item-label>
                <span class="text-h5">{{ publisher.fullName }}</span>
              </q-item-label>

              <q-item-label
                caption
                v-if="publisher.conductsMeetingsForFieldService"
              >
                Conducts Meetings for Field Service
              </q-item-label>

              <q-item-label
                caption
                v-if="publisher.presidesAsPublicMeetingChairman"
              >
                Presides as Public Meeting's Chairman
              </q-item-label>

              <q-item-label caption v-if="publisher.readsWatchtower">
                Reads Watchtower at Public Meetings
              </q-item-label>

              <q-item-label caption v-if="publisher.assignedToSoundDepartment">
                Assigned to Sound Department
              </q-item-label>

              <q-item-label caption v-if="publisher.microphoneHandler">
                Serves has Microphone Handler
              </q-item-label>

              <q-item-label caption v-if="publisher.attendant">
                Serves has Attendant
              </q-item-label>

              <q-item-label
                caption
                v-if="publisher.presidesAsChristianLifeChairman"
              >
                Presides as Christian Life Meeting's Chairman
              </q-item-label>

              <q-item-label caption v-if="publisher.readsBook">
                Reads Book at Christian Life Meeting
              </q-item-label>

              <q-item-label
                caption
                v-if="publisher.offersPrayerAtChristianLifeMeetings"
              >
                Offers Prayer at Christian Life Meetings
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
          @click="showAddPublisher = true"
        />
      </div>

      <q-dialog v-model="showAddPublisher" persistent>
        <add-publisher @close="showAddPublisher = false" />
      </q-dialog>

      <q-dialog v-model="showEditPublisher" persistent>
        <edit-publisher
          @close="closeEditPublisher()"
          :id="publisherKeySelected"
          :publisher="publisherSelected"
        />
      </q-dialog>
    </internal-container>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import AddPublisher from "../components/Publishers/AddPublisher";
import EditPublisher from "../components/Publishers/EditPublisher";
import PageTitle from "../components/Shared/PageTitle";
import ScrollArea from "../components/Shared/ScrollArea";
import InternalContainer from "../components/Shared/InternalContainer";
export default {
  name: "PagePublishers",
  data() {
    return {
      showAddPublisher: false,
      showEditPublisher: false,
      publisherSelected: null,
      publisherKeySelected: null
    };
  },
  components: {
    AddPublisher,
    EditPublisher,
    PageTitle,
    ScrollArea,
    InternalContainer
  },
  computed: {
    ...mapGetters("membership", ["memberOf"]),
    ...mapGetters("publishers", ["publishersSorted"])
  },
  methods: {
    openForEdit(key, publisher) {
      this.publisherKeySelected = key;
      this.publisherSelected = publisher;
      this.showEditPublisher = true;
    },
    closeEditPublisher() {
      this.publisherKeySelected = null;
      this.publisherSelected = null;
      this.showEditPublisher = false;
    }
  }
};
</script>
