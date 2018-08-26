<template>
<div class="slider_warp" ref="slider">
  <div class="slider_group" ref="sliderGroup">
    <slot></slot>
  </div>
  <div class="dot_group">
    <span class="dota" v-for="(item,index) in dots" :class="{active:index==nowindex}"></span>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import { addClass } from 'res/scripts/dom.js'
  import BScroll from 'better-scroll'

    export default{
      props:{
        loop:{
          type:Boolean,
          default:true
        },
        autoPlay:{
          type:Boolean,
          default:true
        },
        interval:{
          type:Number,
          default:2000
        }
      },
        data(){
            return {
              nowindex:0,
              dots:[]
            }
        },
    methods:{
      _setSliderWidth(isResize){
        this.children=this.$refs.sliderGroup.children
        let width=0;
        let sliderWidth=this.$refs.slider.clientWidth
        for(let i=0;i<this.children.length;i++){
          let child=this.children[i];
          addClass(child,'slider_item')
          child.style.width=sliderWidth+'px';
          width+=sliderWidth;
        }
        if(this.loop && !isResize){
          width += 2*sliderWidth
        }
        this.$refs.sliderGroup.style.width=width+'px';

      },
      _initSlider(){
        this.slider=new BScroll(this.$refs.slider,{
          scrollX:true,
          scrollY:false,
          momentum:false,//惯性
          snap: {
            loop: this.loop, // 循环
            threshold: 0.3,
            speed: 400 // 轮播间隔
          }
        })
        this.slider.on('scrollEnd',()=>{
          let pageIndex=this.slider.getCurrentPage().pageX;
//          if (this.loop) {
//            // 由于bscroll循环播放首尾各加一个,因此索引-1
//            pageIndex -= 1
//          }
          this.nowindex=pageIndex;
          if(this.autoPlay){
            this._play()
          }
        })
        this.slider.on('beforeScrollStart',()=>{
          if(this.autoPlay){
            clearTimeout(this.timer)
          }
        })
      },
      _initDots(){
        this.dots=new Array(this.children.length)
      },
      _play(){
        let pageIndex=this.nowindex+1;
//        if(this.loop){
//          pageIndex+=1;
//        }
        this.timer=setTimeout(()=>{
          this.slider.goToPage(pageIndex,0,400)
        },this.interval)
      }
    },
mounted(){
    setTimeout(()=>{
      this._setSliderWidth();
      this._initDots()
      this._initSlider();
      if(this.autoPlay){
        this._play();
      }
    },20)
    window.addEventListener('resize',()=>{
      if(!this.slider){
        return
      }
      this._setSliderWidth(true);
      this.slider.refresh()
    })
},
  destoryed(){
    clearTimeout(this.timer)
  }
  }
</script>


<style scoped  lang="scss">
  .slider_warp{
  width:100%;
  position:relative;
  .slider_group{
    position: relative;
    overflow:hidden;
    white-space:nowrap;
  }
  .slider_item{
    float: left;
  a{
    width: 100%;
  img{
    width: 100%;
  }
  }
  }
  .dot_group{
    z-index: 2;
    position: absolute;
    bottom: 15px;
    left: 45%;
  .dota{
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 50%;
    margin-right: 8px;
    background: #f0c454;
  }
  .active{
    width: 25px;
    height: 25px;
    background: #fff;
  }
  }
  }


</style>
