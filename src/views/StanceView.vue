<template>
  <div class="stance-container" :style="{ backgroundColor }">
    <button class="back-button" @click="$router.back()">← Back</button>
    <!--s Background comments filling page -->
    <div class="background-comments">
      <span
        v-for="(comment, index) in comments"
        :key="index"
        class="comment-text"
        v-html="highlightWords(comment)"
      >
      </span>
    </div>

    <!-- Center-page title -->
    <div class="main-content">
      <div class="title-container">
        <h1 class="stance-title">{{ formatStance(stance) }}</h1>
        <p class="stance-count">{{ comments.length }} comments</p>
      </div>

      <div v-if="loading" class="loading">Loading...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, computed } from "vue";
import Papa from "papaparse";
import { stanceColors } from "../config/colors";

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

const loadComments = async (stance) => {
  loading.value = true;

  try {
    // Load comments from your CSV file
    const response = await fetch("/assets/Classified_Comments.csv");
    const csvText = await response.text();

    Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        let filteredComments = results.data
          .filter((row) => row.predicted_stance === stance)
          .map((row) => row.cleaned_text || row.text || "");

        // If we got no comments, show a message
        if (filteredComments.length === 0) {
          filteredComments = [`No comments found for ${formatStance(stance)}`];
        }

        // Limit comments to prevent browser issues
        if (filteredComments.length > 250) {
          filteredComments = filteredComments.slice(0, 250);
        }

        comments.value = filteredComments;
        loading.value = false;
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
        comments.value = [`Error loading comments: ${error.message}`];
        loading.value = false;
      },
    });
  } catch (error) {
    console.error("Error loading comments:", error);
    comments.value = [`Error: ${error.message}`];
    loading.value = false;
  }
};

const wordsToHighlight = [
  "traitors",
  "backstab",
  "siding",
  "threat",
  "rebel",
  "traitor",
  "backstabbing",
  "sided",
  "threats",
  "rebels",
];

const highlightWords = (text) => {
  console.log("Processing text:", text); // Debug log
  if (!text) return "";

  return text
    .split(" ")
    .map((word) => {
      const cleanWord = word.toLowerCase().replace(/[.,!?]/g, "");
      console.log("Checking word:", cleanWord); // Debug log
      if (wordsToHighlight.includes(cleanWord)) {
        console.log("Highlighting:", word); // Debug log
        return `<span class="highlight">${word}</span>`;
      }
      return word;
    })
    .join(" ");
};

const backgroundColor = computed(() => {
  return stanceColors[props.stance] || "#000000";
});

onMounted(() => {
  loadComments(props.stance);
});
</script>

<style scoped>
.stance-container {
  min-height: 100vh;
  color: white;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease;
}

.background-comments {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 20px;
  text-align: left;
  line-height: 1.6;
}

.comment-text {
  font-size: 0.8rem;
  opacity: 0.8;
  font-family: "aktiv-grotesk", sans-serif;
  font-weight: 400;
  margin-right: 15px;
  margin-bottom: 5px;
  display: inline;
  white-space: pre-wrap;
}

.comment-text::after {
  content: " • ";
  margin: 0 5px;
  opacity: 0.5;
}

.main-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.title-container {
  background-color: rgba(99, 99, 99, 0.066);
  padding: 2rem;
  text-align: center;
}

.stance-title {
  font-size: 3rem;
  font-weight: 400;
  font-family: "aktiv-grotesk", sans-serif;
  letter-spacing: 0.02em;
  margin: 0;
}

.stance-count {
  font-size: 1rem;
  opacity: 0.8;
  margin-top: 1rem;
  font-family: "aktiv-grotesk", sans-serif;
  font-weight: 400;
  margin-bottom: 0;
}

.loading {
  margin-top: 20px;
  font-size: 1rem;
  opacity: 0.6;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 5px 15px;
  border-radius: 4px;
  pointer-events: auto;
}
.back-button {
  position: fixed;
  top: 80px; /* Increased from 40px */
  left: 40px;
  /* background: white; */
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: rgb(255, 255, 255);
  font-family: "General Sans", sans-serif;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  padding: 12px 20px;
  z-index: 20;
  pointer-events: auto;
  opacity: 0.8;
  transition: all 0.2s ease;
}

.back-button:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.1);
}

.highlight {
  color: #ff4444 !important;
  opacity: 1 !important;
  font-weight: 600;
  background-color: rgba(255, 68, 68, 0.2);
  padding: 0 2px;
}

@media (max-width: 768px) {
  .background-comments {
    padding: 15px;
  }

  .title-container {
    padding: 15px 30px;
  }
}

@media (max-width: 480px) {
  .background-comments {
    padding: 10px;
  }

  .title-container {
    padding: 10px 20px;
  }
}
</style>
