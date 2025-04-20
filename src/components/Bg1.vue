<template>
  <div id="background-section" class="background-section" ref="bgSection">
    <div class="image-container" ref="imageContainer">
      <img
        src="/src/assets/images/Norway_Photo_Bones.jpg"
        alt="Background"
        class="background-image"
        ref="bgImage"
      />
    </div>
    <p class="citation">Source: Norwegian Royal Archives Collection</p>
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
        <br />
        Despite this evidence, Turkey still refuses to recognize these events as
        genocide, instead calling them a relocation necessary during wartime.
        For Armenians worldwide, especially those whose family members survived
        and fled to other countries, this history remains deeply personal and
        important to remember.
      </h3>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bgSection = ref(null);
const imageContainer = ref(null);
const bgImage = ref(null);
const route = useRoute();

onMounted(() => {
  // Check if we came directly to the background page via navbar
  const isDirectNavigation =
    route.hash === "#background" || route.path.includes("background");

  if (isDirectNavigation) {
    // Position the page at the top when directly navigating to background
    window.scrollTo(0, 0);

    // Optionally add a small delay to ensure elements are properly rendered
    setTimeout(() => {
      if (bgSection.value) {
        // Make sure the section is visible at the top of the viewport
        bgSection.value.scrollIntoView({ behavior: "auto", block: "start" });
      }
    }, 100);
  }

  // Setup GSAP animation
  gsap.to(".background-image", {
    scrollTrigger: {
      trigger: ".background-section",
      start: "top 20%",
      end: "bottom 80%",
      scrub: 0.5,
    },
    opacity: 0.7,
    scale: 1.05,
    duration: 1.5,
  });
});
</script>

<style scoped>
.background-section {
  height: 100vh;
  background-color: black;
  color: white;
  position: relative;
  padding: 80px 0 0 8%; /* Increased top padding */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  scroll-margin-top: 0;
  align-items: flex-start; /* Align children to start */
}

.backgroundTitle {
  position: relative;
  z-index: 2;
  margin-top: 50px; /* Reduced margin */
  margin-bottom: 0px;
  margin-left: 0%;
  font-size: calc(3.6rem + 1vw); /* Responsive font size */
  width: 50%; /* Control width */
  text-align: left; /* Ensure left alignment */
}

.image-container {
  position: absolute;
  top: 24%; /* Moved higher */
  right: -4%;
  width: 80%;
  height: 75%;
  z-index: 1;
  overflow: visible;
}

.background-image {
  width: 90%;
  height: 100%;

  object-fit: cover;
  mix-blend-mode: difference;
  will-change: transform, opacity;
}

.content-text {
  position: relative;
  z-index: 2;
  max-width: 65%; /* Slightly narrower */
  margin-top: 50px; /* Adjusted spacing */
  color: rgb(255, 255, 255);
  display: flex;
  margin-left: 17%;
  padding: 10px;
  flex-direction: column;
  justify-content: flex-start;
}

.content-text h3 {
  font-size: calc(1rem + 0.3vw); /* Responsive font size */
  line-height: 1.8; /* Increase line spacing */
  letter-spacing: normal; /* Slight letter spacing */
  font-weight: normal; /* Less heavy */
  margin: 0;

  margin-top: 100px; /* Increased margin */
  margin-left: -220px;
}

.citation {
  position: absolute;
  bottom: 5%;
  right: 1%;
  font-size: 0.8em;
  color: #474747;
  z-index: 2;
  text-align: right;
}

/* Added additional media queries for better responsiveness */
@media (max-height: 800px) {
  .content-text h3 {
    font-size: calc(0.9rem + 0.2vw);
    line-height: 1.3;
  }

  .backgroundTitle {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .content-text {
    margin-top: 10px;
  }
}

@media (max-width: 768px) {
  .content-text {
    max-width: 85%;
  }

  .image-container {
    width: 90%;
    right: -5%;
  }

  .citation {
    right: 5%;
    bottom: 5%;
    font-size: 0.7em;
  }
}
</style>
