import { firebaseAuth, firebaseDb } from "../boot/firebase";
import { showErrorMessage } from "../functions/function-show-error-message";
import { Notify, Loading } from "quasar";

const state = {
  membershipDownloaded: false,
  memberOf: null,
  isAdmin: false,
  firebaseId: null
};
const getters = {
  membershipDownloaded: state => state.membershipDownloaded,
  memberOf: state => {
    return { name: state.memberOf, id: state.firebaseId };
  }
};
const mutations = {
  setMembershipDownloaded(state, value) {
    state.membershipDownloaded = value;
  },
  setMembership(state, payload) {
    if (payload.isMember) {
      state.memberOf = payload.name;
      state.isAdmin = payload.isAdmin;
      state.firebaseId = payload.firebaseId;
    } else {
      state.memberOf = null;
      state.isAdmin = false;
      state.firebaseId = null;
    }
  }
};
const actions = {
  reset({ commit, dispatch }) {
    let payload = {
      name: null,
      isMember: false,
      isAdmin: false,
      firebaseId: null
    };
    commit("setMembership", payload);

    dispatch("publishers/reset", null, { root: true });
    dispatch("meetingsForFieldService/reset", null, { root: true });
    dispatch("publicMeetingChairmans/reset", null, { root: true });
    dispatch("publicMeetingReaders/reset", null, { root: true });
    dispatch("settings/reset", null, { root: true });
    dispatch("soundDepartment/reset", null, { root: true });
    dispatch("microphoneHandlers/reset", null, { root: true });
    dispatch("attendants/reset", null, { root: true });
  },
  fbReadData({ commit, dispatch }) {
    let userId = firebaseAuth.currentUser.uid;
    let userMembership = firebaseDb.ref("memberOf/" + userId);

    userMembership.on("child_added", snapshot => {
      let payload = {
        name: snapshot.val().name,
        isMember: true,
        isAdmin: snapshot.val().isAdmin,
        firebaseId: snapshot.key
      };
      commit("setMembership", payload);
    });

    userMembership.on("child_changed", snapshot => {
      let payload = {
        name: snapshot.val().name,
        isMember: true,
        isAdmin: snapshot.val().isAdmin,
        firebaseId: snapshot.key
      };
      commit("setMembership", payload);
    });

    userMembership.on("child_removed", () => {
      let payload = {
        name: null,
        isMember: false,
        isAdmin: false,
        firebaseId: null
      };
      commit("setMembership", payload);
    });

    // Eseguito una volta sola
    // Per fortuna on('child_added') viene eseguita prima
    // di questa, cosi posso salvare e solo dopo confermare
    // l'avvenuto download o meno
    // Si noti che se non sono state scaricate membership
    // allora state.memberOf rimarrà nullo
    userMembership.once(
      "value",
      () => {
        commit("setMembershipDownloaded", true);
        // Listening to publishers data
        dispatch("publishers/listenFirebasePublishers", null, { root: true });
        // Listening to meetings for field service data
        dispatch("meetingsForFieldService/listenFirebaseMeetings", null, {
          root: true
        });
        dispatch("publicMeetingChairmans/listenFirebaseMeetings", null, {
          root: true
        });
        dispatch("publicMeetingReaders/listenFirebaseMeetings", null, {
          root: true
        });
        dispatch("settings/listenFirebaseSettings", null, {
          root: true
        });
        dispatch("soundDepartment/listenFirebaseMeetings", null, {
          root: true
        });
        dispatch("microphoneHandlers/listenFirebaseMeetings", null, {
          root: true
        });
        dispatch("attendants/listenFirebaseMeetings", null, {
          root: true
        });

        // Se si aggiungono degli altri listeners, assicurarsi di eseguire
        // il complementare reset nella action reset, poco più sopra
      },
      error => {
        showErrorMessage(error.message);
        this.$router.replace("/auth");
      }
    );
  },

  fbAddCongregation(_, payload) {
    let userId = firebaseAuth.currentUser.uid;
    let user_ref = firebaseDb.ref("memberOf/" + userId + "/");
    let new_key_ref = user_ref.push();
    new_key_ref.set(
      {
        name: payload.name,
        isAdmin: payload.setAdmin
      },
      error => {
        if (error) {
          showErrorMessage(error.message);
        } else {
          Notify.create("Nuova congregazione creata");
          Loading.hide();
        }
      }
    );
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
