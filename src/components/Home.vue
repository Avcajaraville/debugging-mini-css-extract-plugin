<template>
  <div class="home">
    {{ homeText }}
    <p>
      <button @click="add()">Add 1</button>
      <span>{{ count }}</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      homeText: 'Home Component'
    };
  }
};
</script>

<style lang="scss">
.home {
  color: green;
}
</style>
