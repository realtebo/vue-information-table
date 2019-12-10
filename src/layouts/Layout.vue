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
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Essential Links </q-item-label>

        <q-item clickable to="/publishers">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Publishers</q-item-label>
            <q-item-label caption>Anagraphics</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
            <q-item-label caption>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "MyLayout",
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
