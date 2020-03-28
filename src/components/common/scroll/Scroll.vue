<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BSscroll from "better-scroll";

  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // 创建scroll对象
      this.scroll = new BSscroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });

      // 监听滚动的位置
      if (this.probeType == 2 || this.probeType == 3) {
        this.scroll.on("scroll", position => {
          this.$emit("scroll", position);
        });
      }

      // 监听scroll滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUp");
        })
      }

    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
      },
      refresh() {
        this.scroll && this.scroll.refresh && this.scroll.refresh();
      },
      getScrollY() {
        return this.scroll.y ? this.scroll.y : 0;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>