<template>
  <div class="archive">
    <div class="main-content">
      <!-- Left sidebar with filters -->
      <div class="filters-column">
        <div class="filter-section">
          <h2>Sort By</h2>
          <!-- Convert to dropdown -->
          <div class="sort-dropdown">
            <button
              class="sort-button"
              @click="showSortDropdown = !showSortDropdown"
            >
              {{ getSortLabel() }}
              <span class="arrow">▼</span>
            </button>

            <!-- Dropdown menu -->
            <div v-if="showSortDropdown" class="sort-dropdown-menu">
              <button
                v-for="option in sortOptions"
                :key="option.value"
                class="sort-option"
                :class="{ active: sortBy === option.value }"
                @click="setSortBy(option.value)"
              >
                {{ option.label }}
              </button>
            </div>
          </div>
        </div>

        <div class="filter-section">
          <h2>Filters</h2>
          <div class="tag-buttons">
            <button
              v-for="(color, stanceKey) in stanceColors"
              :key="stanceKey"
              class="tag-button"
              :class="{
                active: selectedTags.includes(
                  stanceKey.toLowerCase().replace(/_/g, '-')
                ),
              }"
              :style="{
                backgroundColor: color,
                color: getTextColor(color),
              }"
              @click="toggleTag(stanceKey.toLowerCase().replace(/_/g, '-'))"
            >
              {{ stanceKey.replace(/_/g, " ") }}
            </button>
          </div>
        </div>
      </div>

      <!-- Right column with comments -->
      <div class="comments-column">
        <div v-if="isLoading" class="loading">
          <div class="loading-text">Loading comments...</div>
        </div>
        <div class="comments-grid">
          <div
            v-for="comment in filteredComments"
            :key="comment.id"
            class="comment-item"
            :style="{
              minHeight: `${Math.max(200, comment.emotionalStrength * 2)}px`,
            }"
          >
            <div class="comment-header">
              <div class="comment-author">{{ comment.author }}</div>
              <div class="comment-date">{{ formatDate(comment.date) }}</div>
            </div>
            <div class="comment-content">
              {{ comment.content }}
            </div>
            <div class="comment-footer">
              <div class="comment-tags">
                <span
                  v-for="tag in comment.tags"
                  :key="tag"
                  class="comment-tag"
                  :style="{
                    backgroundColor: getTagColor(tag),
                    color: getTextColorForTag(tag),
                    borderColor: getTagColor(tag),
                  }"
                >
                  {{ tag.replace(/-/g, " ") }}
                </span>
              </div>
              <div class="comment-meta">
                <span>Emotion/Toxicity?: {{ comment.emotionalStrength }}%</span>
                <span class="video-source-text">
                  Video Source:
                  <a
                    v-if="comment.videoUrl"
                    :href="comment.videoUrl"
                    target="_blank"
                    rel="noopener"
                    class="video-link"
                  >
                    {{ comment.videoSource || "YouTube Video" }}
                  </a>
                  <span v-else>{{ comment.videoSource || "Unknown" }}</span>
                </span>
                <span> Likes: {{ comment.likes }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Papa from "papaparse";
export default {
  name: "Archive",
  data() {
    return {
      comments: [],
      selectedTags: [],
      sortBy: "date",
      showSortDropdown: false,
      availableTags: [],
      isLoading: true,
      stanceColors: {
        Historical_Affirmation: "#4CAF50",
        Personal_Testimony: "#7A485D",
        Explicit_Denial: "#E53734",
        Minimization_Reframing: "#658B88",
        Justification_Narrative: "#FAFF6B",
        Contemporary_Comparison: "#2E4D46",
        Procedural_Deflection_Evidence_Archives: "#FBA423",
        Competitive_Victimhood_Historical_Inversion: "#979C63",
        Sympathy_Memorial_Commemorative: "#40414A",
        Apology: "#2738EC",
        Discussion_About_Denial: "#841A26",
        Reconciliation_Discourse: "#005477",
      },
      sortOptions: [
        { value: "date", label: "DATE" },
        { value: "emotional", label: "EMOTIONAL STRENGTH" },
        { value: "likes", label: "LIKE COUNT" },
        { value: "random", label: "RANDOM" },
      ],
    };
  },

  computed: {
    filteredComments() {
      console.log("Computing filtered comments");
      console.log("Total comments:", this.comments?.length || 0);

      let result = this.comments || [];

      // Apply tag filters if any selected
      if (this.selectedTags.length > 0) {
        result = result.filter((comment) => {
          return comment.tags.some((tag) => this.selectedTags.includes(tag));
        });
      }

      // Apply sorting
      result = [...result].sort((a, b) => {
        if (this.sortBy === "date") {
          return new Date(b.date) - new Date(a.date);
        } else if (this.sortBy === "emotional") {
          return b.emotionalStrength - a.emotionalStrength;
        } else if (this.sortBy === "likes") {
          return b.likes - a.likes;
        } else {
          return 0; // Random - no sorting
        }
      });

      console.log("Filtered comments:", result.length);
      return result;
    },
  },

  methods: {
    // Fix getTagColor to properly convert from kebab-case to Snake_Case
    getTagColor(tag) {
      // Convert kebab-case (like "explicit-denial") to Snake_Case (like "Explicit_Denial")
      const stanceKey = tag
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("_");

      return this.stanceColors[stanceKey] || "#cccccc"; // Default to gray if not found
    },

    // Add this if not already present
    getTextColorForTag(tag) {
      const bgColor = this.getTagColor(tag);
      return this.getTextColor(bgColor);
    },

    toggleTag(tag) {
      if (this.selectedTags.includes(tag)) {
        this.selectedTags = this.selectedTags.filter((t) => t !== tag);
      } else {
        this.selectedTags.push(tag);
      }
    },

    setSortBy(value) {
      this.sortBy = value;
      this.showSortDropdown = false;
    },

    loadCommentsFromCSV() {
      console.log("Loading CSV data...");
      fetch("/assets/Classified_Comments.csv")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }
          return response.text();
        })
        .then((csvData) => {
          console.log("CSV data fetched, parsing...");
          Papa.parse(csvData, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              console.log(
                "CSV parsed successfully:",
                results.data.length,
                "rows"
              );

              const processedComments = results.data
                .filter(
                  (row) => row.cleaned_text && row.cleaned_text.trim() !== ""
                )
                .map((row, index) => ({
                  id: row.comment_id || `comment-${index}`,
                  author: row.author || "Anonymous",
                  date: row.publish_date || new Date().toISOString(),
                  content: row.cleaned_text || "",
                  tags: [
                    row.predicted_stance?.toLowerCase().replace(/_/g, "-"),
                  ].filter(Boolean),
                  emotionalStrength: Math.floor(Math.random() * 100),
                  likes: parseInt(row.like_count || 0),
                  videoSource: row.video_title || "YouTube Video",
                  videoUrl: row.video_id
                    ? `https://www.youtube.com/watch?v=${row.video_id}`
                    : null,
                }));

              this.comments = processedComments;
              this.generateAvailableTags();
              this.isLoading = false;

              console.log("Processed comments:", this.comments.length);
              console.log("First few comments:", this.comments.slice(0, 3));
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
    },
    formatDate(dateString) {
      if (!dateString) return "Unknown date";
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString();
      } catch (e) {
        return dateString;
      }
    },

    generateAvailableTags() {
      const stanceSet = new Set();
      this.comments.forEach((comment) => {
        if (comment.tags && comment.tags.length > 0 && comment.tags[0]) {
          stanceSet.add(comment.tags[0]);
        }
      });
      this.availableTags = Array.from(stanceSet);
      console.log("Available tags:", this.availableTags);
    },

    getTextColor(hexColor) {
      // Convert hex to RGB
      let r = 0,
        g = 0,
        b = 0;

      // 3 digits
      if (hexColor.length === 4) {
        r = parseInt(hexColor[1] + hexColor[1], 16);
        g = parseInt(hexColor[2] + hexColor[2], 16);
        b = parseInt(hexColor[3] + hexColor[3], 16);
      }
      // 6 digits
      else if (hexColor.length === 7) {
        r = parseInt(hexColor.substring(1, 3), 16);
        g = parseInt(hexColor.substring(3, 5), 16);
        b = parseInt(hexColor.substring(5, 7), 16);
      }

      // Calculate brightness
      const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

      // Return black for bright colors, white for dark ones
      return brightness > 0.5 ? "black" : "white";
    },

    // Add this method
    getSortLabel() {
      const option = this.sortOptions.find((opt) => opt.value === this.sortBy);
      return option ? option.label : "SORT BY";
    },
  },

  mounted() {
    console.log("Archive component mounted");
    this.loadCommentsFromCSV();
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}

.loading-text {
  font-family: "Space Mono", monospace;
  font-size: 18px;
  color: #000;
}

.archive {
  padding-top: 90px; /* Add space for navbar */
  max-width: 100%;
  width: 100%;
  margin: 20px;
  margin: 0 auto;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  background: white;
  color: black;
  min-height: 100vh;
}

/* Header */
.header {
  background-color: black;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.05em;
}

.header nav {
  display: flex;
  gap: 1.5rem;
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Main layout */
.main-content {
  display: flex;
  border-top: 1px solid black;
  margin-top: 20px;
  max-width: 100%;
  padding: 0 20px;
  width: 100%;
}

/* Left sidebar */
.filters-column {
  width: 25%;
  min-width: 200px;
  padding-right: 20px;
  border-right: 1px solid #e5e5e5;
  margin-right: 20px;
}

.filter-section {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e5e5;
  display: block; /* Always visible */
  color: black;
}

.filter-section h2 {
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

button {
  cursor: pointer;
  font-family: "Space Mono", monospace;
  color: black;
}

button:hover {
  opacity: 0.7;
}

/* Sort dropdown */
.sort-dropdown {
  position: relative;
  width: 100%;
}

.sort-button {
  width: 100%;
  background: white;
  border: 1px solid black;
  padding: 0.5rem;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sort-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sort-option {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem;
  background: none;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  cursor: pointer;
}

.sort-option.active {
  background-color: #f0f0f0;
  font-weight: 500;
}

/* Tags */
.tag-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
  color: black;
}

.tag-button {
  background: white;
  border: 1px solid black;
  padding: 0.5rem 0.75rem;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: black;
}
.tag-button:hover {
  opacity: 0.7;
}
.tag-button.active {
  background: black;
  color: white;
}

/* Comments section */
.comments-column {
  flex: 1;
  padding: 1rem;
  width: 75%; /* Use percentage instead of 7cqi */
  padding-left: 20px;
  flex-grow: 1; /* Allow it to grow to fill available space */
}

.comments-grid {
  display: flex;
  grid-template-columns: repeat(1, 3fr); /* Keep 2 columns */
  gap: 20px; /* Consistent gap between cards */
  width: 100%;
  flex-wrap: wrap;
  padding: 20px;
}

.comment-item {
  background: white;
  padding: 1.5rem;
  position: relative;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  min-height: 200px;
  max-width: 100%; /* Change from 60% to 100% to fill grid cell */
  width: 100%; /* Ensure full width within the grid cell */
  box-sizing: border-box; /* Include padding in width calculation */
}

/* Responsive design */
/* @media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .filters-column,
  .comments-column {
    width: 100%;
  }

  .filters-column {
    width: 100%;
    padding-right: 0;
    border-right: none;
    border-bottom: 1px solid #e5e5e5;
    margin-right: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
  }

  .comments-grid {
    grid-template-columns: 1fr;
  }

  .archive {
    padding-top: 60px;
  } */
/* } */

/* Ensure proper spacing */
.filter-section {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e5e5;
  color: black;
}

.tag-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
  color: black;
}

.tag-button {
  padding: 0.5rem;
  background: none;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  opacity: 0.4;
  transition: opacity 0.2s ease;
}

.tag-button:hover {
  opacity: 0.7 !important;
}

.tag-button.active {
  opacity: 1 !important; /* Full opacity when active */
  font-weight: 500;
}

/* Sort dropdown styling */
.sort-dropdown {
  position: relative;
  width: 100%;
}

.sort-button {
  width: 100%;
  background: white;
  border: 1px solid black;
  padding: 0.5rem;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.sort-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #e5e5e5;
  border-top: none;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.sort-option {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem;
  background: none;
  border: none;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
}

.sort-option:last-child {
  border-bottom: none;
}

.sort-option.active {
  background-color: #f0f0f0;
  font-weight: 500;
}

.arrow {
  font-size: 0.8rem;
}

/* Add styling for video links */
.video-link {
  color: #0066cc;
  font-size: 80%;
  text-decoration: underline;
  transition: color 0.2s;
}

.video-link:hover {
  color: #004499;
}
.video-source-text {
  font-size: 80%;
  top: 20px;
}
</style>
