<template>
  <div class="archive">
    <h1 class="title">
      Archive of Genocide Discourse
      <span class="dates-title"> (2008-2025) </span>
    </h1>

    <div class="main-content">
      <!-- Left sidebar with filters -->
      <div class="filters-column">
        <!-- Sort By section -->
        <div class="filter-section">
          <h2>Sort By</h2>
          <div class="sort-controls">
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

            <!-- Direction toggle button -->
            <button
              class="direction-toggle"
              @click="toggleSortDirection()"
              :title="
                sortDirection === 'asc' ? 'Ascending Order' : 'Descending Order'
              "
            >
              <span v-if="sortDirection === 'asc'">↑</span>
              <span v-else>↓</span>
            </button>
          </div>
        </div>

        <!-- Year section with equal spacing -->
        <div class="filter-section">
          <h2>Year</h2>
          <div class="sort-controls">
            <div class="sort-dropdown">
              <button
                class="sort-button"
                @click="showYearDropdown = !showYearDropdown"
              >
                {{ selectedYear === "all" ? "ALL YEARS" : selectedYear }}
                <span class="arrow">▼</span>
              </button>

              <!-- Year dropdown menu -->
              <div v-if="showYearDropdown" class="sort-dropdown-menu">
                <button
                  class="sort-option"
                  :class="{ active: selectedYear === 'all' }"
                  @click="setYear('all')"
                >
                  ALL YEARS
                </button>
                <button
                  v-for="year in availableYears"
                  :key="year"
                  class="sort-option"
                  :class="{ active: selectedYear === year }"
                  @click="setYear(year)"
                >
                  {{ year }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Category filter section -->
        <div class="filter-section">
          <h2>Filter by Category</h2>
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

      <!-- Right column with scrollable comments -->
      <div class="comments-column">
        <!-- Search bar at top of comments section -->
        <div class="search-container">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search 10,394 comments..."
            class="search-input"
            @input="handleSearch"
          />
          <button class="search-button" @click="handleSearch">
            <svg
              class="search-icon-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="10" cy="10" r="7"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        <!-- Results counter below search -->
        <div class="results-counter">
          <span>{{ filteredComments.length }} comments found</span>
          <span v-if="filteredComments.length !== comments.length">
            (filtered from {{ comments.length }} total)
          </span>
        </div>

        <div v-if="isLoading" class="loading">
          <div class="loading-text">Loading comments...</div>
        </div>

        <!-- Make this scrollable container -->
        <div class="comments-container">
          <div class="comments-grid">
            <div
              v-for="comment in filteredComments"
              :key="comment.id"
              class="comment-item"
              :style="{
                minHeight: `${Math.max(200, comment.emotionalStrength * 2)}px`,
              }"
            >
              <div class="flex flex-col gap-4">
                <div class="comment-header">
                  <div class="comment-author">{{ comment.author }}</div>
                  <div class="comment-date">{{ formatDate(comment.date) }}</div>
                </div>
                <div class="comment-content">
                  {{ comment.content }}
                </div>
                <div class="comment-footer">
                  <div class="meta-line">
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

                    <span class="video-source-text"
                      >From video:
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
                  </div>

                  <div class="comment-meta">
                    <span
                      >Emotion/Toxicity?: {{ comment.emotionalStrength }}%</span
                    >
                    <span>Likes: {{ comment.likes }}</span>
                  </div>
                </div>
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
        Reconciliation_Discourse: "#527c7995",
      },
      sortOptions: [
        { value: "likes", label: "LIKE COUNT" },
        { value: "date", label: "DATE" },
        { value: "emotional", label: "EMOTIONAL STRENGTH" },
        { value: "random", label: "RANDOM" },
      ],
      // Add search query to data
      searchQuery: "",
      // Add sort direction to data
      sortDirection: "desc", // Default to descending order
      selectedYear: "all",
      showYearDropdown: false,
      availableYears: [], // This will be populated in generateAvailableYears
    };
  },

  computed: {
    filteredComments() {
      console.log("Computing filtered comments");
      console.log("Total comments:", this.comments?.length || 0);

      let result = this.comments || [];

      // Apply search filter
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(
          (comment) =>
            comment.content.toLowerCase().includes(query) ||
            comment.author.toLowerCase().includes(query) ||
            (comment.videoSource &&
              comment.videoSource.toLowerCase().includes(query))
        );
      }

      if (this.selectedTags.length > 0) {
        result = result.filter((comment) => {
          return comment.tags.some((tag) => this.selectedTags.includes(tag));
        });
      }

      // Add year filtering
      if (this.selectedYear !== "all") {
        result = result.filter((comment) => {
          try {
            const date = new Date(comment.date);
            return date.getFullYear().toString() === this.selectedYear;
          } catch (e) {
            return false;
          }
        });
      }

      // Apply sorting with direction
      result = [...result].sort((a, b) => {
        let comparison = 0;

        if (this.sortBy === "date") {
          comparison = new Date(b.date) - new Date(a.date);
        } else if (this.sortBy === "emotional") {
          comparison = b.emotionalStrength - a.emotionalStrength;
        } else if (this.sortBy === "likes") {
          comparison = b.likes - a.likes;
        }

        // Apply sort direction
        return this.sortDirection === "asc" ? -comparison : comparison;
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
              this.generateAvailableYears();
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

    // Optional debounced search if you have many comments
    handleSearch() {},

    // Add toggle direction method
    toggleSortDirection() {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    },

    // Add this method to set the selected year
    setYear(year) {
      this.selectedYear = year;
      this.showYearDropdown = false;
    },

    // Add this method to generate years from your comments data
    generateAvailableYears() {
      if (!this.comments || this.comments.length === 0) {
        return;
      }

      const years = new Set();

      this.comments.forEach((comment) => {
        if (comment.date) {
          try {
            const date = new Date(comment.date);
            const year = date.getFullYear().toString();
            if (!isNaN(year)) {
              years.add(year);
            }
          } catch (e) {
            console.error("Error parsing date:", e);
          }
        }
      });

      this.availableYears = Array.from(years).sort((a, b) => b - a); // Sort descending
      console.log("Available years:", this.availableYears);
    },
  },

  mounted() {
    console.log("Archive component mounted");
    this.loadCommentsFromCSV();
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  overflow-x: hidden;
}
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
  /* -webkit-font-smoothing: antialiased; */

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
.dates-title {
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0;
  margin-top: -10px;
  margin-left: 10px;
}
/* Main layout */
.main-content {
  display: flex;
  border-top: 1px solid black;
  margin-top: 20px;
  max-width: 100%;
  padding: 0 20px;
  width: 100%;
  height: calc(100vh - 110px); /* Full height minus navbar */
  overflow: hidden; /* Prevent overall scrolling */
}

/* Fixed sidebar */
.filters-column {
  width: 25%;
  min-width: 200px;
  padding-right: 20px;
  border-right: 1px solid #e5e5e5;
  margin-right: 20px;
  height: 100%; /* Take full height */
  overflow-y: auto; /* Allow scrolling if filters are tall */
}

/* Scrollable comments column */
.comments-column {
  flex: 1;
  width: 75%;
  padding-left: 0px;
  height: 100%; /* Take full height */
  display: flex;
  flex-direction: column;
  background-color: white; /* Ensure white background */
}

/* Make the comments container scrollable with styled scrollbar */
.comments-container {
  flex: 1;
  overflow-y: auto; /* Enable vertical scrolling */
  height: 100%; /* Take remaining height */
  padding-right: 10px; /* Room for scrollbar */
  margin-bottom: 20px;
  overflow-x: hidden;
  background-color: white; /* White background for scrollbar area */
}

/* Custom scrollbar styling */
.comments-container::-webkit-scrollbar {
  width: 8px;
}

.comments-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 1px;
}

.comments-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 1px;
}

