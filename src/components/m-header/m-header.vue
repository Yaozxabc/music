<template>
<div class="m-header">
  <div class="header_logo"></div>
  <h1 class="text">Vue Music APP</h1>
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
.m-header{
  position: relative;
  height: 40px;
  text-align: center;

}
  .header_logo{
    position: absolute;
    left: calc(50% - 160px);
    top: 0;
    width: 40px;
    height: 40px;
    background-image: url("./logo.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .m-header .text{
    font-family: sans-serif;
    color: $fontColor;
    font-size: 30px;
  }
</style>
