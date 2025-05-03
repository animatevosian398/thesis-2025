<template>
  <!-- <h3>
    The Events of 1915 and the Turkish-Armenian Controversy over History:
    <br />An Overview
  </h3> -->
  <!-- <p class="source-note">
    Translated from Turkish. Original text published by
    <a
      href="https://www.mfa.gov.tr/the-events-of-1915-and-the-turkish-armenian-controversy-over-history_-an-overview.en.mfa"
      target="_blank"
    >
      the Republic of Turkey Ministry of Foreign Affairs.
    </a>
  </p> -->

  <div class="government-text" @mouseleave="onMouseLeave">
    <!-- <select
      class="document-title-select"
      v-model="activeDocument"
      @change="$emit('document-changed', activeDocument)"
    >
      <option v-for="doc in documents" :key="doc.id" :value="doc">
        {{ doc.title }}
      </option>
    </select> -->
    <p>
      <span
        >The final years of the Ottoman Empire was a tragic period for the
        people that made up the Empire. Turks, Armenians, and many others
        suffered immensely.</span
      >
      <span>
        This period needs to be understood in its entirety and the memory of so
        many lives lost has to be properly respected.
      </span>
      <span
        >Such an exercise requires a reliable factual basis, an open approach,
        and empathy.</span
      >
    </p>

    <p>
      <span
        class="highlight highlight-explicit-denial"
        :class="{
          'highlight-active': isHovered === 'Explicit_Denial',
          'highlight-selected': activeStance === 'Explicit_Denial',
        }"
        @click="toggleActiveStance('Explicit_Denial')"
      >
        The Armenian view of history, however, selects the Armenian suffering,
        embellishes it in several ways and presents it as a genocide – a crime
        defined in international law – perpetrated by Turks against Armenians.
      </span>
      <span
        >The acceptance of this version by others has become the national
        objective for Armenia and the radical groups within the Armenian
        Diaspora. Legitimate challenges to the Armenian narrative, even when
        based on scholarly research or personal histories, are brushed aside as
        propaganda, suppressed or attacked as "denial." This is often
        accompanied by anti-Turkish rhetoric and vilification of Turkish history
        and ancestry.
        <span
          class="highlight highlight-competitive-victimhood"
          :class="{
            'highlight-active':
              isHovered === 'Competitive_Victimhood_Historical_Inversion',
            'highlight-selected':
              activeStance === 'Competitive_Victimhood_Historical_Inversion',
          }"
          @click="
            toggleActiveStance('Competitive_Victimhood_Historical_Inversion')
          "
          >During the 1970s and onwards, such nationalistic zeal led to a terror
          campaign that took the lives of 31 Turkish diplomats and their family
          members, as well as 43 people from Turkish and other nationalities,
          and wounded many.</span
        >
      </span>
    </p>

    <p>
      As a consequence, eight centuries of Turkish-Armenian relationship, which
      was predominantly about friendship, tolerance and peaceful coexistence, is
      forgotten. Instead, only an incriminating version of the tragic events of
      1915 is taken to represent this relationship. Such an atmosphere makes it
      difficult for the two nations to come to terms openly with what happened
      during the First World War, draw the right lessons – instead of animosity
      – from their common history and renew their friendship.

      <span
        class="highlight highlight-reconciliation"
        :class="{
          'highlight-active': isHovered === 'Reconciliation_Discourse',
          'highlight-selected': activeStance === 'Reconciliation_Discourse',
        }"
        @click="toggleActiveStance('Reconciliation_Discourse')"
      >
        That is why Turkey has initiated a process aimed at an honest and open
        dialogue with Armenia. Successful conclusion of this process will not
        only benefit the two peoples, but will also contribute to regional
        peace, stability and reconciliation.</span
      >
    </p>

    <p>
      Turkey does not deny the suffering of Armenians, including the loss of
      many innocent lives, during the First World War.
      <span
        class="highlight highlight-competitive-victimhood"
        :class="{
          'highlight-active':
            isHovered === 'Competitive_Victimhood_Historical_Inversion',
          'highlight-selected':
            activeStance === 'Competitive_Victimhood_Historical_Inversion',
        }"
        @click="
          toggleActiveStance('Competitive_Victimhood_Historical_Inversion')
        "
      >
        However, greater numbers of Turks died or were killed in the years
        leading to and during the War.
      </span>

      <span
        >Without belittling the tragic consequences for any group, Turkey
        objects to the one-sided presentation of this tragedy as a genocide by
        one group against another.</span
      >
    </p>

    <p>
      <span
        class="highlight highlight-procedural"
        :class="{
          'highlight-active':
            isHovered === 'Procedural_Deflection_Evidence_Archives',
          'highlight-selected':
            activeStance === 'Procedural_Deflection_Evidence_Archives',
        }"
        @click="toggleActiveStance('Procedural_Deflection_Evidence_Archives')"
      >
        Turkey's views are based on available archival documents, academic
        research, oral history, knowledge of late 19th and early 20th century
        dynamics of major power rivalries in Europe, the recognition of the
        effects of nationalistic fervor among ethnic groups that formed the
        multi-national fabric of the Empire, as well as Turkey's own collective
        national memory including family histories of many Turks. These do not
        support the Armenian narrative.
      </span>
      <span
        class="highlight highlight-justification"
        :class="{
          'highlight-active': isHovered === 'Justification_Narrative',
          'highlight-selected': activeStance === 'Justification_Narrative',
        }"
        @click="toggleActiveStance('Justification_Narrative')"
      >
        Rather, they point to an empire at the verge of collapse fighting for
        survival on various fronts, major European powers strategizing, at least
        since the 1870s, to exploit the spoils, including the manipulation of
        ethnic groups like the Ottoman Armenians, politically-motivated
        missionary activities within Ottoman Turkey, radicalization and
        militarization of nationalistic Armenian groups, some of whom joined
        forces with the invading Russian army in the hope of creating an
        ethnically homogenous Armenian homeland.
      </span>
      <span
        >An Armenian leader of that time, Katchaznouni, who became the first
        Prime Minister of the short lived independent Armenian Democratic
        Republic stated the following in 1923:
        <span
          class="highlight highlight-justification"
          :class="{
            'highlight-active': isHovered === 'Justification_Narrative',
            'highlight-selected': activeStance === 'Justification_Narrative',
          }"
          @click="toggleActiveStance('Justification_Narrative')"
          >In the fall of 1914 Armenian volunteer units organized themselves and
          fought against the Turks</span
        >…We had no doubt that the war would end with the complete victory of
        the Allies; Turkey would be defeated and dismembered…"</span
      >
    </p>

    <p>
      <span
        class="highlight highlight-justification"
        :class="{
          'highlight-active': isHovered === 'Justification_Narrative',
          'highlight-selected': activeStance === 'Justification_Narrative',
        }"
        @click="toggleActiveStance('Justification_Narrative')"
      >
        In response, the Ottoman Government ordered in 1915 the Armenian
        population residing in or near the war zone to be relocated to the
        southern Ottoman provinces away from the supply routes and army
        transport lines on the way of the advancing Russian army. Some Armenians
        living away from the front, yet were reported or suspected to be
        involved in collaboration, were also included in mandatory transfer.
      </span>
    </p>

    <p>
      <span
        >Ottoman Government took a number of measures for safe transfer during
        the relocation. However, under war-time conditions
        <span
          class="highlight highlight-minimization"
          :class="{
            'highlight-active': isHovered === 'Minimization_Reframing',
            'highlight-selected': activeStance === 'Minimization_Reframing',
          }"
          @click="toggleActiveStance('Minimization_Reframing')"
        >
          exacerbated by internal strife, local groups seeking revenge,
          banditry, famine, epidemics, and a failing state apparatus (including
          unruly officials who were court-martialed and sentenced to capital
          punishment by the Ottoman Government in 1916, much before the end of
          the War) all combined to produce what became a tragedy.</span
        >
        Nevertheless,</span
      >
      <span
        class="highlight highlight-explicit-denial"
        :class="{
          'highlight-active': isHovered === 'Explicit_Denial',
          'highlight-selected': activeStance === 'Explicit_Denial',
        }"
        @click="toggleActiveStance('Explicit_Denial')"
      >
        no authentic evidence exists to support the claim that there was a
        premeditated plan by the Ottoman Government to kill off Armenians.
        Moreover, the Ottoman socio-cultural fabric did not harbor racist
        attitudes that would facilitate such a horrific crime.
      </span>
      <span
        >Loss of life, regardless of numbers and regardless of possible guilt on
        the part of the victims, is tragic and must be remembered. However,
        <span
          class="highlight highlight-explicit-denial"
          :class="{
            'highlight-active': isHovered === 'Explicit_Denial',
            'highlight-selected': activeStance === 'Explicit_Denial',
          }"
          @click="toggleActiveStance('Explicit_Denial')"
        >
          it is factually problematic, morally unsound and legally unfounded to
          call this episode a "genocide."</span
        >
      </span>
      <br />
      National memories are important, but do not constitute reality by
      themselves. The national memories of Turks and Armenians do not support
      each other. Therefore the need to build trust and reach a common, reliable
      basis of information becomes all the more important. It was Turkey who
      proposed to Armenia the establishment of a joint commission composed of
      Turkish and Armenian historians to study the events of 1915, in the
      archives of Turkey and Armenia and all other relevant archives in the
      third countries and to share their findings with the international public.
      Moreover the Protocols signed in October 2009 between Turkey and Armenia
      stipulates to "implement a dialogue on the historical dimension with the
      aim to restore mutual confidence between the two nations, including an
      impartial scientific examination of the historical records and archives to
      define existing problems and formulate recommendations."
      <span
        class="highlight highlight-procedural"
        :class="{
          'highlight-active':
            isHovered === 'Procedural_Deflection_Evidence_Archives',
          'highlight-selected':
            activeStance === 'Procedural_Deflection_Evidence_Archives',
        }"
        @click="toggleActiveStance('Procedural_Deflection_Evidence_Archives')"
      >
        This represents an opportunity for replacing the language of national
        conviction with the language of impartial knowledge. Once the relevant
        protocols are ratified both in Turkey and Armenia, this joint exercise
        will hopefully benefit from some of the critical Armenian archives that
        remain – unlike those in Turkey – closed to foreign researchers. The
        strong resistance shown by the Armenian Diaspora to the implementation
        of this process and to the idea of a joint/international study is both
        telling and worrying.</span
      >
    </p>

    <p>
      The fact remains that the issue is a matter of legitimate scholarly
      debate, with reputable historians on both sides. Privileging the Armenian
      views, even when reflecting well-intended attitudes to show solidarity
      with a group that has a painful past, does not do justice to the
      grievances experienced by so many. Compassion becomes problematic if it is
      selective.
    </p>
    <p>
      Although the matter has an overbearing humanitarian dimension, its legal
      dimension is also central to the debate. Genocide is a clearly defined
      crime. Genocide is not a generic word to be used loosely to describe some
      grave atrocity. It is the worst of crimes. Passing judgment on such an
      accusation should not be left to the mercy of political considerations. In
      this sense, Parliaments should not take the place of courts and deliver
      verdicts on it. In the same vein, Parliaments and other political
      institutions should not legislate and thereby politicize history. Such
      legislation is especially problematic when historians are debating the
      substance of the issue.
    </p>
    <p>
      <span
        class="highlight highlight-reconciliation"
        :class="{
          'highlight-active': isHovered === 'Reconciliation_Discourse',
          'highlight-selected': activeStance === 'Reconciliation_Discourse',
        }"
        @click="toggleActiveStance('Reconciliation_Discourse')"
      >
        Turks and Armenians should work to rebuild their historical friendship
        without forgetting the difficult periods in their common past. But in
        this endeavor, all sides must be honest and open-minded. Third countries
        can help this by supporting the normalization process between Turkey and
        Armenia</span
      >
      and by resisting those who want
      <span
        class="highlight highlight-explicit-denial"
        :class="{
          'highlight-active': isHovered === 'Explicit_Denial',
          'highlight-selected': activeStance === 'Explicit_Denial',
        }"
        @click="toggleActiveStance('Explicit_Denial')"
      >
        their version of history be adopted as uncontested truth.</span
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
  name: "GovernmentText",
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
