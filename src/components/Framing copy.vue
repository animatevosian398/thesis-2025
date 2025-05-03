<template>
  <div class="word-association-container">
    <!-- Main title above everything -->
    <h2 class="section-title main-title">
      How does the Turkish Media Frame the Armenian Genocide Today?
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
          Words like <span class="highlight">"incident,"</span>
          <span class="highlight">"so-called genocide,"</span>
          <span class="highlight">"1915 events,"</span>
          <span class="highlight">"alleged,"</span> and
          <span class="highlight">"claimed"</span> are frequently used, casting
          doubt and creating distance from historical reality while framing the
          discourse in terms favorable to the Turkish government position.
        </p>

        <!-- Moved explanation paragraph to text column -->
        <p class="text-explanation">
          <strong>Note:</strong>
          When <span class="highlight-gen">"genocide"</span> appears in Turkish
          state media referencing this subject, it's in the context of rejecting
          other countries' recognition of the Armenian Genocide to express
          disapproval.
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
          <!-- <span class="chart-footer"
            >Showing: <strong>{{ selectedWord }}</strong></span
          > -->
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
        <!-- <div class="instruction-icon">👆</div> -->
        <div class="instruction-text">
          Click on any bar to see an example headline
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
      wordData: {
        genocide: [
          {
            word: "incident",
            count: 202,
            snippet: {
              source:
                "International Tribunal Must Determine Genocide Crime Says UNGA Head",
              text: "...In other words, in order to describe an <mark>incident</mark as <mark>genocide</mark>, a competent international tribunal must make a decision to that effect, ' Bozkir said at a meeting to mark International Day of Multilateralism and Diplomacy for Peace.  US President Joe Biden called the events of 1915  'genocide ' on April 24, breaking with a long-held tradition by American presidents of refraining from using the term.  Turkey swiftly rejected the term as null and void.",
              url: "https://www.aa.com.tr/en/world/international-tribunal-must-determine-genocide-crime-says-unga-head/2230771",
              publication_date: "2021-05-05",
            },
          },
          {
            word: "describe",
            count: 200,
            snippet: {
              source:
                "1915 Events Used Against Turkiye For Political Purposes Communications Director",
              text: "...'The attempt to <mark>describe</mark> and present the events of 1915 as so-called genocide without any historical and legal justification is nothing more than a slander fueled by political calculations. '  Underlining Türkiye’s efforts for scholarly research and demonstrate the facts to the world, Altun said:  'It would be beneficial for both parties to address the events of 1915 in a manner that is constructive and balanced and dialogue-oriented, devoid of ideological approaches based on unilateral acts of third countries. ' ",
              url: "https://www.aa.com.tr/en/turkiye/1915-events-used-against-turkiye-for-political-purposes-communications-director/2878524",
              publication_date: "2023-04-22",
            },
          },
          {
            word: "event",
            count: 154,
            snippet: {
              source: "US ATA DC Urges Biden To Reconsider 1915 Events Move",
              text: "Turkish-American protest against Armenian demonstrators over 1915 <mark>events</mark> began after US acknowledgment of Armenian <mark>genocide</mark>.",
              url: "https://www.aa.com.tr/en/americas/us-ata-dc-urges-biden-to-reconsider-1915-events-move/2217608",
              publication_date: "2021-04-22",
            },
          },
          {
            word: "call",
            count: 125,
            snippet: {
              source: "So Called Armenian Genocide Claim Nothing But Fiction",
              text: "...'Therefore, the so-called Armenian genocide claims are nothing but fiction, ' he added.  'Russia has always been behind Armenian terror'  Pointing out that terrorism is the ideology of Armenian nationalism...",
              url: "https://www.aa.com.tr/en/world/so-called-armenian-genocide-claim-nothing-but-fiction/2218536",
              publication_date: "2021-04-23",
            },
          },
          {
            word: "not",
            count: 76,
            snippet: {
              source:
                "Interview Armenia Has Refused To Open Their Archives US Lawyer",
              text: " The killings were <mark>not</mark> genocide.  And if you're looking at what transpired in World War I, even taking the Armenian Ottomans at their own words, it clearly was not genocide.  The Armenian Ottomans, they revolted in 1915. They were citizens of the Ottoman Empire. They owed them a duty of loyalty and were seeking to revolt in order to obtain political independence from the Ottoman Empire.",
              url: "https://www.aa.com.tr/en/world/interview-armenia-has-refused-to-open-their-archives-us-lawyer/2228020",
              publication_date: "2021-05-03",
            },
          },
          {
            word: "acknowledge",
            count: 53,
            snippet: {
              source: "US Lawmakers Submit Armenian Resolution",
              text: "Ankara does not accept the alleged genocide but acknowledges that there were casualties on both sides during the events of World War I.",
              url: "https://www.aa.com.tr/en/americas/us-lawmakers-submit-armenian-resolution/1448556",
              publication_date: "2019-04-11",
            },
          },
          {
            word: "alleged",
            count: 47,
            snippet: {
              source: "Turkey Armenia Resolution Undermining Peace Effort",
              text: "Turkey denies the <mark>alleged genocide</mark>, but acknowledges that there were casualties on both sides during the events.  ",
              url: "https://www.aa.com.tr/en/anadolu-post/turkey-armenia-resolution-undermining-peace-effort/585258",
              publication_date: "2016-06-06",
            },
          },
          {
            word: "claim",
            count: 46,
            snippet: {
              source: "Erdogan Tells Germany To Look At Own Genocide History",
              text: 'Turkish President Recep Tayyip Erdogan on Sunday slammed Germany again over its parliament\'s non-binding resolution on Armenian "genocide" <mark>claims</mark>',
              url: "https://www.aa.com.tr/en/europe/erdogan-tells-germany-to-look-at-own-genocide-history/584776",
              publication_date: "2016-06-05",
            },
          },
          {
            word: "allegation",
            count: 41,
            snippet: {
              source: "Historian Urges Turks To Tell Their Armenian Story",
              text: "American historian Justin McCarthy says Armenian <mark>allegations</mark> of genocide in 1915 continue to make it difficult for Turks to tell their own history of the tragic period at the end of the World War I. ",
              url: "https://www.aa.com.tr/en/politics/historian-urges-turks-to-tell-their-armenian-story/166639",
              publication_date: "2014-04-16",
            },
          },
          {
            word: "say",
            count: 39,
            snippet: {
              source:
                "Turkiye Says Chilean Chamber Of Deputies Resolution On 1915 Events Is Null And Void",
              text: "The Chilean Chamber of Deputies' resolution on recognizing the events of 1915 as “genocide” is “null and void,” Türkiye’s Foreign Ministry said on Thursday. ",
              url: "https://www.aa.com.tr/en/turkiye/turkiye-says-chilean-chamber-of-deputies-resolution-on-1915-events-is-null-and-void/3202050",
              url: "https://www.aa.com.tr/en/turkiye/turkiye-says-chilean-chamber-of-deputies-resolution-on-1915-events-is-null-and-void/3202050",
              publication_date: "2024-04-25",
            },
          },
        ],
        1915: [
          {
            word: "event",
            count: 976,
            snippet: {
              source: "1915 Events Being Used To Sow Hatred Against Turkey",
              text: "Armenian genocide allegations surrounding the <mark>events of 1915</mark> are being used by the Armenian diaspora and Western politicians to sow hatred against Turkey, said a German political scientist. ",
              url: "https://www.aa.com.tr/en/turkey/1915-events-being-used-to-sow-hatred-against-turkey-/1897973",
              publication_date: "2020-07-03",
            },
          },
          {
            word: "genocide",
            count: 267,
            snippet: {
              source: "Historian Rejects Genocide In 1915 Armenian Events",
              text: "French historian Maxime Guan rejected the classification of 1915 events as  <mark>'genocide '</mark> against Armenians and argued there were no systematic massacres. ",
              url: "https://www.aa.com.tr/en/politics/historian-rejects-genocide-in-1915-armenian-events/2128609",
              publication_date: "2021-01-31",
            },
          },
          {
            word: "position",
            count: 211,
            snippet: {
              source: "US Position On Armenian Claims Not Changed US Official",
              text: "The U.S. <mark>position</mark> on Armenian claims of 1915 events has not changed, a spokesperson for the U.S. Embassy in Ankara said Friday.  “The position of the [U.S.] administration [on Armenian claims of 1915 events] has not changed. Our views are reflected in President [Donald Trump]’s definitive statement on this issue from last April,” the spokesperson told Anadolu Agency on condition of anonymity. ",
              url: "https://www.aa.com.tr/en/americas/us-position-on-armenian-claims-not-changed-us-official/1672794",
              publication_date: "2019-12-13",
            },
          },
          {
            word: "death",
            count: 155,
            snippet: {
              source: "Turkish FM Calls Armenian Resolution Political Show",
              text: "Turkey's position on the events of 1915 is that the <mark>deaths</mark> of Armenians in eastern Anatolia took place when some sided with invading Russians and revolted against Ottoman forces.",
              url: "https://www.aa.com.tr/en/turkey/turkish-fm-calls-armenian-resolution-political-show-/1672268",
              url: "https://www.aa.com.tr/en/turkey/turkish-fm-calls-armenian-resolution-political-show-/1672268",
              publication_date: "2019-12-13",
            },
          },
          {
            word: "describe",
            count: 136,
            snippet: {
              source: "Netherlands To Not Use Genocide For 1915 Events",
              text: "The Dutch government will not <mark>describe</mark> the 1915 events involving Armenians as  'genocide ', Dutch Deputy Prime Minister Lodewijk Asscher said Saturday.",
              url: "https://www.aa.com.tr/en/europe/netherlands-to-not-use-genocide-for-1915-events-/584358",
              publication_date: "2016-06-04",
            },
          },
          {
            word: "incident",
            count: 120,
            snippet: {
              source: "1915 Incidents Should Be Treated Scientifically Expert",
              text: "The Turkish Historical Society (TTK) president, Refik Turan, said on Friday that the 1915 <mark>incidents</mark> should be discussed within a scientific framework based on historical documents.",
              url: "https://www.aa.com.tr/en/turkey/1915-incidents-should-be-treated-scientifically-expert-/560200",
              publication_date: "2016-04-23",
            },
          },
          {
            word: "tragedy",
            count: 117,
            snippet: {
              source: "Obama Defines 1915 Incidents As Great Tragedy",
              text: "US President Barack Obama used the expression of  'Meds Yeghern ' denoting  'Great <mark>Tragedy</mark>' in Armenian language to mark the incidents of 1915 in his statement released on April 24.  Armenians consider April 24 as the anniversary of 1915 incidents.",
              url: "https://www.aa.com.tr/en/turkey/obama-defines-1915-incidents-as-great-tragedy/252449",
              publication_date: "2013-04-24",
            },
          },
          {
            word: "ottoman",
            count: 98,
            snippet: {
              source: "Merkel Calls For Historical Commission Into 1915 Events",
              text: "Germany’s Angela Merkel on Tuesday called for the deaths of Armenian and Turkish <mark>Ottomans </mark>in 1915 to be investigated by a commission of historians. ",
              url: "https://www.aa.com.tr/en/europe/merkel-calls-for-historical-commission-into-1915-events/586009",
              publication_date: "2016-06-07",
            },
          },
          {
            word: "life",
            count: 70,
            snippet: {
              source: "Trump Describes 1915 Events As Meds Yeghern",
              text: "The Turkish president offered condolences to the families of Ottoman Armenians who lost their <mark>lives</mark> during the 1915 events. He also offered condolences to the Turkish nation over the losses of life of millions of Ottoman citizens due to wars, migrations, conflicts, and diseases during the same period",
              url: "https://www.aa.com.tr/en/politics/trump-describes-1915-events-as-meds-yeghern/1127158",
              publication_date: "2018-04-24",
            },
          },
          {
            word: "biden",
            count: 60,
            snippet: {
              source: "Bidens 1915 Events Move To Not Affect Legal Status",
              text: "US President Joe <mark>Biden’s</mark> decision to recognize the 1915 events as “genocide” is not intended to affect Turkey’s sovereign immunity in the US, the State Department said on Friday.  “The President's recent statement was not intended to impact Turkey's sovereign immunity from the civil jurisdiction of United States courts, which is governed by the provisions of the Foreign Sovereign Immunities Act,” a State Department spokesperson said on condition of anonymity.  Biden formally recognized the 1915 events as genocide on April 24, breaking with a long-held tradition by American presidents of refraining from using the term and drawing a stiff rebuke from Ankara.  Turkish President Recep Tayyip Erdogan called Biden's remarks  'unfounded, unjust and contrary to the facts about the painful events that took place more than a century ago.''",
              url: "https://www.aa.com.tr/en/politics/bidens-1915-events-move-to-not-affect-legal-status/2225900",
              url: "https://www.aa.com.tr/en/politics/bidens-1915-events-move-to-not-affect-legal-status/2225900",
              publication_date: "2021-04-30",
            },
          },
        ],
      },
      wordOptions: [{ word: "genocide" }, { word: "1915" }],
      selectedWord: "genocide",
      selectedWordItem: null,
      chartRendered: false,
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

    // Set up the Intersection Observer for the explanation paragraph
    this.$nextTick(() => {
      const options = {
        root: null, // use the viewport
        rootMargin: "0px",
        threshold: 0.1, // trigger when 10% of the element is visible
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the visible class when it enters viewport
            entry.target.classList.add("visible");
            // Once it's visible, no need to observe anymore
            observer.unobserve(entry.target);
          }
        });
      }, options);

      // Start observing the explanation paragraph
      if (this.$refs.explanation) {
        observer.observe(this.$refs.explanation);
      }
    });
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    selectWordItem(word) {
      const wordItem = this.selectedWordData.find((item) => item.word === word);
      this.selectedWordItem = wordItem || null;

      // Highlight the selected bar
      if (this.chartRendered && wordItem) {
        // Reset all bars to original color
        d3.select(this.$refs.chartContainer)
          .selectAll(".bar-rect")
          .attr("fill", "black");

        // Find and highlight the selected bar
        d3.select(this.$refs.chartContainer)
          .selectAll(".bar-group")
          .filter((d) => d.word === word)
          .select(".bar-rect")
          .attr("fill", "#283D3B");
      }
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
      d3.select(this.$refs.chartContainer).selectAll("svg").remove();

      if (!this.selectedWordData) return;

      const sortedData = [...this.selectedWordData]
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Reset selected word when changing datasets
      this.selectedWordItem = null;

      // Get container width
      const containerWidth = this.$refs.chartContainer.clientWidth || 600;

      // Set dimensions and margins - slightly reduced bottom margin to fit better
      const margin = { top: 30, right: 30, bottom: 70, left: 70 };
      const width = containerWidth - margin.left - margin.right;
      const height = 380 - margin.top - margin.bottom;

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

      // Add bars with animation and interactivity
      const bars = svg
        .selectAll(".bar-group")
        .data(sortedData)
        .enter()
        .append("g")
        .attr("class", "bar-group");

      // Add invisible wider hitbox for better hover experience
      bars
        .append("rect")
        .attr("class", "bar-hitbox")
        .attr("x", (d) => x(d.word) - 5)
        .attr("width", x.bandwidth() + 10)
        .attr("y", 0)
        .attr("height", height)
        .attr("fill", "transparent")
        .style("cursor", "pointer");

      // Add the actual visible bar
      bars
        .append("rect")
        .attr("class", "bar-rect")
        .attr("x", (d) => x(d.word))
        .attr("width", x.bandwidth())
        .attr("y", height) // Start from bottom
        .attr("height", 0)
        .attr("fill", "black") // Blue bars
        .style("cursor", "pointer")
        .transition()
        .duration(800)
        .attr("y", (d) => y(d.count))
        .attr("height", (d) => height - y(d.count));

      // Add event listeners for both the hitbox and visible bar
      bars
        .selectAll("rect")
        .on("mouseover", (event, d) => {
          // Only highlight if not already selected
          if (!this.selectedWordItem || this.selectedWordItem.word !== d.word) {
            d3.select(event.target.parentNode)
              .select(".bar-rect")
              .attr("fill", "#77878B"); // Semi-transparent highlight
            // .attr("fill", "#C44536"); // Semi-transparent highlight
          }
        })
        .on("mouseout", (event, d) => {
          // Reset bar color on mouseout unless it's the selected one
          if (!this.selectedWordItem || this.selectedWordItem.word !== d.word) {
            d3.select(event.target.parentNode)
              .select(".bar-rect")
              .attr("fill", "black");
          }
        })
        .on("click", (event, d) => {
          // Toggle selection
          if (this.selectedWordItem && this.selectedWordItem.word === d.word) {
            this.selectedWordItem = null;
            d3.select(event.target.parentNode)
              .select(".bar-rect")
              .attr("fill", "black");
          } else {
            this.selectWordItem(d.word);
          }
        });

      // Add bar labels
      svg
        .selectAll(".bar-label")
        .data(sortedData)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", (d) => x(d.word) + x.bandwidth() / 2)
        .attr("y", (d) => y(d.count) - 5) // Moved slightly higher
        .attr("text-anchor", "middle")
        .style("fill", "#333")
        .style("font-size", "11px") // Smaller font
        .text((d) => d.count);

      // Add annotation if the word "genocide" exists in the chart
      const genocideData = sortedData.find((d) => d.word === "genocide");
      if (genocideData && this.selectedWord === "1915") {
        const genocideX = x("genocide") + x.bandwidth() / 2;
        const genocideY = y(genocideData.count);

        // Add the annotation arrow
        svg
          .append("line")
          .attr("x1", genocideX)
          .attr("y1", genocideY - 30)
          .attr("x2", genocideX)
          .attr("y2", genocideY - 10)
          .attr("stroke", "#FF5252")
          .attr("stroke-width", 2)
          .attr("marker-end", "url(#arrow)");

        // Add arrowhead marker definition
        svg
          .append("defs")
          .append("marker")
          .attr("id", "arrow")
          .attr("viewBox", "0 0 10 10")
          .attr("refX", 5)
          .attr("refY", 5)
          .attr("markerWidth", 6)
          .attr("markerHeight", 6)
          .attr("orient", "auto")
          .append("path")
          .attr("d", "M 0 0 L 10 5 L 0 10 z")
          .attr("fill", "#FF5252");

        // Add the annotation text (more compact)
        svg
          .append("text")
          .attr("x", genocideX)
          .attr("y", genocideY - 40)
          .attr("text-anchor", "middle")
          .attr("font-size", "11px")
          .attr("font-weight", "bold")
          .attr("fill", "#FF5252")
          .text('"Genocide" appears when refuting recognition');
      }

      // Add X axis label (more compact)
      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 5)
        .style("font-size", "11px")
        .style("fill", "#333")
        .text("Associated Words");

      // Add Y axis label (more compact)
      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 15)
        .attr("x", -height / 2)
        .style("font-size", "11px")
        .style("fill", "#333")
        .text("Frequency");

      // Set flag that chart has been rendered
      this.chartRendered = true;
    },
  },
  watch: {
    selectedWord() {
      this.createChart();
      this.selectedWordItem = null; // Reset selected word when changing datasets
    },
  },
};
</script>

