import { date } from "quasar";

/**
 * https://quasar.dev/quasar-utils/date-utils#Format-for-display
 */

export default {
  methods: {
    // da mysql al giorno della settimana, per esempio "lunedì"
    dayOfWeek: function(value) {
      const date_obj = date.extractDate(value, "YYYY-MM-DD");
      const timestamp = parseFloat(date.formatDate(date_obj, "x"));
      const format = "dddd";
      const day_names = this.$t("days");
      return date.formatDate(timestamp, format, { days: day_names });
    },
    // da mysql alla data locale, per esempio g/m/aaaa
    localizeDate: function(value) {
      const date_obj = date.extractDate(value, "YYYY-MM-DD");
      const timestamp = parseFloat(date.formatDate(date_obj, "x"));
      const format = this.$t("date_localized_format");
      return date.formatDate(timestamp, format);
    },
    // da mysql alla data locale, per esempio g/m/aaaa
    localizeLongDate: function(value) {
      const date_obj = date.extractDate(value, "YYYY-MM-DD");
      const timestamp = parseFloat(date.formatDate(date_obj, "x"));
      const format = this.$t("date_long_localized_format");
      const month_names = this.$t("months");
      return date.formatDate(timestamp, format, { months: month_names });
    },
    // da mysql alla data locale, per esempio g/m/aaaa
    localizeDateTime: function(value) {
      const date_obj = date.extractDate(value, "YYYY-MM-DD HH:mm");
      const timestamp = parseFloat(date.formatDate(date_obj, "x"));
      const format = this.$t("datetime_localized_format");
      return date.formatDate(timestamp, format);
    }
  }
};
