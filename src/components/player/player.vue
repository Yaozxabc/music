<template>
<div class="player" v-show="playlist.length>0">
  <transition name="normal"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
    @after-leave="leaveEnter"
    >
  <div class="normarl-player" v-show="fullScreen">
    <div class="background">
      <img :src="curSong.image" alt=""/>
    </div>
    <div class="top">
      <div class="back" @click="back">
        <i class="iconfont icon-bottom"></i>
      </div>
      <h1 class="title" v-html="curSong.name"></h1>
      <h2 class="subtitle" v-html="curSong.singer"></h2>
    </div>
    <div class="middle"
      @touchstart="middleTouchStart"
      @touchmove="middleTouchMove"
      @touchend="middleTouchEnd"
      >
      <div class="middle-l" ref="middleL">
        <div :class="['cd-warpper',cdPlay]" ref="cdWarpper">
          <div class="cd">
            <img :src="curSong.image" alt="" class="image"/>
          </div>
        </div>
        <div class="playingLyric_warp">
          <div class="playingLyric">
            {{playingLyric}}
          </div>
        </div>
      </div>
      <scroll  class="middle-r" ref="lyriclist" :data="currentLyric && currentLyric.lines">
        <div class="lyric-warpper">
          <div v-if="currentLyric">
            <p ref="lyricLine"
              :class="['text',{active:currentLyriclineNum === index}]"
               v-for="(line,index) in currentLyric.lines"
              >{{line.txt}}</p>
          </div>
        </div>
      </scroll>
    </div>
    <div class="bottom">
      <div class="dot_warp">
        <span :class="['dot',{'active':currentShow==='cd'}]"></span>
        <span :class="['dot',{'active':currentShow==='lyric'}]"></span>
      </div>
      <div class="progress-warpper">
        <span class="time time-l">{{format(curTime)}}</span>
        <div class="progress-bar-warpper">
          <progress-bar :precent="precent" @updatePrecent="updatePrecent"></progress-bar>
        </div>
        <span class="time time-r">{{format(curSong.duration)}}</span>
      </div>
      <div class="opeators">
        <div class="icon i-left" @click="changeMode">
          <i :class="['iconfont',iconMode]"></i>
        </div>
        <div class="icon i-left">
          <i class="iconfont icon-281-previous" @click="prev"></i>
        </div>
        <div class="icon i-center">
          <i @click="toogelPlaying" :class="['iconfont',playIcon]"></i>
        </div>
        <div class="icon i-right">
          <i class="iconfont icon-next" @click="next"></i>
        </div>
        <div class="icon i-right">
          <i class="iconfont icon-collection"></i>
        </div>
      </div>
    </div>
  </div>
  </transition>
  <transition name="mini">
  <div class="mini-player" v-show="!fullScreen" @click="open">
    <div :class="['icon',cdPlay]">
      <img :src="curSong.image" alt=""/>
    </div>
    <div class="text">
      <h2 class="name" v-html="curSong.name"></h2>
      <p class="desc" v-html="curSong.singer"></p>
    </div>
    <div class="control">
      <progress-circle :radius="40" :precent="precent">
        <div :class="['iconplay','iconfont',playIcon]" @click.stop="toogelPlaying">
        </div>
      </progress-circle>
      <i :class="['iconfont',iconMode]" @click.stop="changeMode" ></i>
    </div>
  </div>
  </transition>
  <audio :src="curSong.url" ref="audio"
         @canplay="ready"
         @timeupdate="updateTime"
         @ended="end"
    ></audio>
