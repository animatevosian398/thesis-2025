<template>
  <div class="stance-list-container">
    <header class="header">
      <h1 class="main-title">NARRATIVES</h1>
      <!-- <h2 class="subtitle">
        Analysis of 10,394 comments across Youtube videos.
      </h2> -->
      <!-- <div class="stats">
        <div class="stat-item">
          <div class="stat-number">10,000</div>
          <div class="stat-label">Total Comments</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">12</div>
          <div class="stat-label">Categories</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ largestCount }}</div>
          <div class="stat-label">Largest Group</div>
        </div>
      </div> -->
    </header>

    <div class="stance-list">
      <div
        v-for="(item, index) in sortedData"
        :key="item.stance"
        class="stance-item"
        :class="{ active: expandedStance === item.stance }"
      >
        <div class="stance-header">
          <div class="stance-number">
            {{ (index + 1).toString().padStart(2, "0") }}
          </div>
          <div
            class="stance-color"
            :style="{ backgroundColor: getColor(item.stance) }"
          ></div>
          <div
            class="stance-name"
            @click="toggleStance(item.stance)"
            :style="{
              '--stance-color': getColor(item.stance),
              '--stance-color-rgb': hexToRgb(getColor(item.stance)),
            }"
          >
            {{ formatStance(item.stance) }}
          </div>
          <div class="stance-count">{{ item.count.toLocaleString() }}</div>
          <div class="actions">
            <router-link
              :to="getStanceRoute(item.stance)"
              class="navigate-icon"
            >
              →
            </router-link>
          </div>
        </div>

        <transition name="expand">
          <div v-if="expandedStance === item.stance" class="stance-content">
            <div class="word-cloud">
              <div class="word-cloud-title">Common Words:</div>
              <div class="words">
                <span
                  v-for="(word, wordIndex) in getCommonWords(item.stance)"
                  :key="wordIndex"
                  class="word"
                  :style="{ fontSize: getWordSize(word.weight) }"
                >
                  {{ word.text }}
                </span>
              </div>
            </div>
            <div class="examples">
              <div
                v-for="(comment, commentIndex) in commentsByStance[
                  item.stance
                ].slice(0, 2)"
                :key="commentIndex"
                class="example"
              >
                "{{ comment }}"
              </div>
            </div>
            <router-link :to="getStanceRoute(item.stance)" class="view-more">
              View all {{ item.count.toLocaleString() }} comments →
            </router-link>
          </div>
        </transition>
      </div>
    </div>

    <div class="note">* Not found in Turkish government stances</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { stanceColors } from "../config/colors";
import { stanceDisplayNames } from "../config/labels";

const router = useRouter();
const expandedStance = ref("");

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

// Sample comments for each stance
const commentsByStance = {
  Apology: [
    "I'm from turkey and im really really sorry for what happend back then",
    "I can't change my country's history but I can apologize to the victims and their families",
  ],
  Historical_Affirmation: [
    "What happened to the Armenians, Assyrians and Greeks in the final moments of the Ottoman Empire was Genocide.",
    "They killed, they took our land, and wealth and everything. Will never forget.	",
  ],
  Competitive_Victimhood_Historical_Inversion: [
    "Armenians did same things to the ottoman.",
    "No mention to the massacres of Turkish/Kurdish population at the hands of Armenians/Russians. None! ",
  ],
  Explicit_Denial: [
    "Turkey didn't do any genocideThey are good people 👍",
    "Big lie	",
  ],
  Justification_Narrative: [
    "The Armenians were rebelling against the Ottoman Empire, which responded by slaughtering them and successfully stopping the rebellion.",
    "As a British, I don't deny the Armenian genocide. I think they kinda deserved it after siding with Ruskies.",
  ],
  Contemporary_Comparison: [
    "This genocide was led by the Young Turks who were not Turkish. Today they are leading the genocide in Gaza.	",
    "And now the Turks are doing the same to the Kurds.	",
  ],
  Personal_Testimony: [
    "My Great Grandma lost her family during those killings. She was from Van. ",
    "I am Armenian from Bitlis, and my family was forcibly expelled during the Armenian Genocide. The global Armenian diaspora is a direct result of these atrocities. ",
  ],
  Discussion_About_Denial: [
    "Germany admitted to the wrong stuff have done and has apologized. Turkëye acts like them murdering 1.5 million people never happened, lying to their people saying that the genocide never happened.",
    "It's funny how the only people denying/defending the genocide are from Turkey.	",
  ],
  Minimization_Reframing: [
    "The numbers of deaths are exaggerated. Turkey shouldn’t admit it at all because both sides are to blame.	",
    "There are more examples that show that this is not a case of genocide. it was a war and both sides fought against each other with casualties on both sides",
  ],
  Reconciliation_Discourse: [
    "How can Turkey and Armenia even begin the process of reconciliation if Turkey doesn't admit to having done the thing they're reconciling for?	",
    "all country must face and admit their wrongdoings in recent past in order to move forward. Australian and Canada apologized to their natives. Germany admitted its role in WW2.	",
  ],
  Sympathy_Memorial_Commemorative: [
    "We all stand with Armenians. It will not be forgotten.	",
    "As a Kurd from iraq and a survivor of saddams inhumane genocide on the Kurds, i stand with my Armenian brothers against those who deny the Armenian genocide.",
  ],
  Procedural_Deflection_Evidence_Archives: [
    "Let the historıans talk not politician. Let's open all archives	",
    "Do you have any proof or court decision about Armenian Genocide? Of course you don't. Nobody have it.	",
  ],
};

