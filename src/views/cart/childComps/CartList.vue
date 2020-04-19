<template>
  <div class="cart-list" :style="{ height: cartListHeight }">
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
    created() {
      // 解决移动端工具栏显示/隐藏时高度bug
      window.addEventListener("resize", this.getCartListHeight);
    },
    activated() {
      this.$refs.scroll.refresh();
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
  .cart-list {
    height: calc(100% - 133px);
  }

  .scroll-content {
    height: 100%;
    overflow: hidden;
  }
</style>
