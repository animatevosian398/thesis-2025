<template>
  <div class="stance-page-container" :style="{ backgroundColor: stanceColor }">
    <div @click="goBack" class="back-arrow">← Back</div>

    <div class="content-container">
      <h1 class="centered-title">Explicit Denial</h1>

      <div class="scrolling-comments-container">
        <div class="scrolling-comments" ref="scrollingComments">
          <span
            v-for="(comment, index) in comments"
            :key="index"
            class="comment"
            v-html="comment"
          >
          </span>
          <span v-if="allCommentsVisible" class="end-message">End of Text</span>
        </div>
      </div>

      <div class="controls">
        <button
          class="control-button"
          @click="togglePause"
          :aria-label="isPaused ? 'Play scrolling' : 'Pause scrolling'"
        >
          {{ isPaused ? "▶ Play" : "❚❚ Pause" }}
        </button>
        <!-- <div class="comment-counter">{{ comments.length }} comments</div> -->
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
  name: "ExplicitDenial",
  setup() {
    const router = useRouter();
    const route = useRoute();

    const goBack = () => {
      router.push({ name: "bubble-chart" });
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
      stanceColor: stanceColors["Explicit_Denial"] || "#f0f0f0",
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
      Papa.parse("/assets/Classified_Comments.csv", {
        download: true,
        header: true,
        complete: (results) => {
          this.comments = results.data
            .filter((row) => {
              const stance = (row.predicted_stance || "").trim().toLowerCase();
              return stance === "explicit_denial";
            })
            .map((row) => {
              // Clean and process the text
              let cleanedText = (
                row.cleaned_text || "No text available"
              ).replace(/\n/g, " ");

              // Add a space between sentences if missing
              cleanedText = cleanedText.replace(/([.!?])([A-Z])/g, "$1 $2");

              // Bold the word "sorry" and "apologize"
              cleanedText = cleanedText
                .replace(/not a genocide/gi, "<b>$&</b>")
                .replace(/no genocide/gi, "<b>$&</b>")
                // Bold the word "lie" only when it's a separate word
                .replace(/\blie\b/gi, "<b>$&</b>")
                .replace(/\blies\b/gi, "<b>$&</b>")
                .replace(/fake/gi, "<b>$&</b>");

              return cleanedText;
            });

          console.log("Filtered ExplicitDenial comments:", this.comments);
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

      // Start with content centered (middle of content at 50% of container)
      scrollingElement.style.top = "50%";
      this.allCommentsVisible = false;

      this.scrollInterval = setInterval(() => {
        if (this.isPaused || this.allCommentsVisible) return; // Skip if paused or all comments are visible

        const currentTop = parseFloat(scrollingElement.style.top) || 50;
        const newTop = currentTop - 0.15; // Slower scroll for better readability

        scrollingElement.style.top = `${newTop}%`;

        // Reset when content scrolls completely off the top
        const contentHeight = scrollingElement.offsetHeight;
        const containerHeight =
          this.$refs.scrollingComments.parentElement.offsetHeight;
        const resetPoint = -100 * (contentHeight / containerHeight) * 1.5; // Adjust for content height
        if (newTop < resetPoint) {
          this.stopScrolling();
          this.allCommentsVisible = true;
          scrollingElement.style.top = "50%"; // Reset to centered
        }
      }, 50);
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
  font-family: "Aktiv Grotesk", sans-serif;
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

.centered-title {
  font-size: 32px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  z-index: 5;
  background-color: rgba(176, 176, 176, 0.2);
  padding: 20px 40px;
  border-radius: 8px;
}

.scrolling-comments-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scrolling-comments {
  position: absolute;
  width: 100%;
  padding: 0 20px;
  white-space: normal;
  font-size: 14px;
  line-height: 1.6; /* Increased line height for better readability */
  opacity: 0.8; /* Slightly higher opacity */
  text-align: center;
  transform: translateY(-50%); /* Center content vertically */
  letter-spacing: 0.2px; /* Better letter spacing */
  word-spacing: 1px; /* Better word spacing */
}

.comment {
  display: inline;
  margin: 0 8px; /* Add margin between comments */
}

.comment-text {
  display: inline;
}

.comment-divider {
  display: inline-block;
  margin: 0 12px;
  opacity: 0.6;
  font-size: 10px;
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
  background-color: rgba(176, 176, 176, 0.2);
  border: none;
  border-radius: 4px;
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
</style>
