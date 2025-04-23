<template>
  <div class="text-visualizer">
    <div class="header">
      <div class="document-header">
        <div class="title">
          <h3>Select a Document:</h3>
          <div class="select-wrapper">
            <select
              class="document-title-select"
              v-model="activeDocument"
              @change="handleDocumentChange"
            >
              <option v-for="doc in documents" :key="doc.id" :value="doc">
                {{ doc.title }}
              </option>
            </select>
            <svg class="select-arrow" width="12" height="8" viewBox="0 0 12 8">
              <path
                d="M1.41 0.295044L6 4.87504L10.59 0.295044L12 1.70504L6 7.70504L0 1.70504L1.41 0.295044Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
      <!-- <div class="title">
        How are the official government stances <em>echoed</em> in public
        discourse online?
      </div> -->

      <div class="sections">
        <div class="section-label government">GOVERNMENT</div>

        <div class="section-label social-media">ONLINE DISCOURSE</div>
      </div>
    </div>

    <div class="content-container" v-if="activeDocument">
      <!-- Government text section -->
      <div class="government-text-container">
        <div class="document-title">
          <h3>{{ activeDocument.title }}</h3>
          <div>
            <a
              :href="activeDocument.sourceUrl"
              target="_blank"
              class="document-link"
              >{{ activeDocument.source }}</a
            >
          </div>
        </div>
        <!-- Just keep the component -->
        <component
          :is="activeDocument.component"
          :documentData="activeDocument"
          @showRelatedComments="showRelatedComments"
          @showAllComments="showAllComments"
          @mouseleave="handleMouseLeave"
        />
        <!-- Add instructlon message -->
      </div>

      <!-- Comments section -->
      <div class="social-media-comments">
        <h3 class="social-media-side-title">
          Echoing Statements from Users on YouTube
        </h3>
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
import ErdoganLetter2025 from "../components/government-documents/ErdoganLetter2025.vue";
import JustinMcCarthy from "../components/government-documents/JustinMcCarthy.vue";
import stancePhrases from "../assets/stancePhrases.json";
import AnadoluAgencyCounter from "../components/government-documents/AnadoluAgencyCounter.vue";

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
    ErdoganLetter2025,
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
          title:
            "The Events of 1915 and the Turkish-Armenian Controversy over History: An Overview",
          source: "Republic of Turkey Ministry of Foreign Affairs",
          sourceUrl:
            "https://www.mfa.gov.tr/the-events-of-1915-and-the-turkish-armenian-controversy-over-history_-an-overview.en.mfa",
          component: GovernmentText, // Direct component reference
        },
        {
          id: "erdogan-letter-2025",
          title:
            "The Letter President Erdoğan Sent to Armenian Patriarch (2025)",
          source: "Republic of Turkey Ministry of Foreign Affairs",
          sourceUrl:
            "The Letter President Recep Tayyip Erdoğan Sent to Armenian Patriarch of Turkey, Reverend Sahak Maşalyan (2025)",
          component: ErdoganLetter2025, // Direct component reference
        },

        {
          id: "justin-mccarthy",
          title: "Presentation by Prof. Justin McCarthy (2001)",
          source: "Republic of Turkey Ministry of Foreign Affairs",
          sourceUrl:
            "https://www.mfa.gov.tr/presentation-made-by-prof_-justin-mccarthy-_seminar-on-turkish-armenian-relations-organized-by-the-democratic-principles-association-15-march-2001-_istanbul_.en.mfa",
          component: JustinMcCarthy, // Direct component reference
        },
        {
          id: "anadolu-agency-counter",
          title:
            "Turkish community in Washington holds counter-protest against Armenian demonstrators over 1915 events (2024)",
          source: "by Diyar Güldoğan of Anadolu Agency (April 25, 2024)",
          sourceUrl:
            "https://www.aa.com.tr/en/turkiye/turkish-community-in-washington-holds-counter-protest-against-armenian-demonstrators-over-1915-events/3201645",
          component: AnadoluAgencyCounter,
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
      this.activeStance = "all"; // Reset to show all comments instead of defaulting to explicit denial
    },

    // handleMouseLeave() {
    //   // Only reset if not locked
    //   if (!this.isLocked) {
    //     this.showAllComments();
    //   }
    // },

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
.document-title {
  font-size: 20px;
  margin: 0;
  text-align: left;
  font-weight: 500;
  top: 0;
  background-color: rgb(255, 255, 255);
}
.document-title h3 {
  font-size: 20px;
  /* font-weight: 500; */
  margin: 0;
  top: 0;
  z-index: 5;
  width: 100;
  text-align: left;
  font-family: "Georgia", serif;
  line-height: 1.4;
}
.document-title h3,
.social-media-comments h3.social-media-side-title {
  font-size: 20px;
  margin-top: 10;
  margin-bottom: 10px;
  position: sticky;
  padding: 8px 0;
  text-align: left;
  font-family: "Georgia", serif;
  line-height: 1.4;
  height: 35px; /* Fixed height to ensure alignment */
  align-items: center;
}

/* Add spacing for the source */
.document-title > div {
  margin-top: 30px;
  margin-bottom: 15px; /* Add more space below the source */
}
.document-link {
  font-size: 0.8rem;
  color: #666;
  margin-top: 10px;
  text-decoration: none;
  font-family: "Georgia", serif;

  /* font-family: "Times New Roman", Times, serif; */
}

