import {
  ADD_COUNTER,
  SUB_COUNTER,
  CHANGE_COUNTER,
  ADD_TO_CART,
  FROM_CART_DEL,
  CLEAR_CART
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
  },
  delCart({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      let oldProductIndex = state.cartList.findIndex(item => item.iid === payload.iid);

      if (oldProductIndex !== -1) {
        commit(FROM_CART_DEL, oldProductIndex);
        resolve("商品已从购物车中删除");
      }
    })
  },
  addCount({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      if (payload.count < 200) {
        commit(ADD_COUNTER, payload);
        resolve("商品数量+1");
      } else {
        reject("最多只能买200件哦!");
      }
    })
  },
  subCount({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      if (payload.count > 1) {
        commit(SUB_COUNTER, payload);
        resolve("商品数量-1");
      } else {
        reject("最少只能买一件哦!");
      }
    })
  },
  changeCount({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      let reg = /\D/g;
      let value = payload.value;
      if (value.search(reg) === -1) {
        if (value > 200) {
          commit(CHANGE_COUNTER, {
            "cartList": payload.cartList,
            "value": 200
          });
          reject("最多只能买200件哦!");
        } else {
          commit(CHANGE_COUNTER, payload);
          resolve("修改成功!");
        }
      } else {
        reject("输入的金额不对哦!");
      }
    })
  },
  clearCart({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      if (!payload) {
        if (!state.cartList.length) {
          reject("购物车为空，快去添加商品吧!");
        } else {
          reject("您还没有选择商品哦!");
        }
      } else {
        commit(CLEAR_CART);
        resolve("购买成功!");
      }
    })
  }
}
