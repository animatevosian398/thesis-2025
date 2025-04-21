<template>
  <div>
    <!-- <h3>{{ documentData.title }}</h3> -->
    <p class="source-note">
      Published by
      <a :href="documentData.sourceUrl" target="_blank">{{
        documentData.source
      }}</a>
    </p>

    <div class="government-text" @mouseleave="onMouseLeave">
      <p>
        Members of the Turkish community in Washington, D.C. staged a
        counter-protest Wednesday against Armenian demonstrators who gathered on
        the anniversary of the 1915 events. The Armenian protestors marched in
        front of the Turkish Embassy and the residence of the Turkish ambassador
        as well as the Azerbaijani Embassy carrying banners and chanting slogans
        against Türkiye and Azerbaijan in support of Armenian claims. Joined by
        Azerbaijani and Ahiska Turks, the Turkish community members carried
        Turkish and Azerbaijani flags and protested against the Armenian group.
        Organized by the Turkish-American National Steering Committee (TASC),
        the event began with the reciting of the national anthem and continued
        with chanting. Some banners said "We Remember 58 Turkish Diplomats And
        Family Killed by ASALA/JCAG Terrorists," "Let History Decide," and "US
        Supreme Court Rejects Armenian Allegations.” In 2021,
        <!--add affirmation here?-->
        US President Joe Biden called the events of 1915 a "genocide," breaking
        with the long-held tradition of US presidents of refraining from using
        the term.
        <span
          class="highlight highlight-explicit-denial"
          :class="{
            'highlight-active': isHovered === 'Explicit_Denial',
            'highlight-selected': activeStance === 'Explicit_Denial',
          }"
          @mouseenter="onMouseEnter('Explicit_Denial')"
          @click="toggleActiveStance('Explicit_Denial')"
        >
          The move was strongly rejected by Türkiye as "null and void.” </span
        >Nearly 80 people -- 58 of them Turkish citizens, including 31 diplomats
        and members of their families -- were killed in attacks from 1973 to
        1986 carried out by the ASALA and ARA terrorist groups. The deadly
        campaign began in 1973 with the assassination of Türkiye’s Consul
        General in Los Angeles Mehmet Baydar and diplomat Bahadir Demir by a
        terrorist named Gourgen Yanikian. 'Genocide is fabrication' TASC
        co-chair Melih Bektas told Anadolu that for the last five years, every
        April 24, the Turkish community has been responding to the Armenian
        "lies and slanders" together with the Turkish American community and
        citizens from the Turkic republics. "What we particularly emphasize in
        the banners we prepared today is that this is a political issue. Both
        the US Supreme Court and the UN declare that these allegations are not
        true and that this is not a genocide," Bektas added. He drew attention
        to the "hateful looks and curses" of 12 and 13-year-old Armenian
        children passing in front of Turkish people. “One of the points I would
        like to draw attention to is that while the hateful looks and curses of
        12 and 13-year-old Armenian children passing in front of us reveal how
        pure and well-intentioned we are, we have seen how full of hate they are
        towards us,” Bektas said, stressing that the Turkish American community
        needs to be "more conscious" and resist this. Attending the
        demonstration, Azerbaijani citizen Vusal Aliev told Anadolu that they
        gathered in front of the residence to support their Turkish brothers and
        sisters. "Because we are one nation, two states. This genocide is a
        fabrication," Aliev said.
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
          >He said Turkish President Recep Tayyip Erdogan previously suggested
          to open these archives and see if there was a genocide or not. "They
          use this against Türkiye in politics. There is no such thing. If there
          were, they would come, and archives would be opened, everything would
          be revealed," Aliev added. </span
        >The Turkish Foreign Ministry on Wednesday rejected the "one-sided
        statements about the events of 1915 that have been made to satisfy
        certain radical circles." "These statements, which distort the
        historical facts, are also contrary to international law. The European
        Court of Human Rights (ECHR) has clearly underlined that the events of
        1915 are a legitimate subject of debate," the ministry said. Stressing
        that "these biased and partial statements" about history undermine the
        reconciliation efforts between the two communities, the ministry added
        that they encourage radical groups to commit hate crimes.
        <span
          class="highlight highlight-justification"
          :class="{
            'highlight-active': isHovered === 'Justification_Narrative',
            'highlight-selected': activeStance === 'Justification_Narrative',
          }"
          @mouseenter="onMouseEnter('Justification_Narrative')"
          @click="toggleActiveStance('Justification_Narrative')"
          >Türkiye's position on the events of 1915 is that the deaths of
          Armenians in eastern Anatolia took place when some sided with the
          invading Russians and revolted against Ottoman forces.</span
        >
        <span
          class="highlight highlight-minimization"
          :class="{
            'highlight-active': isHovered === 'Minimization_Reframing',
            'highlight-selected': activeStance === 'Minimization_Reframing',
          }"
          @mouseenter="onMouseEnter('Minimization_Reframing')"
          @click="toggleActiveStance('Minimization_Reframing')"
        >
          A subsequent relocation of Armenians resulted in numerous casualties.
          Türkiye objects to the presentation of the incidents as a "genocide,"
          describing them as a tragedy in which both sides suffered
          casualties.</span
        >
        Ankara has repeatedly proposed the creation of a joint commission of
        historians from Türkiye and Armenia as well as international experts to
        tackle the issue.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnadoluAgencyCounter",
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
.government-text {
  width: 100%;
  padding-right: 20px;
  line-height: 1.6;
  font-size: 18px;
  text-align: left;
  font-family: "Times New Roman", Times, serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  overflow-y: auto;
  box-sizing: border-box;
}

