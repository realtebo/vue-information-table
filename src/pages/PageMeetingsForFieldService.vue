<template>
  <q-page class="q-pa-sm">
    <div class="q-pa-md absolute full-width full-height column">
      <h4 class="q-mt-none q-pt-sm">Meetings for Field Service</h4>

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
    </div>
  </q-page>
</template>

<script>
import AddMeeting from "../components/MeetingsForFieldService/AddMeeting";
// import EditMeeting from "../components/MeetingsForFieldService/EditMeeting";
export default {
  name: "PageMeetingsForFieldService",
  data() {
    return {
      showAddMeeting: false
    };
  },
  components: {
    AddMeeting
    //EditMeeting
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
</style>
