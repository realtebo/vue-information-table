<template>
  <q-page padding>
    <q-card class="auth-tabs">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" :label="$t('Login')" />
        <q-tab name="register" :label="$t('Register')" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <login-register :tab="tab" />
        </q-tab-panel>

        <q-tab-panel name="register">
          <login-register :tab="tab" />
        </q-tab-panel>
      </q-tab-panels>

      <q-separator />
    </q-card>
  </q-page>
</template>

<script>
import LoginRegister from "../components/Auth/LoginRegister";

export default {
  name: "PageAuth",
  components: {
    LoginRegister
  },
  data() {
    return {
      tab: "login"
    };
  }
};
</script>

<style scoped>
.auth-tabs,
.social-login {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
</style>
