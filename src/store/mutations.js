import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.unshift(payload);
  }
}
