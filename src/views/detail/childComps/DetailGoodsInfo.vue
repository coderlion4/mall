<template>
  <div v-if="Object.keys(detailInfo).length" class="goods-info">
    <div class="info-desc">
      <div class="desc">{{detailInfo.desc}}</div>
    </div>
    <div v-for="(item, index) in detailInfo.detailImage" :key="index">
      <p class="info-key">{{item.key}}</p>
      <div class="info-list">
        <img v-for="(imgItem, imgIndex) in item.list" :key="imgIndex" @load="imageLoad" v-lazy="imgItem" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      isOneDetailList() {
        return (list, index) => {
          return index ? list : list.slice(0, list.lenght - 1);
        }
      }
    },
    watch: {
      detailInfo() {
        const images = this.detailInfo.detailImage;
        if (images.length > 1 && images[1].list) {
          images[images.length - 1].list.push(images[0].list.splice(-1, 1)[0]);
        }
      }
    },
    methods: {
      /**
       * 监听detailGoodsInfo中图片加载完成, 并发送事件detailGoodsInfoImageLoad
       */
      imageLoad() {
        this.$emit("detailImageLoad");
      }
    }
  }
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    position: relative;
    padding: 0 15px;
  }

  .info-desc::before,
  .info-desc::after {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    z-index: 1;
  }

  .info-desc::before {
    left: 15px;
    top: -4px;
  }

  .info-desc::after {
    right: 15px;
    bottom: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-desc .desc::before,
  .info-desc .desc::after {
    content: "";
    position: absolute;
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
  }

  .info-desc .desc::before {
    left: 15px;
    top: 0;
  }

  .info-desc .desc::after {
    right: 15px;
    bottom: 0;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
