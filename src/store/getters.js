export default {
  shopNum(state) {
    return state.shopCart.length;
  },
  shopCartList(state) {
    return state.shopCart;
  }
}
