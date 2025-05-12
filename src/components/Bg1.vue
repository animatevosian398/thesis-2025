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
            were arrested and killed, followed by widespread deportations of
            ordinary people from their homes to the Syrian and Iraqi deserts.
            This was the beginning of the Armenian Genocide, organized by the
            Young Turks of the Ottoman Empire. An estimated 1.5 million
            Armenians were killed; this was not a singular event, but rather
            came about after a "long-simmering Ottoman hatred of the Armenians
            dating to Sultan Abdul Hamid II and his slaughters in the 1890s,"
            known as the Hamidian Massacres.
            <a
              href="https://genocideeducation.org/books/the-burning-tigris-the-armenian-genocide-and-americas-response/"
              target="_blank"
              class="citation-link"
              >(Balakian)</a
            >

            <br /><br />
            The events of the Genocide were well-documented by journalists,
            missionaries, and diplomats at the time, with photographs and
            eyewitness accounts. For Armenians worldwide, especially those whose
            family members survived and fled to other countries, this history
            remains deeply personal and important to remember.
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

      <!-- Add this new section just before the bg2-section div -->
      <div class="quote-transition-section" ref="quoteTransition">
        <div class="quote-container">
          <h2 class="date">Post-1915</h2>
          <h1 class="backgroundTitle" ref="bg2Title">
            Turkey's <span class="highlight-denial">Denial</span>
          </h1>
          <blockquote class="transition-quote">
            Loss of life, regardless of numbers and regardless of possible guilt
            on the part of the victims, is tragic and must be remembered.
            However,
            <span class="highlight-denial-quote"
              >it is factually problematic, morally unsound and legally
              unfounded to call this episode a "genocide."</span
            >
            <cite>
              -
              <a
                href="https://www.mfa.gov.tr/the-events-of-1915-and-the-turkish-armenian-controversy-over-history_-an-overview.en.mfa"
                target="_blank"
                rel="noopener"
                class="citation-link"
              >
                Republic of Turkey Ministry of Foreign Affairs
              </a>
            </cite>
          </blockquote>
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
            Turkey's official stance on The Genocide evolved from silence to a
            more complicated form of denial and revisionist reframing of
            history. "Ankara does not accept the alleged "genocide," but
            acknowledges there were casualties on both sides during World War I"
            <a
              href="https://www.aa.com.tr/en/politics/turkish-vp-no-one-can-defame-turkey-over-1915-events/1269655"
              target="_blank"
              class="citation-link"
              >(Anadolu Agency, 2018)</a
            >. The government even frames the events as a relocation for the
            Armenian deportees' own safety. This was justified due to the
            suspected Armenian alliances with Russia. This relocation was
            essentially a death march through the Syrian desert, where many were
            killed and died from starvation, disease, and violence.
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

      <!-- New section with typography-focused design -->
      <div class="terminology-section" ref="terminologySection">
        <div class="terminology-content">
          <h2 class="terminology-title">Language of Denial</h2>

          <div class="terminology-text-media">
            <div class="terminology-text">
              <p>
                Words like <span class="term-highlight">incident</span>,
                <span class="term-highlight">so-called</span>,
                <span class="term-highlight">1915 events</span>,
                <span class="term-highlight">claims</span> deny, cast doubt, and
                create distance from historical reality while framing the
                discourse in terms favorable to the Turkish government position.
              </p>

              <p class="note-text">
                When "genocide" appears in Turkish state media referencing this
                subject, it's in the context of rejecting other countries'
                recognition of the Armenian Genocide to express disapproval.
                Terms such as
                <span class="term-highlight">slams</span>,
                <span class="term-highlight">rejects</span>, and
                <span class="term-highlight">condemns</span>
                are used to describe Turkey's response to people, countries, and
                institutions that recognize the genocide or pass resolutions.
              </p>
            </div>

            <div class="media-examples">
              <div class="media-example">
                <img
                  src="/assets/AA_4_headline_2.png"
                  alt="Example of denial terminology in media"
                />
              </div>
              <div class="media-example">
                <img
                  src="/assets/AA_2_headline.png"
                  alt="Official statement using distancing language"
                />
              </div>
              <div class="media-example">
                <img
                  src="/assets/AA_3_headline.png"
                  alt="International coverage of terminology debate"
                />
              </div>
            </div>
          </div>
          <div class="terminology-citation">
            <div class="citation-sources">
              <a
                href="https://www.aa.com.tr/en/europe/turkey-rejects-report-over-so-called-genocide-request/593401"
                target="_blank"
                rel="noopener"
                class="citation-link"
                >Anadolu Agency (2021);
              </a>
              <a
                href="https://www.aa.com.tr/en/politics/bidens-remarks-on-1915-events-null-and-void/2219662"
                target="_blank"
                rel="noopener"
                class="citation-link"
                >Anadolu Agency (2021);
              </a>
              <a
                href="https://www.aa.com.tr/en/politics/there-are-no-genocides-massacres-in-history-of-turkish-nation/2219593"
                target="_blank"
                rel="noopener"
                class="citation-link"
                >Anadolu Agency (2021);
              </a>
            </div>
          </div>
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
const bg2Para4 = ref(null);

