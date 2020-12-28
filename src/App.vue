<template>
  <div id="app">
    <router-view/>
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
