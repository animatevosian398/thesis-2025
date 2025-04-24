<template>
  <div id="bg2-section" class="background-section-2" ref="bg2Section">
    <h1 class="backgroundTitle" ref="title">Post-1915</h1>
    <h3 ref="content">
      Turkey's official stance on the genocide evolved from silence, to a more
      complicated form of denial and revisionist reframing of history. They
      frame the events as justified due to suspected Armenian alliances with
      Russia and also a relocation for their own safety, a relocation which
      essentially was a death march through the Syrian desert; they acknowledge
      the Armenian deaths, but as a consequence of other factors like famine and
      disease or wartime causes. The systematic denial of the Armenian Genocide
      has profound consequences. Beyond historical revisionism, it prevents
      healing for survivors and their descendants while creating a precedent for
      impunity regarding mass atrocities. However, the Ottoman Empire had
      previously attacked Armenians during the Hamidian Massacres in the 1800s,
      so this was not a single, unrelated event. [cite]?
      <br /><br />
      This denial extends beyond Turkey, influencing international relations and
      historical education. For Armenian communities worldwide, this represents
      not only a historical injustice but an ongoing wound that affects their
      identity and relationship with their heritage.
    </h3>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "Bg2",
  setup() {
    const bg2Section = ref(null);
    const title = ref(null);
    const content = ref(null);

    // Method that can be called to trigger the animation
    const triggerAnimation = () => {
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

      gsap.to(content.value, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power2.out",
      });
    };

    onMounted(() => {
      // Initial states - start hidden
      gsap.set(bg2Section.value, { opacity: 0 });
      gsap.set(title.value, { opacity: 0, y: 30 });
      gsap.set(content.value, { opacity: 0, y: 30 });

      // Create scroll trigger for fade-in
      ScrollTrigger.create({
        trigger: bg2Section.value,
        start: "top 80%", // Starts animation when top of section is 80% from top of viewport
        onEnter: triggerAnimation,
        once: false,
      });
    });

    return {
      bg2Section,
      title,
      content,
      triggerAnimation,
    };
  },
};
</script>

<style scoped>
.background-section-2 {
  min-height: 100vh;
  background: #000000;
  color: white;
  display: block;
  padding: 10%;
  justify-content: left;
  align-items: center;
  text-align: left;
  /* Remove any margins that might be causing spacing */
  margin-top: 0;
  margin-bottom: 0;
}

.backgroundTitle {
  /* font-family: "Helvetica"; */
  font-family: "aktiv-grotesk", "General Sans", sans-serif;
  padding-top: 80px;
  padding-bottom: 10px;
}
</style>
