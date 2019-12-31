import Vue from "vue";
import { firebaseDb } from "../boot/firebase";
// import { uid, Notify } from "quasar";
import { showErrorMessage } from "../functions/function-show-error-message";

const state = {
  meetingsDownloaded: false,
  meetings: {}
};

const getters = {
  meetingsSorted: state => state.meetings
};

const mutations = {
  setMeetingsDownloaded(state, value) {
    state.meetingsDownloaded = value;
  },
  addMeeting(state, payload) {
    Vue.set(state.meetings, payload.id, payload.meeting);
  },
  updateMeeting(state, payload) {
    Object.assign(state.meetings[payload.id], payload.updates);
  },
  deleteMeeting(state, id) {
    Vue.delete(state.meetings, id);
  }
};

const actions = {
  listenFirebaseMeetings({ commit, rootGetters }) {
    let userMembership = rootGetters["membership/memberOf"];
    let congregationId = userMembership.id;
    let meetingsRef = firebaseDb.ref(
      "meetings-for-field-service/" + congregationId
    );

    meetingsRef.once(
      "value",
      () => {
        commit("setMeetingsDownloaded", true);
      },
      error => {
        showErrorMessage(error.message);
        this.$router.replace("/auth");
      }
    );

    meetingsRef.on("child_added", snapshot => {
      let payload = {
        id: snapshot.key,
        meeting: snapshot.val()
      };
      commit("addMeeting", payload);
    });

    meetingsRef.on("child_changed", snapshot => {
      let payload = {
        id: snapshot.key,
        updates: snapshot.val()
      };
      commit("updateMeeting", payload);
    });

    meetingsRef.on("child_removed", snapshot => {
      commit("deleteMeeting", snapshot.key);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
