<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <span slot="center">购物车（{{cartLength}}）</span>
    </nav-bar>
    <cart-list />
    <cart-bottom-bar />
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import { mapGetters } from "vuex";

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters([
        "cartLength"
      ])
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background: var(--color-tint);
    color: #fff;
  }
</style>