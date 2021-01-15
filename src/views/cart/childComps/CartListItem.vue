<template>
  <div>
    <div class="shop_item">
      <div class="item_selector">
        <check-button :isChecked="product.isChecked" @click.native="checkClick"/>
      </div>
      <div class="item_img" >
        <img :src="product.image" alt="" />
      </div>
      <div class="item_info" >
        <p class="item_title">{{ product.title }}</p>
        <p class="item_desc">{{ product.desc }}</p>
        <div class="info_bottom">
          <span class="item_price">￥{{ product.price }}</span>
          <span class="item_count">x{{ product.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import CheckButton from "components/content/checkButton/CheckButton"

  export default {
    name: "cart-list-item",
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      CheckButton
    },
    methods: {
      checkClick() {
        this.product.isChecked = !this.product.isChecked;
      }
    }
  }
</script>

<style scoped>
  /*.cart_list_item {
    width: 100%;
    height: 5.5rem;
    border-bottom: 0.04rem solid rgba(128, 128, 128, 0.4);
    display: flex;
    padding: 0.4rem;
    padding-left: 0rem;
  }
  .item_selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item_img {
    width: 3.5rem;
    height: 100%;
  }
  .item_img img {
    width: 100%;
    height: 100%;
    border-radius: 0.4rem;
  }
  .item_info {
    position: relative;
    width: calc(100% - 3.5rem - 1.2rem - 0.4rem);
    margin-left: 0.4rem;
  }
  .item_info p {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .item_title {
    font-size: 0.75rem;
    padding-bottom: 0.5rem;
  }
  .item_desc {
    font-size: 0.6rem;
    color: gray;
  }
  .item_price {
    position: absolute;
    left: 0;
    bottom: 0.4rem;
    font-size: 0.75rem;
    color: orangered;
  }
  .item_count {
    position: absolute;
    right: 0.4rem;
    bottom: 0.4rem;
    font-size: 0.75rem;
  }*/

  .shop_item {
    width: 100%;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .item_selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item_title, .item_desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item_img {
    padding: 5px;
  }
  .item_img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .item_info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position:relative;
    overflow: hidden;
  }
  .item_info .item_desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .info_bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
  .info_bottom .item_price {
    color: orangered;
  }
</style>
