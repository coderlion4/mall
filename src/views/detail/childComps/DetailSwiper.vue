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
        default() {
          return []
        }
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
    methods: {
      DetailImageLoad() {
        this.imagesCount++;
        if (this.imagesCount === this.imagesLength) {
          this.$refs.swiper && this.$refs.swiper.swiperStart();
        }
      }
    },
    watch: {
      topImages() {
        this.imagesLength = this.topImages.length;
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