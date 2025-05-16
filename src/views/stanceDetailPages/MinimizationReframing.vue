<template>
  <div
    @click="togglePause"
    class="stance-page-container"
    :style="{ backgroundColor: stanceColor }"
  >
    <div @click="goBack" class="back-arrow">← Back</div>

    <div class="content-container">
      <h1 class="centered-title">Minimization & Reframing</h1>

      <div class="scrolling-comments-container">
        <div class="scrolling-comments" ref="scrollingComments">
          <span
            v-for="(comment, index) in comments"
            :key="index"
            class="comment"
            v-html="comment"
          ></span>
          <span v-if="allCommentsVisible" class="end-message">End of Text</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import Papa from "papaparse";
import { stanceColors } from "@/config/colors";

export default defineComponent({
  name: "HistoricalAffirmation",
  setup() {
    const router = useRouter();
    const route = useRoute();

    const goBack = () => {
      router.push({ name: "narratives-list" });
    };

    return {
      router,
      route,
      goBack,
    };
  },
  data() {
    return {
      comments: [],
      stanceColor: stanceColors["Minimization_Reframing"] || "#f0f0f0",
      scrollInterval: null,
      isPaused: false, // Track pause state
      allCommentsVisible: false, // Track if all comments have been shown
    };
  },
  mounted() {
    this.loadCommentsFromCSV();
  },
  beforeUnmount() {
    this.stopScrolling();
  },
  methods: {
    loadCommentsFromCSV() {
      Papa.parse("assets/Classified_Comments.csv", {
        download: true,
        header: true,
        complete: (results) => {
          this.comments = results.data
            .filter((row) => {
              const stance = (row.predicted_stance || "").trim().toLowerCase();
              return stance === "minimization_reframing";
            })
            .map((row, index) => {
              // Clean and process the text
              let cleanedText = (
                row.cleaned_text || "No text available"
              ).replace(/\n/g, " ");

              // Add a space between sentences if missing
              cleanedText = cleanedText.replace(/([.!?])([A-Z])/g, "$1 $2");

              // Bold the word "sorry" and "apologize"
              cleanedText = cleanedText
                .replace(/sorry/gi, "<b>$&</b>")
                .replace(/apologize/gi, "<b>$&</b>");

              // Add a divider after the comment except for the last one
              if (index < results.data.length - 1) {
                cleanedText += '<span class="comment-divider">•</span>';
              }

              return cleanedText;
            });

          console.log("Filtered Apology comments:", this.comments.length);
          this.$nextTick(() => {
            this.startScrolling();
          });
        },
        error: (error) => {
          console.error("Error loading CSV:", error.message);
        },
      });
    },
    startScrolling() {
      if (this.scrollInterval) {
        this.stopScrolling();
      }

      const scrollingElement = this.$refs.scrollingComments;
      if (!scrollingElement) return;

      // Change this line to position the content higher initially
      scrollingElement.style.top = "100%"; // Changed from "50%" to "90%"
      this.allCommentsVisible = false;

      // Add a small delay before starting the scroll
      setTimeout(() => {
        this.scrollInterval = setInterval(() => {
          if (this.isPaused || this.allCommentsVisible) return;

          const scrollingElement = this.$refs.scrollingComments;
          const currentTop = parseFloat(scrollingElement.style.top) || 0;
          const newTop = currentTop - 1; // Slower scroll for better readability

          scrollingElement.style.top = `${newTop}px`;

          const containerHeight = scrollingElement.parentElement.offsetHeight;
          const contentHeight = scrollingElement.offsetHeight;

          if (Math.abs(newTop) > contentHeight - containerHeight) {
            this.stopScrolling();
            this.allCommentsVisible = true;
            scrollingElement.style.top = "0px"; // Reset
          }
        }, 40);
      }, 500); // 500ms delay before starting scroll
    },
    stopScrolling() {
      if (this.scrollInterval) {
        clearInterval(this.scrollInterval);
        this.scrollInterval = null;
      }
    },
    togglePause() {
      this.isPaused = !this.isPaused;
      if (!this.isPaused) {
        this.startScrolling(); // Resume scrolling
      } else {
        this.stopScrolling(); // Pause scrolling
      }
    },
    // Add spacing between sentences that are missing it
    addSpacingBetweenSentences(text) {
      return text.replace(/([.!?])([A-Z])/g, "$1 $2");
    },
  },
});
</script>

<style scoped>
.stance-page-container {
  padding: 0;
  min-height: 100vh;
  color: white;
  font-family: Georgia, "Times New Roman", Times, serif;
  /* font-family: "Aktiv Grotesk", sans-serif; */
  position: relative;
  overflow: hidden;
}

.back-arrow {
  position: absolute;
  top: 60px;
  left: 20px;
  font-size: 20px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s ease;
  z-index: 10;
}

.back-arrow:hover {
  color: white;
}

.content-container {
  display: flex;
  margin: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
}

/* Make the title more prominent */
.centered-title {
  font-size: 32px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  z-index: 5;
  background-color: rgba(37, 37, 37, 0.074); /* Increased opacity */
  padding: 20px 40px;
  border-radius: 2px;
}

.scrolling-comments-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Make scrolling comments more transparent */
.scrolling-comments {
  position: absolute;
  top: 0px;
  width: 100%;
  padding: 0 30px;
  white-space: normal;
  font-size: 20px;
  line-height: 1.6;
  text-align: justify;
  letter-spacing: 0.2px;
  word-spacing: 1px;
  transform: translateY(-50%);
  opacity: 1;
}

/* Update comments styling for alternating text colors - more transparent */
.comment {
  display: inline; /* Change from block to inline for continuous flow */
  text-indent: 0; /* Remove indentation since we'll use colors */
  margin: 0 3px; /* Small margin between comments */
}

/* Create alternating text color styles */
.comment:nth-child(odd) {
  color: rgba(255, 255, 255, 0.827); /* Reduced from 0.95 to 0.7 */
}

.comment:nth-child(even) {
  color: rgba(255, 255, 255, 0.676); /* Reduced from 0.7 to 0.5 */
}

/* Make dividers more subtle between comments */
.comment-divider {
  display: inline;
  margin: 0 6px;
  opacity: 0.4;
  font-size: 8px;
  vertical-align: middle;
}

.end-message {
  display: block;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
}

.controls {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 10;
}

.control-button {
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  background-color: rgba(142, 142, 142, 0.173);
  border: none;
  border-radius: 2px;
  transition: background-color 0.3s ease;
}

.control-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.comment-counter {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  /* margin-right: 10px; */
}

/* Create a reveal effect when hovering over the container */
.stance-page-container:hover .scrolling-comments {
  opacity: 0.65; /* Slightly more visible on hover */
  transition: opacity 0.5s ease;
}
</style>
