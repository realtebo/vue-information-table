<template>
  <q-page class="q-pa-sm">
    <div class="q-pa-md absolute full-width full-height column">
      <h4 class="q-mt-none q-pt-sm">Publishers of {{ memberOf.name }}</h4>

      <q-scroll-area class="q-scroll-area-publishers">
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
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import AddPublisher from "../components/Publishers/AddPublisher";
import EditPublisher from "../components/Publishers/EditPublisher";
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
    EditPublisher
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

<style lang="scss" scoped>
.full-height {
  height: 99% !important;
}
.full-width {
  width: 99% !important;
}
.q-scroll-area-publishers {
  display: flex;
  flex-grow: 1;
  .mobile & {
    flex-basis: 100px;
  }
}
</style>
