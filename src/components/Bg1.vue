<template>
  <div id="background-section" class="background-section" ref="bgSection">
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
    <h1 class="backgroundTitle">Background</h1>
    <div class="content-text">
      <h3>
        On April 24, 1915, hundreds of Armenian leaders and thinkers were
        rounded up, arrested, and some killed, followed by widespread
        deportations of ordinary people from their homes to the Syrian and Iraqi
        deserts. Many died during these brutal marches from starvation, disease,
        or direct violence. The events were well-documented by journalists,
        missionaries, and diplomats at the time, with photographs and eyewitness
        accounts.
        <br /><br />
        Despite this evidence, Turkey still refuses to recognize these events as
        genocide, instead calling them a relocation necessary during wartime.
        For Armenians worldwide, especially those whose family members survived
        and fled to other countries, this history remains deeply personal and
        important to remember.
      </h3>
    </div>

    <div
      class="scroll-indicator"
      ref="scrollIndicator"
      @click="emitScrollEvent"
    >
      <div class="scroll-text">Scroll to continue</div>
      <div class="scroll-arrow">↓</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineEmits } from "vue";
import { useRoute } from "vue-router";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const emit = defineEmits(["scrollToBg2"]);

const bgSection = ref(null);
const imageContainer = ref(null);
const bgImage = ref(null);
const scrollIndicator = ref(null);
const route = useRoute();

let scrollTriggers = [];

function emitScrollEvent() {
  emit("scrollToBg2");
}

onMounted(() => {
  // Initialize with a slight delay to ensure DOM is fully ready
  setTimeout(initScrollAnimations, 300);

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
  // Clean up event listeners and GSAP instances
  window.removeEventListener("resize", handleResize);

  // Kill all ScrollTrigger instances to prevent memory leaks
  clearScrollTriggers();
});

function clearScrollTriggers() {
  // Kill all scroll triggers we've created
  scrollTriggers.forEach((trigger) => {
    if (trigger && trigger.kill) {
      trigger.kill();
    }
  });
  scrollTriggers = [];

  // Also check for any others that might exist
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

function handleResize() {
  // Kill existing triggers and reinitialize
  clearScrollTriggers();
  initScrollAnimations();
}

function initScrollAnimations() {
  if (!bgSection.value) return;

  // Make sure all content is visible immediately
  gsap.set(bgSection.value.querySelector(".backgroundTitle"), {
    opacity: 1,
    y: 0,
  });
  gsap.set(bgSection.value.querySelector(".content-text"), {
    opacity: 1,
    y: 0,
  });

  // Image parallax effect for first section
  const imageTrigger = ScrollTrigger.create({
    trigger: bgSection.value,
    start: "top top",
    end: "bottom top",
    scrub: 0.5,
    onUpdate: (self) => {
      if (bgImage.value) {
        gsap.to(bgImage.value, {
          scale: 1 + self.progress * 0.1,
          opacity: 0.7 - self.progress * 0.3,
          duration: 0,
        });
      }
    },
  });
  scrollTriggers.push(imageTrigger);

  // Animation for scroll indicator
  if (scrollIndicator.value) {
    const indicatorTrigger = ScrollTrigger.create({
      trigger: bgSection.value,
      start: "60% top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        gsap.to(scrollIndicator.value, {
          opacity: 1 - self.progress,
          duration: 0,
        });
      },
    });
    scrollTriggers.push(indicatorTrigger);

    // Pulsing animation for scroll indicator (non-scrolltrigger animation)
    gsap.to(scrollIndicator.value, {
      y: "+=10",
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: "power1.inOut",
    });
  }
}
</script>

<style scoped>
.background-section {
  height: 100vh;
  min-height: 800px;
  background-color: rgb(0, 0, 0);
  color: white;
  position: relative;
  padding: 100px 0 0 8%;
  display: flex;
  flex-direction: column;
  scroll-margin-top: 0;
  align-items: flex-start;
  overflow: hidden;
  width: 100%;
}

.backgroundTitle {
  position: relative;
  z-index: 5; /* Increased z-index */
  margin-top: 40px; /* Reduced top margin */
  margin-bottom: 20px;
  margin-left: 2%;
  font-size: calc(3.6rem + 1vw);
  width: 60%;
  text-align: left;
}

.image-container {
  position: absolute;
  top: 24%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 75%;
  z-index: 1;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  mix-blend-mode: difference;
  will-change: transform, opacity;
}

.content-text {
  position: relative;
  z-index: 5; /* Increased z-index */
  max-width: 70%;
  margin-top: 20px;
  display: flex;
  margin-left: 5%; /* Reduced left margin */
  font-family: aktiv-grotesk, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  font-style: normal;
  padding: 20px;
  flex-direction: column;
  justify-content: space-between;
  min-height: auto;
  overflow: visible;
  margin-bottom: 100px; /* Added space below content for scroll indicator */
  border-radius: 8px;
}

.content-text h3 {
  font-size: calc(1rem + 0.5vw);
  line-height: 1.8;
  letter-spacing: -0.01em;
  font-weight: 500;
  font-family: "aktiv-grotesk", "General Sans", sans-serif;
  margin: 0;
  color: white;
  background-color: transparent;
}

.citation {
  font-size: 0.8em;
  color: #919090;
  text-align: right;
  margin: 0;
  padding: 5px 0;
  background-color: transparent;
}

.citation-container {
  position: absolute;
  bottom: -40px;
  right: 10%;
  z-index: 3;
  width: 90%;
}

/* Scroll indicator styling - Fixed positioning */
.scroll-indicator {
  position: fixed; /* Changed from absolute to fixed */
  bottom: 40px; /* Adjusted from 10vh to a fixed value */
  left: 50%;
  transform: translateX(-50%);
  z-index: 100; /* Increased z-index */
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  opacity: 0.8;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5); /* Added semi-transparent background */
  padding: 10px 20px; /* Added padding */
  border-radius: 20px; /* Rounded corners */
}

.scroll-text {
  font-size: 0.9rem;
  margin-bottom: 8px;
  letter-spacing: 1px;
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

/* Media queries for responsive design */
@media (max-height: 800px) {
  .content-text h3 {
    font-size: calc(0.9rem + 0.2vw);
    line-height: 1.3;
  }

  .backgroundTitle {
    margin-top: 20px;
    font-size: calc(2.5rem + 1vw);
  }

  .content-text {
    margin-top: 10px;
    margin-bottom: 80px; /* Smaller margin for smaller screens */
  }

  .scroll-indicator {
    bottom: 20px; /* Adjusted for smaller screens */
  }

  .background-section {
    padding-top: 60px;
  }
}

@media (max-width: 768px) {
  .content-text {
    max-width: 85%;
    margin-left: 2%;
  }

  .image-container {
    width: 90%;
  }

  .backgroundTitle {
    width: 90%;
    font-size: calc(2.5rem + 1vw);
  }

  .background-section {
    padding-left: 5%;
  }
}
</style>
