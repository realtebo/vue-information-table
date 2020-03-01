<template>
  <q-page padding>
    <instructions />
    <p>
      {{
        $t(
          "This feature is actually being develope, it's coming as soon as possible"
        )
      }}.
    </p>
    <div class="row">
      <q-card
        class="my-card  
          offset-xl-5 col-xl-2 
          offset-lg-4 col-lg-4 
          offset-sm-3 col-sm-6
          offset-xs-2 col-xs-8
          "
      >
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">
            {{ this.invitationCode ? this.invitationCode : "---------" }}
          </div>
          <div class="text-subtitle2">
            {{
              this.invitationCode
                ? $t("This is your invitation code")
                : $t("Click to generate a code")
            }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat @click="genereateCode">{{ $t("Generate") }}</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import Instructions from "../../components/Settings/Instructions";
import { mapGetters, mapActions } from "vuex";
import { Notify } from "quasar";
export default {
  name: "PageInvitation",
  components: {
    Instructions
  },
  computed: {
    ...mapGetters("settings", ["invitationCode"])
  },
  methods: {
    ...mapActions("settings", ["updateSetting"]),
    genereateCode() {
      let text = "";
      let chars = "1234567890";

      for (let i = 0; i < 6; i++) {
        text += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      const message = this.$t("Setting updated");
      this.updateSetting({
        key: "invitationCode",
        value: text
      }).then(() => {
        Notify.create(message);
      });
    }
  }
};
</script>

<style></style>
