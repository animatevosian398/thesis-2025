<template>
  <div class="app-container">
    <!-- Replace the static continuous text with auto-scrolling text -->
    <div class="continuous-text-container">
      <div class="continuous-text" ref="scrollContainer">
        <div
          class="scrolling-content"
          :style="{ transform: `translateY(${-scrollPosition}px)` }"
        >
          <p>
            <span
              v-for="(comment, index) in backgroundComments"
              :key="index"
              :class="comment.type"
            >
              {{ comment.text }} <span class="separator">•</span>
            </span>
          </p>
          <!-- Duplicate content for seamless looping -->
          <p class="duplicate-content">
            <span
              v-for="(comment, index) in backgroundComments"
              :key="'duplicate-' + index"
              :class="comment.type"
            >
              {{ comment.text }} <span class="separator">•</span>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- Background SVG image remains the same -->
    <div class="background-svg-container">
      <img
        src="/assets/full-width-desert.svg"
        alt="Background pattern"
        class="background-svg"
      />
    </div>

    <!-- Rest of your template remains the same -->
    <div class="title-container">
      <h1 class="title">
        <!-- Narratives of Truth and Denial -->

        Narratives of Truth and <span class="highlight-title">Denial</span>
      </h1>
    </div>

    <div class="home-scroll-container">
      <div class="scroll-indicator" @click="scrollToBg1">
        <div class="scroll-text">Scroll to continue</div>
        <div class="scroll-arrow"></div>
        <span class="tooltip-text">
          Content Warning: Includes sensitive and potentially distressing and/or
          offensive material.
        </span>
      </div>
    </div>

    <!-- Content sections with proper IDs -->
    <div
      id="bg1-section"
      style="min-height: 100vh; display: block; width: 100%"
    >
      <Bg1 />
    </div>
    <div id="bg2-section">
      <Bg2 />
    </div>
    <div id="bg3-section">
      <Bg3 />
    </div>
    <MediaCoveragePast />
    <Framing />
    <ThreeChartComparison />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Bg1 from "@/components/Bg1.vue";
import Bg2 from "@/components/Bg2.vue";
// import Bg3 from "../components/Bg3.vue";
import MediaCoveragePast from "../components/MediaCoveragePast.vue";
import Framing from "../components/Framing.vue";
import Papa from "papaparse";
import * as d3 from "d3";
// import ThreeChartComparison from "../components/ThreeChartComparison.vue";

// Array to store filtered background comments
const backgroundComments = ref([]);

// Scrolling functions remain the same
const scrollToBg1 = () => {
  const section = document.getElementById("bg1-section");
  if (section) {
    setTimeout(() => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  } else {
    console.error("Element with ID 'bg1-section' not found");
  }
};

// Other scroll functions remain the same...

// Function to load and filter comments from CSV
const loadComments = () => {
  fetch("/assets/Classified_Comments.csv")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.text();
    })
    .then((csvText) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          // Filter for the specified stances
          const filteredComments = results.data.filter((row) => {
            const stance = (row.predicted_stance || "").toLowerCase();
            return (
              stance.includes("explicit_denial") ||
              stance.includes("justification_narrative") ||
              stance.includes("sympathy_memorial_commemorative")
            );
          });

          // Process and format the comments
          const processedComments = filteredComments
            .slice(0, 100) // Increase to get more comments for the continuous text
            .map((row) => {
              // Determine the comment type for styling
              let type = "other-comment";
              const stance = (row.predicted_stance || "").toLowerCase();

              if (stance.includes("explicit_denial")) {
                type = "denial-comment";
              } else if (stance.includes("justification_narrative")) {
                type = "justification-comment";
              } else if (stance.includes("sympathy_memorial_commemorative")) {
                type = "sympathy-comment";
              }

              return {
                text: row.cleaned_text || "",
                type: type,
                date: row.publish_date || "",
                author: row.author || "Anonymous",
              };
            });

          // Shuffle the comments for more variety
          backgroundComments.value = processedComments.sort(
            () => Math.random() - 0.5
          );
          console.log(`Loaded ${processedComments.length} filtered comments`);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    })
    .catch((error) => {
      console.error("Error fetching CSV:", error);
    });
};

