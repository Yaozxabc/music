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
  width: 200px;
  height: 250px;
  margin: 0 auto;
  text-align: center;
img{
  width: 100%;
  margin: 0 auto;
}
  .desc{
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: $fontColor;
  }

}
</style>
