<template>
  <div>
    <!-- Button at bottom left of screen -->
    <button class="legend-toggle-button" @click="toggleLegend">
      {{ isCollapsed ? "Legend" : "Hide Legend" }}
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
  background: rgba(255, 255, 255, 0.7);
  color: rgb(38, 37, 37);
  font-family: "General Sans", sans-serif;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px 15px;
  border-radius: 30px;
  cursor: pointer;
  z-index: 1001;
  font-size: 14px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Legend panel also at bottom left */
.legend-container {
  position: fixed;
  left: 20px;
  bottom: 70px;
  background: rgba(255, 255, 255, 0.196); /* More visible background */
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  padding: 1.5rem;
  color: black;
  z-index: 1000;
  transition: transform 0.3s ease, opacity 0.3s ease;
  width: 380px; /* Wider panel */
  max-width: calc(100vw - 40px);
  opacity: 1;
  max-height: 80vh;
  overflow-y: auto;
  min-height: 200px; /* Ensure minimum height */
  height: auto; /* Allow content to determine height */
  display: block; /* Ensure proper display */
}

.collapsed {
  transform: translateY(20px);
  opacity: 0;
  pointer-events: none;
}

.legend-content {
  width: 100%;
}

.stance-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.stance-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 4px 0;
  min-height: 24px;
}

.color-box {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.stance-label {
  font-size: 0.7rem;
  font-weight: 500;
  opacity: 1;
  font-family: "Courier New", Courier, monospace;
  color: rgb(29, 29, 29);
  word-break: normal;
  white-space: normal;
}

h3 {
  background-color: transparent;
  margin-top: 0;
  color: rgb(29, 29, 29);
  margin-bottom: 1rem;
  font-family: "Courier New", Courier, monospace;
  font-size: 1.2rem;
  font-weight: bold;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .stance-list {
    grid-template-columns: 1fr; /* Single column on smaller screens */
  }

  .legend-container {
    width: 320px;
    padding: 1rem;
  }
}

@media (max-width: 576px) {
  .legend-toggle-button {
    left: 15px;
    bottom: 15px;
    padding: 8px 12px;
  }

  .stance-item {
    gap: 0.5rem;
  }

  .color-box {
    width: 14px;
    height: 14px;
  }

  .stance-label {
    font-size: 0.85rem;
  }

  h3 {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
