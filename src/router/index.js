import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ArticlesTimelineView from "../views/ArticlesTimelineView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/articles-timeline", component: ArticlesTimelineView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
