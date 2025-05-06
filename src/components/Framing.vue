<template>
  <div class="word-association-container">
    <!-- Main title above everything -->
    <h2 class="section-title main-title">
      How does Turkish Media Frame the Armenian Genocide Today?
    </h2>

    <div class="two-column-layout">
      <!-- Left column with text content -->
      <div class="text-column">
        <p>
          Analysis of the Turkish state-run news agency
          <a
            href="https://www.aa.com.tr/en"
            target="_blank"
            rel="noopener"
            class="agency-link"
            >Anadolu Agency</a
          >
          shows consistent patterns in how the Armenian Genocide is discussed,
          with carefully chosen language that supports Turkey's official stance
          of denial.
        </p>
        <p>
          Words like <span class="highlight-red">"incident,"</span>
          <span class="highlight-red">"so-called genocide,"</span>
          <span class="highlight-red">"1915 events,"</span>and
          <span class="highlight-red">"alleged,"</span>
          <!-- <span class="highlight-red">"claimed"</span> are frequently used, -->
          casting doubt and creating distance from historical reality while
          framing the discourse in terms favorable to the Turkish government
          position.
        </p>

        <!-- Moved explanation paragraph to text column -->
        <p class="text-explanation">
          <strong>Note:</strong>
          When <span class="highlight-gen">"genocide"</span> appears in Turkish
          state media referencing this subject, it's in the context of rejecting
          other countries' recognition of the Armenian Genocide to express
          disapproval. Terms such as
          <span class="highlight-red">"slams," "rejects," and "condemns" </span
          >are used to describe Turkey's response to people, countries, and
          institutions that recognize the genocide or pass resolutions.
        </p>
      </div>

      <!-- Right column with chart -->
      <div class="chart-column">
        <!-- Select dropdown is above the chart -->
        <div class="select-container">
          <label for="word-select">Words most associated with: </label>
          <select id="word-select" v-model="selectedWord">
            <option
              v-for="option in wordOptions"
              :key="option.word"
              :value="option.word"
            >
              {{ option.word }}
            </option>
          </select>
          <!-- Data type toggle -->
          <div class="data-toggle">
            <label>
              <input type="radio" v-model="dataType" value="headlines" />
              Headlines only
            </label>
            <label>
              <input type="radio" v-model="dataType" value="all" />
              Headlines + Content
            </label>
          </div>
        </div>

        <!-- Chart comes after the select -->
        <div class="chart-container" ref="chartContainer">
          <!-- Chart source note inside the chart container -->
          <div class="chart-source-note">
            Based on analysis of 345 articles from 2009-2024
          </div>
        </div>
      </div>
    </div>

    <!-- Content section that shows either headlines or instruction -->
    <div class="content-section">
      <!-- Headline section when a bar is selected -->
      <div class="headlines-section" v-if="selectedWordItem">
        <h3 class="headlines-title">
          <span class="headline-word">{{ selectedWordItem.word }}</span>
          <span class="headline-count"
            >({{ selectedWordItem.count }} occurrences)</span
          >
        </h3>

        <div class="headlines-container">
          <div class="headline-card">
            <!-- Make headline source clickable with URL -->
            <div class="headline-source">
              <a
                :href="selectedWordItem.snippet.url"
                target="_blank"
                rel="noopener"
              >
                {{ selectedWordItem.snippet.source }}
              </a>
            </div>
            <div
              class="headline-text"
              v-html="selectedWordItem.snippet.text"
            ></div>
          </div>
        </div>
      </div>

      <!-- Instruction when no bar is selected -->
      <div class="headlines-instruction" v-else>
        <div class="instruction-text">
          Click on any bubble to see an example headline
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  data() {
    return {
      // Headlines only data (from your provided CSV)
      headlinesData: {
        genocide: [
          { word: "events", count: 5 },
          { word: "motion", count: 4 },
          { word: "claims", count: 3 },
          { word: "so-called", count: 3 },
          { word: "rejects", count: 3 },
          { word: "history", count: 3 },
          { word: "germany", count: 3 },
          { word: "french", count: 2 },
          { word: "denial", count: 2 },
          { word: "must", count: 2 },
        ],
        1915: [
          { word: "events", count: 86 },
          { word: "remarks", count: 17 },
          { word: "statement", count: 12 },
          { word: "biden", count: 11 },
          { word: "condemns", count: 10 },
          { word: "slams", count: 8 },
          { word: "move", count: 8 },
          { word: "parliament", count: 7 },
          { word: "rejects", count: 7 },
          { word: "incidents", count: 7 },
        ],
      },
      // Headlines + Content data (updated data)
      allData: {
        genocide: [
          { word: "events", count: 266 },
          { word: "incidents", count: 202 },
          { word: "presentation", count: 175 },
          { word: "so-called", count: 111 },
          { word: "describes", count: 105 },
          { word: "describing", count: 87 },
          { word: "tragedy", count: 87 },
          { word: "alleged", count: 58 },
          { word: "said", count: 56 },
          { word: "acknowledges", count: 55 },
        ],
        1915: [
          { word: "events", count: 977 },
          { word: "position", count: 211 },
          { word: "deaths", count: 150 },
          { word: "armenians", count: 125 },
          { word: "describes", count: 122 },
          { word: "incidents", count: 122 },
          { word: "tragedy", count: 118 },
          { word: "lives", count: 71 },
          { word: "said", count: 64 },
          { word: "regarding", count: 61 },
        ],
      },
      // Snippets data
      snippets: {
        genocide: {
          incidents: {
            word: "incidents",
            count: 202,
            snippet: {
              source:
                "International Tribunal Must Determine Genocide Crime Says UNGA Head",
              text: "...In other words, in order to describe an <mark>incident</mark> as <mark>genocide</mark>, a competent international tribunal must make a decision to that effect,' Bozkir said at a meeting to mark International Day of Multilateralism and Diplomacy for Peace. US President Joe Biden called the events of 1915 'genocide' on April 24, breaking with a long-held tradition by American presidents of refraining from using the term. Turkey swiftly rejected the term as null and void.",
              url: "https://www.aa.com.tr/en/world/international-tribunal-must-determine-genocide-crime-says-unga-head/2230771",
              publication_date: "2021-05-05",
            },
          },
          describes: {
            word: "describes",
            count: 105,
            snippet: {
              source:
                "1915 Events Used Against Turkiye For Political Purposes Communications Director",
              text: "...'The attempt to <mark>describe</mark> and present the events of 1915 as so-called genocide without any historical and legal justification is nothing more than a slander fueled by political calculations.' Underlining Türkiye's efforts for scholarly research and demonstrate the facts to the world, Altun said: 'It would be beneficial for both parties to address the events of 1915 in a manner that is constructive and balanced and dialogue-oriented, devoid of ideological approaches based on unilateral acts of third countries.'",
              url: "https://www.aa.com.tr/en/turkiye/1915-events-used-against-turkiye-for-political-purposes-communications-director/2878524",
              publication_date: "2023-04-22",
            },
          },
          events: {
            word: "events",
            count: 266,
            snippet: {
              source: "US ATA DC Urges Biden To Reconsider 1915 Events Move",
              text: "Turkish-American protest against Armenian demonstrators over 1915 <mark>events</mark> began after US acknowledgment of Armenian <mark>genocide</mark>.",
              url: "https://www.aa.com.tr/en/americas/us-ata-dc-urges-biden-to-reconsider-1915-events-move/2217608",
              publication_date: "2021-04-22",
            },
          },
          "so-called": {
            word: "so-called",
            count: 111,
            snippet: {
              source: "So Called Armenian Genocide Claim Nothing But Fiction",
              text: "...'Therefore, the <mark>so-called</mark> Armenian genocide claims are nothing but fiction,' he added. 'Russia has always been behind Armenian terror' Pointing out that terrorism is the ideology of Armenian nationalism...",
              url: "https://www.aa.com.tr/en/world/so-called-armenian-genocide-claim-nothing-but-fiction/2218536",
              publication_date: "2021-04-23",
            },
          },
          alleged: {
            word: "alleged",
            count: 58,
            snippet: {
              source: "Turkey Armenia Resolution Undermining Peace Effort",
              text: "Turkey denies the <mark>alleged genocide</mark>, but acknowledges that there were casualties on both sides during the events.",
              url: "https://www.aa.com.tr/en/anadolu-post/turkey-armenia-resolution-undermining-peace-effort/585258",
              publication_date: "2016-06-06",
            },
          },
        },
        1915: {
          events: {
            word: "events",
            count: 977,
            snippet: {
              source: "1915 Events Being Used To Sow Hatred Against Turkey",
              text: "Armenian genocide allegations surrounding the <mark>events of 1915</mark> are being used by the Armenian diaspora and Western politicians to sow hatred against Turkey, said a German political scientist.",
              url: "https://www.aa.com.tr/en/turkey/1915-events-being-used-to-sow-hatred-against-turkey-/1897973",
              publication_date: "2020-07-03",
            },
          },
          position: {
            word: "position",
            count: 211,
            snippet: {
              source: "US Position On Armenian Claims Not Changed US Official",
              text: "The U.S. <mark>position</mark> on Armenian claims of 1915 events has not changed, a spokesperson for the U.S. Embassy in Ankara said Friday. 'The position of the [U.S.] administration [on Armenian claims of 1915 events] has not changed. Our views are reflected in President [Donald Trump]'s definitive statement on this issue from last April,' the spokesperson told Anadolu Agency on condition of anonymity.",
              url: "https://www.aa.com.tr/en/americas/us-position-on-armenian-claims-not-changed-us-official/1672794",
              publication_date: "2019-12-13",
            },
          },
          deaths: {
            word: "deaths",
            count: 150,
            snippet: {
              source: "Turkish FM Calls Armenian Resolution Political Show",
              text: "Turkey's position on the events of 1915 is that the <mark>deaths</mark> of Armenians in eastern Anatolia took place when some sided with invading Russians and revolted against Ottoman forces.",
              url: "https://www.aa.com.tr/en/turkey/turkish-fm-calls-armenian-resolution-political-show-/1672268",
              publication_date: "2019-12-13",
            },
          },
          describes: {
            word: "describes",
            count: 122,
            snippet: {
              source: "Netherlands To Not Use Genocide For 1915 Events",
              text: "The Dutch government will not <mark>describe</mark> the 1915 events involving Armenians as 'genocide', Dutch Deputy Prime Minister Lodewijk Asscher said Saturday.",
              url: "https://www.aa.com.tr/en/europe/netherlands-to-not-use-genocide-for-1915-events-/584358",
              publication_date: "2016-06-04",
            },
          },
          incidents: {
            word: "incidents",
            count: 122,
            snippet: {
              source: "1915 Incidents Should Be Treated Scientifically Expert",
              text: "The Turkish Historical Society (TTK) president, Refik Turan, said on Friday that the 1915 <mark>incidents</mark> should be discussed within a scientific framework based on historical documents.",
              url: "https://www.aa.com.tr/en/turkey/1915-incidents-should-be-treated-scientifically-expert-/560200",
              publication_date: "2016-04-23",
            },
          },
          tragedy: {
            word: "tragedy",
            count: 118,
            snippet: {
              source: "Obama Defines 1915 Incidents As Great Tragedy",
              text: "US President Barack Obama used the expression of 'Meds Yeghern' denoting 'Great <mark>Tragedy</mark>' in Armenian language to mark the incidents of 1915 in his statement released on April 24. Armenians consider April 24 as the anniversary of 1915 incidents.",
              url: "https://www.aa.com.tr/en/turkey/obama-defines-1915-incidents-as-great-tragedy/252449",
              publication_date: "2013-04-24",
            },
          },
        },
      },
      wordOptions: [{ word: "genocide" }, { word: "1915" }],
      selectedWord: "genocide",
      selectedWordItem: null,
      chartRendered: false,
      dataType: "all", // Can be "headlines" or "all"
    };
  },
  computed: {
    selectedWordData() {
      // Return the appropriate dataset based on selected dataType
      const dataset =
        this.dataType === "headlines" ? this.headlinesData : this.allData;
      return dataset[this.selectedWord] || [];
    },
  },
  mounted() {
    this.createChart();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    selectWordItem(word) {
      // Find the word in the current dataset
      const wordItem = this.selectedWordData.find((item) => item.word === word);

      if (wordItem) {
        // Try to find a snippet for this word
        const snippetData = this.snippets[this.selectedWord]?.[word];

        if (snippetData) {
          // Update count to match current dataset
          this.selectedWordItem = {
            ...snippetData,
            count: wordItem.count,
          };
        } else {
          // If no snippet available, create a basic item
          this.selectedWordItem = {
            word: wordItem.word,
            count: wordItem.count,
            snippet: {
              source: "Example from Anadolu Agency",
              text: `The word "<mark>${wordItem.word}</mark>" appears ${
                wordItem.count
              } times in ${
                this.dataType === "headlines"
                  ? "headlines"
                  : "headlines and content"
              } related to ${
                this.selectedWord === "genocide" ? "genocide" : "1915 events"
              }.`,
              url: "https://www.aa.com.tr",
            },
          };
        }
      }
    },
    handleResize() {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.createChart();
      }, 250);
    },
    createChart() {
      // Clear any existing chart
      d3.select(this.$refs.chartContainer).selectAll("svg").remove();

      if (!this.selectedWordData || this.selectedWordData.length === 0) return;

      const sortedData = [...this.selectedWordData]
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Reset selected word when changing datasets
      this.selectedWordItem = null;

      // Get container width
      const containerWidth = this.$refs.chartContainer.clientWidth || 600;

      // Set dimensions and margins
      const margin = { top: 60, right: 60, bottom: 70, left: 60 };
      const width = containerWidth - margin.left - margin.right;
      const height = 480 - margin.top - margin.bottom;

      // Create SVG
      const svg = d3
        .select(this.$refs.chartContainer)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      // Create a size scale for bubbles based on word counts
      const minCount = d3.min(sortedData, (d) => d.count);
      const maxCount = d3.max(sortedData, (d) => d.count);

      const radiusScale = d3
        .scaleSqrt()
        .domain([minCount, maxCount])
        .range([40, 90]);

      // Create a force simulation
      const simulation = d3
        .forceSimulation(sortedData)
        .force("x", d3.forceX(width / 2).strength(0.1))
        .force("y", d3.forceY(height / 2).strength(0.1))
        .force(
          "collide",
          d3
            .forceCollide()
            .radius((d) => radiusScale(d.count) + 2)
            .strength(0.7)
        )
        .force("charge", d3.forceManyBody().strength(5))
        .on("tick", ticked);

      // Create a group for each bubble
      const bubbles = svg
        .selectAll(".bubble-group")
        .data(sortedData)
        .enter()
        .append("g")
        .attr("class", "bubble-group")
        .style("cursor", "pointer");

      // Add the circle elements
      bubbles
        .append("circle")
        .attr("class", "bubble-circle")
        .attr("r", (d) => radiusScale(d.count))
        .attr("fill", "rgba(0, 0, 0, 0.05)")
        .attr("stroke", "rgba(0, 0, 0, 0.5)")
        .attr("stroke-width", 1)
        .transition()
        .duration(800)
        .attr("fill", "rgba(0, 0, 0, 0.1)");

      // Add the text labels
      bubbles
        .append("text")
        .attr("class", "bubble-text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("dy", (d) => -radiusScale(d.count) * 0.12)
        .style(
          "font-size",
          (d) => `${Math.min(18, radiusScale(d.count) * 0.33)}px`
        )
        .style("font-weight", "600")
        .style("pointer-events", "none")
        .text((d) => d.word);

      // Add count labels
      bubbles
        .append("text")
        .attr("class", "count-label")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("dy", (d) => radiusScale(d.count) * 0.3)
        .style(
          "font-size",
          (d) => `${Math.min(14, radiusScale(d.count) * 0.28)}px`
        )
        .style("fill", "#333")
        .style("pointer-events", "none")
        .text((d) => d.count);

      // Function to update positions on each tick of the simulation
      function ticked() {
        bubbles.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
      }

      // Add a frequency label
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + 60)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "#777")
        .text(
          `Word frequency in ${
            this.dataType === "headlines" ? "headlines" : "articles"
          } about the Armenian Genocide`
        );

      // Add interactivity
      bubbles
        .on("mouseover", function (event, d) {
          d3.select(this)
            .select(".bubble-circle")
            .transition()
            .duration(200)
            .attr("fill", "rgba(0, 0, 0, 0.2)")
            .attr("stroke", "#283D3B")
            .attr("stroke-width", 2);
        })
        .on("mouseout", function (event, d) {
          if (!this.selectedWordItem || this.selectedWordItem.word !== d.word) {
            d3.select(this)
              .select(".bubble-circle")
              .transition()
              .duration(200)
              .attr("fill", "rgba(0, 0, 0, 0.1)")
              .attr("stroke", "rgba(0, 0, 0, 0.5)")
              .attr("stroke-width", 1);
          }
        })
        .on("click", (event, d) => {
          this.selectWordItem(d.word);

          // Reset all bubbles first
          d3.selectAll(".bubble-circle")
            .attr("fill", "rgba(0, 0, 0, 0.1)")
            .attr("stroke", "rgba(0, 0, 0, 0.5)")
            .attr("stroke-width", 1);

          // Then highlight selected bubble
          d3.select(event.currentTarget)
            .select(".bubble-circle")
            .attr("fill", "rgba(40, 61, 59, 0.2)")
            .attr("stroke", "#283D3B")
            .attr("stroke-width", 2);
        });

      this.chartRendered = true;
    },
  },
  watch: {
    selectedWord() {
      this.createChart();
      this.selectedWordItem = null;
    },
    dataType() {
      this.createChart();
      this.selectedWordItem = null;
    },
  },
};
</script>

