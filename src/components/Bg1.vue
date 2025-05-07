<template>
  <div id="background-section" class="background-section" ref="bgSection">
    <!-- Single content container that scrolls over the image -->
    <div class="content-container">
      <!-- Main content section -->
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

      <!-- Horizontal Headlines Section between content and bg2 -->
      <div class="horizontal-headlines-section" ref="headlinesSection">
        <h3 class="headlines-title">Media Coverage at the Time</h3>

        <div class="headlines-container">
          <div class="headline-item" ref="headline1">
            <div class="headline-image">
              <img src="/assets/NYTHeadline_4.png" alt="NYT Headline 1" />
            </div>
          </div>

          <div class="headline-item" ref="headline2">
            <div class="headline-image">
              <img src="/assets/NYTheadline1_horror.png" alt="NYT Headline 2" />
            </div>
          </div>

          <div class="headline-item" ref="headline3">
            <div class="headline-image">
              <img src="/assets/NYTHeadline3.png" alt="NYT Headline 3" />
            </div>
          </div>
        </div>
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

      <!-- Bg2 content section - integrated into the same page -->
      <div class="bg2-section" ref="bg2Section">
        <h2 class="date">Post-1915</h2>
        <h1 class="backgroundTitle" ref="bg2Title">
          Turkey's <span class="highlight-denial">Denial</span>
        </h1>

        <!-- Bg2 content paragraphs - exact content from Bg2.vue -->
        <div ref="bg2Content" class="bg2-content-container">
          <p class="paragraph-section" ref="bg2Para1">
            Turkey's official stance on the genocide evolved from silence, to a
            more complicated form of denial and revisionist reframing of
            history. "Ankara does not accept the alleged "genocide," but
            acknowledges there were casualties on both sides during World War I"
            <a
              href="https://www.aa.com.tr/en/politics/turkish-vp-no-one-can-defame-turkey-over-1915-events/1269655"
              target="_blank"
              class="citation-link"
              >(Anadolu Agency, 2018)</a
            >. It also frames the events as justified due to suspected Armenian
            alliances with Russia and also a relocation for their own safety; A
            relocation which essentially was a death march through the Syrian
            desert, where many died from starvation, disease, and violence.
          </p>

          <p class="paragraph-section quote" ref="bg2Para2">
            "While it is true that some Armenians protested unfair taxation, and
            some did defect to Russia during the war, they were vastly
            outnumbered by the millions of peaceful residents of the Ottoman
            Empire who were forced into labor, deportation, and concentration
            camps. Scholars agree on this overwhelmingly."
            <a
              href="https://www.vice.com/en/article/how-google-searches-are-promoting-genocide-denial/"
              target="_blank"
              class="citation-link"
              >(Merchant)</a
            >
          </p>

          <p class="paragraph-section" ref="bg2Para3">
            The systematic denial of the Armenian Genocide has profound
            consequences. Beyond historical revisionism, it prevents healing for
            survivors and their descendants while creating a precedent for
            impunity regarding mass atrocities.
          </p>

          <p class="paragraph-section" ref="bg2Para4">
            This denial extends beyond Turkey's borders, influencing
            international relations, historical education, and even
            <span class="highlight">discourse online.</span>
          </p>
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
const contentText = ref(null);
const titleElement = ref(null);
const mainContent = ref(null);
const sectionEndSpacer = ref(null);
const route = useRoute();

// Headline references
const headlinesSection = ref(null);
const headline1 = ref(null);
const headline2 = ref(null);
const headline3 = ref(null);

// Bg2 references
const bg2Section = ref(null);
const bg2Title = ref(null);
const bg2Content = ref(null);
const bg2Para1 = ref(null);
const bg2Para2 = ref(null);
const bg2Para3 = ref(null);
const bg2Para4 = ref(null); // Added the fourth paragraph ref

// Flag to track if direct navigation occurred
const isDirectNavigation = ref(false);

// Initialize route-related refs outside the conditional block
const routeHash = ref(null);
const routePathIncludesBackground = ref(null);

// Initialize route-related refs
routeHash.value = route.hash === "#background";
routePathIncludesBackground.value = route.path.includes("background");
isDirectNavigation.value = routeHash.value || routePathIncludesBackground.value;

// Ensure onMounted is always called
onMounted(() => {
  // Initialize with a slight delay to ensure DOM is fully ready
  setTimeout(() => {
    initContentAnimations();
    setupHeadlinesAnimation();
    setupBg2Animations(); // Add this new function

    // Remove setupScrollTrigger() since we're no longer transitioning to a separate page

    // Position the page properly when navigating directly to background
    if (isDirectNavigation.value) {
      // Scroll to a specific position from the top of the page
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Make content immediately visible without animation when directly navigating
      gsap.to(titleElement.value, { opacity: 1, y: 0, duration: 0.5 });
      gsap.to(mainContent.value, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.2,
      });
    }
  }, 300);

  // Handle window resize for responsive adjustments
  window.addEventListener("resize", handleResize);
});

