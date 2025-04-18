<template>
  <div class="comment-card" :class="stanceClass">
    <div class="comment-header">
      <div class="username">{{ username }}</div>
      <div class="stance-badge">{{ formatStance(stance) }}</div>
    </div>
    <div class="comment-text">{{ comment }}</div>
    <div class="comment-footer">
      <div class="like-count">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M7 10v12"></path>
          <path
            d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"
          ></path>
        </svg>
        {{ likeCount }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
  stance: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

// Convert the stance identifier to a CSS class
const stanceClass = computed(() => {
  return props.stance.toLowerCase().replace(/_/g, "-");
});

// Format the stance for display (capitalize and remove underscores)
const formatStance = (stance) => {
  // Remove the prefix and replace underscores with spaces
  let formatted = stance.replace("armenian_genocide_", "").replace(/_/g, " ");

  // Capitalize first letter of each word
  return formatted
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
</script>

<style scoped>
.comment-card {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #ddd;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.username {
  font-weight: bold;
  color: #333;
}

.stance-badge {
  background-color: #eee;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  color: #555;
}

.comment-text {
  line-height: 1.5;
  margin-bottom: 10px;
  color: #444;
}

.comment-footer {
  display: flex;
  justify-content: flex-end;
}

.like-count {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
  font-size: 0.9rem;
}

/* Stance-specific styling */
.armenian-genocide-affirmation {
  border-left-color: #4c7bec;
}

.armenian-genocide-negation-or-denial {
  border-left-color: #ff6b6b;
}

.armenian-genocide-justification {
  border-left-color: #ffa94d;
}

.whataboutism-and-comparing-other-genocides {
  border-left-color: #74c0fc;
}

.memory-of-victims {
  border-left-color: #9775fa;
}

.sympathy-for-armenians {
  border-left-color: #5cb85c;
}

.apology-for-genocide-and-killings {
  border-left-color: #38d9a9;
}

/* Matching stance badge colors */
.armenian-genocide-affirmation .stance-badge {
  background-color: #e7edff;
  color: #4c7bec;
}

.armenian-genocide-negation-or-denial .stance-badge {
  background-color: #ffe5e5;
  color: #ff6b6b;
}

.armenian-genocide-justification .stance-badge {
  background-color: #fff3e0;
  color: #ffa94d;
}

.whataboutism-and-comparing-other-genocides .stance-badge {
  background-color: #e7f5ff;
  color: #74c0fc;
}

.memory-of-victims .stance-badge {
  background-color: #f3f0ff;
  color: #9775fa;
}

.sympathy-for-armenians .stance-badge {
  background-color: #e8f6e8;
  color: #5cb85c;
}

.apology-for-genocide-and-killings .stance-badge {
  background-color: #e6fcf5;
  color: #38d9a9;
}
</style>
