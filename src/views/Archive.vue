<template>
  <div class="comments-archive">
    <h2 class="archive-title">Comments</h2>

    <!-- Minimal search -->
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search comments..."
        class="search-input"
        @input="filterComments"
      />
    </div>

    <!-- Comments list -->
    <div class="comments-list" v-if="filteredComments.length > 0">
      <div
        v-for="comment in paginatedComments"
        :key="comment.id"
        class="comment-item"
      >
        <div class="comment-content">{{ comment.content }}</div>
        <div class="comment-details">
          <span class="comment-author">{{ comment.author }}</span>
          <span class="comment-date">{{ comment.date }}</span>
        </div>
      </div>

      <!-- Simple pagination -->
      <div class="pagination" v-if="totalPages > 1">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="page-btn"
        >
          &larr;
        </button>
        <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="page-btn"
        >
          &rarr;
        </button>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="empty-state">No comments found</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Sample data - replace with your API/data source
const comments = ref([
  {
    id: 1,
    author: "Researcher",
    content:
      "I am of Greek descent, and I readily admit the Greeks unleashed an orgy of barbarism on the Turks in the war of independence. The tortures were unspeakable. Yet they did not commit genocide.",
    date: "Apr 15",
  },
  {
    id: 2,
    author: "Historian",
    content:
      "The distinction between war crimes and genocide hinges on intent. Documentation from this period requires careful contextual analysis.",
    date: "Apr 12",
  },
  {
    id: 3,
    author: "Scholar",
    content:
      "When examining historical events, we must be cautious about applying contemporary frameworks to past conflicts.",
    date: "Apr 10",
  },
  {
    id: 4,
    author: "Observer",
    content:
      "Primary sources often contradict later political narratives. This is particularly evident in the case of the Greek War of Independence.",
    date: "Apr 7",
  },
  {
    id: 5,
    author: "Analyst",
    content:
      "The scale and systematic nature of violence are key factors in determining how we classify historical atrocities.",
    date: "Apr 4",
  },
  {
    id: 6,
    author: "Reader",
    content:
      "Academic consensus has evolved significantly on this topic over the past decade, with more nuanced interpretations emerging.",
    date: "Apr 1",
  },
]);

// Search and pagination state
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 5;

// Filter comments based on search query
const filteredComments = computed(() => {
  if (!searchQuery.value.trim()) return comments.value;

  const query = searchQuery.value.toLowerCase();
  return comments.value.filter(
    (comment) =>
      comment.content.toLowerCase().includes(query) ||
      comment.author.toLowerCase().includes(query)
  );
});

// Calculate total pages
const totalPages = computed(() =>
  Math.ceil(filteredComments.value.length / itemsPerPage)
);

// Get paginated comments
const paginatedComments = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return filteredComments.value.slice(startIndex, startIndex + itemsPerPage);
});

// Filter comments and reset pagination
const filterComments = () => {
  currentPage.value = 1;
};

// Pagination controls
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
</script>

<style scoped>
.comments-archive {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  color: #213547;
  text-align: left;
  font-family: "Liberation Sans", system-ui, sans-serif;
}

.archive-title {
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.search-container {
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: #ffffff;
  color: #333;
}

.search-input:focus {
  outline: none;
  border-color: #646cff;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comment-item {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.comment-content {
  margin-bottom: 0.75rem;
  line-height: 1.5;
  font-size: 0.95rem;
}

.comment-details {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #666;
}

.comment-author {
  font-weight: 700;
}

.empty-state {
  text-align: center;
  padding: 3rem 0;
  color: #666;
  font-style: italic;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
}

.page-btn {
  background: none;
  border: 1px solid #e5e5e5;
  color: #333;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-size: 1rem;
  border-radius: 4px;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn:hover:not(:disabled) {
  border-color: #646cff;
}

.page-info {
  font-size: 0.85rem;
  color: #666;
}

/* Ensure this component works with light/dark mode */
@media (prefers-color-scheme: dark) {
  .comments-archive {
    color: rgba(255, 255, 255, 0.87);
  }

  .search-input {
    background-color: #1a1a1a;
    border-color: #333;
    color: rgba(255, 255, 255, 0.87);
  }

  .comment-item {
    border-bottom-color: #333;
  }

  .archive-title {
    border-bottom-color: #333;
  }

  .page-btn {
    background-color: #1a1a1a;
    border-color: #333;
    color: rgba(255, 255, 255, 0.87);
  }

  .comment-details {
    color: #aaa;
  }

  .empty-state {
    color: #aaa;
  }
}
</style>
