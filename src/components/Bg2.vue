<template>
  <div id="bg2-section" class="background-section-2" ref="bg2Section">
    <h2 class="date">Post-1915</h2>
    <h1 class="backgroundTitle" ref="title">
      Turkey's <span class="highlight-denial">Denial </span>
    </h1>
    <!-- Split paragraph into multiple sections for animated reveal -->
    <div ref="content" class="content-container">
      <p class="paragraph-section" ref="para1">
        Turkey's official stance on the genocide evolved from silence, to a more
        complicated form of denial and revisionist reframing of history. "Ankara
        does not accept the alleged "genocide," but acknowledges there were
        casualties on both sides during World War I"
        <a
          href="https://www.aa.com.tr/en/politics/turkish-vp-no-one-can-defame-turkey-over-1915-events/1269655"
          target="_blank"
          class="citation-link"
          >(Anadolu Agency, 2018)</a
        >. It also frames the events as justified due to suspected Armenian
        alliances with Russia and also a relocation for their own safety; A
        relocation which essentially was a death march through the Syrian
        desert, where many died from starvation, disease, and violence.
      </p>

      <p class="paragraph-section quote" ref="para2">
        "While it is true that some Armenians protested unfair taxation, and
        some did defect to Russia during the war, they were vastly outnumbered
        by the millions of peaceful residents of the Ottoman Empire who were
        forced into labor, deportation, and concentration camps. Scholars agree
        on this overwhelmingly."
        <a
          href="https://www.vice.com/en/article/how-google-searches-are-promoting-genocide-denial/"
          target="_blank"
          class="citation-link"
          >(Merchant)</a
        >
      </p>

      <p class="paragraph-section" ref="para3">
        The systematic denial of the Armenian Genocide has profound
        consequences. Beyond historical revisionism, it prevents healing for
        survivors and their descendants while creating a precedent for impunity
        regarding mass atrocities.
      </p>

      <p class="paragraph-section" ref="para4">
        This denial extends beyond Turkey's borders, influencing international
        relations, historical education, and even
        <span class="highlight">discourse online.</span>
      </p>

      <!-- For Armenian communities worldwide, this represents
      not only a historical injustice but an ongoing wound that affects their
      identity and relationship with their heritage. -->
    </div>
  </div>
</template>

<script>
import { onMounted, ref, onUnmounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "Bg2",
  setup() {
    const bg2Section = ref(null);
    const title = ref(null);
    const content = ref(null);

    // Add refs for paragraphs
    const para1 = ref(null);
    const para2 = ref(null);
    const para3 = ref(null);
    const para4 = ref(null);

    // Method that can be called to trigger the animation
    const triggerAnimation = () => {
      console.log("Triggering Bg2 animation"); // Add debug log

      // Fade in the entire section
      gsap.to(bg2Section.value, {
        opacity: 1,
        duration: 1.2,
        ease: "power2.inOut",
      });

      // Then animate the title and content with slight delay
      gsap.to(title.value, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      });

      // Make paragraphs visible immediately if animation is failing
      gsap.to([para1.value, para2.value, para3.value, para4.value], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
      });
    };

    let triggers = []; // Store trigger references for cleanup

    onMounted(() => {
      // Ensure element refs are valid
      if (!bg2Section.value) {
        console.error("Bg2Section ref is null");
        return;
      }

      console.log("Bg2 mounted, setting up animations"); // Add debug log

      // Initial states - start hidden
      gsap.set(bg2Section.value, { opacity: 1 }); // Set to 1 to ensure visibility
      gsap.set(title.value, { opacity: 0, y: 30 });

      // Set initial state for paragraphs
      if (para1.value && para2.value && para3.value && para4.value) {
        gsap.set([para1.value, para2.value, para3.value, para4.value], {
          opacity: 0,
          y: 20,
        });
      } else {
        console.warn("Some paragraph refs are missing");
      }

      // Immediate animation if ScrollTrigger fails
      setTimeout(() => {
        if (window.scrollY > 300) {
          // If we're already scrolled down
          triggerAnimation();
        }
      }, 500);

      // Create scroll trigger for fade-in of the section
      const mainTrigger = ScrollTrigger.create({
        trigger: bg2Section.value,
        start: "top bottom", // Fire as soon as the top of the section enters viewport
        onEnter: triggerAnimation,
        once: true,
        id: "main-trigger",
        markers: false, // Set to true to debug
      });

      triggers.push(mainTrigger);

      // Create scroll triggers for each paragraph
      const paragraphs = [
        para1.value,
        para2.value,
        para3.value,
        para4.value,
      ].filter(Boolean);

      paragraphs.forEach((para, index) => {
        const trigger = gsap.to(para, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: para,
            start: "top 90%", // When paragraph is 90% from top of viewport
            end: "top 60%",
            toggleActions: "play none none none", // Changed to not reverse
            id: `para-trigger-${index}`,
            markers: false, // Set to true to debug
          },
        });

        triggers.push(trigger);
      });
    });

    // Clean up ScrollTrigger instances
    onUnmounted(() => {
      triggers.forEach((trigger) => {
        if (trigger && trigger.kill) {
          trigger.kill();
        }
      });
      ScrollTrigger.getAll().forEach((st) => st.kill());
    });

    return {
      bg2Section,
      title,
      content,
      para1,
      para2,
      para3,
      para4,
      triggerAnimation,
    };
  },
};
</script>

