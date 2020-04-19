<template>
  <swiper class="detail-swiper" ref="swiper">
    <swiper-item v-for="(item, index) in topImages" :key="index">
      <img v-lazy="item" alt="" @load="DetailImageLoad">
    </swiper-item>
  </swiper>
</template>

<script>
  import { Swiper, SwiperItem } from "components/common/swiper";

  export default {
    name: 'DetailSwiper',
    props: {
      topImages: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        imagesCount: 0,
        imagesLength: 0
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    watch: {
      topImages() {
        this.imagesLength = this.topImages.length;
      }
    },
    methods: {
      /**
       * 监听banners中图片加载完成之后启动轮播图
       */
      DetailImageLoad() {
        this.imagesCount++;
        if (this.imagesCount === this.imagesLength) {
          this.$refs.swiper && this.$refs.swiper.swiperStart();
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .detail-swiper {
    height: 300px;
  }
</style>