// New terminology section reference
const terminologySection = ref(null);

// New quote transition section reference
const quoteTransition = ref(null);

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
    setupQuoteTransitionAnimation(); // Add this line
    setupBg2Animations();
    setupTerminologyAnimation(); // Add new animation setup

    // Position the page properly when navigating directly to background
    if (isDirectNavigation.value) {
      // Instead, immediately show the content without animations
      gsap.set(contentText.value, { opacity: 1, y: 0 });
      gsap.set(titleElement.value, { opacity: 1, y: 0 });
      gsap.set(mainContent.value, { opacity: 1, y: 0 });

      // Also make sure headlines section is visible
      gsap.set(headlinesSection.value, { opacity: 1 });
      gsap.set([headline1.value, headline2.value, headline3.value], {
        opacity: 1,
        y: 0,
        scale: 1,
      });

      // Also make sure quote transition is visible
      gsap.set(quoteTransition.value, { opacity: 1, y: 0 });
    }
  }, 300);

  // Handle window resize for responsive adjustments
  window.addEventListener("resize", handleResize);
});

// Add a new function to set up terminology section animations
function setupTerminologyAnimation() {
  // Set initial states for terminology elements
  gsap.set(terminologySection.value, { opacity: 0, y: 30 });

  // Create a timeline for terminology elements
  const terminologyTl = gsap.timeline({
    scrollTrigger: {
      trigger: terminologySection.value,
      start: "top 70%", // Start animation when terminology section is 70% from the top
      toggleActions: "play none play reverse", // Play on scroll down, reverse on scroll up
    },
  });

  // Animate terminology section
  terminologyTl.to(terminologySection.value, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
  });
}

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

// Add a new function to set up quote transition animation
function setupQuoteTransitionAnimation() {
  // Set initial state
  gsap.set(quoteTransition.value, { opacity: 0, y: 30 });

  // Create timeline for quote transition
  const quoteTl = gsap.timeline({
    scrollTrigger: {
      trigger: quoteTransition.value,
      start: "top 70%",
      toggleActions: "play none play reverse",
    },
  });

  // Animate the quote section
  quoteTl.to(quoteTransition.value, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power2.out",
  });
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
  min-height: 100vh; /* Changed from 150vh to ensure it fills screen without forcing excess scrolling */
  width: 100%;
  color: white;
  overflow: visible;
  background-color: white;
}

.nyt-quote {
  padding-top: 20px;
}

/* Content container with improved spacing */
.content-container {
  position: relative;
  z-index: 5;
  font-family: "Georgia", serif;
  color: black;
  padding-top: clamp(
    200px,
    40vh,
    500px
  ); /* Significantly increased top padding */
  /* Using clamp for responsive padding */
  min-height: 150vh; /* Reduced from 200vh */
  width: 100%;
  max-width: 100%;
}

/* Content text styling with improved width */
.content-text {
  width: clamp(300px, 80%, 900px); /* Using clamp for responsive width */
  margin: 0 auto 5rem; /* Using rem instead of fixed pixels */
  background-color: transparent;
  position: relative;
}

/* Main content styling */
.main-content {
  margin-top: clamp(20px, 5vh, 60px); /* Responsive margin */
  will-change: transform, opacity;
  transform: translateY(60px);
  opacity: 0;
}

/* Adjusted spacing for headlines section - made larger and moved down */
.horizontal-headlines-section {
  width: clamp(300px, 90%, 1400px);
  margin: clamp(120px, 25vh, 300px) auto clamp(120px, 20vh, 250px); /* Significantly increased top and bottom margins */
  opacity: 0;
  padding: 60px 0; /* Added vertical padding for more internal space */
}

.headlines-title {
  font-family: "Times New Roman", serif;
  font-size: calc(2rem + 0.5vw);
  margin-bottom: 100px;
  text-align: center;
  color: #222;
}

/* Headlines container layout - fixed overlap issues */
.headlines-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap; /* Changed from nowrap to help with smaller screens */
  margin: 0 auto 80px; /* Increased bottom margin from ~60px to 80px */
  gap: 30px; /* Added gap for spacing when wrapped */
  position: relative;
}

