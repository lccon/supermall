import {debounce} from "./utils";

// 抽取公共的进行混入合并
export const itemListenerMixin = {
  data() {
    return {
      itemListener: null
    }
  },
  mounted() {
    // 防抖动代码，图片加载单位时间内一起执行
    const refresh = debounce(this.$refs.scroll.refresh, 30);

    this.$bus.$on("itemImgLoad", () => {
      this.itemListener = refresh();
    })
    //console.log("混入");
  }
}
