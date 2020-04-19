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
      /**
       * 根据不同的数据渲染图片
       */
      showImage() {
        if (this.goodsItem.image) return this.goodsItem.image;
        if (this.goodsItem.show && this.goodsItem.show.img) return this.goodsItem.show.img;
        if (this.goodsItem.img) return this.goodsItem.img;
        return "";
      }
    },
    methods: {
      /**
       * 监听goodsListItem图片加载完成事件
       * 将图片加载完成事件发送到事件总线
       */
      imageLoad() {
        this.$bus.$emit("itemImageLoad");
      },

      /**
       * 监听商品点击
       * 跳转到详情页
       */
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
