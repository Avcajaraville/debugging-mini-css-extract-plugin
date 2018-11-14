<template>
  <p class="test">
    {{ testText }}
  </p>
</template>

<script>
export default {
  data() {
    return {
      testText: 'Test Component'
    };
  }
};
</script>

<style lang="scss">
.test {
  color: red;
}
</style>
