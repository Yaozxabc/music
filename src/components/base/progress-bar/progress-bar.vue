<template>
<div class="progress-bar" ref="progressBar" @click="progressClick">
  <div class="bar-inner">
    <div class="progress" ref="progress"></div>
    <div class="progress-btn-warpper"
      @touchstart.prevent="progressTouchStart"
      @touchmove.prevent="progressTouchMove"
      @touchend="progressTouchEnd"
         ref="progressBtn"
      >
      <div class="progress-btn" ></div>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import {prefixStyle} from 'res/scripts/dom.js'
  const transform=prefixStyle('transform')
  const progressBtnWidth=15;//按钮宽度
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
  created(){
    this.touch={}//用于touch事件数据共享时使用
  },
  methods:{
    progressTouchStart(e){
      this.touch.initiated=true;//初始化
      this.touch.startX= e.touches[0].pageX;//开始移动的x值
      this.touch.left=this.$refs.progress.clientWidth;//显示当前进度条的宽度值
    },
    progressTouchMove(e){
      if(!this.touch.initiated){
        return;
      }
      //如果为触发移动开始事件直接进入e移动，则取消移动事件
      const deltaX=e.touches[0].pageX-this.touch.startX//当前位置与起始位置的差值
      const barWidth=this.$refs.progressBar.clientWidth-progressBtnWidth;
      //当前进度条宽度等于总宽度减去按钮宽度
      const offserWidth=Math.min(barWidth,Math.max(0,this.touch.left+deltaX))//当前进度宽度等于进度条宽度加上偏移值，且宽度值必须介于0到进度条总宽度之间
    this._offset(offserWidth);//设定当前进度条宽度
    },
    progressTouchEnd(e){
      this.touch.initiated=false;//重置函数，归为初始值
      this._updatePrecent();//更新进度
    },
    _updatePrecent(){
      const barWidth=this.$refs.progressBar.clientWidth-progressBtnWidth;
      const precent=this.$refs.progress.clientWidth/barWidth;
      this.$emit('updatePrecent',precent)
    },
    _offset(offsetWidth){
      this.$refs.progress.style.width=`${offsetWidth}px`
      this.$refs.progressBtn.style[transform]=`translate3d(${offsetWidth}px,0,0)`
    },//设置当前进度条宽度
    progressClick(e){
      this._offset(e.offsetX)
      this._updatePrecent();
    }
  },
    watch:{
      precent(newPrecent){
        if(newPrecent>= 0 && !this.touch.initiated){//百分比更新必须在每有移动且进度条大于零才有效
          const barWidth=this.$refs.progressBar.clientWidth-progressBtnWidth;
          console.log(this.$refs.progressBar.clientWidth)
          //当前进度条宽度等于总宽度减去按钮宽度
          const offsetWidth=barWidth*newPrecent;
          //当前进度等于总宽度乘以百分比
          this._offset(offsetWidth)
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
      left:0px;
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