/* Headline items with improved sizing */
.headline-item {
  flex: 1 1 350px; /* Allow items to grow and shrink with min width */
  max-width: 500px; /* Capped maximum width */
  margin: 0; /* Removed negative margins that caused overlap issues */
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
  padding: 25px;
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
  margin-top: 70px; /* Reduced from 100px to 50px */
  font-size: 16px;
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
  margin-top: clamp(
    80px,
    15vh,
    200px
  ); /* Added top margin to push down further */

  margin-bottom: 30px;
  width: 100%;
  color: black;
  text-align: left;
  padding-left: 0;
  will-change: transform, opacity;
  transform: translateY(30px);
  opacity: 0;
}

/* Bg2 section styling - improved layout */
.bg2-section {
  width: clamp(300px, 85%, 1200px); /* Wider maximum width */
  margin: clamp(40px, 8vh, 120px) auto; /* Responsive margins */
  font-family: "Times New Roman", serif;
  opacity: 0;
  position: relative;
  padding: 0 clamp(10px, 3vw, 40px); /* Added horizontal padding that scales */
}

.date {
  margin-left: 0;
  font-size: 1.5rem;
  margin-top: 80px;
  font-family: "Times New Roman", serif;
  color: rgba(0, 0, 0, 0.694);
  text-align: left;
  display: block;
  font-style: italic;
}

.backgroundTitle {
  /* font-family: "Helvetica"; */
  font-family: "Times New Roman", serif;
  font-size: clamp(2rem, 5vw, 3.5rem); /* Responsive font size */
  margin-top: 0;
  margin-bottom: clamp(10px, 3vh, 30px); /* Responsive margin */
  width: 100%;
  color: black;
  text-align: left;
  padding-left: 0;
}

.bg2-content-container {
  margin-top: clamp(20px, 4vh, 60px); /* Responsive margin */
  width: 100%; /* Full width to avoid squishing */
  text-align: left;
  color: black;
}

.paragraph-section {
  color: rgb(0, 0, 0);
  /* font-family: "Helvetica"; */
  font-family: "Times New Roman", serif;
  /* font-family: "Helvetica", serif; */
  font-size: 1.3rem;
  line-height: 1.2;
  margin-bottom: 1rem;
  opacity: A0;
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

.highlight-denial-quote {
  color: rgb(0, 0, 0);
  font-weight: 600;
  background-color: rgba(255, 27, 27, 0.24);
}

.highlight-denial {
  color: rgb(255, 255, 255);
  font-weight: 600;
  background-color: rgb(0, 0, 0);
}
.highlight-nyt {
  font-weight: 600;
  background-color: rgba(235, 235, 235, 0.5);
  padding: 0 4px;
}

.quote-headline {
  font-style: italic;
  font-weight: 600;
}

/* New terminology section styling - redesigned for better spacing */
.terminology-section {
  width: 100%;
  max-width: 1400px;
  margin: clamp(60px, 10vh, 180px) auto clamp(40px, 6vh, 100px);
  padding: clamp(30px, 5vh, 80px) clamp(20px, 4vw, 60px); /* Responsive padding */
  background-color: #f5f5f7;
  opacity: 0;
  transform: translateY(30px);
}

.terminology-content {
  max-width: 1200px;
  margin: 0 auto;
}

.terminology-title {
  font-family: "Times New Roman", serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-style: italic;
  font-weight: 400;
  margin-top: 40px; /* Changed from 100px to 40px */
  margin-bottom: clamp(20px, 5vh, 60px);
  color: #000;
  text-align: left;
}

.terminology-text-media {
  display: flex;
  gap: clamp(20px, 4vw, 60px); /* Responsive gap */
  align-items: flex-start;
  flex-wrap: wrap; /* Allow wrapping on small screens */
}

.terminology-text {
  flex: 1 1 300px; /* Allow flexible sizing with minimum width */
  font-family: "Helvetica", Arial, sans-serif;
  font-size: clamp(1rem, 1.2vw, 1.3rem); /* Responsive font size */
  line-height: 1.6;
  text-align: left;
  color: #000;
}

.terminology-text p {
  margin-bottom: 24px;
}

.note-text {
  font-size: clamp(0.9rem, 1vw, 1rem);
  line-height: 1.5;
  text-align: left;
  margin-top: 30px;
}

/* Term highlight styling to match the screenshot */
.term-highlight {
  display: inline-block;
  background-color: #000;
  color: #fff;
  padding: 2px 6px;
  margin: 0 2px;
  font-family: "Helvetica", Arial, sans-serif;
}

/* Update media examples to zoom in a bit on the images */
.media-examples {
  flex: 1 1 300px; /* Allow flexible sizing with minimum width */
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 2vh, 25px); /* Responsive gap */
}

