<template>
  <div class="narratives-container">
    <header class="header">
      <h1 class="main-title">NARRATIVES</h1>
    </header>

    <div class="stance-list">
      <div
        v-for="item in sortedData"
        :key="item.stance"
        class="stance-item"
        :class="{ active: expandedStance === item.stance }"
        :style="{
          '--stance-color': getBackgroundColor(item.stance),
          '--stance-hover-color': getHoverBackgroundColor(item.stance),
        }"
      >
        <div class="stance-header" @click="toggleStance(item.stance)">
          <div class="stance-name">
            <span class="stance-text">
              {{ formatStance(item.stance) }}
            </span>
            <span class="stance-count">
              ({{ item.count.toLocaleString() }})</span
            >
          </div>
          <div class="actions">
            <router-link
              :to="getStanceRoute(item.stance)"
              class="navigate-icon"
              @click.stop
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="chevron-right"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </router-link>
          </div>
        </div>

        <transition name="expand">
          <div v-if="expandedStance === item.stance" class="stance-content">
            <div class="word-cloud-title">Example Comments:</div>

            <div class="examples">
              <div
                v-for="(comment, commentIndex) in commentsByStance[
                  item.stance
                ]?.slice(0, 2)"
                :key="commentIndex"
                class="example"
              >
                "{{ comment }}"
              </div>
            </div>
            <div class="word-cloud">
              <div class="word-cloud-title">Common Words:</div>
              <div class="words">
                <span
                  v-for="(word, wordIndex) in getCommonWords(item.stance)"
                  :key="wordIndex"
                  class="word"
                  :style="getWordSize(word, item.stance)"
                >
                  {{ word.text }}
                </span>
              </div>
            </div>

            <router-link :to="getStanceRoute(item.stance)" class="view-more">
              View all {{ item.count.toLocaleString() }} comments →
            </router-link>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ProceduralDeflection from "../views/stanceDetailPages/ProceduralDeflection.vue";

const expandedStance = ref(null);
const hoveredStance = ref(null);

// Sample data
const stanceColors = {
  Historical_Affirmation: "#4CAF50",
  Personal_Testimony: "#7A485D",
  Explicit_Denial: "#E53734",
  Minimization_Reframing: "#658B88",
  //   Justification_Narrative: "#FAFF6B",
  // Justification_Narrative: "#FAFF6B",
  Justification_Narrative: "#C6B987",

  //   Justification_Narrative: "#FBA423",
  Contemporary_Comparison: "#2E4D46",
  Procedural_Deflection_Evidence_Archives: "#CF7842",
  // Procedural_Deflection_Evidence_Archives: "#FBA423",

  //   Procedural_Deflection_Evidence_Archi ves: "#FBA423",
  Competitive_Victimhood_Historical_Inversion: "#979C63",
  Sympathy_Memorial_Commemorative: "#40414A",
  Apology: "#2738EC",
  Discussion_About_Denial: "#841A26",
  //   Reconciliation_Discourse: "#005477",
  Reconciliation_Discourse: "#005477",
};

const stanceDisplayNames = {
  Historical_Affirmation: "Historical Affirmation",
  Personal_Testimony: "Personal Testimony",
  Explicit_Denial: "Explicit Denial",
  Minimization_Reframing: "Minimization & Reframing",
  Justification_Narrative: "Justification Narrative",
  Contemporary_Comparison: "Contemporary Comparison",
  Procedural_Deflection_Evidence_Archives: "Debating Evidence",
  Competitive_Victimhood_Historical_Inversion:
    "Competitive Victimhood & Historical Inversion",
  Sympathy_Memorial_Commemorative: "Sympathy & Memorial",
  Apology: "Apology",
  Discussion_About_Denial: "Discussion About Denial",
  Reconciliation_Discourse: "Reconciliation Discourse",
};

// Sample data for stances
const data = [
  { stance: "Apology", count: 54 },
  { stance: "Historical_Affirmation", count: 1465 },
  { stance: "Competitive_Victimhood_Historical_Inversion", count: 911 },
  { stance: "Explicit_Denial", count: 882 },
  { stance: "Justification_Narrative", count: 1206 },
  { stance: "Contemporary_Comparison", count: 2417 },
  { stance: "Discussion_About_Denial", count: 1281 },
  { stance: "Minimization_Reframing", count: 760 },
  { stance: "Reconciliation_Discourse", count: 154 },
  { stance: "Sympathy_Memorial_Commemorative", count: 501 },
  { stance: "Procedural_Deflection_Evidence_Archives", count: 477 },
  { stance: "Personal_Testimony", count: 290 },
];

