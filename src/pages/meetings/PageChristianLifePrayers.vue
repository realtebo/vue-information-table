<template>
  <assignments
    :pageTitle="$t('prayers')"
    :pageTitle2="$t('for christian life meeting')"
    namespace="christianLifePrayers"
    :hasWhen="true"
    :hasWho1="true"
    :who1Label="$t('initial')"
    :hasWho2="true"
    :who2Label="$t('final')"
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
