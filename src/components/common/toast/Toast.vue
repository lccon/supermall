<template>
  <div class="toast-content" v-show="isShow">
    <div>{{toastMsg}}</div>
  </div>
</template>

<script>
  export default {
    name: "toast",
    /*props: {
      toastMsg: {
        type: String,
        default: ''
      },
      isShow: {
        type: Boolean,
        default: false
      }
    },*/
    data() {
      return {
        isShow: false,
        toastMsg: ''
      }
    },
    methods: {
      show(message="默认文字", duration=2000) {
        this.isShow = true;
        this.toastMsg = message;

        let timer = null;
        timer = setTimeout(() => {
          if(timer) clearTimeout(timer);

          this.isShow = false;
          this.toastMsg = '';
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;

    padding: 8px 10px;
    background-color: rgba(0, 0, 0, .75);
    color: #fff;
  }
</style>