// Sample comments for each stance
const commentsByStance = {
  Apology: [
    "I'm from turkey and im really really sorry for what happend back then",
    "I can't change my country's history but I can apologize to the victims and their families",
  ],
  Historical_Affirmation: [
    "What happened to the Armenians, Assyrians and Greeks in the final moments of the Ottoman Empire was Genocide.",
    "They killed, they took our land, and wealth and everything. Will never forget.",
  ],
  Competitive_Victimhood_Historical_Inversion: [
    "Armenians did same things to the ottoman.",
    "No mention to the massacres of Turkish/Kurdish population at the hands of Armenians/Russians. None!",
  ],
  Explicit_Denial: [
    "Turkey didn't do any genocideThey are good people 👍",
    "Big lie",
  ],
  Justification_Narrative: [
    "The Armenians were rebelling against the Ottoman Empire, which responded by slaughtering them and successfully stopping the rebellion.",
    "As a British, I don't deny the Armenian genocide. I think they kinda deserved it after siding with Ruskies.",
  ],
  Contemporary_Comparison: [
    "This genocide was led by the Young Turks who were not Turkish. Today they are leading the genocide in Gaza.",
    "And now the Turks are doing the same to the Kurds.",
  ],
  Personal_Testimony: [
    "My Great Grandma lost her family during those killings. She was from Van. ",
    "I am Armenian from Bitlis, and my family was forcibly expelled during the Armenian Genocide. The global Armenian diaspora is a direct result of these atrocities. ",
  ],
  Discussion_About_Denial: [
    "Germany admitted to the wrong stuff have done and has apologized. Turkëye acts like them murdering 1.5 million people never happened, lying to their people saying that the genocide never happened.",
    "It's funny how the only people denying/defending the genocide are from Turkey.",
  ],
  Minimization_Reframing: [
    "The numbers of deaths are exaggerated. Turkey shouldn't admit it at all because both sides are to blame.",
    "There are more examples that show that this is not a case of genocide. it was a war and both sides fought against each other with casualties on both sides",
  ],
  Reconciliation_Discourse: [
    "How can Turkey and Armenia even begin the process of reconciliation if Turkey doesn't admit to having done the thing they're reconciling for?",
    "all country must face and admit their wrongdoings in recent past in order to move forward. Australian and Canada apologized to their natives. Germany admitted its role in WW2.",
  ],
  Sympathy_Memorial_Commemorative: [
    "We all stand with Armenians. It will not be forgotten.",
    "As a Kurd from iraq and a survivor of saddams inhumane genocide on the Kurds, i stand with my Armenian brothers against those who deny the Armenian genocide.",
  ],
  Procedural_Deflection_Evidence_Archives: [
    "Let the historıans talk not politician. Let's open all archives",
    "Do you have any proof or court decision about Armenian Genocide? Of course you don't. Nobody have it.",
  ],
};

