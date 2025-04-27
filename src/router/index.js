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
import Bg3 from "../components/Bg3.vue";
import Framing from "../components/Framing.vue";
import BubbleChart from "../components/BubbleChart.vue";
import StanceView from "../views/StanceView.vue"; // Import StanceView component
//stance detail pages
import Apology from "../views/stanceDetailPages/Apology.vue";
import HistoricalAffirmation from "../views/stanceDetailPages/HistoricalAffirmation.vue";
import ExplicitDenial from "../views/stanceDetailPages/ExplicitDenial.vue";
import MinimizationReframing from "../views/stanceDetailPages/MinimizationReframing.vue";
import JustificationNarrative from "../views/stanceDetailPages/JustificationNarrative.vue";
import ContemporaryComparison from "../views/stanceDetailPages/ContemporaryComparison.vue";
import PersonalTestimony from "../views/stanceDetailPages/PersonalTestimony.vue";
import DiscussionAboutDenial from "../views/stanceDetailPages/DiscussionAboutDenial.vue";
import HistoricalInversion from "../views/stanceDetailPages/HistoricalInversion.vue";
import ReconciliationDiscourse from "../views/stanceDetailPages/ReconciliationDiscourse.vue";
import SympathyMemorial from "../views/stanceDetailPages/SympathyMemorial.vue";
import ProceduralDeflection from "../views/stanceDetailPages/ProceduralDeflection.vue";
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
      path: "/StanceCategories",
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
    {
      path: "/Bg3",
      name: "Background3",
      component: Bg3,
    },
    {
      path: "/Framing",
      name: "Framing",
      component: Framing,
    },
    { path: "/bubble-chart", name: "bubble-chart", component: BubbleChart },
    {
      path: "/stance/:stance",
      name: "stance-details",
      component: StanceView,
      props: true,
    },
    //stance detail pages
    {
      path: "/stance/Apology",
      name: "apology",
      component: Apology,
    },
    {
      path: "/stance/HistoricalAffirmation",
      name: "historical-affirmation",
      component: HistoricalAffirmation,
    },
    {
      path: "/stance/ExplicitDenial",
      name: "explicit-denial",
      component: ExplicitDenial,
    },
    {
      path: "/stance/MinimizationReframing",
      name: "minimization-reframing",
      component: MinimizationReframing,
    },
    {
      path: "/stance/JustificationNarrative",
      name: "justification-narrative",
      component: JustificationNarrative,
    },
    {
      path: "/stance/ContemporaryComparison",
      name: "contemporary-comparison",
      component: ContemporaryComparison,
    },
    {
      path: "/stance/PersonalTestimony",
      name: "personal-testimony",
      component: PersonalTestimony,
    },
    {
      path: "/stance/DiscussionAboutDenial",
      name: "discussion-about-denial",
      component: DiscussionAboutDenial,
    },
    {
      path: "/stance/HistoricalInversion",
      name: "historical-inversion",
      component: HistoricalInversion,
    },
    {
      path: "/stance/ReconciliationDiscourse",
      name: "reconciliation-discourse",
      component: ReconciliationDiscourse,
    },
    {
      path: "/stance/SympathyMemorial",
      name: "sympathy-memorial",
      component: SympathyMemorial,
    },
    {
      path: "/stance/ProceduralDeflection",
      name: "procedural-deflection",
      component: ProceduralDeflection,
    },
    // { path: "/archive-table", name: "archive-table", component: ArchiveTable },
  ],
  // This ensures smooth scrolling to the hash destination
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
