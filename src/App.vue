<template>
  <div id="app">
    <p>{{ message }}</p>
    <ul>
      <li>
        <router-link to="/">Go home!</router-link>
      </li>
      <li>
        <router-link to="/about">Go about</router-link>
      </li>
      <li>
        <router-link to="/about/crap">Go about thingies</router-link>
      </li>
    </ul>
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  props: {
    message: {
      type: String,
      default: 'Vue ssr example page'
    }
  }
};
</script>


<style lang="scss">
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
