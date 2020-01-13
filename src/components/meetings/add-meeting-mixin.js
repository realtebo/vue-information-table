// Necessari solo per l'AddMeeting

export default {
  name: "AddMeeting",
  methods: {
    // Assicurarsi di disporre di
    // - this.meetingToSubmit
    // - this.addMeeting
    submitForm() {
      this.addMeeting(this.meetingToSubmit);
      this.$emit("close");
    }
  }
};