// Data for the stances
const data = [
  { stance: "Apology", count: 54 },
  { stance: "Historical_Affirmation", count: 1465 },
  { stance: "Competitive_Victimhood_Historical_Inversion", count: 911 },
  { stance: "Explicit_Denial", count: 882 },
  { stance: "Justification_Narrative", count: 1206 },
  { stance: "Personal_Testimony", count: 290 },
  { stance: "Contemporary_Comparison", count: 2417 },
  { stance: "Discussion_About_Denial", count: 1281 },
  { stance: "Minimization_Reframing", count: 760 },
  { stance: "Reconciliation_Discourse", count: 154 },
  { stance: "Sympathy_Memorial_Commemorative", count: 501 },
  { stance: "Procedural_Deflection_Evidence_Archives", count: 477 },
];

// Sort data by count (descending)
const sortedData = computed(() => {
  return [...data].sort((a, b) => b.count - a.count);
});

// Get largest count
const largestCount = computed(() => {
  return Math.max(...data.map((item) => item.count));
});

// Format stance names for display
const formatStance = (stance) => {
  // Use uppercase version of display names
  const displayName = stanceDisplayNames[stance] || stance.replace(/_/g, " ");
  return displayName.toUpperCase();
};

// Get color for a stance
const getColor = (stance) => {
  return stanceColors[stance] || "#cccccc";
};

