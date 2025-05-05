<template>
  <div class="video-image-overlay-container">
    <!-- Header -->
    <div class="overlay-header">
      <h1>Video Comments Analysis</h1>
      <p class="subtitle">
        Hover over comments to see details • Click to focus
      </p>
    </div>

    <!-- Main content -->
    <div class="content-wrapper">
      <!-- Video with overlaid comment screenshots -->
      <div class="video-container" ref="videoContainer">
        <!-- Base video screenshot -->
        <img
          :src="videoScreenshot"
          alt="Video screenshot"
          class="video-base-image"
          @load="onVideoImageLoad"
        />

        <!-- Comment screenshot overlays -->
        <div
          v-for="(comment, index) in comments"
          :key="'comment-' + index"
          class="comment-overlay"
          :class="{
            active: activeComment === comment,
            highlighted: highlightedComment === comment,
          }"
          :style="{
            left: comment.position.x + 'px',
            top: comment.position.y + 'px',
            width: comment.width ? comment.width + 'px' : 'auto',
            zIndex:
              activeComment === comment
                ? 100
                : highlightedComment === comment
                ? 50
                : 10,
          }"
          @click="selectComment(comment)"
          @mouseenter="highlightComment(comment)"
          @mouseleave="unhighlightComment(comment)"
        >
          <img
            :src="comment.screenshot"
            :alt="'Comment by ' + comment.username"
            class="comment-image"
          />

          <!-- Info tooltip on hover -->
          <div
            class="comment-tooltip"
            v-if="highlightedComment === comment || activeComment === comment"
          >
            <div class="tooltip-header">
              <strong>{{ comment.username }}</strong>
              <span class="timestamp">{{ comment.timestamp }}</span>
            </div>
            <div class="tooltip-content">
              <p>{{ comment.text }}</p>
              <div class="tooltip-meta">
                <span class="likes">👍 {{ comment.likes }}</span>
                <span
                  class="stance-label"
                  :class="getStanceClass(comment.stance)"
                >
                  {{ formatStance(comment.stance) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar with comment list -->
      <div class="sidebar">
        <div class="sidebar-header">
          <h2>Comments ({{ comments.length }})</h2>
          <select v-model="sortBy" @change="sortComments" class="sort-select">
            <option value="position">By Position</option>
            <option value="likes">By Likes</option>
            <option value="time">By Time</option>
          </select>
        </div>

        <div class="comment-list">
          <div
            v-for="(comment, index) in sortedComments"
            :key="'list-' + index"
            class="comment-list-item"
            :class="{ active: activeComment === comment }"
            @click="selectComment(comment)"
            @mouseenter="highlightComment(comment)"
            @mouseleave="unhighlightComment(comment)"
          >
            <div class="comment-preview">
              <img :src="comment.screenshot" alt="Comment preview" />
            </div>
            <div class="comment-info">
              <div class="comment-header">
                <strong>{{ comment.username }}</strong>
                <span class="likes">👍 {{ comment.likes }}</span>
              </div>
              <p class="comment-text">{{ comment.text }}</p>
              <div class="comment-meta">
                <span class="timestamp">{{ comment.timestamp }}</span>
                <span
                  class="stance-label"
                  :class="getStanceClass(comment.stance)"
                >
                  {{ formatStance(comment.stance) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="controls">
      <div class="filter-controls">
        <h3>Filter by Stance</h3>
        <div class="stance-filters">
          <button
            v-for="stance in availableStances"
            :key="stance"
            class="filter-button"
            :class="{ active: activeFilters.includes(stance) }"
            @click="toggleFilter(stance)"
          >
            {{ formatStance(stance) }}
          </button>
        </div>
      </div>

      <div class="view-controls">
        <button @click="resetView" class="control-button">Reset View</button>
        <button @click="toggleOverlap" class="control-button">
          {{ allowOverlap ? "Prevent Overlap" : "Allow Overlap" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoCommentsImageOverlay",

  data() {
    return {
      videoScreenshot: "/path/to/video-screenshot.jpg", // Your video screenshot
      comments: [
        {
          id: 1,
          username: "HistoryBuff123",
          screenshot: "/path/to/comment1-screenshot.png", // Your comment screenshot
          text: "This completely ignores the historical evidence...",
          timestamp: "2 days ago",
          likes: 245,
          stance: "Historical_Affirmation",
          position: { x: 300, y: 200 }, // Pixel position on the video
          width: 400, // Optional: width of the comment
        },
        {
          id: 2,
          username: "Researcher456",
          screenshot: "/path/to/comment2-screenshot.png",
          text: "The Ottoman archives tell a different story...",
          timestamp: "1 day ago",
          likes: 189,
          stance: "Explicit_Denial",
          position: { x: 600, y: 150 },
          width: 350,
        },
        // Add more comments...
      ],

      activeComment: null,
      highlightedComment: null,
      sortBy: "position",
      activeFilters: [],
      allowOverlap: false,

      availableStances: [
        "Historical_Affirmation",
        "Explicit_Denial",
        "Justification_Narrative",
        "Minimization_Reframing",
        "Reconciliation_Discourse",
      ],
    };
  },

  computed: {
    sortedComments() {
      let filtered = this.comments;

      // Apply filters
      if (this.activeFilters.length > 0) {
        filtered = filtered.filter((comment) =>
          this.activeFilters.includes(comment.stance)
        );
      }

      // Sort comments
      return [...filtered].sort((a, b) => {
        switch (this.sortBy) {
          case "likes":
            return b.likes - a.likes;
          case "time":
            // You might want to use actual dates here
            return 0;
          case "position":
            // Sort by position (top to bottom, left to right)
            return a.position.y - b.position.y || a.position.x - b.position.x;
          default:
            return 0;
        }
      });
    },
  },

  methods: {
    selectComment(comment) {
      this.activeComment = this.activeComment === comment ? null : comment;
    },

    highlightComment(comment) {
      this.highlightedComment = comment;
    },

    unhighlightComment(comment) {
      if (this.highlightedComment === comment) {
        this.highlightedComment = null;
      }
    },

    toggleFilter(stance) {
      const index = this.activeFilters.indexOf(stance);
      if (index > -1) {
        this.activeFilters.splice(index, 1);
      } else {
        this.activeFilters.push(stance);
      }
    },

    formatStance(stance) {
      return stance.replace(/_/g, " ");
    },

    getStanceClass(stance) {
      return `stance-${stance.toLowerCase().replace(/_/g, "-")}`;
    },

    resetView() {
      this.activeComment = null;
      this.highlightedComment = null;
      this.activeFilters = [];
    },

    toggleOverlap() {
      this.allowOverlap = !this.allowOverlap;
      if (!this.allowOverlap) {
        this.preventOverlap();
      }
    },

    preventOverlap() {
      // Simple algorithm to prevent overlap
      // You might want to implement a more sophisticated algorithm
      const commentsCopy = [...this.comments];
      commentsCopy.forEach((comment, index) => {
        commentsCopy.forEach((otherComment, otherIndex) => {
          if (index !== otherIndex) {
            const rect1 = {
              left: comment.position.x,
              top: comment.position.y,
              right: comment.position.x + (comment.width || 400),
              bottom: comment.position.y + 100, // Approximate height
            };

            const rect2 = {
              left: otherComment.position.x,
              top: otherComment.position.y,
              right: otherComment.position.x + (otherComment.width || 400),
              bottom: otherComment.position.y + 100,
            };

            // Check for overlap
            if (
              !(
                rect1.right < rect2.left ||
                rect1.left > rect2.right ||
                rect1.bottom < rect2.top ||
                rect1.top > rect2.bottom
              )
            ) {
              // Adjust position to prevent overlap
              otherComment.position.y += 120;
            }
          }
        });
      });
    },

    sortComments() {
      // Trigger re-computation of sortedComments
    },

    onVideoImageLoad(event) {
      // You can use this to get the video dimensions for positioning
      const img = event.target;
      console.log("Video dimensions:", img.naturalWidth, img.naturalHeight);
    },
  },
};
</script>

<style scoped>
.video-image-overlay-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Roboto", sans-serif;
}

.overlay-header {
  text-align: center;
  margin-bottom: 30px;
}

.overlay-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

.video-container {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
}

.video-base-image {
  width: 100%;
  height: auto;
  display: block;
}

.comment-overlay {
  position: absolute;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
}

.comment-overlay:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.comment-overlay.active {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  border: 2px solid #2196f3;
}

.comment-overlay.highlighted {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.comment-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
}

.comment-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-10px);
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  min-width: 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.comment-tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid transparent;
  border-top-color: white;
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.tooltip-content p {
  margin: 8px 0;
  font-size: 0.9rem;
}

.tooltip-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.sidebar {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.sidebar-header {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sort-select {
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.comment-list {
  max-height: 600px;
  overflow-y: auto;
}

.comment-list-item {
  display: flex;
  padding: 12px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;
}

.comment-list-item:hover {
  background-color: #f8f9fa;
}

.comment-list-item.active {
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
}

.comment-preview {
  width: 80px;
  height: 60px;
  margin-right: 12px;
  flex-shrink: 0;
}

.comment-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.comment-info {
  flex: 1;
  min-width: 0;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.comment-text {
  font-size: 0.9rem;
  color: #333;
  margin: 4px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.comment-meta {
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 0.8rem;
  color: #666;
}

.timestamp {
  color: #666;
  font-size: 0.8rem;
}

.likes {
  color: #666;
  font-size: 0.9rem;
}

.stance-label {
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 12px;
  text-transform: capitalize;
}

.controls {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}

.filter-controls h3,
.view-controls h3 {
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.stance-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-button:hover {
  background: #f5f5f5;
}

.filter-button.active {
  background: #2196f3;
  color: white;
  border-color: #2196f3;
}

.view-controls {
  display: flex;
  gap: 10px;
}

.control-button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.control-button:hover {
  background: #f5f5f5;
}

/* Stance colors */
.stance-historical-affirmation {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.stance-explicit-denial {
  background-color: #ffebee;
  color: #c62828;
}

.stance-justification-narrative {
  background-color: #fff3e0;
  color: #ef6c00;
}

.stance-minimization-reframing {
  background-color: #f3e5f5;
  color: #6a1b9a;
}

.stance-reconciliation-discourse {
  background-color: #e3f2fd;
  color: #1565c0;
}

/* Responsive design */
@media (max-width: 1200px) {
  .content-wrapper {
    grid-template-columns: 2fr 1fr;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }

  .comment-overlay {
    transform: scale(0.8);
  }

  .comment-overlay:hover,
  .comment-overlay.active {
    transform: scale(0.85);
  }
}
</style>
