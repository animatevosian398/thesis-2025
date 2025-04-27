<template>
  <Navbar />
  <div class="app-container">
    <!-- Three columns section positioned behind the title -->
    <div class="background-columns">
      <div class="column">
        <p>
          Denialism: The systematic rejection of established historical facts
          despite overwhelming evidence, often motivated by ideological,
          political, or psychological factors.
        </p>
        <p>
          Historical Revisionism: The legitimate scholarly process of
          reinterpreting historical events based on new evidence and
          perspectives, distinct from negationism.
        </p>
        <p>
          Apologism: The defense or justification of controversial historical
          actions through minimization, contextualization, or deflection of
          responsibility.
        </p>
        <p>
          Trutherism: The promotion of alternative explanations for significant
          events, typically involving conspiracy theories that contradict
          official narratives.
        </p>
      </div>
      <div class="column">
        <p>
          Objectivism: The belief that historical facts exist independently of
          subjective interpretation and can be definitively established through
          evidence.
        </p>
        <p>
          Relativism: The view that historical truth is always contingent upon
          cultural context, perspective, and power dynamics rather than
          absolute.
        </p>
        <p>
          Documentarianism: Emphasis on primary sources, archival materials, and
          direct testimonies as the foundation for establishing historical
          truth.
        </p>
        <p>
          Narrativism: The understanding that history is inevitably shaped by
          storytelling conventions and the imposition of narrative structures on
          events.
        </p>
      </div>
      <div class="column">
        <p>
          Commemorativism: The approach to history that emphasizes
          memorialization, ritualized remembrance, and the ethical duty to honor
          victims.
        </p>
        <p>
          Reconstructionism: The methodical attempt to rebuild comprehensive
          accounts of the past through multidisciplinary evidence and contextual
          analysis.
        </p>
        <p>
          Constructivism: The recognition that historical knowledge is socially
          constructed through institutional practices, discourse, and cultural
          frameworks.
        </p>
        <p>
          Testimonialism: Privileging first-person accounts and witness
          testimonies as essential, irreplaceable sources of historical
          understanding.
        </p>
      </div>
    </div>

    <h1 class="homeTitle">Narratives of Truth and Denial</h1>

    <div class="button-container">
      <div class="tooltip-wrapper">
        <button @click="scrollToBackground" class="start-button">
          Launch Project
        </button>
        <span class="tooltip-text">
          Content Warning: Includes sensitive and potentially distressing and/or
          offensive material.
        </span>
      </div>
    </div>
  </div>
  <div class="home-container">
    <Bg1 @scrollToBg2="scrollToBg2" />
    <div id="bg2-section">
      <Bg2 @scrollToBg3="scrollToBg3" />
    </div>
    <div id="bg3-section">
      <Bg3 />
    </div>
    <MediaCoveragePast />
    <Framing />
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Bg1 from "@/components/Bg1.vue";
import Bg2 from "@/components/Bg2.vue";
import Bg3 from "../components/Bg3.vue";
import MediaCoveragePast from "../components/MediaCoveragePast.vue";
import Framing from "../components/Framing.vue";

const scrollToBackground = () => {
  const section = document.getElementById("background-section");
  section?.scrollIntoView({ behavior: "smooth" });
};

const scrollToBg2 = () => {
  const section = document.querySelector("#bg2-section");
  section?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const scrollToBg3 = () => {
  const section = document.querySelector("#bg3-section");
  section?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Neuton:ital,wght@0,200;0,300;0,400;0,700;0,800;1,400&display=swap");

/* Global styles to ensure black background and consistent appearance */
html,
body,
#app {
  margin: 0;
  padding: 0;
  background-color: black !important;
  color: white;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

/* Main container styles */
.app-container {
  padding-top: 10px;
  background-color: black;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Title styling */
.homeTitle {
  text-align: center;
  font-size: 3em;
  margin-top: 350px;
  margin-bottom: 50px;
  color: white;
  font-family: "Neuton", serif;
  font-weight: bold;
  width: 80%;
  max-width: 1200px;
  position: relative;
  z-index: 2;
}

/* Three columns styling */
.background-columns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 30px;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.2;
  z-index: 1;
}

.column {
  flex: 1;
  padding: 10px;
}

.column h2 {
  font-family: "Neuton", serif;
  font-size: 1.5em;
  margin-bottom: 15px;
  color: white;
}

.column p {
  font-family: "Neuton", serif;
  line-height: 1.6;
  color: white;
}

.backgroundTitle {
  font-family: "Neuton", serif;
  padding-top: 80px;
  padding-bottom: 10px;
  color: white;
}

/* Button styles */
.button-container {
  color: white;
  background-color: black;
  text-align: center;
  margin-top: 80px;
  padding-bottom: 50px;
}

.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

button {
  background-color: transparent;
  color: white;
  border-radius: 9px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-button {
  background-color: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: rgb(255, 255, 255);
  color: black;
  border: 2px solid white;
}

/* Tooltip styles */
.tooltip-text {
  visibility: hidden;
  color: white;
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
  background-color: rgba(0, 0, 0, 0.8);
}

.tooltip-wrapper:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

/* Container styles */
.home-container {
  position: relative;
  width: 100%;
  overflow: visible;
  background-color: black;
}

.content-section {
  position: relative;
  height: auto;
  min-height: 100vh;
  overflow: visible;
  z-index: 1;
}

.component-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  z-index: 2;
}

#bg2-section,
#bg3-section {
  min-height: 100vh;
  width: 100%;
  position: relative;
}

/* Override any scroll indicators that might appear in the home view */
.home-container > .scroll-indicator {
  display: none !important;
}

/* Make sure scroll indicators only appear within their respective sections */
#background-section .scroll-indicator,
#background-section-2 .scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

/* Override any fixed positioning from child components in the home view */
.app-container + * .scroll-indicator {
  position: absolute !important;
  display: none !important;
}

/* Media queries for better responsiveness */
@media (max-width: 768px) {
  .homeTitle {
    font-size: 2.5em;
    margin-top: 250px;
    width: 90%;
  }

  .background-columns {
    flex-direction: column;
    width: 90%;
    top: 10%;
  }

  .column {
    margin-bottom: 30px;
  }

  .tooltip-text {
    width: 90%;
    max-width: 400px;
  }
}

@media (max-height: 700px) {
  .homeTitle {
    margin-top: 120px;
  }

  .button-container {
    margin-top: 50px;
  }
}
</style>
