<template>
  <div id="app">
    <m-header></m-header>
    <nav-tab></nav-tab>
    <keep-alive>
    <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import MHeader from 'com/m-header/m-header'
  import NavTab from 'com/nav/nav'
export default {
  name: 'App',
  components:{
    MHeader,NavTab
  }
}
</script>

<style lang="scss">
#app {
  background: $bgColor;
}
</style>
