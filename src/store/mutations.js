import {
  ADD_COUNTER,
  SUB_COUNTER,
  CHANGE_COUNTER,
  ADD_TO_CART,
  FROM_CART_DEL,
} from "./mutation-types";

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [SUB_COUNTER](state, payload) {
    payload.count--;
  },
  [CHANGE_COUNTER](state, payload) {
    payload.cartList.count = payload.value;
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.unshift(payload);
  },
  [FROM_CART_DEL](state, payload) {
    // payload is Array the index
    state.cartList.splice(payload, 1);
  }
}