// Toggle stance expansion
const toggleStance = (stance) => {
  if (expandedStance.value === stance) {
    expandedStance.value = "";
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

// Bigrams by stance data
const bigramsByStance = {
  Apology: [
    { text: "im sorry", weight: 10 },
    { text: "turk sorry", weight: 8 },
    { text: "turkey apologize", weight: 8 },
    { text: "ancestors did", weight: 6 },
    { text: "sorry old", weight: 5 },
  ],
  Historical_Affirmation: [
    { text: "armenian genocide", weight: 10 },
    { text: "ottoman empire", weight: 3 },
    { text: "young turks", weight: 2 },
    { text: "genocide happened", weight: 2 },
    { text: "million armenians", weight: 2 },
  ],
  Competitive_Victimhood_Historical_Inversion: [
    { text: "armenians killed", weight: 10 },
    { text: "armenian genocide", weight: 10 },
    { text: "khojaly massacre", weight: 8 },
    { text: "armenians did", weight: 7 },
    { text: "ottoman empire", weight: 7 },
  ],
  Explicit_Denial: [
    { text: "armenian genocide", weight: 10 },
    { text: "ottoman empire", weight: 3 },
    { text: "didn happen", weight: 3 },
    { text: "million armenians", weight: 3 },
    { text: "fake genocide", weight: 3 },
  ],
  Justification_Narrative: [
    { text: "ottoman empire", weight: 10 },
    { text: "armenian genocide", weight: 3 },
    { text: "world war", weight: 2 },
    { text: "armenian gangs", weight: 2 },
    { text: "turkish villages", weight: 2 },
  ],
  Contemporary_Comparison: [
    { text: "native americans", weight: 10 },
    { text: "native american", weight: 7 },
    { text: "armenian genocide", weight: 6 },
    { text: "american genocide", weight: 5 },
    { text: "united states", weight: 3 },
  ],
  Personal_Testimony: [
    { text: "armenian genocide", weight: 10 },
    { text: "great grandparents", weight: 8 },
    { text: "great grandmother", weight: 6 },
    { text: "great grandfather", weight: 5 },
    { text: "great grandma", weight: 4 },
  ],
  Discussion_About_Denial: [
    { text: "armenian genocide", weight: 10 },
    { text: "turkish government", weight: 3 },
    { text: "young turks", weight: 2 },
    { text: "turkish people", weight: 2 },
    { text: "ottoman empire", weight: 2 },
  ],
  Minimization_Reframing: [
    { text: "ottoman empire", weight: 10 },
    { text: "armenian genocide", weight: 7 },
    { text: "people died", weight: 3 },
    { text: "young turks", weight: 3 },
    { text: "turkish people", weight: 2 },
  ],
  Reconciliation_Discourse: [
    { text: "turkish people", weight: 10 },
    { text: "live peace", weight: 8 },
    { text: "turkey armenia", weight: 7 },
    { text: "armenian people", weight: 7 },
    { text: "want war", weight: 7 },
  ],
  Sympathy_Memorial_Commemorative: [
    { text: "armenian genocide", weight: 10 },
    { text: "god bless", weight: 8 },
    { text: "armenian people", weight: 8 },
    { text: "rest peace", weight: 6 },
    { text: "brothers sisters", weight: 6 },
  ],
  Procedural_Deflection_Evidence_Archives: [
    { text: "open archives", weight: 10 },
    { text: "armenian genocide", weight: 8 },
    { text: "ottoman archives", weight: 5 },
    { text: "international court", weight: 5 },
    { text: "archives open", weight: 4 },
  ],
};

// Get common words for a stance
const getCommonWords = (stance) => {
  return bigramsByStance[stance] || [];
};

// Calculate font size based on word weight
const getWordSize = (weight) => {
  const baseSize = 12;
  const scale = 1;
  return `${baseSize + weight * scale}px`;
};

// Add this helper function to your existing script
const hexToRgb = (hex) => {
  // Default fallback if hex is invalid
  if (!hex || typeof hex !== "string") return "0, 0, 0";

  // Remove # if present
  hex = hex.replace("#", "");

  // Convert 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.substring(4, 6), 16) || 0;

  return `${r}, ${g}, ${b}`;
};
</script>

<style scoped>
/* Update the container width to use more page space */
.stance-list-container {
  display: flex;
  flex-direction: column;
  max-width: 1200px; /* Increased from 800px */
  width: 95%; /* Add this to ensure it uses most of the available width */
  margin: 0 auto;
  padding: 60px 20px;
  font-family: "Aktiv Grotesk", sans-serif;
  /* font-family: Arial, sans-serif; */
  background-color: white;
  color: #000;
}

/* Center the main title properly */
.header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 0;
  padding-left: 0px;
  padding-right: 0px;
  border-bottom: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center children */
}

.main-title {
  font-size: 24px;
  font-family: "Aktiv Grotesk", sans-serif;
  /* font-family: "Aktiv Grotesk", sans-serif; */
  font-weight: normal;
  text-transform: uppercase;
  margin-bottom: 0;
  margin-top: 35px;
  position: relative;
  display: inline-block;
  /* No additional centering needed as the parent handles it */
}

/* Remove the border-top from stance-list */
.stance-list {
  border-top: none; /* Remove the top border */
}

/* Add a separator after the first stance item if desired */

.subtitle {
  font-size: 16px;
  /* font-family: "Times New Roman", serif; */
  font-family: "Aktiv Grotesk", sans-serif;

  font-weight: normal;
  color: #666;
  margin-bottom: 40px;
  letter-spacing: 1px;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  font-size: 14px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 24px;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #666;
}

.stance-list {
  border-top: 1px solid #000;
}

.stance-item {
  border-bottom: 1px solid #00000064;
  transition: background-color 0.2s;
}

/* Remove hover background effect from stance-item */
.stance-item:hover {
  background-color: transparent; /* Remove background color change */
}

/* Adjust the stance header to be more spacious */
.stance-header {
  display: flex;
  align-items: center;
  padding: 20px 25px 20px 50px; /* Updated to match header padding */
  position: relative;
  font-family: "General Sans", sans-serif;
  justify-content: center; /* Center the content horizontally */
  max-width: 80%; /* Limit width to create center space */
  margin: 0 auto; /* Center the header */
}

/* Adjust spacing for wider layout */
.stance-number {
  width: 50px; /* Increased slightly */
  text-align: right;
  font-size: 14px;
  color: #666;
  margin-right: 10px; /* Add margin to keep spacing consistent */
}

/* Make color dot more visible in the wider layout */
.stance-color {
  width: 10px; /* Slightly larger */
  height: 10px; /* Slightly larger */
  border-radius: 50%;
  margin-right: 25px; /* More spacing */
  margin-left: 15px; /* Adjusted from 25px */
  flex-shrink: 0;
}

/* Make stance name visibly clickable */
.stance-name {
  flex: 1;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding-right: 40px; /* Add space for longer names */
  cursor: pointer; /* Add pointer cursor to indicate clickability */
  padding: 8px 15px; /* Add padding for better click target */
  border-radius: 2px; /* Slight rounding for hover effect */
  /* Remove transition for hover effect */
}

/* Remove hover background effect from stance name */
.stance-item:hover .stance-name {
  background-color: transparent; /* Remove background color change */
}

.stance-count {
  width: 60px;
  text-align: right;
  font-size: 14px;
  font-family: "General Sans", sans-serif;
}

.actions {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: 20px;
}

.expand-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #666;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 50%;
}

