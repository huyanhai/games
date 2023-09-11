export const routes = [
  {
    path: '/:catchAll(.*)',
    name: 'NotFountPage',
    component: () => import('@/views/NotFountPage.vue'),
    props: true,
    meta: {
      title: 'title.not_found',
      login: true
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/Index.vue'),
    props: true,
    meta: {
      title: 'title.home',
      login: true
    }
  }
  // add here
];
