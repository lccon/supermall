<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        // 除button外，要使普通标签(div, span)中的click可被点击，必须设置那个click: true
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      });

      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on("scroll", (position) => {
          this.$emit("scroll", position);
        })
      }

      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUp");
        })
      }
    },
    methods: {
      scrollTo(x, y, time) {
        // 回到顶部，x:x坐标，y:y坐标，time:回滚的时间
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      finishPullUp() {
        // 解决只上拉加载一次的问题，可上拉加载多次
        this.scroll && this.scroll.finishPullUp();
      },
      refresh() {
        // 刷新滚动区域的高度，解决图片加载慢影响高度
        this.scroll && this.scroll.refresh();
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0;
      }
    }
  }
</script>

<style scoped>

</style>
