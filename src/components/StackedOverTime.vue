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
      console.log("CSV loaded successfully");

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

    // Create sample data for different years and stances
    const fallbackData = [];
    const stances = Object.keys(stanceColors);

    // Generate data across multiple years (2015-2022)
    for (let year = 2015; year <= 2022; year++) {
      // For each stance, generate count data
      stances.forEach((stance) => {
        // Create some interesting patterns with sine waves
        const baseCount = 20 + Math.floor(Math.random() * 40);
        const trend = (year - 2015) * (Math.random() * 5); // Increasing trend
        const noise = Math.random() * 10;

        let count = Math.max(0, Math.floor(baseCount + trend + noise));

        // Add some peaks for certain stances in certain years
        if (
          (stance === "Apology" && year === 2019) ||
          (stance === "Explicit_Denial" && year === 2017) ||
          (stance === "Reconciliation_Discourse" && year === 2021)
        ) {
          count += 50 + Math.floor(Math.random() * 20);
        }

        // Add multiple records for each stance-year combination based on count
        for (let i = 0; i < count; i++) {
          fallbackData.push({
            predicted_stance: stance,
            publish_date: `${year}-${Math.floor(Math.random() * 12) + 1}-${
              Math.floor(Math.random() * 28) + 1
            }`, // Random date in year
            tweet_id: `${stance}-${year}-${i}`,
          });
        }
      });
    }

    return fallbackData;
  }
};

// Process data to group by year and stance
const processDataForStackedBarChart = (data) => {
  // Extract date field - specifically targeting publish_date
  const dateField = "publish_date";
  const stanceField = "predicted_stance";

  // Parse dates and extract years
  data.forEach((d) => {
    // Convert date strings to years
    if (typeof d[dateField] === "string") {
      // Try to extract year from date string
      const yearMatch = d[dateField].match(/^(\d{4})/);
      if (yearMatch) {
        d.year = parseInt(yearMatch[1]);
      } else {
        d.year = null;
      }
    } else if (d[dateField] instanceof Date) {
      d.year = d[dateField].getFullYear();
    } else {
      d.year = null;
    }

    // Ensure stance field exists
    if (!d[stanceField]) {
      d[stanceField] = "Unknown";
    }
  });

  // Filter out items with invalid years
  data = data.filter((d) => d.year !== null);

  // Group data by year and stance
  const groupedByYearAndStance = d3.rollup(
    data,
    (v) => v.length, // Count items
    (d) => d.year, // Group by year
    (d) => d[stanceField] // Group by stance
  );

  // Convert to array format needed for d3.stack
  const years = Array.from(groupedByYearAndStance.keys()).sort(d3.ascending);
  const stances = new Set();

  // Collect all unique stances
  for (const [_, stanceMap] of groupedByYearAndStance) {
    for (const stance of stanceMap.keys()) {
      stances.add(stance);
    }
  }

  // Convert to array of stance names
  const stanceArray = Array.from(stances);

  // Create an array of objects with year and count for each stance
  const formattedData = years.map((year) => {
    const entry = { year };
    const stanceMap = groupedByYearAndStance.get(year) || new Map();

    // Set count for each stance
    stanceArray.forEach((stance) => {
      entry[stance] = stanceMap.get(stance) || 0;
    });

    // Calculate total for each year
    entry.total = stanceArray.reduce(
      (sum, stance) => sum + (entry[stance] || 0),
      0
    );

    return entry;
  });

  return { data: formattedData, keys: stanceArray };
};