.expand-icon:hover {
  background-color: #f0f0f0;
}

.navigate-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  border-radius: 50%;
}

.navigate-icon:hover {
  color: #000;
  background-color: #f0f0f0;
}

/* Add more space for the expanded content */
.stance-content {
  padding: 30px 80px 40px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.word-cloud {
  margin-bottom: 20px;
}

.word-cloud-title {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
  color: #666;
}

/* Make words take advantage of wider space */
.words {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center words */
  gap: 20px; /* Increased from 15px */
  margin-bottom: 25px; /* Increased spacing */
  max-width: 90%; /* Limit width to avoid spanning too wide */
}

/* Update examples to use the wider space effectively */
.examples {
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(400px, 1fr)
  ); /* Show examples side by side on wider screens */
  gap: 20px;
  max-width: 90%; /* Limit width like for words */
}

.example {
  font-size: 15px; /* Slightly larger */
  font-style: italic;
  margin-bottom: 0; /* Reset margin since we're using grid gap */
  color: #666;
  line-height: 1.5; /* Better line spacing */
}

.view-more {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #000;
  text-decoration: none;
  border-bottom: 1px solid #000;
  display: inline-block;
  transition: border-color 0.2s;
}

.view-more:hover {
  border-bottom-color: transparent;
}

.note {
  margin-top: 40px;
  font-size: 12px;
  color: #666;
  font-style: italic;
  text-align: center;
}

/* Expand animation */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s;
  max-height: 300px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

/* Mobile responsiveness */
@media (max-width: 1200px) {
  .stance-list-container {
    max-width: 95%;
  }

  .stance-content {
    padding: 25px 60px 35px 90px;
  }
}

@media (max-width: 900px) {
  .examples {
    grid-template-columns: 1fr; /* Single column on medium screens */
  }

  .stance-content {
    padding: 20px 40px 30px 80px;
  }
}

@media (max-width: 600px) {
  .stance-list-container {
    padding: 30px 15px;
    max-width: 100%;
  }

  .main-title {
    font-size: 18px;
    letter-spacing: 4px;
  }

  .stats {
    flex-direction: column;
    gap: 20px;
  }

  .stance-name {
    font-size: 14px;
    /* letter-spacing: 1px; */
    padding-right: 10px; /* Less space on mobile */
  }

  .stance-content {
    padding: 20px 20px 30px 60px;
  }

  .stance-number {
    width: 30px; /* Smaller on mobile */
  }

  .stance-color {
    margin-right: 15px;
    margin-left: 10px;
  }
}
</style>
