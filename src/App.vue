<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view/>
    </keep-alive>
    <main-tar-bar/>
  </div>
</template>

<script>
  import MainTarBar from 'components/content/maintarbar/MainTarBar'

  export default {
    name: "app",
    data() {
      return {};
    },
    components: {
      MainTarBar
    },
    methods: {}
  };
</script>
<style>
@import "assets/css/base.css";


</style>
