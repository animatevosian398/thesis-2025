<template>
  <div class="chyron-container">
    <!-- Title -->
    <div class="chyron-title">Timeline of Turkish Media Headlines</div>

    <!-- Single scrolling line of headlines -->
    <div class="chyron-track">
      <div
        class="chyron-content"
        :style="{ transform: `translateX(-${scrollPosition}px)` }"
      >
        <span
          v-for="(article, index) in repeatedArticles"
          :key="index"
          class="headline"
        >
          <span class="date">{{ formatDate(article.publication_date) }}</span>
          <span class="text">{{ article.generated_title }}</span>
          <span class="separator">•</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import articlesData from "../assets/articles_with_scraped_dates.json";

const scrollPosition = ref(0);
const scrollSpeed = 50; // pixels per second
let animationFrameId = null;
let lastTimestamp = null;

// Triple the articles to ensure smooth continuous scrolling
const repeatedArticles = [
  ...articlesData.articles,
  ...articlesData.articles,
  ...articlesData.articles,
].sort((a, b) => new Date(a.publication_date) - new Date(b.publication_date));

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const animate = (timestamp) => {
  if (!lastTimestamp) lastTimestamp = timestamp;

  const deltaTime = (timestamp - lastTimestamp) / 1000; // Convert to seconds
  lastTimestamp = timestamp;

  // Update scroll position
  scrollPosition.value += scrollSpeed * deltaTime;

  // Reset position when we've scrolled through one set of articles
  // This creates an infinite loop effect
  const contentWidth =
    document.querySelector(".chyron-content")?.offsetWidth / 3 || 0;
  if (scrollPosition.value >= contentWidth) {
    scrollPosition.value = 0;
  }

  animationFrameId = requestAnimationFrame(animate);
};

onMounted(() => {
  animationFrameId = requestAnimationFrame(animate);
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style scoped>
.chyron-container {
  width: 100%;
  height: 100vh;
  background: rgb(255, 255, 255);
  color: white;
  font-family: Arial, sans-serif;
  overflow: hidden;
}

.chyron-title {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
}

.chyron-track {
  position: absolute;
  bottom: 100px;
  left: 0;
  width: 100%;
  height: 60px;
  background: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  border-top: 2px solid #333;
  border-bottom: 2px solid #333;
}

.chyron-content {
  position: absolute;
  white-space: nowrap;
  will-change: transform;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

.headline {
  display: inline-flex;
  align-items: center;
  margin-right: 60px;
}

.date {
  color: #ffeb3b;
  font-size: 14px;
  margin-right: 10px;
}

.text {
  font-size: 18px;
  margin-right: 10px;
}

.separator {
  color: #666;
  font-size: 20px;
}
</style>
