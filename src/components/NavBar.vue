<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <!-- <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom"> -->
    <div class="container">
      <a class="navbar-brand" href="/">[Narratives of Truth and Denial]</a>
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
            <a class="nav-link" href="/Archive.vue">Archive</a>
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
  /* background-color: #00000037 !important; */
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */
}

.navbar-brand {
  margin-left: 0;
  color: #333;
}

:deep(.app-container) {
  padding-top: 50px; /* Adjust based on your navbar's height */
}

.nav-link {
  position: relative;
  text-decoration: none;
  color: #333;
  transition: color 0.2s ease;
}

.nav-link::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: #333;
  transform: scaleX(0);
  transition: transform 0.3s ease;
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
</style>
