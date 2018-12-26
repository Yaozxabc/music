<template>
<div ref="wrapper">
  <slot></slot>
</div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
    export default{
      props:{
        probeType:{
          type:Number,//监听滚动事件，缓慢、快速以及是否实时变化
          default:1
        },
        click:{
          type:Boolean,//手动派发点击事件
          default:false
        },
        data:{
          type:Array,//对动态数据进行重新加载
          default:null
        },
        listentScroll:{//是否监听滚动事件
          type:Boolean,
          default :false
        },
        pullUp:{
          type:Boolean,
          default:true
        },
        beforeScroll:{
          type:Boolean,
          default:false
        }
      },
        data(){
            return {}
        },
  mounted(){
    setTimeout(()=>{
      this._initScroll();
      //初始化组件，则创建scroll事件

    },20)
  },
  methods:{
    _initScroll(){
        if(!this.$refs.wrapper){//初始化时候，防止数据还未获取的时候，出现undefined报错
          return
        }
        this.scroll=new BScroll(this.$refs.wrapper,{
          scrollY:true,
          scrollX:false,
          probeType:this.probeType,//设定滚动事件是否实时触发变化
          click:this.click,
          //初始化数据
        })
      if(this.listentScroll){
        const me=this;
        this.scroll.on('scroll',(pos)=>{
          me.$emit('scroll',pos)
          //触发滚动事件，并将pos属性值传出去，pos为当前滚动的x轴和y轴的对象

        })
      }
      if(this.pullUp){
        let self=this;
        this.scroll.on('scrollEnd',function(){
          if(self.scroll.y<=(self.scroll.maxScrollY+80 )){
            self.$emit('scrollToEnd')
          }
        })
      }
      if(this.beforeScroll){
        this.scroll.on('befroeScrollStart',()=>{
          this.$emit('beforeScroll')
        })
      }
      },
    //20毫秒主要是用于等待dom结构生成

    enable(){
      this.scroll && this.scroll.enable();//方法代理，执行滚动事件
    },
    disable(){
      this.scroll && this.scroll.disable();//方法代理,不执行滚动事件
    },
    refresh(){
      this.scroll && this.scroll.refresh();//方法代理，刷新scroll，重新计算高度
    },
    scrollTo(){
      this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments);
      //扩展方法，用于接受scrollTo(参数方法),滚动到指定的位置
    },
    scrollToElement(){
      this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments);
      //扩展方法，用于接受scrollTo(参数方法)，滚动到指定的目标元素。
    },


  },
  watch:{
    data(){
      this.refresh()//检测数据，如果数据发生变化，则刷新
    }
  }
    }
</script>


<style scoped>

</style>
