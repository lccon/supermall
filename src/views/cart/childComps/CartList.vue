<template>
    <div class="cart-list">
      <scroll class="content">
        <ul>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
          <li>内容</li>
        </ul>
      </scroll>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Scroll from 'components/common/scroll/Scroll'

  export default {
    name: "cart-list",
    computed: {
      ...mapGetters(['shopCartList'])
    },
    components:{
      Scroll
    }
  }
</script>

<style scoped>
  .cart-list {

  }

  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
