<template>
  <div class="app-container">
    <!-- Positioned phrases that go behind the title -->
    <div class="phrases-container" ref="columnsContainer">
      <!-- Individual phrases with absolute positioning -->
      <div class="phrase phrase-1">
        <p>
          Denialism: The systematic rejection of established historical facts
          despite overwhelming evidence.
        </p>
      </div>

      <div class="phrase phrase-2">
        <p>
          Historical Revisionism: The legitimate scholarly process of
          reinterpreting historical events.
        </p>
      </div>

      <div class="phrase phrase-3">
        <p>
          Apologism: The defense or justification of controversial historical
          actions.
        </p>
      </div>

      <div class="phrase phrase-4">
        <p>
          Trutherism: The promotion of alternative explanations for significant
          events.
        </p>
      </div>

      <div class="phrase phrase-5">
        <p>
          Objectivism: The belief that historical facts exist independently of
          subjective interpretation.
        </p>
      </div>

      <div class="phrase phrase-6">
        <p>
          Relativism: The view that historical truth is always contingent upon
          cultural context.
        </p>
      </div>

      <div class="phrase phrase-7">
        <p>
          Documentarianism: Emphasis on primary sources and direct testimonies.
        </p>
      </div>

      <div class="phrase phrase-8">
        <p>
          Narrativism: The understanding that history is inevitably shaped by
          storytelling conventions.
        </p>
      </div>

      <div class="phrase phrase-9">
        <p>
          Constructivism: The recognition that historical knowledge is socially
          constructed.
        </p>
      </div>

      <div class="phrase phrase-10">
        <p>
          Testimonialism: Privileging first-person accounts and witness
          testimonies.
        </p>
      </div>
    </div>

    <div class="title-container">
      <h1 class="title">
        Narratives of Truth and <span class="highlight">Denial</span>
      </h1>
    </div>

    <!-- Updated scroll indicator style instead of button -->
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
import { ref } from "vue";
import Bg1 from "@/components/Bg1.vue";
import Bg2 from "@/components/Bg2.vue";
import Bg3 from "../components/Bg3.vue";
import MediaCoveragePast from "../components/MediaCoveragePast.vue";
import Framing from "../components/Framing.vue";

// Reference to columns container
const columnsContainer = ref(null);

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

/* Title container and styling - updated for overlay effect */
.title-container {
  position: relative;
  z-index: 5; /* Lower z-index to allow some phrases to overlay */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  margin-top: 45vh;
  margin-bottom: 50px;
}

/* Phrases container styling */
.phrases-container {
  position: absolute;
  width: 90%;
  max-width: 1500px;
  height: 100vh; /* Full viewport height */
  margin: 0 auto;
  overflow: visible;
  z-index: 1; /* Lower z-index to ensure it's behind the title */
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

/* Base styling for all phrases - with blur effect */
.phrase {
  position: absolute;
  width: 300px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 15px;
  opacity: 0.5; /* Make phrases slightly transparent */
  backdrop-filter: blur(3px); /* Add blur effect to background */
  -webkit-backdrop-filter: blur(3px); /* For Safari support */
  filter: blur(1.8px); /* Blur the text and content */
  transition: filter 0.3s ease; /* Smooth transition for hover effect */
}

/* Add hover effect to unblur when mouse is over */
.phrase:hover {
  filter: blur(0); /* Remove blur on hover */
  opacity: 0.9; /* Increase opacity on hover */
}

.phrase p {
  font-family: "Neuton", serif;
  line-height: 1.6;
  margin: 0;
  color: rgb(50, 50, 50);
  font-size: 0.95rem;
}

/* Individual phrase positioning */
.phrase-1 {
  top: 15%;
  left: 10%;
}

.phrase-2 {
  top: 30%;
  left: 25%;
}

.phrase-3 {
  top: 60%;
  left: 15%;
}

.phrase-4 {
  top: 75%;
  left: 35%;
}

.phrase-5 {
  top: 10%;
  left: 55%;
}

.phrase-6 {
  top: 25%;
  left: 70%;
}

.phrase-7 {
  top: 45%;
  left: 50%;
}

.phrase-8 {
  top: 60%;
  left: 65%;
}

.phrase-9 {
  top: 40%;
  left: 30%;
}

.phrase-10 {
  top: 70%;
  left: 75%;
}

/* Update specific phrases to overlay the title */
.phrase-3,
.phrase-7,
.phrase-9 {
  z-index: 6; /* Higher than title to appear on top */
  opacity: 0.4; /* Make them more transparent when overlaying */
}

/* Modify the hover effect for phrases that overlay the title */
.phrase-3:hover,
.phrase-7:hover,
.phrase-9:hover {
  opacity: 0.85; /* Slightly less opaque than regular phrases */
}

/* Home Scroll Container */
.home-scroll-container {
  text-align: center;
  margin-top: 8vh; /* Reduced from 10vh for better spacing with lowered title */
  padding-bottom: 50px;
  position: relative;
  z-index: 10; /* Same as title to be above phrases */
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

/* Title styling with subtle transparency */
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
  background-color: rgba(255, 255, 255, 0.85); /* Semi-transparent background */
  backdrop-filter: blur(2px); /* Add a slight blur to the background */
  -webkit-backdrop-filter: blur(2px);
}

/* Refined highlight styling for "Denial" with reduced height */
.highlight {
  background-color: black;
  color: white;
  padding: 0 8px; /* Horizontal padding only */
  font-style: normal;
  display: inline-block;
  letter-spacing: 0.01em;
  line-height: 1; /* Tighter line height */
  transform: translateY(2px); /* Optional: slight vertical adjustment */
}

/* Media queries for better responsiveness */
@media (max-width: 768px) {
  .title {
    font-size: 2.8em;
    padding: 12px 20px;
  }

  .phrase {
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
</style>
