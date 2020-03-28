<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'SwiperItem'
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .slide {
    width: 100%;
    flex-shrink: 0;
  }

  .slide img {
    width: 100%;
    display: block;
  }
</style>