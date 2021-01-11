<template>
  <div id="home">
    <nar-bar class="home-nav">
      <h2 slot="left"></h2>
      <h2 slot="center">购物街</h2>
      <h2 slot="right"></h2>
    </nar-bar>
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probeType="3"
            @scroll="scroll"
            :pullUpLoad="true"
            @pullingUp="pullingUp">
      <home-swiper :banners="banners" @imgLoad="imgLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <!--<tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"/>-->
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"/>
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
  import {itemListenerMixin} from "common/mixin"

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
    mixins: [itemListenerMixin],
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
        tabOffsetTop: 0,
        isTabFixed: false,
        scrollY: 0,
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

      // 获取tabControl的吸顶高度
      // 组件没有offsetTop属性，从$el得到普通标签在获取offsetTop属性
      /*this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;*/

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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backTopClick() {
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      scroll(position) {
        this.isShowBackTop = -position.y > 1000;
        // 是否具有吸顶效果
        this.isTabFixed = -position.y >= this.tabOffsetTop
      },
      pullingUp() {
        this.getHomeGoods(this.currentType);
      },
      imgLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.scrollY, 0);
      // 注意刷新
      this.$refs.scroll.refresh();
    },
    deactivated() {
      this.scrollY = this.$refs.scroll.getScrollY();

      // 离开home页面时取消监听
      this.$bus.$off("itemImgLoad", this.itemListener);
    },
    /*destroyed() {
      console.log("销毁");
    }*/
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

    /*原生滚动，导航不跟随浏览器一起滚动设置 */
   /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
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

  /* 吸顶效果 */
  .isTabFixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
