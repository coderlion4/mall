import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop";
import { BACK_POSITION } from "common/const";

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null,
      refresh: null
    }
  },
  mounted() {
    /* 闭包 */
    this.refresh = debounce(this.$refs.scroll.refresh);
    // 事件总线, 监听goodsListItem中的图片加载完成
    this.itemImageListener = () => {
      this.refresh();
    }
    this.$bus.$on("itemImageLoad", this.itemImageListener);
  },
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenerShowBackTop(positionY) {
      this.isShowBackTop = Math.abs(positionY) >= BACK_POSITION;
    }
  }
}