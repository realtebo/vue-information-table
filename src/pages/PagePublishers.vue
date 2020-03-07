<template>
  <q-page>
    <internal-container
      :title="($t('publishers of') + ' ' + memberOf.name) | titleCase"
    >
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
                {{ $t("meetings for field service") | titleCase }}
              </q-item-label>

              <q-item-label
                caption
                v-if="publisher.presidesAsPublicMeetingChairman"
              >
                {{
                  ($t("chairman") + " " + $t("for public meeting")) | titleCase
                }}
              </q-item-label>

              <q-item-label caption v-if="publisher.readsWatchtower">
                {{ $t("watchtower reader") | titleCase }}
              </q-item-label>

              <q-item-label caption v-if="publisher.assignedToSoundDepartment">
                {{ $t("sound department") | titleCase }}
              </q-item-label>

              <q-item-label caption v-if="publisher.microphoneHandler">
                {{ $t("microphone handler") | titleCase }}
              </q-item-label>

              <q-item-label caption v-if="publisher.attendant">
                {{ $t("attendant") | titleCase }}
              </q-item-label>

              <q-item-label
                caption
                v-if="publisher.presidesAsChristianLifeChairman"
              >
                {{
                  ($t("chairman") + " " + $t("for christian life meeting"))
                    | titleCase
                }}
              </q-item-label>

              <q-item-label caption v-if="publisher.readsBook">
                {{ $t("book study reader") | titleCase }}
              </q-item-label>

              <q-item-label
                caption
                v-if="publisher.offersPrayerAtChristianLifeMeetings"
              >
                {{
                  ($t("prayers") + " " + $t("for christian life meeting"))
                    | titleCase
                }}
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
        <add-edit mode="add" @close="showAddPublisher = false" />
      </q-dialog>

      <q-dialog v-model="showEditPublisher" persistent>
        <add-edit
          mode="edit"
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
import AddEdit from "../components/Publishers/AddEdit";
// import EditPublisher from "../components/Publishers/EditPublisher";
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
    AddEdit,
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
