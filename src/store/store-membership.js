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

    userMembership.on("child_removed", snapshot => {
      console.log("memberOf - child_removed - ", snapshot.key, snapshot.val());
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
