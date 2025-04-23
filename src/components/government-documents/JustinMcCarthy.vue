<template>
  <div>
    <!-- <h3>{{ documentData.title }}</h3> -->
    <!-- <p class="source-note">
      Published by
      <a :href="documentData.sourceUrl" target="_blank">{{
        documentData.source
      }}</a>
    </p> -->

    <div class="government-text" @mouseleave="onMouseLeave">
      <!-- Document content with highlighted sections -->
      <p>
        <span
          class="highlight highlight-procedural"
          :class="{
            'highlight-active':
              isHovered === 'Procedural_Deflection_Evidence_Archives',
            'highlight-selected':
              activeStance === 'Procedural_Deflection_Evidence_Archives',
          }"
          @mouseenter="onMouseEnter('Procedural_Deflection_Evidence_Archives')"
          @click="toggleActiveStance('Procedural_Deflection_Evidence_Archives')"
        >
          Throughout recent debate on the Armenian Question one statement has
          characterized those who object to politicians' attempts to write
          history. "Let the Historians Decide." Few of us have stated what we
          mean by that statement. It is time to do so.
        </span>
      </p>

      <p>
        There is a vast difference between history written to defend one-sided
        nationalist convictions and what history should be. History intends to
        find the truth about the past. Historians recognize that the truth is
        illusive. They know they have prejudices that affect their judgement.
        They know that they never have all the facts. Yet they always try to
        find the truth, whatever that truth may be.
      </p>

      <p>
        <span
          class="highlight highlight-explicit-denial"
          :class="{
            'highlight-active': isHovered === 'Explicit_Denial',
            'highlight-selected': activeStance === 'Explicit_Denial',
          }"
          @mouseenter="onMouseEnter('Explicit_Denial')"
          @click="toggleActiveStance('Explicit_Denial')"
        >
          Nationalists who use history have a different set of goals. They use
          events from the past as weapons in their nations' battles. They have a
          purpose the triumph of their cause and will use anything to succeed in
          their goal. While a historian tries to collect all relevant facts and
          put them in a coherent picture, the nationalist selects those pieces
          of history that fit his purpose, ignoring the others.
        </span>
      </p>

      <p>
        <span
          class="highlight highlight-justification"
          :class="{
            'highlight-active': isHovered === 'Justification_Narrative',
            'highlight-selected': activeStance === 'Justification_Narrative',
          }"
          @mouseenter="onMouseEnter('Justification_Narrative')"
          @click="toggleActiveStance('Justification_Narrative')"
        >
          Like other men and women, historians have political goals and
          ideologies, but a true historian acknowledges his errors when the
          facts do support his belief. The nationalist apologist never does so.
          If the facts not fit his theories, the nationalist ignores those facts
          and looks for other ways to make his case. True historians can make
          intellectual mistakes. Nationalist apologists commit intellectual
          crimes.
        </span>
      </p>

      <p>
        The Armenian Question has long been plagued with nationalist studies.
        This has led to an inconsistent history that ignores the time-tested
        principles of historical research. Yet when the history of the Turks and
        Armenians is approached with the normal tools of history, a logical and
        consistent account results. "Let the historians decide" is a call for
        historical study like any other historical study, one that looks at all
        the facts, studies all the opinions, applies historical principles, and
        comes to logical conclusions.
      </p>

      <p>
        By the beginning of World War I, Armenians made up only 17% of the area
        they claimed as "Ottoman Armenia." In fact, if all the Armenians in the
        world had come to Eastern Anatolia, they still would not have been a
        majority there.
      </p>

      <!-- Displaying just a portion of the text for brevity -->
      <p>
        <span
          class="highlight highlight-minimization"
          :class="{
            'highlight-active': isHovered === 'Minimization_Reframing',
            'highlight-selected': activeStance === 'Minimization_Reframing',
          }"
          @mouseenter="onMouseEnter('Minimization_Reframing')"
          @click="toggleActiveStance('Minimization_Reframing')"
        >
          Two inferences can be drawn from the relatively small number of
          Armenians in the Ottoman East: The first is that by themselves, the
          Armenians of Anatolia would have been no great threat to the Ottoman
          State. Armenian rebels might have disrupted civil order, but there
          were too few of them to endanger Ottoman authority. Armenian rebels
          needed help from outside forces, help that could only be provided by
          the Russians.</span
        >
        <span
          class="highlight highlight-competitive-victimhood"
          :class="{
            'highlight-active':
              isHovered === 'Competitive_Victimhood_Historical_Inversion',
            'highlight-selected':
              activeStance === 'Competitive_Victimhood_Historical_Inversion',
          }"
          @mouseenter="
            onMouseEnter('Competitive_Victimhood_Historical_Inversion')
          "
          @click="
            toggleActiveStance('Competitive_Victimhood_Historical_Inversion')
          "
        >
          The second inference is that Armenian nationalists could have created
          a state that was truly theirs only if they first evicted the Muslims
          who lived there.
        </span>
      </p>

      <p>
        <span
          class="highlight highlight-reconciliation"
          :class="{
            'highlight-active': isHovered === 'Reconciliation_Discourse',
            'highlight-selected': activeStance === 'Reconciliation_Discourse',
          }"
          @mouseenter="onMouseEnter('Reconciliation_Discourse')"
          @click="toggleActiveStance('Reconciliation_Discourse')"
        >
          I suggest, as I have suggested before, that the Turkish Republic
          propose to the Armenian Republic that a joint commission be
          established, its members selected by scholarly academies in both
          countries.
        </span>
        <span
          class="highlight-procedural"
          :class="{
            'highlight-active':
              isHovered === 'Procedural_Deflection_Evidence_Archives',
            'highlight-selected':
              activeStance === 'Procedural_Deflection_Evidence_Archives',
          }"
          @mouseenter="onMouseEnter('Procedural_Deflection_Evidence_Archives')"
          @click="toggleActiveStance('Procedural_Deflection_Evidence_Archives')"
        >
          All archives should be opened to the commission - not only the Ottoman
          Archives, but the archives of Armenia and of the Armenian
          Revolutionary Federation.
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "JustinMcCarthy",
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
/* @import "../styles/shared.css"; */
</style>
