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
  }
};

const mutations = {
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
      console.log("Settings added", snapshot.key, snapshot.val());
      let payload = {
        id: snapshot.key,
        setting: snapshot.val()
      };
      commit("addSetting", payload);
    });

    settingsRef.on("child_changed", snapshot => {
      console.log("Settings changed", snapshot.key, snapshot.val());
      let payload = {
        id: snapshot.key,
        updates: snapshot.val()
      };
      commit("updateSetting", payload);
    });

    settingsRef.on("child_removed", snapshot => {
      console.log("Settings removed", snapshot.key);
      commit("deleteSetting", snapshot.key);
    });
  },

  updateSetting({ rootGetters }, payload) {
    let userMembership = rootGetters["membership/memberOf"];
    let congregationId = userMembership.id;
    let settingsRef = firebaseDb.ref("settings/" + congregationId);

    settingsRef.update(
      {
        [payload.key]: payload.value
      },
      error => {
        if (error) {
          showErrorMessage(error.message);
        } else {
          Notify.create("Setting updated");
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
