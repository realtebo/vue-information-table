import Vue from "vue";
import Vuex from "vuex";

import auth from "./store-auth";
import membership from "./store-membership";
import publishers from "./store-publishers";
import meetingsForFieldService from "./store-meetings-for-field-service";
import publicMeetingChairmans from "./store-public-meeting-chairmans";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      membership,
      publishers,
      meetingsForFieldService,
      publicMeetingChairmans
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
