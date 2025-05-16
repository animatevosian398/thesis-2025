<template>
  <div class="archive">
    <h1 class="title">
      Archive of Genocide Comments
      <span class="dates-title"> (2008-2025) </span>
    </h1>
    <div class="subtitle">
      A digital repository of 10,393 online comments from Youtube published
      under videos on the Armenian Genocide, categorized by narrative.
    </div>

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
                :class="{ open: showSortDropdown }"
                @click="showSortDropdown = !showSortDropdown"
              >
                {{ getSortLabel() }}
                <span class="arrow"></span>
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
                :class="{ open: showYearDropdown }"
                @click="showYearDropdown = !showYearDropdown"
              >
                {{ selectedYear === "all" ? "ALL YEARS" : selectedYear }}
                <span class="arrow"></span>
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
          <h2>Filter by Tag</h2>
          <div class="tag-buttons">
            <button
              v-for="(color, stanceKey) in stanceColors"
              :key="stanceKey"
              class="tag-button"
              :class="{
                active: selectedTags.includes(
                  stanceKey.toLowerCase().replace(/ /g, '_')
                ),
              }"
              :style="{
                backgroundColor: color,
                color: getTextColor(color),
              }"
              @click="toggleTag(stanceKey.toLowerCase().replace(/ /g, '_'))"
            >
              {{ stanceKey.replace(/_/g, " ") }}
            </button>
          </div>
        </div>

        <!-- Add this after all filter sections -->
        <div class="filter-section reset-section">
          <button class="reset-button" @click="resetFilters">
            Reset All Filters
          </button>
        </div>

        <!-- In your filters section -->
        <div class="filter-options">
          <div
            v-for="stance in availableStances"
            :key="stance"
            class="filter-option"
            :class="{ active: selectedStances.includes(stance) }"
            @click="toggleStance(stance)"
          >
            <span
              class="color-indicator"
              :style="{ backgroundColor: getStanceColor(stance) }"
            ></span>
            <span>{{
              stanceDisplayNames[stance] || formatStance(stance)
            }}</span>
          </div>
        </div>
      </div>

      <!-- Right column with scrollable comments -->
      <div class="comments-column">
        <!-- Search bar at top of comments section -->
        <div class="search-container">
          <div class="search-row">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search 10,393 comments..."
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

            <!-- Download button moved into search row -->
            <button @click="downloadCSV" class="download-button">
              <svg
                class="download-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download
            </button>
          </div>

          <div class="results-counter">
            <span>{{ filteredComments.length }} comments found</span>
            <span v-if="filteredComments.length !== comments.length"> </span>
          </div>
        </div>

        <div v-if="isLoading" class="loading">
          <div class="loading-text">Loading comments...</div>
        </div>

        <!-- Add a container for the scrollable table section -->
        <div class="table-container">
          <table
            v-if="!isLoading && filteredComments.length"
            class="comments-table"
          >
            <thead>
              <tr>
                <th>Comment</th>
                <th>Author</th>
                <th @click="setSortBy('date')" class="sortable">
                  Publish Date
                  <span>
                    {{
                      sortBy === "date"
                        ? sortDirection === "asc"
                          ? "↑"
                          : "↓"
                        : "↓"
                    }}
                  </span>
                </th>
                <th>Tag</th>
                <th
                  @click="setSortBy('likes')"
                  class="sortable"
                  style="width: 150px"
                >
                  Likes
                  <span>
                    {{
                      sortBy === "likes"
                        ? sortDirection === "asc"
                          ? "↑"
                          : "↓"
                        : "↓"
                    }}
                  </span>
                </th>
                <th>Video</th>
                <!-- Re-added "Video" column -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="comment in filteredComments" :key="comment.id">
                <td class="comment-text">{{ comment.content }}</td>
                <td class="comment-author">{{ comment.author }}</td>
                <td class="comment-date">{{ formatDate(comment.date) }}</td>
                <td class="comment-tags">
                  <span
                    v-for="tag in comment.tags"
                    :key="tag"
                    class="comment-tag"
                    :style="{
                      backgroundColor: getTagColor(tag),
                      color: getTextColorForTag(tag),
                    }"
                  >
                    {{ formatTagDisplay(tag) }}
                  </span>
                </td>
                <td class="comment-likes" style="width: 150px">
                  {{ comment.likes }}
                </td>
                <td class="comment-video">
                  <!-- Re-added "Video" data cell -->
                  <a
                    v-if="comment.videoUrl"
                    :href="comment.videoUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="video-link"
                  >
                    {{ comment.videoSource }}
                  </a>
                  <span v-else>No video</span>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-else-if="!isLoading" class="no-comments">
            No comments found.
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
      sortBy: "likes", // Changed from "date" to "likes"
      showSortDropdown: false,
      availableTags: [],
      isLoading: true,
      stanceColors: {
        "Historical Affirmation": "#4CAF50",
        "Personal Testimony": "#7A485D",
        "Explicit Denial": "#E53734",
        "Minimization Reframing": "#658B88",
        "Justification Narrative": "#C6B987",
        "Contemporary Comparison": "#2E4D46",
        "Debating Evidence": "#CF7842", // Changed name and color
        "Competitive Victimhood Historical Inversion": "#979C63",
        "Sympathy Memorial Commemorative": "#40414A",
        Apology: "#2738EC",
        "Discussion About Denial": "#841A26",
        "Reconciliation Discourse": "#005477",
      },
      sortOptions: [
        { value: "likes", label: "LIKE COUNT" },
        // { value: "date", label: "DATE" },
        // { value: "emotional", label: "EMOTIONAL STRENGTH" },
        { value: "random", label: "RANDOM" },
      ],
      // Add search query to data
      searchQuery: "",
      // Add sort direction to data
      sortDirection: "desc", // Default to descending order
      selectedYear: "all",
      showYearDropdown: false,
      availableYears: [], // This will be populated in generateAvailableYears
      stanceDisplayNames: {
        Historical_Affirmation: "Historical Affirmation",
        Personal_Testimony: "Personal Testimony",
        Explicit_Denial: "Explicit Denial",
        Minimization_Reframing: "Minimization & Reframing",
        Justification_Narrative: "Justification Narrative",
        Contemporary_Comparison: "Contemporary Comparison",
        Procedural_Deflection_Evidence_Archives: "Debating Evidence", // Updated name
        Competitive_Victimhood_Historical_Inversion: "Historical Inversion",
        Sympathy_Memorial_Commemorative: "Sympathy & Memorial",
        Apology: "Apology",
        Discussion_About_Denial: "Discussion About Denial",
        Reconciliation_Discourse: "Reconciliation Discourse",
      },
    };
  },

  computed: {
    filteredComments() {
      console.log("Computing filtered comments");
      console.log("Total comments:", this.comments?.length || 0);

      let result = this.comments || [];

      // Apply improved search filter with plural handling
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        const searchTerms = query
          .split(/\s+/)
          .filter((term) => term.length > 2);

        result = result.filter((comment) => {
          // Check if any search term matches content, author, or video source
          const commentText = comment.content.toLowerCase();
          const authorText = comment.author.toLowerCase();
          const videoSourceText = comment.videoSource
            ? comment.videoSource.toLowerCase()
            : "";

          // Check each search term
          return searchTerms.some((term) => {
            // Normalize the search term to handle plurals
            const normalizedTerm = this.normalizeWord(term);

            // Check if normalized term appears in any of the fields
            return (
              commentText.includes(normalizedTerm) ||
              authorText.includes(normalizedTerm) ||
              videoSourceText.includes(normalizedTerm) ||
              // Also check with the original term
              commentText.includes(term) ||
              authorText.includes(term) ||
              videoSourceText.includes(term)
            );
          });
        });
      }

      if (this.selectedTags.length > 0) {
        console.log("Filtering by tags:", this.selectedTags);
        result = result.filter((comment) => {
          if (!comment.tags || comment.tags.length === 0) {
            return false;
          }

          const match = this.selectedTags.some((selectedTag) =>
            comment.tags.includes(selectedTag)
          );

          if (comment.tags[0] && this.selectedTags.includes(comment.tags[0])) {
            console.log("Match found:", comment.tags[0]);
          }

          return match;
        });
        console.log("After tag filtering:", result.length);
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
    // Fix getTagColor to properly match tags to colors
    getTagColor(tag) {
      // First, standardize the format
      let normalizedTag = tag
        .replace(/-/g, " ") // Replace hyphens with spaces
        .replace(/_/g, " ") // Replace underscores with spaces
        .toLowerCase(); // Convert to lowercase

      // Map of normalized tags to exact keys in stanceColors
      const tagMap = {
        "historical affirmation": "Historical Affirmation",
        "personal testimony": "Personal Testimony",
        "explicit denial": "Explicit Denial",
        "minimization reframing": "Minimization Reframing",
        "justification narrative": "Justification Narrative",
        "contemporary comparison": "Contemporary Comparison",
        "procedural deflection": "Debating Evidence",
        "procedural deflection evidence archives": "Debating Evidence",
        "debating evidence": "Procedural Deflection Evidence Archives", // Add this line
        "competitive victimhood": "Competitive Victimhood Historical Inversion",
        "historical inversion": "Competitive Victimhood Historical Inversion",
        "competitive victimhood historical inversion":
          "Competitive Victimhood Historical Inversion",
        "sympathy memorial": "Sympathy Memorial Commemorative",
        "sympathy memorial commemorative": "Sympathy Memorial Commemorative",
        apology: "Apology",
        "discussion about denial": "Discussion About Denial",
        "reconciliation discourse": "Reconciliation Discourse",
      };

      // Check if we have a direct mapping
      if (tagMap[normalizedTag]) {
        return this.stanceColors[tagMap[normalizedTag]];
      }

      // Fallback to partial matching
      for (const [key, value] of Object.entries(this.stanceColors)) {
        const normalizedKey = key.toLowerCase();
        if (
          normalizedTag.includes(normalizedKey) ||
          normalizedKey.includes(normalizedTag)
        ) {
          return value;
        }
      }

      // If we get here, log the tag for debugging
      console.log(
        "Color not found for tag:",
        tag,
        "normalized as:",
        normalizedTag
      );

      // Return a default color
      return "#cccccc";
    },

    // Add this if not already present
    getTextColorForTag(tag) {
      const bgColor = this.getTagColor(tag);
      return this.getTextColor(bgColor);
    },

    // Fix the toggleTag function to use the correct format
    toggleTag(tag) {
      console.log("Toggle tag:", tag);

      // Special case for "Debating Evidence"
      if (tag === "debating_evidence") {
        const procedural_tag = "procedural_deflection_evidence_archives";

        // Check if procedural tag is already selected
        if (this.selectedTags.includes(procedural_tag)) {
          // If it is, remove it
          this.selectedTags = this.selectedTags.filter(
            (t) => t !== procedural_tag
          );
        } else {
          // If not, add it
          this.selectedTags.push(procedural_tag);
        }
        return;
      }

      // Normal tag toggle behavior for other tags
      if (this.selectedTags.includes(tag)) {
        // If it is, remove it
        this.selectedTags = this.selectedTags.filter((t) => t !== tag);
      } else {
        // If not, add it
        this.selectedTags.push(tag);
      }

      console.log("Selected tags after toggle:", this.selectedTags);
    },

    setSortBy(value) {
      if (this.sortBy === value) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        // Set the new sort column and reset to descending order
        this.sortBy = value;
        this.sortDirection = "desc";
      }
    },

    loadCommentsFromCSV() {
      console.log("Loading CSV data...");
      fetch("assets/Classified_Comments.csv")
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
                    row.predicted_stance?.toLowerCase().replace(/ /g, "-"), // Format consistently
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
          // Log the first few tags to see their format
          if (stanceSet.size <= 5) {
            console.log("Tag found:", comment.tags[0]);
          }
        }
      });
      this.availableTags = Array.from(stanceSet);
      console.log("All available tags:", this.availableTags);
    },

    // Update the getTextColor function to handle special cases

    getTextColor(hexColor) {
      // Special case for Debating Evidence color
      if (hexColor === "#CF7842") {
        return "white"; // Force white text for this specific color
      }

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

    // Add this method to reset all filters
    resetFilters() {
      this.selectedTags = [];
      this.sortBy = "likes"; // Changed from "date" to "likes"
      this.sortDirection = "desc";
      this.selectedYear = "all";
      this.searchQuery = "";
    },

    // Add this method to normalize words for better search matching
    normalizeWord(word) {
      // Convert to lowercase
      word = word.toLowerCase().trim();

      // Basic English plural/singular normalization
      // This handles common plural patterns but isn't comprehensive
      if (word.endsWith("s")) {
        // Try removing 's' for potential singular form
        return word.slice(0, -1);
      } else if (word.endsWith("es")) {
        // Handle words ending in 'es'
        return word.slice(0, -2);
      } else if (word.endsWith("ies")) {
        // Handle words like 'countries' → 'country'
        return word.slice(0, -3) + "y";
      }

      return word;
    },

    // Add this to your methods section
    downloadCSV() {
      // Determine which data to download - filtered or all
      const shouldDownloadFiltered =
        this.filteredComments.length !== this.comments.length;
      let dataToDownload = this.comments;
      let filename = "all_comments.csv";

      if (
        shouldDownloadFiltered &&
        confirm(
          `Download only the ${this.filteredComments.length} filtered comments? Click Cancel to download all ${this.comments.length} comments.`
        )
      ) {
        dataToDownload = this.filteredComments;
        filename = "filtered_comments.csv";
      }

      // Create CSV header
      const headers = [
        "Author",
        "Date",
        "Comment",
        "Tags",
        "Likes",
        "Video Source",
        "Video URL",
      ];
      let csvContent = headers.join(",") + "\n";

      // Add rows
      dataToDownload.forEach((comment) => {
        // Properly escape fields for CSV format
        const escapedContent = `"${(comment.content || "").replace(
          /"/g,
          '""'
        )}"`;
        const escapedAuthor = `"${(comment.author || "").replace(/"/g, '""')}"`;
        const escapedDate = `"${(comment.date || "").replace(/"/g, '""')}"`;
        const escapedTags = `"${(comment.tags || [])
          .join(",")
          .replace(/"/g, '""')}"`;
        const escapedVideoSource = `"${(comment.videoSource || "").replace(
          /"/g,
          '""'
        )}"`;
        const escapedVideoUrl = comment.videoUrl
          ? `"${comment.videoUrl.replace(/"/g, '""')}"`
          : '""';

        const row = [
          escapedAuthor,
          escapedDate,
          escapedContent,
          escapedTags,
          comment.likes || 0,
          escapedVideoSource,
          escapedVideoUrl,
        ];

        csvContent += row.join(",") + "\n";
      });

      // Create and trigger download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Alert user of success
      alert(`Downloaded ${dataToDownload.length} comments to ${filename}`);
    },

    // Add this method to your methods section:

    formatTagDisplay(tag) {
      if (
        tag.includes("procedural-deflection") ||
        tag.includes("procedural_deflection") ||
        tag.includes("procedural deflection")
      ) {
        return "Debating Evidence";
      }
      return tag.replace(/-/g, " ");
    },

    getAvailableStances() {
      // Get unique stances from your data
      const stances = new Set();
      this.commentsData.forEach((comment) => {
        if (comment.stance) {
          stances.add(comment.stance);
        }
      });

      // Map any legacy names to the correct current names
      const stanceMapping = {
        procedural_deflection: "Procedural_Deflection_Evidence_Archives",
        "procedural-deflection": "Procedural_Deflection_Evidence_Archives",
        // Add any other mappings needed
      };

      // Return the normalized list of stances
      return Array.from(stances).map(
        (stance) => stanceMapping[stance] || stance
      );
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
  /* 
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale; */
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
  position: sticky;
  overflow-y: auto;
  top: 0;
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
  height: calc(
    100vh - 150px
  ); /* Increased height - adjust the 150px as needed */
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
  height: 100%;
  display: flex;
  overflow-y: hidden; /* Change to hidden */
  position: relative;
  flex-direction: column;
  background-color: white;
}
.comments-container {
  flex: 1;
  overflow-y: auto; /* Enable vertical scrolling */
  height: calc(100% - 70px); /* Account for search bar and results counter */
  width: 100%;
  padding-right: 10px;
  background-color: white;
}
.comments-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 20px;
}
.comment-item {
  background: #f9f9f9; /* Lighter grey background */
  padding: 1rem;
  position: relative;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  min-height: 200px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.comment-author {
  /* font-weight: bold; */
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
  margin-bottom: 0px;
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
.archive {
  padding-top: 60px;
}

/* Ensure proper spacing */
.filter-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  margin-top: 10px;
  padding-top: 10px;
  border-bottom: 1px solid #e5e5e5;
  color: black;
}

/* Add specific styling for the sort filter section to reduce padding */
.filter-section:first-child {
  padding-bottom: 5px; /* Reduced from 20px */
  margin-bottom: 5px; /* Reduced from 20px */
}

/* Year filter can also have reduced space */
.filter-section:nth-child(2) {
  padding-top: 0; /* Removed top padding */
  padding-bottom: 30px; /* Reduced bottom padding */
  margin-bottom: 10px; /* Reduced margin */
}

.tag-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.75rem;
  color: black;
}

