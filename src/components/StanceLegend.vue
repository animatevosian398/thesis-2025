<template>
  <div>
    <!-- Button at bottom left of screen -->
    <button class="legend-toggle-button" @click="toggleLegend">
      {{ isCollapsed ? "Show Legend" : "Hide Legend" }}
    </button>

    <!-- Legend panel also appears from bottom left -->
    <div
      v-if="isVisible"
      class="legend-container"
      :class="{ collapsed: isCollapsed }"
    >
      <div class="legend-content">
        <h3>Narratives</h3>
        <div class="stance-list">
          <div
            v-for="(color, stance) in stances"
            :key="stance"
            class="stance-item"
          >
            <div class="color-box" :style="{ backgroundColor: color }"></div>
            <span class="stance-label">{{ formatStance(stance) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isVisible = ref(true);

watch(
  () => route.path,
  (newPath) => {
    isVisible.value = !newPath.startsWith("/stance/");
  }
);
</script>

<script>
export default {
  name: "StanceLegend",
  data() {
    return {
      isCollapsed: true,
      stances: {
        Historical_Affirmation: "#4CAF50",
        Personal_Testimony: "#7A485D",
        Explicit_Denial: "#E53734",
        Minimization_Reframing: "#658B88",
        Justification_Narrative: "#FAFF6B",
        Contemporary_Comparison: "#2E4D46",
        Deflecting_Debating_Evidence: "#FBA423",
        Historical_Inversion: "#979C63",
        Sympathy_Memorial: "#40414A",
        Apology: "#2738EC",
        Discussion_About_Denial: "#841A26",
        Reconciliation_Discourse: "#005275",
      },
    };
  },
  methods: {
    toggleLegend() {
      this.isCollapsed = !this.isCollapsed;
      console.log("Legend toggled, isCollapsed:", this.isCollapsed);
    },
    formatStance(stance) {
      return stance.replace(/_/g, " ");
    },
  },
  mounted() {
    console.log(
      "StanceLegend component mounted - check if this appears in console"
    );
  },
};
</script>

<style scoped>
/* Button at bottom left of screen */
.legend-toggle-button {
  position: fixed;
  left: 30px;
  bottom: 20px;
  background: rgba(255, 255, 255, 0.593);
  color: rgb(38, 37, 37);
  font-family: "General Sans", sans-serif;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px 15px;
  border-radius: 30px;
  cursor: pointer;
  z-index: 1001;
  font-size: 14px;
}

/* Legend panel also at bottom left */
.legend-container {
  position: fixed;
  left: 20px;
  bottom: 70px; /* Positioned above the button */
  background: rgba(0, 0, 0, 0.054);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  padding: 1rem;
  color: white;
  z-index: 1000;
  transition: transform 0.3s ease, opacity 0.3s ease;
  width: 300px;
  opacity: 1;
}

.collapsed {
  transform: translateY(20px);
  opacity: 0;
  pointer-events: none; /* Prevents interaction when hidden */
}

.legend-content {
  width: 100%;
  max-height: 60vh; /* Prevent it from being too tall */
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.legend-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

.stance-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stance-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.color-box {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  flex-shrink: 0;
}

.stance-label {
  font-size: 0.9rem;
  opacity: 0.9;
  font-family: "Courier New", Courier, monospace;
  color: rgb(29, 29, 29);
}

h3 {
  background-color: transparent;
  margin-top: 0;
  color: rgb(29, 29, 29);
  margin-bottom: 1rem;
  font-family: "Courier New", Courier, monospace;
}
</style>
