import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";

export default {
  /**
   * @param {state, commit} 为context的解构
   */
  addCart({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = state.cartList.find(item => item.iid === payload.iid);

      if (oldProduct) {
        commit(ADD_COUNTER, oldProduct);
        resolve("当前商品已被添加到购物车+1");
      } else {
        payload.count = 1;
        payload.checked = true;
        commit(ADD_TO_CART, payload);
        resolve("已添加至购物车");
      }
    });
  }
}
