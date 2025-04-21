<template>
  <div class="background-section" ref="framingSection">
    <h1 class="backgroundTitle">Current TR Gov / Media Framing</h1>
    <div class="content-text">
      <div class="visualization-placeholder">
        [Visualization: NYT Articles Analysis 1915-1920]
      </div>
      <p>Current Framing</p>
      <ul>
        <li>Mass Killings & Atrocities</li>
        <li>Systematic Deportations</li>
        <li>Religious/Ethnic Persecution</li>
        <li>War-time Casualties</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const framingSection = ref(null);

onMounted(() => {
  gsap.from(".content-text", {
    scrollTrigger: {
      trigger: ".content-text",
      start: "top center",
      end: "bottom center",
      scrub: 1,
    },
    opacity: 0,
    y: 50,
  });
});
</script>

<style scoped>
.background-section {
  height: 110vh;
  background-color: black;
  color: white;
  position: relative;
  padding: 80px 0 0 8%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  scroll-margin-top: 0;
  align-items: flex-start;
}

.backgroundTitle {
  position: relative;
  z-index: 2;
  margin-top: 60px;
  margin-bottom: 20px;
  margin-left: 2%;
  font-size: calc(3.6rem + 1vw);
  width: 50%;
  text-align: left;
  font-family: "aktiv-grotesk", sans-serif;
}

.content-text {
  position: relative;
  z-index: 2;
  max-width: 65%;
  margin-top: 20px;
  color: rgb(255, 255, 255);
  margin-left: 20%;
  font-family: "aktiv-grotesk", sans-serif;
  line-height: 1.8;
}

.visualization-placeholder {
  width: 100%;
  height: 400px;
  border: 1px dashed #666;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
  color: #666;
}

ul {
  margin-top: 20px;
  padding-left: 20px;
}

li {
  margin: 10px 0;
}
</style>
