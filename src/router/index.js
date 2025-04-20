import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ArticlesTimelineView from "../views/ArticlesTimelineView.vue";
import GovVsCommentView from "../views/GovVsCommentView.vue";
import Bg2 from "../components/Bg2.vue";
import HeadlinesFrame from "../components/Headlines12.vue";
import StanceCategories from "../views/StanceCategories.vue";
import MediaCoveragePast from "../components/MediaCoveragePast.vue";
import Archive from "../views/Archive.vue";
import DenialView from "../views/DenialView.vue";
import Emotions from "../components/Emotions.vue";
import CategoryBreakdown from "../components/CategoryBreakdown.vue";
import StackedOverTime from "../components/StackedOverTime.vue";
import DensityDot from "../components/DensityDot.vue";
import Bg1 from "../components/Bg1.vue";
// Import Background component - adjust the path if needed
// If Bg1 is your background component, you don't need to import it again

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/articles-timeline",
      name: "articles-timeline",
      component: ArticlesTimelineView,
    },
    {
      path: "/govvscomment",
      name: "govvscomment",
      component: GovVsCommentView,
    },
    {
      path: "/bg2",
      name: "bg2",
      component: Bg2,
    },
    {
      path: "/headlines",
      name: "headlines",
      component: HeadlinesFrame,
    },
    {
      path: "/stance-categories",
      name: "stance-categories",
      component: StanceCategories,
    },
    {
      path: "/media-coverage-past",
      name: "media-coverage-past",
      component: MediaCoveragePast,
    },
    {
      path: "/Bg1", // Match the exact path from router-link
      name: "background",
      component: Bg1,
    },
    {
      path: "/archive",
      name: "archive",
      component: Archive,
    },
    {
      path: "/denial",
      name: "denial",
      component: DenialView,
    },
    {
      path: "/emotions",
      name: "emotions",
      component: Emotions,
    },
    {
      path: "/category-breakdown",
      name: "category-breakdown",
      component: CategoryBreakdown,
    },
    {
      path: "/stacked-over-time",
      name: "stacked-over-time",
      component: StackedOverTime,
    },
    {
      path: "/density-dot",
      name: "density-dot",
      component: DensityDot,
    },
  ],
  // This ensures smooth scrolling to the hash destination
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