// Add these variables for smooth scrolling
const scrollPosition = ref(0);
const scrollSpeed = 0.5; // pixels per second - very slow for subtle effect
let animationFrameId = null;
let lastTimestamp = null;
const scrollContainer = ref(null);

// Auto-scroll animation function
const animate = (timestamp) => {
  if (!lastTimestamp) lastTimestamp = timestamp;

  const deltaTime = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  // Update scroll position
  scrollPosition.value += (scrollSpeed * deltaTime) / 16; // Smooth movement

  // Reset when we've scrolled through the first set of content
  if (scrollContainer.value) {
    const firstContentHeight = scrollContainer.value.scrollHeight / 2;
    if (scrollPosition.value >= firstContentHeight) {
      scrollPosition.value = 0;
      lastTimestamp = null;
    }
  }

  animationFrameId = requestAnimationFrame(animate);
};

// Start and clean up animation
onMounted(() => {
  loadComments();

  // Start scrolling animation with a slight delay to ensure content is loaded
  setTimeout(() => {
    animationFrameId = requestAnimationFrame(animate);
  }, 1000);
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Neuton:ital,wght@0,200;0,300;0,400;0,700;0,800;1,400&display=swap");

/* Global styles */
html,
body,
#app {
  margin: 0;
  padding: 0;
  background-color: rgb(255, 255, 255) !important;
  color: rgb(0, 0, 0);
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

/* Main container styles */
.app-container {
  padding-top: 10px;
  background-color: rgb(255, 255, 255);
  min-height: 100vh;
  width: 100%;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}

/* Title container and styling */
.title-container {
  position: relative;
  z-index: 50 !important; /* Higher than SVG (20) and override any other z-index */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10px;
  margin-top: 55vh;
  margin-bottom: 50px;
}
/* Title styling */
.title {
  font-size: 4.2rem;
  font-weight: 700;
  text-align: center;
  color: black;
  /* font-family: "Neuton", serif; */
  position: relative;
  padding: 1px 20px;
  border-radius: 5px;
  margin: 0;
  letter-spacing: 0.02em;
  backdrop-filter: blur(2px); /* Reduced from 4px to 2px for softer effect */
  -webkit-backdrop-filter: blur(2px);
  background-color: rgba(
    255,
    255,
    255,
    0.08
  ); /* Reduced opacity from 0.113 to 0.08 */
  box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.1); /* Reduced size and opacity of glow */
}

/* Highlight styling for "Denial" */
.highlight-title {
  color: white !important;
  position: relative;
  background-color: transparent; /* Remove background from the element itself */
  padding: 0;
  font-style: normal;
  display: inline;
  letter-spacing: 0.01em;
  line-height: inherit; /* Use the parent's line height */
  vertical-align: baseline;
  z-index: 1; /* Make sure text is above the background */
}

/* Create the background as a pseudo-element */
.highlight-title::before {
  content: "";
  position: absolute;
  background-color: black;
  width: 100%;
  height: 0.9em; /* Control the height of the background */
  left: 0;
  top: 0.25em; /* Adjust this value to move the background down */
  z-index: -1; /* Place it behind the text */
  padding: 0 2px; /* Add horizontal padding to the background */
  box-sizing: border-box;
}

/* Make sure the title's highlight has the right color */
.title .highlight-title {
  color: white !important;
  -webkit-text-fill-color: white !important;
}

/* Adjust the title highlight background separately */
.title .highlight-title::before {
  height: 0.9em;
  top: 0.15em; /* Move the background down slightly for the title */
  padding: 0 4px; /* Larger horizontal padding for the title */
}

/* Background SVG styling */
.background-svg-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 20;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}

/* Background SVG styling to fill width while maintaining aspect ratio */
.background-svg {
  width: 100%; /* Fill the width of the container */
  height: auto; /* Maintain aspect ratio */
  min-height: 100%; /* Ensure it's at least as tall as the container */
  object-fit: cover; /* Ensure the entire image is visible */
  object-position: center; /* Center the image */
  max-width: none; /* Override any max-width restrictions */

  /* Add black and white filter */
  filter: grayscale(100%); /* Make the image completely black and white */
  opacity: 1; /* Slightly reduce opacity for better text contrast */

  /* Add transition for any hover effects */
  transition: filter 0.5s ease;
}

