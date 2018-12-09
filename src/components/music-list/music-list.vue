<template>
<div class="music-list">
  <div class="back" @click.prevent="toSinger">
    <i class="icon-fenxiang iconfont "></i>
  </div>
  <h1 class="title" v-html="title" ></h1>
  <div class="bg-image" :style="bgStyle" ref="bgImage">
    <div class="randomPlay" @click="random" ref="randomBtn">随机播放全部</div>
    <div class="filter"  ref="filter" ></div>
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
      <song-list :songs="songs" @select="selectSong" :icon="iconShow"></song-list>
    </div>
  </scroll>
</div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'com/base/scroll'
  import SongList from 'com/base/songlist/songlist'
  import {mapActions} from 'vuex'
  import {playlistMixin} from 'res/scripts/mixin'
  const RESERVET_HEIGHT=35;
    export default{
      mixins:[playlistMixin],
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
        },
        iconShow:{
          type:Boolean,
          default:false
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
      let zIndex=0;
      let sCale=1;
      let blur=0;
      const precent=Math.abs(newY/this.imgHeight);
      if(newY>0){
        sCale=1+precent;
        zIndex=102;
      }else if(newY <0){
        blur=Math.min(20*precent,20)
      }
      this.$refs.filter.style['backdrop-filter']=`blur(${blur})`
      this.$refs.filter.style['webkitbackdrop-filter']=`blur(${blur})`
      this.$refs.layer.style[`transform`]=`translate3d(0,${translateY}px,0)`
      this.$refs.layer.style[`webkittransform`]=`translate3d(0,${translateY}px,0)`
      if(newY<this.minHeight){
        zIndex=200;
        this.$refs.bgImage.style.paddingTop=0;
        this.$refs.randomBtn.style.display='none'
        this.$refs.bgImage.style.height=`${RESERVET_HEIGHT}px`
      }else{
        this.$refs.bgImage.style.paddingTop=`70%`;
        this.$refs.bgImage.style.height=`0`
        this.$refs.randomBtn.style.display='block'
      }
      this.$refs.bgImage.style.zIndex=zIndex;
      this.$refs.bgImage.style[`transform`]=`scale(${sCale})`
      this.$refs.bgImage.style[`webkittransform`]=`scale(${sCale})`
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
    handlePlaylist(){
      const bottom=this.playlist.length>0 ? "80px": "0"
      this.$refs.list.$el.style.bottom=bottom;
      this.$refs.list.refresh()
    },
    toSinger(){
      this.$router.back()
    },
    scroll(pos){
      this.ScrollY=pos.y;
    },
    selectSong(item,index) {
      this.selectPlay({
        list:this.songs,
        index
      })
    },
    random(){
      this.randomPlay({
        list:this.songs
      })
    },
    ...mapActions([
    'selectPlay',
    'randomPlay'
  ])
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
  position:fixed;
    left: 0;
    top: 0;
    width:60px;
  height:60px;
  z-index:202;
    .icon-fenxiang{
      width: 100%;
      height: 100%;
      font-size: $iconSize;
      color: $iconColor;
    }
  }
  .title{
    z-index: 201;
    position: fixed;
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
    position: relative;
  width:100%;
  height:0;
  padding-top:70%;/*等于宽度的70%；padding-top和padding-bottom有个隐藏属性，当值为百分比的时候，其分母取的是父级容器宽度而非高度*/
    background-repeat: no-repeat;
    background-size: cover;
.randomPlay{
  position: absolute;
  top: 70%;
  left: 50%;
  padding: 5px 8px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  border-radius: 5px;
  color: #b5a23e;
  transform: translateX(-50%);
  border: 2px solid #b5a23e;
}
.filter{

    }

  }
.bg-layer{
  z-index: 101;
  position: relative;
  height: 100%;
  background: $bgColor;
}
.list{
  z-index: 102;
  width: 100%;
  position: absolute;
  bottom:0;
}
}
</style>
