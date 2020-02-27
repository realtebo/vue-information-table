<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
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
            label="Logout"
            class="absolute-right"
          />

          <q-btn
            v-else
            to="/auth"
            flat
            icon-right="account_circle"
            label="Login"
            class="absolute-right"
          />
        </template>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <sidebar-item to="/" icon="home" label="Home" caption="Dashboard" />

        <q-separator />

        <q-item-label header>Schedules</q-item-label>

        <sidebar-item
          to="/meetings-for-field-service"
          icon="card_travel"
          label="Meetings for Field Service"
          caption="View and Edit Schedules"
        />

        <sidebar-item
          to="/public-meeting-chairmans"
          icon="fas fa-user-tie"
          label="Chairmans"
          caption="For Public Meetings"
        />

        <sidebar-item
          to="/public-meeting-readers"
          icon="mdi-chess-rook"
          label="Watchtower's Readers"
          caption="For Public Meetings"
        />

        <sidebar-item
          to="/sound-department"
          icon="mdi-surround-sound"
          label="Sound Department"
          caption="Mixer, Pc, etc..."
        />

        <sidebar-item
          to="/microphone-handlers"
          icon="fas fa-microphone"
          label="Microphone Handlers"
          caption="Schedules"
        />

        <sidebar-item
          to="/attendants"
          icon="mdi-shield-account"
          label="Attendants"
          caption="Schedules"
        />

        <sidebar-item
          to="/christian-life-chairmans"
          icon="fas fa-user-tie"
          label="Chairmans"
          caption="For Christian Life Meeting"
        />

        <sidebar-item
          to="/christian-life-prayers"
          icon="fas fa-praying-hands"
          label="Prayers"
          caption="For Christian Life Meetings"
        />

        <sidebar-item
          to="/book-readers"
          icon="mdi-book-open-page-variant"
          label="Book's Readers"
          caption="For Christian Life Meetings"
        />

        <q-separator />

        <q-item-label header>Settings</q-item-label>

        <sidebar-item
          to="/publishers"
          icon="school"
          label="Publishers"
          caption="Anagraphics and Roles"
        />

        <sidebar-item
          to="/congregation-settings"
          icon="fas fa-cog"
          label="Congregation Settings"
          caption="Customize roles and department"
        />
      </q-list>
    </q-drawer>

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
