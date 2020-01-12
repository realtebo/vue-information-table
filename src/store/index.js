import Vue from "vue";
import Vuex from "vuex";

import auth from "./store-auth";
import membership from "./store-membership";
import publishers from "./store-publishers";
import meetingsForFieldService from "./store-meetings-for-field-service";
import publicMeetingChairmans from "./store-public-meeting-chairmans";
import publicMeetingReaders from "./store-public-meeting-readers";
import settings from "./store-settings";
import soundDepartment from "./store-sound-department";
import microphoneHandlers from "./store-microphone-handlers";
import attendants from "./store-attendants";
import christianLifeChairmans from "./store-christian-life-chairmans";
import bookReaders from "./store-book-readers";

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
      publicMeetingChairmans,
      publicMeetingReaders,
      settings,
      soundDepartment,
      microphoneHandlers,
      attendants,
      christianLifeChairmans,
      bookReaders
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
