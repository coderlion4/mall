<template>
  <div id="shop-item" v-if="isShowItem">
    <div class="item-selector">
      <check-button @click.native="checkedChange" :is-checked="itemInfo.checked" />
    </div>
    <div class="item-img">
      <img v-lazy="itemInfo.image" alt="">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.price}}</div>
        <div class="item-count right">
          <span @click="decrement" :class="{isDisabled: isDisabledDecrement}">-</span>
          <input type="text" pattern="[0-9]*" @blur="inputBlur($event.target)" :value="itemInfo.count">
          <span @click="increment" :class="{isDisabled: isDisabledIncrement}">+</span>
        </div>
      </div>
    </div>
    <i class="icon-delete" @click="deleteClick"></i>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton.vue";

  import { mapActions } from "vuex";

  export default {
    name: 'CartListItem',
    props: {
      itemInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        isShowItem: true
      }
    },
    components: {
      CheckButton
    },
    computed: {
      /**
       * 控制单品最小数量
       */
      isDisabledDecrement() {
        return this.itemInfo.count <= 1;
      },

      /**
       * 控制单品最大数量
       */
      isDisabledIncrement() {
        return this.itemInfo.count >= 200;
      }
    },
    methods: {
      ...mapActions([
        "addCart",
        "delCart",
        "addCount",
        "subCount",
        "changeCount"
      ]),

      checkedChange() {
        this.itemInfo.checked = !this.itemInfo.checked;
      },

      decrement() {
        this.subCount(this.itemInfo).then(res => { }, err => {
          this.$toast.show(err);
        });
      },

      increment() {
        this.addCount(this.itemInfo).then(res => { }, err => {
          this.$toast.show(err);
        })
      },

      inputBlur(inputDom) {
        if (this.itemInfo.count == inputDom.value) {
          return;
        }
        this.changeCount({
          cartList: this.itemInfo,
          value: inputDom.value
        }).then(res => { }, err => {
          this.$toast.show(err);
        });
        inputDom.value = this.itemInfo.count;
      },

      deleteClick() {
        this.delCart(this.itemInfo).then(res => {
          this.$toast.show(res);
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #shop-item {
    position: relative;
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .icon-delete {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 16px;
    height: 16px;
    background: url("~assets/img/common/delete.png") no-repeat 0 0 / 100%;
  }

  .item-title,
  .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }

  .item-count span {
    font-size: 16px;
  }

  .item-count input {
    width: 30px;
    height: 15px;
    font-size: 12px;
    border: none;
    text-align: center;
    background: #eee;
    border-radius: 4px;
    margin: 0 10px;
  }

  .isDisabled {
    color: #eee;
  }

  .item-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
