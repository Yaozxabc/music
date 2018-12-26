<template>
<div class="no_result">
  <div class="no_result_img">
    <img src="./no-result.png" :alt="title" />
    <div class="no_result_txt">
      <p >{{title}}</p>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import NoResult from 'com/base/no-result/no-result'
    export default{
      props:{
        title:{
          type:String,
          default:"没有符合条件的结果"
        }
      },
        data(){
            return {}
        }
    }
</script>


<style scoped lang="scss">
.no_result{
  position: fixed;
  top:280px;
  bottom: 80px;
left:0;
right:0;
  .no_result_img{
  position:absolute;
  left:50%;
  top:50%;
  width:300px;
  height:300px;
  transform:translate(-50%,-50%);
    img{
      width: 100%;
      height: 100%;
      filter: Alpha(opacity=60);
      opacity: 0.6;
    }
  }
  .no_result_txt{
    margin: 0 auto;
    width:100%;
    p{
      color: #fff0e3;
      text-align: center;
      font-size: 24px;
    }
  }
}
</style>
