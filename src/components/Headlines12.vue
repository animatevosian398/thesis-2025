<template>
  <div class="timeline-wrapper">
    <div class="timeline">
      <div
        v-for="(headline, index) in headlines"
        :key="headline.id"
        class="tile"
        :class="sentimentClass(headline.sentiment)"
        :title="headline.generated_title"
        :style="{ left: `${index * 150}px` }"
      >
        <span class="tile-text">{{ headline.generated_title }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-wrapper {
  position: relative;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.timeline {
  position: relative;
  width: 100%;
  height: 100px;
  border-top: 2px solid #ccc;
  padding: 10px 0;
}

.tile {
  position: absolute;
  width: 120px;
  height: 80px;
  border-radius: 6px;
  transition: transform 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  text-align: center;
}

.tile-text {
  font-size: 12px;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tile:hover {
  transform: scale(1.1);
}

.positive {
  background-color: #4caf50;
}

.neutral {
  background-color: #90a4ae;
}

.negative {
  background-color: #e53935;
}
</style>
