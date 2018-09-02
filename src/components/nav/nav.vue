<template>
<div class="nav">
  <ul>
    <li><router-link tag="a" :to="{path:'/recommend'}">推荐</router-link></li>
    <li><router-link tag="a" :to="{path:'/singer'}">歌手</router-link></li>
    <li><router-link tag="a" :to="{path:'/rank'}">排行</router-link></li>
    <li><router-link tag="a" :to="{path:'/search'}">搜索</router-link></li>
  </ul>
</div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {}
        }
    }
</script>


<style scoped lang="scss">
  .nav{
    overflow: hidden;
    padding: 20px 0;
  }
.nav ul{
  display: flex;
  li{
    flex: 1;
  height:60px;
    a{
      display: block;
      width: 100%;
      height: 100%;
      line-height: 60px;
      text-align: center;
      color: $fontColor;
      font-size: 28px;

    }
    .router-link-active{
      color: $colorLink;
      border-bottom: 1px solid $colorLink;
     }
  }
}


</style>
