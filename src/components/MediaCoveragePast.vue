<template>
  <div class="background-section" ref="mediaSection">
    <div class="content-container">
      <h1 class="background-title">Media Coverage at the Time</h1>

      <div class="newspaper-layout">
        <div class="main-content">
          <p class="lead-text">
            Turkey's government and some historians claim a lack of evidence for
            the event's qualification of genocide.
          </p>

          <div class="nyt-quote">
            <p>
              "The New York Times covered the issue extensively —
              <span class="highlight">145 articles in 1915 alone</span> by one
              count — with headlines like
              <span class="quote-headline"
                >"Appeal to Turkey to Stop Massacres."</span
              >
              The Times described the actions against the Armenians as
              <span class="highlight-nyt">
                "systematic," "authorized," and "organized by the
                government."</span
              >
              <a
                href="https://archive.nytimes.com/www.nytimes.com/ref/timestopics/topics_armeniangenocide.html"
                target="_blank"
                rel="noopener"
                >(NYT)</a
              >
            </p>
          </div>

          <div class="ambassador-testimony">
            <div class="ambassador-header">
              <div class="ambassador-photo"></div>
              <div class="ambassador-info">
                <h3>Henry Morgenthau Sr.</h3>
                <span>US Ambassador to the Ottoman Empire, 1913-1916</span>
              </div>
            </div>
            <blockquote>
              "When the Turkish authorities gave the orders for these
              deportations, they were merely giving the death warrant to a whole
              race; they understood this well..."
              <footer>
                <a
                  href="https://genocideeducation.org/background/u-s-ambassador-to-turkey/"
                  target="_blank"
                  rel="noopener"
                  class="citation-link"
                  >(Ambassador Morgenthau, 1918)</a
                >
              </footer>
            </blockquote>
          </div>
        </div>

        <div class="sidebar">
          <!-- <div class="headline-examples">
            <h3>NYT Headlines from 1915</h3>
            <ul>
              <li>"Appeal to Turkey to Stop Massacres"</li>
              <li>"Million Armenians Killed or in Exile"</li>
              <li>"Wholesale Massacres of Armenians by Turks"</li>
            </ul>
          </div> -->
          <!-- Headline collage section -->
          <div class="headline-collage" ref="headlineCollage">
            <div class="headline-image" ref="headline1">
              <img src="/assets/NYTHeadline_4.png" alt="NYT Headline 1" />
            </div>
            <div class="headline-image" ref="headline2">
              <img src="/assets/NYTheadline1_horror.png" alt="NYT Headline 2" />
            </div>
            <div class="headline-image" ref="headline3">
              <img src="/assets/NYTHeadline3.png" alt="NYT Headline 3" />
            </div>
          </div>
          <div class="citation-headlines-archive">
            <a
              href="https://www.nytimes.com/search?dropmab=false&endDate=1916-01-01&lang=en&query=armenia&sort=best&startDate=1914-01-01"
              target="_blank"
              rel="noopener"
              class="citation-link"
              >The New York Times Archive, 1915</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const mediaSection = ref(null);
const headlineCollage = ref(null);
const headline1 = ref(null);
const headline2 = ref(null);
const headline3 = ref(null);

onMounted(() => {
  // Wait for images to load before initializing animations
  window.addEventListener("load", initScrollAnimations);

  // Initialize anyway after a short delay in case the load event already fired
  setTimeout(initScrollAnimations, 500);

  // Add window resize handler
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  // Clean up event listeners
  window.removeEventListener("load", initScrollAnimations);
  window.removeEventListener("resize", handleResize);

  // Kill all ScrollTrigger instances
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});

function handleResize() {
  // Refresh ScrollTrigger on resize
  ScrollTrigger.refresh();
}

function initScrollAnimations() {
  if (!headlineCollage.value) return;

  // Set initial positions of headlines (staggered left-to-right)
  gsap.set(headline1.value, { x: "120%", opacity: 0, rotation: 2 });
  gsap.set(headline2.value, { x: "120%", opacity: 0, rotation: -2 });
  gsap.set(headline3.value, { x: "120%", opacity: 0, rotation: 1 });

  // Create a timeline for sequential reveal
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: mediaSection.value,
      start: "top 80%", // Start when the top of the section hits 80% from the top of viewport
      end: "center 30%", // End when the center of the section hits 30% from the top of viewport
      scrub: 1, // Smooth scrubbing effect
      // markers: true, // For debugging
    },
  });

  // Animate headlines one by one with slight overlaps
  tl.to(headline1.value, {
    x: 0,
    opacity: 1,
    rotation: -1,
    duration: 1,
    ease: "power2.out",
  });

  tl.to(
    headline2.value,
    {
      x: 0,
      opacity: 1,
      rotation: 1,
      duration: 1,
      ease: "power2.out",
    },
    "-=0.7"
  ); // Start before the first animation completes

  tl.to(
    headline3.value,
    {
      x: 0,
      opacity: 1,
      rotation: -1,
      duration: 1,
      ease: "power2.out",
    },
    "-=0.7"
  ); // Start before the second animation completes
}
</script>

