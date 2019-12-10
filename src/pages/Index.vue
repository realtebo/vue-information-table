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
              Crea una nuova congregazione, e ne diventari amministratore,
              potendo inserire nominativi e impegni <br />
              Oppure associati ad una già esistente; fatti dare il codice di
              invito e potrai visualizzare gli impegni, ma non amministrarli
            </p>
          </div>
        </transition>
      </q-card-section>

      <q-tabs
        v-model="tab"
        class="text-teal"
        v-show="membershipDownloaded && !memberOf"
      >
        <q-tab label="Tab one" name="one" />
        <q-tab label="Tab two" name="two" />
      </q-tabs>

      <q-separator v-show="membershipDownloaded && !memberOf" />

      <q-tab-panels
        v-model="tab"
        animated
        v-show="membershipDownloaded && !memberOf"
      >
        <q-tab-panel name="one">
          The QCard component is a great way to display important pieces of
          grouped content.
        </q-tab-panel>

        <q-tab-panel name="two">
          With so much content to display at once, and often so little screen
          real-estate, Cards have fast become the design pattern of choice for
          many companies, including the likes of Google and Twitter.
        </q-tab-panel>
      </q-tab-panels>

      <q-inner-loading :showing="!membershipDownloaded">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PageIndex",
  data() {
    return {
      tab: "one"
    };
  },
  computed: {
    ...mapGetters("membership", ["membershipDownloaded", "memberOf"])
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
