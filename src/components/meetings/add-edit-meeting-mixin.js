// Elementi validi sia per l'AddMetting che per l'EditMeeting

export default {
  computed: {
    // Per usare questa, assicurarsi di disporre di
    // - this.publishers
    publishersOptions: function() {
      let options = [];
      let publishers = this.publishers;
      if (typeof publishers === "undefined") {
        return options;
      }
      Object.keys(publishers).forEach(key => {
        options.push({
          label: publishers[key].fullName,
          value: key
        });
      });
      return options;
    }
  }
};
