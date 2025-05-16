<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Neuton:ital,wght@0,200;0,300;0,400;0,700;0,800;1,400&display=swap"
    rel="stylesheet"
  />
  <div
    :style="{
      margin: '18px 18px',
      paddingTop: '50px',
      borderTop: darkMode ? '2px solid #333' : '2px solid #ddd',
      backgroundColor: darkMode ? 'black' : 'white',
      color: darkMode ? 'white' : 'black',
      position: 'relative',
    }"
  >
    <div class="header-container">
      <h2
        class="text-xl font-bold mb-6"
        :style="{
          position: 'sticky',
          top: '0',
          backgroundColor: darkMode ? 'black' : 'transparent',
          padding: '18px 0',
          zIndex: '10',
          color: darkMode ? 'white' : 'black',
        }"
      >
        12 Rhetorical Stances Found in Armenian Genocide Discourse
        <span
          :style="{
            backgroundColor: darkMode ? 'white' : 'black',
            color: darkMode ? 'black' : 'white',
            position: 'sticky',
          }"
        >
          Online
        </span>
      </h2>

      <!-- Dark Mode Toggle -->
      <div class="theme-toggle">
        <button
          @click="toggleDarkMode"
          class="theme-toggle-btn"
          :class="{ dark: darkMode }"
        >
          <span class="toggle-icon">{{ darkMode ? "☀️" : "🌙" }}</span>
          <span class="toggle-text">{{
            darkMode ? "Light Mode" : "Dark Mode"
          }}</span>
        </button>
      </div>
    </div>

    <div class="controls mb-6">
      <button
        @click="expandAll"
        class="action-btn mr-4"
        :class="{ dark: darkMode }"
      >
        Expand All
      </button>
      <button
        @click="collapseAll"
        class="action-btn"
        :class="{ dark: darkMode }"
      >
        Collapse All
      </button>
    </div>

    <div class="grid-container">
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="category-card-wrapper"
        @mouseenter="setHoveredIndex(index)"
        @mouseleave="clearHoveredIndex()"
      >
        <!-- Blurred background ellipse - only visible on hover or when examples are shown -->
        <div
          class="blurred-background"
          :style="{
            backgroundColor: category.color,
            opacity:
              hoveredIndex === index || category.showExamples ? '0.3' : '0',
          }"
        ></div>

        <div class="category-card" :class="{ dark: darkMode }">
          <div class="card-inner">
            <!-- Title + Arrow toggle -->
            <div class="card-header" @click="toggleExamples(index)">
              <!-- Title and arrow in the same container for proper alignment -->
              <div class="title-wrapper">
                <h3 class="card-title">
                  <span
                    class="title-text"
                    :style="{
                      backgroundColor: category.color,
                      color: getTextColor(category.color),
                    }"
                  >
                    {{ formatTitle(category.title) }}
                  </span>
                </h3>
              </div>
            </div>

            <!-- Description and Examples -->
            <p class="description" :class="{ dark: darkMode }">
              {{ category.description }}
            </p>

            <!-- Toggle Button -->
            <div
              class="toggle-button"
              @click="category.showExamples = !category.showExamples"
            >
              <div :class="['showExample', { dark: darkMode }]">
                Show Example Comments
              </div>
              <svg
                class="arrow-icon"
                :class="{ 'arrow-up': category.showExamples }"
                viewBox="0 0 24 24"
                width="22"
                height="22"
              >
                <path :fill="darkMode ? 'white' : 'black'" d="M7 10l5 5 5-5z" />
              </svg>
            </div>

            <!-- Dropdown Content -->
            <div v-if="category.showExamples" class="card-content">
              <!-- Examples -->
              <div class="examples" :class="{ dark: darkMode }">
                <div
                  v-for="(example, idx) in category.examples"
                  :key="idx"
                  class="example"
                >
                  <span class="example-text" :class="{ dark: darkMode }">
                    "{{ example }}"
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StanceCategories",
  data() {
    return {
      darkMode: false,
      hoveredIndex: null, // Track which card is currently being hovered
      categories: [
        {
          title: "Recognition of Armenian_Genocide",
          color: "#2196f3",
          description:
            "Statements that affirm the historical reality of the Armenian Genocide",
          examples: [
            "The systematic killing of 1.5 million Armenians constitutes genocide.",
            "Historical evidence clearly shows the genocide was planned and executed by The Young Turks.",
            "Numerous scholars have confirmed these events as genocide.",
          ],
          showExamples: false,
        },
        {
          title: "personal_testimony",
          color: "#9c27b0",
          description:
            "Accounts of family, friends, and sometimes passed down stories from witnesses of the events and survivors",
          examples: [
            "My grandmother witnessed the death marches through the desert.",
            "My great-grandmother survived the death marches through the Syrian desert",
            "My great grandparents saw their parents get murdered in from of them and grew up in orphanages",
          ],
          showExamples: false,
        },
        {
          title: "explicit_denial",
          color: "#e53935",
          description:
            "Direct rejection of the genocide label and its legal foundations",
          examples: [
            "No authentic evidence exists to support the claim of premeditated plan.",
            "It is legally unfounded to call this episode a 'genocide'.",
            "The Armenian genocide is a myth and lie created for political purposes",
          ],
          showExamples: false,
        },
        {
          title: "minimization_and_reframing",
          color: "#87b2c2",
          description:
            "Downplaying severity or recasting events as unintended consequences; may include 'both sideism' (deaths on both sides, therefore not a genocide)",
          examples: [
            "Internal strife, banditry, famine, and epidemics produced a tragedy.",
            "What happened to Armenians was just a relocation, not genocide",
            "The suffering resulted from general wartime conditions.",
          ],
          showExamples: false,
        },
        {
          title: "justification_narrative",
          color: "#ff9900",
          description:
            "Justifying actions as necessary responses to wartime conditions or security threats, specifically Armenians aligning with Russians",
          examples: [
            "Population was relocated for security reasons.",
            "Armenian volunteer units rebeled and fought against Turks, necessitating military measures.",
            "Armenians betrayed the Ottoman state during wartime, what did they expect",
          ],
          showExamples: false,
        },
        {
          title: "historical_inversion",
          color: "#839d2b",
          description:
            "Reversing roles of victim and perpetrator in historical narratives",
          examples: [
            "Greater numbers of Turks died during the War.",
            "The Ottoman Empire was itself a victim of Western manipulations.",
            "Turkish communities suffered at the hands of Armenian militias.",
          ],
          showExamples: false,
        },
        {
          title: "procedural_deflection",
          color: "#5d3a6c",
          description:
            "Using appeals to archives and procedural matters to defer judgment",
          examples: [
            "Let historians examine all evidence and decide what really happened instead of claiming genocide",
            "Turkey proposed a joint commission to study events in the archives.",
            "Turkey has opened their archives for the world to see. What about the armenians?",
          ],
          showExamples: false,
        },
        {
          title: "contemporary_comparison",
          color: "#4caf50",
          description:
            "Comparing the events to more recent conflicts or genocides",
          examples: [
            "What's happening in Gaza today mirrors what happened to Armenians then",
            "From Armenia to Rwanda to Bosnia, humanity keeps making the same mistakes",
            "This is like the genocides of Uyghurs and Rohingya today",
          ],
          showExamples: false,
        },
        {
          title: "competitive_victimhood",
          color: "#faff6b",
          description:
            "Emphasizing Turkish suffering as equal to or greater than Armenian",
          examples: [
            "Millions of Turks were also killed, but nobody remembers them",
            "Nationalistic zeal led to terror against 31 Turkish diplomats.",
            "Greater numbers of Turks died during this period.",
          ],
          showExamples: false,
        },
        {
          title: "reconciliation_discourse",
          color: "#527c79",
          description: "Promoting dialogue and forward-looking relations",
          examples: [
            "Turkey initiated a process for honest dialogue with Armenia.",
            "Turks and Armenians should rebuild their historical friendship.",
            "Third countries can help by supporting the normalization process.",
          ],
          showExamples: false,
        },
        {
          title: "memorial_commemorative",
          color: "#795548",
          description: "Statements focused on remembrance and honoring victims",
          examples: [
            "We honor the victims every April 24th as Armenian Genocide Remembrance Day",
            "Let us remember those who suffered in this tragedy",
            "We remember to ensure such atrocities never happen again.",
          ],
          showExamples: false,
        },
        {
          title: "apology",
          color: "#009688",
          description:
            "Expressions of regret, responsibility, or formal apologies",
          examples: [
            "As a Turk, I'm sorry for the suffering Turks caused to Armenians",
            "I'm sorry that Armenians still have to fight for recognition of their suffering",
            "I'm Turkish and ashamed of how we've handled this...Armenians deserve an apology",
          ],
          showExamples: false,
        },
      ],
    };
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
    formatTitle(title) {
      return title
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
    toggleExamples(index) {
      this.categories[index].showExamples =
        !this.categories[index].showExamples;
    },
    getTextColor(bgColor) {
      const hex = bgColor.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 160 ? "black" : "white";
    },
    expandAll() {
      this.categories.forEach((cat) => (cat.showExamples = true));
    },
    collapseAll() {
      this.categories.forEach((cat) => (cat.showExamples = false));
    },
    resetAll() {
      // You could repopulate from a backup, or just collapse all
      this.collapseAll();
    },
    // New methods to handle hover state
    setHoveredIndex(index) {
      this.hoveredIndex = index;
    },
    clearHoveredIndex() {
      this.hoveredIndex = null;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Liberation+Sans:wght@400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap");

@font-face {
  font-family: "Liberation Sans";
  src: url("@assets/font/LiberationSans-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Liberation Sans";
  src: url("@assets/font/LiberationSans-Bold.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  overflow: visible;
  position: sticky;
}

.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 20;
}

.theme-toggle-btn {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  color: #333;
  cursor: pointer;
  margin-top: 80px;

  transition: all 0.3s ease;
}

.theme-toggle-btn.dark {
  background-color: #333;
  color: #fff;
  margin-top: 80px;
  border-color: #555;
}

.toggle-icon {
  margin-right: 8px;
  font-size: 16px;
}
.container {
  max-width: 100%;
}
body {
  background-color: white;
  overflow-y: scroll;
}
.toggle-text {
  font-size: 14px;
  font-family: "General Sans", sans-serif;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin: 0 -10px;
  padding: 20px 0;
  position: relative;
  z-index: 6;
  overflow: visible;
}

@media (max-width: 992px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}

.category-card-wrapper {
  margin: 5px;
  position: relative;
  max-width: 400px;
  max-height: 300px;
}

.blurred-background {
  position: absolute;
  width: 130%;
  height: 130%;
  top: -15%;
  left: -15%;
  border-radius: 50%;
  filter: blur(105px);
  z-index: 1;
  transition: opacity 0.4s ease;
  opacity: 0; /* Start with opacity 0 */
}

.category-card {
  background-color: transparent;
  aspect-ratio: 1 / 1;
  display: flex;
  position: relative;
  z-index: 3;
  height: 100%;
  width: 100%;
  border: rgb(0, 0, 0) 1.1px solid;
  transition: all 0.3s ease;
}

.category-card.dark {
  border: white 1px solid;
}

.card-inner {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 4;
  background-color: transparent !important;
}

.card-header {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  cursor: pointer;
  height: 60px;
}

.title-wrapper {
  flex-grow: 1;
  /* overflow: hidden; */
}

.card-title {
  font-size: 20%;
  font-family: "General Sans", sans-serif;
  text-align: left;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-text {
  padding: 2px 4px;
  font-family: "General Sans", sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 1.2;
  display: inline-block;
}

.arrow-icon {
  transition: transform 0.2s ease;
  margin-left: 4px;
  transform: rotate(-90deg);
  flex-shrink: 0;
}

.arrow-up {
  transform: rotate(0deg);
}

.card-content {
  padding-top: 6px;
  padding-left: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: transparent !important;
}

.description {
  font-size: 16px;
  color: #000000;
  margin-bottom: 5px;
  font-family: "General Sans", sans-serif;
  text-align: left;
  transition: color 0.3s ease;
  font-weight: 300;
  margin-left: 16px;
}

.description.dark {
  color: #ddd;
}

.examples {
  margin-top: 0px;
  padding-top: 0px;
  border-top: 1px solid rgba(238, 238, 238, 0.1);
  transition: border-color 0.3s ease;
  font-family: "General Sans", sans-serif;
}

.examples.dark {
  border-top-color: rgba(51, 51, 51, 0.3);
  font-family: "General Sans", sans-serif;
}

.example {
  padding: 0px;
  margin-bottom: 5px;
  text-align: left;
  line-height: normal;
  font-family: "General Sans", sans-serif;
}

.example-text {
  font-style: italic;
  font-size: 12px;
  color: #000000;
  transition: color 0.3s ease;
  font-family: "General Sans", sans-serif;
  font-weight: 300;
  padding: 0px;
  font-family: "General Sans", sans-serif;
}

.example-text.dark {
  color: #aaa;
  font-family: "General Sans", sans-serif;
}

.controls {
  display: flex;
  margin-bottom: 20px;
  position: relative;
  z-index: 10;
  margin-left: 10px;
}

.action-btn {
  background-color: transparent;
  color: black;
  border: 1px solid #000000;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  font-family: "General Sans", sans-serif;
  transition: all 0.3s ease;
}

.action-btn.dark {
  color: white;
  border-color: white;
}

.action-btn:hover {
  background-color: #000000;
  color: white;
}

.action-btn.dark:hover {
  background-color: white;
  color: black;
}

.mr-4 {
  margin-right: 16px;
}

.mb-6 {
  margin-bottom: 24px;
}

.card-content,
.inner,
.parent-class {
  .card-content,
  .inner,
  .parent-class {
    background-color: transparent !important;
  }
  background-color: transparent !important;
}
.showExample {
  text-align: left;
  margin-left: 15px;
  font-size: 12px;
  color: #000000;
  transition: color 0.3s ease;
  font-family: "General Sans", sans-serif;
  font-weight: 400;
}
.showExample.dark {
  color: #ffffff;
}

.toggle-button {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  margin-bottom: 5px;
}

/* .showExample {
  font-weight: bold;
} */

.arrow-icon {
  transition: transform 0.3s ease;
}

.arrow-up {
  transform: rotate(0deg);
}

.arrow-icon:not(.arrow-up) {
  transform: rotate(-90deg);
}

.sticky-title {
  position: sticky;
  top: 0; /* Sticks to the top of the viewport */
  background-color: transparent; /* Transparent background */
  padding: 10px 0;
  z-index: 10; /* Ensure it stays above other content */
  text-align: center;
}

.sticky-buttons {
  position: sticky;
  top: 50px; /* Adjust as needed to avoid overlapping with the title */
  background-color: transparent; /* Transparent background */
  z-index: 10; /* Ensure it stays above other content */
  display: flex;
  justify-content: center;
  gap: 10px; /* Space between buttons */
}
</style>
