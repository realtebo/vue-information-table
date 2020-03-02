<template>
  <q-page>
    <internal-container :title="$t('book study readers') | titleCase">
      <entry-list namespace="bookReaders" @edit="openForEdit" />

      <fab-add @add="showAdd = true" v-if="isAdmin" />

      <q-dialog v-model="showAdd" persistent>
        <!-- <add-meeting @close="showAdd = false" /> -->
        <generic-add
          subject="book study readers"
          namespace="book-readers"
          hasWhen="true"
          hasWho="true"
          :whoLabel="$t('reader') | titleCase"
          @close="showAdd = false"
        />
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
import { mapState } from "vuex";
import EditMeeting from "../../components/meetings/BookReaders/EditMeeting";
import EntryList from "../../components/meetings/Shared/EntryList";
import FabAdd from "../../components/meetings/Shared/FabAdd";
import GenericAdd from "../../components/meetings/Shared/GenericAdd";
import InternalContainer from "../../components/Shared/InternalContainer";

export default {
  name: "PageBookReaders",
  data() {
    return {
      showAdd: false,
      showEdit: false,
      meetingSelected: null,
      meetingKeySelected: null
    };
  },
  components: {
    EditMeeting,
    EntryList,
    FabAdd,
    GenericAdd,
    InternalContainer
  },
  computed: {
    ...mapState("membership", ["isAdmin"])
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
