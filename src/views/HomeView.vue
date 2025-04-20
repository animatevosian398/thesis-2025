<template>
  <Navbar />
  <div class="app-container">
    <h1 class="homeTitle">Narratives of Truth and Denial</h1>
    <div class="button-container">
      <div class="tooltip-wrapper">
        <button @click="scrollToBackground" class="start-button">
          Launch Project
        </button>
        <span class="tooltip-text">
          Content Warning: Includes sensitive and potentially distressing and/or
          offensive material.
        </span>
      </div>
    </div>
  </div>
  <Bg1 @scrollToBg2="scrollToBg2" />
  <Bg2 />
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Bg1 from "@/components/Bg1.vue";
import Bg2 from "@/components/Bg2.vue";

const scrollToBackground = () => {
  const section = document.getElementById("background-section");
  section?.scrollIntoView({ behavior: "smooth" });
};

const scrollToBg2 = () => {
  const section = document.getElementById("bg2-section");
  section?.scrollIntoView({ behavior: "smooth" });
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Neuton:ital,wght@0,200;0,300;0,400;0,700;0,800;1,400&display=swap");

#app {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0;
  background-color: black !important;
}
.app-container {
  padding-top: 10px;
  background-color: black;
}
.backgroundTitle {
  font-family: "Neuton", serif;
  padding-top: 80px;
  padding-bottom: 10px;
  color: white;
}
.homeTitle {
  text-align: center;
  font-size: 3em;
  margin-top: 350px;
  /* color: #333; */
  color: white;
  font-family: "Neuton", serif;

  /* font-family: "Garamond", sans-serif; */
  font-weight: bold;
}

.background-section {
  height: 100vh;
  background-color: black;
  /* background: linear-gradient(to bottom right, #1e1e1e, #3c3c3c); */
  color: white;
  display: block;
  padding: 10%;
  justify-content: left;
  align-items: center;
  text-align: left;
  margin-top: 400px;
  margin-bottom: 50px;
  font-family: "General Sans", sans-serif;
}
.tooltip-wrapper {
  position: relative;
}
.button-container {
  color: white;
  background-color: black;
  text-align: center;
  margin-top: 100px;
}
button {
  background-color: transparent; /* Transparent fill */
  color: white; /* White text */
  border: 2px solid white; /* White outline */
  border-radius: 9x; /* Rounded corners */
  padding: 10px 20px; /* Add padding for better size */
  font-size: 16px; /* Adjust font size */
  cursor: pointer; /* Change cursor to pointer */
  transition: all 0.3s ease; /* Smooth transition for hover effects */
}
html,
body {
  background-color: black !important;
}
.start-button {
  background-color: transparent;
  color: white; /* White text */
  border: 2px solid white; /* White outline */
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}
button:hover {
  background-color: rgb(255, 255, 255);
  color: black;
  border: 2px solid white;
}
.tooltip-text {
  visibility: hidden;
  color: black;
  text-align: center;
  padding: 8px 12px;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  bottom: 130%; /* above the button */
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  font-size: 0.85em;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tooltip-wrapper:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
  color: white;
}
</style>
