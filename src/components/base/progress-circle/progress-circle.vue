<template>
<div class="progresss-circle">
  <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <!--width,height为显示宽高 viewBox为视窗的大小，上面的意思为从0,0坐标拉到100的坐标-->
    <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"></circle>
    <!--r为半径，cx，cy为坐标轴,fill为填充-->
    <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent"
            :stroke-dasharray="dashArray"
            :stroke-dashoffset="dashoffset"
      ></circle>
    <!--此处为后面的光圈
    stroke-dasharray为控制用来描边的点划线的图案范式,此处为描边距离。
    stroke-dashoffset为笔画偏移，设置为0时，则周长铺满，设置为314的时候则周长为0
    -->
  </svg>
  <slot></slot>
</div>
</template>

<script type="text/ecmascript-6">
    export default{
      props:{
        radius:{
          type:Number,
          default:100
        },
        precent:{
          type:Number,
          default:100
        }
      },
        data(){
            return {
              dashArray:Math.PI *100 //圆圈周长
            }
        },
    computed:{
      dashoffset(){
        return (1-this.precent)*this.dashArray
      }//用于计算剩下的偏移量
    }
    }
</script>


<style scoped lang="scss">
  .progresss-circle{
    display: inline-block;
  position:relative;
  circle{
    stroke-width: 10px;/*笔画宽度*/
    transform-origin: center;
  }
    .progress-background{
      transform: scale(0.9);
      stroke: $iconColor;/*笔画颜色*/
    }
    .progress-bar{
      transform: scale(0.9) rotate(-90deg);
      stroke: #fff;/*笔画颜色*/
    }
  }

</style>
