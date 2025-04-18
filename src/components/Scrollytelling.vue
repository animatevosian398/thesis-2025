<template>
  <div class="scrollytelling-container">
    <!-- Steps -->
    <div class="steps">
      <div class="step" v-for="(step, index) in steps" :key="index">
        <h2>{{ step.title }}</h2>
        <p>{{ step.content }}</p>
      </div>
    </div>

    <!-- Fixed visual -->
    <VisualDisplay :step="currentStep" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Scrollama from "scrollama";
import VisualDisplay from "./VisualDisplay.vue";

const steps = [
  { title: "Intro", content: "Welcome to the story." },
  { title: "Chapter 1", content: "This is the first section." },
  { title: "Chapter 2", content: "Here’s something new." },
];

const currentStep = ref(0);

onMounted(() => {
  const scroller = Scrollama();

  scroller
    .setup({
      step: ".step",
      offset: 0.5,
    })
    .onStepEnter(({ index }) => {
      currentStep.value = index;
    });
});
</script>

<style scoped>
.scrollytelling-container {
  display: flex;
  position: relative;
}

.steps {
  width: 50%;
  padding-right: 2rem;
}

.step {
  height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
}
</style>
