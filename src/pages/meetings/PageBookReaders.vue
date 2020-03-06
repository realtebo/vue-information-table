<template>
  <q-page>
    <internal-container :title="$t('book study readers') | titleCase">
      <entry-list namespace="bookReaders" @edit="openForEdit" />

      <fab-add @add="showAdd = true" v-if="isAdmin" />

      <q-dialog v-model="showAdd" persistent>
        <!-- <add-meeting @close="showAdd = false" /> -->
        <add-edit
          mode="add"
          subject="book study readers"
          namespace="bookReaders"
          :hasWhen="true"
          :hasWho="true"
          :whoLabel="$t('reader') | titleCase"
          @close="showAdd = false"
        />
      </q-dialog>

      <q-dialog v-model="showEdit" persistent>
        <add-edit
          mode="edit"
          :id="meetingKeySelected"
          :meeting="meetingSelected"
          subject="book study readers"
          namespace="bookReaders"
          :hasWhen="true"
          :hasWho="true"
          :whoLabel="$t('reader') | titleCase"
          @close="closeEdit()"
        />
      </q-dialog>
    </internal-container>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import AddEdit from "../../components/meetings//AddEdit";
import EntryList from "../../components/meetings//EntryList";
import FabAdd from "../../components/meetings/FabAdd";
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
    AddEdit,
    EntryList,
    FabAdd,
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
