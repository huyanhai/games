export const routes = [
  {
    path: "/:catchAll(.*)",
    name: "NotFountPage",
    component: () => import("@/views/NotFountPage.vue"),
    props: true,
    meta: {
      title: "title.not_found",
      login: true,
    },
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    props: true,
    meta: {
      title: "title.home",
      login: true,
    },
  },
  {
    path: "/ips",
    name: "Ips",
    component: () => import("@/views/Ips.vue"),
    props: true,
    meta: {
      title: "title.home",
      login: true,
    },
  },
  {
    path: "/market",
    name: "Market",
    component: () => import("@/views/Market.vue"),
    props: true,
    meta: {
      title: "title.home",
      login: true,
    },
  },
  {
    path: "/game",
    name: "Game",
    component: () => import("@/views/Game.vue"),
    props: true,
    meta: {
      title: "title.home",
      login: true,
    },
  }, // add here
];
