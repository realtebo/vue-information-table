<template>
  <q-page class="bg-grey-3" padding>
    <q-card class="relative-position card-congregazione">
      <q-card-section>
        <div class="text-h6">
          {{ $t("Congregation") }}
          <span v-if="membershipDownloaded && memberOf.id">
            : {{ memberOf.name }}
          </span>
        </div>
      </q-card-section>

      <q-card-section v-if="membershipDownloaded">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div>
            <p v-if="!memberOf.id">
              {{ $t("Actually you are not member of any congregation") }}.
              <br />
            </p>

            <div
              class="row q-mb-md"
              v-if="
                membershipDownloaded && memberOf.id && !$q.platform.is.desktop
              "
            >
              <div class="col text-center">
                <q-btn
                  @click="logoutUser"
                  align="around"
                  class="btn-fixed-width"
                  color="accent"
                  icon="account_circle"
                  :label="$t('Logout')"
                />
              </div>
            </div>
          </div>
        </transition>
      </q-card-section>

      <q-tabs
        class="text-teal"
        v-model="tab"
        v-show="membershipDownloaded && !memberOf.id"
      >
        <q-tab :label="$t('New')" name="new" />
        <q-tab :label="$t('Existing')" name="join" />
      </q-tabs>

      <q-separator v-show="membershipDownloaded && !memberOf.id" />

      <q-tab-panels
        animated
        v-model="tab"
        v-show="membershipDownloaded && !memberOf.id"
      >
        <q-tab-panel name="new">
          {{
            $t(
              "Create a new congregation, and become its administrator, being able to enter names and commitments"
            )
          }}

          <div class="row q-mt-md">
            <q-input
              class="full-width"
              :label="$t('Name of the new congregation')"
              outlined
              stack-label
              v-model="new_congregation_name"
            />
          </div>

          <div class="row q-mt-md">
            <q-space />
            <q-btn
              @click="addMembershipAsAdmin"
              color="secondary"
              :label="$t('Create')"
            />
          </div>
        </q-tab-panel>

        <q-tab-panel name="join">
          {{
            $t(
              "Associate with an existing one; get the invitation code and you will be able to view the pledges, but not administer them"
            )
          }}

          <div class="row q-mt-md">
            <q-input
              class="full-width"
              :label="$t('Invitation code')"
              outlined
              stack-label
              v-model="invitation_code"
            />
          </div>

          <div class="row q-mt-md">
            <q-space />
            <q-btn
              @click="findCongregationByInvitationCode"
              color="secondary"
              :label="$t('Join')"
            />
          </div>
        </q-tab-panel>
      </q-tab-panels>

      <q-inner-loading :showing="!membershipDownloaded">
        <q-spinner-gears color="primary" size="50px" />
      </q-inner-loading>
    </q-card>

    <calendar></calendar>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { showErrorMessage } from "../functions/function-show-error-message";
import { Loading, Notify } from "quasar";
import Calendar from "../components/Index/Calendar";
export default {
  name: "PageIndex",
  components: {
    Calendar
  },
  data() {
    return {
      tab: "new",
      new_congregation_name: "",
      invitation_code: ""
    };
  },
  computed: {
    ...mapGetters("membership", ["membershipDownloaded", "memberOf"])
  },
  methods: {
    ...mapActions("membership", ["fbAddCongregation", "fbJoinToCongregation"]),
    ...mapActions("auth", ["logoutUser"]),
    ...mapActions("settings", ["findByInvitationCode"]),
    addMembershipAsAdmin() {
      Loading.show();
      if (!this.new_congregation_name) {
        showErrorMessage(this.$t("Choose what to call your new congregation"));
        return;
      }
      this.fbAddCongregation({
        name: this.new_congregation_name,
        setAdmin: true
      });
    },
    async findCongregationByInvitationCode() {
      // false | { key, name } dove key è l'id e name è il nome della congregazione
      const congregation_data = await this.findByInvitationCode(
        this.invitation_code
      );
      // In caso di errore, il find lo visualizza
      if (congregation_data === false) {
        Notify.create(this.$t("Invitation code not found"));
        return false;
      }
      this.fbJoinToCongregation({
        congregation_id: congregation_data.id,
        congregation_name: congregation_data.name
      }).then(() => {
        Notify.create(
          this.$t(
            "You have been added as a member of the requested congregation"
          )
        );
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.card-congregazione {
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
</style>
