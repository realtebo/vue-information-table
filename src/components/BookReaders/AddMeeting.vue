<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Add Christian Life Meeting's Book Reader</div>
      <q-space />
      <q-btn flat round dense icon="close" v-close-popup />
    </q-card-section>

    <template v-if="numberOfBookReaders">
      <q-form @submit.prevent="submitForm">
        <q-card-section>
          <q-input outlined v-model="meetingToSubmit.when" class="q-mb-sm">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="meetingToSubmit.when"
                    :today-btn="true"
                    :first-day-of-week="1"
                    mask="YYYY-MM-DD"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-select
            class="q-mb-sm"
            outlined
            v-model="meetingToSubmit.who"
            :options="publishersOptions"
            label="Reader"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Save" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </template>
    <template v-else>
      <q-card-section>
        There are no publishers enabled as book reader for Christian Life
        Meeting. Go to Publishers's list and enable at least one publisher for
        this role
      </q-card-section>
    </template>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddMeeting",

  data() {
    return {
      meetingToSubmit: {
        when: null,
        who: null
      }
    };
  },
  methods: {
    ...mapActions("bookReaders", ["addMeeting"]),
    submitForm() {
      this.addMeeting(this.meetingToSubmit);
      this.$emit("close");
    }
  },
  computed: {
    ...mapGetters("publishers", ["bookReaders", "numberOfBookReaders"]),
    publishersOptions: function() {
      console.log("Lettori libro: ", this.numberOfBookReaders);
      console.log(this.bookReaders);
      let options = [];
      let publishers = this.bookReaders;
      Object.keys(publishers).forEach(key => {
        options.push({
          label: publishers[key].fullName,
          value: key
        });
      });
      return options;
    }
  }
};
</script>

<style scoped></style>
