import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ArticlesTimelineView from "../views/ArticlesTimelineView.vue";
import GovVsCommentView from "../views/GovVsCommentView.vue";
import Bg2 from "../components/Bg2.vue";
import HeadlinesFrame from "../components/Headlines12.vue";
import StanceCategories from "../views/StanceCategories.vue";
import MediaCoveragePast from "../components/MediaCoveragePast.vue";
import Archive from "../views/Archive.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/articles-timeline", component: ArticlesTimelineView },
  { path: "/govvscomment", component: GovVsCommentView },
  { path: "/Bg2", component: Bg2 },
  { path: "/HeadlinesFrame", component: HeadlinesFrame },
  { path: "/StanceCategories", component: StanceCategories },
  {
    path: "/MediaCoveragePast",
    name: "MediaCoveragePast",
    component: MediaCoveragePast,
  },
  { path: "/Archive", component: Archive },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }; // this ensures top scroll when changing routes
  },
});

export default router;