.comments-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.comments-grid {
  display: flex; /* Change from flex to grid */
  flex-direction: column;
  /* grid-template-columns: repeat(2, 1fr); 2 columns */
  /* gap: 20px; */
  gap: 0.4rem;
  width: 100%;
  padding: 20px;
}

.comment-item {
  background: white;
  padding: 1rem;
  position: relative;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  min-height: 200px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  text-align: left; /* Ensure left alignment */
}

/* Fix header layout */
.comment-header {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Left alignment */
  position: relative;
  padding-bottom: 6px;
  margin-bottom: 1px;
  gap: 8px;
}

.comment-author {
  font-weight: bold;
  color: #333;
  font-size: 14px;
}

.comment-date {
  color: #606060;
  font-size: 12px;
}

/* Content area */
.comment-content {
  flex-grow: 1;
  margin-bottom: 20px;
  padding-bottom: 6px;
  text-align: left;
}

/* Footer layout */
.comment-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Align tags and meta info */
.comment-meta {
  display: flex;
  flex-direction: row; /* Horizontal layout */
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

/* Tags styling */
.comment-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  opacity: 0.8;
}

.comment-tag {
  border-radius: 4px;
  font-size: 0.7rem;
}

/* Video source styling */
.video-source-text {
  font-size: 12px;
  color: #606060;
  overflow: wrap;
}

.video-link {
  color: #065fd4;
  text-decoration: none;
}

.video-link:hover {
  text-decoration: underline;
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
  margin-top: 10px;
  padding-top: 10px;
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
  opacity: 0.6;
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
  color: black;
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
  color: black;
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
  color: black;
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
  color: black;
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
  color: #065fd4; /* YouTube blue link color */
  font-size: 90%;
  text-decoration: none;
  transition: color 0.2s;
}

.video-link:hover {
  text-decoration: underline;
  color: #004499;
}

.video-source-text {
  font-size: 12px;
  color: #606060;
}

/* Meta line styling - keep tags and video source on same line */
.meta-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

