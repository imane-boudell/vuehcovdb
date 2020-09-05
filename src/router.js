import Vue from "vue";
import Router from "vue-router";
import Search from "./views/Search.vue";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Links from "./views/Links.vue";
import Results from "./views/Results.vue";
import MSA from "./views/MSA.vue";
import Epitopes from "./views/Epitopes.vue";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  mode: 'hash',
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/search",
      name: "search",
      component: Search
    },
    {
      path: "/results",
      name: "results",
      component: Results,
      props: true
    },
    {
      path: "/msa",
      name: "msa",
      component: MSA,
      props: true
    },
    {
      path: "/about",
      name: "about",
      component: About,
      props: true
    },
    {
      path: "/links",
      name: "links",
      component: Links,
      props: true
    },
    {
      path: "/epitopes",
      name: "epitopes",
      component: Epitopes,
    },
  ]
});
