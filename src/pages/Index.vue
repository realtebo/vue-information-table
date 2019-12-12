<template>
  <q-page padding class="bg-grey-3">
    <q-card class="relative-position card-congregazione">
      <q-card-section>
        <div class="text-h6">Congregazione</div>
      </q-card-section>

      <q-card-section>
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div>
            <p v-show="membershipDownloaded && memberOf">
              Sei parte della congregazione di
              {{ memberOf }}
            </p>
            <p v-show="membershipDownloaded && !memberOf">
              Non sei membro di nessuna congregazione. <br />
            </p>
          </div>
        </transition>
      </q-card-section>

      <q-tabs
        v-model="tab"
        class="text-teal"
        v-show="membershipDownloaded && !memberOf"
      >
        <q-tab label="Nuova" name="new" />
        <q-tab label="Esistente" name="join" />
      </q-tabs>

      <q-separator v-show="membershipDownloaded && !memberOf" />

      <q-tab-panels
        v-model="tab"
        animated
        v-show="membershipDownloaded && !memberOf"
      >
        <q-tab-panel name="new">
          Crea una nuova congregazione, e ne diventari amministratore, potendo
          inserire nominativi e impegni

          <div class="row q-mt-md">
            <q-input
              class="full-width"
              outlined
              v-model="new_congregation_name"
              label="Nome della nuova congregazione"
              stack-label
            />
          </div>

          <div class="row q-mt-md">
            <q-space />
            <q-btn
              color="secondary"
              label="Crea"
              @click="addMembershipAsAdmin"
            />
          </div>
        </q-tab-panel>

        <q-tab-panel name="join">
          Associati ad una già esistente; fatti dare il codice di invito e
          potrai visualizzare gli impegni, ma non amministrarli
        </q-tab-panel>
      </q-tab-panels>

      <q-inner-loading :showing="!membershipDownloaded">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { showErrorMessage } from "../functions/function-show-error-message";
import { Loading } from "quasar";
export default {
  name: "PageIndex",
  data() {
    return {
      tab: "new",
      new_congregation_name: ""
    };
  },
  computed: {
    ...mapGetters("membership", ["membershipDownloaded", "memberOf"])
  },
  methods: {
    ...mapActions("membership", ["fbAddCongregation"]),
    addMembershipAsAdmin() {
      Loading.show();
      if (!this.new_congregation_name) {
        showErrorMessage("Scegli come chiamare la nuova congregazione");
        return;
      }
      this.fbAddCongregation({
        name: this.new_congregation_name,
        setAdmin: true
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.card-congregazione {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
</style>
