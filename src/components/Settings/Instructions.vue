<template>
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
        {{ $t("Tell him/her to choose to join an existing one") }}. <br />
        {{
          $t(
            "Then, him/her must insert the invitation code that you can find or generate below these instructions"
          )
        }}.<br />
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
        }}. <br />
        {{
          $t(
            "If you have already generated the invitation code, and you have communicated it to the user, do not generate a new code otherwise the user you sent will not be able to complete the registration"
          )
        }}. <br />
      </div>
    </q-timeline-entry>
    <q-timeline-entry
      :title="$t('Wait for the user to join your congregation')"
      :subtitle="$t('Done') + '!'"
    >
      <div>
        {{
          $t(
            "The user will now need to register, choose to join an existing congregation, and enter the code that you have communicated to him or her"
          )
        }}. <br />
        {{ $t("That's all you, as administrator, have to do") }}. <br />
        {{
          $t(
            "Keep in mind that the invitation code remains valid at all times, so if you want to prevent it from being reused by someone else you can simply generate a new code"
          )
        }}
      </div>
    </q-timeline-entry>
  </q-timeline>
</template>

<script>
export default {
  name: "Instructions"
};
</script>

<style></style>
