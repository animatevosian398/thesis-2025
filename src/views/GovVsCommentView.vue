<template>
  <div class="text-visualizer">
    <div class="header">
      <div class="title">
        How are the official government stances <em>echoed</em> in public
        discourse online?
      </div>
      <div class="sections">
        <div class="section-label government">GOVERNMENT</div>
        <div class="section-label social-media">ONLINE DISCOURSE</div>
      </div>
    </div>

    <!-- Add document selector -->
    <div class="document-selector">
      <label
        for="document-select"
        class="block text-sm font-medium leading-6 text-gray-900"
      >
        Choose a government document:
      </label>
      <select
        id="document-select"
        v-model="activeDocument"
        @change="handleDocumentChange"
        class="mt-2 block w-full py-2 px-3 bg-white border border-black rounded-none text-sm text-gray-900 appearance-none cursor-pointer hover:border-gray-500 focus:outline-none focus:border-gray-700"
      >
        <option v-for="doc in documents" :key="doc.id" :value="doc">
          {{ doc.title }}
        </option>
      </select>
    </div>

    <div class="content-container" v-if="activeDocument">
      <!-- Government text section -->
      <div class="government-text-container">
        <!-- Use dynamic component based on activeDocument -->
        <component
          :is="activeDocument.component"
          :documentData="activeDocument"
          @showRelatedComments="showRelatedComments"
          @showAllComments="showAllComments"
        />
      </div>

      <!-- Comments section -->
      <div class="social-media-comments">
        <h3>Real Users' Comments and Replies on YouTube</h3>

        <!-- Add instruction message -->
        <div v-if="activeStance === 'all'" class="instruction-message">
          Click on highlighted sections of the government text to view comments
          that share the sentiment.
        </div>

        <!-- Show this when stance is selected -->
        <div v-else class="comments-header">
          {{ formatStanceForDisplay(activeStance) }} ·
          {{ visibleComments.length }} comments
        </div>

        <div id="comments-container">
          <!-- Using computed property to filter comments by stance -->
          <div
            v-for="(comment, index) in visibleComments"
            :key="'comment-' + index"
            class="comment-card"
            :class="{
              [getStanceClass(comment.stance)]: true,
            }"
          >
            <div class="comment-header">
              <div class="username-timestamp-container">
                <div class="username">{{ comment.username }}</div>
                <div class="comment-timestamp">
                  {{ comment.date }}
                </div>
              </div>
              <div class="stance-label">
                {{ getStanceLabel(comment.stance) }}
              </div>
            </div>
            <p>{{ comment.text }}</p>

            <div class="comment-actions">
              <div class="comment-like">
                <svg
                  class="comment-like-icon"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
                  />
                </svg>
                <span class="comment-like-count">
                  {{ comment.likes }}
                </span>
              </div>
            </div>

            <div class="video-source">
              <span>From: </span>
              <a
                :href="comment.videoSource.url"
                target="_blank"
                class="video-link"
              >
                {{ comment.videoSource.title }}
              </a>
            </div>

            <div
              class="matched-phrases"
              v-if="comment.matchedPhrases && comment.matchedPhrases.length > 0"
            >
              Matched phrases:
              <span
                v-for="(phrase, i) in comment.matchedPhrases"
                :key="i"
                class="matched-phrase"
              >
                {{ phrase }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Debug Panel -->
    <div class="debug-panel">
      Current stance: {{ formatStanceForDisplay(activeStance) }}
    </div>
  </div>
</template>

<script>
import Papa from "papaparse";
import GovernmentText from "../components/GovernmentText.vue";
import JustinMcCarthy from "../components/government-documents/JustinMcCarthy.vue";
import stancePhrases from "../assets/stancePhrases.json";

// Define stance mapping object
const stanceMapping = {
  Apology: "apology",
  Explicit_Denial: "explicit-denial",
  Historical_Affirmation: "historical-affirmation",
  Competitive_Victimhood_Historical_Inversion: "competitive-victimhood",
  Contemporary_Comparison: "contemporary-comparison",
  Discussion_About_Denial: "discussion-about-denial",
  Reconciliation_Discourse: "reconciliation-discourse",
  Justification_Narrative: "justification-narrative",
  Personal_Testimony: "personal-testimony",
  Minimization_Reframing: "minimization-and-reframing",
  Sympathy_Memorial_Commemorative: "sympathy-memorial-commemorative",
  Procedural_Deflection_Evidence_Archives:
    "procedural-deflection-using-archives-and-evidence",
};

export default {
  name: "GovVsCommentView",
  components: {
    GovernmentText,
    JustinMcCarthy,
  },
  data() {
    return {
      activeStance: "all",
      commentsData: [],
      isLoading: true,
      stancePhrases: stancePhrases,
      // Add documents data
      documents: [
        {
          id: "turkey-mfa",
          title: "Turkish MFA: The Events of 1915",
          source: "Republic of Turkey Ministry of Foreign Affairs",
          sourceUrl:
            "https://www.mfa.gov.tr/the-events-of-1915-and-the-turkish-armenian-controversy-over-history_-an-overview.en.mfa",
          component: GovernmentText, // Direct component reference
        },
        {
          id: "justin-mccarthy",
          title: "Presentation Made by Prof. Justin McCarthy",
          source: "Republic of Turkey Ministry of Foreign Affairs",
          sourceUrl: "https://www.mfa.gov.tr/...",
          component: JustinMcCarthy, // Direct component reference
        },
      ],
      activeDocument: null, // Track which document is currently selected
    };
  },
  computed: {
    visibleComments() {
      // If the active stance is "all", show all comments
      if (this.activeStance === "all") {
        return this.commentsData;
      }

      // If the active stance is an array (for multiple stances), filter matching comments
      else if (Array.isArray(this.activeStance)) {
        return this.commentsData.filter((comment) =>
          this.activeStance.includes(comment.stance)
        );
      }

      // If it's a single stance, filter comments matching that stance
      else {
        return this.commentsData.filter(
          (comment) => comment.stance === this.activeStance
        );
      }
    },
  },
  methods: {
    // Method to handle document selection change
    handleDocumentChange() {
      // Reset stance to "all" when switching documents
      this.activeStance = "all";
    },

    findPhraseMatches(comment) {
      if (!comment || !comment.text || !comment.stance) {
        return [];
      }

      // Get phrases for this stance
      const phrases = this.stancePhrases[comment.stance];
      if (!phrases || !Array.isArray(phrases)) {
        return [];
      }

      const commentText = comment.text.toLowerCase();
      const matches = [];

      // Check for each phrase
      phrases.forEach((phrase) => {
        if (phrase && typeof phrase === "string") {
          // Create a case-insensitive regex for the phrase
          const phraseRegex = new RegExp(
            `\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
            "i"
          );

          if (phraseRegex.test(commentText)) {
            matches.push(phrase);
          }
        }
      });

      return matches;
    },

    processCommentsWithPhrases(comments) {
      if (!comments || !Array.isArray(comments)) {
        return [];
      }

      return comments.map((comment) => {
        // Create a shallow copy to avoid modifying the original
        const processedComment = { ...comment };

        // Find and add matched phrases
        processedComment.matchedPhrases =
          this.findPhraseMatches(processedComment);

        return processedComment;
      });
    },

    loadCSV() {
      this.isLoading = true;

      try {
        fetch("/assets/Classified_Comments.csv")
          .then((response) => {
            if (!response.ok) {
              throw new Error("CSV file not found");
            }
            return response.text();
          })
          .then((csvText) => {
            Papa.parse(csvText, {
              header: true,
              skipEmptyLines: true,
              complete: (results) => {
                const comments = results.data
                  .filter((row) => row.cleaned_text && row.predicted_stance)
                  .map((row, index) => ({
                    id: row.comment_id || index,
                    username: row.author || "Anonymous",
                    stance: row.predicted_stance, // Keep original capitalization
                    text: row.cleaned_text,
                    likes: parseInt(row.like_count) || 0,
                    videoSource: {
                      title: row.video_title || "YouTube Video",
                      url: `https://www.youtube.com/watch?v=${row.video_id}`,
                    },
                    date: row.publish_date
                      ? new Date(row.publish_date).toLocaleDateString()
                      : "Unknown date",
                  }));

                this.commentsData = this.processCommentsWithPhrases(comments);
                this.isLoading = false;
              },
              error: (error) => {
                console.error("Error parsing CSV:", error);
                this.isLoading = false;
              },
            });
          })
          .catch((error) => {
            console.error("Error fetching CSV:", error);
            this.isLoading = false;
          });
      } catch (error) {
        console.error("Exception in loadCSV:", error);
        this.isLoading = false;
      }
    },

    showRelatedComments(stance) {
      console.log("Showing comments for stance:", stance);
      this.activeStance = stance;

      // Scroll the comments container to the top after a short delay
      // to ensure the comments have been updated in the DOM
      this.$nextTick(() => {
        const commentsContainer = document.querySelector(
          ".social-media-comments"
        );
        if (commentsContainer) {
          commentsContainer.scrollTop = 0;
        }
      });
    },

    showAllComments() {
      console.log("Showing all comments");
      this.activeStance = "all";
    },

    formatStanceForDisplay(stance) {
      if (!stance || stance === "all") return "All Comments";
      return stance.replace(/_/g, " ");
    },

    getStanceClass(stance) {
      if (!stance) return "";

      // Handle capitalized stance names from CSV
      return `stance-${stance.toLowerCase().replace(/_/g, "-")}`;
    },

    getStanceLabel(stance) {
      if (!stance) return "";
      // Format capitalized stance for display
      return stance.toLowerCase().replace(/_/g, " ");
    },
  },

  mounted() {
    console.log("Component mounted");

    // Set the first document as active by default
    this.activeDocument = this.documents[0];

    // Load the CSV data
    this.loadCSV();
  },
};
</script>

