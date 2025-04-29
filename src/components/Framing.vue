<template>
  <div class="word-association-container">
    <div class="two-column-layout">
      <!-- Left column with text content -->
      <div class="text-column">
        <h2 class="section-title">Media Framing Analysis</h2>
        <p>
          Analysis of the Turkish state-run news agency Anadolu shows consistent
          patterns in how the Armenian Genocide is discussed, with carefully
          chosen language that supports Turkey's official stance of denial.
        </p>
        <p>
          Words like "incident," "so-called genocide," "events of 1915,"
          "alleged," and "claimed" are frequently used, casting doubt and
          creating distance from historical reality while framing the discourse
          in terms favorable to the Turkish government position.
        </p>

        <div class="select-container">
          <label for="word-select">Select keyword to analyze: </label>
          <select id="word-select" v-model="selectedWord">
            <option
              v-for="option in wordOptions"
              :key="option.word"
              :value="option.word"
            >
              {{ option.word }}
            </option>
          </select>
        </div>
      </div>

      <!-- Right column with chart -->
      <div class="chart-column">
        <h2 class="chart-title">Top Associated Words</h2>
        <div class="chart-container" ref="chartContainer"></div>
        <div class="chart-footer">
          Showing words associated with: <strong>{{ selectedWord }}</strong>
        </div>
      </div>
    </div>

    <!-- Collapsible examples section -->
    <!-- <div class="examples-section">
      <button
        class="examples-toggle"
        @click="toggleExamples"
        :class="{ 'examples-open': showExamples }"
      >
        {{ showExamples ? "Hide Examples" : "Show Examples" }}
        <span class="toggle-icon">{{ showExamples ? "▲" : "▼" }}</span>
      </button>

      <div class="examples-container" v-if="showExamples">
        <div
          v-for="(item, index) in selectedWordData.slice(0, 10)"
          :key="index"
          class="word-snippets-card"
        >
          <h4 class="word-title">
            {{ item.word }} <span class="word-count">({{ item.count }})</span>
          </h4>
          <div
            v-if="item.snippets && item.snippets.length > 0"
            class="snippets-list"
          >
            <div
              v-for="(snippet, i) in item.snippets.slice(0, 2)"
              :key="i"
              class="snippet-item"
            >
              <p>{{ snippet }}</p>
            </div>
          </div>
          <div v-else class="no-snippets">
            <p>No example contexts available</p>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  data() {
    return {
      wordData: {
        genocide: [
          {
            word: "incident",
            count: 202,
            snippets: [
              "[Turkish Student Grilled By French Intel Over Genocide Denial] Questions on alleged radicalism, Muslim identity  After the incident, Altay was called a week later by intelligence forces to answer questions.",
              "[Turkish Student Grilled By French Intel Over Genocide Denial] Restrictions on freedom of speech  Altay's Father Aydin said that during his meeting with the principal of his son's school, he had been told that the teenager was  'facing a very bad incident, ' and that he could be fined or jailed.",
              "[Turkish Student Grilled By French Intel Over Genocide Denial] The administrators  'exaggerated the incident ' during the conference, he said.",
            ],
          },
          {
            word: "describe",
            count: 200,
            snippets: [
              "[1915 Events Used Against Turkiye For Political Purposes Communications Director] , he said:  'The attempt to describe and present the events of 1915 as so-called genocide without any historical and legal justification is nothing more than a slander fueled by political calculations. '",
              "[International Tribunal Must Determine Genocide Crime Says Unga Head] In other words, in order to describe an incident as genocide, a competent international tribunal must make a decision to that effect, ' Bozkir said at a meeting to mark International Day of Multilateralism and Diplomacy for Peace.",
              "[Analysis How Will Biden S Genocide Statement Impact Regional Cooperation And Peace] The use of the term 'genocide' by US President Joe Biden to describe the events of 1915 has sparked a slew of legal and political debates.",
            ],
          },
          {
            word: "event",
            count: 154,
            snippets: [
              "[Turkish Community In Washington Holds Counter Protest Against Armenian Demonstrators Over 1915 Events] Organized by the Turkish-American National Steering Committee (TASC), the event began with the reciting of the national anthem and continued with chanting.",
              "[Turkish President Pursues Global Peace With Busy Diplomatic Agenda] At the event, Erdogan met separately with UN Secretary-General Antonio Guterres, as well as Presidents Alejandro Giammattei of Guatemala, Alexander Van der Bellen of Austria, Andrzej Duda of Poland, and Ersin Tatar of the Turkish Republic of Northern Cyprus (TRNC).",
              "[Turkish President Pursues Global Peace With Busy Diplomatic Agenda] Erdogan also met with Libyan Presidential Council President Mohammad Younes Menfi, President of the Yemeni Presidential Council Rashad Al-Alimi, and King of Jordan Abdullah II during the event, while also receiving Georgia's Prime Minister Irakli Garibashvili, Israeli then-premier Yair Lapid, German Chancellor Scholz, Japanese Prime Minister Fumio Kishida, Lebanese premier Najib Mikati, and Britain's then-Prime Minister Elizabeth Truss.  President of the World Jewish Congress Ronald Lauder and FIFA President Gianni Infantino were also guests of the Turkish president in New York",
            ],
          },
          { word: "call", count: 125, snippets: [] },
          { word: "not", count: 76, snippets: [] },
          { word: "acknowledge", count: 53, snippets: [] },
          {
            word: "alleged",
            count: 47,
            snippets: [
              "[Turkish Student Grilled By French Intel Over Genocide Denial] Questions on alleged radicalism, Muslim identity  After the incident, Altay was called a week later by intelligence forces to answer questions.",
            ],
          },
          { word: "claim", count: 46, snippets: [] },
          { word: "allegation", count: 41, snippets: [] },
          {
            word: "say",
            count: 39,
            snippets: [
              "[Opinion Did The Armenian Lobby Take Over Disney] Turkish users took to social media to say they were cancelling their Disney+ subscriptions.",
              "[Turkiye Hopeful On Mediation Between Ukraine Russia] 'On the one hand, you say: 'Let's normalize relations overnight and open the borders.'",
              "[Shopkeepers In Yerevan Expect More Tourists As Flights From Istanbul Resume] 'But since I am not an expert in economics, I cannot say for sure what the opening of the borders will bring.",
            ],
          },
          {
            word: "accept",
            count: 36,
            snippets: [
              "[Turkiye's Communications Director Regarding 1915 Events] Turkiye will never accept such efforts to politicize any human tragedy, Turkiye's Communications Director said Sunday regarding the 1915 events.",
              "[Turkiye's Communications Director Regarding 1915 Events] He (Erdogan) has also fought every effort to shamelessly politicize any human tragedy. We will never accept such efforts and will always look toward building peace in our region.",
              "[Armenian-Turkish Relations Analysis] The Turkish side stated they would not accept preconditions for normalization of relations.",
            ],
          },
        ],
        1915: [
          {
            word: "event",
            count: 976,
            snippets: [
              "[Turkish Community In Washington Holds Counter Protest Against Armenian Demonstrators Over 1915 Events] Organized by the Turkish-American National Steering Committee (TASC), the event began with the reciting of the national anthem and continued with chanting.",
              "[Turkish President Pursues Global Peace With Busy Diplomatic Agenda] At the event, Erdogan met separately with UN Secretary-General Antonio Guterres, as well as Presidents Alejandro Giammattei of Guatemala, Alexander Van der Bellen of Austria, Andrzej Duda of Poland, and Ersin Tatar of the Turkish Republic of Northern Cyprus (TRNC).",
              "[Turkish President Pursues Global Peace With Busy Diplomatic Agenda] Erdogan also met with Libyan Presidential Council President Mohammad Younes Menfi, President of the Yemeni Presidential Council Rashad Al-Alimi, and King of Jordan Abdullah II during the event, while also receiving Georgia's Prime Minister Irakli Garibashvili, Israeli then-premier Yair Lapid, German Chancellor Scholz, Japanese Prime Minister Fumio Kishida, Lebanese premier Najib Mikati, and Britain's then-Prime Minister Elizabeth Truss.  President of the World Jewish Congress Ronald Lauder and FIFA President Gianni Infantino were also guests of the Turkish president in New York",
            ],
          },
          {
            word: "genocide",
            count: 267,
            snippets: [
              "[Turkiye Condemns Law Passed By Uruguayan Parliament Recognizing Events Of 1915 As Genocide] Türkiye on Tuesday condemned a newly passed law in Uruguay that recognized the events of 1915 as a  'genocide. '",
              "[Turkiye Condemns Law Passed By Uruguayan Parliament Recognizing Events Of 1915 As Genocide] 'We reject and condemn the law adopted by the Parliament of Uruguay and signed by the Acting President of Uruguay, recognizing the events of 1915 as 'genocide', ' the Turkish Foreign Ministry said a statement.",
              "[Turkiye Condemns Law Passed By Uruguayan Parliament Recognizing Events Of 1915 As Genocide] Asserting that the legislation contradicts international law, especially the 1948 UN Convention on the Prevention and Punishment of Genocide, the ministry said it was  'null and void. '   'Parliaments and politicians do not have the authority to pass judgments on controversial historical issues, ' it added.",
            ],
          },
          {
            word: "position",
            count: 211,
            snippets: [
              "[Turkiye's Communications Director Regarding 1915 Events] Turkiye's position on the 1915 events remains that the death of Armenians in eastern Anatolia took place when some sided with invading Russians and revolted against Ottoman forces.",
              "[Turkiye Condemns Law Passed By Uruguayan Parliament Recognizing Events Of 1915 As Genocide] Türkiye objects to the presentation of the incidents as 'genocide,' describing them as a tragedy in which both sides suffered casualties.",
              "[Embattled US Senator Menendez S Decades Of Trying To Block Turkiye At Every Turn] Menendez's position has been consistently hostile to any Turkish attempt to modernize their defense systems.",
            ],
          },
          { word: "death", count: 155, snippets: [] },
          {
            word: "describe",
            count: 136,
            snippets: [
              "[1915 Events Used Against Turkiye For Political Purposes Communications Director] , he said:  'The attempt to describe and present the events of 1915 as so-called genocide without any historical and legal justification is nothing more than a slander fueled by political calculations. '",
              "[International Tribunal Must Determine Genocide Crime Says Unga Head] In other words, in order to describe an incident as genocide, a competent international tribunal must make a decision to that effect, ' Bozkir said at a meeting to mark International Day of Multilateralism and Diplomacy for Peace.",
              "[Analysis How Will Biden S Genocide Statement Impact Regional Cooperation And Peace] The use of the term 'genocide' by US President Joe Biden to describe the events of 1915 has sparked a slew of legal and political debates.",
            ],
          },
          {
            word: "incident",
            count: 120,
            snippets: [
              "[Turkish Student Grilled By French Intel Over Genocide Denial] Questions on alleged radicalism, Muslim identity  After the incident, Altay was called a week later by intelligence forces to answer questions.",
              "[Turkish Student Grilled By French Intel Over Genocide Denial] Restrictions on freedom of speech  Altay's Father Aydin said that during his meeting with the principal of his son's school, he had been told that the teenager was  'facing a very bad incident, ' and that he could be fined or jailed.",
              "[Turkish Student Grilled By French Intel Over Genocide Denial] The administrators  'exaggerated the incident ' during the conference, he said.",
            ],
          },
          { word: "tragedy", count: 117, snippets: [] },
          {
            word: "ottoman",
            count: 98,
            snippets: [
              "[US Welcomes Meeting Of Turkish Armenian Representatives As Positive Step Toward Peace In South Caucasus] There are other contentious issues, including the events of 1915 in the Ottoman Empire.",
              "[Turkiye Condemns Law Passed By Uruguayan Parliament Recognizing Events Of 1915 As Genocide] Türkiye, on the events of 1915, says the death of Armenians in eastern Anatolia took place when some sided with invading Russians and revolted against Ottoman forces.",
              "[Turkiye Says Chilean Chamber Of Deputies Resolution On 1915 Events Is Null And Void] Türkiye on the events of 1915 says deaths of Armenians in eastern Anatolia took place when some sided with invading Russians and revolted against Ottoman forces.",
            ],
          },
          { word: "life", count: 70, snippets: [] },
          { word: "biden", count: 60, snippets: [] },
          { word: "eastern", count: 59, snippets: [] },
        ],
      },
      wordOptions: [{ word: "genocide" }, { word: "1915" }],
      selectedWord: "genocide",
      showExamples: false, // Initially hidden
    };
  },
  computed: {
    selectedWordData() {
      return this.wordData[this.selectedWord];
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
    toggleExamples() {
      this.showExamples = !this.showExamples;
    },
    handleResize() {
      // Debounce resize events
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.createChart();
      }, 250);
    },
    createChart() {
      // Clear any existing chart
      d3.select(this.$refs.chartContainer).selectAll("*").remove();

      if (!this.selectedWordData) return;

      const sortedData = [...this.selectedWordData]
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Get container width
      const containerWidth = this.$refs.chartContainer.clientWidth || 600;

      // Set dimensions and margins
      const margin = { top: 20, right: 30, bottom: 90, left: 60 };
      const width = containerWidth - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Create SVG
      const svg = d3
        .select(this.$refs.chartContainer)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      // X scale
      const x = d3
        .scaleBand()
        .domain(sortedData.map((d) => d.word))
        .range([0, width])
        .padding(0.1);

      // Y scale
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(sortedData, (d) => d.count) * 1.1])
        .range([height, 0]);

      // Add X axis
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      svg.append("g").call(d3.axisLeft(y));

      // Add bars with animation
      svg
        .selectAll("rect")
        .data(sortedData)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.word))
        .attr("width", x.bandwidth())
        .attr("y", height) // Start from bottom
        .attr("height", 0)
        .transition()
        .duration(800)
        .attr("y", (d) => y(d.count))
        .attr("height", (d) => height - y(d.count))
        .attr("fill", "#000000"); // Black bars

      // Add bar labels
      svg
        .selectAll(".bar-label")
        .data(sortedData)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", (d) => x(d.word) + x.bandwidth() / 2)
        .attr("y", (d) => y(d.count) - 5)
        .attr("text-anchor", "middle")
        .style("fill", "#333")
        .style("font-size", "12px")
        .text((d) => d.count);
    },
  },
  watch: {
    selectedWord() {
      this.createChart();
    },
  },
};
</script>

