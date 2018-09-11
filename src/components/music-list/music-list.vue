<template>
<div class="music-list">
  <div class="back" @click.prevent="toSinger">
    <i class="icon-fenxiang iconfont "></i>
  </div>
  <h1 class="title" v-html="title" ></h1>
  <div class="bg-image" :style="bgStyle" ref="bgImage">
    <div class="filter" ></div>
  </div>
  <div class="bg-layer" ref="layer"></div>
  <scroll
    @scroll="scroll"
    :probeType="probeType"
    :listentScroll="listent"
    class="list"
    :data="songs"
    ref="list">
    <div class="song-list">
      <song-list :songs="songs"></song-list>
    </div>
  </scroll>
</div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'com/base/scroll'
  import SongList from 'com/base/songlist/songlist'
  const RESERVET_HEIGHT=35;
    export default{
      props:{
        bgImage:{
          type:String,
          default:''
        },
        songs:{
          type:Array,
          default:[]
        },
        title:{
          type:String,
          default:''
        }
      },
      data(){
          return {
            ScrollY:0
          }
  },
  created(){
    this.listent=true;
    this.probeType=3
  },
      computed:{
        bgStyle(){
      return `background-image:url('${this.bgImage}')`
    }

      },
  watch:{
    ScrollY(newY){
      let translateY=Math.max(this.minHeight,newY)
      this.$refs.layer.style[`transform`]=`translate3d(0,${translateY}px,0)`
      this.$refs.layer.style[`webkittransform`]=`translate3d(0,${translateY}px,0)`
    }
  },
  components:{
    SongList,Scroll
  },
  mounted(){
    this.imgHeight=this.$refs.bgImage.clientHeight;
    this.minHeight=-this.imgHeight+RESERVET_HEIGHT
    this.$refs.list.$el.style.top=this.imgHeight+'px'
  },
  methods:{
    toSinger(){
      console.log('ddd')
      this.$router.push({
        path:'/singer'
      })
    },
    scroll(pos){
      this.ScrollY=pos.y;
    }
  }

    }
</script>


<style scoped lang="scss">
.music-list{
  z-index: 100;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: $bgColor;
  .back{
  position:absolute;
    left: 0;
    top: 0;
    width:60px;
  height:60px;
  z-index:2;
    .icon-fenxiang{
      width: 100%;
      height: 100%;
      font-size: 50px;
      color: #8b8a8a;
    }
  }
  .title{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    font-size: 35px;
    color: #f0f7ff;
    text-align: center;
    height: 60px;
    line-height: 60px;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .bg-image{
  width:100%;
  height:0;
  padding-top:70%;/*等于宽度的70%；padding-top和padding-bottom有个隐藏属性，当值为百分比的时候，其分母取的是父级容器宽度而非高度*/
    background-repeat: no-repeat;
    background-size: cover;
    .filter{

    }
  }
.bg-layer{
  position: relative;
  height: 100%;
  background: $bgColor;
}
.list{
  width: 100%;
  position: absolute;
  bottom:0;
}
}
</style>
