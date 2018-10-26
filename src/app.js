import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import { createRouter } from './router';
import Vuex from 'vuex';

Vue.use(Vuex);

// export a factory function for creating fresh app, router and store
export function createApp() {
  const router = createRouter();
  const store = new Vuex.Store({});

  // sync so that route state is available as part of the store
  sync(store, router);

  const app = new Vue({
    // inject router into root Vue instance
    router,
    store,
    // the root instance simply renders the App component.
    // eslint-disable-next-line id-length
    render: (h) => h(App)
  });

  return {
    app,
    router,
    store
  };
}