<style scoped>
.word-association-container {
  padding: 10px 15px;
  background-color: #f8fafc;
  max-width: 1200px;
  margin: 40 auto;
  position: relative;
}

/* Increase spacing for main title */
.main-title {
  text-align: center;
  margin-bottom: 25px;
  margin-top: 100px;
  font-size: 1.6rem;
}

/* Two column layout */
.two-column-layout {
  display: flex;
  gap: 30px;
  margin-bottom: 0;
}

.text-column {
  flex: 1;
  margin-top: 80px;
}

.chart-column {
  flex: 1.2;
  margin-top: 80px;
}

.text-column p {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 0.8rem;
  color: #333;
  text-align: left;
}

.highlight-red,
.highlight-gen {
  background-color: rgba(238, 16, 16, 0.759);
  padding: 1px 3px;
  color: white;
  border-radius: 2px;
  display: inline;
  line-height: 1.5;
}

/* Make the generic highlight (genocide) black instead of red */
.highlight-gen {
  background-color: black;
}

.select-container {
  margin-top: 10px;
  padding: 10px 12px;
  background-color: #f0f0f0c9;
  border-radius: 6px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.select-container label {
  margin-right: 0.5rem;
  font-weight: 500;
  white-space: nowrap;
}

.select-container select {
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
  margin-right: 8px;
}

/* Data toggle styles */
.data-toggle {
  margin-left: 20px;
  display: flex;
  gap: 15px;
}

.data-toggle label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  cursor: pointer;
}

