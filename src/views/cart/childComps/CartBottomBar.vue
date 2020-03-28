<template>
  <div class="bottom-bar">
    <div class="check-area" @click="selectAllClick">
      <check-button :is-checked="isSelectAll" class="check-button" />
      <span>全选</span>
    </div>

    <div class="price">
      合计:¥{{totalPrice}}
    </div>

    <div class="balance" @click="balanceClick">
      结算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  import { mapGetters } from "vuex";

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton,
    },
    computed: {
      ...mapGetters([
        "cartList",
        "cartLength"
      ]),
      totalPrice() {
        return this.cartList
          .filter(item => item.checked)
          .reduce((pre, item) => pre + item.price * item.count, 0)
          .toFixed(2);
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length;
      },
      isSelectAll() {
        if (!this.cartLength) return false;
        return !this.cartList.find(item => !item.checked);
      }
    },
    methods: {
      selectAllClick() {
        const isAll = this.isSelectAll;
        this.cartList.forEach(item => item.checked = !isAll);
      },
      balanceClick() {
        if (!this.isSelectAll) {
          if (!this.cartLength) {
            this.$toast.show("购物车为空，快去添加商品吧");
          } else {
            this.$toast.show("您还没有选择商品哦");
          }
        } else {
          this.$toast.show("购买成功");
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bottom-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
    display: flex;
    justify-content: space-between;
    height: 40px;
    background: #eee;
    line-height: 40px;
  }

  .check-area {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .check-button {
    margin-right: 5px;
  }

  .balance {
    width: 90px;
    color: #fff;
    background: red;
    text-align: center;
  }
</style>