<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white px-0">
    <!-- <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom"> -->
    <div class="container">
      <router-link to="navbar-brand" class="nav-link"
        >Narratives of Truth and Denial</router-link
      >
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
            <router-link to="/Background" class="nav-link"
              >Background</router-link
            >
          </li>

          <li class="nav-item">
            <router-link to="/GovVsComment" class="nav-link"
              >Government + Public Discourse</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/Archive" class="nav-link">Archive</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/narratives-list" class="nav-link"
              >Narratives</router-link
            >
            <!-- <a class="nav-link" href="/bubble-chart">Bubble Chart</a> -->
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="/Framing">Media</a>
          </li> -->
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
  background-color: transparent !important;

  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  padding: 0.5rem 0;
}

/* Container for navbar content */
.container {
  display: flex !important;
  justify-content: flex-start !important; /* Start from left instead of space-between */
  align-items: center;
  width: 100%;
  max-width: 1600px; /* Increased from 1200px for wider screens */
  padding: 0px 40px !important; /* Increased horizontal padding from 0px */
  margin: 0 auto;
  box-sizing: border-box; /* Include padding in width calculations */
}

/* Brand styling - aligned far left - fix with !important rules */
.navbar-brand {
  color: #333;
  padding: 0.5rem 0;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  margin-left: 0 !important; /* Ensure no left margin with !important */
  margin-right: auto !important; /* Push everything else to the right */
  text-align: left !important; /* Explicitly left align text */
  float: left !important; /* Force left floating */
  display: block !important; /* Ensure it behaves as a block element */
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
    margin-left: 0px;
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
    justify-content: space-between;
  }

  .nav-item {
    margin-left: 0;
    margin-right: 10px;
    margin-bottom: 5px;
  }
}

/* Add a specific media query for 1920x1080 screens */
@media (width: 1920px) and (height: 1080px) {
  .container {
    padding: 0px 60px !important; /* Even more padding specifically for 1920x1080 */
  }

  .navbar-brand {
    margin-left: 10px !important; /* Add some space to the left of the brand */
  }

  .navbar-nav {
    margin-right: 10px !important; /* Add some space to the right of nav items */
  }
}

/* Add a media query for ultrawide screens */
@media (min-width: 2000px) {
  .container {
    max-width: 1800px; /* Even wider max-width for ultra-wide screens */
    padding: 0px 80px !important; /* More generous padding for very wide screens */
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

/* Add additional space between brand and nav items */
.navbar-collapse {
  margin-left: auto !important; /* Push to right edge */
}
</style>
