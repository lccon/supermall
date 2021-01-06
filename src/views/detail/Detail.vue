<template>
  <div class="detail">
    <detail-nav-bar/>
    <detail-swiper :swiperItems="swiperItems"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from "./childComps/DetailSwiper"

  import {getDetail} from 'network/detail'

  export default {
    name: "detail",
    data() {
      return {
        iid: null,
        swiperItems: []
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper
    },
    created() {
      // 保存传过来的id
      this.iid = this.$route.params.iid;

      // 获取详情数据
      this.getDetail(this.iid);
    },
    methods: {
      getDetail(iid) {
        getDetail(iid).then((res) => {
          console.log(res);
          this.swiperItems = res.data.result.itemInfo.topImages;
        })
      }
    }
  }
</script>

<style scoped>

</style>

来感受下身体与灵魂的双重释放
一旁大爷：哎呦卧槽，这年轻人...，卧槽