</div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'
  import{prefixStyle} from 'res/scripts/dom.js'
  import Scroll from 'com/base/scroll'
  import {shuffle} from 'res/scripts/util'
  import ProgressBar from 'com/base/progress-bar/progress-bar'
  import ProgressCircle from 'com/base/progress-circle/progress-circle'
  import animations from 'create-keyframe-animation'
  import {playMode} from '../../store/config'
  import Lyric from 'lyric-parser'

  const transform=prefixStyle('transform')
  const transitionDuration=prefixStyle('transitionDuration')

    export default{
        data(){
            return {
              songReady:false,
              curTime:0,
              currentLyric:null,
              currentLyriclineNum:0,
              show:true,
              currentShow:"cd",
              playingLyric:""
            }
        },
  created(){
    this.touch={}
  },
  computed:{
  ...mapGetters([
      'fullScreen','playlist','curSong','playing','curIndex','mode','sequencelist'
    ]),
    playIcon(){
      return this.playing?'icon-pausecircle':'icon-play'
    },
    cdPlay(){
      return this.playing?'play':'play pause'
    },
    precent(){
      return this.curTime/this.curSong.duration
    },
    iconMode(){
      return this.mode === playMode.sequence ? 'icon-icon_sequence' : this.mode === playMode.loop ? 'icon-iosloopstrong':'icon-random'
    },

  },
  methods:{
  ...mapMutations({
      setFullScreen:'SET_FULL_SCREEN',
      setPlaying:'SET_PLAYING_STATE',
      setCurIndex:'SET_CURINDEX',
      setPlayMode:'SET_PLAYING_MODE',
      setPlaylist:'SET_PLAYLIST'
    }),
    back(){
      this.setFullScreen(false)
    },
    open(){
      this.setFullScreen(true)
    },
    enter(el,done){//el为动画元素，done为回调函数
      const {x,y,scale}=this._getposandscale();
      let animation={
        0:{
          transform:`translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60:{
            transform:`translate3d(0,0,0) scale(1.1)`
          },
        100:{
          transform:`translate3d(0,0,0) scale(1)`
      }
      }
      animations.registerAnimation({
        name:'move',
        animation,
        presets:{
          duration:400,//动画jiange
          easing:'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWarpper,'move',done)
    },
    afterEnter(){
      animations.unregisterAnimation('move')
      this.$refs.cdWarpper.style.animation=''
    },
    leave(el,done){
      this.$refs.cdWarpper.style.transition='all 0.4s'
      const {x,y,scale}=this._getposandscale()
      this.$refs.cdWarpper.style[transform]=`translate3d(${x}px,${y}px,0) scale(${scale})`
      this.$refs.cdWarpper.addEventListener('transitionend',done)
    },
    leaveEnter(){
      this.$refs.cdWarpper.style.transition='';
      this.$refs.cdWarpper.style[transform]=''

    },
    _getposandscale(){
      const targetWidth=60 //迷你图片播放器宽度
      const paddingLeft=20 //，迷你图片离左边距离
      const paddingbottom=20;//迷你图片距离底部距离
      const paddingTop=100;//大图片距离顶部距离
      const width=600;//大图宽度
      const scale=targetWidth/width;//小图与大图的缩放比例
      const x=-(window.innerWidth/2 - paddingLeft)//大图x轴到小图x轴中心点的距离，负值主要因为向上运动
      const y=window.innerHeight-paddingTop-width/2-paddingbottom//大图y轴到小图y轴中心距离
      return{
        x,y,scale
      }
      //返回小图与大图的缩放比例，及x轴距离，y轴距离
    },
    toogelPlaying(){
      if(!this.songReady){
        return
      }
      this.setPlaying(!this.playing)
     if(this.currentLyric){
       this.currentLyric.togglePlay()
     }
    },
    next(){
      if(!this.songReady){
        return
      }
      if(this.playlist.length===1){
        this.loop()
      }else {
        let index = this.curIndex + 1;
        if (index === this.playlist.length) {
          index = 0;
        }
        this.setCurIndex(index)
        if (!this.playing) {
          this.toogelPlaying();
        }
        this.songReady = false;
        console.log(this.songReady)
      }
    },
    prev(){
      if(!this.songReady){
        return
      }
      if(this.playlist.length===1){
        this.loop()
      }else {
        let index = this.curIndex - 1;
        if (index === -1) {
          index = this.playlist.length - 1;
        }
        this.setCurIndex(index)
        if (!this.playing) {
          this.toogelPlaying();
        }
        this.songReady = false;
      }
    },
    ready(){
      this.songReady=true;
    },
    updateTime(e){
      this.curTime= e.target.currentTime;//媒体当前播放时间，e为事件，target为事件对象
    },//获取当前媒体播放时间进度
    format(interval){
      interval=interval | 0;//或零等同于Math.floor
      const minute=interval/60 | 0;
      const seconds=this._pad(interval%60);
      return `${minute}:${seconds}`

    },//格式化当前时间，显示分秒
    _pad(num,n=2){
      let len=num.toString().length;
      while(len<n){
        num='0'+num
        len++;
      }
      return num
    },//num需要格式化的数字，n为格式化的位数
    //格式化歌曲播放时间
    getLyric(){
      this.curSong._getlyric().then((lyric)=>{
        this.currentLyric=new Lyric(lyric,this.handlelyric)//传入接析歌词，及回调函数https://github.com/ustbhuangyi/lyric-parser
        if(this.playing){
          this.currentLyric.play()
        }
      }).catch(()=>{
        this.currentLyric=null;
        this.playinfLyric="";
        this.currentLineNum=0;
      })
    },
    handlelyric({lineNum,txt}){
      this.currentLyriclineNum=lineNum
      if(lineNum>5){
        let LineEl=this.$refs.lyricLine[lineNum-5];//定位第五行歌词的序号
        this.$refs.lyriclist.scrollToElement(LineEl,1000)
      }else{
        this.$refs.lyriclist.scrollTo(0,0,1000)
      }
      this.playingLyric=txt;
    },
    middleTouchStart(e){
      this.touch.initiated=true;//是否循环
      const touch= e.touches[0];
      this.touch.startX=touch.pageX;
      this.touch.starY=touch.pageY;

    },
    middleTouchMove(e){
      if(!this.touch.initiated){
        return;
      }
      const touch= e.touches[0];

      const deltaX=touch.pageX-this.touch.startX;
      const deltaY=touch.pageY-this.touch.startY;
      if(Math.abs(deltaY)>Math.abs(deltaX)){
        return;
      }
      //定义右边歌词页面的位置
      const left=this.currentShow==="cd" ? 0 : -window.innerWidth;
      //定义歌词页面的偏移值；
      const oWidth=Math.min(0,Math.max(-window.innerWidth,left+deltaX));
      this.touch.precent=Math.abs(oWidth/window.innerWidth)
      this.$refs.lyriclist.$el.style[transform]=`translate3d(${oWidth}px,0,0)`
      this.$refs.middleL.style.opacity=1-this.touch.precent;
      this.$refs.middleL.style[transitionDuration]=`0`
    },
    middleTouchEnd(e){
     let offsetWidth;
      let opacity;
      if(this.currentShow==="cd"){
        if(this.touch.precent>0.1){
          offsetWidth =-window.innerWidth+20;
          opacity=0;
          this.currentShow="lyric"
        }else{
          offsetWidth=0;
          opacity=1;
        }
      }else{
        if(this.touch.precent<0.9){
          offsetWidth =20;
          this.currentShow="cd";
          opacity=1;
        }else{
          offsetWidth=-window.innerWidth;
          opacity=0;
        }
      }
      const time=300
      this.$refs.lyriclist.$el.style[transform]=`translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyriclist.$el.style[transitionDuration]=`${time}ms`
      this.$refs.middleL.style.opacity=opacity;
      this.$refs.middleL.style[transitionDuration]=`0`
    },
    updatePrecent(precent){
      const currnetTime=this.curSong.duration
      this.$refs.audio.currentTime= currnetTime* precent;//播放进度等于总宽度*百分比值
    if(!this.playing){
      this.toogelPlaying()
    }
      if(this.currentLyric){
        this.currentLyric.seek(currnetTime*1000)
      }//同步歌词播放
    },
    changeMode(){
      const mode= (this.mode+1)%3;//循环切换模式
      this.setPlayMode(mode);
      let list=null;
      if(mode===playMode.random){
        list=shuffle(this.sequencelist)
      }else{
        list=this.sequencelist
      }
      this.resetCurIndex(list)
      this.setPlaylist(list)
    },
    resetCurIndex(list){
      let index = list.findIndex((item)=>{
        return item.id === this.curSong.id;
      })
      this.setCurIndex(index);
    },
    end(){
      if(this.mode !== playMode.loop){
        this.next();

      }else{
        this.loop()
      }
    },
    loop(){
      this.$refs.audio.currentTime=0;
      this.$refs.audio.play();
      if(this.currentLyric){
        this.currentLyric.seek(0)//循环模式下，设置歌词回零
      }
    }
  },
  watch:{
    curSong(newSong,oldSong){
      if(newSong.id===oldSong){
        return;
      }
      if(this.currentLyric){
        this.currentLyric.stop()
      }
      this.$nextTick(()=>{
        this.$refs.audio.play()
        this.getLyric()
      })
    },
    playing(newplaying){
      const audio=this.$refs.audio
      this.$nextTick(()=>{
      newplaying?audio.play():audio.pause()
    })
  }

    },
  components:{
    ProgressBar,ProgressCircle,Scroll
  }
  }
</script>


<style scoped lang="scss">
  .normarl-player{
    z-index: 150;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding:20px;
    color:$fontColor;
    background: $bgColor;
    .background{
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index:-1;
      img{
    width:100%;
    height:100%;
  }
      }
  .top{
  position:relative;
  text-align:center;
  .back{
  position:absolute;
  left:0;
  top:0;
  z-index: 50;
    .iconfont{
      width: 60px;
      height: 60px;
      font-size: $iconSize;
      color: $iconColor;
      text-shadow: 2px 2px rgb(213, 53, 25);
    }
    :active{
    color: #000080;
    }
  }
  .title{
    font-size: 40px;
    margin-bottom: 20px;
  }
  .subtitle{
    font-size: 20px;
  }
  }
  .middle{
  position:relative;
    overflow: hidden;
  height:750px;
    .middle-l{
      position:absolute;
      left:0;
      top:0;
      bottom: 0;
      width: 100%;
      .cd-warpper{
        width:600px;
        height:600px;
        margin: 20px auto;
        .cd{
          border-radius:50%;
          overflow: hidden;
          width: 100%;
          height: 100%;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
  .playingLyric_warp{
    width: 100%;
    .playingLyric{
      width: 80%;
      margin: 0 auto;
      font-size: 25px;
      color: #dddddd;
      text-align: center;
    }
  }
  }
  .middle-r{
    position:absolute;
    left:100%;
    top:0;
    bottom: 0;
    width: 100%;
  .lyric-warpper{
    width: 80%;
    margin: 0 auto;
    text-align:center;
  .text{
    margin-top: 20px;
    font-size: 25px;
    color: #dddddd;
    opacity: 0.6;
  }
  .active{
    opacity:1;
  }
  }
  }
  .play{
    animation: rotate 20s linear infinite;
  }
  .pause{
    animation-play-state: paused;
     }
  }
  .bottom{
  position:absolute;
    left: 5%;
    right: 5%;
    bottom: 5%;
  .dot_warp{
    z-index: 51;
  position:absolute;
  top:-50%;
  left:calc(50% - 40px);
    .dot{background: #fff;display:inline-block;height: 20px;width:20px;border-radius: 10px;}
    .active{height: 20px;width: 40px;}

  }
  .progress-warpper{
  display:flex;
  align-item:center;
  witdh:80%;
  margin:0px auto;
  pading:10px 0;
    .time{
      color: $iconColor;
      flex:0 0 50px;
      line-height: 50px;
    }
    .time-l{
      text-align: left;
    }
    .time-r{
      text-align: right;
    }
    .progress-bar-warpper{
      flex: 1;
    }
  }
    .opeators{
      display: flex;
  .i-left,.i-center,.i-right{
    text-align: center;
    flex: 1;
    .iconfont{
      font-size: $iconSize;
      color:$iconColor;
    }

  }
    }

  }

  }
  .mini-player{
    z-index: 180;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: #423e46;
  padding:20px;
    .icon{
    float:left;
    width:60px;
    height:60px;
    border-radius:50%;
    overflow:hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
    .text{
    float:left;
    margin-left: 30px;
    color:$fontColor;
        .name{
          font-size: 30px;
          margin-bottom: 5px;
        }
        .desc{
          font-size: 14px;
          color: rgba(146, 138, 151, 0.93);
        }
  }
  .play{
    animation: rotate 20s linear infinite;
  }
  .pause{
    animation-play-state: paused;
  }
  .iconplay{
    position: absolute;
    left: 5px;
    top: 1px;
    display: inline-block;
    font-size: 60px;
    color: $iconColor;
  }
    .control{
    float:right;
  .iconfont{
    font-size: $iconSize;
    color:$iconColor;
  }
    }
  }
.background:after{
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: $bgColor;
  opacity: 0.9;

}
  .normal-enter-active,.normal-leave-active{
    transition: all .1s;
  }
  .normal-enter{
    transform:translate3d(0,-100px,0);
  opacity: 0;
  }
  .normal-leave-active{
    transform:translate3d(0,100px,0);
    display:none;
  }
  .mini-enter-active,.mini-leave-active{
    transition: all .1s;
  }
  .mini-enter,.mini-leave-active{
    opacity: 0;
  }
  @keyframes rotate {
    0%{
      transform:  rotate(0);
    }
    100%{
      transform: rotate(360deg);
    }
  }
</style>