// // Sample bigrams by stance data
// const bigramsByStance = {
//   Apology: [
//     { text: "im sorry", weight: 10 },
//     { text: "turk sorry", weight: 8 },
//     { text: "turkey apologize", weight: 8 },
//     { text: "ancestors did", weight: 6 },
//     { text: "sorry old", weight: 5 },
//   ],
//   Historical_Affirmation: [
//     { text: "armenian genocide", weight: 10 },
//     { text: "ottoman empire", weight: 3 },
//     { text: "young turks", weight: 2 },
//     { text: "genocide happened", weight: 2 },
//     { text: "million armenians", weight: 2 },
//   ],
//   Competitive_Victimhood_Historical_Inversion: [
//     { text: "armenians killed", weight: 10 },
//     { text: "armenian genocide", weight: 10 },
//     { text: "khojaly massacre", weight: 8 },
//     { text: "armenians did", weight: 7 },
//     { text: "ottoman empire", weight: 7 },
//   ],
//   Explicit_Denial: [
//     { text: "armenian genocide", weight: 10 },
//     { text: "ottoman empire", weight: 3 },
//     { text: "didn happen", weight: 3 },
//     { text: "million armenians", weight: 3 },
//     { text: "fake genocide", weight: 3 },
//   ],
//   Justification_Narrative: [
//     { text: "ottoman empire", weight: 10 },
//     { text: "armenian genocide", weight: 3 },
//     { text: "world war", weight: 2 },
//     { text: "armenian gangs", weight: 2 },
//     { text: "turkish villages", weight: 2 },
//   ],
// };
const wordsByStance = {
  Explicit_Denial: [
    // { text: "genocide", weight: 0.0852984886150743 },
    // { text: "armenian", weight: 0.0526099547416971 },
    { text: "lie", weight: 0.0412563091307099 },
    // { text: "armenians", weight: 0.0366905469682954 },
    { text: "happened", weight: 0.0335572212429967 },
    { text: "lies", weight: 0.0311453369489624 },
    { text: "fake", weight: 0.02837097057777 },
    { text: "turks", weight: 0.0228756087021227 },
    // { text: "1", weight: 0.0228418953914454 },
    { text: "propaganda", weight: 0.0227149866550913 },
    { text: "people", weight: 0.0215377726142986 },
    { text: "turkey", weight: 0.0213567347385254 },
    { text: "history", weight: 0.0208989950683078 },
    { text: "million", weight: 0.0199227900661373 },
    { text: "happen", weight: 0.0185049202193462 },
  ],
  Discussion_About_Denial: [
    // { text: "genocide", weight: 0.0711434349972664 },
    // { text: "turkey", weight: 0.0385960675010021 },
    // { text: "armenian", weight: 0.0374503542977478 },
    // { text: "turks", weight: 0.0362482985821565 },
    { text: "deny", weight: 0.031212397095234 },
    { text: "people", weight: 0.0307862094110234 },
    { text: "turkish", weight: 0.0306688378245121 },
    // { text: "armenians", weight: 0.0253220763152509 },
    { text: "just", weight: 0.0246830046360664 },
    { text: "happened", weight: 0.0241795613143599 },
    { text: "denying", weight: 0.0239864609289229 },
    { text: "like", weight: 0.0236621182184115 },
    { text: "history", weight: 0.0218033377320805 },
    { text: "don't", weight: 0.02014234206403 },
    // { text: "t", weight: 0.0195777993036446 },
  ],
  Competitive_Victimhood_Historical_Inversion: [
    { text: "armenians", weight: 0.0657920652749115 },
    // { text: "genocide", weight: 0.0655913611636555 },
    { text: "turks", weight: 0.063101091204477 },
    { text: "killed", weight: 0.048942471984701 },
    { text: "armenian", weight: 0.0398281216059199 },
    { text: "people", weight: 0.0387069528375422 },
    { text: "turkish", weight: 0.0301478167976137 },
    { text: "did", weight: 0.029348014203448 },
    { text: "khojaly", weight: 0.0289052645333556 },
    // { text: "armenia", weight: 0.0227047876709649 },
    { text: "massacre", weight: 0.0203805493954557 },
    { text: "turkey", weight: 0.0203572066010106 },
    { text: "azerbaijan", weight: 0.0194535172254558 },
    { text: "greeks", weight: 0.0190997430513777 },
    { text: "know", weight: 0.0182623966232053 },
  ],
  Contemporary_Comparison: [
    // { text: "genocide", weight: 0.0666687409594757 },
    { text: "people", weight: 0.0270572133279113 },
    { text: "native", weight: 0.0250971477777493 },
    { text: "american", weight: 0.0214683684040554 },
    { text: "americans", weight: 0.0211265764605465 },
    { text: "turkey", weight: 0.0207151160199392 },
    { text: "did", weight: 0.0191932732494529 },
    { text: "china", weight: 0.0178965499173441 },
    { text: "america", weight: 0.0177744368085008 },
    { text: "like", weight: 0.0176055502798722 },
    { text: "israel", weight: 0.0160414026065689 },
    { text: "killed", weight: 0.015699527850237 },
    // { text: "s", weight: 0.0152157452426178 },
    { text: "war", weight: 0.0146844987745554 },
    { text: "iraq", weight: 0.014632329991554 },
  ],
  Historical_Affirmation: [
    // { text: "genocide", weight: 0.0812671746686159 },
    // { text: "armenian", weight: 0.0555828952495642 },
    // { text: "armenians", weight: 0.0458097371174587 },
    { text: "turkey", weight: 0.0415018069695471 },
    { text: "turks", weight: 0.0340081589478475 },
    { text: "people", weight: 0.026592566886877 },
    { text: "did", weight: 0.0215502365666283 },
    { text: "ottoman", weight: 0.0200280292338622 },
    // { text: "1", weight: 0.0193329871190327 },
    { text: "turkish", weight: 0.0192171554493933 },
    { text: "happened", weight: 0.0188747194745226 },
    { text: "million", weight: 0.017558044611257 },
    { text: "just", weight: 0.0164865127537547 },
    { text: "president", weight: 0.0160647113091529 },
    { text: "history", weight: 0.0158189519359718 },
  ],
  Reconciliation_Discourse: [
    { text: "turkey", weight: 0.0373026930092919 },
    { text: "peace", weight: 0.0362018123237555 },
    // { text: "armenia", weight: 0.0352538722853691 },
    { text: "people", weight: 0.0349989645519109 },
    { text: "past", weight: 0.0347010653476162 },
    // { text: "armenian", weight: 0.033069691459606 },
    { text: "just", weight: 0.0329246367971986 },
    // { text: "genocide", weight: 0.0247203004599781 },
    { text: "turks", weight: 0.0244985219555201 },
    { text: "turkish", weight: 0.0244342513976723 },
    { text: "want", weight: 0.0230553161093726 },
    { text: "happened", weight: 0.0229510921738211 },
    { text: "love", weight: 0.0229143558287677 },
    { text: "think", weight: 0.0223542081725724 },
    // { text: "armenians", weight: 0.0223270358799475 },
  ],
  Justification_Narrative: [
    // { text: "armenians", weight: 0.074491618208909 },
    { text: "turks", weight: 0.0504053725649548 },
    { text: "ottoman", weight: 0.0442676619601086 },
    // { text: "armenian", weight: 0.0439531829780724 },
    // { text: "genocide", weight: 0.0367010869729701 },
    { text: "people", weight: 0.0352489426219138 },
    { text: "empire", weight: 0.0337277198935524 },
    { text: "did", weight: 0.0327544447119249 },
    { text: "turkish", weight: 0.0317012072007681 },
    { text: "turkey", weight: 0.0272812818864018 },
    { text: "killed", weight: 0.0271174000576128 },
    { text: "war", weight: 0.0265338631218153 },
    // { text: "armenia", weight: 0.0225039013528649 },
    { text: "ottomans", weight: 0.0213066281496638 },
    { text: "just", weight: 0.0206472179771757 },
  ],
  Personal_Testimony: [
    // { text: "armenian", weight: 0.059306028036808 },
    { text: "great", weight: 0.0490960081172522 },
    // { text: "genocide", weight: 0.0489386072221938 },
    { text: "family", weight: 0.042811033939433 },
    { text: "grandfather", weight: 0.0327470104682476 },
    { text: "armenians", weight: 0.0301958932435174 },
    { text: "grandparents", weight: 0.0254280560240404 },
    { text: "grandmother", weight: 0.0248856068249313 },
    { text: "turks", weight: 0.0238794192792809 },
    { text: "thank", weight: 0.023796443272361 },
    { text: "turkey", weight: 0.0227988455209573 },
    { text: "turkish", weight: 0.022312466727738 },
    { text: "people", weight: 0.0222474216899707 },
    // { text: "s", weight: 0.0221380022043695 },
    { text: "killed", weight: 0.0210067558303802 },
  ],
  Minimization_Reframing: [
    // { text: "genocide", weight: 0.0731303822754087 },
    // { text: "armenians", weight: 0.0598832726223828 },
    { text: "people", weight: 0.0421078713219082 },
    // { text: "armenian", weight: 0.0420320448514405 },
    { text: "turks", weight: 0.0373404172989537 },
    { text: "ottoman", weight: 0.0368903355065088 },
    { text: "war", weight: 0.0341936662466242 },
    { text: "turkey", weight: 0.032191059232529 },
    { text: "empire", weight: 0.0275829865117083 },
    { text: "just", weight: 0.0274140718038856 },
    { text: "killed", weight: 0.0247303860064586 },
    // { text: "turkish", weight: 0.023805947302665 },
    { text: "did", weight: 0.0237568541765432 },
    { text: "like", weight: 0.0237552816041322 },
    { text: "happened", weight: 0.02146107642894 },
  ],
  Sympathy_Memorial_Commemorative: [
    // { text: "armenian", weight: 0.0389368543679548 },
    { text: "people", weight: 0.035515442383438 },
    // { text: "armenians", weight: 0.0314739371645183 },
    // { text: "genocide", weight: 0.0314516113618452 },
    // { text: "armenia", weight: 0.0307579314015381 },
    { text: "sad", weight: 0.0297386384868155 },
    { text: "thank", weight: 0.0248370836842263 },
    { text: "god", weight: 0.0227162283645496 },
    { text: "bless", weight: 0.0222779670640862 },
    { text: "forget", weight: 0.0210252311833928 },
    { text: "sorry", weight: 0.0190117255000715 },
    { text: "que", weight: 0.0157301322285197 },
    { text: "love", weight: 0.0154540819661006 },
    { text: "1915", weight: 0.0152323217443944 },
    { text: "brothers", weight: 0.0149922752889242 },
  ],
  Procedural_Deflection_Evidence_Archives: [
    { text: "archives", weight: 0.0632070917236751 },
    // { text: "genocide", weight: 0.0495036607093647 },
    // { text: "armenian", weight: 0.0420419849082336 },
    { text: "open", weight: 0.0411799713504573 },
    // { text: "armenia", weight: 0.0371551915122974 },
    { text: "evidence", weight: 0.0359170646780592 },
    { text: "turkey", weight: 0.0341660560429366 },
    // { text: "armenians", weight: 0.033429769868725 },
    { text: "proof", weight: 0.0308985721305825 },
    // { text: "turkish", weight: 0.0292715787003429 },
    { text: "court", weight: 0.0242158667422789 },
    { text: "world", weight: 0.0229233276930735 },
    { text: "documents", weight: 0.0218187538239381 },
    { text: "ottoman", weight: 0.0214289424618988 },
    { text: "historians", weight: 0.021364728853963 },
  ],
  Apology: [
    { text: "sorry", weight: 0.0779220825784201 },
    { text: "apologize", weight: 0.0624754091551274 },
    { text: "turkey", weight: 0.0530589267071914 },
    // { text: "armenians", weight: 0.0463884924518569 },
    { text: "im", weight: 0.0455680801665276 },
    { text: "did", weight: 0.0440715439003336 },
    { text: "turkish", weight: 0.0422360594931487 },
    { text: "turk", weight: 0.0408532998382232 },
    { text: "say", weight: 0.0347457352496061 },
    // { text: "genocide", weight: 0.034741772090251 },
    { text: "just", weight: 0.0340737786727438 },
    { text: "turks", weight: 0.030772732561296 },
    { text: "people", weight: 0.0286031046301113 },
    { text: "ancestors", weight: 0.0256881962518252 },
    // { text: "armenia", weight: 0.0255151058903734 },
  ],
};

