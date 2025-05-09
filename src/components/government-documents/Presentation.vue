<template>
  <div class="government-text" @mouseleave="onMouseLeave">
    <p>
      Presentation by Ambassador Gündüz Aktan at the House Committee on
      International Relations on September 14, 2000. Testimony of Ambassador
      Gündüz Aktan Mr. Chairman, I thank you very much for inviting me to this
      hearing. It is a privilege and honor for me to address this sub-committee
      my personal capacity as a private citizen, although the topic is not a
      pleasant one. The question before us is too complex to treat in five
      minutes. Therefore, I will not dwell on its historical aspects.
      <span
        class="highlight highlight-explicit-denial"
        :class="{
          'highlight-active': isHovered === 'Explicit_Denial',
          'highlight-selected': activeStance === 'Explicit_Denial',
        }"
        @click="toggleActiveStance('Explicit_Denial')"
        >Let me stress, however, that the Turkish people firmly believe that
        what happened to the Armenians was not genocide.</span
      >
      <span
        class="highlight highlight-minimization"
        :class="{
          'highlight-active': isHovered === 'Minimization_Reframing',
          'highlight-selected': activeStance === 'Minimization_Reframing',
        }"
        @click="toggleActiveStance('Minimization_Reframing')"
      >
        It was relocation to other pans of the Ottoman Empire of only the
        eastern Anatolian Armenians, away from a war zone </span
      ><span
        class="highlight highlight-justification"
        :class="{
          'highlight-active': isHovered === 'Justification_Narrative',
          'highlight-selected': activeStance === 'Justification_Narrative',
        }"
        @click="toggleActiveStance('Justification_Narrative')"
        >in which they were collaborating with invading Russian armies with the
        aim of creating an independent state of their own in areas where they
        were only a minority </span
      ><span
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
        >by ethnically "cleansing" the majority Turks. </span
      >This tragedy occurred during the war between the Ottoman Empire and
      Tsarist Russia, which was greatly aided by die Armenians, a long
      inter-communal struggle between Armenian irregulars and defending Muslim
      civilians
      <span
        class="highlight highlight-minimization"
        :class="{
          'highlight-active': isHovered === 'Minimization_Reframing',
          'highlight-selected': activeStance === 'Minimization_Reframing',
        }"
        @click="toggleActiveStance('Minimization_Reframing')"
      >
        as well as a thoroughly disorganized relocation of the Armenian
        population under the exceptionally difficult conditions of the
        day.</span
      >
      As a result many Armenians were killed.
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
        >But many more Muslims and Turks perished as well. </span
      >The Turkish people will be deeply offended by this resolution which
      practically accuses them of being genocidal- They will also find it
      disrespectful of their unmentioned millions of dead. Were it to be
      adopted, I am afraid, it would have two immediate effects: one on
      Turco-Armenian relations, the other on Turco-American relations. Under the
      tremendous pressure of public opinion, the Turkish government will be
      compelled to toughen its foreign policy towards Armenia. Turkey earnestly
      rejoiced at Armenia's independence after the demise of the Soviet Union.
      As a token of friendship the Turkish government provided wheat to the
      Armenian people who were then in dire need. I feel personally gratified to
      have played a pan, together with Mr. G. Libaridian, in accomplishing this
      Turkish gesture of fellowship. Turkey integrated Armenia into the Black
      Sea Cooperation Council, although it is not a littoral state. Despite the
      so-called embargo, Turkish governments have deliberately turned a blind
      eye to the porous nature of the common border through which vital
      provisions reach the Armenians. Armenia, however, maintains its occupation
      of 20 % of Azerbaijani territory, creating one million refugees with the
      help of Russian protection purchased at the cost of its newly gained
      independence. Now, by insisting on the recognition of the genocide, the
      Armenian leadership and the diaspora will finally silence the few
      remaining voices favorable to them in Turkey. This will effectively result
      in sealing the border. Given the situation in Armenia this attitude of the
      Armenian government is akin to suicide. However, I am personally more
      worried about Turkey's relations with the U.S. A strategic cooperation has
      been developed over the decades with great care and patience on the basis
      of mutual interest. The first casualty of this resolution would be Cyprus,
      for the U.S. will immediately lose its honest broker status in the eyes of
      Turkish public opinion. Mr. Moses, the President's special representative,
      may no longer find any interlocutor. Turkey and the U.S. closely cooperate
      in the Caucasus, especially in the field of energy, which has recently
      acquired great importance due to the rapidly increasing oil prices. In the
      region where Armenia is situated, the potential for cooperation with a
      country that considers Turks genocidal will be bound to remain severely
      limited. But above all our cooperation on Iraq will inevitably suffer. The
      support for the American policy in northern Iraq, already slim, will
      dwindle immediately, for the Turkish people already feel enough of effects
      of the economic embargo with Iraq, which costs them billions of dollars.
      Why to continue to make this sacrifice? This would mean the military base
      at Incirlik would no longer be used by U.S. war planes to bomb northern
      Iraq. Without air power to deter Saddam Huseyn from regaining the control
      of the region, this could very well be the end of the INC. The crucial
      question is why the Armenians, not content with the word "tragedy" or
      "catastrophe", insist on genocide. I am not a jurist. But I served as
      ambassador to the UN section in Geneva where questions related to
      humanitarian law (or the law of war) is also dealt with. In connection
      with the former Yugoslavia we thoroughly discussed the genocide
      convention. What determines genocide is not necessarily the number of
      casualties or the cruelty of the persecution but the "intent to destroy' a
      group. Historically the "intent to destroy a race" has emerged only as the
      culmination of racism, as in the case of anti-Semitism and the Shoah.
      Turks have never harbored any anti-Armenianism.
      <span
        class="highlight highlight-minimization"
        :class="{
          'highlight-active': isHovered === 'Minimization_Reframing',
          'highlight-selected': activeStance === 'Minimization_Reframing',
        }"
        @click="toggleActiveStance('Minimization_Reframing')"
        >Killing, even of civilians, in a war waged for territory,</span
      >
      <span
        class="highlight highlight-explicit-denial"
        :class="{
          'highlight-active': isHovered === 'Explicit_Denial',
          'highlight-selected': activeStance === 'Explicit_Denial',
        }"
        @click="toggleActiveStance('Explicit_Denial')"
        >is not genocide</span
      >.
      <span
        class="highlight highlight-justification"
        :class="{
          'highlight-active': isHovered === 'Justification_Narrative',
          'highlight-selected': activeStance === 'Justification_Narrative',
        }"
        @click="toggleActiveStance('Justification_Narrative')"
        >The victims of genocide must be totally innocent. </span
      >In other words, they must not fight for something tangible like land, but
      be killed by the victimizer simply because of their membership in a
      specific group. Obviously, both Turks and Armenians fought for land upon
      which to build their independent states. Since genocide is an
      imprescriptibly crime, Armenia has recourse to the International Court of
      Justice at the Hague and may therefore ask the court to determine,
      according to article IX of the Convention, whether it was genocide. But I
      know they cannot do it. They do not have a legally sustainable case. That
      is why they seek legislative resolutions which are legally null and void.
      One last point: I would humbly suggest that all the references to Great
      Britain in the text of the resolution be dropped, for in July of this year
      the British Government declared in the House of Lords that "in the absence
      of unequivocal evidence to show that the Ottoman administration took a
      specific decision to eliminate the Armenians, the British Governments have
      not recognized the events of 1915-16 as genocide”. Let us not forget that
      Great Britain was the occupying power after the First World War and the
      Ottoman archives were at its disposition. Thank you Mr. Chairman
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