// Add a new function to set up Bg2 animations
function setupBg2Animations() {
  // Set initial states for Bg2 elements
  gsap.set(bg2Section.value, { opacity: 0 });
  gsap.set(bg2Title.value, { opacity: 0, y: 30 });
  gsap.set([bg2Para1.value, bg2Para2.value, bg2Para3.value, bg2Para4.value], {
    opacity: 0,
    y: 40,
  });

  // Create a timeline for Bg2 elements
  const bg2Tl = gsap.timeline({
    scrollTrigger: {
      trigger: bg2Section.value,
      start: "top 70%", // Start animation when Bg2 section is 70% from the top
      toggleActions: "play none play reverse", // Play on scroll down, reverse on scroll up
    },
  });

  // Animate Bg2 section
  bg2Tl
    .to(bg2Section.value, {
      opacity: 1,
      duration: 0.8,
      ease: "power1.out",
    })
    .to(bg2Title.value, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    })
    .to(
      [bg2Para1.value, bg2Para2.value, bg2Para3.value, bg2Para4.value],
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power1.out",
      },
      "-=0.5"
    );
}

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

// Updated initContentAnimations function that supports scrolling back up
function initContentAnimations() {
  // Initial state - both title and content are invisible
  gsap.set(titleElement.value, { opacity: 0, y: 30 });
  gsap.set(mainContent.value, { opacity: 0, y: 50 });

  // Create a timeline for sequential animations
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: contentText.value,
      start: "top 80%",
      end: "top 30%",
      toggleActions: "play none play reverse", // This is key - play when scrolling down, reverse when scrolling up
    },
  });

  // First animate the title
  tl.to(titleElement.value, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
  });

  // Then animate the main content
  tl.to(
    mainContent.value,
    {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power1.out",
    },
    "-=0.8"
  );
}

// Updated headlines animation that supports scrolling back up
function setupHeadlinesAnimation() {
  // Set initial states for headlines
  gsap.set(headlinesSection.value, { opacity: 0 });
  gsap.set([headline1.value, headline2.value, headline3.value], {
    opacity: 0,
    y: 50,
    scale: 0.9,
  });

  // Create a timeline for the headlines section
  const headlinesTl = gsap.timeline({
    scrollTrigger: {
      trigger: headlinesSection.value,
      start: "top 70%", // Start when headlines section is 70% from top
      toggleActions: "play none play reverse", // Play on scroll down, reverse on scroll up
    },
  });

  // Fade in the headlines section
  headlinesTl
    .to(headlinesSection.value, {
      opacity: 1,
      duration: 0.8,
      ease: "power1.out",
    })
    // Animate each headline with a staggered effect
    .to(
      [headline1.value, headline2.value, headline3.value],
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.2,
        ease: "back.out(1.2)",
      },
      "-=0.5"
    );
}
</script>

<style scoped>
/* Background container */
.background-section {
  position: relative;
  height: auto;
  min-height: 150vh;
  width: 100%;
  color: white;
  overflow: visible;
  background-color: white;
}
.nyt-quote {
  padding-top: 20px;
}
/* Content container that scrolls - adjust top padding to start higher */
.content-container {
  position: relative;
  z-index: 5;
  font-family: "Georgia", serif;
  color: black;
  padding-top: 20vh; /* Reduced from 40vh to 20vh to start content higher */
  min-height: 200vh;
}

/* Content text styling */
.content-text {
  width: 80%;
  max-width: 800px;
  margin: 0 auto 100px;
  background-color: transparent;
  position: relative;
}

/* Main content styling */
.main-content {
  margin-top: 40px;
  will-change: transform, opacity;
  transform: translateY(60px);
  opacity: 0;
}

/* Headlines section styling */
.horizontal-headlines-section {
  width: 85%;
  max-width: 1200px;
  margin: 180px auto 50px; /* Reduced bottom margin */
  opacity: 0;
}

.headlines-title {
  font-family: "Times New Roman", serif;
  font-size: calc(1.8rem + 0.5vw);
  margin-bottom: 70px;
  text-align: center;
  color: #222;
}

/* Headlines container layout */
.headlines-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  margin: 0 -30px 60px; /* Negative margin to allow headlines to extend beyond container */
  position: relative;
}

/* Headline items - slightly larger with overlap */
.headline-item {
  flex: 0 0 auto;
  width: 50%; /* Adjusted width */
  max-width: 500px;
  margin: 0 -5%; /* Negative margin creates overlap */
  opacity: 0;
  transform: translateY(50px);
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
}

