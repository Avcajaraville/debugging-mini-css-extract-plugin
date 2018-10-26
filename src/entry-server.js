import { createApp } from './app';
import { codes } from './config/server';

export default (context) =>
  new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();

      if (!matchedComponents.length) {
        const error = new Error('Module not found');

        error.code = codes.notFoundError;

        return reject(error);
      }

      // call `asyncData()` on all matched route components
      return Promise.all(
        matchedComponents.map((Component) => {
          if (Component.asyncData) {
            return Component.asyncData({
              store,
              route: router.currentRoute
            });
          }
        })
      )
        .then(() => {
          // After all preFetch hooks are resolved, our store is now
          // filled with the state needed to render the app.
          // When we attach the state to the context, and the `template` option
          // is used for the renderer, the state will automatically be
          // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
          context.state = store.state;

          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
