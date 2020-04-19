<template>
  <div id="detail" :style="{ height: detailHeight }">
    <detail-nav-bar @titleClick="titleClick" class="detail-nav" ref="detailNav" />
    <scroll class="scroll-content" ref="scroll" @scroll="cententScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad" />
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend">
        <div slot="title">相关推荐</div>
      </goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail";
  import { debounce } from "common/utils";
  import { itemListenerMixin, backTopMixin } from "common/mixin";

  import { mapActions } from "vuex";

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,

      Scroll,
      GoodsList
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        detailHeight: window.innerHeight + "px"
      }
    },
    created() {
      // 保存传入的iid
      this.iid = this.$route.params.iid;

      // 根据iid请求详细数据
      getDetail(this.iid).then(res => {
        const data = res.result;

        this.topImages = data.itemInfo.topImages;

        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        // 获取店铺信息
        this.shop = new Shop(data.shopInfo);

        // 获取商品详情数据
        this.detailInfo = data.detailInfo;

        // 获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        // 获取一条评论信息
        if (data.rate.cRate) {
          this.commentInfo = data.rate.list[0];
        }

        /* 处理详情页导航跳转
          this.$nextTick(() => {
            Bug --> 虽然dom改变触发nextTick钩子, 但图片不一定加载完, 导致offsetTop是错误的值 <--
            解决方案:
              一、图片必须加载完毕
              二、防抖
            this.themeTopYs = [];
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          })
        */

        /**
         * 通过防抖获得getThemeTopY函数, 等待图片加载完之后再调用
         */
        this.getThemeTopY = debounce(() => {
          this.$nextTick(() => {
            this.themeTopYs = [];
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          })
        }, 100);
      });

      // 请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list;
      })
    },
    mounted() {
      // 解决移动端工具栏显示/隐藏时高度bug
      window.addEventListener("resize", this.getDetailHeight);
    },
    destroyed() {
      // 取消该路由的goodsListItemImageLoad事件监听
      this.$bus.$off("itemImageLoad", this.itemImageListener);
    },
    methods: {
      ...mapActions([
        "addCart"
      ]),

      /**
       * 刷新scroll高度
       */
      detailImageLoad() {
        this.refresh();
        this.getThemeTopY();
      },

      /**
       * 监听标题点击, 跳转到对应的位置
       */
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
      },
      /**
       * 标题跟随滚动的位置变化
       * 是否显示回到顶部
       */
      cententScroll(position) {
        const positionY = -position.y;
        let length = this.themeTopYs.length;
        for (let i = 0; i < length; ++i) {
          if (this.currentIndex !== i) {
            if ((i === length - 1 || positionY < this.themeTopYs[i + 1]) && positionY >= this.themeTopYs[i]) {
              this.currentIndex = i;
              this.$refs.detailNav.currentIndex = this.currentIndex;
            }
          }
        }

        // 是否显示回到顶部
        this.listenerShowBackTop(positionY);
      },

      /**
       * 添加到购物车
       */
      addToCart() {
        // 获取购物需要展示的商品信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // 添加到购物车
        this.addCart(product).then(res => {
          this.$toast.show(res);
        });
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
      getDetailHeight() {
        this.detailHeight = window.innerHeight + "px";
      },
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background: #fff;
  }

  .scroll-content {
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
