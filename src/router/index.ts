import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  strict: true,
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/helloworld/index.vue")
    }
  ]
});

export default router;
