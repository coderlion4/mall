<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
    <icon />
    <svg-icon />
  </div>
</template>

<script>
  import MainTabBar from "components/content/maintabbar/MainTabBar";
  import Icon from "components/content/icon/Icon";
  import SvgIcon from "components/content/icon/SvgIcon";

  export default {
    name: 'App',
    components: {
      MainTabBar,

      Icon,
      SvgIcon
    },
    created() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      if (!(/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent))) {
        //跳转移动端页面
        alert('移动端效果更加噢!!!')
      }
    }
  }
</script>

<style>
  @import url("~assets/css/base.css");
</style>
