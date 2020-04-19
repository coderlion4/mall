<template>
  <div class="cart-list">
    <scroll class="scroll-content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :item-info="item" :key="index" />
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  import CartListItem from "./CartListItem";

  import { mapGetters } from "vuex";

  export default {
    name: 'CartList',
    components: {
      Scroll,
      CartListItem
    },
    data() {
      return {
        cartListHeight: window.innerHeight + "px"
      }
    },
    computed: {
      ...mapGetters([
        "cartList"
      ])
    },
    activated() {
      this.$refs.scroll.refresh();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .scroll-content {
    height: 100%;
    overflow: hidden;
  }
</style>