<style scoped>
.document-selector {
  margin-bottom: 20px;
  padding: 0 0px;
  text-align: left;
}
#document-select {
  background-color: rgb(255, 255, 255);
  border: 1px solid #00000067;
  color: #333333;
  border-radius: 2px;
  padding: 5px;
  font-size: 14px;
  font-family: "Helvetica", Arial, sans-serif;
  transition: all 0.2s ease;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 12px top 50%;
  background-size: 8px auto;
  padding-right: 20px;
}

/* Style dropdown options */
#document-select option {
  background-color: white;
  color: #333333;
  padding: 12px;
  font-size: 14px;
  font-family: "Helvetica", Arial, sans-serif;
}

#document-select:focus {
  outline: none !important;
  box-shadow: none !important;
  -webkit-focus-ring-color: transparent !important;
  border-color: #999999 !important;
}

#document-select:hover {
  border-color: #cccccc;
}

#document-select:focus {
  outline: none;
  border-color: #999999;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.document-selector label {
  font-weight: bold;
  margin-right: 10px;
  background-color: white;
}

.document-selector select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-width: 300px;
}
.text-visualizer {
  background-color: white;
  color: #111111;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif;
  padding: 40px;
  width: 100%; /* Full width */
  max-width: 100%; /* Remove max-width constraint */
  margin: 0; /* Remove margins */
  box-sizing: border-box;
}

