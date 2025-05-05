<template>
  <div class="stance-list-container">
    <header class="header">
      <h1 class="main-title">NARRATIVES</h1>
      <h2 class="subtitle">
        Analysis of 10,394 comments across Youtube videos.
      </h2>
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
          <div class="stance-name">{{ formatStance(item.stance) }}</div>
          <div class="stance-count">{{ item.count.toLocaleString() }}</div>
          <div class="actions">
            <div class="expand-icon" @click="toggleStance(item.stance)">
              {{ expandedStance === item.stance ? "−" : "+" }}
            </div>
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
    "We deeply regret our country's role in these events.",
    "On behalf of our government, we offer our sincere apologies.",
  ],
  Historical_Affirmation: [
    "Historical records clearly document these events.",
    "Multiple sources confirm this happened exactly as described.",
  ],
  Competitive_Victimhood_Historical_Inversion: [
    "But what about the suffering my group endured?",
    "Our people also experienced terrible persecution.",
  ],
  Explicit_Denial: [
    "This event never actually happened.",
    "There is no legitimate evidence for these claims.",
  ],
  Justification_Narrative: [
    "These actions were necessary given the circumstances.",
    "The context of the time period explains these decisions.",
  ],
  Contemporary_Comparison: [
    "This situation is just like what's happening in Region X today.",
    "The same patterns are emerging in current conflicts.",
  ],
  Personal_Testimony: [
    "I witnessed these events with my own eyes.",
    "My grandmother told me stories about this period.",
  ],
  Discussion_About_Denial: [
    "The denial of this historical event is troubling.",
    "We need to address the pattern of denial in public discourse.",
  ],
  Minimization_Reframing: [
    "These events weren't as severe as commonly portrayed.",
    "The numbers have been greatly exaggerated over time.",
  ],
  Reconciliation_Discourse: [
    "We must find a path forward together despite this history.",
    "Acknowledging the past is the first step toward healing.",
  ],
  Sympathy_Memorial_Commemorative: [
    "We must never forget the victims of this tragedy.",
    "Their memory deserves to be honored and preserved.",
  ],
  Procedural_Deflection_Evidence_Archives: [
    "We need more evidence before drawing conclusions.",
    "The archives on this matter remain incomplete.",
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
  font-family: Arial, sans-serif;
  background-color: white;
  color: #000;
}

.header {
  text-align: center;
  margin-bottom: 60px;
  border-bottom: 1px solid #000;
  padding-bottom: 40px;
}

.main-title {
  font-size: 24px;
  font-family: "Aktiv Grotesk", sans-serif;
  /* font-family: "Times New Roman", serif; */
  font-weight: normal;
  letter-spacing: 8px;
  text-transform: uppercase;
  margin-bottom: 30px;
}

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
  border-bottom: 1px solid #000;
  transition: background-color 0.2s;
}

.stance-item:hover {
  background-color: #f9f9f9;
}

/* Adjust the stance header to be more spacious */
.stance-header {
  display: flex;
  align-items: center;
  padding: 25px 20px; /* Added horizontal padding */
  position: relative;
}

/* Adjust spacing for wider layout */
.stance-number {
  width: 50px; /* Increased slightly */
  text-align: right;
  font-size: 14px;
  color: #666;
}

/* Make color dot more visible in the wider layout */
.stance-color {
  width: 10px; /* Slightly larger */
  height: 10px; /* Slightly larger */
  border-radius: 50%;
  margin-right: 25px; /* More spacing */
  margin-left: 25px; /* More spacing */
  flex-shrink: 0;
}

/* Give more space for the stance name */
.stance-name {
  flex: 1;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding-right: 40px; /* Add space for longer names */
}

.stance-count {
  width: 60px;
  text-align: right;
  font-size: 14px;
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
  padding: 30px 80px 40px 100px; /* Increased padding */
  background-color: #f9f9f9;
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
    letter-spacing: 1px;
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
