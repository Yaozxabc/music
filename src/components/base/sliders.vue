<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import { addClass } from 'res/scripts/dom.js'
  import BScroll from 'better-scroll'
  export default {
    props: {
      loop: {
        type: Boolean,
        default: true,
      },
      autoPlay: {
        type: Boolean,
        default: true,
      },
      interval: {
        type: Number,
        default: 1000
      }
    },
    data(){
    return {
      dots:[],
      currentPageIndex:0
    }
  },
  mounted() {
    this._setSliderWidth()
    setTimeout(() => {
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20) //保证DOM被渲染，做了20ms的延时(*为何值为20？？* 因为浏览器刷新时间一般为17ms一次)
    window.addEventListener('resize', () => {        //监听窗口改变事件，解决当窗口改变时，图片的宽度未发生改变的问题
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    _setSliderWidth(isResize){
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let slideWidth = this.$refs.slider.clientWidth;

      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item') //为每一个子元素添加类名
        child.style.width = slideWidth + 'px'
        width += slideWidth        //容器的总宽度
      }
      if (this.loop && !isResize) {
        width += 2 * slideWidth    //如果轮播，左右会各增加一个，所以要加上两张图片的宽度
      }

      this.$refs.sliderGroup.style.width = width + 'px'        //为元素设置容器的总宽度
    },
    _initSlider(){
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,    //横向滚动
        scrollY: false,    //不允许纵向滚动
        momentum: false,    //关闭动量动画，能提升效能
        snap: {            //新版本将snap的属性都当成一个对象来书写
          loop: this.loop,    //循环
          threshold: 0.3,
          speed: 400        //轮播间隔
        },
        click: true
      })
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX //轮播到下一张，获取当前的index
        // if (this.loop) {            //旧版本设置方式，新版本不需要
        //   pageIndex -= 1
        // }
        this.currentIndex = pageIndex
        if (this.autoPlay) {
          clearTimeout(this.timer)    //如果设置额自动轮播就清除轮播再重新启动
          this._play()
        }
      })
    },
    _initDots(){
      this.dots = new Array(this.children.length)
    },
    _play(){
      // let pageIndex = this.currentIndex + 1        //旧版本需要计算增加的两张图片带来的影响
      // if (this.loop) {
      //   pageIndex += 1
      // }
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    }
  }
  }
</script>


<style scoped lang="scss">
  .slider{
    min-height: 1px;  position: relative;
  }
  .slider-group{
    position: relative;  overflow: hidden;  white-space: nowrap;
  }
  .slider-item{
    float: left;  box-sizing: border-box;  overflow: hidden;  text-align: center;  height: 150px;  overflow: hidden;
  }
  .slider-item a{
    display: block;  width: 100%;  overflow: hidden;  text-decoration: none;
  }
  .slider-item img{  display: block;  width: 100%;
  }
  .dots{
    position: absolute;  right: 0;  left: 0;  bottom: 12px;  text-align: center;  font-size: 0;
  }
  .dot{
    display: inline-block;  margin: 0 4px;  width: 8px;  height: 8px;  border-radius: 50%;  background: red;
  }
  .active{  width: 20px;  border-radius: 5px;  }
</style>
