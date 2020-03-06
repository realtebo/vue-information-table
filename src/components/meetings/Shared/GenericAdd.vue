<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h5">
        {{ $t(this.subject) | titleCase }} {{ $t(this.subject2) | titleCase }}
      </div>
      <q-space />
      <q-btn flat round dense icon="close" v-close-popup />
    </q-card-section>

    <template v-if="numberOfPublishers">
      <q-form @submit.prevent="submitForm">
        <q-card-section>
          <!-- Start When -->
          <q-input
            v-if="hasWhen"
            outlined
            v-model="meetingToSubmit.when"
            class="q-mb-sm"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="meetingToSubmit.when"
                    :today-btn="true"
                    :first-day-of-week="1"
                    :mask="whenWithTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append v-if="whenWithTime">
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time
                    v-model="meetingToSubmit.when"
                    mask="YYYY-MM-DD HH:mm"
                    format24h
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <!-- End When -->

          <!-- Start Who -->
          <q-select
            v-if="hasWho"
            class="q-mb-sm"
            outlined
            v-model="meetingToSubmit.who"
            :options="publishersOptions"
            :label="whoLabel"
          />
          <!-- End Who-->

          <!-- Start Who 1 -->
          <q-select
            v-if="hasWho1"
            class="q-mb-sm"
            outlined
            v-model="meetingToSubmit.who1"
            :options="publishersOptions"
            :label="who1Label"
          />
          <!-- End Who 1-->

          <!-- Start Who 2 -->
          <q-select
            v-if="hasWho2"
            class="q-mb-sm"
            outlined
            v-model="meetingToSubmit.who2"
            :options="publishersOptions"
            :label="who2Label"
          />
          <!-- End Who 2-->

          <!-- Start Who 3 -->
          <q-select
            v-if="hasWho3"
            class="q-mb-sm"
            outlined
            v-model="meetingToSubmit.who3"
            :options="publishersOptions"
            :label="who3Label"
          />
          <!-- End Who 2-->
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Save" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </template>
    <template v-else>
      <q-card-section>
        {{
          $t(
            "There are no publishers assigned to this role. Go to Publishers's list and enable at least one publisher for this assignment"
          )
        }}
      </q-card-section>
    </template>
  </q-card>
</template>

<script>
export default {
  name: "GenericAdd",
  props: {
    subject: String,
    subject2: String,
    namespace: String,
    hasWhen: Boolean,
    whenWithTime: Boolean,
    hasWho: Boolean,
    whoLabel: String,
    hasWho1: Boolean,
    who1Label: String,
    hasWho2: Boolean,
    who2Label: String,
    hasWho3: Boolean,
    who3Label: String
  },
  data() {
    return {
      meetingToSubmit: {}
    };
  },
  created() {
    if (this.hasWhen) {
      meetingToSubmit.when = null;
    }
    if (this.hasWho) {
      meetingToSubmit.who = null;
    }
    if (this.hasWho1) {
      meetingToSubmit.who1 = null;
    }
    if (this.hasWho2) {
      meetingToSubmit.who2 = null;
    }
    if (this.hasWho3) {
      meetingToSubmit.who3 = null;
    }
  },
  computed: {
    numberOfPublisherProperty() {
      const titled = this.$options.filters.firstUpper(this.namespace);
      return "publishers/numberOf" + titled;
    },
    publisherProperty() {
      return "publishers/" + this.namespace;
    },
    addAction() {
      return this.namespace + "/addMeeting";
    },
    numberOfPublishers() {
      return this.$store.getters[this.numberOfPublisherProperty];
    },
    publishers() {
      return this.$store.getters[this.publisherProperty];
    },
    publishersOptions: function() {
      let options = [];
      let publishers = this.publishers;
      if (typeof publishers === "undefined") {
        return options;
      }
      Object.keys(publishers).forEach(key => {
        options.push({
          label: publishers[key].fullName,
          value: key
        });
      });
      return options;
    }
  },
  methods: {
    submitForm() {
      this.$store.dispatch(this.addAction, this.meetingToSubmit, {
        root: true
      });
      this.$emit("close");
    }
  }
};
</script>

<style></style>