h3 {
  font-size: 20px;
  background-color: white;
  font-family: "Vollkorn", serif;
  margin-bottom: 8px;
  color: #333;
  text-align: left;
  position: sticky;
  top: 0;
}

.government-text p {
  margin-bottom: 15px;
  text-align: left;
}

/* Base highlight styles with lower opacity */
.highlight {
  transition: background-color 0.2s ease;
  cursor: pointer;
  padding: 2px 0;
  border-radius: 2px;
}

/* The default state with lower opacity */
.highlight-explicit-denial {
  background-color: rgba(237, 45, 42, 0.62);
}

.highlight-reconciliation {
  background-color: rgba(82, 124, 121, 0.4);
}

.highlight-competitive-victimhood {
  background-color: rgba(131, 157, 43, 0.4);
}

.highlight-procedural {
  background-color: rgba(93, 58, 108, 0.4);
}

.highlight-justification {
  background-color: rgba(255, 153, 0, 0.4);
}

.highlight-minimization {
  background-color: rgba(135, 178, 194, 0.4);
}

/* Hover state with higher opacity */
.highlight-active.highlight-explicit-denial {
  background-color: rgba(229, 57, 53, 0.8);
}

.highlight-active.highlight-reconciliation {
  background-color: rgba(82, 124, 121, 0.8);
}

.highlight-active.highlight-competitive-victimhood {
  background-color: rgba(131, 157, 43, 0.8);
}

.highlight-active.highlight-procedural {
  background-color: rgba(93, 58, 108, 0.8);
  color: white;
}

.highlight-active.highlight-justification {
  background-color: rgba(255, 153, 0, 0.8);
}

.highlight-active.highlight-minimization {
  background-color: rgba(135, 178, 194, 0.8);
}

/* Selected/clicked state with full opacity */
.highlight-selected.highlight-explicit-denial {
  background-color: rgba(229, 57, 53, 1);
  color: white;
}

.highlight-selected.highlight-reconciliation {
  background-color: rgba(82, 124, 121, 1);
  color: white;
}

.highlight-selected.highlight-competitive-victimhood {
  background-color: rgba(131, 157, 43, 0.8);
}

.highlight-selected.highlight-procedural {
  background-color: rgba(93, 58, 108, 0.8);
  color: white;
}

.highlight-selected.highlight-justification {
  background-color: rgba(255, 153, 0, 0.8);
}

.highlight-selected.highlight-minimization {
  background-color: rgba(135, 178, 194, 1);
}

.source-note,
.footnote {
  font-size: 0.85em;
  color: #666;
  margin-top: 0.1em;
  text-align: left;
}

.source-note a {
  color: grey;
}
</style>