<style scoped>
.word-association-container {
  padding: 10px 15px;
  background-color: #f8fafc;
  /* border-radius: 8px; */
  max-width: 1200px;
  margin: 40 auto;
  position: relative;
}

/* Increase spacing for main title */
.main-title {
  text-align: center;
  margin-bottom: 25px; /* Increased from 8px */
  margin-top: 100px; /* Add top margin */
  font-size: 1.6rem;
}

/* Move columns down by increasing their top margins */
.text-column {
  flex: 1;
  margin-top: 80px; /* Increased from 15px */
}

.chart-column {
  flex: 1.2;
  margin-top: 80px; /* Increased from 15px */
}

/* Reset the negative margin on content section - make it more negative to move up */
.content-section {
  display: flex;
  flex-direction: column;
  gap: 5px; /* Reduced from 15px for tighter spacing */
  margin-top: -170px; /* More negative margin to pull content higher */
  padding-top: 0;
}

/* Fix two-column layout spacing */
.two-column-layout {
  display: flex;
  gap: 30px; /* Increased from 20px */
  margin-bottom: 0; /* Reduced from 20px */
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: #111;
}

.chart-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  text-align: center;
}

.text-column p {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 0.8rem;
  color: #333;
  text-align: left;
}
.highlight-gen {
  background-color: black;
  color: white;
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

/* Reduce chart container height to bring elements closer */
.chart-container {
  width: 100%;
  height: 320px; /* Further reduced from 340px */
  position: relative;
  margin-bottom: -40px; /* More negative margin to pull elements up */
}

/* Position source note directly in the chart container */
.chart-source-note {
  font-size: 0.75rem;
  color: #666;
  text-align: right;
  font-style: italic;
  position: absolute;
  bottom: 3px;
  right: 10px;
  margin: 0;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 2px 5px;
  border-radius: 3px;
}

/* Move "showing" text into the select container */
.chart-footer {
  margin: 0 0 0 10px;
  font-size: 0.9rem;
  color: #555;
  display: inline-block;
}

.highlight {
  background-color: rgba(238, 16, 16, 0.759);
  padding: 1px 1px;
  color: white;
}

/* Make headlines sections more compact */
.headlines-section,
.headlines-instruction {
  margin: 0 auto;
  max-width: 1000px;
}

.headlines-section {
  max-width: 1000px;
  background-color: white;
  /* border-radius: 8px; */
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
  padding: 8px 15px; /* Reduced top/bottom padding from 12px to 8px */
  /* border-bottom: 1px solid #edf2f7; */
}

.headline-source {
  font-weight: bold;
  font-size: 0.9rem;
  color: #4b7bec;
  margin-bottom: 6px;
  text-transform: uppercase; /* Add this line to make sources uppercase */
  letter-spacing: 0.3px; /* Add slight letter spacing for better readability */
}

.headline-source a {
  color: #000000;
  text-decoration: none;
  transition: color 0.2s;
  text-transform: uppercase; /* Ensure links are also uppercase */
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
  background-color: #dfff1c;
  padding: 0 2px;
  font-weight: 500;
  color: #000000;
}

.headlines-instruction {
  margin: 0 auto; /* Removed margin completely */
  max-width: 800px;
  padding: 8px; /* Reduced from 12px */
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

.headlines-instruction .instruction-icon {
  font-size: 1.5rem;
  margin-right: 10px;
  color: #4b7bec;
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

.chart-explanation {
  margin-top: -15px; /* Add negative top margin */
  padding: 8px 12px;
  background-color: #f8f8f8;
  border-left: 4px solid #ff5252;
  color: #333;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  text-align: center;
  z-index: 5;
  position: relative;
  margin-bottom: 0; /* Remove bottom margin */

  /* Initial animation state */
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.chart-explanation.visible {
  opacity: 1;
  transform: translateY(0);
}

.chart-explanation strong {
  color: #ff5252;
}

/* Style for explanation in text column - more compact */
.text-explanation {
  margin-top: 15px;
  margin-bottom: 0;
  padding: 8px 12px;
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

/* Add styling for the agency link */
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
</style>
