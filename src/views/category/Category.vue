<template>
  <div id="category" :style="{ height: categoryHeight }">
    <nav-bar class="nav-bar">
      <span slot="center">商品分类</span>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem" />
      <scroll id="tab-content" ref="scroll">
        <tab-content-category :subcategories="showSubcategory" />
        <tab-control :titles="['综合', '新品', '销量']" @itemClick="tabClick" />
        <tab-content-detail :category-detail="showCategoryDetail" />
      </scroll>
    </div>
  </div>
</template>

<script>
  import TabMenu from "./childComps/TabMenu";
  import TabContentCategory from "./childComps/TabContentCategory";
  import TabContentDetail from "./childComps/TabContentDetail";

  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";
  import TabControl from "components/content/tabControl/TabControl";

  import { getCategory, getSubcategory, getCategoryDetail } from "network/category";
  import { POP, SELL, NEW } from "common/const";
  import { tabControlMixin, itemListenerMixin } from "common/mixin";

  export default {
    name: "Category",
    components: {
      TabMenu,
      TabContentCategory,
      TabContentDetail,

      NavBar,
      Scroll,
      TabControl
    },
    mixins: [tabControlMixin, itemListenerMixin],
    data() {
      return {
        categories: [],
        categoryData: {},
        currentIndex: -1,
        categoryHeight: window.innerHeight + "px"
      }
    },
    mounted() {
      this._getCategory();

      // 解决移动端工具栏显示/隐藏时高度bug
      window.addEventListener("resize", this.getCategoryHeight);
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories;
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) return [];
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType];
      }
    },
    methods: {

      /**
       * 获取数据
       */
      _getCategory() {
        getCategory().then(res => {
          // 1.获取分类数据
          this.categories = res.data.category.list;

          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; ++i) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0);
        })
      },

      /**
       * 请求分类数据
       */
      _getSubcategories(index) {
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          // 直接通过对象key、数组下标修改不会进行数据绑定
          this.categoryData[index].subcategories = res.data;
          // 重新赋值即可进行数据绑定
          this.categoryDate = { ...this.categoryData };
          this._getCategoryDetail(POP);
          this._getCategoryDetail(SELL);
          this._getCategoryDetail(NEW);
        })
      },

      /**
       * 根据不同的类型获取数据
       */
      _getCategoryDetail(type) {
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        getCategoryDetail(miniWallkey, type).then(res => {
          this.categoryData[this.currentIndex].categoryDetail[type] = res;
          this.categoryData = { ...this.categoryData };
        })
      },

      selectItem(index) {
        this._getSubcategories(index);
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
      getCategoryHeight() {
        this.categoryHeight = window.innerHeight + "px";
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
  }

  #tab-content {
    height: 100%;
    flex: 1;
    overflow: hidden;
  }
</style>
