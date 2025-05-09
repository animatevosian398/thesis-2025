<template>
  <div class="text-visualizer">
    <div class="header">
      <div class="document-header">
        <div class="title">
          <!-- <h3>Select a Document:</h3> -->
          <div class="select-wrapper">
            <label for="document-select" class="select-label"
              >Select Document:</label
            >
            <select
              id="document-select"
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
        <div class="section-label government">GOVERNMENT DENIALISM</div>

        <div class="section-label social-media">ONLINE DISCOURSE</div>
      </div>
    </div>

    <div class="content-container" v-if="activeDocument">
      <!-- Government text section -->
      <div class="government-text-container">
        <div class="header-and-source">
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
        </div>
        <!-- Just keep the component -->
        <component
          :is="activeDocument.component"
          :documentData="activeDocument"
          @showRelatedComments="showRelatedComments"
          @showAllComments="showAllComments"
        />
        <!-- Add instructlon message -->
      </div>

      <!-- Comments section -->
      <div class="social-media-comments">
        <h3 class="social-media-side-title">
          Echoing Statements from Users on YouTube
          <!-- Add sort button here -->
        </h3>

        <!-- Show instructions when no stance is selected -->
        <div v-if="showInitialInstructions" class="instruction-message">
          Click on highlighted sections of the government text to view comments
          that share and amplify the sentiment.
        </div>

        <!-- Show this when stance is selected and there are comments to display -->
        <div
          v-else-if="activeStance && visibleComments.length > 0"
          class="comments-header active-stance-header"
        >
          <span
            class="stance-indicator"
            :class="getStanceClass(activeStance)"
          ></span>
          <span class="stance-title">{{
            formatStanceForDisplay(activeStance)
          }}</span>
          <span class="comment-count">
            : {{ visibleComments.length }} comments
            <!-- Add sort dropdown inline with comment count - only visible when comments are shown -->
            <div class="sort-container">
              <label for="sort-select" class="sort-label">Sort by:</label>
              <select id="sort-select" v-model="sortOrder" class="sort-select">
                <option value="likes">Most Liked</option>
                <option value="latest">Latest</option>
                <option value="alphabetical">A to Z</option>
              </select>
            </div>
          </span>
          <button class="clear-stance" @click="showAllComments">×</button>
        </div>

        <!-- Show "No comments found" message when stance is selected but no comments match -->
        <div
          v-else-if="activeStance && visibleComments.length === 0"
          class="no-comments-message"
        >
          No comments found for this stance.
          <button class="clear-stance" @click="showAllComments">
            Show all
          </button>
        </div>

        <div id="comments-container">
          <!-- Using computed property to filter comments by stance -->
          <div
            v-for="(comment, index) in visibleComments"
            :key="`comment-${index}-${sortOrder}`"
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

            <!-- <div
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
            </div> -->
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
import { markRaw } from "vue";
import { stanceColors } from "@/config/colors.js";

