<template>
  <div class="detail">
    <detail-nav-bar/>
    <scroll class="content" ref="scroll">
      <detail-swiper :swiperItems="swiperItems"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="goodsParam"/>
      <!--<detail-comment-info :commentInfo="commentInfo"/>-->
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"

  import Scroll from "components/common/scroll/Scroll"

  import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'

  export default {
    name: "detail",
    data() {
      return {
        iid: null,
        swiperItems: [],
        goods: {},
        shop: {},
        detailInfo: {},
        goodsParam: {},
        commentInfo: {}
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo
    },
    created() {
      // 保存传过来的id
      console.log("route" + this.$route);
      this.iid = this.$route.query.iid;

      console.log(this.iid);

      // 获取详情数据
      this.getDetail(this.iid);
    },
    methods: {
      getDetail(iid) {
        getDetail(iid).then((res) => {
          console.log(res);
          const data = res.data.result
          this.swiperItems = data.itemInfo.topImages;
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
          this.shop = new Shop(data.shopInfo);
          this.detailInfo = data.detailInfo;
          this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule);
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
          }
        })
      },
      imageLoad() {
        //console.log("加载完成");
        this.$refs.scroll.refresh();
      }
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>

来感受下身体与灵魂的双重释放
一旁大爷：哎呦卧槽，这年轻人...，卧槽