<style scoped>
.background-section {
  color: #1a1a1a;
  position: relative;
  padding: 80px 8% 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
}

.content-container {
  max-width: 1200px;
  width: 100%;
}

.background-title {
  font-size: calc(2.8rem + 0.5vw);
  font-family: "aktiv-grotesk", sans-serif;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: left;
  color: #111;
  border-bottom: 1px solid #000000;
  padding-bottom: 15px;
}

.newspaper-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.lead-text {
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1.5;
  color: #333;
  font-style: italic;
  padding-left: 20px;
}

.nyt-quote {
  background-color: white;
  padding: 25px;
}

.quote-badge {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.newspaper-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.newspaper-name {
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.highlight {
  padding: 2px 5px;
  font-weight: 600;
}

.highlight-nyt {
  background-color: #ff6047;
  padding: 2px 5px;
  font-weight: 600;
  color: white;
}

.quote-headline {
  font-style: italic;
  font-weight: 600;
}

.ambassador-testimony {
  margin-top: 20px;
  border: 1px solid rgb(193, 192, 192);
  background-color: white;
  font-family: "Times New Roman", Times, serif;
  padding: 25px;
}

.ambassador-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.ambassador-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #ddd;
  background-image: url("/assets/Morgenthau.png");
  background-size: cover;
  background-position: center;
  margin-right: 20px;
}

.ambassador-info h3 {
  margin: 0 0 5px 0;
  font-size: 1.2rem;
}

.ambassador-info span {
  font-size: 0.9rem;
  color: #666;
}

blockquote {
  font-size: 1.2rem;
  line-height: 1.6;
  font-style: italic;
  margin: 0;
  padding: 10px 0 10px 20px;
  color: #444;
}

blockquote footer {
  margin-top: 10px;
  text-align: right;
  font-size: 0.9rem;
  font-style: normal;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 25px;
  /* background-color: rgb(255, 255, 255); */
  position: relative;
}

.headline-examples {
  padding: 25px;
  align-self: start;
  background-color: white;
  z-index: 2; /* Keep above the collage */
}

.headline-examples h3 {
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 15px;
}

.headline-examples ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.headline-examples li {
  padding: 10px 0;
  font-style: italic;
  font-size: 1rem;
  line-height: 1.4;
}

.headline-examples li:last-child {
  border-bottom: none;
}

/* Headline collage styling */
.headline-collage {
  position: sticky;
  top: 100px; /* Stick at 100px from the top of the viewport */
  display: flex;
  flex-direction: column;
  gap: -30px; /* Negative gap creates overlap effect */
  margin-top: 20px;
  z-index: 1;
  margin-right: -20px; /* Allow images to extend slightly beyond container */
}

.headline-image {
  will-change: transform, opacity;
  transform-origin: center right;
  background-color: white;
  padding: 10px;
  margin-right: 5px;
  transform: translateX(120%) rotate(0deg);
  opacity: 0;
  max-width: 120%; /* Allow images to be wider than container */
  width: 120%;
  margin-bottom: -20px; /* Additional negative margin for overlap */
  z-index: 1; /* Base z-index */
}

/* Progressively increase z-index for proper stacking */
.headline-image:nth-child(1) {
  transform: translateX(120%) rotate(2deg);
  z-index: 3; /* Top image */
}
.headline-image:nth-child(2) {
  transform: translateX(120%) rotate(-2deg);
  z-index: 2; /* Middle image */
}
.headline-image:nth-child(3) {
  transform: translateX(120%) rotate(1deg);
  z-index: 1; /* Bottom image */
}

.headline-image img {
  width: 100%;
  height: auto;
  display: block;
}
.citation-headlines-archive {
  margin-top: 20px;
  font-size: 0.5rem;
  text-align: right;
  margin-right: 2px;
}

/* Responsive design */
@media (max-width: 992px) {
  .newspaper-layout {
    grid-template-columns: 3fr 2fr;
  }
}

@media (max-width: 768px) {
  .newspaper-layout {
    grid-template-columns: 1fr;
  }

  .background-section {
    padding: 60px 5% 60px;
  }

  .background-title {
    font-size: calc(2rem + 0.5vw);
  }

  /* Adjust sticky behavior for mobile */
  .headline-collage {
    position: static; /* Remove sticky positioning */
    margin-bottom: 30px;
    order: -1; /* Move images above headlines on mobile */
    flex-direction: column; /* Keep as column even on mobile */
    align-items: center;
    gap: -15px; /* Less overlap on mobile */
  }

  .headline-image {
    max-width: 100%; /* Full width on mobile */
    margin: 0 0 -15px; /* Less overlap on mobile */
    width: 100%;
  }
}
</style>