.media-example {
  width: 100%;
  overflow: hidden; /* This is important to crop the zoomed image */
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15); /* Slightly stronger shadow */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 3px; /* Slight rounding on the corners */
}

.media-example:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2); /* More pronounced shadow on hover */
}

.media-example img {
  width: 100%; /* Slightly wider than container to zoom in */
  height: auto;
  display: block;
  transition: transform 0.4s ease; /* Smooth transition for hover effect */
  margin: -1% 0; /* Negative margin to center the zoomed content */
}

.media-example:hover img {
  transform: scale(1); /* Zoom in a bit more on hover */
}

/* Citation styling for terminology section */
.terminology-citation {
  text-align: right;
  margin-top: 40px;
  font-size: 14px;
  font-style: italic;
  opacity: 0.8;
  color: rgba(128, 128, 128, 0.874);
}

.terminology-citation .citation-link {
  color: rgba(8, 8, 8, 0.8);
  text-decoration: none;
  transition: color 0.2s;
  font-style: italic;
}

.terminology-citation .citation-link:hover {
  color: #333;
  text-decoration: underline;
}

/* Add more vertical space between main sections */
.content-text + .horizontal-headlines-section {
  margin-top: clamp(120px, 30vh, 400px); /* Significantly increased */
}

.horizontal-headlines-section + .bg2-section {
  margin-top: clamp(120px, 30vh, 400px);
}

.bg2-section + .terminology-section {
  margin-top: clamp(120px, 30vh, 400px); /* Significantly increased */
}

/* Media queries for responsive layout */
@media (max-width: 1200px) {
  .content-text {
    width: 85%;
  }

  .bg2-section {
    width: 90%;
  }
}

@media (max-width: 992px) {
  .headlines-container {
    flex-direction: column;
    align-items: center;
    margin: 0 auto 80px;
  }

  .headline-item {
    width: 100%;
    max-width: 600px; /* Increased from 550px */
    margin: 20px 0; /* Increased from 15px */
  }

  .horizontal-headlines-section {
    margin-top: clamp(100px, 20vh, 250px);
    margin-bottom: clamp(100px, 20vh, 250px);
  }
}

@media (max-width: 768px) {
  .content-container {
    padding-top: 10vh; /* Reduced top padding */
  }

  .content-text {
    width: 90%;
    margin-bottom: 3rem;
  }

  .headlines-title {
    margin-bottom: 40px; /* Reduced spacing */
  }

  .terminology-section {
    padding: 30px 20px;
  }

  .headline-item {
    width: 100%;
    max-width: 500px;
    margin: 10px auto; /* Adjusted for mobile */
  }

  .headline-image {
    padding: 12px;
  }

  .content-text h3 {
    font-size: calc(0.9rem + 0.2vw);
  }
}

/* Additional mobile optimizations */
@media (max-width: 576px) {
  .bg1-title,
  .backgroundTitle {
    font-size: calc(1.8rem + 1vw); /* Smaller title on very small screens */
  }

  .terminology-title {
    font-size: 1.8rem;
  }

  .horizontal-headlines-section {
    margin-top: 60px; /* Less spacing on small screens */
  }

  .terminology-section {
    padding: 20px 15px;
  }

  .media-example {
    margin-bottom: 15px;
  }
}

/* Quote transition section styling */
.quote-transition-section {
  width: 100%;
  height: 100vh; /* Full viewport height */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: clamp(120px, 30vh, 400px) auto;
  opacity: 0; /* Start hidden for animation */
  transform: translateY(20px);
}

.quote-container {
  width: clamp(300px, 85%, 900px);
  text-align: center;
  padding: 0 clamp(20px, 5vw, 80px);
}

.transition-quote {
  font-family: "Times New Roman", serif;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  line-height: 1.4;
  color: #000;
  margin: 20px 0 40px;
  position: relative;
  font-style: italic;
}

.transition-quote::before {
  content: "“";
  font-size: 5rem;
  position: absolute;
  left: -30px;
  top: -40px;
  color: rgba(0, 0, 0, 0.1);
}

.transition-quote::after {
  content: "”";
  font-size: 5rem;
  position: absolute;
  right: -30px;
  bottom: -80px;
  color: rgba(0, 0, 0, 0.1);
}

.transition-quote cite {
  display: block;
  font-size: clamp(1rem, 1.5vw, 1.3rem);
  margin-top: 30px;
  font-style: normal;
  opacity: 0.8;
}
</style>