// Mapping between stance names and route paths
const stanceToRoutePath = {
  Historical_Affirmation: "HistoricalAffirmation",
  Personal_Testimony: "PersonalTestimony",
  Explicit_Denial: "ExplicitDenial",
  Minimization_Reframing: "MinimizationReframing",
  Justification_Narrative: "JustificationNarrative",
  Contemporary_Comparison: "ContemporaryComparison",
  Procedural_Deflection_Evidence_Archives: "ProceduralDeflection",
  Competitive_Victimhood_Historical_Inversion: "HistoricalInversion",
  Sympathy_Memorial_Commemorative: "SympathyMemorial",
  Apology: "Apology",
  Discussion_About_Denial: "DiscussionAboutDenial",
  Reconciliation_Discourse: "ReconciliationDiscourse",
};

// Sort data by count (descending)
const sortedData = computed(() => {
  return [...data].sort((a, b) => b.count - a.count);
});

// Format stance names for display
const formatStance = (stance) => {
  return stanceDisplayNames[stance] || stance.replace(/_/g, " ");
};

// Get color for a stance
const getColor = (stance) => {
  return stanceColors[stance] || "#cccccc";
};

// Get background color with opacity
const getBackgroundColor = (stance) => {
  const color = getColor(stance);
  // Convert hex to rgba with opacity
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, 0.25)`; // Increased from 0.15 to 0.25
};

// For hover effects - create a new function with higher opacity
const getHoverBackgroundColor = (stance) => {
  const color = getColor(stance);
  // Convert hex to rgba with higher opacity for hover state
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, 0.7)`; // Increased from 0.25 to 0.4
};

