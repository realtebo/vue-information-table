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
  },
  meetingsForFieldService: (state, getters) => {
    let publishersFiltered = {};
    let publishers = getters.publishersSorted;
    Object.keys(publishers).forEach(key => {
      let publisher = publishers[key];
      if (publisher.conductsMeetingsForFieldService) {
        publishersFiltered[key] = publisher;
      }
    });
    return publishersFiltered;
  },
  numberOfMeetingsForFieldService: (state, getters) => {
    return Object.keys(getters.meetingsForFieldService).length;
  },
  publicMeetingChairmans: (state, getters) => {
    let publishersFiltered = {};
    let publishers = getters.publishersSorted;
    Object.keys(publishers).forEach(key => {
      let publisher = publishers[key];
      if (publisher.presidesAsPublicMeetingChairman) {
        publishersFiltered[key] = publisher;
      }
    });
    return publishersFiltered;
  },
  numberOfPublicMeetingChairmans: (state, getters) => {
    return Object.keys(getters.publicMeetingChairmans).length;
  },
  publicMeetingReaders: (state, getters) => {
    let publishersFiltered = {};
    let publishers = getters.publishersSorted;
    Object.keys(publishers).forEach(key => {
      let publisher = publishers[key];
      if (publisher.readsWatchtower) {
        publishersFiltered[key] = publisher;
      }
    });
    return publishersFiltered;
  },
  numberOfPublicMeetingReaders: (state, getters) => {
    return Object.keys(getters.publicMeetingReaders).length;
  },
  soundDepartment: (state, getters) => {
    let publishersFiltered = {};
    let publishers = getters.publishersSorted;
    Object.keys(publishers).forEach(key => {
      let publisher = publishers[key];
      if (publisher.assignedToSoundDepartment) {
        publishersFiltered[key] = publisher;
      }
    });
    return publishersFiltered;
  },
  numberOfSoundDepartment: (state, getters) => {
    return Object.keys(getters.soundDepartment).length;
  },
  microphoneHandlers: (state, getters) => {
    let publishersFiltered = {};
    let publishers = getters.publishersSorted;
    Object.keys(publishers).forEach(key => {
      let publisher = publishers[key];
      if (publisher.microphoneHandler) {
        publishersFiltered[key] = publisher;
      }
    });
    return publishersFiltered;
  },
  numberOfMicrophoneHandlers: (state, getters) => {
    return Object.keys(getters.microphoneHandlers).length;
  },
  attendants: (state, getters) => {
    let publishersFiltered = {};
    let publishers = getters.publishersSorted;
    Object.keys(publishers).forEach(key => {
      let publisher = publishers[key];
      if (publisher.attendant) {
        publishersFiltered[key] = publisher;
      }
    });
    return publishersFiltered;
  },
  numberOfAttendants: (state, getters) => {
    return Object.keys(getters.attendants).length;
  },
  christianLifeChairmans: (state, getters) => {
    let publishersFiltered = {};
    let publishers = getters.publishersSorted;
    Object.keys(publishers).forEach(key => {
      let publisher = publishers[key];
      if (publisher.presidesAsChristianLifeChairman) {
        publishersFiltered[key] = publisher;
      }
    });
    return publishersFiltered;
  },
  numberOfChristianLifeChairmans: (state, getters) => {
    return Object.keys(getters.christianLifeChairmans).length;
  },
  bookReaders: (state, getters) => {
    let publishersFiltered = {};
    let publishers = getters.publishersSorted;
    Object.keys(publishers).forEach(key => {
      let publisher = publishers[key];
      if (publisher.readsBook) {
        publishersFiltered[key] = publisher;
      }
    });
    return publishersFiltered;
  },
  numberOfBookReaders: (state, getters) => {
    return Object.keys(getters.bookReaders).length;
  },
  christianLifePrayers: (state, getters) => {
    let publishersFiltered = {};
    let publishers = getters.publishersSorted;
    Object.keys(publishers).forEach(key => {
      let publisher = publishers[key];
      if (publisher.offersPrayerAtChristianLifeMeetings) {
        publishersFiltered[key] = publisher;
      }
    });
    return publishersFiltered;
  },
  numberOfChristianLifePrayers: (state, getters) => {
    return Object.keys(getters.christianLifePrayers).length;
  }
};

const mutations = {
  reset(state) {
    state.publishersDownloaded = false;
    state.publishers = {};
  },
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
  reset({ commit }) {
    commit("reset");
  },
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
