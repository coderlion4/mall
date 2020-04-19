<template>
  <div id="home" :style="{ height: homeHeight }">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control @tabClick="tabClick" class="tab-control" :titles="['流行', '新款', '精选']" ref="TopTabControl"
      v-show="isTabFixed" />
    <scroll class="scroll-content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll"
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
        homeHeight: window.innerHeight + "px"
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    created() {
      // 请求多个数据(轮播图数据、推荐数据)
      this.getHomeMultidata();

      // 请求商品数据
      this.getHomeGoods("pop");
      this.getHomeGoods("new");
      this.getHomeGoods("sell");
    },
    mounted() {
      // 解决移动端工具栏显示/隐藏时高度bug
      window.addEventListener("resize", this.getHomeHeight);
    },
    activated() {
      // 回到路由时回到上次的位置
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh();
    },
    deactivated() {
      // 离开路由时保存scroll的y值
      this.saveY = this.$refs.scroll.getScrollY();

      // 取消该路由的goodsListItemImageLoad事件监听
      this.$bus.$off("itemImageLoad", this.itemImageListener);
    },
    methods: {
      /**** 事件监听相关 ****/

      /**
       * 展示tabControl数据的类型
       */
      tabClick(index) {
        switch (index) {
          case 0: this.currentType = "pop"; break;
          case 1: this.currentType = "new"; break;
          case 2: this.currentType = "sell"; break;
        }
        // 解决tabControl点击同步
        this.$refs.TopTabControl.currentIndex = index;
        this.$refs.tabControl.currentIndex = index;
      },

      /**
       * 监听better-scroll的滚动事件
       * 1. 显示/隐藏backTop
       * 2. 是否吸顶tabControl
       */
      contentScroll(position) {
        // 判断BackTop是否显示
        this.listenerShowBackTop(position.y);

        // 决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = Math.abs(position.y) >= this.tabOffsetTop;
      },

      /**
       * 上拉加载更多
       */
      loadMore() {
        this.getHomeGoods(this.currentType);
      },

      /**
       * 监听homeSwiperImageLoad中图片加载完成
       */
      swiperImageLoad() {
        // 获取tabControl的offsetTop
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      },

      /**
       * 解决移动端工具栏显示/隐藏时高度bug
       * 
       * Bug原因: 
       * 设置home高度不能直接使用100%, 因为100%是相对与父元素, 而home的父元素的高度是依赖与home, 所以百分比无效
       * 设置home高度不能使用100vh, 因为vh的高度计算是包含移动端的地址栏与工具栏的, 而当地址栏和工具栏显示\隐藏时会产生高度bug
       * 
       * 解决方案:
       * 使用window.innerHeight动态设置高度: 当窗口大小改变时重新设置高度为window.innerHeight, 因为window.innerHeight的高度不包括地址栏和导航栏
       */
      getHomeHeight() {
        this.homeHeight = window.innerHeight + "px";
      },



      /**** 网络请求相关 ****/

      /**
       * 获取轮播图和推荐数据
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        }).catch(err => {
          console.log(err);
        });
      },

      /**
       * 获取商品数据
       */
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page = page;

          // 获取数据后刷新pullingUp
          this.$refs.scroll && this.$refs.scroll.finishPullUp();
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #home {
    position: relative;
  }

  .home-nav {
    color: #fff;
    font-weight: bold;
    background-color: var(--color-tint);
  }

  .tab-control {
    position: relative;
    background: #fff;
    z-index: 9;
  }

  .scroll-content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
