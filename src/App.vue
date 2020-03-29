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
    }
  }
</script>

<style>
  @import url("assets/css/base.css");
</style>