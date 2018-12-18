<template>
<div class="loader">
  <img src="./loading.gif" alt=""/>
  <p class="desc">{{title}}</p>
</div>
</template>

<script type="text/ecmascript-6">
    export default{
      props:{
        title:{
          type:String,
          default:'正在加载中。。。'
        }
      },
        data(){
            return {}
        }
    }
</script>


<style scoped lang="scss">
.loader{
  margin: 0 auto;
  text-align: center;
img{
  width: 60px;
  height: 60px;
  margin: 0 auto;
}
  .desc{
    margin: 10px auto;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: $fontColor;
  }
}
</style>
