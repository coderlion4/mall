<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <ul slot="center" class="title">
      <li v-for="(item, index) in titles" :key="index" class="title-item" :class="{ active: currentIndex === index }"
        @click="titleClick(index)">
        {{item}}</li>
    </ul>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: 'DetailNavBar',
    components: {
      NavBar
    },
    data() {
      return {
        titles: ["商品", "参数", "评论", "推荐"],
        currentIndex: 0
      }
    },
    methods: {
      /**
       * 监听标题点击, 修改相应的样式, 并且scroll到该标题对应位置
       */
      titleClick(index) {
        this.currentIndex = index;
        this.$emit("titleClick", this.currentIndex);
      },

      /**
       * 返回上一个路由页面
       */
      backClick() {
        this.$router.back();
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    display: flex;
    list-style: none;
    font-size: 13px;
  }

  .title .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back {
    position: relative;
    height: 100%;
  }

  .back img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
