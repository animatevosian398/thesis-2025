<template>
  <div>
    <!-- <h3>{{ documentData.title }}</h3> -->
    <!-- <p class="source-note">
      Published by
      <a :href="documentData.sourceUrl" target="_blank">{{
        documentData.source
      }}</a>
    </p> -->

    <div class="government-text">
      <p>
        <!-- <span
          class="highlight highlight-explicit-denial"
          :class="{
            'highlight-active': isHovered === 'Explicit_Denial',
            'highlight-selected': activeStance === 'Explicit_Denial',
          }"
          @mouseenter="onMouseEnter('Explicit_Denial')"
          @click="toggleActiveStance('Explicit_Denial')"
        > -->
        "Armenian Patriarch of Türkiye, Reverend Sahak Maşalyan, Distinguished
        Members of the Armenian Community, My Dear Citizens, I salute you
        wholeheartedly and with affection. I remember with respect the Ottoman
        Armenians who lost their lives under the
        <span
          class="highlight highlight-minimization"
          :class="{
            'highlight-active': isHovered === 'Minimization_Reframing',
            'highlight-selected': activeStance === 'Minimization_Reframing',
          }"
          @click="toggleActiveStance('Minimization_Reframing')"
        >
          harsh conditions of the First World War </span
        >and offer my condolences to their grandchildren. On this occasion, I
        wish Allah’s mercy upon all the Ottoman citizens who passed away
        <span
          class="highlight highlight-minimization"
          :class="{
            'highlight-active': isHovered === 'Minimization_Reframing',
            'highlight-selected': activeStance === 'Minimization_Reframing',
          }"
          @click="toggleActiveStance('Minimization_Reframing')"
        >
          due to the clashes, insurgencies as well as gang violence, and
          terrorist acts that occurred during the First World War.
        </span>
        With the earthquakes of February 6, the worst natural disaster of the
        century, we once again observed that we, as 85 million compatriots, find
        peace under the shadow of the same flag, share the same homeland, the
        same past and future and the same destiny.
        <span
          class="highlight highlight-reconciliation"
          :class="{
            'highlight-active': isHovered === 'Reconciliation_Discourse',
            'highlight-selected': activeStance === 'Reconciliation_Discourse',
          }"
          @click="toggleActiveStance('Reconciliation_Discourse')"
        >
          No matter how tragic it is, we must not allow the events of the past
          to overshadow our present and future. We believe that sharing the pain
          instead of comparing it is the best way to heal our wounds for the
          sake of our future.</span
        >
        With this understanding, we spare no effort in strengthening our
        domestic peace, reinforcing our unity and solidarity, and expanding the
        rights and freedoms of all our citizens with the steps that we have
        taken for the last 20 years. We strive to establish an inclusive and
        embracing environment in Türkiye where no one is marginalized and
        excluded because of their identity, faith and ethnicity. Recognizing our
        differences as a source of richness, we will continue to work with the
        aim of friendship and peace in the coming period, despite those who
        attempt to politicize history. We will continue to protect the rights
        and freedoms of our Armenian citizens who make irreplaceable
        contributions to the cultural, artistic, political, economic,
        educational, social and humanitarian life of our country. I sincerely
        believe that the esteemed members of the Armenian community will also
        give us the necessary support in these endeavors. With these thoughts, I
        once again respectfully commemorate the Ottoman citizens who passed
        <span
          class="highlight highlight-minimization"
          :class="{
            'highlight-active': isHovered === 'Minimization_Reframing',
            'highlight-selected': activeStance === 'Minimization_Reframing',
          }"
          @click="toggleActiveStance('Minimization_Reframing')"
        >
          passed away during the disintegration of the Empire."</span
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErdoganLetter2025",
  props: {
    documentData: {
      type: Object,
      required: true,
    },
    isHovered: String,
    activeStance: String,
  },
  methods: {
    onMouseEnter(stance) {
      this.$emit("showRelatedComments", stance);
    },
    onMouseLeave() {
      this.$emit("showAllComments");
    },
    toggleActiveStance(stance) {
      this.$emit("showRelatedComments", stance);
    },
  },
};
</script>

<style scoped>
@import "../../styles/shared.css";
</style>
