<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
    rel="stylesheet"
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <link
    href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Urbanist:ital,wght@0,100..900;1,100..900&family=Vollkorn:ital,wght@0,400..900;1,400..900&display=swap"
    rel="stylesheet"
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Vollkorn:ital,wght@0,400..900;1,400..900&display=swap"
    rel="stylesheet"
  />
  <div class="text-visualizer">
    <div class="header">
      <div class="title">TEXT VISUALIZER</div>
      <div class="sections">
        <div class="section-label government">GOVERNMENT</div>
        <div class="section-label social-media">ONLINE DISCOURSE</div>
      </div>
    </div>

    <div class="content-container">
      <div class="government-text" @mouseleave="showAllComments">
        <h3>
          The Events of 1915 and the Turkish-Armenian Controversy over History:
          An Overview
        </h3>

        <p>
          <span
            >The final years of the Ottoman Empire was a tragic period for the
            people that made up the Empire. Turks, Armenians, and many others
            suffered immensely.</span
          >
          <span
          
          >
            This period needs to be understood in its entirety and the memory of
            so many lives lost has to be properly respected.
          </span>
          <span
            >Such an exercise requires a reliable factual basis, an open
            approach, and empathy.</span
          >
        </p>

        <p>
          <span
            class="highlight-genocide-denial"
            @mouseenter="showRelatedComments('genocide_denial')"
          >
            The Armenian view of history, however, selects the Armenian
            suffering, embellishes it in several ways and presents it as a
            genocide – a crime defined in international law – perpetrated by
            Turks against Armenians.
          </span>
          <span
            >The acceptance of this version by others has become the national
            objective for Armenia and the radical groups within the Armenian
            Diaspora. Legitimate challenges to the Armenian narrative, even when
            based on scholarly research or personal histories, are brushed aside
            as propaganda, suppressed or attacked as "denial." This is often
            accompanied by anti-Turkish rhetoric and vilification of Turkish
            history and ancestry. During the 1970s and onwards, such
            nationalistic zeal led to a terror campaign that took the lives of
            31 Turkish diplomats and their family members, as well as 43 people
            from Turkish and other nationalities, and wounded many.</span
          >
        </p>

        <p>
          <span
            >As a consequence, eight centuries of Turkish-Armenian relationship,
            which was predominantly about friendship, tolerance and peaceful
            coexistence, is forgotten. Instead, only an incriminating version of
            the tragic events of 1915 is taken to represent this relationship.
            Such an atmosphere makes it difficult for the two nations to come to
            terms openly with what happened during the First World War, draw the
            right lessons – instead of animosity – from their common history and
            renew their friendship.

            <span
              class="highlight-reconciliation"
              @mouseenter="showRelatedComments('reconciliation')"
            >
              That is why Turkey has initiated a process aimed at an honest and
              open dialogue with Armenia. Successful conclusion of this process
              will not only benefit the two peoples, but will also contribute to
              regional peace, stability and reconciliation.</span
            >
          </span>
        </p>

        <p>
          <span
            class="highlight-competitive-victimhood"
            @mouseenter="showRelatedComments('competitive_victimhood')"
          >
            Turkey does not deny the suffering of Armenians, including the loss
            of many innocent lives, during the First World War. However, greater
            numbers of Turks died or were killed in the years leading to and
            during the War.
          </span>
          <span
            >Without belittling the tragic consequences for any group, Turkey
            objects to the one-sided presentation of this tragedy as a genocide
            by one group against another.</span
          >
        </p>

        <p>
          <span
            class="highlight-procedural-deflection"
            @mouseenter="showRelatedComments('procedural_deflection')"
            >Turkey's views are based on available archival documents, academic
            research, oral history, knowledge of late 19th and early 20th
            century dynamics of major power rivalries in Europe, the recognition
            of the effects of nationalistic fervor among ethnic groups that
            formed the multi-national fabric of the Empire, as well as Turkey's
            own collective national memory including family histories of many
            Turks. These do not support the Armenian narrative. Rather,</span
          >
          <span
            class="highlight-genocide-justification"
            @mouseenter="showRelatedComments('genocide_justification')"
          >
            they point to an empire at the verge of collapse fighting for
            survival on various fronts, major European powers strategizing, at
            least since the 1870s, to exploit the spoils, including the
            manipulation of ethnic groups like the Ottoman Armenians,
            politically-motivated missionary activities within Ottoman Turkey,
            radicalization and militarization of nationalistic Armenian groups,
            some of whom joined forces with the invading Russian army in the
            hope of creating an ethnically homogenous Armenian homeland.
          </span>
          <span
            >An Armenian leader of that time, Katchaznouni, who became the first
            Prime Minister of the short lived independent Armenian Democratic
            Republic stated the following in 1923:
            <span
              class="highlight-genocide-justification"
              @mouseenter="showRelatedComments('genocide_justification')"
              >In the fall of 1914 Armenian volunteer units organized themselves
              and fought against the Turks</span
            >…We had no doubt that the war would end with the complete victory
            of the Allies; Turkey would be defeated and dismembered…"</span
          >
        </p>

        <p>
          <span
            class="highlight-genocide-justification"
            @mouseenter="showRelatedComments('genocide_justification')"
          >
            In response, the Ottoman Government ordered in 1915 the Armenian
            population residing in or near the war zone to be relocated to the
            southern Ottoman provinces away from the supply routes and army
            transport lines on the way of the advancing Russian army. Some
            Armenians living away from the front, yet were reported or suspected
            to be involved in collaboration, were also included in mandatory
            transfer.
          </span>
        </p>

        <p>
          <span
            >Ottoman Government took a number of measures for safe transfer
            during the relocation. However, under war-time conditions
            <span
              class="highlight-reframing-minimizing"
              @mouseenter="showRelatedComments('reframing_minimizing')"
            >
              exacerbated by internal strife, local groups seeking revenge,
              banditry, famine, epidemics, and a failing state apparatus
              (including unruly officials who were court-martialed and sentenced
              to capital punishment by the Ottoman Government in 1916, much
              before the end of the War) all combined to produce what became a
              tragedy.</span
            >
            Nevertheless,</span
          >
          <span
            class="highlight-explicit-denial"
            @mouseenter="showRelatedComments('explicit_denial')"
          >
            no authentic evidence exists to support the claim that there was a
            premeditated plan by the Ottoman Government to kill off Armenians.
            Moreover, the Ottoman socio-cultural fabric did not harbor racist
            attitudes that would facilitate such a horrific crime.
          </span>
          <span
            >Loss of life, regardless of numbers and regardless of possible
            guilt on the part of the victims, is tragic and must be remembered.
            However,
            <span
              class="highlight-genocide-denial"
              @mouseenter="showRelatedComments('genocide_denial')"
            >
              it is factually problematic, morally unsound and legally unfounded
              to call this episode a "genocide."</span
            >
          </span>
        </p>
      </div>

      <div class="social-media-comments">
        <h2>User's Comments on YouTube</h2>
        <div class="instructions">
          Hover over the Turkish government's statement to view comments that
          share their sentiment.
        </div>
        <div id="comments-container">
          <!-- Using computed property to filter comments by stance -->
          <div
            v-for="(comment, index) in visibleComments"
            :key="'comment-' + index"
            class="comment-card"
            :class="getStanceClass(comment.stance)"
          >
            <div class="comment-header">
              <div class="username-timestamp-container">
                <div class="username">{{ comment.username }}</div>
                <div class="comment-timestamp">9 months ago</div>
              </div>
              <div class="stance-label">
                {{ getStanceLabel(comment.stance) }}
              </div>
            </div>
            <p>{{ comment.text }}</p>

            <div class="comment-actions">
              <div class="comment-like">
                <svg
                  class="comment-like-icon"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
                  />
                  />
                </svg>
                <span class="comment-like-count">
                  {{ comment.likes }}
                </span>
              </div>
            </div>
            <!-- Add this section for the video source -->
            <div class="video-source">
              <span>From: </span>
              <a
                :href="comment.videoSource.url"
                target="_blank"
                class="video-link"
              >
                {{ comment.videoSource.title }}
              </a>
            </div>

            <div class="matched-phrases">
              Matched phrases:
              <span v-for="(phrase, i) in comment.matchedPhrases" :key="i">{{
                phrase
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Debug Panel -->
    <div
      class="debug-panel"
      style="
        position: fixed;
        bottom: 0;
        right: 0;
        background: #0000;
        padding: 10px;
        z-index: 1000;
      "
    >
      Current stance: {{ formatStanceForDisplay(activeStance) }}
    </div>
  </div>
</template>

<script setup>
import Papa from "papaparse";
import { ref, computed } from "vue";
const real_comments = ref([]);
// Function to load comments from CSV
// async function loadCommentsFromCSV() {
//   try {
//     const response = await fetch('real_comments_classified.csv');
//     const csvText = await response.text();

//     const results = Papa.parse(csvText, {
//       header: true,
//       skipEmptyLines: true,
//       dynamicTyping: true
//     });

//     // Process the results to match your data structure
//     const processedComments = results.data.map(row => ({
//       username: row.username,
//       stance: row.stance,
//       text: row.text,
//       likes: row.likes || 0,
//       videoSource: {
//         title: row.video_source_title,
//         url: row.video_source_url
//       },
//       matchedPhrases: [] // Will be filled by addMatchedPhrases
//     }));

//     commentsData.value = processedComments;

//     // Apply matched phrases after loading
//     addMatchedPhrases();
//   } catch (error) {
//     console.error('Error loading comments:', error);
//   }
// }

// // Call this in your component's onMounted hook
// onMounted(() => {
//   loadCommentsFromCSV();
// });
// State for tracking which stance is being hovered
const activeStance = ref("all"); // 'all' means show all comments

// Function to show comments related to a specific stance
const showRelatedComments = (stance) => {
  console.log("Showing comments for stance:", stance);
  activeStance.value = stance;
};

// Reset to show all comments when mouse leaves the government text
const showAllComments = () => {
  console.log("Showing all comments");
  activeStance.value = "all";
};
// Function to format stance for display by replacing underscores with spaces
const formatStanceForDisplay = (stance) => {
  return stance.replace(/_/g, " ");
};
// Sample comments data
const commentsData = [
  // Comments for whataboutism stance (previously shared-suffering)
  {
    username: "BalancedView42",
    stance: "whataboutism",
    text: "Yes, many people suffered during this period. What about the millions of Turks and Muslims who died during the Balkan Wars and WWI? Nobody remembers their suffering.",
    matchedPhrases: ["many lives lost", "properly respected"],
    likes: 42,
    videoSource: {
      title: "The Armenian Genocide Debate",
      url: "https://www.youtube.com/watch?v=DXgrI8GlUB8",
    },
  },
  {
    username: "ArmenianFamily",
    stance: "genocide_affirmation",
    text: 'This is typical Turkish deflection. My great-grandparents didn\'t just "suffer" - they were systematically targeted for extermination. Calling it mutual suffering whitewashes genocide.',
    matchedPhrases: ["tragic period", "suffered immensely"],
    likes: 2,
    videoSource: {
      title: "The Armenian Genocide Debate",
      url: "https://www.youtube.com/watch?v=DXgrI8GlUB8",
    },
  },

  // Comments for genocide_denial stance
  {
    username: "TurkishPatriot",
    stance: "genocide_denial",
    text: "The Armenian lobby has created this genocide story and forces it on everyone. They won't even consider historical facts that contradict their narrative.",
    matchedPhrases: ["embellishes", "Armenian view of history"],
    likes: 0,
    videoSource: {
      title: "The Armenian Genocide Debate",
      url: "https://www.youtube.com/watch?v=DXgrI8GlUB8",
    },
  },
  {
    username: "HistoryProfessor",
    stance: "genocide_affirmation",
    text: 'The historical record and eyewitness accounts clearly document the systematic destruction of Armenian communities. Calling it "embellishment" is denial of proven historical facts.',
    matchedPhrases: ["Armenian view of history", "embellishes"],
    likes: 2,
    videoSource: {
      title: "The Armenian Genocide Debate",
      url: "https://www.youtube.com/watch?v=DXgrI8GlUB8",
    },
  },

  // Comments for competitive_victimhood stance
  {
    username: "ComparativeHistory",
    stance: "competitive_victimhood",
    text: "This is the important point people always miss. Turkish casualties were actually higher, but nobody talks about that. The Armenians allied with Russia against their own country.",
    matchedPhrases: ["greater numbers of Turks died", "suffering of Armenians"],
    likes: 2,
    videoSource: {
      title: "The Armenian Genocide Debate",
      url: "https://www.youtube.com/watch?v=DXgrI8GlUB8",
    },
  },
  {
    username: "GenocideScholar",
    stance: "genocide_affirmation",
    text: 'This is a classic "whataboutism" strategy - acknowledging some Armenian suffering but immediately diverting attention to Turkish losses. War casualties aren\'t the same as systematic genocide.',
    likes: 0,
    matchedPhrases: [
      "Turkey does not deny the suffering",
      "greater numbers of Turks died",
    ],
    videoSource: {
      title: "The Armenian Genocide Debate",
      url: "https://www.youtube.com/watch?v=DXgrI8GlUB8",
    },
  },

  // Comments for genocide_justification stance
  {
    username: "OttomanExpert",
    stance: "genocide_justification",
    text: "The Armenians betrayed the Ottoman Empire by collaborating with Russia. They wanted to create their own state on land where they were the minority. This context matters.",
    likes: 0,
    matchedPhrases: [
      "joined forces with the invading Russian army",
      "ethnically homogenous Armenian homeland",
    ],
    videoSource: {
      title: "The Armenian Genocide Debate",
      url: "https://www.youtube.com/watch?v=DXgrI8GlUB8",
    },
  },
  {
    username: "ArmenianHistory",
    stance: "genocide_affirmation",
    text: "Armenians had lived under persecution and massacres since the 1890s. Some allying with Russia doesn't justify the systematic deportation and killing of an entire civilian population.",
    likes: 0,
    matchedPhrases: [
      "manipulation of ethnic groups",
      "radicalization and militarization",
    ],
    videoSource: {
      title: "The Armenian Genocide Debate",
      url: "https://www.youtube.com/watch?v=DXgrI8GlUB8",
    },
  },
  {
    username: "SecurityExpert",
    stance: "genocide_justification",
    text: "This was a necessary security measure during wartime. Any country would do the same with a population collaborating with the enemy near military supply routes.",
    likes: 0,
    matchedPhrases: [
      "relocated to the southern Ottoman provinces",
      "supply routes and army transport",
    ],
    videoSource: {
      title: "The Armenian Genocide Debate",
      url: "https://www.youtube.com/watch?v=DXgrI8GlUB8",
    },
  },
  {
    username: "HumanRightsWatch",
    stance: "genocide_affirmation",
    text: 'Calling it "relocation" obscures the reality. Deporting civilians into the desert without provisions was a death march. The Ottoman archives themselves show this was meant to eliminate Armenians.',
    likes: 0,
    matchedPhrases: ["relocated", "mandatory transfer"],
    videoSource: {
      title: "The Armenian Genocide Debate",
      url: "https://www.youtube.com/watch?v=DXgrI8GlUB8",
    },
  },
  {
    username: "TurkishCitizen",
    stance: "genocide_justification",
    text: "However, there were numerous Armenians who betrayed the Ottoman Empire by donning Ottoman military uniforms and causing harm to Ottoman soldiers and civilians. It was these individuals and their families who faced deportation and mass exile, not all Armenians. I have cherished Armenian friends whom I consider as good as my Turkish friends. However, we can't turn a blind eye to the actions of Armenian individuals who committed atrocities. Anyone who attacks Turkish territory should anticipate consequences.",
    likes: 0,
    matchedPhrases: [
      "involved in collaboration",
      "mandatory transfer",
      "relocated",
    ],
    videoSource: {
      title: "The Armenian Genocide Debate",
      url: "https://www.youtube.com/watch?v=DXgrI8GlUB8",
    },
  },

  // Comments for explicit_denial stance
  {
    username: "TurkishScholar",
    stance: "explicit_denial",
    text: "Exactly. The Ottoman Empire had no racist ideology like the Nazis. There was no premeditated plan to kill Armenians. Casualties were due to war conditions, not genocide.",
    likes: 0,
    matchedPhrases: ["no authentic evidence", "no premeditated plan"],
    videoSource: {
      title: "The Armenian Genocide Debate",
      url: "https://www.youtube.com/watch?v=DXgrI8GlUB8",
    },
  },
  {
    username: "HistoricalEvidence",
    stance: "explicit_affirmation",
    text: 'There is extensive evidence of premeditation from telegrams, eyewitness accounts, and official documents. The claim of "no authentic evidence" ignores mountains of historical records.',
    matchedPhrases: ["no authentic evidence", "premeditated plan"],
    videoSource: {
      title: "The Armenian Genocide Debate",
      url: "https://www.youtube.com/watch?v=DXgrI8GlUB8",
    },
  },
  {
    username: "ArmenianSurvivor",
    stance: "memory_of_victims",
    text: "My grandmother witnessed Ottoman soldiers execute her entire village. That wasn't war - it was genocide. Her firsthand account is evidence they refuse to acknowledge.",
    likes: 0,
    matchedPhrases: ["no authentic evidence", "premeditated plan"],
    videoSource: {
      title: "The Armenian Genocide Debate",
      url: "https://www.youtube.com/watch?v=DXgrI8GlUB8",
    },
  },

  // Comments for reconciliation stance
  {
    username: "PeaceAdvocate",
    stance: "reconciliation",
    text: "Dialog is the only way forward. Both sides need to acknowledge the past but also work toward a peaceful future. Turkey's initiative is a positive step.",
    likes: 0,
    matchedPhrases: [
      "honest and open dialogue",
      "regional peace",
      "reconciliation",
    ],
    videoSource: {
      title: "The Armenian Genocide Debate",
      url: "https://www.youtube.com/watch?v=DXgrI8GlUB8",
    },
  },
  {
    username: "ArmenianDiaspora",
    stance: "reconciliation",
    text: "True reconciliation can only happen when Turkey fully acknowledges the genocide. Dialog without recognition is meaningless.",
    likes: 0,
    matchedPhrases: ["honest and open dialogue", "reconciliation"],
    videoSource: {
      title: "The Armenian Genocide Debate",
      url: "https://www.youtube.com/watch?v=DXgrI8GlUB8",
    },
  },

  // Comments for procedural_deflection stance
  {
    username: "HistoricalMethodology",
    stance: "procedural_deflection",
    text: "Turkey is right to base its position on archival evidence. Historical claims need to be evaluated with proper methodology, not emotional appeals.",
    likes: 0,
    matchedPhrases: ["archival documents", "academic research", "oral history"],
    videoSource: {
      title: "The Armenian Genocide Debate",
      url: "https://www.youtube.com/watch?v=DXgrI8GlUB8",
    },
  },
  {
    username: "ArmenianHistorian",
    stance: "procedural_deflection",
    text: "The problem is selective use of archives. Turkey restricts access to damaging documents while highlighting ones that support their narrative. This isn't genuine historical research.",
    likes: 0,
    matchedPhrases: ["archival documents", "academic research"],
    videoSource: {
      title: "The Armenian Genocide Debate",
      url: "https://www.youtube.com/watch?v=DXgrI8GlUB8",
    },
  },

  // Comments for reframing_minimizing stance
  {
    username: "ContextAnalyst",
    stance: "reframing_minimizing",
    text: "These contextual factors are crucial. It wasn't genocide but tragic wartime circumstances beyond government control that led to casualties on both sides.",
    likes: 0,
    matchedPhrases: ["internal strife", "famine", "failing state apparatus"],
    videoSource: {
      title: "The Armenian Genocide Debate",
      url: "https://www.youtube.com/watch?v=DXgrI8GlUB8",
    },
  },
  {
    username: "GenocideResearcher",
    stance: "reframing_minimizing",
    text: "This description minimizes intentionality. Even with these contextual factors, the evidence shows Ottoman officials knew these 'relocations' would result in mass death and proceeded anyway.",
    likes: 0,
    matchedPhrases: ["tragedy", "war-time conditions", "famine"],
    videoSource: {
      title: "The Armenian Genocide Debate",
      url: "https://www.youtube.com/watch?v=DXgrI8GlUB8",
    },
  },
];
// Shorter, more practical key phrases based on the government text
const keyPhrases = {
  whataboutism: [
    "all suffered",
    "lives lost",
    "suffered immensely",
    "many others suffered",
    "both sides",
  ],

  genocide_denial: [
    "embellishes",
    "not genocide",
    "no genocide",
    "Armenian view",
    "propaganda",
    "not a crime",
    "legally unfounded",
  ],

  reconciliation: [
    "dialogue",
    "peace",
    "reconciliation",
    "friendship",
    "peaceful future",
  ],

  competitive_victimhood: [
    "Turks died",
    "Turkish casualties",
    "more Turks",
    "both suffered",
    "what about Turkish",
  ],

  procedural_deflection: [
    "evidence",
    "research",
    "documents",
    "archives",
    "methodology",
    "historical facts",
  ],

  genocide_justification: [
    "betrayed",
    "collaborated",
    "Russian army",
    "security measure",
    "wartime",
    "necessary",
    "relocated",
  ],

  reframing_minimizing: [
    "war conditions",
    "tragedy",
    "circumstances",
    "famine",
    "wartime",
    "consequences",
  ],

  explicit_denial: ["no evidence", "no plan", "not premeditated", "not racist"],

  genocide_affirmation: [
    "systematic",
    "extermination",
    "eyewitness",
    "death march",
    "planned",
    "intentional",
  ],

  memory_of_victims: [
    "grandmother",
    "survivor",
    "witnessed",
    "firsthand",
    "family story",
  ],
};
// Add this function after your keyPhrases declaration
function addMatchedPhrases() {
  commentsData.forEach((comment) => {
    const text = comment.text.toLowerCase();
    const matches = [];

    // Check each stance's phrases
    Object.entries(keyPhrases).forEach(([stance, phrases]) => {
      phrases.forEach((phrase) => {
        if (text.includes(phrase.toLowerCase())) {
          // Avoid duplicates
          if (!matches.includes(phrase)) {
            matches.push(phrase);
          }
        }
      });
    });

    // If we found new matches, update the comment's matchedPhrases
    if (matches.length > 0) {
      // Keep existing matches if any (or initialize with empty array)
      const existingMatches = comment.matchedPhrases || [];
      // Combine existing and new matches, remove duplicates
      comment.matchedPhrases = [...new Set([...existingMatches, ...matches])];
    }
  });
}

// Call this function when your component initializes
// Add this line right after your commentsData declaration
addMatchedPhrases();
// Create a computed property for filtered comments
const visibleComments = computed(() => {
  console.log("Current active stance:", activeStance.value);
  if (activeStance.value === "all") {
    return commentsData;
  } else {
    return commentsData.filter(
      (comment) => comment.stance === activeStance.value
    );
  }
});

// Function to get stance class
const getStanceClass = (stance) => {
  return `stance-${stance.replace("_", "-")}`;
};

// Function to format stance label for display
const getStanceLabel = (stance) => {
  return stance.replace("_", " ");
};
</script>

<style scoped>
.text-visualizer {
  background-color: white;
  color: #111111;
  font-family: "Helvetica", "Arial", sans-serif;
  padding: 20px;
  width: 90%;
  max-width: 100%;
  margin: 50px;
  box-sizing: border-box;
}
.vollkorn-text {
  font-family: "Vollkorn", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.header {
  margin-bottom: 20px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  text-align: left;
}

.sections {
  display: flex;
  margin-bottom: 20px;
  justify-content: flex-start;
}

.section-label {
  padding: 5px 15px;
  font-size: 14px;
  font-weight: bold;
  margin-right: 20px;
  color: white;
}

.government {
  background-color: #333;
}

.social-media {
  background-color: #333;
  margin-left: auto;
}

.content-container {
  display: flex;
  height: 700px;
  overflow: auto;
  padding-bottom: 10px;
  box-sizing: border-box;
}

.government-text {
  width: 55%;
  padding-right: 20px;
  line-height: 1.6;
  font-size: 15px;
  text-align: left;
  font-family: "Vollkorn", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  overflow-y: auto;
  box-sizing: border-box;
}

.government-text h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
  text-align: left;
}

.government-text p {
  margin-bottom: 15px;
  text-align: left;
}

.social-media-comments {
  width: 45%;
  padding-left: 20px;
  border-left: 1px solid #ddd;
  text-align: left;
  overflow-y: auto;
  height: 100%;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  box-sizing: border-box;

  /* font-family: "roboto", "Arial", sans-serif;  */
}

.social-media-comments h2 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
  text-align: left;
}

.comment-card {
  margin-bottom: 5px;
  padding: 15px;
  border-radius: 4px;
  background-color: #f9f9f9;
  border-left: 3px solid #ddd;
  text-align: left;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  text-align: left;
  justify-content: space-between;
}

.stance-label {
  font-size: 11px;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
}

.username {
  font-weight: bold;
  color: #333;
  font-size: 13px;
  text-align: left;
  margin-right: 6px;
}

.comment-card p {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #333;
  text-align: left;
}

.matched-phrases {
  font-size: 11px;
  color: #777;
  text-align: left;
}

.matched-phrases span {
  background-color: #fff9c4;
  padding: 1px 3px;
  margin-right: 3px;
  border-radius: 2px;
  display: inline-block;
}

/* Highlight colors for different rhetorical strategies */
.highlight-whataboutism {
  background-color: #0880b7;
  /* light blue */
  /* background-color: #3a4f6c; */
  color: white;
  cursor: pointer;
}

.highlight-genocide-denial {
  background-color: #f3130fb8;
  cursor: pointer;
}

.highlight-reconciliation {
  background-color: #d8de89;
  /* background-color:#A3A86B; */
  cursor: pointer;
}

.highlight-competitive-victimhood {
  background-color: #ff6b6b; /* light red */
  cursor: pointer;
}

.highlight-procedural-deflection {
  background-color: #e1bee7; /* light purple */
  cursor: pointer;
}

.highlight-genocide-justification {
  background-color: #ff9900b3;
  cursor: pointer;
}

/* .highlight-explicit-denial {
  background-color: #ffebee; /* light red */
/* cursor: pointer; */
/* } */

.highlight-reframing-minimizing {
  background-color: #87b2c2; /* light orange */
  cursor: pointer;
}

/* Stance colors */
.stance-genocide-denial {
  border-left-color: #e53935; /* red */
}
.stance-genocide-denial .stance-label {
  background-color: #e53935;
}

.stance-genocide-justification {
  border-left-color: #ff9800; /*orange*/
}
.stance-genocide-justification .stance-label {
  background-color: #ff9800;
}

.stance-whataboutism {
  border-left-color: #2196f3; /* blue */
}
.stance-whataboutism .stance-label {
  background-color: #2196f3;
}

.stance-competitive-victimhood {
  border-left-color: #ff6b6b; /* pink-red */
}
.stance-competitive-victimhood .stance-label {
  background-color: #ff6b6b;
}

.stance-genocide-affirmation {
  border-left-color: #673ab7; /* purple */
}
.stance-genocide-affirmation .stance-label {
  background-color: #673ab7;
}

.stance-memory-of-victims {
  border-left-color: #4caf50; /* green */
}
.stance-memory-of-victims .stance-label {
  background-color: #4caf50;
}

.stance-explicit-denial {
  border-left-color: #d50000; /* deep red */
}
.stance-explicit-denial .stance-label {
  background-color: #d50000;
}

.stance-explicit-affirmation {
  border-left-color: #673ab7; /* purple */
}
.stance-explicit-affirmation .stance-label {
  background-color: #673ab7;
}

.stance-reconciliation {
  border-left-color: #43a047; /* green */
}
.stance-reconciliation .stance-label {
  background-color: #43a047;
}

.stance-procedural-deflection {
  border-left-color: #9c27b0; /* purple */
}
.stance-procedural-deflection .stance-label {
  background-color: #9c27b0;
}

.stance-reframing-minimizing {
  border-left-color: #87b2c2; /* orange */
}
.stance-reframing-minimizing .stance-label {
  background-color: #87b2c2; /* light orange */
}

/* Instructions style */
.instructions {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
  text-align: left;
}

.video-source {
  font-size: 11px;
}

.video-link {
  color: #065fd4; /* YouTube's characteristic blue link color */
  text-decoration: none;
}

.video-link:hover {
  text-decoration: underline;
}
.comment-actions {
  display: flex;
  align-items: center;
  margin-top: 8px;
  color: #606060;
  font-size: 12px;
}

.comment-like {
  display: flex;
  align-items: center;
  margin-right: 12px;
  padding-bottom: 4px;
}

.comment-like-icon {
  width: 18px;
  height: 18px;
  margin-right: 4px;
  opacity: 0.6;
}
.username-timestamp-container {
  display: flex;
  align-items: baseline;
}
.comment-like-count {
  color: #101010;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  margin-left: 2px;
  opacity: 0.8; /* Slightly faded */
}
.comment-timestamp {
  color: #606060;
  font-size: 11px;
  margin-right: 6px;
}
</style>
