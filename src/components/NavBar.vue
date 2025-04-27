<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <!-- <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom"> -->
    <div class="container">
      <a class="navbar-brand" href="/">Narratives of Truth and Denial</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/Bg1" class="nav-link">Background</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/GovVsComment"
              >Government + Public Discourse</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Archive">Archive</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/bubble-chart">Bubble Chart</a>
          </li>
          <!-- <li class="nav-item">
            <router-link to="/articles-timeline" class="nav-link">
              TR Articles Timeline
            </router-link>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
// No changes needed here
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  padding: 0.5rem 0;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Add subtle shadow */
}

/* Container for navbar content */
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px; /* Set a consistent max width */
  padding: 0 24px; /* Consistent padding on both sides */
  margin: 0 auto;
  box-sizing: border-box; /* Include padding in width calculations */
}

/* Brand styling - aligned far left */
.navbar-brand {
  color: #333;
  padding: 0.5rem 0;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  margin-left: 0; /* Remove negative margin */
  margin-right: 2rem; /* Add proper spacing between brand and nav items */
}

/* Navigation items - aligned right */
.navbar-nav {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-item {
  margin-left: 15px; /* Space between nav items */
}

.nav-link {
  padding: 0.5rem 0.5rem;
  font-size: 0.9rem;
  color: #333;
  text-decoration: none;
  white-space: nowrap; /* Prevent wrapping */
  position: relative; /* This is critical for absolute positioning of ::after */
  display: inline-block; /* This ensures the link only takes up necessary space */
}

/* For mobile responsiveness */
@media (max-width: 992px) {
  .container {
    flex-wrap: wrap;
    padding: 0 15px;
  }

  .navbar-brand {
    margin-right: auto; /* Push to left */
    font-size: 0.9rem; /* Slightly smaller */
  }

  .navbar-nav {
    margin-top: 0.5rem;
    width: 100%;
    justify-content: flex-end;
  }

  .nav-item {
    margin-left: 10px;
  }

  .nav-link {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  }
}

/* Add specific mobile adjustments for smaller screens */
@media (max-width: 576px) {
  .navbar-brand {
    font-size: 0.85rem;
    width: 55%; /* Keep brand from wrapping too early */
  }

  .navbar-nav {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .nav-item {
    margin-left: 0;
    margin-right: 10px;
    margin-bottom: 5px;
  }
}

/* Underline animation */
.nav-link::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: #333;
  transform: scaleX(0);
  transform-origin: bottom left;
  transition: transform 0.3s ease;
}
/* Active state */
.router-link-active::after {
  transform: scaleX(1);
}
.nav-link:hover {
  color: #000;
}

.nav-link:hover::after {
  transform: scaleX(1);
}

/* Active state */
.router-link-active::after {
  transform: scaleX(1);
}

.select-wrapper {
  position: relative;
  width: 100%;
  top: 60px;
  margin: 0 auto;
}

.document-title-select {
  font-family: "Georgia", serif;
  color: #333;
  width: 100%;
  text-align: left;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  cursor: pointer;
  padding: 20px 30px 10px 0px; /* Added right padding for arrow */
  margin-bottom: 30px;
  line-height: 1.4;
  min-height: 70px; /* Increased height for wrapped text */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  white-space: normal; /* Changed from nowrap to normal to allow wrapping */
  overflow: visible;
  text-overflow: ellipsis;
  height: auto; /* Allow height to adjust based on content */
}

/* Style for option elements in dropdown */
option {
  white-space: normal; /* Allow options to wrap */
  line-height: 1.4;
  padding: 10px;
}

/* Add custom arrow indicator */
.select-wrapper::after {
  content: "▼";
  font-size: 0.7em;
  color: #666;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
</style>
