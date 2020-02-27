<template>
  <div>
    <q-card
      class="relative-position card-congregazione q-mt-lg"
      v-for="(meeting, when) in meetingsByDate"
      :key="when"
    >
      <q-card-section>
        <div class="text-h6">{{ when }}</div>

        <div v-if="meeting.ATTENDANTS" class="q-mb-sm">
          <div class="bold">
            ATTENDANTS: <br />
            <span
              v-for="(name, index) in meeting.ATTENDANTS"
              :key="`att_${when}_${index}`"
            >
              - {{ name }} <br />
            </span>
          </div>
        </div>

        <div v-if="meeting.MICROPHONE_HANDLERS" class="q-mb-sm">
          <div class="bold">
            MICROPHONE HANDLERS: <br />
            <span
              v-for="(name, index) in meeting.MICROPHONE_HANDLERS"
              :key="`att_${when}_${index}`"
            >
              <span v-if="name"> - {{ name }} <br /> </span>
            </span>
          </div>
        </div>

        <div v-if="meeting.SOUND_DEPARTMENT" class="q-mb-sm">
          <div class="bold">
            SOUND DEPARTMENT: <br />
            <span
              v-for="(name, index) in meeting.SOUND_DEPARTMENT"
              :key="`att_${when}_${index}`"
            >
              <span v-if="name"> - {{ name }} <br /> </span>
            </span>
          </div>
        </div>

        <div v-if="meeting.PUBLIC_MEETING_CHAIRMAN" class="q-mb-sm">
          <div class="bold">
            CHAIRMAN: <br />
            - {{ meeting.PUBLIC_MEETING_CHAIRMAN }}
          </div>
        </div>

        <div v-if="meeting.WATCHTOWER_READER" class="q-mb-sm">
          <div class="bold">
            WATCHTOWER READER: <br />
            - {{ meeting.WATCHTOWER_READER }}
          </div>
        </div>

        <div v-if="meeting.MEETINGS_FOR_FIELD_SERVICE">
          <div class="bold">
            MEETINGS FOR FIELD SERVICE: <br />
            <span
              v-for="(name, hour) in meeting.MEETINGS_FOR_FIELD_SERVICE"
              :key="`mffs_${when}_${hour}`"
            >
              - {{ hour }}: {{ name }} <br />
            </span>
          </div>
        </div>

        <div v-if="meeting.CHRISTIAN_LIFE_CHAIRMAN" class="q-mb-sm">
          <div class="bold">
            CHAIRMAN: <br />
            - {{ meeting.CHRISTIAN_LIFE_CHAIRMAN }}
          </div>
        </div>

        <div v-if="meeting.BOOK_READER" class="q-mb-sm">
          <div class="bold">
            BOOK'S READER: <br />
            - {{ meeting.BOOK_READER }}
          </div>
        </div>

        <div v-if="meeting.CHRISTIAN_LIFE_PRAYERS" class="q-mb-sm">
          <div class="bold">
            CHRISTIAN LIFE PRAYERS: <br />
            <span
              v-for="(name, index) in meeting.CHRISTIAN_LIFE_PRAYERS"
              :key="`att_${when}_${index}`"
            >
              <span v-if="name"> - {{ name }} <br /> </span>
            </span>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Calendar",
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
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
</style>
