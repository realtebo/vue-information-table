import Vue from "vue";
import { firebaseDb } from "../boot/firebase";
import { uid, Notify } from "quasar";
import { showErrorMessage } from "../functions/function-show-error-message";

const state = {
  publishersDownloaded: false,
  publishers: {}
};

const getters = {
  publishersSorted: state => {
    let publishersSorted = {};
    let keyOrdered = Object.keys(state.publishers);

    keyOrdered.sort((a, b) => {
      let taskAProp =
        typeof state.publishers[a]["fullName"] !== "undefined"
          ? state.publishers[a]["fullName"].toLowerCase()
          : "";
      let taskBProp =
        typeof state.publishers[b]["fullName"] !== "undefined"
          ? state.publishers[b]["fullName"].toLowerCase()
          : "";
      if (taskAProp > taskBProp) return 1;
      else if (taskAProp < taskBProp) return -1;
      else return 0;
    });

    keyOrdered.forEach(key => {
      publishersSorted[key] = state.publishers[key];
    });

    return publishersSorted;
  }
};

const mutations = {
  setPublishersDownloaded(state, value) {
    state.publishersDownloaded = value;
  },
  addPublisher(state, payload) {
    Vue.set(state.publishers, payload.id, payload.publisher);
  },
  updatePublisher(state, payload) {
    Object.assign(state.publishers[payload.id], payload.updates);
  },
  deletePublisher(state, id) {
    Vue.delete(state.publishers, id);
  }
};

const actions = {
  addPublisher({ rootGetters }, publisher) {
    let publisherId = uid();
    let payload = {
      id: publisherId,
      publisher: publisher
    };

    let userMembership = rootGetters["membership/memberOf"];
    let congregationId = userMembership.id;
    let publisherRef = firebaseDb.ref("publishers/" + congregationId);

    let new_key_ref = publisherRef.push();
    new_key_ref.set(payload.publisher, error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        Notify.create("Publisher Added");
      }
    });
  },
  updatePublisher({ rootGetters }, payload) {
    let userMembership = rootGetters["membership/memberOf"];
    let congregationId = userMembership.id;
    let publisherRef = firebaseDb.ref(
      "publishers/" + congregationId + "/" + payload.id
    );

    publisherRef.update(payload.updates, error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        let keys = Object.keys(payload.updates);
        console.log("updatePublisher has no errors, keys are: ", keys);
        Notify.create("Publisher updated");
      }
    });
  },
  deletePublisher({ rootGetters }, id) {
    let userMembership = rootGetters["membership/memberOf"];
    let congregationId = userMembership.id;
    let publisherRef = firebaseDb.ref(
      "publishers/" + congregationId + "/" + id
    );
    publisherRef.remove(error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        Notify.create("Publisher deleted");
      }
    });
  },
  listenFirebasePublishers({ commit, rootGetters }) {
    let userMembership = rootGetters["membership/memberOf"];
    let congregationId = userMembership.id;
    let publisherRef = firebaseDb.ref("publishers/" + congregationId);

    publisherRef.once(
      "value",
      () => {
        commit("setPublishersDownloaded", true);
      },
      error => {
        showErrorMessage(error.message);
        this.$router.replace("/auth");
      }
    );

    publisherRef.on("child_added", snapshot => {
      let payload = {
        id: snapshot.key,
        publisher: snapshot.val()
      };
      commit("addPublisher", payload);
    });

    publisherRef.on("child_changed", snapshot => {
      let payload = {
        id: snapshot.key,
        updates: snapshot.val()
      };
      commit("updatePublisher", payload);
    });

    publisherRef.on("child_removed", snapshot => {
      commit("deletePublisher", snapshot.key);
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
