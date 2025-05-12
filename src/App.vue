<template>
  <Navbar />
  <router-view></router-view>
  <!-- <StanceLegend /> -->
  <Bg1 v-if="showBg1" @scrollToBg2="handleScrollToBg2" />
  <!-- <Bg2 v-if="showBg2" @scrollToBg3="handleScrollToBg3" /> -->
  <!-- Other components... -->
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import StanceLegend from "./components/StanceLegend.vue";

function handleScrollToBg2() {
  // Hide Bg1 completely
  showBg1.value = false;

  // Reset scroll position
  window.scrollTo(0, 0);

  // Show Bg2 with a slight delay to ensure complete separation
  setTimeout(() => {
    showBg2.value = true;
  }, 500);
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;

  overflow-y: auto !important; /* Allow scrolling */
  overflow-x: hidden;
}

#app {
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  background-color: black;
  overflow: visible !important; /* Allow content to be visible */
}

.router-view {
  height: auto;
  overflow: visible;
}
.app-container {
  margin: 0;
  padding: 0;
  height: auto;
}

/* Add this temporary code to hide elements for screenshots */
/* .navbar {
  display: none !important;
}

.home-scroll-container {
  display: none !important;
} */
</style>

<!-- <template>
  <div class="blur-reveal-container">
    <div id="p5-container" ref="p5Container"></div>
  </div>
</template>

<script setup>
import p5 from "p5";
import { ref, onMounted, onUnmounted } from "vue";

// Try to import data - if it fails, we'll use a fallback
let articlesData;
try {
  articlesData = {
    articles: [
      {
        id: 1,
        generated_title: "Article about the 1915 genocide events in Armenia",
        publication_date: "2019-04-24",
      },
      {
        id: 2,
        generated_title:
          "Historical denial and the incidents of 1915 in perspective",
        publication_date: "2020-01-15",
      },
      {
        id: 3,
        generated_title:
          "US recognition of 1915 events as genocide causes diplomatic tension",
        publication_date: "2021-04-24",
      },
      {
        id: 4,
        generated_title: "Remembering the 1915 Armenian tragedy",
        publication_date: "2022-04-24",
      },
      {
        id: 5,
        generated_title: "Turkey responds to statements about 1915 events",
        publication_date: "2023-04-24",
      },
    ],
  };
} catch (e) {
  console.warn("Could not load JSON file, using fallback data");
  // Fallback data is already set above
}

// Reference to hold our p5 instance
let p5Instance = null;
const p5Container = ref(null);

// Prepare article data
const articles = ref([]);
const revealedAreas = ref(new Set());
const lensRadius = 100; // Size of the clarity lens
const revealThreshold = 4; // Number of hover instances needed to permanently reveal text
const hoverCounts = ref({});

// Process the articles into sentences
const prepareArticles = () => {
  try {
    console.log("Article data:", articlesData);
    if (!articlesData || !articlesData.articles) {
      console.error("Invalid article data structure");
      return;
    }

    // Sort by date if needed
    const sortedArticles = [...articlesData.articles].sort(
      (a, b) => new Date(a.publication_date) - new Date(b.publication_date)
    );

    // Extract titles and split into manageable segments
    articles.value = sortedArticles.map((article, index) => {
      // Initialize hover counts for each segment
      hoverCounts.value[index] = 0;

      return {
        id: article.id || index,
        text: article.generated_title || "No title available",
        x: 0, // Will be set in the sketch
        y: 0,
        width: 0,
        height: 0,
        revealed: false,
      };
    });

    console.log("Processed articles:", articles.value.length);
  } catch (error) {
    console.error("Error in prepareArticles:", error);
  }
};

onMounted(() => {
  console.log("Component mounted, p5Container exists:", !!p5Container.value);

  // Process article data
  prepareArticles();

  // Only create the P5 sketch after mounting
  if (p5Container.value) {
    createSketch();
  } else {
    console.error("P5 container not available");
  }
});

