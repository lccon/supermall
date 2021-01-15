<template>
  <div class="check-button" :class="{isChecked: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt=""/>
  </div>
</template>

<script>
  export default {
    name: "check-button",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>

  /*.icon-selector{
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }

  .check-button{
    background-color: red;
    border-radius: 50%;
    border: 0 solid #aaa;
    margin-left: 10px;
    margin-right: 10px;
  }*/

  .check-button{
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .isChecked {
    background-color: red;
    border-color: red;
  }
</style>
