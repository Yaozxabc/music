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
    <div class="middle">
      <div class="middle-l">
        <div class="cd-warpper" ref="cdWarpper">
          <div class="cd">
            <img :src="curSong.image" alt="" class="image"/>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="opeators">
        <div class="icon i-left">
          <i class="iconfont icon-random"></i>
        </div>
        <div class="icon i-left">
          <i class="iconfont icon-281-previous"></i>
        </div>
        <div class="icon i-center">
          <i class="iconfont icon-play"></i>
        </div>
        <div class="icon i-right">
          <i class="iconfont icon-next"></i>
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
    <div class="icon">
      <img :src="curSong.image" alt=""/>
    </div>
    <div class="text">
      <h2 class="name" v-html="curSong.name"></h2>
      <p class="desc" v-html="curSong.singer"></p>
    </div>
    <div class="control">
    </div>
    <div class="control">
      <i class="iconfont icon-random"></i>
    </div>
  </div>
  </transition>
</div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'
  import{prefixStyle} from 'res/scripts/dom.js'
  import animations from 'create-keyframe-animation'

  const transform=prefixStyle('transform')
    export default{
        data(){
            return {}
        },
  computed:{
    ...mapGetters([
      'fullScreen','playlist','curSong'
    ])
  },
  methods:{
    back(){
      this.setFullScreen(false)
    },
    open(){
      this.setFullScreen(true)
    },
    ...mapMutations({
      setFullScreen:'SET_FULL_SCREEN'
    }),
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
    }
  }
    }
</script>


<style scoped lang="scss">
  .normarl-player{
    z-index: 101;
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
    .middle-l{
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
    }
  }
  .bottom{
  position:relative;
  margin-top:250px;
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
    z-index: 101;
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
    .control{
    float:right;
    .icon-random{
      font-size: 60px;
      color: $iconColor;
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
    opacity: 0;
  }
  .mini-enter-active,.mini-leave-active{
    transition: all .1s;
  }
  .mini-enter,.mini-leave-active{
    opacity: 0;
  }
</style>
