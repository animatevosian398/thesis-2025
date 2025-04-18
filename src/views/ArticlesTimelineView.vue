<template>
  <div class="relative w-full h-screen bg-black overflow-hidden">
    <div
      v-for="(article, index) in sortedArticles"
      :key="article.id"
      class="absolute p-4 max-w-xs bg-white/10 text-white text-sm rounded-xl backdrop-blur-sm shadow-lg transition-all duration-700 ease-in-out"
      :class="{ 'opacity-0 scale-75': index > visibleCount.value }"
      :style="getArticleStyle(index)"
    >
      {{ article.generated_title }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import articlesData from "../assets/articles_with_scraped_dates.json";

const positions = ref([]);
const sortedArticles = ref([]);
const visibleCount = ref(-1);

const sortArticles = () => {
  sortedArticles.value = [...articlesData.articles].sort(
    (a, b) => new Date(a.publication_date) - new Date(b.publication_date)
  );

  positions.value = sortedArticles.value.map(() => getRandomPosition());
};

const getRandomPosition = () => ({
  top: `${Math.random() * 80}%`,
  left: `${Math.random() * 80}%`,
  transform: `rotate(${(Math.random() - 0.5) * 10}deg)`,
});

const getArticleStyle = (index) => {
  if (index > visibleCount.value) return {};
  return positions.value[index];
};

const animateArticles = () => {
  const interval = setInterval(() => {
    visibleCount.value++;
    if (visibleCount.value >= sortedArticles.value.length) {
      clearInterval(interval);
    }
  }, 150);
};

onMounted(() => {
  sortArticles();
  animateArticles();
});
</script>

<!-- <template>
  <div class="headlines-container">
    <div class="headline-grid">
      <div
        v-for="(article, index) in sortedArticles"
        :key="article.id"
        class="headline-item"
      >
        <span
          v-for="(part, partIndex) in splitHeadline(article.generated_title)"
          :key="partIndex"
          :class="part.isHighlight ? 'highlight' : 'rest-text'"
          :style="
            part.isHighlight
              ? {}
              : {
                  transition: 'opacity 0.5s ease',
                  opacity: showFullHeadlines ? 1 : 0,
                }
          "
        >
          {{ part.text }}
        </span>
      </div>
    </div>
    <div class="chart-container">
      <canvas ref="articleChart"></canvas>
    </div>
  </div>
</template>

<script>
// Options API
export default {
  name: "ArticlesTimelineView",
};
</script>

<script setup>
import { ref, onMounted } from "vue";
import Papa from "papaparse"; // Import PapaParse for CSV parsing
import articlesData from "../assets/articles_with_scraped_dates.json";
import Chart from "chart.js/auto";

const sortedArticles = ref([]);
const showFullHeadlines = ref(false);
const highlightPhrases = [
  "1915 events",
  "incidents of 1915",
  "events of 1915",
  "1915",
  "claims",
  "1915 incidents",
  "genocide", // Added for framing
  "denial",
  "incidents",
  "so-called",
];
const articleChart = ref(null);
const articleCountsByYear = ref({}); // Store the data from CSV for chart

// Function to fetch and parse CSV data
const loadChartData = () => {
  // Hard-coded CSV data
  const csvData = `year,total_articles
2009,5
2010,13
2011,4
2012,5
2013,6
2014,22
2015,2
2016,34
2017,9
2018,22
2019,74
2020,13
2021,71
2022,39
2023,17
2024,7`;

  console.log("Using hardcoded CSV data");

  // Parse the CSV data directly
  Papa.parse(csvData, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    complete: (result) => {
      console.log("Parsing result:", result);

      const years = result.data.map((item) => item.year);
      const articleCounts = result.data.map((item) => item.total_articles);

      console.log("Years:", years);
      console.log("Article Counts:", articleCounts);

      createChart(years, articleCounts);
    },
    error: (error) => {
      console.error("Error parsing CSV:", error);
    },
  });
};

const sortArticles = () => {
  try {
    if (!articlesData || !articlesData.articles) {
      console.error("Articles data is missing:", articlesData);
      sortedArticles.value = [];
      return;
    }
    sortedArticles.value = [...articlesData.articles].sort(
      (a, b) => new Date(a.publication_date) - new Date(b.publication_date)
    );
    console.log("Sorted articles:", sortedArticles.value);
  } catch (error) {
    console.error("Error sorting articles:", error);
    sortedArticles.value = [];
  }
};

