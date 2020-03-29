<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item" v-for="(item, index) in categories" @click="itemClick(index)"
        :class="{ active: currentIndex === index }" :key="index">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  export default {
    name: "TabMenu",
    components: {
      Scroll
    },
    props: {
      categories: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit("selectItem", index);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #tab-menu {
    background-color: #f6f6f6;
    width: 100px;
    height: 100%;
    overflow: hidden;
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .menu-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>