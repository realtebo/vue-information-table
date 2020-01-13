import Vue from "vue";
import { firebaseDb } from "../boot/firebase";
import { Notify, date, uid } from "quasar";
import { showErrorMessage } from "../functions/function-show-error-message";

/**********************************
 *          HELPERS
 * Usati dalla fabbrica di stores
 * poco più sotto
 **********************************/

// Usata dalla storeGetterFarm
function sortByWhen(meetings) {
  let sorted = {};
  let keyOrdered = Object.keys(meetings);
  keyOrdered.sort((a, b) => {
    let taskAProp =
      typeof meetings[a]["when"] !== "undefined" ? meetings[a]["when"] : "";
    let taskBProp =
      typeof meetings[b]["when"] !== "undefined" ? meetings[b]["when"] : "";
    if (taskAProp > taskBProp) return 1;
    else if (taskAProp < taskBProp) return -1;
    else return 0;
  });
  keyOrdered.forEach(key => {
    sorted[key] = meetings[key];
  });
  return sorted;
}

// Usata dalla storeActionsFarm
// 1° Parametro: il context di vuex
// 2° Percorso: indicarlo sempre con lo slash finale
function listenFirebaseMeetings({ dispatch, commit, rootGetters }, root_path) {
  let userMembership = rootGetters["membership/memberOf"];
  let congregationId = userMembership.id;
  let meetingsRef = firebaseDb.ref(root_path + congregationId);

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
    const today = date.formatDate(Date.now(), "YYYY-MM-DD");
    if (today <= payload.meeting.when) {
      commit("addMeeting", payload);
    } else {
      dispatch("deleteMeeting", snapshot.key);
    }
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

// Usata dalla storeActionsFarm
// 1° Parametro: il context di vuex
// 2° Percorso: indicarlo sempre con lo slash finale
function addMeeting({ rootGetters }, root_path, meeting) {
  let meetingId = uid();
  let payload = {
    id: meetingId,
    meeting: meeting
  };

  let userMembership = rootGetters["membership/memberOf"];
  let congregationId = userMembership.id;
  let meetingsRef = firebaseDb.ref(root_path + congregationId);

  let new_key_ref = meetingsRef.push();
  new_key_ref.set(payload.meeting, error => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create("Meeting Added");
    }
  });
}

// Usata dalla storeActionsFarm
// 1° Parametro: il context di vuex
// 2° Percorso: indicarlo sempre con lo slash finale
function updateMeeting({ rootGetters }, root_path, payload) {
  let userMembership = rootGetters["membership/memberOf"];
  let congregationId = userMembership.id;
  let meetingsRef = firebaseDb.ref(
    root_path + congregationId + "/" + payload.id
  );

  meetingsRef.update(payload.updates, error => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create("Meeting updated");
    }
  });
}

// Usata dalla storeActionsFarm
// 1° Parametro: il context di vuex
// 2° Percorso: indicarlo sempre con lo slash finale
function deleteMeeting({ rootGetters }, root_path, id) {
  let userMembership = rootGetters["membership/memberOf"];
  let congregationId = userMembership.id;
  let meetingsRef = firebaseDb.ref(root_path + congregationId + "/" + id);
  meetingsRef.remove(error => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create("Meeting deleted");
    }
  });
}

/**********************************
 *         STORE FARM
 * Usa i metodi *Meeting qui sopra
 **********************************/

function storeStateFarm() {
  return {
    meetingsDownloaded: false,
    meetings: {}
  };
}

function storeGettersFarm() {
  return {
    meetingsSorted: state => sortByWhen(state.meetings)
  };
}

function storeMutationFarm() {
  return {
    reset(state) {
      state.meetingsDownloaded = false;
      state.meetings = {};
    },
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
}

function storeActionsFarm(root_path) {
  return {
    reset({ commit }) {
      commit("reset");
    },

    listenFirebaseMeetings(context) {
      listenFirebaseMeetings(context, root_path);
    },

    addMeeting(context, meeting) {
      addMeeting(context, root_path, meeting);
    },

    updateMeeting(context, payload) {
      updateMeeting(context, root_path, payload);
    },

    deleteMeeting(context, id) {
      deleteMeeting(context, root_path, id);
    }
  };
}

export function storeFarm(root_path) {
  return {
    namespaced: true,
    state: { ...storeStateFarm() },
    getters: { ...storeGettersFarm() },
    mutations: { ...storeMutationFarm() },
    actions: { ...storeActionsFarm(root_path) }
  };
}
