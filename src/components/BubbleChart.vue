<template>
  <div class="chart-container">
    <h2 class="chart-title">Narratives</h2>
    <div class="chart-wrapper">
      <div ref="chartContainer" class="vis-container"></div>

      <!-- Comments overlay with hover detection -->
      <transition name="fade">
        <div
          v-if="activeStance"
          class="comments-overlay"
          :style="commentsPosition"
          @mouseenter="keepCommentsVisible = true"
          @mouseleave="handleCommentsLeave"
        >
          <h3 class="comments-title">{{ formatStance(activeStance) }}</h3>
          <div class="comments-container">
            <p
              v-for="(comment, index) in activeComments"
              :key="index"
              class="comment-text"
              :style="{
                opacity: 0.3 + Math.random() * 0.7,
                transform: `rotate(${-5 + Math.random() * 10}deg)`,
              }"
            >
              {{ comment }}
            </p>
          </div>
          <div
            class="view-all-link"
            @click="navigateToStancePage(activeStance)"
          >
            <!-- View all comments → -->
          </div>
        </div>
      </transition>
    </div>
    <div class="legend-container">
      <button
        v-for="(item, index) in data"
        :key="index"
        class="legend-item"
        @click="navigateToStancePage(item.stance)"
      >
        <div
          class="legend-color"
          :style="{ backgroundColor: getColor(item.stance, index) }"
        ></div>
        <span class="legend-text">{{ formatStance(item.stance) }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive, watch } from "vue";
import * as d3 from "d3";
import { useRouter } from "vue-router"; // Import Vue Router

// Get router instance
const router = useRouter();

const chartContainer = ref(null);
const activeStance = ref("");
const activeComments = ref([]);
const commentsPosition = reactive({ left: "0px", top: "0px", width: "300px" });
const keepCommentsVisible = ref(false);
const hoveredBubble = ref(null);

// Function to navigate to stance page
const navigateToStancePage = (stance) => {
  // Navigate to the stance details page
  console.log("Navigating to stance:", stance);

  router.push({
    name: "stance-details",
    params: { stance: stance },
  });
};

// Sample comments for each stance
const commentsByStance = {
  Apology: [
    "I apologize for the harm caused by these actions.",
    "We deeply regret our country's role in these events.",
    "On behalf of our government, we offer our sincere apologies.",
    "We acknowledge the pain and suffering experienced.",
    "I'm sorry for what happened to your community.",
  ],
  Historical_Affirmation: [
    "Historical records clearly document these events.",
    "The evidence for this historical event is overwhelming.",
    "Multiple sources confirm this happened exactly as described.",
    "The historical consensus is clear on this matter.",
    "Archives from that period verify these accounts.",
  ],
  Competitive_Victimhood_Historical_Inversion: [
    "But what about the suffering my group endured?",
    "Our people also experienced terrible persecution.",
    "Why does no one talk about what happened to us?",
    "The media only focuses on their narrative, not ours.",
    "We were victims too, but our story is ignored.",
  ],
  Explicit_Denial: [
    "This event never actually happened.",
    "There is no legitimate evidence for these claims.",
    "These are fabricated stories with political motives.",
    "Historical research disproves these allegations.",
    "This is simply not true according to our records.",
  ],
  // Add sample comments for other stances
  Justification_Narrative: [
    "These actions were necessary given the circumstances.",
    "The context of the time period explains these decisions.",
    "This was standard practice during that era.",
    "We had to protect our national interests.",
    "The geopolitical situation required these measures.",
  ],
  Contemporary_Comparison: [
    "This situation is just like what's happening in Region X today.",
    "The same patterns are emerging in current conflicts.",
    "We're seeing similar rhetoric in today's political climate.",
    "Modern examples of this include recent events in Country Y.",
    "The parallels to current events are striking.",
  ],
  Personal_Testimony: [
    "I witnessed these events with my own eyes.",
    "My grandmother told me stories about this period.",
    "As someone who lived through this, I can confirm it happened.",
    "I have personal memories of these experiences.",
    "My family's history is directly connected to these events.",
  ],
  Discussion_About_Denial: [
    "The denial of this historical event is troubling.",
    "We need to address the pattern of denial in public discourse.",
    "Denial serves political purposes but distorts history.",
    "The mechanisms of denial deserve academic scrutiny.",
    "Many groups use denial as a strategy to avoid accountability.",
  ],
  Minimization_Reframing: [
    "These events weren't as severe as commonly portrayed.",
    "The numbers have been greatly exaggerated over time.",
    "This was a complex situation with fault on all sides.",
    "The context makes these actions more understandable.",
    "This has been blown out of proportion for political reasons.",
  ],
  Reconciliation_Discourse: [
    "We must find a path forward together despite this history.",
    "Acknowledging the past is the first step toward healing.",
    "Both sides need to come together in dialogue.",
    "Reconciliation requires truth-telling and mutual respect.",
    "We can build a shared future while honoring difficult memories.",
  ],
  Sympathy_Memorial_Commemorative: [
    "We must never forget the victims of this tragedy.",
    "Their memory deserves to be honored and preserved.",
    "Our thoughts are with all those who suffered.",
    "This memorial serves as a reminder of human courage.",
    "We stand in solidarity with the descendants of survivors.",
  ],
  Procedural_Deflection_Evidence_Archives: [
    "We need more evidence before drawing conclusions.",
    "The archives on this matter remain incomplete.",
    "Historical investigation is still ongoing.",
    "Without access to certain documents, we cannot be certain.",
    "The methodology used to study these events is flawed.",
  ],
};