<style scoped>
/* Parent container alignment */
.background-section-2 {
  min-height: 100vh;
  background-color: white;
  /* background-color: rgba(222, 222, 222, 0.682); */
  color: rgba(30, 29, 29, 0.786);
  display: block;
  font-family: "Helvetica";
  padding: 10% 10% 10% 10%; /* Top Right Bottom Left */
  text-align: left; /* Explicitly set left alignment */
  margin-top: 0;
  margin-bottom: 0;
}

/* Date styling */
.date {
  margin-left: 0; /* Changed from 6px to 0 for perfect alignment */
  font-size: 1.2rem;
  margin-top: 80px;
  font-family: "Helvetica";
  color: rgba(0, 0, 0, 0.694);
  text-align: left; /* Explicit left alignment */
  display: block; /* Ensure it takes full width */
  font-style: italic; /* Add italics to the date */
}

/* Title styling */
.backgroundTitle {
  font-family: "Helvetica";
  font-size: calc(3.4rem + 1vw);
  margin-top: 0px;
  margin-bottom: 20px;
  width: 100%; /* Changed from 50% to 100% for consistency */
  color: black;
  text-align: left; /* Explicit left alignment */
  padding-left: 0; /* Ensure no padding shifts it */
}

/* Content container */
.content-container {
  max-width: 900px;
  margin-left: 0; /* Align with left edge */
  padding-left: 0; /* Ensure no padding shifts content */
}

/* Rest of your styles remain unchanged */
.citation-link {
  color: rgba(16, 16, 16, 0.8);
  text-decoration: none;
  transition: color 0.2s, border-bottom-color 0.2s;
  font-style: italic;
}

.citation-link:hover {
  color: rgb(0, 0, 0);
  border-bottom-color: rgb(39, 38, 38);
}

.highlight {
  background-color: rgb(255, 255, 255);
  color: black;
  padding: 0 4px; /* Horizontal padding only */
  display: inline-block;
  line-height: 1.1;
  position: relative;
  font-weight: 600;
  transform: translateY(0);
}

.paragraph-section {
  color: rgb(48, 48, 48);
  font-family: "Helvetica";
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.3rem;
  opacity: 0; /* Start invisible */
  text-align: left; /* Ensure paragraphs are left-aligned */
}

.quote {
  padding-left: 20px;
  font-style: italic;
  border-left: 3px solid rgba(0, 0, 0, 0.2); /* Add a subtle left border to quotes */
}
.highlight-denial {
  background-color: black;
  color: white;
}
</style>
