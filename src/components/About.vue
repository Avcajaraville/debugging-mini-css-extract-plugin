<template>
  <p class="about">
    {{ aboutText }}
    <span>Item: {{ item }}</span>
  </p>
</template>

<script>
export default {
  data() {
    return {
      aboutText: 'About Component'
    };
  }
};
</script>

<style lang="scss">
.about {
  color: blue;
}
</style>
