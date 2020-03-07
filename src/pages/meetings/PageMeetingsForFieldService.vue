<template>
  <assignments
    :pageTitle="$t('meetings for field service')"
    namespace="meetingsForFieldService"
    :hasWhen="true"
    :whenWithTime="true"
    :hasWho="true"
    :whoLabel="$t('conductor')"
  />
</template>

<script>
import Assignments from "../../components/meetings/Assignments";
export default {
  name: "PageMeetingsForFieldService",
  components: {
    Assignments
  }
};
</script>
