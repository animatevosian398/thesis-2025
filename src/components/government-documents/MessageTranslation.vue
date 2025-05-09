<template>
  <div class="government-text" @mouseleave="onMouseLeave">
    <p>
      “The 24th of April carries a particular significance for our Armenian
      citizens and for all Armenians around the world, and provides a valuable
      opportunity to share opinions freely on a historical matter.
      <br />
      It is indisputable that the last years of the Ottoman Empire were a
      difficult period, full of suffering for Turkish, Kurdish, Arab, Armenian
      and millions of other Ottoman citizens, regardless of their religion or
      ethnic origin. Any conscientious, fair and humanistic approach to these
      issues requires an understanding of all the sufferings endured in this
      period, without discriminating as to religion or ethnicity. Certainly,
      neither constructing hierarchies of pain nor comparing and contrasting
      suffering carries any meaning for those who experienced this pain
      themselves. As a Turkish proverb goes, “fire burns the place where it
      falls”. It is a duty of humanity to acknowledge that Armenians remember
      the suffering experienced in that period, just like every other citizen of
      the Ottoman Empire. In Turkey, expressing different opinions and thoughts
      freely on the events of 1915 is the requirement of a pluralistic
      perspective as well as of a culture of democracy and modernity. Some may
      perceive this climate of freedom in Turkey as an opportunity to express
      accusatory, offensive and even provocative assertions and allegations.
      Even so, if this will enable us to better understand historical issues
      with their legal aspects and to transform resentment to friendship again,
      it is natural to approach different discourses with empathy and tolerance
      and expect a similar attitude from all sides. The Republic of Turkey will
      continue to approach every idea with dignity in line with the universal
      values of law. Nevertheless, using the events of 1915 as an excuse for
      hostility against Turkey and turning this issue into a matter of political
      conflict is inadmissible.
      <span
        class="highlight highlight-minimization"
        :class="{
          'highlight-active': isHovered === 'Minimization_Reframing',
          'highlight-selected': activeStance === 'Minimization_Reframing',
        }"
        @click="toggleActiveStance('Minimization_Reframing')"
        >The incidents of the First World War are our shared pain. </span
      >To evaluate this painful period of history through a perspective of just
      memory is a humane and scholarly responsibility. Millions of people of all
      religions and ethnicities lost their lives in the First World War.
      <span
        class="highlight highlight-minimization"
        :class="{
          'highlight-active': isHovered === 'Minimization_Reframing',
          'highlight-selected': activeStance === 'Minimization_Reframing',
        }"
        @click="toggleActiveStance('Minimization_Reframing')"
        >Having experienced events which had inhumane consequences - such as
        relocation - during the First World War, should not prevent Turks and
        Armenians from establishing compassion and mutually humane attitudes
        among towards one another.
      </span>

      In today’s world, deriving enmity from history and creating new
      antagonisms are neither acceptable nor useful for building a common
      future. The spirit of the age necessitates dialogue despite differences,
      understanding by heeding others, evaluating means for compromise,
      denouncing hatred, and praising respect and tolerance. With this
      understanding, we, as the Turkish Republic, have called for the
      establishment of a joint historical commission in order to study the
      events of 1915 in a scholarly manner. This call remains valid. Scholarly
      research to be carried out by Turkish, Armenian and international
      historians would play a significant role in shedding light on the events
      of 1915 and an accurate understanding of history. It is with this
      understanding that we have opened our archives to all researchers. Today,
      hundreds of thousands of documents in our archives are at the service of
      historians. Looking to the future with confidence, Turkey has always
      supported scholarly and comprehensive studies for an accurate
      understanding of history. The people of Anatolia, who lived together for
      centuries regardless of their different ethnic and religious origins, have
      established common values in every field from art to diplomacy, from state
      administration to commerce. Today they continue to have the same ability
      to create a new future.
      <span
        class="highlight highlight-reconciliation"
        :class="{
          'highlight-active': isHovered === 'Reconciliation_Discourse',
          'highlight-selected': activeStance === 'Reconciliation_Discourse',
        }"
        @click="toggleActiveStance('Reconciliation_Discourse')"
        >It is our hope and belief that the peoples of an ancient and unique
        geography, who share similar customs and manners will be able to talk to
        each other about the past with maturity and to remember together their
        losses in a decent manner.</span
      >
      And it is with this hope and belief that we wish that the Armenians who
      lost their lives in the context of the early twentieth century rest in
      peace, and we convey our condolences to their grandchildren. Regardless of
      their ethnic or religious origins, we pay tribute, with compassion and
      respect,<span
        class="highlight highlight-minimization"
        :class="{
          'highlight-active': isHovered === 'Minimization_Reframing',
          'highlight-selected': activeStance === 'Minimization_Reframing',
        }"
        @click="toggleActiveStance('Minimization_Reframing')"
      >
        to all Ottoman citizens who lost their lives in the same period and
        under similar conditions.”</span
      >
    </p>
  </div>
  <!-- <select
        class="title-heading"
        v-model="activeDocument"
        @change="$emit('documentChanged', activeDocument)"
      >
        <option
          v-for="document in documentData"
          :key="document.id"
          :value="document"
        >
          {{ document.title }}
        </option>
      </select> -->
</template>

<script>
export default {
  props: {
    documentData: {
      type: Object,
      required: true,
    },
    // activeDocument: {
    //   type: Object,
    //   required: true,
    // },
  },
  name: "Presentation",
  data() {
    return {
      isHovered: null,
      activeStance: null,
      activeDocument: null,
    };
  },
  methods: {
    onMouseEnter(stance) {
      // Only update visual hover effect
      this.isHovered = stance;
      // No event emission on hover
    },

    onMouseLeave() {
      // Only clear hover state
      this.isHovered = null;
      // No event emission on mouse leave
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