import Papa from "papaparse";
import GovernmentText from "../components/government-documents/GovernmentText.vue";
import ErdoganLetter2025 from "../components/government-documents/ErdoganLetter2025.vue";
import JustinMcCarthy from "../components/government-documents/JustinMcCarthy.vue";
import stancePhrases from "../assets/stancePhrases.json";
import AnadoluAgencyCounter from "../components/government-documents/AnadoluAgencyCounter.vue";
import Presentation from "../components/government-documents/Presentation.vue";
import MessageTranslation from "../components/government-documents/MessageTranslation.vue";
// Add this object near the top of your script section, after your imports
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
      // Add this property to control initial view
      showInitialInstructions: true,

      // Your existing properties
      sortOrder: "latest",
      activeStance: null, // Changed from 'all' to null
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
          component: markRaw(GovernmentText), // Direct component reference
        },
        {
          id: "erdogan-letter-2025",
          title: "The Letter President Erdoğan Sent to Armenian Patriarch ",
          source: "Republic of Turkey Ministry of Foreign Affairs (2025)",
          sourceUrl:
            "The Letter President Recep Tayyip Erdoğan Sent to Armenian Patriarch of Turkey, Reverend Sahak Maşalyan (2025)",
          component: markRaw(ErdoganLetter2025), // Direct component reference
        },

        {
          id: "justin-mccarthy",
          title: "Presentation by Prof. Justin McCarthy ",
          source: "Republic of Turkey Ministry of Foreign Affairs",
          sourceUrl:
            "https://www.mfa.gov.tr/presentation-made-by-prof_-justin-mccarthy-_seminar-on-turkish-armenian-relations-organized-by-the-democratic-principles-association-15-march-2001-_istanbul_.en.mfa",
          component: markRaw(JustinMcCarthy), // Direct component reference
        },
        {
          id: "anadolu-agency-counter",
          title:
            "Turkish community in Washington holds counter-protest against Armenian demonstrators over 1915 events ",
          source: "by Diyar Güldoğan of Anadolu Agency (April 25, 2024)",
          sourceUrl:
            "https://www.aa.com.tr/en/turkiye/turkish-community-in-washington-holds-counter-protest-against-armenian-demonstrators-over-1915-events/3201645",
          component: markRaw(AnadoluAgencyCounter),
        },
        {
          id: "presentation",
          title:
            " Presentation by Ambassador Gündüz Aktan at the House Committee on International Relations ",
          source:
            "Republic of Turkey Ministry of Foreign Affairs, House Committee on International Relations, Subcommittee on International Operations and Human Rights (September 14, 2000) ",
          sourceURL:
            "https://www.mfa.gov.tr/presentation-by-ambassador-gunduz-aktan-at-the-house-committee-on-international-relations-on-september-14_-2000_.en.mfa",
          component: markRaw(Presentation),
        },
        {
          id: "message-translation",
          title:
            "The unofficial translation of the message of H.E. President Recep Tayyip Erdoğan, the then Prime Minister of the Republic of Turkey, on the events of 1915",
          source: "Turkish Ministry of Foreign Affairs (April 23, 2014)",
          sourceURL:
            "https://www.mfa.gov.tr/turkish-prime-minister-mr_-recep-tayyip-erdo%C4%9Fan-published-a-message-on-the-events-of-1915_-23-april-2014.en.mfa",
          component: markRaw(MessageTranslation),
        },
      ],
      activeDocument: null, // Track which document is currently selected
      stanceColors,
    };
  },

  computed: {
    visibleComments() {
      // If showing initial instructions, return empty array
      if (this.showInitialInstructions) {
        return [];
      }

      // Rest of your existing filtering logic
      let comments = [];
      if (this.activeStance === "all") {
        comments = [...this.commentsData];
      } else if (Array.isArray(this.activeStance)) {
        comments = this.commentsData.filter((comment) =>
          this.activeStance.includes(comment.stance)
        );
      } else if (this.activeStance) {
        comments = this.commentsData.filter(
          (comment) => comment.stance === this.activeStance
        );
      }

      // Sorting logic for comments
      if (this.sortOrder === "likes") {
        return comments.sort((a, b) => b.likes - a.likes);
      } else if (this.sortOrder === "alphabetical") {
        return comments.sort((a, b) => {
          const textA = a.text.toLowerCase();
          const textB = b.text.toLowerCase();
          return textA.localeCompare(textB);
        });
      } else {
        // Default date sorting
        return comments.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });
      }
    },
  },
  methods: {
    // Add this method
    toggleSort() {
      this.sortOrder = this.sortOrder === "latest" ? "likes" : "latest";
    },

    // Your existing methods
    // Method to handle document selection change
    handleDocumentChange() {
      // Reset stance when switching documents
      this.activeStance = null; // Changed from "all" to null

      // Show instructions again when switching documents
      this.showInitialInstructions = true;

      // Scroll the comments container to the top
      this.$nextTick(() => {
        const commentsContainer = document.querySelector(
          ".social-media-comments"
        );
        if (commentsContainer) {
          commentsContainer.scrollTop = 0;
        }
      });
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
      this.showInitialInstructions = false; // Hide instructions
      this.activeStance = stance;

      // Add animation for comments container
      const commentsContainer = document.querySelector(
        ".social-media-comments"
      );
      if (commentsContainer) {
        // First add a subtle highlight effect
        commentsContainer.classList.add("flash-highlight");

        // Then scroll to top with animation
        commentsContainer.scrollTop = 0;

        // Remove the highlight class after animation completes
        setTimeout(() => {
          commentsContainer.classList.remove("flash-highlight");
        }, 800);
      }

      // Draw connecting lines after DOM update
      this.$nextTick(() => {
        this.drawConnectionLines();
      });
    },

    // Add this new method
    drawConnectionLines() {
      // Clear any existing lines
      const linesContainer = this.$refs.linesContainer;
      if (!linesContainer) return;

      linesContainer.innerHTML = "";

      // Get the highlighted elements
      const highlights = document.querySelectorAll(
        ".government-text-container .highlight"
      );
      if (!highlights.length) return;

      // Get the comments header
      const commentsHeader = document.querySelector(".active-stance-header");
      if (!commentsHeader) return;

      // Create SVG element
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.setAttribute("class", "connection-svg");

      // For each highlight, create a line
      highlights.forEach((highlight, index) => {
        const highlightRect = highlight.getBoundingClientRect();
        const commentsRect = commentsHeader.getBoundingClientRect();
        const containerRect = linesContainer.getBoundingClientRect();

        // Calculate the positions relative to the container
        const x1 = highlightRect.right - containerRect.left;
        const y1 =
          highlightRect.top + highlightRect.height / 2 - containerRect.top;
        const x2 = commentsRect.left - containerRect.left;
        const y2 =
          commentsRect.top + commentsRect.height / 2 - containerRect.top;

        // Create path for curved line
        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );

        // Create a curved path
        const controlPointX = x1 + (x2 - x1) / 2;
        const d = `M ${x1} ${y1} C ${controlPointX} ${y1}, ${controlPointX} ${y2}, ${x2} ${y2}`;

        path.setAttribute("d", d);
        path.setAttribute("class", "connection-line");
        path.setAttribute("fill", "none");

        // Add animation delay based on index
        path.style.animationDelay = `${index * 0.2}s`;

        svg.appendChild(path);
      });

      linesContainer.appendChild(svg);
    },

    showAllComments() {
      console.log("Showing all comments");
      this.showInitialInstructions = true; // Show instructions again
      this.activeStance = null; // Reset stance
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

    // Then update your getStanceLabel method
    getStanceLabel(stance) {
      if (!stance) return "";
      return stanceDisplayNames[stance] || stance.replace(/_/g, " ");
    },
    // handleMouseLeave() {
    //   console.log("Mouse left component");
    // },
  },

  mounted() {
    const defaultDoc = this.documents.find((doc) => doc.id === "turkey-mfa");

    console.log("GovVsCommentView component mounted");

    // Set the first document as active by default
    this.activeDocument = defaultDoc;
    console.log("Active document:", this.activeDocument?.title);
    this.activeStance = null; // Start with no active stance
    this.showInitialInstructions = true; // Show instructions initially

    // Load the CSV data
    this.loadCSV();
    console.log("Number of comments loaded:", this.commentsData.length);
  },
};
</script>