const createSketch = () => {
  try {
    p5Instance = new p5((sketch) => {
      let canvasWidth;
      let canvasHeight;

      sketch.setup = () => {
        console.log("P5 setup running");
        // Create responsive canvas
        canvasWidth = p5Container.value.clientWidth;
        canvasHeight = p5Container.value.clientHeight || window.innerHeight;
        sketch.createCanvas(canvasWidth, canvasHeight);
        sketch.background(255);

        // Position articles in a grid layout
        positionArticles();

        // Disable text cursor on canvas
        if (sketch.canvas) {
          sketch.canvas.style.cursor = "none";
        }
      };

      const positionArticles = () => {
        if (!canvasWidth || articles.value.length === 0) return;

        const margin = 20;
        const colWidth = canvasWidth / 3 - margin * 2;
        let currentX = margin;
        let currentY = margin;
        let maxHeightInRow = 0;
        let columnIndex = 0;

        articles.value.forEach((article, i) => {
          sketch.textSize(14);
          const textWidth = Math.min(colWidth, sketch.textWidth(article.text));
          const textHeight =
            Math.ceil(sketch.textWidth(article.text) / colWidth) * 20;

          article.x = currentX;
          article.y = currentY;
          article.width = colWidth;
          article.height = textHeight + 10;

          maxHeightInRow = Math.max(maxHeightInRow, textHeight + 20);

          // Move to next column or row
          columnIndex++;
          if (columnIndex >= 3) {
            columnIndex = 0;
            currentX = margin;
            currentY += maxHeightInRow;
            maxHeightInRow = 0;
          } else {
            currentX += colWidth + margin * 2;
          }
        });
      };

      sketch.draw = () => {
        sketch.background(255); // Black background

        if (articles.value.length === 0) {
          // If no articles, show message
          sketch.fill(0);
          sketch.textSize(20);
          sketch.textAlign(sketch.CENTER, sketch.CENTER);
          sketch.text(
            "Hover to reveal content",
            canvasWidth / 2,
            canvasHeight / 2
          );
          return;
        }

        // Draw blur effect (all text starts blurry)
        sketch.fill(0); // Gray text
        sketch.noStroke();
        sketch.textAlign(sketch.LEFT, sketch.TOP);

        // Draw articles
        articles.value.forEach((article, i) => {
          // Skip already permanently revealed articles in blur pass
          if (revealedAreas.value.has(i)) return;

          sketch.push();
          sketch.textSize(14);
          sketch.filter(sketch.BLUR, 3); // Apply blur filter
          drawWrappedText(article.text, article.x, article.y, article.width);
          sketch.pop();
        });

        // Draw clear lens
        sketch.push();
        sketch.noStroke();

        if (
          sketch.mouseX > 0 &&
          sketch.mouseX < sketch.width &&
          sketch.mouseY > 0 &&
          sketch.mouseY < sketch.height
        ) {
          // Create a circular mask for the clarity lens
          sketch.drawingContext.save();
          sketch.drawingContext.beginPath();
          sketch.drawingContext.arc(
            sketch.mouseX,
            sketch.mouseY,
            lensRadius,
            0,
            2 * Math.PI
          );
          sketch.drawingContext.clip();

          // Draw clear text in lens area and check for hover counts
          articles.value.forEach((article, i) => {
            // Skip already revealed articles
            if (revealedAreas.value.has(i)) return;

            // Check if mouse is over this article
            const isInside =
              sketch.mouseX > article.x - 10 &&
              sketch.mouseX < article.x + article.width + 10 &&
              sketch.mouseY > article.y - 10 &&
              sketch.mouseY < article.y + article.height + 10;

            if (isInside) {
              // Increment hover count
              hoverCounts.value[i]++;

              // If hovered enough, add to permanently revealed
              if (hoverCounts.value[i] > revealThreshold * 60) {
                // 60 frames ≈ 1 second
                revealedAreas.value.add(i);
              }
            }

            sketch.fill(0); // White text for clear areas
            drawWrappedText(article.text, article.x, article.y, article.width);
          });

          sketch.drawingContext.restore();
        }

        // Draw permanently revealed articles on top
        sketch.fill(0); // White text
        articles.value.forEach((article, i) => {
          if (revealedAreas.value.has(i)) {
            drawWrappedText(article.text, article.x, article.y, article.width);
          }
        });

        // Draw custom cursor
        if (
          sketch.mouseX > 0 &&
          sketch.mouseX < sketch.width &&
          sketch.mouseY > 0 &&
          sketch.mouseY < sketch.height
        ) {
          sketch.stroke(200, 200, 255, 150);
          sketch.noFill();
          sketch.ellipse(sketch.mouseX, sketch.mouseY, lensRadius * 2);
        }

        sketch.pop();
      };

      const drawWrappedText = (text, x, y, maxWidth) => {
        if (!text) return;

        const words = text.split(" ");
        let line = "";
        let testLine = "";
        let lineHeight = 20;
        let testWidth = 0;
        let yPos = y;

        for (let i = 0; i < words.length; i++) {
          testLine = line + words[i] + " ";
          testWidth = sketch.textWidth(testLine);

          if (testWidth > maxWidth) {
            sketch.text(line, x, yPos);
            line = words[i] + " ";
            yPos += lineHeight;
          } else {
            line = testLine;
          }
        }

        sketch.text(line, x, yPos);
      };

      // Handle window resize
      sketch.windowResized = () => {
        canvasWidth = p5Container.value.clientWidth;
        canvasHeight = p5Container.value.clientHeight || window.innerHeight;
        sketch.resizeCanvas(canvasWidth, canvasHeight);
        positionArticles();
      };
    }, p5Container.value);
  } catch (error) {
    console.error("Error creating P5 sketch:", error);
  }
};

// Clean up
onUnmounted(() => {
  if (p5Instance) {
    p5Instance.remove();
  }
});
</script>

<style scoped>
.blur-reveal-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  overflow: hidden;
}

#p5-container {
  width: 100%;
  height: 100vh; /* Explicitly set height */
  position: relative;
}

/* Hide default cursor inside the container */
#p5-container canvas {
  cursor: none;
}
</style> -->
