<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{"¥" + goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    computed: {
      showImage() {
        return (this.goodsItem.image || this.goodsItem.show.img);
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit("itemImageLoad");
      },
      itemClick() {
        this.$router.push("/detail/" + (this.goodsItem.item_id || this.goodsItem.iid));
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .goods-item {
    width: 48%;
    padding-bottom: 40px;
    position: relative;
  }

  .goods-item img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  .goods-item .info {
    position: absolute;
    bottom: 5px;
    font-size: 12px;
    overflow: hidden;
    width: 100%;
    text-align: center;
  }

  .goods-item .info p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 3px;
  }

  .goods-item .info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-item .info .collect {
    position: relative;
  }

  .goods-item .info .collect::after {
    content: "";
    position: absolute;
    left: -15px;
    top: -1px;
    background: url("~assets/img/common/collect.svg") 0 0 / 14px 14px;
    width: 14px;
    height: 14px;
  }
</style>