/* Home Scroll Container */
.home-scroll-container {
  text-align: center;
  margin-top: 14vh;
  padding-bottom: 50px;
  position: relative;
  z-index: 50 !important; /* Same high z-index as title */
  width: 100%;
  display: flex;
  justify-content: center;
}

/* Scroll indicator styling */
.scroll-indicator {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  opacity: 0.8;
  cursor: pointer;
  padding: 20px 20px;
  /* border-radius: 20px; */
  transition: all 0.3s ease;
}

.scroll-indicator:hover {
  opacity: 1;
  background-color: rgba(220, 220, 220, 0.001);
}

.scroll-text {
  font-size: 0.9rem;
  margin-bottom: 8px;
  color: white;
  letter-spacing: 1px;
  font-family: "Georgia", serif;
  text-transform: uppercase;
}

/* Update scroll arrow to be a carrot-style triangle (V shape) */
.scroll-arrow {
  position: relative;
  width: 20px;
  height: 12px;
  margin-top: 8px;
  animation: bounce 2s infinite;
}

/* Create the carrot with two pseudo-elements for the angled lines */
.scroll-arrow::before,
.scroll-arrow::after {
  content: "";
  position: absolute;
  top: 0;
  width: 2px; /* Line thickness */
  height: 12px; /* Line length */
  background-color: white;
}

/* Left side of the carrot - INVERTED to point DOWN */
.scroll-arrow::before {
  left: 5px;
  transform: rotate(-45deg); /* Changed from 45deg to -45deg */
}

/* Right side of the carrot - INVERTED to point DOWN */
.scroll-arrow::after {
  right: 5px;
  transform: rotate(45deg); /* Changed from -45deg to 45deg */
}

/* Update the bounce animation to work with the new arrow */
@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Updated tooltip styles with blur glass effect */
.tooltip-text {
  visibility: hidden;
  color: rgba(
    255,
    255,
    255,
    0.8
  ); /* Slightly darker text for better contrast */
  text-align: center;
  padding: 12px 18px;
  /* border-radius: 8px; */
  position: absolute;
  z-index: 100;
  font-weight: 600;
  font-family: "Geogria", serif;
  bottom: 130%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  font-size: 0.9em;
  font-weight: 500; /* Slightly bolder for better readability */
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  /* Subtle border and shadow for depth */
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  /* Add a small arrow pointing down */
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -8px;
    border-width: 8px;
    border-style: solid;
    border-color: rgba(255, 255, 255, 0.6) transparent transparent transparent;
  }
}

/* Keep the hover behavior */
.scroll-indicator:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

/* Add a slight scale effect on appear */
@keyframes tooltip-appear {
  from {
    transform: translateX(-50%) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) scale(1);
    opacity: 1;
  }
}

.scroll-indicator:hover .tooltip-text {
  animation: tooltip-appear 0.2s forwards;
}

/* Make sure mobile styling is still appropriate */
@media (max-width: 768px) {
  .tooltip-text {
    width: 90%;
    max-width: 400px;
    font-size: 0.85em;
    padding: 10px 14px;
  }
}

/* Section containers */
#bg1-section,
#bg2-section,
#bg3-section {
  min-height: 100vh;
  width: 100%;
  position: relative;
}

/* Title styling with subtle transparency */
.title {
  font-size: 3.3rem;
  font-weight: 700;
  text-align: center;
  color: black;
  font-family: "Georgia", serif;
  /* font-family: "Neuton", serif; */
  position: relative;
  padding: 25px 10px;
  border-radius: 5px;
  margin: 0;
  letter-spacing: 0.02em;
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(2px);
}

/* Media queries for better responsiveness */
@media (max-width: 768px) {
  .title {
    font-size: 2.8em;
    padding: 12px 20px;
  }

  .comment {
    width: 250px;
  }

  .tooltip-text {
    width: 90%;
    max-width: 400px;
  }
}

@media (max-height: 700px) {
  .title-container {
    margin-top: 40vh; /* Still lower but accommodates smaller screens */
  }

  .home-scroll-container {
    margin-top: 5vh;
  }
}

@media (min-height: 900px) {
  .title-container {
    margin-top: 48vh; /* Even lower on larger screens */
  }
}

