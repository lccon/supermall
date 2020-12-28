<template>
  <div id="home">
    <nar-bar class="home-nav">
      <h2 slot="left"></h2>
      <h2 slot="center">购物街</h2>
      <h2 slot="right"></h2>
    </nar-bar>

    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']"/>

    <ul>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
      <li>标签1</li>
    </ul>
  </div>
</template>

<script>
  import NarBar from "components/common/navbar/NarBar"
  import {getHomeMultiData} from "network/home.js"
  import HomeSwiper from "views/home/childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView"
  import FeatureView from "./childComps/FeatureView"
  import TabControl from "components/content/tabControl/TabControl"

  export default {
    name: "home",
    components: {
      NarBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {
      getHomeMultiData().then(res=> {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
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

  .tab-control {
    position: sticky;
    top: 44px;
  }
</style>
