<template>
  <swiper ref="swiper" :showIndicator="false">
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src=" item.image" alt="" @load="imageLoad">
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
        default() {
          return [];
        }
      }
    },
    methods: {
      imageLoad() {
        this.imagesCount++;
        if (this.imagesCount === 1) {
          this.$emit("swiperImageLoad");
        } else if (this.imagesCount === this.imagesLength) {
          this.$refs.swiper.swiperStart();
        }
      }
    },
    watch: {
      banners() {
        this.imagesLength = this.banners.length;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
