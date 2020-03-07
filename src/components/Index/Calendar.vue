<template>
  <div>
    <q-card
      class="relative-position card-congregazione q-mt-lg"
      v-for="(meeting, when) in meetingsByDate"
      :key="when"
    >
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">{{ when }}</div>
      </q-card-section>
      <q-card-section>
        <calendar-item
          v-if="meeting.PUBLIC_MEETING_CHAIRMAN"
          icon="fas fa-user-tie"
          :items="meeting.PUBLIC_MEETING_CHAIRMAN"
          :title="$t('chairman') + ' ' + $t('for public meeting')"
        />

        <calendar-item
          v-if="meeting.WATCHTOWER_READER"
          icon="mdi-chess-rook"
          :items="meeting.WATCHTOWER_READER"
          :withTime="true"
          :title="$t('watchtower reader')"
        />

        <calendar-item
          v-if="meeting.CHRISTIAN_LIFE_CHAIRMAN"
          icon="fas fa-user-tie"
          :items="meeting.CHRISTIAN_LIFE_CHAIRMAN"
          :title="$t('chairman') + ' ' + $t('for christian life meeting')"
        />

        <calendar-item
          v-if="meeting.CHRISTIAN_LIFE_PRAYERS"
          icon="fas fa-praying-hands"
          :items="meeting.CHRISTIAN_LIFE_PRAYERS"
          :title="$t('christian life meeting prayers')"
        />

        <calendar-item
          v-if="meeting.BOOK_READER"
          icon="mdi-book-open-page-variant"
          :items="meeting.BOOK_READER"
          :title="$t('book study reader')"
        />

        <calendar-item
          v-if="meeting.ATTENDANTS"
          icon="mdi-shield-account"
          :items="meeting.ATTENDANTS"
          :title="$t('attendants')"
        />

        <calendar-item
          v-if="meeting.MICROPHONE_HANDLERS"
          icon="fas fa-microphone"
          :items="meeting.MICROPHONE_HANDLERS"
          :title="$t('microphone handlers')"
        />

        <calendar-item
          v-if="meeting.SOUND_DEPARTMENT"
          icon="mdi-surround-sound"
          :items="meeting.SOUND_DEPARTMENT"
          :title="$t('sound department')"
        />

        <calendar-item
          v-if="meeting.MEETINGS_FOR_FIELD_SERVICE"
          icon="card_travel"
          :items="meeting.MEETINGS_FOR_FIELD_SERVICE"
          :withTime="true"
          :title="$t('meetings for field service')"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CalendarItem from "./CalendarItem";
export default {
  name: "Calendar",
  components: {
    CalendarItem
  },
  computed: {
    meetingsByDate: function() {
      let out = {};

      let type = "ATTENDANTS";
      Object.keys(this.attendants).forEach(key => {
        const item = this.attendants[key];
        out[item.when] = out[item.when] || {};
        out[item.when][type] = out[item.when][type] || {};
        out[item.when][type] = [
          item.who1 ? item.who1.label : null,
          item.who2 ? item.who2.label : null,
          item.who3 ? item.who3.label : null
        ];
      });

      type = "MICROPHONE_HANDLERS";
      Object.keys(this.microphoneHandlers).forEach(key => {
        const item = this.microphoneHandlers[key];
        out[item.when] = out[item.when] || {};
        out[item.when][type] = out[item.when][type] || {};
        out[item.when][type] = [
          item.who1 ? item.who1.label : null,
          item.who2 ? item.who2.label : null,
          item.who3 ? item.who3.label : null
        ];
      });

      type = "SOUND_DEPARTMENT";
      Object.keys(this.soundDepartment).forEach(key => {
        const item = this.soundDepartment[key];
        out[item.when] = out[item.when] || {};
        out[item.when][type] = out[item.when][type] || {};
        out[item.when][type] = [
          item.who1 ? item.who1.label : null,
          item.who2 ? item.who2.label : null,
          item.who3 ? item.who3.label : null
        ];
      });

      type = "WATCHTOWER_READER";
      Object.keys(this.publicMeetingReaders).forEach(key => {
        const item = this.publicMeetingReaders[key];
        out[item.when] = out[item.when] || {};
        out[item.when][type] = out[item.when][type] || {};
        out[item.when][type] = item.who.label;
      });

      type = "PUBLIC_MEETING_CHAIRMAN";
      Object.keys(this.publicMeetingChairmans).forEach(key => {
        const item = this.publicMeetingChairmans[key];
        out[item.when] = out[item.when] || {};
        out[item.when][type] = out[item.when][type] || {};
        out[item.when][type] = item.who.label;
      });

      type = "MEETINGS_FOR_FIELD_SERVICE";
      Object.keys(this.meetingsForFieldService).forEach(key => {
        const item = this.meetingsForFieldService[key];
        const day = item.when.substring(0, 10);
        const hour = item.when.substring(11, 16);
        out[day] = out[day] || {};
        out[day][type] = out[day][type] || {};
        out[day][type][hour] = item.who.label;
      });

      type = "CHRISTIAN_LIFE_CHAIRMAN";
      Object.keys(this.christianLifeChairmans).forEach(key => {
        const item = this.christianLifeChairmans[key];
        if (typeof item.who === "undefined") {
          // Sopravvive ad un errore di scrittura
          return;
        }
        out[item.when] = out[item.when] || {};
        out[item.when][type] = out[item.when][type] || {};
        out[item.when][type] = item.who.label;
      });

      type = "BOOK_READER";
      Object.keys(this.bookReaders).forEach(key => {
        const item = this.bookReaders[key];
        out[item.when] = out[item.when] || {};
        out[item.when][type] = out[item.when][type] || {};
        out[item.when][type] = item.who.label;
      });

      type = "CHRISTIAN_LIFE_PRAYERS";
      Object.keys(this.christianLifePrayers).forEach(key => {
        const item = this.christianLifePrayers[key];
        out[item.when] = out[item.when] || {};
        out[item.when][type] = out[item.when][type] || {};
        out[item.when][type] = [
          item.who1 ? item.who1.label : null,
          item.who2 ? item.who2.label : null,
          item.who3 ? item.who3.label : null
        ];
      });

      let sorted = {};
      let keyOrdered = Object.keys(out);

      // out.sort((a, b) => {
      //   if (a > b) return 1;
      //   else if (b < a) return -1;
      //   else return 0;
      // });

      keyOrdered
        .sort((a, b) => {
          if (a > b) return 1;
          else if (a < b) return -1;
          else return 0;
        })
        .forEach(key => {
          sorted[key] = out[key];
        });

      return sorted;
    },
    ...mapGetters("attendants", { attendants: "meetingsSorted" }),
    ...mapGetters("microphoneHandlers", {
      microphoneHandlers: "meetingsSorted"
    }),
    ...mapGetters("soundDepartment", {
      soundDepartment: "meetingsSorted"
    }),
    ...mapGetters("publicMeetingReaders", {
      publicMeetingReaders: "meetingsSorted"
    }),
    ...mapGetters("publicMeetingChairmans", {
      publicMeetingChairmans: "meetingsSorted"
    }),
    ...mapGetters("meetingsForFieldService", {
      meetingsForFieldService: "meetingsSorted"
    }),
    ...mapGetters("christianLifeChairmans", {
      christianLifeChairmans: "meetingsSorted"
    }),
    ...mapGetters("bookReaders", {
      bookReaders: "meetingsSorted"
    }),
    ...mapGetters("christianLifePrayers", {
      christianLifePrayers: "meetingsSorted"
    })
  }
};
</script>

<style lang="scss" scoped>
.card-congregazione {
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
}
</style>
