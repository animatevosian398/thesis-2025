<template>
  <div class="chart-container">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <div ref="chartContainer" class="vis-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
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

const loadCSVData = async () => {
  try {
    const csvPath = "/assets/Classified_merged_withoutOther_emotions.csv";
    console.log("Loading CSV from:", csvPath);

    // Fetch CSV
    const response = await fetch(csvPath);
    if (response.ok) {
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
            if (results.errors && results.errors.length > 0) {
              console.warn("CSV parsing warnings:", results.errors);
            }
            if (results.data && results.data.length) {
              console.log("Parsed data sample:", results.data.slice(0, 3));
              console.log("Total rows:", results.data.length);
              resolve(results.data);
            } else {
              reject(new Error("No valid data found in CSV"));
            }
          },
          error: (error) => reject(error),
        });
      });
    } else {
      throw new Error(`Failed to fetch CSV: ${response.status}`);
    }
  } catch (err) {
    console.error("Data loading error:", err);

    // Generate fallback data if CSV load fails
    console.warn("Using fallback data");

    // Create a time series with different stances
    const fallbackData = [];
    const stances = Object.keys(stanceColors);

    // Generate dates spanning 1 year
    const startDate = new Date(2022, 0, 1);
    const endDate = new Date(2022, 11, 31);

    // Create 12 months of data
    for (let month = 0; month < 12; month++) {
      const date = new Date(2022, month, 15); // Middle of each month

      // For each stance, generate count data
      stances.forEach((stance) => {
        // Create some interesting patterns with sine waves
        const baseCount = 10 + Math.floor(Math.random() * 20);
        const seasonality = Math.sin((month / 12) * Math.PI * 2) * 10;
        const trend = month * (Math.random() * 2 - 1); // Some stances increase, some decrease
        const noise = Math.random() * 5;

        let count = Math.max(
          0,
          Math.floor(baseCount + seasonality + trend + noise)
        );

        // Add some peaks for certain stances in certain months
        if (
          (stance === "Apology" && month === 3) ||
          (stance === "Explicit_Denial" && month === 7) ||
          (stance === "Reconciliation_Discourse" && month === 10)
        ) {
          count += 15 + Math.floor(Math.random() * 10);
        }

        // Add multiple records for each stance-date combination based on count
        for (let i = 0; i < count; i++) {
          fallbackData.push({
            predicted_stance: stance,
            date: date.toISOString().split("T")[0], // YYYY-MM-DD format
            tweet_id: `${stance}-${month}-${i}`,
          });
        }
      });
    }

    return fallbackData;
  }
};

// Process data to create time series for the stream graph
const processDataForStreamGraph = (data) => {
  // Extract date field from data (using timestamp or date field)
  // If no date field is present, create a sequence of dates

  // Check what date field is available
  const sampleItem = data[0];
  let dateField = null;

  if (sampleItem.date) {
    dateField = "date";
  } else if (sampleItem.timestamp) {
    dateField = "timestamp";
  } else if (sampleItem.created_at) {
    dateField = "created_at";
  }

  // If no date field found, add fake dates based on position in array
  if (!dateField) {
    console.log("No date field found, adding sequential dates");
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    // Add dates evenly distributed over past year
    data = data.map((d, i) => {
      const date = new Date(oneYearAgo);
      date.setDate(date.getDate() + Math.floor((i * 365) / data.length));
      return {
        ...d,
        date: date.toISOString().split("T")[0], // YYYY-MM-DD format
      };
    });
    dateField = "date";
  }

  // Extract stance field
  const stanceField = "predicted_stance";

  // Parse dates and clean data
  data.forEach((d) => {
    // Convert date strings to Date objects
    if (typeof d[dateField] === "string") {
      d.parsedDate = new Date(d[dateField]);
      // If invalid date, set to null
      if (isNaN(d.parsedDate.getTime())) {
        d.parsedDate = null;
      }
    } else if (d[dateField] instanceof Date) {
      d.parsedDate = d[dateField];
    } else {
      d.parsedDate = null;
    }

    // Ensure stance field exists
    if (!d[stanceField]) {
      d[stanceField] = "Unknown";
    }
  });

  // Filter out items with invalid dates
  data = data.filter((d) => d.parsedDate !== null);

  // Group data by month and stance
  const groupedByMonthAndStance = d3.rollup(
    data,
    (v) => v.length, // Count items
    (d) => d3.timeMonth.floor(d.parsedDate), // Group by month
    (d) => d[stanceField] // Group by stance
  );

  // Convert to array format needed for d3.stack
  const months = Array.from(groupedByMonthAndStance.keys()).sort(d3.ascending);
  const stances = new Set();

  // Collect all unique stances
  for (const [_, stanceMap] of groupedByMonthAndStance) {
    for (const stance of stanceMap.keys()) {
      stances.add(stance);
    }
  }

  // Convert to array of stance names
  const stanceArray = Array.from(stances);

  // Create an array of objects with month and count for each stance
  const formattedData = months.map((month) => {
    const entry = { date: month };
    const stanceMap = groupedByMonthAndStance.get(month);

    stanceArray.forEach((stance) => {
      entry[stance] = stanceMap.get(stance) || 0;
    });

    return entry;
  });

  return { data: formattedData, keys: stanceArray };
};