const splitHeadline = (title) => {
  try {
    if (!title || typeof title !== "string") {
      return [{ text: "No title available", isHighlight: false }];
    }
    let parts = [];
    let remaining = title;

    for (const phrase of highlightPhrases) {
      const regex = new RegExp(phrase, "gi");
      let lastIndex = 0;
      let matchCount = 0;
      const maxMatches = 10;

      let match;
      while (
        (match = regex.exec(remaining)) !== null &&
        matchCount < maxMatches
      ) {
        const start = match.index;
        const end = start + phrase.length;
        if (start > lastIndex) {
          parts.push({
            text: remaining.slice(lastIndex, start),
            isHighlight: false,
          });
        }
        parts.push({ text: match[0], isHighlight: true });
        lastIndex = end;
        matchCount++;
      }

      if (lastIndex > 0 && lastIndex < remaining.length) {
        remaining = remaining.slice(lastIndex);
      } else if (lastIndex > 0) {
        remaining = "";
        break;
      }
    }

    if (remaining) {
      parts.push({ text: remaining, isHighlight: false });
    }
    if (!parts.length) {
      parts.push({ text: title, isHighlight: false });
    }
    return parts;
  } catch (error) {
    console.error("Error splitting headline:", title, error);
    return [{ text: "Error processing title", isHighlight: false }];
  }
};

const revealFullHeadlines = () => {
  setTimeout(() => {
    showFullHeadlines.value = true;
  }, 2000);
};

const createChart = (years, articleCounts) => {
  if (!years || !articleCounts) {
    // Use data from articleCountsByYear if direct parameters aren't provided
    years = Object.keys(articleCountsByYear.value);
    articleCounts = Object.values(articleCountsByYear.value);
  }

  console.log("Years:", years); // Log the years
  console.log("Article Counts:", articleCounts); // Log the article counts

  if (years.length > 0 && articleCounts.length > 0 && articleChart.value) {
    // If there's an existing chart, destroy it first
    if (window.myBarChart) {
      window.myBarChart.destroy();
    }

    console.log("Creating chart with data:", years, articleCounts);
    const ctx = articleChart.value.getContext("2d");
    window.myBarChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: years,
        datasets: [
          {
            label:
              "Anadolu Agency Articles related to the Armenian Genocide per Year",
            data: articleCounts,
            backgroundColor: "rgba(255, 99, 132, 0.8)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Article Count", color: "white" },
            ticks: { color: "white" },
            grid: { color: "rgba(255, 255, 255, 0.1)" },
          },
          x: {
            title: { display: true, text: "Year", color: "white" },
            ticks: { color: "white" },
            grid: { color: "rgba(255, 255, 255, 0.1)" },
          },
        },
        plugins: {
          legend: { labels: { color: "white" } },
          tooltip: {
            enabled: true,
            mode: "index",
            intersect: false,
          },
        },
        onClick: null, // Disable click events to prevent "crossing out"
        events: ["mousemove", "mouseenter", "mouseout", "mouseleave"], // Only keep hover events
      },
    });

    console.log("Chart created:", window.myBarChart);
  }
};

onMounted(() => {
  sortArticles();
  revealFullHeadlines();

  // Add a slight delay to ensure DOM is fully rendered before creating the chart
  setTimeout(() => {
    loadChartData(); // Load data from our hardcoded CSV
  }, 300);
});
</script>

<style scoped>
.headlines-container {
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
}

.headline-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  flex: 1; /* Take up available space */
  overflow-y: auto;
}

.headline-item {
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  text-align: center;
  min-height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  white-space: pre-wrap;
}

.highlight {
  color: white;
}

.highlight:nth-child(1n) {
  color: red; /* Example: Red for framing words like "genocide" */
}

.rest-text {
  color: white;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.highlight,
.rest-text {
  margin: 0;
  padding: 0;
  display: inline;
}

.chart-container {
  height: 300px; /* Increased height for better visibility */
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  position: relative; /* Required for Chart.js responsive behavior */
}
</style> -->
