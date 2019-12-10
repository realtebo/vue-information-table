import { firebaseAuth, firebaseGoogleProvider } from "../boot/firebase";
import { LocalStorage, Loading } from "quasar";
import { showErrorMessage } from "../functions/function-show-error-message";

const state = {
  loggedIn: false
};
const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value;
  }
};
const actions = {
  registerUser(_, payload) {
    Loading.show();
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        // nothing to do
      })
      .catch(error => {
        showErrorMessage(error.message);
      });
  },
  authWithGoogle() {
    Loading.show();
    firebaseAuth
      .signInWithPopup(firebaseGoogleProvider)
      .then(() => {
        // Nothing to do
      })
      .catch(error => {
        showErrorMessage(error.message);
      });
  },
  loginUser(_, payload) {
    Loading.show();
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        // nothing to do
      })
      .catch(error => {
        showErrorMessage(error.message);
      });
  },
  logoutUser() {
    Loading.show();
    firebaseAuth.signOut();
  },
  handleAuthStateChange({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide();
      if (user) {
        commit("setLoggedIn", true);
        LocalStorage.set("loggedIn", true);
        // https://www.udemy.com/course/quasarframework/learn/lecture/16838528#questions
        this.$router.push("/").catch(() => {});
        dispatch("membership/fbReadData", null, { root: true });
      } else {
        commit("setLoggedIn", false);
        LocalStorage.set("loggedIn", false);
        // https://www.udemy.com/course/quasarframework/learn/lecture/16838528#questions
        this.$router.replace("/auth").catch(() => {});
      }
    });
  }
};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
