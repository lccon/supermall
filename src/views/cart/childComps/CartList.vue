<template>
    <div class="cart-list">
      <scroll class="content" ref="scroll">
        <div v-for="(item, index) in shopCartList" :key="index">
          <cart-list-item :product="item"/>
        </div>
      </scroll>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from "./CartListItem"

  export default {
    name: "cart-list",
    computed: {
      ...mapGetters(['shopCartList'])
    },
    components:{
      Scroll,
      CartListItem
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px)
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
