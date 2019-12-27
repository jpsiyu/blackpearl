import Vue from "vue";
import Router from "vue-router";
import routes from "vue-auto-routing";
import { createRouterLayout } from "vue-router-layout";

Vue.use(Router);

const RouterLayout = createRouterLayout(layout =>
  import(`@/layouts/${layout}.vue`)
);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: RouterLayout,
      children: routes
    },
    {
      path: "*",
      component: RouterLayout,
      children: [
        {
          path: "",
          component: () => import("@/pages/error.vue")
        }
      ]
    }
  ]
});