<style scoped>
.word-association-container {
  padding: 20px;
  background-color: #f8fafc;
  border-radius: 8px;
  max-width: 1200px;
  margin: 0 auto;
}

.two-column-layout {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
}

.text-column {
  flex: 1;
}

.chart-column {
  flex: 1.2;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #111;
}

.chart-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
}

.text-column p {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1.2rem;
  color: #333;
}

.select-container {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 6px;
}

.select-container label {
  margin-right: 0.5rem;
  font-weight: 500;
}

.select-container select {
  padding: 8px 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.chart-container {
  width: 100%;
  height: 400px;
}

.chart-footer {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #555;
  text-align: center;
}

/* Example dropdown styling */
.examples-section {
  width: 100%;
  margin-top: 20px;
  border-top: 1px solid #e2e8f0;
  padding-top: 20px;
}

.examples-toggle {
  width: 100%;
  padding: 15px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;
}

.examples-toggle:hover {
  background-color: #e8e8e8;
}

.examples-toggle.examples-open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: 1px solid #ddd;
}

.toggle-icon {
  font-size: 12px;
  transition: transform 0.3s;
}

.examples-container {
  margin-top: 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-top: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: white;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
}

.word-snippets-card {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 15px;
  background-color: #f8fafc;
}

.word-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.word-count {
  font-weight: normal;
  color: #666;
}

.snippets-list {
  margin-top: 10px;
}

.snippet-item {
  margin-bottom: 8px;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  border-left: 3px solid #ddd;
  font-size: 0.9rem;
}

.snippet-item p {
  margin: 0;
  line-height: 1.5;
}

.no-snippets {
  color: #888;
  font-style: italic;
  font-size: 0.9rem;
  padding: 10px 0;
}

/* Responsive layout */
@media (max-width: 900px) {
  .two-column-layout {
    flex-direction: column;
  }

  .examples-container {
    grid-template-columns: 1fr;
  }
}
</style>