// Data for the chart
const data = [
  { stance: "Apology", count: 54 },
  { stance: "Historical_Affirmation", count: 1465 },
  { stance: "Competitive_Victimhood_Historical_Inversion", count: 911 },
  { stance: "Explicit_Denial", count: 882 },
  { stance: "Justification_Narrative", count: 1206 },
  { stance: "Personal_Testimony", count: 290 },
  { stance: "Contemporary_Comparison", count: 2417 },
  { stance: "Discussion_About_Denial", count: 1281 },
  { stance: "Minimization_Reframing", count: 760 },
  { stance: "Reconciliation_Discourse", count: 154 },
  { stance: "Sympathy_Memorial_Commemorative", count: 501 },
  { stance: "Procedural_Deflection_Evidence_Archives", count: 477 },
];

// Format stance names for better readability
const formatStance = (stance) => {
  return stance.replace(/_/g, " ");
};
const stanceColors = {
  Apology: "#717E8F",
  Historical_Affirmation: "#ff7f0e",
  Competitive_Victimhood_Historical_Inversion: "#2ca02c",
  Explicit_Denial: "#d62728",
  Justification_Narrative: "#9467bd",
  Personal_Testimony: "#8c564b",
  Contemporary_Comparison: "#e377c2",
  Discussion_About_Denial: "#7f7f7f",
  Minimization_Reframing: "#bcbd22",
  Reconciliation_Discourse: "#17becf",
  Sympathy_Memorial_Commemorative: "#aec7e8",
  Procedural_Deflection_Evidence_Archives: "#ffbb78",
};

// Get color for a stance
const getColor = (stance, index) => {
  // Using d3's category10 colors with index fallback
  return stanceColors[stance];
};

// Handle comments panel leaving
const handleCommentsLeave = () => {
  keepCommentsVisible.value = false;

  // Only hide comments if no bubble is being hovered
  if (!hoveredBubble.value) {
    setTimeout(() => {
      if (!keepCommentsVisible.value && !hoveredBubble.value) {
        activeStance.value = "";
      }
    }, 300);
  }
};

// Store simulation reference for cleanup
let simulation = null;
let tooltip = null;