.document-link:hover {
  text-decoration: underline;
}
.social-media-comments h3,
.document-header h3 {
  margin: 10;
  padding: 10px;
  font-size: 20px;
  color: #000000;
  text-align: center;
  /* font-family: "Vollkorn", serif; */
}

.content-container {
  display: flex;
  width: 100%;
  height: calc(100vh - 200px);
  margin: 0 0 40px 0;
  padding: 0;
  gap: 2rem;
  background-color: white;
  box-sizing: border-box;
  min-height: 80vh; /* Ensure there's enough height for scrolling */
}
.government-text-container .document-header h3 {
  color: black;
}
.document-header {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 15px;
  align-items: center;
  color: black;
  margin-bottom: 8px; /* Reduced from 15px */
  padding-bottom: 5px; /* Reduced from 10px */
  width: 100%; /* Ensure full width */
  text-align: center; /* Center text */
  /* border-bottom: black 1px solid; */ /*for divide between headers and bottom text*/
}

.document-header h3 {
  font-size: 14px;
  color: #717171;
  margin: 0;
  padding: 20px;
  flex-shrink: 0;
}

.document-title-select {
  flex-grow: 1;
  font-size: 20px;
  /* font-family: "Vollkorn", serif; */
  font-family: "Georgia", serif;
  color: #333;
  text-align: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0 30px 0 0; /* Increased right padding for arrow */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  white-space: normal; /* Allow text wrapping */
  min-height: 50px; /* Ensure height for wrapped text */
}

.document-title-select:focus {
  outline: none;
}
.text-visualizer {
  background-color: white;
  color: #111111;
  padding: 40px 80px 60px 80px;
  width: 100%;
  box-sizing: border-box;
  height: 100vh;
  overflow: hidden;
}

.header {
  margin-bottom: 20px;
}

.title h3 {
  font-size: 25px;
  font-weight: bold;
  padding: 20px;
  margin-top: 40px;
  font-family: "General Sans", sans-serif;
  color: #333;
  margin-bottom: 0px;
  text-align: center;
  display: flex;
  flex-direction: column; /* Change to column layout */
  align-items: center; /* Center items */
  width: 100%; /* Ensure full width */
}

.sections {
  display: flex;
  /* border-top: 1px solid rgba(0, 0, 0, 0.471); */
  padding-top: 10px;
  padding-bottom: 10px;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.471); */
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

.government-text-container {
  width: 55%;
  box-sizing: border-box;
  overflow: hidden;
  padding-bottom: 30px; /* Add padding at the bottom */
  max-height: 80vh; /* Set a maximum height to ensure scrolling */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
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
  padding-bottom: 30px; /* Add padding at the bottom */
  max-height: 80vh; /* Set a maximum height to ensure scrolling */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
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
  display: none;
}

.instruction-message {
  color: #666;
  font-size: 14px;
  padding: 10px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  border-left: 1px solid #ddd;
  background-color: #f9f9f9e7;
  margin: 0px 2px 0px 10px;
}

/* Ensure body and app container are also full width */
/* :root,
body,
/* #app {
  margin: 0;
  padding: 0;
  width: 10;
  background-color: white;
} */
.document-title-select {
  font-family: "Georgia", serif;
  color: #333;
  width: 100%;
  text-align: left;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  cursor: pointer;
  padding: 10px 30px 10px 0; /* Added right padding for arrow */
  margin-bottom: 8px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.select-wrapper {
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: visible;
}

.document-title-select:focus {
  outline: none;
  border-bottom-color: rgba(0, 0, 0, 0.3);
}

.document-title-select:hover {
  border-bottom-color: rgba(0, 0, 0, 0.3);
}

.document-title-select:focus {
  outline: none;
  border-bottom-color: rgba(0, 0, 0, 0.5);
}

.document-title-select option {
  font-family: "Vollkorn", serif;
  font-size: 16px;
  white-space: normal;
  padding: 10px;
}

.social-media-comments h3 span.comment-count {
  font-size: 0.9em;
  color: #000000;
  font-weight: normal;
  margin-left: 4px;
}
.comments-header {
  font-size: 0.9em;
  color: #4d4d4d;
  font-weight: normal;
  margin-left: 0px;
}
.social-media-comments h3.social-media-side-title {
  font-family: "Roboto", sans-serif;
  margin-left: 9px;
}

/* Most specific selector to override all others */
.government-text-container .document-header .document-title-select {
  font-size: 20px;
  font-family: "Vollkorn", serif;
  color: #333;
  width: 100%;
  text-align: left;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  cursor: pointer;
  padding: 10px 40px 10px 10px;
  margin-bottom: 8px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  white-space: normal;
  min-height: auto;
  line-height: 1.4;
}

.select-wrapper {
  position: relative;
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
  overflow: hidden;
}

.select-arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #1e1e1e;
  transition: transform 0.2s ease;
}

/* Remove any conflicting styles */
.document-title-select {
  background: none;
}

/* .source-note {
  margin-top: 4px;
  font-size: 0.85em;
  color: #666;
} */
/* Ensure the last items in each container have margin to create space */
#comments-container .comment-card:last-child,
.government-text-container > div:last-child {
  margin-bottom: 30px;
}

.document-title h3 {
  font-size: 20px;
  margin: 0;
  position: sticky;
  text-align: left;
  font-family: "Georgia", serif;
  line-height: 1.4;
  white-space: normal; /* Allow text to wrap */
  overflow: visible; /* Show all content */
  min-height: auto; /* Adjust height automatically */
  padding: 10px 0;
}

.document-title {
  width: 100%;
  margin-bottom: 15px;
  position: sticky;
}
</style>
