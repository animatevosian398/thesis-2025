<template>
  <div class="app-container">
    <!-- Wall of text becomes the filtered comments -->
    <div class="comments-wall-container">
      <div
        v-for="(comment, index) in backgroundComments"
        :key="index"
        class="background-comment"
        :class="comment.type"
        :style="getRandomPosition()"
      >
        <p>{{ comment.text }}</p>
      </div>
    </div>

    <!-- Background SVG image -->
    <div class="background-svg-container">
      <img
        src="assets/NorwayClipped.svg"
        alt="Background pattern"
        class="background-svg"
      />
    </div>

    <!-- Rest of your template remains the same -->
    <div class="title-container">
      <h1 class="title">
        Narratives of Truth and <span class="highlight">Denial</span>
      </h1>
    </div>

    <div class="home-scroll-container">
      <div class="scroll-indicator" @click="scrollToBg1">
        <div class="scroll-text">Scroll to continue</div>
        <div class="scroll-arrow">↓</div>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Bg1 from "@/components/Bg1.vue";
import Bg2 from "@/components/Bg2.vue";
import Bg3 from "../components/Bg3.vue";
import MediaCoveragePast from "../components/MediaCoveragePast.vue";
import Framing from "../components/Framing.vue";
import Papa from "papaparse"; // Make sure papaparse is installed

// Array to store filtered background comments
const backgroundComments = ref([]);

// Scrolling functions
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

const scrollToBg2 = () => {
  const section = document.getElementById("bg2-section");
  // if (section) {
  //   section.scrollIntoView({ behavior: "smooth", block: "start" });
  // }
};

const scrollToBg3 = () => {
  const section = document.getElementById("bg3-section");
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Function to get random position for comments
const getRandomPosition = () => {
  return {
    top: `${Math.random() * 85 + 5}%`, // 5% to 90% from top
    left: `${Math.random() * 85 + 5}%`, // 5% to 90% from left
    transform: `translate(-50%, -50%) rotate(${Math.random() * 4 - 2}deg)`, // Slight random rotation
    opacity: 0.3 + Math.random() * 0.04, // Random opacity between 0.05 and 0.25
    maxWidth: `${200 + Math.random() * 150}px`, // Random width between 150-300px
  };
};

// Function to load and filter comments from CSV
const loadComments = () => {
  fetch("assets/Classified_Comments.csv")
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
            .slice(0, 40) // Limit to 40 comments for performance
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

          // Update the reactive reference
          backgroundComments.value = processedComments;
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

// Load comments when component mounts
onMounted(() => {
  loadComments();
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

/* Text wall container that will show through SVG */
.text-wall-container {
  position: absolute;
  width: 90%;
  max-width: 1500px;
  height: 100vh;
  margin: 0 auto;
  overflow: hidden;
  z-index: 15; /* Between phrases (10) and SVG (20) */
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none; /* Allow click-through */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Wall of text styling */
.text-wall {
  width: 100%;
  height: 100%;
  padding: 20px;
  opacity: 0.7;
  pointer-events: none; /* Allow click-through */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: justify;
}

.text-wall p {
  font-family: "Neuton", serif;
  line-height: 1;
  margin: 0;
  color: rgb(50, 50, 50);
  font-size: 0.9rem;
  column-count: 3;
  column-gap: 40px;
  column-rule: 1px solid rgba(0, 0, 0, 0.1);
  column-fill: auto;
  height: 90%;
}

/* Title container and styling */
.title-container {
  position: relative;
  z-index: 100; /* Increase z-index to absolutely ensure it's on top */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  margin-top: 45vh; /* You might need to adjust this if title is too low */
  margin-bottom: 50px;
  background-color: rgba(
    255,
    255,
    255,
    0.5
  ); /* Add slight background to make text stand out */
  backdrop-filter: blur(2px); /* Add blur to background elements underneath */
  -webkit-backdrop-filter: blur(2px); /* For Safari support */
  padding: 10px 0;
}

.title {
  font-size: 4rem;
  font-weight: 700;
  text-align: center;
  color: black;
  font-family: "Neuton", serif;
  position: relative;
  padding: 15px 40px;
  border-radius: 5px;
  margin: 0;
  letter-spacing: 0.02em;
  /* Add text shadow to help it stand out */
  text-shadow: 0px 0px 8px rgba(255, 255, 255, 0.8);
}

/* Background SVG styling */
.background-svg-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 20; /* Between comments (15) and title (30) */
  opacity: 0.9; /* Slightly more opaque to allow comments to show through cleanly */
  display: flex; /* Use flexbox for better control */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  margin: 0;
  padding: 0;
}

.background-svg {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover entire container, may crop parts of SVG */
}

/* Home Scroll Container */
.home-scroll-container {
  text-align: center;
  margin-top: 8vh;
  padding-bottom: 50px;
  position: relative;
  z-index: 30; /* Same as title to be above SVG and comments */
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
  border-radius: 20px;
  transition: all 0.3s ease;
}

.scroll-indicator:hover {
  opacity: 1;
  background-color: rgba(220, 220, 220, 0.001);
}

.scroll-text {
  font-size: 0.9rem;
  margin-bottom: 8px;
  letter-spacing: 1px;
  font-family: "Georgia", serif;
  text-transform: uppercase;
}

.scroll-arrow {
  font-size: 1.5rem;
  animation: bounce 2s infinite;
}

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

/* Tooltip styles */
.tooltip-text {
  visibility: hidden;
  color: black;
  text-align: center;
  padding: 8px 12px;
  border-radius: 6px;
  position: absolute;
  z-index: 100;
  bottom: 130%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  font-size: 0.85em;
  opacity: 0;
  transition: opacity 0.3s ease;
  background-color: rgba(227, 225, 225, 0.767);
}

.scroll-indicator:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

/* Section containers */
#bg1-section,
#bg2-section,
#bg3-section {
  min-height: 100vh;
  width: 100%;
  position: relative;
}

/* Refined highlight styling for "Denial" with reduced height */
.highlight {
  background-color: black;
  color: white !important;
  padding: 0 8px; /* Horizontal padding only */
  font-style: normal;
  display: inline-block;
  letter-spacing: 0.01em;
  line-height: 1; /* Tighter line height */
  transform: translateY(2px); /* Optional: slight vertical adjustment */
}

.title .highlight {
  color: white !important;
  -webkit-text-fill-color: white !important;
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
  font-family: "Courier New", monospace;
  font-size: 0.7rem;
  line-height: 1.3;
  text-align: left;
  filter: blur(0.4px);
  border: none;
  box-shadow: none;
  max-width: 300px;
  word-wrap: break-word;
  overflow-wrap: break-word;
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
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Make sure the title stays above comments when hovered */
.title-container {
  z-index: 30;
}

.background-svg-container {
  z-index: 20;
}

/* Remove the old text-wall styling that's no longer needed */
.text-wall-container,
.text-wall {
  display: none;
}
</style>
