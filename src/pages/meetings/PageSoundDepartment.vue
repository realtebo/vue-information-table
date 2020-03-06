<template>
  <q-page>
    <internal-container :title="$t('sound department') | titleCase">
      <entry-list namespace="soundDepartment" @edit="openForEdit" />

      <fab-add @add="showAdd = true" v-if="isAdmin" />

      <q-dialog v-model="showAdd" persistent>
        <add-edit
          mode="add"
          subject="sound department"
          namespace="soundDepartment"
          :hasWhen="true"
          :hasWho1="true"
          :who1Label="$t('first') | titleCase"
          :hasWho2="true"
          :who2Label="$t('second') | titleCase"
          :hasWho3="noOfPeopleAtSoundDepartment > 2"
          :who3Label="$t('third') | titleCase"
          @close="showAdd = false"
        />
      </q-dialog>

      <q-dialog v-model="showEdit" persistent>
        <add-edit
          mode="edit"
          :id="meetingKeySelected"
          :meeting="meetingSelected"
          subject="sound department"
          namespace="soundDepartment"
          :hasWhen="true"
          :hasWho1="true"
          :who1Label="$t('first') | titleCase"
          :hasWho2="true"
          :who2Label="$t('second') | titleCase"
          :hasWho3="noOfPeopleAtSoundDepartment > 2"
          :who3Label="$t('third') | titleCase"
          @close="closeEdit()"
        />
      </q-dialog>
    </internal-container>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import AddEdit from "../../components/meetings//AddEdit";
import EntryList from "../../components/meetings//EntryList";
import FabAdd from "../../components/meetings/FabAdd";
import InternalContainer from "../../components/Shared/InternalContainer";

export default {
  name: "PageSoundDepartment",
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
    ...mapState("membership", ["isAdmin"]),
    ...mapGetters("settings", ["noOfPeopleAtSoundDepartment"])
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
