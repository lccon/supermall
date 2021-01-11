<template>
  <div>
    <nar-bar>
      <div slot="left" class="left-nav-bar" @click="backClick">
        <img src="~assets/img/common/back.svg"/>
      </div>
      <div slot="center" class="center-nav-bar">
        <div v-for="(item, index) in titles"
             class="center-item"
             :class="{active : index === currentIndex}"
             @click="itemClick(index)">{{item}}</div>
      </div>
    </nar-bar>
  </div>
</template>

<script>
  import NarBar from "components/common/navbar/NarBar"

  export default {
    name: "detail-nav-bar",
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    components: {
      NarBar
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit("locationClick", index);
      },
      backClick() {
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .center-nav-bar {
    display: flex;
    font-size: 14px;
  }

  .center-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .left-nav-bar img{
    margin-top: 12px
  }
</style>
