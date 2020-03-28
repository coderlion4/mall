<template>
  <div v-show="isShow" class="toast">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: "",
        isShow: false
      }
    },
    methods: {
      show(message, duration = 2000) {
        this.isShow = true;
        this.message = message;

        setTimeout(() => {
          this.isShow = false;
          this.message = "";
        }, duration);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, .7);
    padding: 8px 10px;
    color: #fff;
    text-align: center;
    border-radius: 8px;
    z-index: 9999;
  }
</style>