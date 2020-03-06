// Quanto segue verrà applicato a tutti i components/<incarico>/EditMeeting.vue

export default {
  name: "EditMeeting",
  props: ["id", "meeting", "whenWithTime"],
  methods: {
    // Assicurarsi di disporre di
    // - this.meetingToSubmit
    // - this.updateMeeting
    submitForm() {
      this.updateMeeting({
        id: this.id,
        updates: this.meetingToSubmit
      });
      this.$emit("close");
    },

    // Assicurarsi di disporre di
    // - this.deleteMeeting
    promptToDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Really want to delete it?",
          ok: { color: "primary" },
          cancel: { color: "negative" },
          persistent: true
        })
        .onOk(() => {
          this.deleteMeeting(id);
          this.$emit("close");
        });
    }
  },
  mounted() {
    // Assicurarsi di disporre di
    // - this.meetingToSubmit
    this.meetingToSubmit = Object.assign({}, this.meeting);
  }
};
