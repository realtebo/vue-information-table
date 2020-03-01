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
    // Si usa Vue.set perchè payload.updates NON è un oggetto
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
  updateSetting({ state, rootGetters }, payload) {
    let userMembership = rootGetters["membership/memberOf"];
    let congregationId = userMembership.id;
    let settingsRef = firebaseDb.ref("settings/" + congregationId);

    // Mi assicuro che anche le vecchie congregazioni abbiano il nome nelle impostazioni
    if (typeof state.settings.name === "undefined") {
      settingsRef.update({
        name: rootGetters["membership/memberOf"].name
      });
    }

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
  },
  async findByInvitationCode(_, payload) {
    const code = payload;

    // Filtro per figlio: https://firebase.google.com/docs/database/admin/retrieve-data#ordering-by-a-specified-child-key
    let settingsRef = firebaseDb.ref("settings");

    // questo modo di fare la query equivale a 'where invitationCode = <codice contenuto nel payload>"
    // il risultato è un DataSnapshot dove
    // - result.key è "settings"
    // -.val() è un Datasnapshot (il primo figlio è il nodo che noi dobbiamo esaminare)
    const result = await settingsRef
      .indexOn("invitationCode")
      .orderByChild("invitationCode")
      .equalTo(payload)
      .limitToFirst(1)
      .once(
        "value",
        snapshot => {
          const out = {
            id: snapshot.key,
            name: snapshot.val() ? snapshot.val().name : null
          };
          return out;
        },
        error => {
          showErrorMessage(error.message);
          return false;
        }
      );

    if (typeof result.val !== "function") {
      //console.log("Tipo non previsto", typeof result.val);
      return false;
    }
    const congregation_node = result.val(); // DataSnapshot
    if (congregation_node === null) {
      return false;
    }

    // Ricavo il primo figlio
    const first_key = Object.keys(congregation_node)[0];
    const congregation_data = congregation_node[first_key];
    // console.log("######");
    // console.log("first_key", first_key);
    // console.log("data", congregation_data);
    // console.log("######");

    // console.log(congregation_node);

    return { id: first_key, name: congregation_data.name };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