/* Footer layout */
.comment-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Tags styling */
.comment-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.comment-tag {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
}

/* Video source styling */
.video-source-text {
  font-size: 12px;
  color: #606060;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: visible;
  max-width: 900px;
}

/* Video link styling */
.video-link {
  color: #065fd4; /* YouTube blue link color */
  font-size: 90%;
  text-decoration: none;
  transition: color 0.2s;
}

.video-link:hover {
  text-decoration: underline;
  color: #004499;
}

/* Align tags and meta info */
.comment-meta {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.75rem;
  color: #606060;
}

/* Search bar styling */
.search-container {
  display: flex;
  margin-bottom: 10px;
  width: 96%;
  margin-top: 10px;
  margin-left: 20px;
}

.search-input {
  flex: 1;
  height: 38px;
  padding: 0 12px;
  border: 1px solid grey;
  border-radius: 1px 0 0 1px;
  font-size: 14px;
  font-family: "Space Mono", monospace;
  background-color: white;
  color: black;
}

.search-button {
  width: 40px;
  height: 38px;
  background: white;
  border: 1px solid #ddd;
  border-left: none;
  border-radius: 0 1px 1px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button:hover {
  background: black;
  color: white;
}

.search-icon {
  font-size: 16px;
}

.search-input:focus,
.search-button:focus {
  outline: none;
  border-color: #999;
}
.search-container {
  display: flex;
  margin-bottom: 10px;
  width: 96%;
  margin-top: 10px;
  margin-left: 20px;
}

/* Input styling */
.search-input {
  flex: 1;
  height: 38px;
  padding: 0 12px;
  border: 1px solid #aaa; /* Slightly darker border */
  border-radius: 1px 0 0 1px;
  font-size: 14px;
  font-family: "Space Mono", monospace;
  background-color: white;
  color: black;
}

/* Button styling with SVG icon instead of emoji */
.search-button {
  width: 40px;
  height: 38px;
  background: white;
  border: 1px solid #aaa; /* Match input border */
  border-left: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.search-button:hover {
  background: #f0f0f0;
  background-color: black;
  color: white;
}

/* Replace the emoji with a custom SVG icon */
.search-icon {
  position: relative;
  width: 16px;
  height: 16px;
}

.search-icon::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border: 2px solid #666;
  border-radius: 1%;
}

.search-icon::after {
  content: "";
  position: absolute;
  top: 10px;
  left: 11px;
  width: 2px;
  height: 6px;
  background-color: #666;
  transform: rotate(45deg);
  transform-origin: 0 0;
}

/* Focus states */
.search-input:focus,
.search-button:focus {
  outline: none;
  border-color: #777;
}
/* SVG icon styling */
.search-icon-svg {
  width: 18px;
  height: 18px;
  color: #666; /* Icon color */
}
h2 {
  text-align: left;
  font-size: 26px;
  padding-bottom: 10px;
}

/* Sort controls layout */
.sort-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-dropdown {
  flex-grow: 1;
}

/* Direction toggle button */
.direction-toggle {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  transition: background-color 0.2s;
}

.direction-toggle:hover {
  background-color: #f0f0f0;
}

/* Sort and Year dropdown styling */
.sort-dropdown {
  position: relative;
  width: 100%;
  color: black;
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
  color: black;
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
  border-bottom: 1px solid #e5e5e5; /* Add this border-bottom */
  cursor: pointer;
}

.sort-option:last-child {
  border-bottom: none; /* Remove border from last item */
}

.sort-option.active {
  background-color: #f0f0f0;
  font-weight: 500;
}

/* Direction toggle */
.direction-toggle {
  width: 38px;
  height: 38px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.direction-toggle:hover {
  background-color: #f0f0f0;
}

/* Filter section styling */
.filter-section {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e5e5;
  color: black;
}

h2 {
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
}

/* Results counter styling */
.results-counter {
  font-size: 14px;
  color: #606060;
  margin: 0 0 15px 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

/* Input styling */
.search-input {
  flex: 1;
  height: 38px;
  padding: 0 12px;
  border: 1px solid #aaa;
  border-radius: 4px 0 0 4px;
  font-size: 14px;
  font-family: "Space Mono", monospace;
  background-color: white;
  color: black;
}

/* Button styling with SVG icon */
.search-button {
  width: 40px;
  height: 38px;
  background: white;
  border: 1px solid #aaa; /* Match input border */
  border-left: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

/* Make icon white on hover */
.search-button:hover {
  background-color: black;
}

.search-button:hover .search-icon-svg {
  stroke: white; /* Change SVG stroke color to white on hover */
}

/* SVG icon styling */
.search-icon-svg {
  width: 16px;
  height: 16px;
  stroke: currentColor; /* This will inherit the current text color */
  transition: stroke 0.2s ease;
}
.title {
  color: black;
  font-size: 50px;
  padding-bottom: 8px;
  text-align: left;
  margin-left: 18px;
}
</style>