// Toggle stance expansion
const toggleStance = (stance) => {
  if (expandedStance.value === stance) {
    expandedStance.value = null;
  } else {
    expandedStance.value = stance;
  }
};

// Get route for a stance
const getStanceRoute = (stance) => {
  const routePath = stanceToRoutePath[stance];
  if (routePath) {
    return `/stance/${routePath}`;
  } else {
    return `/stance/${stance}`;
  }
};

// Get common words for a stance - improve this function to handle all stances
const getCommonWords = (stance) => {
  // Check if this stance has any bigrams
  // const words = bigramsByStance[stance];
  const words = wordsByStance[stance];

  return words;
};

// Calculate font size based on word weight with relative scaling per stance
const getWordSize = (word, stance) => {
  // Get all words for this stance
  const words = wordsByStance[stance] || [];

  // If no words, return default styling
  if (!words.length) {
    return {
      fontSize: "16px",
      opacity: 0.8,
      padding: "0 6px",
      margin: "4px 2px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "28px",
      position: "relative",
      fontWeight: "normal",
      color: "rgba(0,0,0,0.75)",
    };
  }

  // Find max and min weights for this stance
  const maxWeight = Math.max(...words.map((w) => w.weight));
  const minWeight = Math.min(...words.map((w) => w.weight));

  // Calculate normalized weight (0-1 scale within this stance's context)
  const normalizedWeight =
    minWeight === maxWeight
      ? 0.5 // If all weights are the same, use middle value
      : (word.weight - minWeight) / (maxWeight - minWeight);

  // Set size limits per container
  const minSize = 14; // Minimum font size
  const maxSize = 24; // Maximum font size

  // Calculate font size with more dramatic scaling for mid-to-high values
  const fontSize =
    minSize + Math.pow(normalizedWeight, 0.7) * (maxSize - minSize);

  // Opacity based on relative size (larger = more opaque)
  const opacity = 0.7 + normalizedWeight * 0.3;

  // Dynamic padding based on font size
  const padding = `${Math.max(4, fontSize / 8)}px ${Math.max(
    6,
    fontSize / 4
  )}px`;

  // Return style object
  return {
    fontSize: `${fontSize}px`,
    opacity: opacity,
    padding: padding,
    margin: "4px 2px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: `${fontSize + 12}px`,
    position: "relative",
    fontWeight: fontSize > 28 ? "500" : "normal",
    color: fontSize > 30 ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.75)",
    transition: "transform 0.2s ease, color 0.2s ease",
  };
};
</script>

