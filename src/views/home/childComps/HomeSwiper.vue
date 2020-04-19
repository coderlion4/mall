<template>
  <swiper ref="swiper" :showIndicator="false">
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import { Swiper, SwiperItem } from "components/common/swiper";
  export default {
    name: 'HomeSwiper',
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
    props: {
      banners: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      banners() {
        this.imagesLength = this.banners.length;
      }
    },
    methods: {
      /**
       * 监听homeSwiperImageLoad图片加载完成
       * 发送swiperImageLoad事件, 获取backTop的offsetTop
       * 启动轮播图
       */
      imageLoad() {
        this.imagesCount++;
        if (this.imagesCount === 1) {
          this.$emit("swiperImageLoad");
        } else if (this.imagesCount === this.imagesLength) {
          this.$refs.swiper.swiperStart();
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
