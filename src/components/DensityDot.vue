<template>
  <div class="chart-container">
    <h1 class="chart-title">Comment Volume by Stance</h1>
    <p class="chart-subtitle">Each dot represents one comment</p>
    <div class="stance-chart">
      <div v-for="(item, index) in chartData" :key="index" class="stance-row">
        <div class="stance-header">
          <div class="stance-label">{{ item.stance }}</div>
          <div class="count-label">{{ item.count }} comments</div>
        </div>
        <div
          class="dots-container"
          :style="{ backgroundColor: `${getColor(item.stance)}15` }"
        >
          <div
            v-for="n in item.count"
            :key="n"
            class="dot"
            :style="{ backgroundColor: getColor(item.stance) }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Real data provided
const chartData = ref([
  { stance: "Contemporary_Comparison", count: 2417 },
  { stance: "Historical_Affirmation", count: 1465 },
  { stance: "Discussion_About_Denial", count: 1281 },
  { stance: "Justification_Narrative", count: 1206 },
  { stance: "Competitive_Victimhood_Historical_Inversion", count: 911 },
  { stance: "Explicit_Denial", count: 882 },
  { stance: "Minimization_Reframing", count: 760 },
  { stance: "Sympathy_Memorial_Commemorative", count: 501 },
  { stance: "Procedural_Deflection_Evidence_Archives", count: 477 },
  { stance: "Personal_Testimony", count: 290 },
  { stance: "Reconciliation_Discourse", count: 154 },
  { stance: "Apology", count: 54 },
]);

// Define color scheme for stances
const stanceColors = {
  Apology: "#48D1CC", // Turquoise
  Historical_Affirmation: "#4169E1", // Royal Blue
  Competitive_Victimhood_Historical_Inversion: "#839d2b", // Olive
  Explicit_Denial: "#e53935", // Red
  Justification_Narrative: "#ff9900", // Orange
  Personal_Testimony: "#DDA0DD", // Plum
  Contemporary_Comparison: "#4caf50", // Green
  Discussion_About_Denial: "#40E0D0", // Turquoise
  Minimization_Reframing: "#87b2c2", // Light Blue
  Reconciliation_Discourse: "#20B2AA", // Light Sea Green
  Sympathy_Memorial_Commemorative: "#F4A460", // Sandy Brown
  Procedural_Deflection_Evidence_Archives: "#5d3a6c", // Purple
};

function getColor(stance) {
  return stanceColors[stance] || "#cccccc";
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #111;
  color: white;
  font-family: Arial, sans-serif;
}

.chart-title {
  text-align: center;
  margin-bottom: 5px;
}

.chart-subtitle {
  text-align: center;
  margin-bottom: 30px;
  font-style: italic;
  opacity: 0.7;
}

.stance-chart {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.stance-row {
  display: flex;
  flex-direction: column;
}

.stance-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.stance-label {
  font-weight: bold;
  font-size: 16px;
}

.count-label {
  font-weight: bold;
}

.dots-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  padding: 10px;
  border-radius: 4px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

@media (max-width: 768px) {
  .dot {
    width: 4px;
    height: 4px;
  }

  .dots-container {
    gap: 1px;
  }
}
</style>
