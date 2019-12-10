<template>
  <q-form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ tab | titleCase }}
        to access To Do everywhere.
      </q-banner>
    </div>

    <div class="row ">
      <p class="col text-center">
        I suggest you to login using social login.
        <br />
        You will be registered automatically
      </p>
    </div>
    <div class="row q-mb-md">
      <div class="col text-center">
        <q-btn
          align="around"
          class="btn-fixed-width"
          color="accent"
          label="Google"
          icon="fab fa-google"
          @click="authWithGoogle"
        />
      </div>
    </div>

    <div class="row ">
      <p class="col text-center">
        Otherwise, feel free to use your email address and a password
      </p>
    </div>

    <div class="row q-mb-md">
      <q-input
        type="email"
        class="col"
        outlined
        v-model="formData.email"
        label="Email"
        ref="email"
        stack-label
        :rules="[
          val =>
            isValidEmailAddress(val) || 'Please enter a valid email address'
        ]"
        lazy-rules
      />
    </div>

    <div class="row q-mb-md">
      <q-input
        :rules="[val => val.length >= 6 || 'Please enter at least 6 chars']"
        lazy-rules
        type="password"
        class="col"
        outlined
        v-model="formData.password"
        label="Password"
        ref="password"
        stack-label
      />
    </div>

    <div class="row">
      <q-space />
      <q-btn type="submit" color="primary" :label="tab" />
    </div>
  </q-form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Register",
  props: ["tab"],
  data() {
    return {
      formData: {
        email: "test@test.com",
        password: "password"
      }
    };
  },
  methods: {
    ...mapActions("auth", ["registerUser", "loginUser", "authWithGoogle"]),
    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.tab === "login") {
          this.loginUser(this.formData);
        } else {
          this.registerUser(this.formData);
        }
      }
    },
    isValidEmailAddress(email) {
      // eslint-disable-next-line
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  },
  filters: {
    titleCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style scoped></style>
