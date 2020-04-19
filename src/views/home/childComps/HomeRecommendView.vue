<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img v-lazy="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeRecommendView',
    props: {
      recommends: {
        type: Array,
        default: () => []
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    border-bottom: 10px solid #eee;
    text-align: center;
    font-size: 12px;
    padding: 13px 0 20px;
  }

  .recommend .recommend-item {
    flex: 1;
  }

  .recommend .recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
