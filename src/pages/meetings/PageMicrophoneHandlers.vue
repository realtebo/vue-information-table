<template>
  <assignments
    :pageTitle="$t('microphone handlers')"
    namespace="microphoneHandlers"
    :hasWhen="true"
    :hasWho1="true"
    :who1Label="$t('first')"
    :hasWho2="true"
    :who2Label="$t('second')"
    :hasWho3="true"
    :who3Label="$t('third')"
  />
</template>

<script>
import Assignments from "../../components/meetings/Assignments";

export default {
  name: "PageAttendants",
  components: {
    Assignments
  }
};
</script>
