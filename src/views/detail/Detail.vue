<template>
  <div class="detail">
    <detail-nav-bar @locationClick="locationClick" ref="topNavBar"/>
    <scroll ref="scroll"
            class="content"
            :probeType="3"
            @scroll="scrollPosition">
      <detail-swiper :swiperItems="swiperItems"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="paramsInfo" :paramInfo="goodsParam"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommendInfo" :goods="recommend"/>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addToCart"/>
    <!--<toast :toast-msg="toastMsg" :is-show="isShow"/>-->
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
  import GoodsList from "components/content/goods/GoodsList"
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from "components/common/scroll/Scroll"

  import {getDetail, getRecommends, Goods, Shop, GoodsParam} from 'network/detail'
  import {debounce} from 'common/utils'
  import {itemListenerMixin, backTopMixin} from "common/mixin"

  import {mapActions} from "vuex"

  /*import Toast from "components/common/toast/Toast"*/

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
        commentInfo: {},
        recommend: [],
        locationScrollY: [],
        locationDebounceFun: null,
        currentIndex: null,
        /*toastMsg: '',
        isShow: false*/
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      /*Toast*/
    },
    created() {
      // 保存传过来的id
      this.iid = this.$route.query.iid;

      // 获取详情数据
      this.getDetail(this.iid);
      // 获取详情页最下边详情数据；
      this.getRecommends();

      this.locationDebounceFun = this.locationDebounce();
    },
    mounted() {
    },
    methods: {
      ...mapActions({
        'addCart': 'addToCart',
      }),
      getDetail(iid) {
        getDetail(iid).then((res) => {
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
      getRecommends() {
        getRecommends().then((res) => {
          this.recommend = res.data.data.list;
        })
      },
      imageLoad() {
        this.$refs.scroll.refresh();
        //this.itemListener;

        this.locationDebounceFun();
      },
      locationClick(index) {
        this.$refs.scroll.scrollTo(0, -this.locationScrollY[index], 100);
      },
      locationDebounce() {
        return debounce(()=> {
          this.locationScrollY = [];
          this.locationScrollY.push(0);
          this.locationScrollY.push(this.$refs.paramsInfo.$el.offsetTop);
          this.locationScrollY.push(this.$refs.comment.$el.offsetTop);
          this.locationScrollY.push(this.$refs.recommendInfo.$el.offsetTop);
          this.locationScrollY.push(Number.MAX_VALUE);

          //console.log(this.locationScrollY);
        }, 200);
      },
      scrollPosition(position) {
        /*for(let i in this.locationScrollY) {
          const y = i * 1;
          // const y = parseInt(i);
          if(this.currentIndex !== y &&
            (y < this.locationScrollY.length - 1 && this.locationScrollY[y] <= (-position.y) && this.locationScrollY[y+1] >= (-position.y)) ||
            (y >= this.locationScrollY.length - 1 && this.locationScrollY[y] <= (-position.y))) {
            this.currentIndex = y
            this.$refs.topNavBar.currentIndex = this.currentIndex ;
          }
        }*/
        for(let i=0; i<this.locationScrollY.length-1; i++) {
          if(this.currentIndex !== i && this.locationScrollY[i] <= (-position.y) && this.locationScrollY[i+1] >= (-position.y)) {
            this.currentIndex = i;
            this.$refs.topNavBar.currentIndex = this.currentIndex;
          }
        }

        //this.isShowBackTop = -position.y > 1000;
        // 混入实现，是否出现回到顶部图片
        this.backTopCheck(position);
      },
      addToCart() {
        const product = {};
        product.image = this.swiperItems[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        this.addCart(product).then(res => {
          /*this.isShow = true;
          this.toastMsg = res;

          setTimeout(() => {
            this.isShow = false;
            this.toastMsg = '';
          }, 5000)*/
          this.$toast.show(res, 3000);
          //this.$toast.show();
        })
      }
    },
    destroyed() {
      this.$bus.$off("itemImgLoad", this.itemListener);
    },
    /*updated() {
      this.locationScrollY = [];
      this.locationScrollY.push(0);
      this.locationScrollY.push(this.$refs.paramsInfo.$el.offsetTop);
      this.locationScrollY.push(this.$refs.comment.$el.offsetTop);
      this.locationScrollY.push(this.$refs.recommendInfo.$el.offsetTop);

      console.log(this.locationScrollY);
      11555.64
    }*/
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
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