<style scoped>
.document-title h3,
.social-media-comments h3.social-media-side-title {
  font-size: 20px;
  margin: 0 0 10px 0;
  position: sticky;
  padding: 22px 0;
  text-align: center;
  font-family: "Roboto", sans-serif; /* Change from Georgia to Roboto */
  line-height: 1.2;
  height: auto; /* Remove fixed height */
  min-height: 35px; /* Min height instead of fixed */
  align-items: center;
  background-color: white;
  z-index: 100;
  top: 0;
}

/* Add spacing for the source */
.document-title > div {
  position: relative;
  top: 0px; /* Position below the title */
  background-color: white;
  z-index: 95; /* Lower than title but higher than content */
  margin-top: 0;
  padding: 0px 0 10px 0;
  text-align: center;
}
.document-link {
  font-size: 0.9rem;
  margin-top: 0px;
  text-decoration: none;
  font-family: "Georgia", serif;
  display: block;
  position: relative;
  z-index: 90;
  color: black;

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
  text-align: left;
  /* font-family: "Vollkorn", serif; */
}

.content-container {
  display: flex;
  width: 100%;
  height: calc(100vh - 220px); /* Adjust height calculation */
  margin: 0 0 0px 0;
  padding: 0;
  gap: 2rem;
  background-color: white;
  box-sizing: border-box;
  min-height: 500px; /* Set a minimum height */
}
.government-text-container .document-header h3 {
  color: black;
}
.document-header {
  display: flex;
  /* font-family: "Georgia", serif; */
  font-family: "Times New Roman", Times, serif;
  flex-direction: column;
  align-items: baseline;
  align-items: center;
  color: black;
  line-height: 1;
  margin-bottom: 12px; /* Reduced from 15px */
  padding-bottom: 15px; /* Reduced from 10px */
  width: 100%; /* Ensure full width */
  text-align: left; /* Center text */
  /* border-bottom: black 1px solid; */ /*for divide between headers and bottom text*/
}

