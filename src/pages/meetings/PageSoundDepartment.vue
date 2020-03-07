<template>
  <assignments
    :pageTitle="$t('sound department')"
    namespace="soundDepartment"
    :hasWhen="true"
    :hasWho1="true"
    :who1Label="$t('first')"
    :hasWho2="true"
    :who2Label="$t('second')"
    :hasWho3="noOfPeopleAtSoundDepartment > 2"
    :who3Label="$t('third')"
  />
</template>

<script>
import { mapGetters } from "vuex";
import Assignments from "../../components/meetings/Assignments";

export default {
  name: "PageSoundDepartment",
  components: {
    Assignments
  },
  computed: {
    ...mapGetters("settings", ["noOfPeopleAtSoundDepartment"])
  }
};
</script>
