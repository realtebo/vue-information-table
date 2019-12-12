import { firebaseAuth, firebaseDb } from "../boot/firebase";
import { showErrorMessage } from "../functions/function-show-error-message";
import { Notify, Loading } from "quasar";

const state = {
  membershipDownloaded: false,
  memberOf: null
};
const getters = {
  membershipDownloaded: state => state.membershipDownloaded,
  memberOf: state => state.memberOf
};
const mutations = {
  setMembershipDownloaded(state, value) {
    state.membershipDownloaded = value;
  },
  setMembership(state, payload) {
    console.log("setMembership", payload);
    if (payload.isMember) {
      state.memberOf = payload.name;
    } else {
      state.memberOf = null;
    }
  }
};
const actions = {
  fbReadData({ commit }) {
    let userId = firebaseAuth.currentUser.uid;
    let userMembership = firebaseDb.ref("memberOf/" + userId);

    userMembership.on("child_added", snapshot => {
      let payload = {
        name: snapshot.val().name,
        isMember: true
      };
      commit("setMembership", payload);
    });

    userMembership.on("child_changed", snapshot => {
      let payload = {
        name: snapshot.val().name,
        isMember: true
      };
      commit("setMembership", payload);
    });

    userMembership.on("child_removed", snapshot => {
      console.log("memberOf - child_removed - ", snapshot.key, snapshot.val());
      let payload = {
        name: null,
        isMember: false
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
