<template>
    <div class="cart-list">
      {{shopCartList}}
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "cart-list",
    computed: {
      ...mapGetters(['shopCartList'])
    }

  }
</script>

<style scoped>

</style>