<style scoped>
.narratives-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;
  font-family: "Georgia", serif;
}

/* Make header left-aligned */
.header {
  text-align: left; /* Change from center to left */
  margin-bottom: 3rem;
  padding-left: 1px; /* Add some padding on the left */
}

/* Left-align the main title */
.main-title {
  padding-top: 55px;
  font-size: 1.5rem;
  font-weight: normal;
  letter-spacing: 0.05em;
  text-align: left; /* Explicitly set text-align */
}

.stance-list {
  border-top: 1px solid rgba(0, 0, 0, 0.385);
}

/* Update the stance-item class to support both colors */
.stance-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.212);
  --stance-hover-color: var(--stance-color);
  transition: background-color 0.3s ease;
}

/* Ensure stance headers and content are consistently aligned */
.stance-header {
  display: flex;
  align-items: center; /* Change from 'left' to 'center' for vertical alignment */
  padding: 1.25rem 1rem; /* Slightly more vertical padding */
  padding-left: 0rem; /* Match header's left padding */
  cursor: pointer;
  justify-content: flex-start; /* Ensure content starts from the left */
  transition: background-color 0.2s ease;
}

/* Fix stance name styling */
.stance-name {
  flex: 1;
  font-size: 1.2rem; /* Increased from 1rem */
  text-align: left; /* Explicitly set left alignment */
  display: flex; /* Use flex to align child elements */
  align-items: center; /* Center items vertically */
  font-weight: 500; /* Added medium weight */
  letter-spacing: 0.01em; /* Slight letter spacing for emphasis */
}

