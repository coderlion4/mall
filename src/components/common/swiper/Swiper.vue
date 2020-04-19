<template>
  <div id="jh-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <div class="indicator" v-if="showIndicator && slideCount > 1">
      <slot name="indicator">
        <span class="indi-item" :class="{active: index + 1 === currentIndex}" v-for="(item, index) in slideCount"
          :key="index"></span>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Swiper",
    props: {
      interval: {
        type: Number,
        default: 3000
      },
      animDuration: {
        type: Number,
        default: 300
      },
      moveRatio: {
        type: Number,
        default: 0.25
      },
      showIndicator: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        slideCount: 0,
        totalWidth: 0,
        swiperStyle: {},
        currentIndex: 1,
        scrolling: false
      }
    },
    mounted() {
      window.addEventListener("resize", this.getTotalWidth);
    },
    methods: {
      /**
       * swiper接口
       * 通过$refs.swiper.swiperStart()来启动轮播图
       */
      swiperStart() {
        setTimeout(() => {
          this.handleDom();
          this.startTimer();
        }, 100);
      },

      /**
       * 在第一个和最后一个位置分别插入最后一张图片, 第一张图片
       */
      handleDom() {
        let swiperEl = document.querySelector(".swiper");
        let swiperEls = swiperEl.getElementsByClassName("slide");

        this.slideCount = swiperEls.length;
        if (this.slideCount > 1) {
          let cloneFirst = swiperEls[0].cloneNode(true);
          let cloneLast = swiperEls[this.slideCount - 1].cloneNode(true);
          swiperEl.insertBefore(cloneLast, swiperEls[0]);
          swiperEl.appendChild(cloneFirst);
          this.totalWidth = swiperEl.offsetWidth;
          this.swiperStyle = swiperEl.style;
          this.setTransform(-this.totalWidth);
        }
      },

      /**
       * 启动轮播
       */
      startTimer() {
        this.playTimer = setInterval(() => {
          this.currentIndex++;
          this.scrollContent(-this.currentIndex * this.totalWidth);
        }, this.interval);
      },

      /**
       * 改变图片
       */
      setTransform(position) {
        this.swiperStyle.transform = "translateX(" + position + "px)";
        this.swiperStyle["-webkit-transform"] = "translateX(" + position + "px)";
        this.swiperStyle["-ms-transform"] = "translateX(" + position + "px)";
      },

      /**
       * 改变图片的同时加上动画
       */
      scrollContent(currentPosition) {
        this.scrolling = true;
        this.swiperStyle.transition = "transform " + this.animDuration + "ms";
        this.setTransform(currentPosition);
        this.checkPosition(this.animDuration);
        this.scrolling = false;
      },

      /**
       * 检查位置
       */
      checkPosition(timeout) {
        setTimeout(() => {
          this.swiperStyle.transition = "0ms";
          if (this.currentIndex > this.slideCount) {
            this.currentIndex = 1;
          } else if (this.currentIndex <= 0) {
            this.currentIndex = this.slideCount;
          }
          this.setTransform(-this.currentIndex * this.totalWidth);
        }, timeout);
      },

      /**
       * 手指触摸事件
       */
      touchStart(e) {
        if (!this.scrolling) {
          this.stopTimer();
          this.startX = e.touches[0].pageX;
        }
      },

      /**
       * 手指移动事件
       */
      touchMove(e) {
        this.currentX = e.touches[0].pageX;
        this.distance = this.currentX - this.startX;
        let currentPosition = -this.currentIndex * this.totalWidth;
        let moveDistance = this.distance + currentPosition;
        this.setTransform(moveDistance);
      },

      /**
       * 手指抬起事件
       */
      touchEnd() {
        let currentMove = Math.abs(this.distance);
        if (currentMove !== 0 && currentMove >= this.totalWidth * this.moveRatio) {
          if (this.distance > 0) {
            this.currentIndex--;
          } else {
            this.currentIndex++;
          }
        }
        this.scrollContent(-this.currentIndex * this.totalWidth);
        this.startTimer();
      },

      /**
       * 停止轮播
       */
      stopTimer() {
        window.clearInterval(this.playTimer);
      },

      /**
       * 修正图片大小
       */
      getTotalWidth() {
        this.totalWidth = window.innerWidth;
        this.checkPosition(0);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #jh-swiper {
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .swiper {
    display: flex;
  }

  .indicator {
    position: absolute;
    bottom: 8px;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .indicator .indi-item {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #fff;
    border-radius: 50%;
    margin: 0 5px;
  }

  .indicator .indi-item.active {
    background-color: rgba(212, 62, 46, 1.0);
  }
</style>