.header {
  margin-bottom: 20px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  padding: 10px;
  font-family: "General Sans", sans-serif;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}

.sections {
  display: flex;
  /* border-top: 1px solid rgba(0, 0, 0, 0.471); */
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.471);
  justify-content: space-between;
}

.section-label {
  text-transform: uppercase;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.05em;
}

.government {
  color: rgb(0, 0, 0);
}

.social-media {
  color: rgb(0, 0, 0);
}

.content-container {
  display: flex;
  height: calc(100vh - 120px);
  width: 100%;
  overflow: hidden;
  padding-bottom: 10px;
  box-sizing: border-box;
  background-color: white;
}

.government-text-container {
  width: 55%;
  box-sizing: border-box;
  overflow: hidden;
}

.social-media-comments {
  width: 45%;
  padding-left: 20px;
  border-left: 1px solid #ddd;
  text-align: left;
  overflow: hidden;
  height: 100%;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

#comments-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  padding: 10px;
}

.comment-card {
  min-height: 0;
  padding: 10px;
  font-size: 13px;
  line-height: 1.3;
}

.comment-header {
  margin-bottom: 2px;
}

.username,
.comment-timestamp {
  font-size: 11px;
}

.comment-card p {
  margin: 4px 0;
  font-size: 12px;
}

.video-source {
  font-size: 10px;
  margin-top: 2px;
}

.government-text-container {
  width: 55%;
  overflow-y: auto;
  box-sizing: border-box;
}

.social-media-comments {
  width: 45%;
  padding-left: 20px;
  border-left: 1px solid #ddd;
  text-align: left;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  box-sizing: border-box;
  position: relative;
}

.social-media-comments h3 {
  font-size: 20px;
  margin-bottom: 6px;
  color: #333;
  text-align: left;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
  padding-bottom: 6px;
  margin-top: 0;
}

