<template>
  <q-page padding class="bg-grey-3">
    <q-card class="relative-position card-congregazione">
      <q-card-section>
        <div class="text-h6">
          Congregation
          <span v-if="membershipDownloaded && memberOf.id">
            : {{ memberOf.name }}
          </span>
        </div>
      </q-card-section>

      <q-card-section v-if="membershipDownloaded">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div>
            <p v-if="!memberOf.id">
              Non sei membro di nessuna congregazione. <br />
            </p>

            <div
              class="row q-mb-md"
              v-if="
                membershipDownloaded && memberOf.id && !$q.platform.is.desktop
              "
            >
              <div class="col text-center">
                <q-btn
                  align="around"
                  class="btn-fixed-width"
                  color="accent"
                  label="Logout"
                  icon="account_circle"
                  @click="logoutUser"
                />
              </div>
            </div>
          </div>
        </transition>
      </q-card-section>

      <q-tabs
        v-model="tab"
        class="text-teal"
        v-show="membershipDownloaded && !memberOf.id"
      >
        <q-tab label="Nuova" name="new" />
        <q-tab label="Esistente" name="join" />
      </q-tabs>

      <q-separator v-show="membershipDownloaded && !memberOf.id" />

      <q-tab-panels
        v-model="tab"
        animated
        v-show="membershipDownloaded && !memberOf.id"
      >
        <q-tab-panel name="new">
          Crea una nuova congregazione, e ne diventari amministratore, potendo
          inserire nominativi e impegni

          <div class="row q-mt-md">
            <q-input
              class="full-width"
              outlined
              v-model="new_congregation_name"
              label="Nome della nuova congregazione"
              stack-label
            />
          </div>

          <div class="row q-mt-md">
            <q-space />
            <q-btn
              color="secondary"
              label="Crea"
              @click="addMembershipAsAdmin"
            />
          </div>
        </q-tab-panel>

        <q-tab-panel name="join">
          Associati ad una già esistente; fatti dare il codice di invito e
          potrai visualizzare gli impegni, ma non amministrarli
        </q-tab-panel>
      </q-tab-panels>

      <q-inner-loading :showing="!membershipDownloaded">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>

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
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { showErrorMessage } from "../functions/function-show-error-message";
import { Loading } from "quasar";
export default {
  name: "PageIndex",
  data() {
    return {
      tab: "new",
      new_congregation_name: ""
    };
  },
  computed: {
    ...mapGetters("membership", ["membershipDownloaded", "memberOf"]),

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
    }
  },
  methods: {
    ...mapActions("membership", ["fbAddCongregation"]),
    ...mapActions("auth", ["logoutUser"]),
    addMembershipAsAdmin() {
      Loading.show();
      if (!this.new_congregation_name) {
        showErrorMessage("Scegli come chiamare la nuova congregazione");
        return;
      }
      this.fbAddCongregation({
        name: this.new_congregation_name,
        setAdmin: true
      });
    }
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
