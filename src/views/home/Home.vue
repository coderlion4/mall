<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control @tabClick="tabClick" class="tab-control" :titles="['流行', '新款', '精选']" ref="TopTabControl"
      v-show="isTabFixed" />
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll"
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend-view :recommends="recommends" />
      <home-feature-view />
      <tab-control @tabClick="tabClick" class="tab-control" :titles="['流行', '新款', '精选']" ref="tabControl" />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>

  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import HomeFeatureView from "./childComps/HomeFeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList"
  import Scroll from "components/common/scroll/Scroll";

  import { getHomeMultidata, getHomeGoods } from "network/home";
  import { itemListenerMixin, backTopMixin } from "common/mixin";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: { page: 0, list: [] },
          new: { page: 0, list: [] },
          sell: { page: 0, list: [] }
        },
        currentType: "pop",
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh();
    },
    deactivated() {
      // 保存离开home时的Y值
      this.saveY = this.$refs.scroll.getScrollY();

      // 取消全局事件的监听
      this.$bus.$off("itemImageLoad", this.itemImageListener);
    },
    created() {
      // 请求多个数据(轮播图数据、推荐数据)
      this.getHomeMultidata();

      // 请求商品数据
      this.getHomeGoods("pop");
      this.getHomeGoods("new");
      this.getHomeGoods("sell");
    },

    methods: {
      /**
       * 事件监听相关方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = "pop";
            break;
          case 1:
            this.currentType = "new";
            break;
          case 2:
            this.currentType = "sell";
            break;
        }
        this.$refs.TopTabControl.currentIndex = index;
        this.$refs.tabControl.currentIndex = index;
      },
      contentScroll(position) {
        // 判断BackTop是否显示
        this.listenerShowBackTop(position.y);

        // 决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = Math.abs(position.y) >= this.tabOffsetTop;
      },
      loadMore() {
        this.getHomeGoods(this.currentType);
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      },

      /**
       * 网络请求相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        }).catch(err => {
          console.log(err);
        });
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page = page;
          this.$refs.scroll && this.$refs.scroll.finishPullUp();
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
    color: #fff;
    background-color: var(--color-tint);
  }

  .tab-control {
    position: relative;
    background: #fff;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
  }
</style>
