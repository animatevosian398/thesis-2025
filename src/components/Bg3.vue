<template>
  <div class="background-section" ref="bgSection">
    <div class="image-container" ref="imageContainer">
      <!-- <img
        src="/src/assets/images/un-genocide-convention.jpg"
        alt="UN Genocide Convention Document"
        class="background-image"
        ref="bgImage"
      /> -->
      <div class="citation-container">
        <p class="citation">Source: United Nations Archives</p>
      </div>
    </div>
    <h1 class="backgroundTitle">Defining Genocide</h1>
    <div class="content-text">
      <div class="definition un-definition">
        <h3>United Nations Convention, 1948</h3>
        <p>
          "Acts committed with intent to destroy, in whole or in part, a
          national, ethnical, racial or religious group..."
        </p>
      </div>
      <div class="definition turkish-stance">
        <h3>Turkish Government Position</h3>
        <p>
          "Inter-communal conflict," "Civil war casualties," "Wartime
          relocation"
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// import MediaCoveragePast from "../components/MediaCoveragePast.vue";

gsap.registerPlugin(ScrollTrigger);

const bgSection = ref(null);
const imageContainer = ref(null);
const bgImage = ref(null);

onMounted(() => {
  gsap.from(".definition", {
    scrollTrigger: {
      trigger: ".content-text",
      start: "top center",
      end: "bottom center",
      scrub: 1,
    },
    opacity: 0,
    y: 50,
    stagger: 0.5,
  });
});
</script>

<style scoped>
.content-text {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  margin-top: 40px;
}

.definition {
  flex: 1;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
}

.un-definition {
  border-left: 3px solid #fff;
}

.turkish-stance {
  border-left: 3px solid #cc0000;
}

.definition h3 {
  font-family: "aktiv-grotesk", sans-serif;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.definition p {
  font-family: "aktiv-grotesk", sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}
</style>
