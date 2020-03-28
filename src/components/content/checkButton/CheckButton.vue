<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: 'CheckButton',
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .check-button {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .check-button img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .check {
    background: var(--color-high-text);
    border-color: var(--color-high-text);
  }
</style>
