import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        component: () => import('./components/Home.vue')
      },
      {
        path: '/about/:id?',
        name: 'about',
        component: () => import('./components/About.vue')
      },
      {
        path: '/test',
        name: 'test',
        component: () => import('./components/Test.vue')
      }
    ]
  });
}
