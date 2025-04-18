<template>
  <div id="background-section" class="background-section" ref="bgSection">
    <h1 class="backgroundTitle" ref="title">Background</h1>
    <h3 ref="content">
      It began on April 24 1915, when hundreds of Armenian leaders and thinkers
      were rounded up and killed, followed by widespread deportations of
      ordinary people from their homes to the Syrian and Iraqi deserts. Many
      died during these brutal marches from starvation, disease, or direct
      violence. The events were well-documented by journalists, missionaries,
      and diplomats at the time, with photographs and eyewitness accounts.
      <br /><br />
      Despite this evidence, Turkey still refuses to acknowledge these events as
      genocide, instead calling them "relocations" necessary during wartime. For
      Armenians worldwide, especially those whose family members survived and
      fled to other countries, this history remains deeply personal and
      important to remember.
    </h3>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "Bg1",
  setup() {
    const bgSection = ref(null);
    const title = ref(null);
    const content = ref(null);

    // Function that we can call to trigger the animation
    const triggerAnimation = () => {
      // Animate title first, then content
      gsap.to(title.value, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.to(content.value, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      });
    };

    onMounted(() => {
      // Initial state
      gsap.set(title.value, { opacity: 0, y: 50 });
      gsap.set(content.value, { opacity: 0, y: 50 });

      // ScrollTrigger for the entire section
      ScrollTrigger.create({
        trigger: bgSection.value,
        start: "top 80%",
        onEnter: triggerAnimation,
        once: false,
      });
    });

    // Expose the triggerAnimation method to the parent component
    return {
      bgSection,
      title,
      content,
      triggerAnimation,
    };
  },
};
</script>

<style scoped>
.background-section {
  height: 100vh;
  background: black;
  color: white;
  display: block;
  padding: 10%;
  justify-content: left;
  align-items: center;
  text-align: left;
  margin-top: 400px;
}

.backgroundTitle {
  font-family: "Helvetica";
  padding-top: 80px;
  padding-bottom: 10px;
}
</style>
