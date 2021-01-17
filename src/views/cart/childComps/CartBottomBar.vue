<template>
    <div class="bottom-bar">
      <div class="check-content" @click="checkClick">
        <check-button class="check-button" :is-checked="isSelectAll"/>
        <span>全选</span>
      </div>

      <div class="price">
        合计：{{totalPrice}}
      </div>

      <div class="calculation" @click="calculationClick">
        去计算({{checkLength}})
      </div>

      <!--<toast :toast-msg="toastMsg" :is-show="isShow"/>-->
    </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton"
  import {mapGetters} from "vuex"

  /*import Toast from "components/common/toast/Toast"*/

  export default {
    name: "cart-bottom-bar",
    components: {
      CheckButton,
      /*Toast*/
    },
    data() {
      return {
        /*toastMsg: '',
        isShow: false*/
      }
    },
    computed: {
      ...mapGetters(["shopCartList"]),

      totalPrice() {
        return this.shopCartList.filter(item => {
          return item.isChecked;
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.shopCartList.filter(item => {
          return item.isChecked;
        }).length
      },
      isSelectAll() {
        if(this.shopCartList == null || this.shopCartList.length <= 0) {
          return false;
        }
        return !this.shopCartList.filter(item => !item.isChecked).length
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {
          this.shopCartList.map(item => {
            return item.isChecked = false;
          })
        } else {
          this.shopCartList.map(item => {
            return item.isChecked = true;
          })
        }
      },
      calculationClick() {
        if(!this.isSelectAll){
          this.$toast.show("请选择购买的商品", 3000);
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    line-height: 40px;
    display: flex;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 20px;
    flex: 1;
  }
  .calculation{
    width: 100px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>
