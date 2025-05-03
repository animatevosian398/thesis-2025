<template>
  <div class="relative w-full h-screen bg-black overflow-hidden">
    <!-- Add a title for clarity -->
    <div class="absolute top-4 left-4 text-white text-xl font-bold z-10">
      Timeline of Turkish Media Headlines
    </div>

    <!-- Headlines -->
    <div
      v-for="(article, index) in sortedArticles"
      :key="article.id"
      class="absolute p-4 max-w-xs bg-white/10 text-black text-sm rounded-xl backdrop-blur-sm shadow-lg"
      :style="getArticleStyle(index)"
    >
      <div class="text-yellow-300 text-xs mb-1">
        {{ formatDate(article.publication_date) }}
      </div>
      {{ article.generated_title }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import articlesData from "../assets/articles_with_scraped_dates.json";

const sortedArticles = ref([]);
const articlePositions = ref([]);
const animationStartTimes = ref([]);
let animationFrameId = null;

// Format date to make it more readable
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Sort articles by publication date
const sortArticles = () => {
  // Make sure articles data exists and has items
  if (
    !articlesData ||
    !articlesData.articles ||
    !articlesData.articles.length
  ) {
    console.error("No articles data available!");
    return;
  }

  sortedArticles.value = [...articlesData.articles].sort(
    (a, b) => new Date(a.publication_date) - new Date(b.publication_date)
  );

  console.log(`Sorted ${sortedArticles.value.length} articles`);

  // Initialize animation start times with staggered delays
  animationStartTimes.value = sortedArticles.value.map(
    (_, index) => Date.now() + index * 2000 // Start a new headline every 2 seconds
  );

  // Initialize positions with random vertical placements
  articlePositions.value = sortedArticles.value.map(() => ({
    top: `${10 + Math.random() * 70}%`, // Random vertical position
    transform: `rotate(${(Math.random() - 0.5) * 3}deg)`, // Slight random rotation
  }));
};

const getArticleStyle = (index) => {
  const now = Date.now();
  const startTime = animationStartTimes.value[index];
  const timeSinceStart = now - startTime;

  // Total animation time (15 seconds to cross the screen)
  const animationDuration = 15000;

  // If animation hasn't started yet
  if (timeSinceStart < 0) {
    return {
      left: "-30%", // Wait off-screen
      top: articlePositions.value[index].top,
      transform: articlePositions.value[index].transform,
      opacity: 0,
      zIndex: index,
    };
  }

  // Calculate horizontal position based on time
  const progress = Math.min(timeSinceStart / animationDuration, 1);
  const left = -30 + progress * 130; // Move from -30% to 100%

  // Fade in at start and fade out at end
  let opacity = 1;
  if (progress < 0.1) {
    opacity = progress * 10; // Fade in
  } else if (progress > 0.9) {
    opacity = (1 - progress) * 10; // Fade out
  }

  // If animation is complete, restart it
  if (progress >= 1) {
    // Reset animation with a delay proportional to the number of articles
    animationStartTimes.value[index] = now + sortedArticles.value.length * 100;

    // Assign a new random vertical position for variety
    articlePositions.value[index].top = `${10 + Math.random() * 70}%`;
  }

  return {
    left: `${left}%`,
    top: articlePositions.value[index].top,
    transform: articlePositions.value[index].transform,
    opacity: opacity,
    transition: "none", // Remove transitions for smoother motion
    zIndex: index,
  };
};

// Animation loop that actually triggers reactivity
const animate = () => {
  // Force Vue to notice changes by creating a new array reference
  // This is crucial - without this the component won't update
  sortedArticles.value = [...sortedArticles.value];

  // Continue animation loop
  animationFrameId = requestAnimationFrame(animate);
};

onMounted(() => {
  console.log("Component mounted");
  sortArticles();
  // Start animation loop
  animate();
});

// Clean up animation frame on component unmount
onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style>
/* Additional styling for better visibility */
.absolute {
  position: absolute;
}
body {
  color: black;
}
</style>
