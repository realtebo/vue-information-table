import Vue from "vue";
import { firebaseDb } from "../boot/firebase";
import { Notify } from "quasar";
import { showErrorMessage } from "../functions/function-show-error-message";

const state = {
  settingsDownloaded: false,
  settings: {}
};

const getters = {
  noOfPeopleAtSoundDepartment: state => {
    return state.settings.noOfPeopleAtSoundDepartment
      ? state.settings.noOfPeopleAtSoundDepartment
      : 1;
  },
  invitationCode: state => {
    return state.settings.invitationCode ? state.settings.invitationCode : null;
  }
};

const mutations = {
  reset(state) {
    state.setSettingsDownloaded = false;
    state.settings = {};
  },
  setSettingsDownloaded(state, value) {
    state.settingsDownloaded = value;
  },
  addSetting(state, payload) {
    Vue.set(state.settings, payload.id, payload.setting);
  },
  updateSetting(state, payload) {
    // Si usa Vues.set perchè payload.updates NON è un oggetto
    Vue.set(state.settings, payload.id, payload.updates);
  },
  deleteSetting(state, id) {
    Vue.delete(state.settings, id);
  }
};

const actions = {
  reset({ commit }) {
    commit("reset");
  },
  listenFirebaseSettings({ commit, rootGetters }) {
    let userMembership = rootGetters["membership/memberOf"];
    let congregationId = userMembership.id;
    let settingsRef = firebaseDb.ref("settings/" + congregationId);

    settingsRef.once(
      "value",
      () => {
        commit("setSettingsDownloaded", true);
      },
      error => {
        showErrorMessage(error.message);
        this.$router.replace("/auth");
      }
    );

    settingsRef.on("child_added", snapshot => {
      let payload = {
        id: snapshot.key,
        setting: snapshot.val()
      };
      commit("addSetting", payload);
    });

    settingsRef.on("child_changed", snapshot => {
      let payload = {
        id: snapshot.key,
        updates: snapshot.val()
      };
      commit("updateSetting", payload);
    });

    settingsRef.on("child_removed", snapshot => {
      commit("deleteSetting", snapshot.key);
    });
  },

  updateSetting({ rootGetters }, payload) {
    let userMembership = rootGetters["membership/memberOf"];
    let congregationId = userMembership.id;
    let settingsRef = firebaseDb.ref("settings/" + congregationId);

    return settingsRef.update(
      {
        [payload.key]: payload.value
      },
      error => {
        if (error) {
          showErrorMessage(error.message);
        }
      }
    );
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
