<template>
  <div id="background-section" class="background-section" ref="bgSection">
    <!-- Removed image container code -->
  </div>
  <!-- Single content container that scrolls over the image -->
  <div class="content-container">
    <div class="content-text" ref="contentText">
      <!-- Title separated from main content for individual animation -->
      <h3 class="bg1-title" ref="titleElement">A Crime Against Humanity</h3>

      <!-- Main content in a separate container -->
      <div class="main-content" ref="mainContent">
        <h3>
          On April 24, 1915, hundreds of Armenian leaders and intellectuals
          arrested and some killed, followed by widespread deportations of
          ordinary people from their homes to the Syrian and Iraqi deserts. This
          was the beginning of the Armenian Genocide, organized by the Young
          Turks of the Ottoman Empire. An estimated million Armenians were
          killed; this was not a singular event, but rather came about after a
          "long-simmering Ottoman hatred of the Armenians dating to Sultan Abdul
          Hamid II and his slaughters in the 1890s," known as the Hamidian
          Massacres.
          <a
            href="https://genocideeducation.org/books/the-burning-tigris-the-armenian-genocide-and-americas-response/"
            target="_blank"
            class="citation-link"
            >(Balakian)</a
          >

          <br /><br />
          The events of the Genocide were well-documented by journalists,
          missionaries, and diplomats at the time, with photographs and
          eyewitness accounts. Despite this evidence, Turkey still refuses to
          recognize these events as genocide, instead calling them a relocation
          necessary during wartime. For Armenians worldwide, especially those
          whose family members survived and fled to other countries, this
          history remains deeply personal and important to remember.
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineEmits } from "vue";
import { useRoute } from "vue-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const emit = defineEmits(["scrollToBg2"]);

const bgSection = ref(null);
// Remove image container and bgImage refs
const contentText = ref(null);
const titleElement = ref(null);
const mainContent = ref(null);
const route = useRoute();

function emitScrollEvent() {
  emit("scrollToBg2");
}

onMounted(() => {
  // Initialize with a slight delay to ensure DOM is fully ready
  setTimeout(() => {
    initScrollAnimations();
    // Remove setupImageEffect call
    setupScrollTrigger();
  }, 300);

  // Handle window resize for responsive adjustments
  window.addEventListener("resize", handleResize);

  // Check if we came directly to a specific section via navbar
  const isDirectNavigation =
    route.hash === "#background" || route.path.includes("background");

  if (isDirectNavigation) {
    // Position the page at the top when directly navigating to background
    window.scrollTo(0, 0);
  }
});

onUnmounted(() => {
  // Clean up event listeners
  window.removeEventListener("resize", handleResize);

  // Kill all ScrollTrigger instances
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});

function handleResize() {
  // Update ScrollTrigger on resize
  ScrollTrigger.refresh();
}

function initScrollAnimations() {
  // Initial state - both title and content are invisible
  gsap.set(titleElement.value, { opacity: 0, y: 30 });
  gsap.set(mainContent.value, { opacity: 0, y: 50 });

  // Create a timeline for sequential animations with improved easing
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: contentText.value,
      start: "top 80%",
      end: "top 30%",
      scrub: 1, // Increased scrub value for smoother animation
      toggleActions: "play none none reverse",
    },
  });

  // First animate the title with better easing
  tl.to(titleElement.value, {
    opacity: 1,
    y: 0,
    duration: 2,
    ease: "power2.out", // Smoother easing function for better deceleration
  });

  // Then animate the main content with delayed entry
  tl.to(
    mainContent.value,
    {
      opacity: 1,
      y: 0,
      duration: 3,
      ease: "power1.out", // Gentle easing for content
    },
    "-=1.5" // Slightly increased overlap for smoother transition
  );
}

function setupScrollTrigger() {
  // Create a scrolltrigger for the end of the section
  ScrollTrigger.create({
    trigger: ".content-text",
    start: "bottom 25%",
    onEnter: () => {
      // When we reach the end of this section, emit event to go to next section
      setTimeout(emitScrollEvent, 1000);
    },
    once: true, // Only trigger once
  });
}

// Remove setupImageEffect function completely
</script>

<style scoped>
/* Background container - simplified */
.background-section {
  position: relative;
  height: auto;
  min-height: 150vh; /* Reduced from 300vh */
  width: 100%;
  color: white;
  overflow: visible;
  background-color: white; /* Add background color since image is gone */
}

/* Remove image container and related styles */

/* Content container that scrolls */
.content-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  font-family: "Georgia", serif;
  color: black;
  padding-top: 40vh; /* Reduced from 60vh */
  min-height: 150vh; /* Reduced from 250vh */
}

/* Content text styling */
.content-text {
  width: 80%;
  background-color: transparent;
  max-width: 800px;
  margin: 0 auto 100px; /* Center and add bottom margin */
}

/* Spacer to ensure enough scroll room */
.spacer {
  height: 30vh; /* Reduced from 50vh */
}

h3 {
  font-size: 22px;
}

.citation-link {
  color: rgba(8, 8, 8, 0.8);
  text-decoration: transparent;
  transition: color 0.2s, border-bottom-color 0.2s;
  font-style: italic;
}

.citation-link:hover {
  color: #333;
  text-decoration: underline;
}

h3 {
  background-color: transparent;
}

.citation-link:visited {
  color: rgba(100, 100, 175, 0.8);
}

.bg1-title {
  font-family: "Times New Roman", serif;
  font-size: calc(2.5rem + 1vw);
  margin-top: 0px;
  margin-bottom: 20px;
  width: 100%;
  color: black;
  text-align: left;
  padding-left: 0;
  will-change: transform, opacity;
  transform: translateY(30px);
  opacity: 0;
}

/* Main content initial animation state */
.main-content {
  margin-top: 40px;
  will-change: transform, opacity;
  transform: translateY(60px);
  opacity: 0;
}

/* Media query adjustments */
@media (max-width: 768px) {
  .content-text {
    width: 90%;
  }

  .content-text h3 {
    padding: 30px;
    font-size: calc(0.9rem + 0.2vw);
    margin-bottom: 20vh; /* Less spacing on mobile */
  }

  .content-container {
    padding-top: 30vh; /* Start content higher on mobile */
  }
}
</style>
