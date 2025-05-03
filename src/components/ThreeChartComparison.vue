<template>
  <div class="three-charts-section" :class="{ visible: isVisible }">
    <h2 class="section-title">
      The TR Media, Government, and Public Discourse
    </h2>
    <p class="charts-intro">
      Compare how different stakeholders frame discussions around the Armenian
      Genocide
    </p>

    <div class="charts-container">
      <!-- Government Chart -->
      <div class="chart-box">
        <h3 class="chart-box-title">Government Framing</h3>
        <div class="chart-box-container" ref="governmentChartContainer">
          <div class="loading-indicator" v-if="!chartsRendered.government">
            Loading...
          </div>
        </div>
        <div class="chart-box-note">
          Based on official statements from 2018-2024
        </div>
      </div>

      <!-- Media Chart -->
      <div class="chart-box">
        <h3 class="chart-box-title">Media Framing</h3>
        <div class="chart-box-container" ref="mediaChartContainer">
          <div class="loading-indicator" v-if="!chartsRendered.media">
            Loading...
          </div>
        </div>
        <div class="chart-box-note">
          Based on articles from Turkish news outlets
        </div>
      </div>

      <!-- Comments Chart -->
      <div class="chart-box">
        <h3 class="chart-box-title">Public Commentary</h3>
        <div class="chart-box-container" ref="commentsChartContainer">
          <div class="loading-indicator" v-if="!chartsRendered.comments">
            Loading...
          </div>
        </div>
        <div class="chart-box-note">
          Based on analysis of social media comments
        </div>
      </div>
    </div>

    <div class="charts-conclusion">
      <p>
        This comparative visualization reveals how each stakeholder employs
        different language and framing techniques when discussing the Armenian
        Genocide, highlighting patterns of denial, justification, and
        minimization.
      </p>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "ThreeChartComparison",
  data() {
    return {
      isVisible: false,
      // Sample data for the three charts - replace with your actual data
      governmentData: [
        { word: "events", count: 245 },
        { word: "allegations", count: 198 },
        { word: "tragedy", count: 176 },
        { word: "historical", count: 143 },
        { word: "claims", count: 132 },
        { word: "political", count: 114 },
        { word: "committee", count: 87 },
        { word: "unfounded", count: 76 },
        { word: "context", count: 62 },
        { word: "falsified", count: 43 },
      ],
      mediaData: [
        { word: "so-called", count: 287 },
        { word: "alleged", count: 231 },
        { word: "incident", count: 195 },
        { word: "claims", count: 187 },
        { word: "purported", count: 143 },
        { word: "accusations", count: 124 },
        { word: "contested", count: 98 },
        { word: "relocation", count: 92 },
        { word: "narrative", count: 78 },
        { word: "propaganda", count: 65 },
      ],
      commentsData: [
        { word: "lies", count: 312 },
        { word: "fake", count: 274 },
        { word: "propaganda", count: 228 },
        { word: "history", count: 203 },
        { word: "war", count: 178 },
        { word: "terrorism", count: 154 },
        { word: "traitors", count: 137 },
        { word: "western", count: 125 },
        { word: "biased", count: 103 },
        { word: "conspiracy", count: 94 },
      ],
      chartsRendered: {
        government: false,
        media: false,
        comments: false,
      },
    };
  },
  mounted() {
    // Set up intersection observer for animation on scroll
    this.setupIntersectionObserver();

    // Render charts after a short delay to ensure DOM is ready
    setTimeout(() => {
      this.createBubbleChart(
        this.$refs.governmentChartContainer,
        this.governmentData,
        "government"
      );
      this.createBubbleChart(
        this.$refs.mediaChartContainer,
        this.mediaData,
        "media"
      );
      this.createBubbleChart(
        this.$refs.commentsChartContainer,
        this.commentsData,
        "comments"
      );
    }, 500);

    // Add window resize listener
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    setupIntersectionObserver() {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            observer.unobserve(entry.target);
          }
        });
      }, options);

      // Start observing this component
      observer.observe(this.$el);
    },

    handleResize() {
      // Debounce resize events
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.createBubbleChart(
          this.$refs.governmentChartContainer,
          this.governmentData,
          "government"
        );
        this.createBubbleChart(
          this.$refs.mediaChartContainer,
          this.mediaData,
          "media"
        );
        this.createBubbleChart(
          this.$refs.commentsChartContainer,
          this.commentsData,
          "comments"
        );
      }, 250);
    },

    createBubbleChart(container, data, chartType) {
      if (!container) return;

      // Clear any existing chart
      d3.select(container).selectAll("svg").remove();

      // Get container dimensions
      const containerWidth = container.clientWidth || 320;

      // Set dimensions and margins - smaller for the three charts
      const margin = { top: 20, right: 20, bottom: 20, left: 20 };
      const width = containerWidth - margin.left - margin.right;
      const height = 260 - margin.top - margin.bottom;

      // Create SVG
      const svg = d3
        .select(container)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      // Create a size scale for bubbles
      const minCount = d3.min(data, (d) => d.count);
      const maxCount = d3.max(data, (d) => d.count);

      const radiusScale = d3
        .scaleSqrt()
        .domain([minCount, maxCount])
        .range([15, 40]); // Smaller bubbles for the three-chart layout

      // Create a force simulation
      const simulation = d3
        .forceSimulation(data)
        .force("x", d3.forceX(width / 2).strength(0.15))
        .force("y", d3.forceY(height / 2).strength(0.15))
        .force(
          "collide",
          d3
            .forceCollide()
            .radius((d) => radiusScale(d.count) + 2)
            .strength(0.8)
        )
        .force("charge", d3.forceManyBody().strength(-10))
        .on("tick", ticked);

      // Add a bounding box force to keep bubbles within the container
      simulation.force("bounds", () => {
        for (let node of data) {
          const r = radiusScale(node.count);
          node.x = Math.max(r, Math.min(width - r, node.x));
          node.y = Math.max(r, Math.min(height - r, node.y));
        }
      });

      // Create a group for each bubble
      const bubbles = svg
        .selectAll(".bubble-group")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "bubble-group")
        .style("cursor", "pointer");

      // Choose a color scheme based on chart type
      let colorScale;
      switch (chartType) {
        case "government":
          colorScale = d3
            .scaleSequential(d3.interpolateBlues)
            .domain([minCount, maxCount]);
          break;
        case "media":
          colorScale = d3
            .scaleSequential(d3.interpolateGreens)
            .domain([minCount, maxCount]);
          break;
        case "comments":
          colorScale = d3
            .scaleSequential(d3.interpolateOranges)
            .domain([minCount, maxCount]);
          break;
        default:
          colorScale = d3
            .scaleSequential(d3.interpolateGreys)
            .domain([minCount, maxCount]);
      }

      // Add the circle elements with colors based on chart type
      bubbles
        .append("circle")
        .attr("class", "bubble-circle")
        .attr("r", (d) => radiusScale(d.count))
        .attr("fill", (d) => colorScale(d.count))
        .attr("stroke", (d) => d3.rgb(colorScale(d.count)).darker(0.5))
        .attr("stroke-width", 1)
        .attr("opacity", 0.8);

      // Add the text labels
      bubbles
        .append("text")
        .attr("class", "bubble-text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("dy", (d) => -radiusScale(d.count) * 0.1)
        .style(
          "font-size",
          (d) => `${Math.min(12, radiusScale(d.count) * 0.35)}px`
        )
        .style("font-weight", "600")
        .style("pointer-events", "none")
        .style("fill", (d) =>
          d3.hsl(colorScale(d.count)).l > 0.7 ? "#333" : "white"
        )
        .text((d) => d.word);

      // Add count labels
      bubbles
        .append("text")
        .attr("class", "count-label")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("dy", (d) => radiusScale(d.count) * 0.25)
        .style(
          "font-size",
          (d) => `${Math.min(10, radiusScale(d.count) * 0.28)}px`
        )
        .style("fill", (d) =>
          d3.hsl(colorScale(d.count)).l > 0.7 ? "#333" : "white"
        )
        .style("pointer-events", "none")
        .text((d) => d.count);

      // Function to update positions on each tick of the simulation
      function ticked() {
        bubbles.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
      }

      // Add hover interactivity
      bubbles
        .on("mouseover", function (event, d) {
          d3.select(this)
            .select(".bubble-circle")
            .transition()
            .duration(200)
            .attr("opacity", 1)
            .attr("stroke-width", 2);

          d3.select(this)
            .select(".bubble-text")
            .transition()
            .duration(200)
            .style("font-weight", "bold");
        })
        .on("mouseout", function (event, d) {
          d3.select(this)
            .select(".bubble-circle")
            .transition()
            .duration(200)
            .attr("opacity", 0.8)
            .attr("stroke-width", 1);

          d3.select(this)
            .select(".bubble-text")
            .transition()
            .duration(200)
            .style("font-weight", "600");
        });

      // Set flag that this chart has been rendered
      this.chartsRendered[chartType] = true;
    },
  },
};
</script>

<style scoped>
.three-charts-section {
  margin-top: 80px;
  padding: 30px 15px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease, transform 0.7s ease;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.three-charts-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  text-align: center;
  margin-bottom: 15px;
  font-size: 1.8rem;
}

.charts-intro {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 30px;
  font-size: 1.1rem;
  color: #555;
}

.charts-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
}

.chart-box {
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.chart-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.chart-box-title {
  background-color: #f8f8f8;
  margin: 0;
  padding: 15px;
  font-size: 1.2rem;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.chart-box-container {
  height: 260px;
  padding: 10px;
  position: relative;
}

.chart-box-note {
  padding: 10px;
  font-size: 0.8rem;
  color: #666;
  text-align: center;
  border-top: 1px solid #eee;
  font-style: italic;
}

.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #666;
}

.charts-conclusion {
  max-width: 800px;
  margin: 40px auto 0;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  text-align: center;
}

.charts-conclusion p {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.5;
  color: #333;
}

/* Responsive adjustments for the charts */
@media (max-width: 900px) {
  .charts-container {
    flex-direction: column;
    align-items: center;
  }

  .chart-box {
    width: 100%;
    max-width: 500px;
  }
}
</style>
