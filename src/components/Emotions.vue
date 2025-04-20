<template>
  <div class="p-4">
    <div v-show="viewMode === 'wheel'" ref="wheelContainer"></div>
    <div v-show="viewMode === 'scatter'" ref="scatterContainer"></div>
    <button
      v-if="viewMode === 'scatter'"
      @click="goBack"
      class="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
    >
      Back to Wheel
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import * as d3 from "d3";

const viewMode = ref("wheel");
const wheelContainer = ref(null);
const scatterContainer = ref(null);

const emotionColors = {
  Anger: "#e74c3c",
  Joy: "#f1c40f",
  Sadness: "#3498db",
  Fear: "#9b59b6",
  Surprise: "#1abc9c",
  Disgust: "#2ecc71",
};

const data = [
  { comment: "This is outrageous!", dominant: "Anger" },
  { comment: "So happy about this!", dominant: "Joy" },
  { comment: "This made me cry...", dominant: "Sadness" },
  { comment: "I’m scared of what’s next", dominant: "Fear" },
  { comment: "Wow, didn’t expect that!", dominant: "Surprise" },
  { comment: "Ew, this is gross", dominant: "Disgust" },
  { comment: "Seriously upsetting...", dominant: "Anger" },
  { comment: "Yay!", dominant: "Joy" },
];

const selectedEmotionData = ref([]);

function renderPieChart() {
  const width = 300,
    height = 300,
    radius = Math.min(width, height) / 2;

  const svg = d3
    .select(wheelContainer.value)
    .html("") // Clear old
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const emotionCounts = d3.rollup(
    data,
    (v) => v.length,
    (d) => d.dominant
  );
  const pie = d3.pie().value((d) => d[1]);
  const arc = d3.arc().innerRadius(0).outerRadius(radius);
  const pieData = pie([...emotionCounts.entries()]);

  svg
    .selectAll("path")
    .data(pieData)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => emotionColors[d.data[0]])
    .style("cursor", "pointer")
    .on("click", async (event, d) => {
      selectedEmotionData.value = data.filter((c) => c.dominant === d.data[0]);
      viewMode.value = "scatter";
      await nextTick(); // ensure DOM is updated
      renderScatterplot();
    });

  svg
    .selectAll("text")
    .data(pieData)
    .enter()
    .append("text")
    .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .attr("fill", "#fff")
    .style("font-size", "12px")
    .text((d) => d.data[0]);
}

function renderScatterplot() {
  const width = 500,
    height = 400;

  const svg = d3
    .select(scatterContainer.value)
    .html("") // Clear previous content
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg
    .selectAll("circle")
    .data(selectedEmotionData.value)
    .enter()
    .append("circle")
    .attr("cx", () => Math.random() * width)
    .attr("cy", () => Math.random() * height)
    .attr("r", 6)
    .attr("fill", (d) => emotionColors[d.dominant])
    .attr("opacity", 0.7);

  svg
    .selectAll("text")
    .data(selectedEmotionData.value)
    .enter()
    .append("text")
    .attr("x", () => Math.random() * width)
    .attr("y", () => Math.random() * height)
    .attr("dy", -10)
    .attr("text-anchor", "middle")
    .attr("font-size", "11px")
    .attr("fill", "#333")
    .text((d) =>
      d.comment.length > 22 ? d.comment.slice(0, 22) + "…" : d.comment
    );
}

function goBack() {
  viewMode.value = "wheel";
  nextTick(() => {
    renderPieChart();
  });
}

onMounted(() => {
  renderPieChart();
});
</script>
