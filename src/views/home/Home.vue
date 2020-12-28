<template>
  <div>
    <nar-bar class="home-nav">
      <h2 slot="left"></h2>
      <h2 slot="center">购物街</h2>
      <h2 slot="right"></h2>
    </nar-bar>

    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
  import NarBar from "components/common/navbar/NarBar"
  import {getHomeMultiData} from "network/home.js"
  import HomeSwiper from "views/home/childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView"

  export default {
    name: "home",
    components: {
      NarBar,
      HomeSwiper,
      RecommendView
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
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
