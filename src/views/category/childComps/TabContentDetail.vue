<template>
  <grid-view>
    <goods-list-item v-for="(item, index) in categoryDetail" :key="index" :goodsItem="item" />
  </grid-view>
</template>

<script>
  import GridView from "components/common/gridView/GridView";
  import GoodsListItem from "components/content/goods/GoodsListItem";

  export default {
    name: "TabContentDetail",
    components: {
      GridView,
      GoodsListItem
    },
    props: {
      categoryDetail: {
        type: Array,
        default: () => []
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