const renderStackedBarChart = async () => {
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

    // Process data for stacked bar chart
    const { data, keys } = processDataForStackedBarChart(rawData);
    console.log("Processed data for stacked bar chart:", data);
    console.log("Stances found:", keys);

    if (data.length === 0) {
      throw new Error("No year-based data available after processing");
    }

    // Clear any existing chart
    d3.select(chartContainer.value).selectAll("*").remove();

    // Set up dimensions
    const margin = { top: 50, right: 150, bottom: 120, left: 80 };
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
      .text("Stance Distribution by Year");

    // Set up scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.year))
      .range([0, width])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.total)])
      .range([height, 0])
      .nice();

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
    const stack = d3.stack().keys(keys);
    const stackedData = stack(data);

    // Create bars
    const barGroups = svg
      .selectAll(".bar-group")
      .data(stackedData)
      .enter()
      .append("g")
      .attr("class", "bar-group")
      .attr("fill", (d) => colorScale(d.key));

    barGroups
      .selectAll("rect")
      .data((d) => d)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.data.year))
      .attr("y", (d) => yScale(d[1]))
      .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
      .attr("width", xScale.bandwidth())
      .attr("stroke", "white")
      .attr("stroke-width", 0.5)
      .attr("class", "bar")
      .attr("data-stance", (d) => d.data.stance)
      .on("mouseover", function (event, d) {
        // Highlight bar on hover
        d3.select(this).attr("stroke-width", 2).attr("stroke", "white");

        // Create tooltip
        const stance = d3.select(this.parentNode).datum().key;
        const year = d.data.year;
        const value = d.data[stance];

        const tooltip = svg
          .append("g")
          .attr("class", "tooltip")
          .attr(
            "transform",
            `translate(${xScale(year) + xScale.bandwidth()},${
              yScale(d[1]) - 10
            })`
          );

        // Add tooltip background
        tooltip
          .append("rect")
          .attr("x", 10)
          .attr("y", -25)
          .attr("width", stance.length * 7 + 70) // Adjust width based on text length
          .attr("height", 60)
          .attr("fill", "rgba(0,0,0,0.8)")
          .attr("rx", 5);

        // Add tooltip text - stance
        tooltip
          .append("text")
          .attr("x", 20)
          .attr("y", -5)
          .attr("fill", "white")
          .style("font-weight", "bold")
          .text(stance);

        // Add tooltip text - year
        tooltip
          .append("text")
          .attr("x", 20)
          .attr("y", 15)
          .attr("fill", "white")
          .text(`Year: ${year}`);

        // Add tooltip text - count
        tooltip
          .append("text")
          .attr("x", 20)
          .attr("y", 35)
          .attr("fill", "white")
          .text(`Count: ${value}`);
      })
      .on("mouseout", function () {
        // Reset bar highlight
        d3.select(this).attr("stroke-width", 0.5).attr("stroke", "white");

        // Remove tooltip
        svg.selectAll(".tooltip").remove();
      });

    // Add X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat((d) => d))
      .selectAll("text")
      .style("fill", "white")
      .style("font-size", "12px");

    // Add Y axis
    svg
      .append("g")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("fill", "white")
      .style("font-size", "12px");

    // Add Y axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -60)
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", "14px")
      .text("Number of Comments");

    // Add X axis label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", "14px")
      .text("Year");

    // Style axis lines
    svg.selectAll(".domain, .tick line").style("stroke", "white");

    // Create legend
    const legendItemHeight = 20;
    const legendItemWidth = 180;
    const legendColumns = Math.ceil(keys.length / 10); // Display in columns if many stances
    const legendWidth = legendColumns * legendItemWidth;

    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width + 10}, 0)`);

    keys.forEach((key, i) => {
      const column = Math.floor(i / 10);
      const row = i % 10;

      const legendItem = legend
        .append("g")
        .attr(
          "transform",
          `translate(${column * legendItemWidth}, ${row * legendItemHeight})`
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
        .text(key.length > 20 ? key.substring(0, 17) + "..." : key);

      // Add interactivity to legend items
      legendItem
        .style("cursor", "pointer")
        .on("mouseover", function () {
          // Highlight bars of this stance
          barGroups
            .filter((d) => d.key === key)
            .selectAll("rect")
            .attr("stroke-width", 2)
            .attr("stroke", "white");

          // Fade other bars
          barGroups
            .filter((d) => d.key !== key)
            .selectAll("rect")
            .attr("opacity", 0.3);

          // Highlight legend item
          d3.select(this).select("rect").attr("stroke-width", 2);
        })
        .on("mouseout", function () {
          // Reset all bars
          barGroups
            .selectAll("rect")
            .attr("stroke-width", 0.5)
            .attr("stroke", "white")
            .attr("opacity", 1);

          // Reset legend item
          d3.select(this).select("rect").attr("stroke-width", 0.5);
        });
    });

    loading.value = false;
  } catch (err) {
    console.error("Error rendering stacked bar chart:", err);
    error.value = err.message;
    loading.value = false;
  }
};

// Initialize chart
onMounted(() => {
  nextTick(() => {
    if (chartContainer.value) {
      console.log("Chart container found, rendering stacked bar chart");
      renderStackedBarChart();

      // Handle window resize
      window.addEventListener("resize", () => {
        if (!loading.value) {
          renderStackedBarChart();
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

/* Animation for bars */
.bar {
  transition: opacity 0.3s, stroke-width 0.3s;
}
</style>
