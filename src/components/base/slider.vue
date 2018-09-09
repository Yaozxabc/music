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
          //用于设定组件轮播是否循环
          type:Boolean,
          default:true
        },
        autoPlay:{
          //用于设定设定组件是否自动播放
          type:Boolean,
          default:true
        },
        interval:{
          //用于控制轮播图播放速度
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
        //创建children属性，用于记录当前轮播图的图片数量
        let width=0;
        //初始化宽度值，用于记录轮播图需要的长度
        let sliderWidth=this.$refs.slider.clientWidth;
        //初始化界面宽度，以便让轮播图适应当前屏幕大小
        for(let i=0;i<this.children.length;i++){
          //循环当前轮播图的图片数据
          let child=this.children[i];
          addClass(child,'slider_item')
          //为所有图片子元素添加class样式，此处的addClass可以用于作为常用dom操作方法添加到domjs中
          child.style.width=sliderWidth+'px';
          //自适应，让每个图片的宽度都等于当前屏幕大小宽度
          width+=sliderWidth;
          //累计宽度值，用于设定承载所有图片的大容器
        }
        if(this.loop && !isResize){
          //监听组件，如果设定了循环，或者当前视窗大小发生了变化，则为父元素添加两个宽度值
          //以便形成轮动
          width += 2*sliderWidth
        }
        this.$refs.sliderGroup.style.width=width+'px';
        //为包裹图片的父集元素设定宽度
      },
      _initSlider(){
        //引入better-scroll插件，设定当前轮播图滚动属性
        this.slider=new BScroll(this.$refs.slider,{
          scrollX:true,//是否横向滚动
          scrollY:false,//是否纵向滚动
          momentum:false,//惯性
          snap: {
            //注意：
            // loop 为 true 是为了支持循环轮播，但只有一个元素的时候，loop 为 true 是无效的，也并不会 clone 节点。
            // threshold 表示可滚动到下一个的阈值，
            // easing 表示滚动的缓动函数。
            loop: this.loop, // 循环
            threshold: 0.3,
            speed: 400 // 轮播间隔
          }
        })
        this.slider.on('scrollEnd',()=>{
          //触发滚动结束事件
          let pageIndex=this.slider.getCurrentPage().pageX;
          //初始化当前页面索引值，
//          if (this.loop) {
//            // 由于bscroll循环播放首尾各加一个,因此索引-1
//            pageIndex -= 1
//          }//旧版本
          this.nowindex=pageIndex;
          //将当前滚动值赋值给nowIndex
          if(this.autoPlay){
            //每次滚动结束后，监听是否循环播放，是的话执行播放
            this._play()
          }
        })
//        this.slider.on('beforeScrollStart',()=>{
//          if(this.autoPlay){
//            clearTimeout(this.timer)
//            this._play()
//          }
//        })
      },
      _initDots(){
        this.dots=new Array(this.children.length)
        //创建当前滚动点的索引显示
      },
      _play(){
//        let pageIndex=this.nowindex+1;
//        if(this.loop){
//          pageIndex+=1;
//        }//旧版本
        this.timer=setTimeout(()=>{
          //启动滚动机制，只有执行一次
          this.slider.next()//新版本
//          this.slider.goToPage(pageIndex,0,400)//旧版本
        },this.interval)
      }
    },
mounted(){
    //初始化组件的时候，先设定轮播图的样式和基础宽度值，然后创建点数组，创建轮播图数据，并进行判断，如果循环，则执行滚动
    setTimeout(()=>{
      this._setSliderWidth();
      this._initDots()
      this._initSlider();
      if(this.autoPlay){
        this._play();
      }
    },20)
    //当前视窗发生变化，如果没有创建轮播图，则不执行，否则，立刻执行宽度变化，并重新渲染滚动事件
    window.addEventListener('resize',()=>{
      if(!this.slider){
        return
      }
      this._setSliderWidth(true);
      this.slider.refresh()
    })
},
  destoryed(){
    //d当前组件关闭，则取消滚动事件
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
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
    /*height: 250px;*/
    overflow: hidden;
                a{
    display: block;  width: 100%;  overflow: hidden;  text-decoration: none;
                img{
    display: block;  width: 100%;
  }}}
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
  }.active{
    width: 25px;
    height: 25px;
    background: #fff;
  }}}


</style>