.tag-button {
  padding: 0.4rem;
  background: none;
  border: 1px solid #e5e5e5;
  border-radius: 2px;
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
  padding: 2px;
  background: none;
  border: none;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
  color: black; /* Add this line to explicitly set text color */
}

.sort-option:last-child {
  border-bottom: none;
}
.sort-option.active {
  background-color: #f0f0f0;
  font-weight: 500;
}

.arrow {
  font-size: 0.7rem;
  display: inline-block;
  margin-left: 5px;
}

/* Change the content of the arrow from a filled triangle to a chevron */
.sort-button .arrow {
  content: "";
  display: inline-block;
  border: none;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transition: transform 0.2s ease;
  position: relative;
  top: -2px;
}

/* Add a new class for when the dropdown is open */
.sort-button.open .arrow {
  transform: rotate(-135deg);
  top: 1px;
}

.arrow {
  font-size: 0.8rem;
}
/* Add styling for video links */
.video-link {
  color: #065fd4;
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
  opacity: 0.8;
  border: none;
}
.comment-tag {
  padding: 0.3rem;
  border-radius: 2px;
  font-size: 0.7rem;
  align-items: center;
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
.subtitle {
  margin-left: 20px; /* Match the margin-left of title (18px + a little extra) */
  padding-left: 0;
  text-align: left;
  font-size: 16px;
  max-width: 800px; /* Prevent excessive width for better readability */
  margin-top: 8px;
  margin-bottom: 20px;
  line-height: 1.4;
  color: rgba(0, 0, 0, 0.8);
}

.title {
  color: black;
  font-size: 50px;
  padding-bottom: 8px;
  text-align: left;
  margin-left: 18px;
  line-height: 1.1; /* Add this for better spacing with the title */
}
/* Adjust search-container to take full width and remain fixed */
.search-container {
  position: sticky;
  top: 0; /* Ensure it aligns with the viewport */
  z-index: 20; /* Higher than the table headers */
  background-color: white;
  padding: 10px;
  width: 100%;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  border-bottom: 1px solid #f0f0f0;
}

.search-button {
  width: 40px;
  height: 38px;
  background: white;
  border: 1px solid #aaa;
  border-left: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
/* Add a wrapper div for the search row if needed */
.search-row {
  display: flex;
  width: 100%;
  padding: 10px 0px 0px 0px;
  gap: 0; /* Remove gap between elements */
}
.results-counter {
  width: 100%;
  padding: 10px 0px 5px 0px;
  font-size: 12px;
  color: #606060;
  margin-left: 5px;
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

.search-icon {
  font-size: 16px;
}
.search-input:focus,
.search-button:focus {
  outline: none;
  border-color: #999;
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

/* Button styling with SVG icon */
.search-button {
  width: 40px;
  height: 38px;
  border: 1px solid #aaa; /* Match input border */
  border-left: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

/* Fix the hover state for the search button */
.search-button:hover {
  background-color: black;
}

.search-button:hover .search-icon-svg {
  stroke: rgb(255, 255, 255);
}

/* SVG icon styling - ensure proper attributes */
.search-icon-svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  fill: none; /* Explicitly set fill to none */
  transition: stroke 0.2s ease;
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
  background-color: transparent;
  color: #666; /* Icon color */
}

.title {
  color: black;
  font-size: 50px;
  padding-bottom: 8px;
  text-align: left;
  margin-left: 18px;
}
/* Override any auto-sizing/height calculations */
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.gap-4 {
  gap: 1rem;
}

/* Hide scrollbars for filters-column and comments-column */
.filters-column {
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
}

.filters-column::-webkit-scrollbar {
  display: none; /* For Chrome, Safari, and Opera */
}

/* Style scrollbar for comments-column */
.comments-column {
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: lightgrey transparent; /* Thumb and track colors */
  position: relative; /* Add this to enable sticky positioning */
}

.comments-column::-webkit-scrollbar {
  width: 8px; /* Scrollbar width for WebKit browsers */
}

.comments-column::-webkit-scrollbar-thumb {
  background-color: lightgrey; /* Scrollbar thumb color */
  border-radius: 4px; /* Rounded corners */
}

.comments-column::-webkit-scrollbar-track {
  background-color: transparent; /* Scrollbar track color */
}

/* Style for h2 elements */
h2 {
  font-size: 1rem; /* Smaller font size */
  text-align: left; /* Align text to the left */
  margin-bottom: 0.5rem; /* Add some spacing below */
}

/* Table styles */
.comments-table {
  width: 100%;
  border-collapse: separate; /* Changed from collapse to separate */
  border-spacing: 0;
  margin-top: 0;
  font-size: 0.9rem;
  position: relative;
  text-align: left;
}
.comments-table tbody tr {
  background-color: white;
}
.comments-table thead {
  background-color: white;
  position: sticky;
  z-index: 11;
  top: 0px; /* This needs to match the height of the search container + padding */
}
.comments-table thead th {
  position: sticky; /* Keep header sticky */
  top: 0px; /* This needs to match the value of comments-table thead */
  z-index: 2;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.comments-table th {
  top: 7px; /* This needs to match the value in comments-table thead */
  background-color: #f0f0f0;
  font-weight: bold;
  z-index: 10;
  position: sticky;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.sortable {
  cursor: pointer;
  user-select: none; /* Prevent text selection on click */
}

.sortable span {
  margin-left: 5px; /* Add spacing between the text and the arrow */
}

.comments-table th,
.comments-table td {
  border: 1px solid #e5e5e5;
  padding: 0.75rem;
}

.comments-table th {
  background-color: #f0f0f0;
  font-weight: bold;
}

.comments-table td.comment-tags {
  display: table-cell; /* Ensure the tags behave like a single cell */
  vertical-align: middle; /* Align content vertically */
  border: 1px solid #e5e5e5; /* Keep the table cell border */
  white-space: nowrap; /* Prevent wrapping of tags */
}

.comment-tags {
  display: inline-block; /* Ensure tags are inline within the cell */
  gap: 4px; /* Maintain spacing between tags */
  border: none; /* Remove the inner border from the tag container */
}

.comments-table td.comment-text {
  max-width: 300px;
  word-wrap: break-word;
  font-weight: 500;
  font-family: "AktivGrotesk", sans-serif;
  color: #0f0f0f;
}

.no-comments {
  text-align: center;
  margin-top: 0;
  font-size: 1rem;
  color: #606060;
}

.comments-table th:nth-child(5),
.comments-table td.comment-likes {
  width: 150px; /* Ensure the width is consistently applied */
}

/* Add these styles to your <style scoped> section */
.reset-section {
  margin-top: 2rem;
  text-align: center;
  border-bottom: none;
}

.reset-button {
  background: #ffffff;
  color: black;
  border: 1px solid black;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 0.9rem;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;
}

.reset-button:hover {
  background: #000000;
  color: white;
}

.reset-button:active {
  background: #d0d0d0;
  transform: translateY(1px);
}

.download-button {
  height: 38px;
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: white;
  color: #333;
  border: 1px solid #aaa;
  border-radius: 4px;
  padding: 0 12px;
  margin-left: 10px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.download-button:hover {
  background-color: black;
  color: white;
}

.download-button:hover .download-icon {
  stroke: white;
  background-color: black;
}

.download-icon {
  stroke: #333;
  background-color: transparent !important;
}
.table-container {
  overflow-y: auto;
  flex: 1;
  margin-top: 0;
  padding-top: 0;
}
</style>
