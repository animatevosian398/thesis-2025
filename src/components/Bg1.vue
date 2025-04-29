<template>
  <div id="background-section" class="background-section" ref="bgSection">
    <!-- Fixed background image -->
    <div class="image-container" ref="imageContainer">
      <img
        src="/src/assets/images/Norway_Photo_Bones.jpg"
        alt="Background"
        class="background-image"
        ref="bgImage"
      />
      <div class="citation-container">
        <p class="citation">Source: Norwegian Royal Archives Collection</p>
      </div>
    </div>
    <!-- Single content container that scrolls over the image -->
    <div class="content-container">
      <div class="content-text" ref="contentText">
        <h3>
          On April 24, 1915, hundreds of Armenian leaders and intellectuals were
          rounded up, arrested, and some killed, followed by widespread
          deportations of ordinary people from their homes to the Syrian and
          Iraqi deserts. This was the beginning of the Armenian Genocide,
          organized by the Young Turks of the Ottoman Empire. An estimated
          million Armenians were killed; this was not a singular event, but
          rather came about after a "long-simmering Ottoman hatred of the
          Armenians dating to Sultan Abdul Hamid II and his slaughters in the
          1890s," known as the Hamidian Massacres.
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

        <!-- Spacer to ensure scrolling works properly -->
        <!-- <div class="spacer"></div> -->
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
  // Add initial animation for the content
  if (contentText.value) {
    gsap.fromTo(
      contentText.value,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: contentText.value,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }
}

function setupScrollTrigger() {
  // Create a scrolltrigger for the end of the section
  ScrollTrigger.create({
    trigger: ".spacer",
    start: "top 75%",
    onEnter: () => {
      // When we reach the end of this section, emit event to go to next section
      setTimeout(emitScrollEvent, 1000);
    },
    once: true, // Only trigger once
  });

  // Add scroll triggers for each h3 element to fade them in
  document.querySelectorAll(".content-text h3").forEach((h3, index) => {
    gsap.fromTo(
      h3,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: h3,
          start: "top 80%",
          end: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );
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
  min-height: 300vh; /* Increased from 200vh to ensure enough scroll space */
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
</style>
