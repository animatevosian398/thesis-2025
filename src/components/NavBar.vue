<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
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
              >Government Vs. Public Discourse</a
            >
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
  background-color: #fff !important;
}
.navbar-brand {
  margin-left: -40px;
}
/* Make sure the navbar's height is properly accounted for in content */
:deep(.app-container) {
  padding-top: 56px; /* Adjust based on your navbar's height */
}
</style>
