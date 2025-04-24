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

    <div class="content-container">
      <!-- Import the GovernmentText component -->
      <div class="government-text-container">
        <GovernmentText
          @showRelatedComments="showRelatedComments"
          @showAllComments="showAllComments"
        />
      </div>

      <div class="social-media-comments">
        <h3>Real Users' Comments and Replies on YouTube</h3>
        <h5>Sorted by highest confidence in classification</h5>

        <div id="comments-container">
          <!-- Using computed property to filter comments by stance -->
          <div
            v-for="(comment, index) in visibleComments"
            :key="'comment-' + index"
            class="comment-card"
            :class="{
              locked: lockedComments.includes(comment.id), // Apply locked class if the comment is locked
              [getStanceClass(comment.stance)]: true,
            }"
            @mouseenter="onMouseEnter(comment.stance)"
            @click="toggleLockComment(comment.index)"
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
            <!-- Add this section for the video source -->
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

            <div class="matched-phrases">
              Matched phrases:
              <span v-for="(phrase, i) in comment.matchedPhrases" :key="i">{{
                phrase
              }}</span>
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
import GovernmentText from "../components/government-documents/GovernmentText.vue";
import stancePhrases from "../assets/stancePhrases.json";

export default {
  name: "GovVsCommentView",
  components: {
    GovernmentText,
  },
  data() {
    return {
      activeStance: "all",
      commentsData: [],
      isLoading: true,
      lockedComments: [],
      stancePhrases: stancePhrases,
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
        // Create a case-insensitive regex for the phrase
        const phraseRegex = new RegExp(
          `\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
          "i"
        );

        if (phraseRegex.test(commentText)) {
          matches.push(phrase);
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
      fetch("/assets/Classified_merged_withoutOther_comments.csv")
        //   fetch("/assets/Test_Real_comments_classified_withURL.csv")
        .then((response) => {
          console.log("Fetch response:", response);
          if (!response.ok) {
            throw new Error(`Fetch failed with status ${response.status}`);
          }
          return response.text();
        })
        .then((csvText) => {
          console.log("Raw CSV text:", csvText.slice(0, 10));
          Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            complete: (results) => {
              console.warn("Parse results:", results);
              console.warn("Number of rows:", results.data.length);
              console.warn("First row:", results.data[0]);

              // Create comments as you were doing before
              const comments = results.data.map((row, index) => {
                const rawDate = row.publish_date;
                const formattedDate = new Date(rawDate).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                );

                return {
                  id: index, // Add an ID for reference
                  username: row.author || "Unknown",
                  stance: row.predicted_stance || "unknown",
                  text: row.cleaned_text || "",
                  likes: row.like_count ?? 0,
                  videoSource: {
                    title: "YouTube Video",
                    url: row.video_url || "#",
                  },
                  date: formattedDate,
                  matchedPhrases: [], // Initialize empty matched phrases array
                };
              });

              // Process the comments to find matching phrases
              this.commentsData = this.processCommentsWithPhrases(comments);

              this.isLoading = false;
            },
            error: (error) => {
              console.error("Papa parse error:", error);
              this.isLoading = false;
            },
          });
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          this.isLoading = false;
        });
    },
    showRelatedComments(stance) {
      console.log("Showing comments for stance:", stance);
      this.activeStance = stance;
    },
    showAllComments() {
      console.log("Showing all comments");
      this.activeStance = "all";
    },
    formatStanceForDisplay(stance) {
      return stance ? stance.replace(/_/g, " ") : "";
    },
    getStanceClass(stance) {
      return stance ? `stance-${stance.replace(/_/g, "-")}` : "";
    },

    getStanceLabel(stance) {
      if (stance === "Procedural_Deflection_Evidence_Archives") {
        return "procedural deflection";
      }

      return stance.replace(/_/g, " ");
    },
    toggleLockComment(commentId) {
      if (this.lockedComments.includes(commentId)) {
        // If the comment is already locked, unlock it
        this.lockedComments = this.lockedComments.filter(
          (id) => id !== commentId
        );
      } else {
        // If the comment is not locked, lock it
        this.lockedComments.push(commentId);
      }
    },
  },
  mounted() {
    console.log("Component mounted");
    this.loadCSV();
  },
};
</script>

<style scoped>
.text-visualizer {
  background-color: white;
  color: #111111;
  font-family: "Helvetica", "Arial", sans-serif;
  padding: 60px;
  /* width: 95%; Adjusted width to account for margins */
  max-width: 1400px; /* Added a max-width for better readability on large screens */
  margin: 0 auto; /* This is the key for horizontal centering */
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
  margin-bottom: 20px;
  justify-content: flex-start;
}

.section-label {
  padding: 5px 15px;
  font-size: 14px;
  font-weight: bold;
  margin-right: 20px;
  color: white;
}

.government {
  background-color: #333;
}

.social-media {
  background-color: #333;
  margin-left: auto;
}

.content-container {
  display: flex;
  height: 700px;
  overflow: auto;
  padding-bottom: 10px;
  box-sizing: border-box;
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
  overflow-x: none;
  height: 100%;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  box-sizing: border-box;
  position: relative;
}

.social-media-comments h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
  text-align: left;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
  padding-bottom: 10px;
  margin-top: 0;
}
.comment-card {
  margin-bottom: 5px;
  padding: 15px;
  border-radius: 1px;
  background-color: #f9f9f9e3;
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
  font-size: 14px;
  color: #333;
  text-align: left;
}

.matched-phrases {
  font-size: 11px;
  color: #777;
  text-align: left;
}

.matched-phrases span {
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

.stance-competitive-victimhood {
  border-left-color: #778b33d8; /* purple */
  color: white;
}
.stance-competitive-victimhood .stance-label {
  background-color: #778b33d8;
  color: black;
}

.stance-historical-affirmation {
  border-left-color: #673ab7; /* purple */
}
.stance-historical-affirmation .stance-label {
  background-color: #673ab7;
}
.stance-historical-inversion {
  border-left-color: #faff6b;
}
.stance-historical-inversion .stance-label {
  background-color: #faff6b;
  color: rgba(0, 0, 0, 0.814);
}

.stance-memory-of-victims {
  border-left-color: #4caf50; /* green */
}
.stance-memory-of-victims .stance-label {
  background-color: #4caf50;
}
.stance-minimization-and-reframing {
  border-left-color: #87b2c2;
}
.stance-minimization-and-reframing .stance-label {
  background-color: #87b2c2;
}

.stance-explicit-denial {
  border-left-color: #d50000;
}
.stance-explicit-denial .stance-label {
  background-color: #d50000;
}

.stance-reconciliation-discourse {
  border-left-color: #527c7995;
}
.stance-reconciliation-discourse .stance-label {
  background-color: #527c7995;
}

.stance-procedural-deflection-using-archives-and-evidence {
  /* border-left-color: #9c27b0;  */
  border-left-color: #5d3a6cd9;
  /* purple */
}
.stance-procedural-deflection-using-archives-and-evidence .stance-label {
  background-color: #5d3a6cd9;
}

/* Instructions style */
.instructions {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
  text-align: left;
}

.video-source {
  font-size: 11px;
  color: grey;
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
  /* background: rgba(0, 0, 0, 0.7); */
  color: rgb(0, 0, 0);
  padding: 10px;
  z-index: 1000;
  font-size: 14px;
}

h5 {
  /* font-size: 80%;
  color: grey; */
  font-size: 0.85em;
  color: #666;
  margin-top: 0.5em;
  text-align: left;
  font-family: "Helvetica", "Arial", sans-serif;

  /* position: sticky;
  top: 40px;
  background-color: white;
  z-index: 9;
  margin-top: 0;
  padding-bottom: 8px;*/
}
.sections {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}

.section-label {
  font-family: "Mulish", sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 9px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: white;
}

.section-label.government {
  background-color: #000000;
}

.section-label.social-media {
  background-color: #000000;
}
</style>
