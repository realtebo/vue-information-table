<template>
  <q-page>
    <internal-container
      :title="
        ($t('chairmans') + ' ' + $t('for christian life meeting')) | titleCase
      "
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
import AddMeeting from "../../components/meetings/ChristianLifeChairmans/AddMeeting";
import EditMeeting from "../../components/meetings/ChristianLifeChairmans/EditMeeting";
import ScrollArea from "../../components/Shared/ScrollArea";
import InternalContainer from "../../components/Shared/InternalContainer";
import SingleEntry from "../../components/meetings/shared/SingleEntry";
import FabAdd from "../../components/meetings/shared/FabAdd";

export default {
  name: "PageChristianLifeChairmans",
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
    FabAdd,
    ScrollArea,
    SingleEntry,
    InternalContainer
  },
  computed: {
    ...mapState("membership", ["isAdmin"]),
    ...mapGetters("christianLifeChairmans", ["meetingsSorted"])
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