/* Fix stance text styling for better hover effect */
.stance-text {
  padding: 0.25rem 0.15rem;
  border-radius: 1px;
  display: inline-block;
  transition: background-color 0.2s ease, transform 0.2s ease;
  position: relative;
}

/* Enhance the hover effect */
.stance-header:hover .stance-text {
  background-color: var(--stance-hover-color);
  transform: translateX(3px);
}

/* Add a special style for active stances */
.stance-item.active .stance-text {
  background-color: var(--stance-hover-color);
  font-weight: 600;
}

/* Style count to be less prominent than the name */
.stance-count {
  margin-left: 0.5rem;
  color: rgba(0, 0, 0, 0.872);
  font-size: 0.95rem; /* Smaller than the name */
  font-weight: normal;
  text-decoration: none; /* Explicitly remove any text decoration */
  border-bottom: none; /* Ensure no bottom border */
}

.actions {
  margin-left: 1rem;
}

.navigate-icon {
  color: rgba(0, 0, 0, 0.5);
  transition: color 0.2s;
}

.navigate-icon:hover {
  color: rgba(0, 0, 0, 1);
}

.chevron-right {
  width: 1.25rem;
  height: 1.25rem;
}

/* Left-align stance content */
.stance-content {
  padding-bottom: 1.5rem;
  padding-left: 50px; /* Match the padding of other elements */
  text-align: left;
}

.word-cloud {
  margin-bottom: 1.5rem;
}

/* Left-align word cloud title */
.word-cloud-title {
  font-size: 0.85rem; /* Increased from 0.75rem */
  margin-bottom: 1rem; /* Increased from 0.75rem */
  color: rgba(0, 0, 0, 0.85); /* Darker for better readability */
  text-align: left;
  letter-spacing: 0.05em;
  font-weight: 500;
}

/* Update the words container for better vertical alignment */
.words {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem; /* Use consistent gap all around */
  margin-bottom: 1.5rem;
  padding: 1.25rem; /* Increased padding */
  background-color: rgba(0, 0, 0, 0.02);
  max-width: 95%; /* Increased from 90% */
  align-items: center; /* This centers items vertically */
  justify-content: flex-start;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.03); /* Add subtle inner border */
}

/* Update the word styling for better vertical alignment */
.word {
  cursor: default;
  transition: transform 0.2s ease, color 0.2s ease;
  color: rgba(0, 0, 0, 0.8);
  display: inline-flex; /* Change from inline-block to inline-flex */
  align-items: center; /* Center content vertically */
  justify-content: center; /* Center content horizontally */
  height: 40px; /* Set a consistent height for all words */
  vertical-align: middle; /* Ensure baseline alignment */
  line-height: 1; /* Use tighter line height */
  padding: 0 8px; /* Add some horizontal padding */
}

.examples {
  margin-bottom: 1rem;
  margin-top: 2px; /* Add top margin for better spacing from word cloud */
}

/* Left-align examples */
.example {
  font-size: 0.9rem; /* Increased from 0.875rem */
  font-style: italic;
  margin-bottom: 1px;
  line-height: 1; /* Increased for better readability */
  text-align: left;
  color: rgba(0, 0, 0, 0.85); /* Darker text */
  background-color: rgba(0, 0, 0, 0.02); /* Very subtle background */
  padding: 10px;
  border-radius: 2px;
  border-left: 3px solid var(--stance-color, rgba(0, 0, 0, 0.1)); /* Accent border */
}

/* Left-align view more link */
.view-more {
  font-size: 0.8rem;
  text-transform: uppercase;
  padding-bottom: 2px;
  text-decoration: none;
  color: black;
  transition: all 0.2s;
  text-align: left;
  display: inline-block;
  margin-left: 0rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  position: relative;
  border-bottom: none; /* Remove border bottom */
}

/* Update the underline animation for view more link */
.view-more::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: black;
  transform: scaleX(
    1
  ); /* Change from 0.7 to 1 to show full underline by default */
  transition: transform 0.3s, opacity 0.3s;
  opacity: 0.7; /* Use opacity instead to make it visible but subtle */
}

.view-more:hover::after {
  transform: scaleX(1);
  opacity: 1; /* Full opacity on hover */
}

/* Expand animation */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s;
  max-height: 500px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .narratives-container {
    padding: 2rem 0.5rem;
  }
}
</style>
