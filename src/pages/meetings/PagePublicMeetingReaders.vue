<template>
  <assignments
    :pageTitle="$t('watchtower\'s readers')"
    namespace="publicMeetingReaders"
    :hasWhen="true"
    :hasWho="true"
    :whoLabel="$t('reader')"
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
