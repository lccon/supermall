<template>
    <div>
      <tar-bar>
        <tar-bar-item path="/home" itemColor="red">
          <img src="~assets/img/tarbar/home.png" slot="icon-name">
          <img src="~assets/img/tarbar/homefull.png" slot="icon-name-active">
          <div slot="icon-test">首页</div>
        </tar-bar-item>
        <tar-bar-item path="/category" itemColor="orange">
          <img src="~assets/img/tarbar/category.png" slot="icon-name"/>
          <img src="~assets/img/tarbar/categoryfull.png" slot="icon-name-active"/>
          <div slot="icon-test">分类</div>
        </tar-bar-item>
        <tar-bar-item path="/cart" itemColor="blue">
          <img src="~assets/img/tarbar/shopping.png" slot="icon-name"/>
          <img src="~assets/img/tarbar/shoppingfull.png" slot="icon-name-active"/>
          <div slot="icon-test">购物车</div>
        </tar-bar-item>
        <tar-bar-item path="/profile" itemColor="green">
          <img src="~assets/img/tarbar/profile.png" slot="icon-name"/>
          <img src="~assets/img/tarbar/profilefull.png" slot="icon-name-active"/>
          <div slot="icon-test">我的</div>
        </tar-bar-item>
      </tar-bar>
    </div>
</template>

<script>
  import TarBar from 'components/common/tarbar/TabBar'
  import TarBarItem from 'components/common/tarbar/TabBarItem'

  export default {
    name: "main-tarbar",
    components: {
      TarBar,
      TarBarItem
    },
  }
</script>

<style scoped>

</style>
