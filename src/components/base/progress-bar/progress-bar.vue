<template>
<div class="progress-bar" ref="progressBar">
  <div class="bar-inner">
    <div class="progress" ref="progress"></div>
    <div class="progress-btn-warpper" >
      <div class="progress-btn" ref="progressBtn"></div>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import {prefixStyle} from 'res/scripts/dom.js'
  const transform=prefixStyle('transform')
  const progressBtnWidth=30;//按钮宽度
    export default{
      props:{
        precent:{
          type:Number,
          default:0
        }
      },
        data(){
            return {}
        },
    watch:{
      precent(newPrecent){
        if(newPrecent>=0){
          const barWidth=this.$refs.progressBar.clientWidth-progressBtnWidth;
          //当前进度条宽度等于总宽度减去按钮宽度
          const offsetWidth=barWidth*newPrecent;
          //当前进度等于总宽度乘以百分比
          this.$refs.progress.style.width=`${offsetWidth}px`
          this.$refs.progressBtn.style[transform]=`translate3d(${offsetWidth}px,0,0)`
        }
      }
    }
    }
</script>


<style scoped lang="scss">
  .progress-bar{height:50px;
    .bar-inner{
    position:relative;
    top:10px;
    height:8px;
    background:rgba(0,0,0,.4);
      .progress{
        position: absolute;
        width: 100%;
        height: 10px;
        background: $iconColor;
      }
      .progress-btn-warpper{
      position:absolute;
      left:-15px;
      top:5px;
      width:30px;
      height:30px;
        .progress-btn{
          position: relative;
          top:-15px;
          left: 0px;
          box-sizing: border-box;
          width:30px;
          height: 30px;
          border: 3px solid $iconColor;
          border-radius: 50%;
          background: #13ce66;
        }
      }
    }
  }

</style>
