<template>
  <div class="stance-container">
    <!-- Background comments - no rotation -->
    <div class="background-comments">
      <span
        v-for="(comment, index) in comments"
        :key="index"
        class="bg-comment"
        :style="{
          opacity: 0.2 + Math.random() * 0.3,
          fontSize: `${12 + Math.random() * 4}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }"
      >
        {{ comment }}
      </span>
    </div>

    <div class="main-content">
      <h1 class="stance-title">{{ formatStance(stance) }}</h1>
      <p class="stance-count">{{ comments.length }} comments</p>

      <div v-if="loading" class="loading">Loading comments...</div>

      <div v-else-if="comments.length === 0" class="no-comments">
        No comments found for this stance.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import Papa from "papaparse";

const props = defineProps({
  stance: {
    type: String,
    required: true,
  },
});

const comments = ref([]);
const loading = ref(true);

// Format stance names for better readability
const formatStance = (stance) => {
  return stance.replace(/_/g, " ");
};

// Sample data for testing (will be replaced with real CSV data)
const sampleData = {
  Apology: [
    "I apologize for the harm caused by these actions.",
    "We deeply regret our country's role in these events.",
    "On behalf of our government, we offer our sincere apologies.",
    "We acknowledge the pain and suffering experienced.",
    "I'm sorry for what happened to your community.",
  ],
  Historical_Affirmation: [
    "Historical records clearly document these events.",
    "The evidence for this historical event is overwhelming.",
    "Multiple sources confirm this happened exactly as described.",
    "The historical consensus is clear on this matter.",
    "Archives from that period verify these accounts.",
  ],
  Competitive_Victimhood: [
    "But what about the suffering my group endured?",
    "Our people also experienced terrible persecution.",
    "Why does no one talk about what happened to us?",
    "The media only focuses on their narrative, not ours.",
    "We were victims too, but our story is ignored.",
  ],
  Explicit_Denial: [
    "This event never actually happened.",
    "There is no legitimate evidence for these claims.",
    "These are fabricated stories with political motives.",
    "Historical research disproves these allegations.",
    "This is simply not true according to our records.",
  ],
  Justification_Narrative: [
    "These actions were necessary given the circumstances.",
    "The context of the time period explains these decisions.",
    "This was standard practice during that era.",
    "We had to protect our national interests.",
    "The geopolitical situation required these measures.",
  ],
  Contemporary_Comparison: [
    "This situation is just like what's happening in Region X today.",
    "The same patterns are emerging in current conflicts.",
    "We're seeing similar rhetoric in today's political climate.",
    "Modern examples of this include recent events in Country Y.",
    "The parallels to current events are striking.",
  ],
  Personal_Testimony: [
    "I witnessed these events with my own eyes.",
    "My grandmother told me stories about this period.",
    "As someone who lived through this, I can confirm it happened.",
    "I have personal memories of these experiences.",
    "My family's history is directly connected to these events.",
  ],
  Discussion_About_Denial: [
    "The denial of this historical event is troubling.",
    "We need to address the pattern of denial in public discourse.",
    "Denial serves political purposes but distorts history.",
    "The mechanisms of denial deserve academic scrutiny.",
    "Many groups use denial as a strategy to avoid accountability.",
  ],
  Minimization_Reframing: [
    "These events weren't as severe as commonly portrayed.",
    "The numbers have been greatly exaggerated over time.",
    "This was a complex situation with fault on all sides.",
    "The context makes these actions more understandable.",
    "This has been blown out of proportion for political reasons.",
  ],
  Reconciliation_Discourse: [
    "We must find a path forward together despite this history.",
    "Acknowledging the past is the first step toward healing.",
    "Both sides need to come together in dialogue.",
    "Reconciliation requires truth-telling and mutual respect.",
    "We can build a shared future while honoring difficult memories.",
  ],
  Sympathy_Memorial: [
    "We must never forget the victims of this tragedy.",
    "Their memory deserves to be honored and preserved.",
    "Our thoughts are with all those who suffered.",
    "This memorial serves as a reminder of human courage.",
    "We stand in solidarity with the descendants of survivors.",
  ],
  Procedural_Deflection: [
    "We need more evidence before drawing conclusions.",
    "The archives on this matter remain incomplete.",
    "Historical investigation is still ongoing.",
    "Without access to certain documents, we cannot be certain.",
    "The methodology used to study these events is flawed.",
  ],
};

const loadComments = async (stance) => {
  loading.value = true;

  try {
    // In a real application, you would uncomment this code to load from the CSV
    /*
      const response = await fetch("/assets/Classified_Comments.csv");
      const csvText = await response.text();
  
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          comments.value = results.data
            .filter((row) => row.predicted_stance === stance)
            .map((row) => row.cleaned_text);
          loading.value = false;
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
          loading.value = false;
        }
      });
      */

    // For testing purposes, use sample data
    setTimeout(() => {
      if (sampleData[stance]) {
        // Create more sample comments for testing
        const sampleComments = [...sampleData[stance]];
        // Add more variations to make it look realistic
        for (let i = 0; i < 50; i++) {
          const randomIndex = Math.floor(
            Math.random() * sampleData[stance].length
          );
          sampleComments.push(
            sampleData[stance][randomIndex] + ` (variation ${i + 1})`
          );
        }
        comments.value = sampleComments;
      } else {
        // If no sample data for this stance, create some generic ones
        comments.value = Array(50)
          .fill(0)
          .map(
            (_, i) => `Sample comment #${i + 1} for ${formatStance(stance)}`
          );
      }
      loading.value = false;
    }, 800); // Simulate loading delay
  } catch (error) {
    console.error("Error loading comments:", error);
    loading.value = false;
  }
};

onMounted(() => {
  loadComments(props.stance);
});
</script>

<style scoped>
.stance-container {
  min-height: 100vh;
  background: black;
  color: white;
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.background-comments {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.bg-comment {
  color: white;
  position: absolute;
  max-width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  pointer-events: none;
  font-family: "Courier New", monospace;
}

.main-content {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.stance-title {
  font-size: 4rem;
  margin-bottom: 1rem;
  font-family: "aktiv-grotesk", sans-serif;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px 20px;
  border-radius: 8px;
}

.stance-count {
  font-size: 1.5rem;
  opacity: 0.7;
  margin-bottom: 2rem;
  background: rgba(0, 0, 0, 0.7);
  padding: 5px 15px;
  border-radius: 4px;
}

.loading {
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
}

.no-comments {
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
}
</style>
