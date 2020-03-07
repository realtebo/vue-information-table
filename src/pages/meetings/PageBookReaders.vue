<template>
  <assignments
    :pageTitle="$t('book study readers')"
    namespace="bookReaders"
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