.comments-header {
  color: #666;
  font-size: 13px;
  margin-bottom: 5px;
  padding-left: 10px;
  font-family: "Roboto", sans-serif;
}

h5 {
  font-size: 0.85em;
  color: #666;
  margin-top: 0.5em;
  text-align: left;
  font-family: "Helvetica", "Arial", sans-serif;
  position: sticky;
  top: 35px;
  background-color: white;
  z-index: 9;
  padding-bottom: 8px;
}

.comment-card {
  margin-bottom: 5px;
  padding: 15px;
  border-radius: 1px;
  background-color: #f9f9f900;
  border-left: 3px solid #ddd;
  text-align: left;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  text-align: left;
  justify-content: space-between;
}

.stance-label {
  font-size: 11px;
  color: white;
  padding: 2px 6px;
  border-radius: 0px;
  font-weight: bold;
}

.username {
  font-weight: bold;
  color: #333;
  font-size: 13px;
  text-align: left;
  margin-right: 6px;
}

.comment-card p {
  margin: 0 0 8px 0;
  font-size: 12px;
  color: #333;
  text-align: left;
}

.matched-phrases {
  font-size: 11px;
  color: #777;
  text-align: left;
  margin-top: 1px;
}

.matched-phrase {
  background-color: #fff9c4;
  padding: 1px 3px;
  margin-right: 3px;
  border-radius: 2px;
  display: inline-block;
}

/* Stance colors */
.stance-explicit-denial {
  border-left-color: #e53935; /* red */
}
.stance-explicit-denial .stance-label {
  background-color: #e53935;
}

.stance-justification-narrative {
  border-left-color: #ff9800; /*orange*/
}
.stance-justification-narrative .stance-label {
  background-color: #ff9800;
}

.stance-competitive-victimhood-historical-inversion {
  border-left-color: #778b33d8;
}
.stance-competitive-victimhood-historical-inversion .stance-label {
  background-color: #778b33d8;
  color: rgb(255, 255, 255);
}

.stance-historical-affirmation {
  border-left-color: #673ab7; /* purple */
}
.stance-historical-affirmation .stance-label {
  background-color: #673ab7;
}

.stance-sympathy-memorial-commemorative {
  border-left-color: #4caf50; /* green */
}
.stance-sympathy-memorial-commemorative .stance-label {
  background-color: #4caf50;
}

.stance-minimization-reframing {
  border-left-color: #87b2c2;
}
.stance-minimization-reframing .stance-label {
  background-color: #87b2c2;
}

.stance-reconciliation-discourse {
  border-left-color: #527c7995;
}
.stance-reconciliation-discourse .stance-label {
  background-color: #527c7995;
}

.stance-procedural-deflection-evidence-archives,
.stance-procedural-deflection-using-archives-and-evidence {
  border-left-color: #5d3a6cd9;
}
.stance-procedural-deflection-evidence-archives .stance-label,
.stance-procedural-deflection-using-archives-and-evidence .stance-label {
  background-color: #5d3a6cd9;
}

.video-source {
  font-size: 11px;
  color: grey;
  margin-top: 5px;
}

.video-link {
  color: #065fd4; /* YouTube's characteristic blue link color */
  text-decoration: none;
}

.video-link:hover {
  text-decoration: underline;
}

.comment-actions {
  display: flex;
  align-items: center;
  margin-top: 8px;
  color: #606060;
  font-size: 12px;
}

.comment-like {
  display: flex;
  align-items: center;
  margin-right: 12px;
  padding-bottom: 4px;
}

.comment-like-icon {
  width: 18px;
  height: 18px;
  margin-right: 4px;
  opacity: 0.6;
}

.username-timestamp-container {
  display: flex;
  align-items: baseline;
}

.comment-like-count {
  color: #101010;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  margin-left: 2px;
  opacity: 0.8; /* Slightly faded */
}

.comment-timestamp {
  color: #606060;
  font-size: 11px;
  margin-right: 6px;
}

.debug-panel {
  position: fixed;
  bottom: 0;
  right: 0;
  font-family: Georgia, "Times New Roman", Times, serif;
  color: rgb(0, 0, 0);
  padding: 10px;
  z-index: 1000;
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
}

.instruction-message {
  color: #666;
  font-size: 14px;
  padding: 20px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  border-left: 3px solid #ddd;
  background-color: #f9f9f9;
  margin: 20px 0;
}

/* Ensure body and app container are also full width */
:root,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: white;
}
</style>
