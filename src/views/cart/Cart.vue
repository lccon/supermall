<template>
    <div class="cart">
      <nar-bar class="nav-bar">
        <div slot="center">购物车({{shopCartNum}})</div>
      </nar-bar>

      <cart-list />
    </div>
</template>

<script>
  import NarBar from "components/common/navbar/NarBar"
  import CartList from "./childComps/CartList"

  import {mapGetters} from "vuex"

  export default {
    name: "cart",
    components: {
      NarBar,
      CartList
    },
    computed: {
      //第一种方式 数组方式
      // ...mapGetters(['shopNum'])

      // 第二种方式 对象方式
      ...mapGetters({
        'shopCartNum': 'shopNum'
      })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
