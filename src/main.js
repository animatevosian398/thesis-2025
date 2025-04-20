import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Papa from "papaparse";
import * as d3 from "d3";
window.d3 = d3; 

const app = createApp(App);
app.use(router);
app.mount("#app");
