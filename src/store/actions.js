import {ADD_COUNTER, ADD_TO_CART} from "./mutation-types"

export default {
  addToCart(context, payload) {
    let checkResult = false;
    let currentIndex = null;
    let shopCarts = context.state.shopCart;
    for(let i = 0; i < shopCarts.length; i++) {
      if(shopCarts[i].iid === payload.iid) {
        currentIndex = i;
        checkResult = true;
        break;
      }
    }

    if(checkResult && currentIndex != null) {
      let payload = context.state.shopCart[currentIndex];
      context.commit(ADD_COUNTER, payload);
    } else {
      payload.count = 1;
      context.commit(ADD_TO_CART, payload);
    }
  }
}
