import Vue from "vue";
import Vuex from "vuex";

import auth from "./store-auth";
import membership from "./store-membership";
import publishers from "./store-publishers";
import settings from "./store-settings";

// "Standard" store
import { storeFarm } from "./store-farm";

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
      settings,

      meetingsForFieldService: storeFarm("/meetings-for-field-service/"),
      publicMeetingChairmans: storeFarm("/public-meeting-chairmans/"),
      publicMeetingReaders: storeFarm("/public-meeting-readers/"),
      soundDepartment: storeFarm("/sound-department/"),
      microphoneHandlers: storeFarm("/microphone-handlers/"),
      attendants: storeFarm("/attendants/"),
      christianLifeChairmans: storeFarm("/christian-life-chairmans/"),
      bookReaders: storeFarm("/book-readers/"),
      christianLifePrayers: storeFarm("/christian-life-prayers/")
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