.data-toggle input[type="radio"] {
  cursor: pointer;
}

.chart-container {
  width: 100%;
  height: 380px; /* Increase height a bit to accommodate the chart */
  position: relative;
  margin-bottom: 20px; /* Change from -40px to a positive value */
  z-index: 5; /* Lower z-index than content-section */
}

.chart-source-note {
  font-size: 0.75rem;
  color: #666;
  text-align: right;
  font-style: italic;
  position: absolute;
  bottom: -60px;
  right: 10px;
  margin: 0;

  background-color: rgba(255, 255, 255, 0.7);
  padding: 2px 5px;
  border-radius: 3px;
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 20px; /* Change from -170px to a positive value */
  padding-top: 0;
  position: relative; /* Add position relative */
  z-index: 10; /* Ensure content is above chart but below other UI elements */
}

.headlines-section,
.headlines-instruction {
  margin: 0 auto;
  max-width: 1000px;
  position: relative; /* Add position */
  z-index: 15; /* Higher than general content */
}

.headlines-section {
  max-width: 1000px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid #e2e8f0;
  z-index: 50;
  animation: slideUp 0.4s ease-out;
}

.headlines-title {
  background-color: rgba(0, 0, 0, 0.397);
  color: rgb(255, 255, 255);
  margin: 0;
  padding: 10px 15px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.headline-word {
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.headline-count {
  font-size: 0.9rem;
  opacity: 0.8;
  font-weight: normal;
}

.headlines-container {
  padding: 0;
  z-index: 20;
}

.headline-card {
  padding: 8px 15px;
}

.headline-source {
  font-weight: bold;
  font-size: 0.9rem;
  color: #4b7bec;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.headline-source a {
  color: #000000;
  text-decoration: none;
  transition: color 0.2s;
  text-transform: uppercase;
}

.headline-source a:hover {
  color: #2d5bd9;
  text-decoration: underline;
}

.headline-text {
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
}

.headline-text mark {
  background-color: rgba(238, 16, 16, 0.759);
  padding: 1px 3px;
  color: white;
  border-radius: 2px;
  font-weight: 400;
  display: inline;
}

.headlines-instruction {
  margin: 0 auto;
  max-width: 800px;
  padding: 8px;
  text-align: center;
  background-color: #f8f8f8;
  border: 2px dashed #ddd;
  color: #666;
  display: flex;
  align-items: center;
  z-index: 20;
  justify-content: center;
  animation: pulse 2s infinite;
}

.headlines-instruction .instruction-text {
  font-size: 1rem;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(75, 123, 236, 0.4);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(75, 123, 236, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(75, 123, 236, 0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.text-explanation {
  margin-top: 15px;
  margin-bottom: 0;
  padding: 8px 12px;
}

.agency-link {
  color: #232323;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s, text-decoration 0.2s;
}

.agency-link:hover {
  color: #232323;
  text-decoration: underline;
}

/* Responsive layout */
@media (max-width: 900px) {
  .two-column-layout {
    flex-direction: column;
  }

  .text-column,
  .chart-column {
    margin-top: 20px;
  }

  .headlines-section,
  .headlines-instruction {
    max-width: 100%;
  }

  .headline-text {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .select-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .data-toggle {
    margin-left: 0;
  }
}
</style>
