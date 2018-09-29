<template>
  <div id="app">
    <m-header></m-header>
    <nav-tab></nav-tab>
    <keep-alive>
    <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import MHeader from 'com/m-header/m-header'
  import NavTab from 'com/nav/nav'
  import Player from 'com/player/player'
export default {
  name: 'App',
  components:{
    MHeader,NavTab,Player
  }
}
</script>

<style lang="scss">
#app {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: $bgColor;
}
</style>
