# Test repo for issue [#90](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/90#issuecomment-433078289) on mini-css-extract-plugin

## Installation:

`npm install`

## Run the server:

`npm start`

## Issues:

- When running `npm start` (which contains production settings), build process runs fine;
- However, if you acces the site (http://localhost:3000) you can see the following error on the console:

```
ReferenceError: document is not defined
    at server.bundle.js:1:394
    at new Promise (<anonymous>)
    at Function.l.e (server.bundle.js:1:276)
    at component (server.bundle.js:1:4461)
    at /Users/antonio/Projects/mini-css-extract/node_modules/vue-router/dist/vue-router.common.js:1776:17
    at /Users/antonio/Projects/mini-css-extract/node_modules/vue-router/dist/vue-router.common.js:1803:66
    at Array.map (<anonymous>)
    at /Users/antonio/Projects/mini-css-extract/node_modules/vue-router/dist/vue-router.common.js:1803:38
    at Array.map (<anonymous>)
    at flatMapComponents (/Users/antonio/Projects/mini-css-extract/node_modules/vue-router/dist/vue-router.common.js:1802:26)
    at /Users/antonio/Projects/mini-css-extract/node_modules/vue-router/dist/vue-router.common.js:1738:5
    at iterator (/Users/antonio/Projects/mini-css-extract/node_modules/vue-router/dist/vue-router.common.js:1945:7)
    at step (/Users/antonio/Projects/mini-css-extract/node_modules/vue-router/dist/vue-router.common.js:1719:9)
    at step (/Users/antonio/Projects/mini-css-extract/node_modules/vue-router/dist/vue-router.common.js:1723:9)
    at runQueue (/Users/antonio/Projects/mini-css-extract/node_modules/vue-router/dist/vue-router.common.js:1727:3)
    at AbstractHistory.confirmTransition (/Users/antonio/Projects/mini-css-extract/node_modules/vue-router/dist/vue-router.common.js:1974:3)
```

## Observations:

This happens when I include styles on my components; removing the style block on the components (src/componets/About.vue & src/componets/Home.vue) produces no error.

So I suspect it have to do with dynamic modules.

## Expected behaviour:

In production, Im able to serve the CSS from an external file, ideally, splitted by routes.

This is a project requirement and a deal breaker for us.
