<template>
  <div id="home">
    <nar-bar class="home-nav">
      <h2 slot="left"></h2>
      <h2 slot="center">购物街</h2>
      <h2 slot="right"></h2>
    </nar-bar>
    <scroll class="content"
            ref="scroll"
            :probeType="3"
            @scroll="scroll"
            :pullUpLoad="true"
            @pullingUp="pullingUp">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <!--<tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"/>-->
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl"/>
      <good-list :goods="goodList"/>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NarBar from "components/common/navbar/NarBar"
  import HomeSwiper from "views/home/childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView"
  import FeatureView from "./childComps/FeatureView"
  import TabControl from "components/content/tabControl/TabControl"
  import GoodList from "components/content/goods/GoodsList"
  import Scroll from "components/common/scroll/Scroll"
  import BackTop from "components/content/backtop/BackTop"

  import {getHomeMultiData, getHomeGoods} from "network/home.js"
  import {debounce} from "common/utils"

  export default {
    name: "home",
    components: {
      NarBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page:0, list:[]},
          'new': {page:0, list:[]},
          'sell': {page:0, list:[]}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0
      }
    },
    computed: {
      goodList(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      this.getHomeMultiData();
      // 商品列表
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      // 防抖动代码，图片加载单位时间内一起执行
      const refresh = debounce(this.$refs.scroll.refresh, 30);

      this.$bus.$on("itemImgLoad", () => {
        refresh();
      })

      // 获取tabControl的吸顶高度
      // 组件没有offsetTop属性，从$el得到普通标签在获取offsetTop属性
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;

      console.log(this.$refs.tabControl.$el.offsetTop)
      console.log(this.$refs.tabControl.offsetTop)
    },
    methods: {
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page += 1;

          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp();
        })
      },
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
      },
      backTopClick() {
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      scroll(position) {
        this.isShowBackTop = -position.y > 1000;
      },
      pullingUp() {
        this.getHomeGoods(this.currentType);
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  /*使用better-scorll代替自定义吸顶效果*/
  /*.tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }*/

  /*第一种方式设置滚动区域的高度*/
  /*.content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }*/

  /*第二种方式设置滚动区域的高度*/
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
