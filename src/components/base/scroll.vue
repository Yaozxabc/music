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
          type:Number,//监听滚动事件，缓慢、快速
          default:1
        },
        click:{
          type:Boolean,//手动派发点击事件
          default:false
        },
        data:{
          type:Array,//对动态数据进行重新加载
          default:null
        }
      },
        data(){
            return {}
        },
  mounted(){
    setTimeout(()=>{

      this._initScroll()
    },20)
  },
  methods:{
    _initScroll(){
        if(!this.$refs.wrapper){//初始化时候，防止出现undefined报错
          alert("dddaa")
          return
        }
        this.scroll=new BScroll(this.$refs.wrapper,{
          scrollY:true,
          scrollX:false,
          proboType:this.proboType,
          click:this.click,
          //初始化数据
        })
    //20毫秒主要是用于等待don结构生成
    },
    enable(){
      this.scroll && this.scroll.enable();//方法代理，执行滚动事件
    },
    disable(){
      this.scroll && this.scroll.disable();//方法代理,不执行滚动事件
    },
    refresh(){
      this.scroll && this.scroll.refresh();//方法代理，刷新scroll，重新计算高度
    }
  },
  watch:{
    data(){
      this.refresh()//检测数据，如果数据发生变化，则刷新
    }
  }
    }
</script>


<style scoped>
.wrapper{

}
</style>