.document-title-select {
  flex-grow: 1;
  font-size: 24px;
  /* font-family: "Vollkorn", serif; */
  font-family: "Georgia", serif;
  color: #000000;
  text-align: left;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0 30px 0 0; /* Increased right padding for arrow */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  text-align: center;
  white-space: normal; /* Allow text wrapping */
  min-height: 50px; /* Ensure height for wrapped text */
}

.document-title-select:focus {
  outline: none;
}
.text-visualizer {
  background-color: white;
  color: #000000;
  padding: 0px 80px 60px 70px;
  width: 100%;
  box-sizing: border-box;
  height: 100vh;
  overflow: hidden;
}

.header {
  margin-bottom: 0px;
}

.title h3 {
  font-size: 25px;
  font-weight: bold;
  padding: 0px;
  margin-top: 0px;
  font-family: "General Sans", sans-serif;
  color: #333;
  margin-bottom: 0px;
  text-align: left;
  display: flex;
  flex-direction: column; /* Change to column layout */
  align-items: center; /* Center items */
  width: 100%; /* Ensure full width */
}

.sections {
  display: flex;
  /* border-top: 1px solid rgba(0, 0, 0, 0.471); */
  padding: 10px 0;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.471); */
  justify-content: space-between;
  width: 100%;
  margin-top: 50px;
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
  overflow-y: auto;
  overflow-x: hidden;
  line-height: 1;
  padding-bottom: 30px;
  max-height: 80vh;
  padding-right: 20px; /* Increased from 10px to compensate for hidden scrollbar */

  /* Hide scrollbar but maintain functionality */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* Hide WebKit/Blink scrollbar */
.government-text-container::-webkit-scrollbar {
  display: none;
  width: 0;
  background: transparent;
}

/* Remove these styles that were adding a visible scrollbar */
.government-text-container::-webkit-scrollbar-track,
.government-text-container::-webkit-scrollbar-thumb,
.government-text-container::-webkit-scrollbar-thumb:hover {
  display: none;
  background: transparent;
}

.social-media-comments {
  width: 45%;
  padding-left: 20px;
  border-left: 1px solid #ddd;
  text-align: left;
  overflow-y: auto; /* Keep auto scroll */
  overflow-x: hidden; /* Hide horizontal scrollbar */
  height: 100%;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  max-height: 80vh;

  /* Remove these lines that hide scrollbars */
  /* scrollbar-width: none; */
  /* -ms-overflow-style: none; */

  /* Add custom scrollbar styling */
  /* For Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #dddddd;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #cccccc;
  }

  /* For Firefox */
  scrollbar-width: thin;
  scrollbar-color: #dddddd #f5f5f5;
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
  padding: 12px;
  padding-top: 20px;
  font-size: 13px;
  line-height: 1.2;
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
  padding-top: 8px;
}

.video-source {
  font-size: 10px;
  margin-top: 2px;
}

.government-text-container {
  width: 55%;
  overflow-y: auto;
  box-sizing: border-box;
  line-height: 1.2;
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
  font-family: "Roboto", sans-serif !important; /* Add !important to override */
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
  text-align: center;
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
  border-radius: 2px;
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
  display: inline;
}

/* Stance colors */
.stance-explicit-denial {
  border-left-color: #e53734; /* from colors.js */
}
.stance-explicit-denial .stance-label {
  background-color: #e53734;
}

.stance-justification-narrative {
  border-left-color: #c6b987; /* from colors.js */
}
.stance-justification-narrative .stance-label {
  background-color: #c6b987;
}

.stance-competitive-victimhood-historical-inversion {
  border-left-color: #979c63; /* from colors.js */
}
.stance-competitive-victimhood-historical-inversion .stance-label {
  background-color: #979c63;
  color: rgb(255, 255, 255);
}

.stance-historical-affirmation {
  border-left-color: #4caf50; /* from colors.js */
}
.stance-historical-affirmation .stance-label {
  background-color: #4caf50;
}

.stance-sympathy-memorial-commemorative {
  border-left-color: #40414a; /* from colors.js */
}
.stance-sympathy-memorial-commemorative .stance-label {
  background-color: #40414a;
}

.stance-minimization-reframing {
  border-left-color: #658b88; /* from colors.js */
}
.stance-minimization-reframing .stance-label {
  background-color: #658b88;
}

.stance-reconciliation-discourse {
  border-left-color: #005477; /* from colors.js */
}
.stance-reconciliation-discourse .stance-label {
  background-color: #005477;
}

