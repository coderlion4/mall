<template>
  <div class="goodsList">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="goodsItem">
      <goods-list-item v-for="(item, index) in goods" :goodsItem="item" :key="index" />
    </div>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";

  export default {
    name: 'GoodsList',
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default: () => []
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .goodsList {
    padding: 2px;
  }

  .goodsItem {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .title {
    margin-left: 10px;
    font-size: 15px;
    line-height: 50px;
    color: #333;
  }
</style>