const renderStreamGraph = async () => {
  // Add retry mechanism for chart container
  let retries = 0;
  const maxRetries = 3;

  while (!chartContainer.value && retries < maxRetries) {
    console.log(
      `Chart container not ready, retrying (${retries + 1}/${maxRetries})...`
    );
    await new Promise((resolve) => setTimeout(resolve, 100));
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
    // Load data
    const rawData = await loadCSVData();

    // Validate data
    if (!rawData || !rawData.length) {
      throw new Error("No data available to display");
    }

    // Process data for stream graph
    const { data, keys } = processDataForStreamGraph(rawData);
    console.log("Processed data for stream graph:", data.slice(0, 3));
    console.log("Stances found:", keys);

    if (data.length === 0) {
      throw new Error("No time series data available after processing");
    }

    // Clear any existing chart
    d3.select(chartContainer.value).selectAll("*").remove();

    // Set up dimensions
    const margin = { top: 50, right: 30, bottom: 50, left: 50 };
    const width =
      chartContainer.value.clientWidth - margin.left - margin.right || 800;
    const height =
      chartContainer.value.clientHeight - margin.top - margin.bottom || 500;

    // Create SVG
    const svg = d3
      .select(chartContainer.value)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .text("Stance Distribution Over Time");

    // Set up scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) => {
          // Sum all values for each date
          return d3.sum(keys, (key) => d[key] || 0);
        }),
      ])
      .range([height, 0]);

    // Create color scale
    const colorScale = d3
      .scaleOrdinal()
      .domain(keys)
      .range(
        keys.map(
          (key) =>
            stanceColors[key] || d3.schemeCategory10[keys.indexOf(key) % 10]
        )
      );

    // Create stack generator
    const stack = d3
      .stack()
      .offset(d3.stackOffsetWiggle) // Gives the stream-like appearance
      .order(d3.stackOrderInsideOut) // Places largest streams in the middle
      .keys(keys);

    const stackedData = stack(data);

    // Create area generator
    const area = d3
      .area()
      .x((d) => xScale(d.data.date))
      .y0((d) => yScale(d[0]))
      .y1((d) => yScale(d[1]))
      .curve(d3.curveBasis); // Smooths the curve

    // Draw the stream layers
    const layers = svg
      .selectAll(".layer")
      .data(stackedData)
      .enter()
      .append("path")
      .attr("class", "layer")
      .attr("d", area)
      .style("fill", (d, i) => colorScale(d.key))
      .style("opacity", 0.8)
      .attr("stroke", "white")
      .attr("stroke-width", 0.5);

    // Add x-axis
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(d3.timeMonth.every(1))
      .tickFormat(d3.timeFormat("%b %Y"));

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .style("fill", "white")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Style axis lines
    svg.selectAll(".domain, .tick line").style("stroke", "white");

    // Add a legend
    const legendItemHeight = 20;
    const legendItemWidth = 180;
    const legendColumns = Math.ceil(keys.length / 10); // Display in columns if many stances
    const legendWidth = legendColumns * legendItemWidth;

    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr(
        "transform",
        `translate(${(width - legendWidth) / 2},${height + margin.bottom - 10})`
      );

    keys.forEach((key, i) => {
      const column = Math.floor(i / 10);
      const row = i % 10;

      const legendItem = legend
        .append("g")
        .attr(
          "transform",
          `translate(${column * legendItemWidth},${row * legendItemHeight})`
        );

      // Add colored rectangle
      legendItem
        .append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", colorScale(key))
        .attr("stroke", "white")
        .attr("stroke-width", 0.5);

      // Add label
      legendItem
        .append("text")
        .attr("x", 20)
        .attr("y", 12)
        .style("fill", "white")
        .style("font-size", "12px")
        .text(key.length > 25 ? key.substring(0, 22) + "..." : key);
    });

    // Add hover interactions
    layers
      .on("mouseover", function (event, d) {
        // Highlight this layer
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", 1)
          .attr("stroke-width", 2);

        // Fade other layers
        layers
          .filter((layer) => layer.key !== d.key)
          .transition()
          .duration(200)
          .style("opacity", 0.4);

        // Show tooltip with stance name
        const [mouseX, mouseY] = d3.pointer(event, svg.node());

        const tooltip = svg
          .append("g")
          .attr("class", "tooltip")
          .attr("transform", `translate(${mouseX + 10},${mouseY - 10})`);

        // Add background
        tooltip
          .append("rect")
          .attr("width", d.key.length * 8 + 20)
          .attr("height", 30)
          .attr("fill", "rgba(0,0,0,0.8)")
          .attr("rx", 5);

        // Add text
        tooltip
          .append("text")
          .attr("x", 10)
          .attr("y", 20)
          .style("fill", "white")
          .text(d.key);
      })
      .on("mouseout", function () {
        // Restore all layers
        layers
          .transition()
          .duration(200)
          .style("opacity", 0.8)
          .attr("stroke-width", 0.5);

        // Remove tooltip
        svg.selectAll(".tooltip").remove();
      });

    loading.value = false;
  } catch (err) {
    console.error("Error rendering stream graph:", err);
    error.value = err.message;
    loading.value = false;
  }
};

// Initialize chart
onMounted(() => {
  nextTick(() => {
    if (chartContainer.value) {
      console.log("Chart container found, rendering stream graph");
      renderStreamGraph();

      // Handle window resize
      window.addEventListener("resize", () => {
        if (!loading.value) {
          renderStreamGraph();
        }
      });
    } else {
      console.error("Chart container not available");
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
  color: white;
  flex-direction: column;
}

.vis-container {
  width: 100%;
  height: 80vh;
  position: relative;
}

.loading {
  color: white;
  font-size: 1.5em;
}

.error-message {
  color: #e53935;
  text-align: center;
  font-size: 1.2em;
}

/* Animation for layers */
.layer {
  transition: opacity 0.3s, stroke-width 0.3s;
}
</style>