/* Add these styles at the end of your existing styles */

/* Comments wall container */
.comments-wall-container {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
}

/* Individual background comments styling */
.background-comment {
  position: absolute;
  padding: 0;
  background-color: transparent;
  pointer-events: auto;
  transition: opacity 0.3s ease;
  /* font-family: "Courier New", monospace; */
  font-size: 0.5rem;
  line-height: 1;
  text-align: left;
  filter: blur(0.3px);
  border: none;
  box-shadow: none;
  max-width: 300px;
  /* word-wrap: break-word; */
  /* overflow-wrap: break-word; */
}

/* Styling for different comment types */

/* Hover effect to make comments more readable */
.background-comment:hover {
  opacity: 0.95 !important;
  filter: blur(0);
  z-index: 10;
  transform: none !important;
  box-shadow: none;
  background-color: transparent;
}

.background-comment p {
  margin: 0;
  max-height: none;
  overflow: visible;
  text-overflow: clip;
  line-height: 1;
}

/* Make sure the title stays above comments when hovered */
.title-container {
  z-index: 60;
}

.background-svg-container {
  z-index: 20;
}

/* Remove the old text-wall styling that's no longer needed */
.text-wall-container,
.text-wall {
  display: none;
}
.comments-wall-container {
  display: none;
}
.continuous-text-container {
  position: absolute;
  width: 150%;
  height: 100vh;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  line-height: 1.3;
  overflow: hidden; /* Change from visible to hidden to hide overflow */
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Add a top gradient mask to fade text as it scrolls behind the navbar */
.continuous-text {
  width: 100%;
  height: 110vh;
  overflow: hidden;
  opacity: 0.6;
  position: relative;
}

/* Add a gradient overlay at the top */
.continuous-text::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 80px; /* Height of fade effect - adjust to match your navbar height */
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.9) 20%,
    rgba(255, 255, 255, 0.7) 40%,
    rgba(255, 255, 255, 0.4) 60%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: 15; /* Above the text but below other elements */
  pointer-events: none;
}

/* Add a gradient overlay at the bottom too for symmetry */
.continuous-text::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px; /* Shorter fade at bottom */
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.8) 40%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: 15;
  pointer-events: none;
}

.scrolling-content {
  will-change: transform; /* Optimize for animation */
  transition: transform 0.1s linear; /* Smooth movement */
}

/* Style for comment types */
.denial-comment,
.justification-comment,
.sympathy-comment,
.other-comment {
  color: #666666; /* Medium gray for all comments */
  opacity: 0.7;
}

.separator {
  display: inline-block;
  margin: 0 8px;
  color: #9e9e9e;
  opacity: 0.5;
}

/* Ensure the duplicate content styling matches the original */
.duplicate-content {
  margin-top: 20px;
}

@media (min-width: 992px) {
  .continuous-text p,
  .continuous-text .duplicate-content {
    column-count: 1;
    column-gap: 40px;
  }
}

@media (min-width: 1200px) {
  .continuous-text p,
  .continuous-text .duplicate-content {
    column-count: 1;
    column-gap: 50px;
  }
}

/* Ultra-compact highlight styling with minimal vertical space */
.highlight-title {
  background-color: black;
  color: white !important;
  padding: 0px 10px; /* Keep horizontal padding */
  font-style: normal;
  display: inline;
  letter-spacing: 0.01em;
  line-height: 0.8; /* Adjust line height to be tighter but not too tight */
  transform: translateY(0px); /* Adjust vertical positioning */
  margin-top: -6px; /* More negative top margin */
  margin-bottom: -4px; /* More negative bottom margin */
  vertical-align: baseline;
  box-sizing: border-box;
  position: relative; /* Add position relative for more control */
  top: 0px; /* Fine-tune vertical alignment */
}

/* Make sure the title's highlight has the right color */
.title .highlight-title {
  color: white !important;
  -webkit-text-fill-color: white !important;
  /* Additional adjustments specific to the title's highlight */
  display: inline-block;
  padding-top: 0;
  padding-bottom: 0;
  height: 0.9em; /* Set a fixed height relative to the font size */
  line-height: 0.9; /* Match line-height to height */
}
</style>
