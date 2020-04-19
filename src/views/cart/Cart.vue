<template>
  <div class="cart" :style="{ height: cartListHeight }">
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
    data() {
      return {
        cartListHeight: window.innerHeight + "px"
      }
    },
    computed: {
      ...mapGetters([
        "cartLength"
      ])
    },
    mounted() {
      // 解决移动端工具栏显示/隐藏时高度bug
      window.addEventListener("resize", this.getCartListHeight);
    },
    methods: {
      /**
       * 解决移动端工具栏显示/隐藏时高度bug
       * 
       * Bug原因: 
       * 设置home高度不能直接使用100%, 因为100%是相对与父元素, 而home的父元素的高度是依赖与home, 所以百分比无效
       * 设置home高度不能使用100vh, 因为vh的高度计算是包含移动端的地址栏与工具栏的, 而当地址栏和工具栏显示\隐藏时会产生高度bug
       * 
       * 解决方案:
       * 使用window.innerHeight动态设置高度: 当窗口大小改变时重新设置高度为window.innerHeight, 因为window.innerHeight的高度不包括地址栏和导航栏
       */
      getCartListHeight() {
        this.cartListHeight = window.innerHeight + "px";
      },
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nav-bar {
    background: var(--color-tint);
    color: #fff;
    font-weight: bold;
  }
</style>
