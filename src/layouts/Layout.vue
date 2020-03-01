<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="loggedIn"
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
        />

        <q-toolbar-title class="absolute-center">
          JW Information Table
        </q-toolbar-title>

        <template v-if="$q.platform.is.desktop">
          <q-btn
            v-if="loggedIn"
            @click="logoutUser"
            flat
            icon-right="account_circle"
            :label="$t('Logout')"
            class="absolute-right"
          />

          <q-btn
            v-else
            to="/auth"
            flat
            icon-right="account_circle"
            :label="$t('Login')"
            class="absolute-right"
          />
        </template>
      </q-toolbar>
    </q-header>

    <template v-if="loggedIn">
      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        content-class="bg-grey-2"
      >
        <q-list>
          <sidebar-item
            to="/"
            icon="home"
            :label="$t('Home')"
            :caption="$t('Dashboard')"
          />

          <q-separator />

          <q-item-label header>{{ $t("schedules") | titleCase }} </q-item-label>

          <sidebar-item
            to="/meetings-for-field-service"
            icon="card_travel"
            :label="$t('meetings for field service') | titleCase"
            :caption="$t('View and Edit Schedules')"
          />

          <sidebar-item
            to="/public-meeting-chairmans"
            icon="fas fa-user-tie"
            :label="$t('chairmans') | titleCase"
            :caption="$t('for public meeting') | titleCase"
          />

          <sidebar-item
            to="/public-meeting-readers"
            icon="mdi-chess-rook"
            :label="$t('watchtower\'s readers') | titleCase"
            :caption="$t('for public meeting') | titleCase"
          />

          <sidebar-item
            to="/sound-department"
            icon="mdi-surround-sound"
            :label="$t('sound department') | titleCase"
            :caption="$t('Mixer, Pc, etc...')"
          />

          <sidebar-item
            to="/microphone-handlers"
            icon="fas fa-microphone"
            :label="$t('microphone handlers') | titleCase"
            :caption="$t('schedules') | titleCase"
          />

          <sidebar-item
            to="/attendants"
            icon="mdi-shield-account"
            :label="$t('attendants') | titleCase"
            :caption="$t('schedules') | titleCase"
          />

          <sidebar-item
            to="/christian-life-chairmans"
            icon="fas fa-user-tie"
            :label="$t('chairmans') | titleCase"
            :caption="$t('for christian life meeting') | titleCase"
          />

          <sidebar-item
            to="/christian-life-prayers"
            icon="fas fa-praying-hands"
            :label="$t('prayers') | titleCase"
            :caption="$t('for christian life meeting') | titleCase"
          />

          <sidebar-item
            to="/book-readers"
            icon="mdi-book-open-page-variant"
            :label="$t('book study readers') | titleCase"
            :caption="$t('for christian life meeting') | titleCase"
          />

          <q-separator />

          <q-item-label header>{{ $t("Settings") }} </q-item-label>

          <sidebar-item
            to="/publishers"
            icon="school"
            :label="$t('publishers') | titleCase"
            :caption="$t('Anagraphics and Roles')"
          />

          <sidebar-item
            to="/congregation-settings"
            icon="fas fa-cog"
            :label="$t('congregation settings') | titleCase"
            :caption="$t('Customize roles and departments')"
          />
        </q-list>
      </q-drawer>
    </template>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SidebarItem from "../components/Layout/SidebarItem";
export default {
  name: "MyLayout",
  components: {
    SidebarItem
  },
  computed: {
    ...mapState("auth", ["loggedIn"])
  },
  methods: {
    ...mapActions("auth", ["logoutUser"])
  },
  data() {
    return {
      leftDrawerOpen: false
    };
  }
};
</script>
