import Vue from "vue";
import { firebaseDb } from "../boot/firebase";
import { uid, Notify } from "quasar";
import { showErrorMessage } from "../functions/function-show-error-message";

const state = {
  meetingsDownloaded: false,
  meetings: {}
};

const getters = {
  meetingsSorted: state => {
    let sorted = {};
    let dataToSort = state.meetings;
    let keyOrdered = Object.keys(dataToSort);
    keyOrdered.sort((a, b) => {
      let taskAProp =
        typeof dataToSort[a]["when"] !== "undefined"
          ? dataToSort[a]["when"]
          : "";
      let taskBProp =
        typeof dataToSort[b]["when"] !== "undefined"
          ? dataToSort[b]["when"]
          : "";
      if (taskAProp > taskBProp) return 1;
      else if (taskAProp < taskBProp) return -1;
      else return 0;
    });
    keyOrdered.forEach(key => {
      sorted[key] = dataToSort[key];
    });
    return sorted;
  }
};

const mutations = {
  setMeetingsDownloaded(state, value) {
    state.meetingsDownloaded = value;
  },
  addMeeting(state, payload) {
    Vue.set(state.meetings, payload.id, payload.meeting);
  },
  updateMeeting(state, payload) {
    // Si usa Object.assign perchè payload.updates contiene
    // un oggetto
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
      "public-meeting-chairmans/" + congregationId
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
  },

  addMeeting({ rootGetters }, meeting) {
    let meetingId = uid();
    let payload = {
      id: meetingId,
      meeting: meeting
    };

    let userMembership = rootGetters["membership/memberOf"];
    let congregationId = userMembership.id;
    let meetingsRef = firebaseDb.ref(
      "public-meeting-chairmans/" + congregationId
    );

    let new_key_ref = meetingsRef.push();
    new_key_ref.set(payload.meeting, error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        Notify.create("Meeting Added");
      }
    });
  },

  updateMeeting({ rootGetters }, payload) {
    let userMembership = rootGetters["membership/memberOf"];
    let congregationId = userMembership.id;
    let meetingsRef = firebaseDb.ref(
      "public-meeting-chairmans/" + congregationId + "/" + payload.id
    );

    meetingsRef.update(payload.updates, error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        Notify.create("Meeting updated");
      }
    });
  },

  deleteMeeting({ rootGetters }, id) {
    let userMembership = rootGetters["membership/memberOf"];
    let congregationId = userMembership.id;
    let meetingsRef = firebaseDb.ref(
      "public-meeting-chairmans/" + congregationId + "/" + id
    );
    meetingsRef.remove(error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        Notify.create("Meeting deleted");
      }
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
