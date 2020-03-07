<template>
  <assignments
    :pageTitle="$t('chairmans')"
    :pageTitle2="$t('for public meeting')"
    namespace="publicMeetingChairmans"
    :hasWhen="true"
    :hasWho="true"
    :whoLabel="$t('chairman')"
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