/* Add hover effects and z-index changes for interaction */
.headline-item:hover {
  transform: translateY(-10px) scale(1.05);
  z-index: 10; /* Bring to front on hover */
}

/* Stagger the vertical position slightly to create a more dynamic layout */
.headline-item:nth-child(1) {
  transform: translateY(20px);
  z-index: 1;
}

.headline-item:nth-child(2) {
  z-index: 2;
}

.headline-item:nth-child(3) {
  transform: translateY(30px);
  z-index: 3;
}

/* Headline images styling */
.headline-image {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  background-color: white;
  padding: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* Rotate each headline slightly differently for a more organic look */
.headline-item:nth-child(1) .headline-image {
  transform: rotate(-2deg);
}

.headline-item:nth-child(2) .headline-image {
  transform: rotate(1deg);
}

.headline-item:nth-child(3) .headline-image {
  transform: rotate(-1deg);
}

/* Add hover effect */
.headline-image:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Make sure images inside don't exceed container width */
.headline-image img {
  width: 100%;
  height: auto;
  display: block;
}

/* Citation styling */
.citation-headlines-archive {
  text-align: right;
  margin-top: 100px;
  font-size: 14px;
  font-style: italic;
  opacity: 0.8;
  color: rgba(128, 128, 128, 0.874);
}

/* Spacer element */
.section-end-spacer {
  height: 25vh; /* Reduced height */
  width: 100%;
}

/* General text styling */
h3 {
  font-size: 22px;
}

.citation-link {
  color: rgba(8, 8, 8, 0.8);
  text-decoration: transparent;
  transition: color 0.2s;
  font-style: italic;
}

.citation-link:hover {
  color: #333;
  text-decoration: underline;
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

/* Bg2 section styling - adjusted to be more to the left */
.bg2-section {
  width: 85%;
  max-width: 1000px;
  margin: 180px auto 80px;
  font-family: "Helvetica", sans-serif;
  opacity: 0;
  position: relative;
  padding-left: 5%; /* Add padding to shift content left */
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}

.date {
  margin-left: 0;
  font-size: 1.5rem;
  margin-top: 80px;
  font-family: "Helvetica";
  color: rgba(0, 0, 0, 0.694);
  text-align: left;
  display: block;
  font-style: italic;
}

.backgroundTitle {
  font-family: "Helvetica";
  font-size: calc(2.8rem + 1vw);
  margin-top: 0px;
  margin-bottom: 20px;
  width: 100%;
  color: black;
  text-align: left;
  padding-left: 0;
}

.bg2-content-container {
  margin-top: 40px;
  width: 90%;
  text-align: left;
  margin-left: 0; /* Align to the left edge */
}

.paragraph-section {
  color: rgb(48, 48, 48);
  font-family: "Helvetica";
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.3rem;
  opacity: 0;
  text-align: left;
}

.quote {
  padding-left: 20px;
  font-style: italic;
  border-left: 3px solid rgba(0, 0, 0, 0.2); /* Add a subtle left border to quotes */
}

.highlight {
  background-color: rgb(255, 255, 255);
  color: black;
  padding: 0 4px; /* Horizontal padding only */
  display: inline-block;
  line-height: 1.1;
  position: relative;
  font-weight: 600;
  transform: translateY(0);
}

/* Media queries for responsive layout */
@media (max-width: 992px) {
  .headlines-container {
    flex-direction: column;
    align-items: center;
    margin: 0 auto 60px;
    max-width: 600px;
  }

  .headline-item {
    width: 90%;
    margin: -20px 0; /* Adjusted overlap */
    max-width: 550px;
  }

  /* Adjust z-index to ensure proper stacking */
  .headline-item:nth-child(1) {
    z-index: 3;
    transform: translateY(0) rotate(-2deg);
  }

  .headline-item:nth-child(2) {
    z-index: 2;
    transform: translateY(0) rotate(1deg);
  }

  .headline-item:nth-child(3) {
    z-index: 1;
    transform: translateY(0) rotate(-1deg);
  }
}

@media (max-width: 768px) {
  .content-text,
  .horizontal-headlines-section {
    width: 90%;
  }

  .headline-item {
    width: 100%;
    max-width: 500px;
    margin: -10px auto 20px; /* Adjusted for mobile */
  }

  .headline-image {
    padding: 12px;
  }

  .content-text h3 {
    font-size: calc(0.9rem + 0.2vw);
  }

  .content-container {
    padding-top: 30vh;
  }

  .bg2-section {
    width: 90%;
    margin: 120px auto 60px;
    padding-left: 2%; /* Less padding on mobile */
  }

  .bg2-content-container {
    width: 95%; /* Wider on mobile */
  }

  .backgroundTitle {
    font-size: calc(2.2rem + 1vw);
  }

  .paragraph-section {
    font-size: 1rem;
  }
}
</style>
