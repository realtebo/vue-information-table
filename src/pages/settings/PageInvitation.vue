<template>
  <q-page padding>
    <q-timeline color="secondary">
      <q-timeline-entry heading>
        {{ $t("Istructions") }}
      </q-timeline-entry>
      <q-timeline-entry
        :title="$t('What other user needs')"
        :subtitle="$t('Instruct the user')"
      >
        <div>
          {{
            $t(
              "After a new user registers to this app, he/she must choose if create a new congregation, or join to an existing one"
            )
          }}. <br />
          {{ $t("Tell him/her to choose to join an existing one") }}.
          {{
            $t(
              "Then, him/her must insert the invitation code that you can find or generate below these instructions"
            )
          }}.
          {{
            $t(
              "You, as admin, can find the code, if already generated, in the Congregation Setting Page"
            )
          }}.
        </div>
      </q-timeline-entry>
      <q-timeline-entry
        :title="$t('Generate the invitation code')"
        :subtitle="$t('It\'s your turn')"
      >
        <div>
          {{
            $t(
              "If you haven't generated the code yet, click on the button below to generate a new code, then tell the user you want to invite"
            )
          }}.
          {{
            $t(
              "If you have already generated the invitation code, and you have communicated it to the user, do not generate a new code otherwise the user you sent will not be able to complete the registration"
            )
          }}.
        </div>
      </q-timeline-entry>
    </q-timeline>
    <p>
      {{
        $t(
          "This feature is actually being develope, it's coming as soon as possible"
        )
      }}.
    </p>
  </q-page>
</template>

<script>
export default {
  name: "PageInvitation"
};
</script>

<style></style>