// Create and render the bubble chart
onMounted(() => {
  const renderChart = () => {
    if (!chartContainer.value) return;

    // Clear any existing SVG content
    d3.select(chartContainer.value).selectAll("*").remove();

    // Set dimensions
    const width = chartContainer.value.clientWidth || 800;
    const height = chartContainer.value.clientHeight || 600;
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(chartContainer.value)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create color scale
    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.stance))
      .range(d3.schemeCategory10);

    // Create size scale for bubbles
    const maxCount = d3.max(data, (d) => d.count);
    const sizeScale = d3.scaleSqrt().domain([0, maxCount]).range([20, 100]);

    // Create simulation
    simulation = d3
      .forceSimulation(data)
      .force("x", d3.forceX(innerWidth / 2).strength(0.05))
      .force("y", d3.forceY(innerHeight / 2).strength(0.05))
      .force(
        "collide",
        d3.forceCollide((d) => sizeScale(d.count) + 2)
      )
      .force("charge", d3.forceManyBody().strength(-30));

    // Create tooltip
    tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "1px solid #ddd")
      .style("border-radius", "4px")
      .style("padding", "8px")
      .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("z-index", 10);

    // Add bubbles
    const bubbles = svg
      .selectAll(".bubble")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "bubble")
      .attr("r", (d) => sizeScale(d.count))
      .attr("fill", (d) => colorScale(d.stance))
      .attr("fill-opacity", 0.9)
      //   .attr("stroke", (d) => d3.color(colorScale(d.stance)).darker())
      //   .attr("stroke-width", 1)
      .style("cursor", "pointer")
      .on("mouseenter", function (event, d) {
        // Store reference to indicate bubble is being hovered
        hoveredBubble.value = d;

        // Highlight the bubble
        d3.select(this).attr("stroke-width", 2).attr("fill-opacity", 0.9);

        // Show tooltip
        tooltip.style("opacity", 1).html(`
              <div style="font-weight: bold">${formatStance(d.stance)}</div>
              <div>Count: ${d.count}</div>
            `);

        // Show comments for this stance
        if (commentsByStance[d.stance]) {
          activeStance.value = d.stance;
          activeComments.value = commentsByStance[d.stance];

          // Position the comments overlay near the bubble
          const rect = chartContainer.value.getBoundingClientRect();
          const bubbleX = d.x + margin.left;
          const bubbleY = d.y + margin.top;
          const bubbleRadius = sizeScale(d.count);

          // Determine if we should position the panel to the left or right
          const shouldPositionLeft = bubbleX > width / 2;

          if (shouldPositionLeft) {
            commentsPosition.left = `${bubbleX - bubbleRadius - 320}px`;
          } else {
            commentsPosition.left = `${bubbleX + bubbleRadius + 20}px`;
          }

          commentsPosition.top = `${Math.max(20, bubbleY - 100)}px`;
          commentsPosition.width = `${Math.max(300, bubbleRadius * 3)}px`;
        }
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseleave", function () {
        // Clear the bubble reference
        hoveredBubble.value = null;

        d3.select(this).attr("stroke-width", 1).attr("fill-opacity", 0.7);

        tooltip.style("opacity", 0);

        // Only hide comments if user isn't hovering the comments panel
        if (!keepCommentsVisible.value) {
          setTimeout(() => {
            if (!keepCommentsVisible.value && !hoveredBubble.value) {
              activeStance.value = "";
            }
          }, 300);
        }
      })
      .on("click", function (event, d) {
        // Navigate to detailed page for this stance
        navigateToStancePage(d.stance);
      });

    // Add labels to larger bubbles
    const labels = svg
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("pointer-events", "none")
      .attr("dy", ".35em")
      .attr("font-size", (d) => Math.min(sizeScale(d.count) / 3, 12))
      .text((d) =>
        sizeScale(d.count) > 25 ? formatStance(d.stance).split(" ")[0] : ""
      );

    // Update positions on tick
    simulation.on("tick", () => {
      bubbles
        .attr("cx", (d) => {
          d.x = Math.max(
            sizeScale(d.count),
            Math.min(innerWidth - sizeScale(d.count), d.x)
          );
          return d.x;
        })
        .attr("cy", (d) => {
          d.y = Math.max(
            sizeScale(d.count),
            Math.min(innerHeight - sizeScale(d.count), d.y)
          );
          return d.y;
        });

      labels.attr("x", (d) => d.x).attr("y", (d) => d.y);
    });
  };

  // Render chart initially
  renderChart();

  // Add resize handler
  window.addEventListener("resize", renderChart);

  // Clean up handler when component unmounts
  onUnmounted(() => {
    window.removeEventListener("resize", renderChart);
    if (simulation) simulation.stop();
    if (tooltip) tooltip.remove();
  });
});
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 80px;
}

.chart-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: white;
}

.chart-wrapper {
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 2px;
  top: 10%;
  background-color: rgb(0, 0, 0);
  position: relative;
}

.vis-container {
  width: 100%;
  height: 600px;
}

.legend-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  width: 100%;
  max-width: 36rem;
  /* margin-top: 1rem; */
  font-size: 0.875rem;
}

.legend-item {
  display: flex;
  color: white;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  transition: background-color 0.2s ease;
}

.legend-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.legend-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 8px;
  color: white;
}

.legend-color {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  margin-right: 0.5rem;
}

.comments-overlay {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 5;
  max-height: 400px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.comments-title {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.comments-container {
  overflow-y: auto;
  max-height: 320px;
  position: relative;
}

.comment-text {
  margin: 0.5rem 0;
  font-size: 0.875rem;
  line-height: 1.4;
  position: relative;
  font-family: "Courier New", monospace;
}

.view-all-link {
  text-align: right;
  font-size: 0.875rem;
  color: #3182ce;
  margin-top: 0.5rem;
  cursor: pointer;
  border-top: 1px solid #e2e8f0;
  padding-top: 0.5rem;
}

.view-all-link:hover {
  text-decoration: underline;
}

/* Transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
