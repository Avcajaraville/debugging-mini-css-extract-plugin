import Vue from 'vue';
import { createApp } from './app';

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options;

    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      })
        .then(next)
        .catch(next);
    } else {
      next();
    }
  }
});

// client-specific bootstrapping logic...
const { app, router, store } = createApp();

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using `router.beforeResolve()` so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    // we only care about non-previously-rendered components,
    // so we compare them until the two matched lists differ
    let diffed = false;

    const activated = matched.filter(
      (component, i) => diffed || (diffed = prevMatched[ i ] !== component)
    );

    if (!activated.length) {
      return next();
    }

    // this is where we should trigger a loading indicator if there is one
    Promise.all(
      activated.map((component) => {
        if (component.asyncData) {
          return component.asyncData({
            store,
            route: to
          });
        }
      })
    )
      .then(() => {
        // stop loading indicator
        next();
      })
      .catch(next);
  });

  app.$mount('#app', true);
});
