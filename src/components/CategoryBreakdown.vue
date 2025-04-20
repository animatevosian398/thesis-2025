<template>
  <div class="chart-container">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <div ref="chartContainer" class="vis-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import * as d3 from "d3";
import Papa from "papaparse";

const chartContainer = ref(null);
const loading = ref(true);
const error = ref(null);

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

// Option 1: Using a static import if your build system supports it
// import csvPath from '@/assets/stance_count.csv?url';

const loadCSVData = async () => {
  try {
    const csvPath = "/assets/stance_count.csv"; // Path relative to public directory
    console.log("Loading CSV from:", csvPath);

    const response = await fetch(csvPath);

    if (!response.ok) {
      throw new Error(`Failed to load data (HTTP ${response.status})`);
    }

    const csvText = await response.text();
    console.log(
      "CSV loaded successfully, first 100 chars:",
      csvText.substring(0, 100)
    );

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log("Parsed data rows:", results.data.length);
          resolve(results.data);
        },
        error: (error) => reject(error),
      });
    });
  } catch (err) {
    console.error("CSV load error:", err);
    throw err;
  }
};

const createChart = async () => {
  if (!chartContainer.value) {
    error.value = "Chart container not available";
    return;
  }
  try {
    const data = await loadCSVData();
    // Chart creation code here
    loading.value = false;
  } catch (err) {
    error.value = err.message;
    loading.value = false;
  }
};

const renderChart = async () => {
  // Add retry mechanism
  let retries = 0;
  const maxRetries = 3;

  while (!chartContainer.value && retries < maxRetries) {
    console.log(
      `Chart container not ready, retrying (${retries + 1}/${maxRetries})...`
    );
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait 100ms
    retries++;
  }

  if (!chartContainer.value) {
    console.error("Chart container not available after retries");
    error.value =
      "Chart container not available - please try refreshing the page";
    loading.value = false;
    return;
  }

  try {
    const data = await loadCSVData();

    // Validate data structure
    if (!data || !data.length) {
      throw new Error("No data available to display");
    }

    if (!data[0].hasOwnProperty("stance") || !data[0].hasOwnProperty("count")) {
      throw new Error("Data missing required 'stance' or 'count' properties");
    }

    // Clear any existing chart
    d3.select(chartContainer.value).selectAll("*").remove();

    const width = chartContainer.value.clientWidth || 800;
    const height = chartContainer.value.clientHeight || 800;
    const radius = Math.min(width, height) / 2 - 50;

    const svg = d3
      .select(chartContainer.value)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const pie = d3
      .pie()
      .value((d) => d.count)
      .sort(null);

    const arc = d3
      .arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);

    // Convert numeric strings to numbers if needed
    const processedData = data.map((d) => ({
      stance: d.stance,
      count: typeof d.count === "string" ? parseInt(d.count, 10) : d.count,
    }));

    const arcs = svg
      .selectAll("path")
      .data(pie(processedData))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => stanceColors[d.data.stance] || "#CCCCCC");
    //   .attr("stroke", "white")
    //   .attr("stroke-width", "0px");

    // Add labels
    const outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    svg
      .selectAll("text")
      .data(pie(processedData))
      .enter()
      .append("text")
      .attr("transform", (d) => {
        const pos = outerArc.centroid(d);
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.95 * (midAngle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      })
      .attr("dy", ".35em")
      .style("text-anchor", (d) => {
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midAngle < Math.PI ? "start" : "end";
      })
      .style("fill", "white")
      .text((d) => d.data.stance);

    // Add connecting lines
    svg
      .selectAll("polyline")
      .data(pie(processedData))
      .enter()
      .append("polyline")
      .attr("points", (d) => {
        const pos = outerArc.centroid(d);
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.95 * (midAngle < Math.PI ? 1 : -1);
        return [arc.centroid(d), outerArc.centroid(d), pos];
      })
      .style("fill", "none")
      .style("stroke", "white")
      .style("stroke-width", "1px");

    loading.value = false;
  } catch (err) {
    console.error("Render error:", err);
    error.value = err.message;
    loading.value = false;
  }
};

// Watch for container mount and window resize
onMounted(() => {
  // Use nextTick to ensure the DOM is fully updated
  nextTick(() => {
    if (chartContainer.value) {
      console.log("Chart container found, rendering chart");
      renderChart();

      // Handle window resize
      window.addEventListener("resize", () => {
        if (!loading.value) renderChart();
      });
    } else {
      console.error("Chart container not available after nextTick");
      error.value = "Chart container not available";
      loading.value = false;
    }
  });
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
}

.vis-container {
  width: 800px;
  height: 800px;
  position: relative;
}

.error-message {
  color: red;
  text-align: center;
}
</style>
