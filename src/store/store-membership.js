import { firebaseAuth, firebaseDb } from "../boot/firebase";
import { showErrorMessage } from "../functions/function-show-error-message";

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
        name: snapshot.key,
        isMember: snapshot.val()
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
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
