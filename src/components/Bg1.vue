<template>
  <div id="background-section" class="background-section" ref="bgSection">
    <!-- Fixed background image -->
    <div class="image-container" ref="imageContainer">
      <!-- Background image code remains the same -->
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
            ordinary people from their homes to the Syrian and Iraqi deserts.
            This was the beginning of the Armenian Genocide, organized by the
            Young Turks of the Ottoman Empire. An estimated million Armenians
            were killed; this was not a singular event, but rather came about
            after a "long-simmering Ottoman hatred of the Armenians dating to
            Sultan Abdul Hamid II and his slaughters in the 1890s," known as the
            Hamidian Massacres.
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
            recognize these events as genocide, instead calling them a
            relocation necessary during wartime. For Armenians worldwide,
            especially those whose family members survived and fled to other
            countries, this history remains deeply personal and important to
            remember.
          </h3>
        </div>
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
const imageContainer = ref(null);
const bgImage = ref(null);
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
    setupImageEffect();
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

function setupImageEffect() {
  // Simple parallax effect for the image
  window.addEventListener("scroll", () => {
    if (bgImage.value) {
      const scrollPosition = window.scrollY;
      const scale = 1 + scrollPosition * 0.0003; // Subtle zoom effect
      const opacity = 0.7 - scrollPosition * 0.0003; // Fade out as you scroll

      gsap.to(bgImage.value, {
        scale: Math.min(scale, 1.15), // Limit scale to 1.15
        opacity: Math.max(opacity, 0.3), // Don't go below 0.3 opacity
        duration: 0.1,
      });
    }
  });
}
</script>

<style scoped>
/* Background container */
.background-section {
  position: relative;
  height: auto;
  min-height: 300vh; /* This is 3x the viewport height! */
  width: 100%;
  color: white;
  overflow: visible; /* Changed from hidden to visible */
}

/* Image container with sticky positioning */
.image-container {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
  overflow: hidden;
}

/* Background image styling */
.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
}

/* Citation styling */
.citation-container {
  position: absolute;
  bottom: 20px;
  right: 20px;

  z-index: 2;
  padding: 5px 10px;
  border-radius: 4px;
}

.citation {
  font-size: 0.85em;
  color: rgba(255, 255, 255, 0.705);
  text-align: right;
  margin: 0;
  padding: 5px;
  font-family: "aktiv-grotesk", "General Sans", sans-serif;

  /* font-family: "Times New Roman", serif; */
}

/* Content container that scrolls over the image */
.content-container {
  position: absolute; /* Changed from relative to absolute */
  top: 0; /* Start from the top */
  left: 0;
  right: 0;
  z-index: 5;
  font-family: "Georgia", serif;
  color: black;
  padding-top: 60vh; /* Start content 60% down the viewport */
  min-height: 250vh; /* Ensure container is tall enough */
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
  height: 50vh;
}
h3 {
  font-size: 22px;
}

.citation-link:hover {
  color: white;
  border-bottom-color: white;
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
    padding-top: 40vh; /* Start content higher on mobile */
  }
}

/* Add this to your existing styles */
.citation-link {
  color: rgba(8, 8, 8, 0.8);
  text-decoration: transparent;
  transition: color 0.2s, border-bottom-color 0.2s;
  font-style: italic;
}
h3 {
  background-color: transparent;
}
.citation-link:visited {
  color: rgba(200, 200, 255, 0.8);
}
.bg1-title {
  font-family: "Times New Roman", serif;
  /* font-family: "Aktiv Grotesk", sans-serif; */
  font-size: calc(2.5rem + 1vw);
  margin-top: 0px;
  margin-bottom: 20px;
  width: 100%;
  color: black;
  text-align: left; /* Explicit left alignment */
  padding-left: 0; /* Ensure no padding shifts it */
  will-change: transform, opacity;
  transform: translateY(40px); /* Slightly increased initial offset */
  opacity: 0;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5); /* Optional: add subtle text shadow */
}

/* Existing styles remain the same */

/* Add these new styles */
.main-content {
  margin-top: 40px; /* Add space between title and content */
  will-change: transform, opacity; /* Add will-change to main content too */
  transform: translateY(60px); /* Increased initial offset */
  opacity: 0;
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
  /* These help with the animation */
  will-change: transform, opacity;
  transform: translateY(30px);
  opacity: 0;
}

/* The rest of your existing styles */
</style>
