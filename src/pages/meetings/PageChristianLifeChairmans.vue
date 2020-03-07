<template>
  <assignments
    :pageTitle="$t('chairmans')"
    :pageTitle2="$t('for christian life meeting')"
    namespace="christianLifeChairmans"
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