.stance-procedural-deflection-evidence-archives,
.stance-procedural-deflection-using-archives-and-evidence {
  border-left-color: #fba423; /* from colors.js */
}
.stance-procedural-deflection-evidence-archives .stance-label,
.stance-procedural-deflection-using-archives-and-evidence .stance-label {
  background-color: #fba423;
}

/* Add missing stance colors from colors.js */
.stance-personal-testimony {
  border-left-color: #7a485d;
}
.stance-personal-testimony .stance-label {
  background-color: #7a485d;
  color: white;
}

.stance-contemporary-comparison {
  border-left-color: #2e4d46;
}
.stance-contemporary-comparison .stance-label {
  background-color: #2e4d46;
  color: white;
}

.stance-apology {
  border-left-color: #2738ec;
}
.stance-apology .stance-label {
  background-color: #2738ec;
  color: white;
}

.stance-discussion-about-denial {
  border-left-color: #841a26;
}
.stance-discussion-about-denial .stance-label {
  background-color: #841a26;
  color: white;
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
  font-family: "Times New Roman", Times, serif;
  /* font-family: "Georgia", serif; */
  color: #000000;
  width: 100%;
  text-align: center;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  cursor: pointer;
  padding: 10px 35px 10px 0px;
  margin-bottom: 10px;
  line-height: 1;
  min-height: 50px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
}

.select-wrapper {
  position: relative;
  width: 95%;
  max-width: 800px;
  margin: 0 auto;
  overflow: visible;
  top: 60px;
  min-height: 60px;
  display: flex; /* Add flex display */
  align-items: center; /* Center items vertically */
}

.select-label {
  font-family: "Times New Roman", Times, serif;
  font-size: 20px;
  color: #000000;
  font-weight: 500;
  margin-right: 10px;
  white-space: nowrap;
}

.document-title-select {
  flex: 1; /* Allow select to take up remaining space */
  font-family: "Times New Roman", Times, serif;
  color: #000000;
  text-align: left; /* Change from center to left align */
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  cursor: pointer;
  padding: 10px 35px 10px 10px; /* Adjust padding for better text alignment */
  margin-bottom: 10px;
  line-height: 1;
  min-height: 50px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
}

/* Adjust arrow position for the new layout */
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
  white-space: normal; /* Allow text to wrap */
}

/* Ensure the last items in each container have margin to create space */
#comments-container .comment-card:last-child,
.government-text-container > div:last-child {
  margin-bottom: 30px;
}

.document-title h3 {
  font-size: 20px;
  margin: 0;
  position: sticky;
  text-align: center;
  font-family: "Times New Roman", Times, serif;

  /* font-family: "Georgia", serif; */
  line-height: 1.1;
  white-space: normal; /* Allow text to wrap */
  overflow: visible; /* Show all content */
  min-height: auto; /* Adjust height automatically */
  padding: 0px 0 18px 0; /* Reduced bottom padding */
}

.header-and-source {
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 10;
}
.highlight::before,
.highlight::after {
  content: none !important; /* Prevent any generated content */
}
.highlight {
  background-color: rgba(255, 255, 0, 0.4); /* Highlight color */
  display: inline !important; /* Force inline display */
  padding: 0; /* Remove extra padding */
  border-radius: 0; /* No rounded corners */
  line-height: inherit; /* Match the line height of surrounding text */
  vertical-align: baseline; /* Align with the text baseline */
}

/* Add these styles to your <style> section */
.social-media-side-title {
  display: flex;
  justify-content: center; /* Changed from space-between to center */
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
  padding: 8px 0;
  text-align: center; /* Added text-align center */
  width: 100%; /* Ensure full width */
}

/* Adjust the related styles to maintain the proper layout */
.social-media-comments h3.social-media-side-title {
  display: flex;
  justify-content: center; /* Changed from space-between to center */
  align-items: center;
  padding-right: 15px;
  padding-left: 15px;
  text-align: center; /* Added text-align center */
  font-family: "Roboto", sans-serif !important;
}

/* Replace the sort button styles with these dropdown styles */
.sort-container {
  display: inline-flex;
  align-items: center;
  margin-left: 10px;
  font-size: 11px;
}

.sort-label {
  color: #666;
  margin-right: 4px;
}

.sort-select {
  background: none;
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: 11px;
  color: #666;
  cursor: pointer;
  padding: 2px 15px 2px 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0 top 50%;
  background-size: 8px auto;
}

.sort-select:focus {
  outline: none;
  border-bottom-color: #999;
}
</style>
