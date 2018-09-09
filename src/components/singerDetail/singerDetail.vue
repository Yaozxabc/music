<template>
  <transition name="slider">
<div class="singer_detail">
  <button @click="_getSongs">获取歌曲列表</button>
</div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'res/api/singerDetail'
  import {createSong,getVkey} from 'res/api/songs'
    export default{
        data(){
            return {
              songs:[]
            }
        },
  computed:{
  ...mapGetters([
      'singer'
    ])
  },
  methods:{
    _getSongs(){
      if(!this.singer.id){
        this.$router.push({
          path:'/singer'
        })
        return;
      }
      getSingerDetail(this.singer.id).then((res)=>{
        this.songs=this._normalizeSongs(res.data.list)

        console.log(this.songs)
      })
    },
    _normalizeSongs(list){
      let ret=[];
      list.forEach((item)=>{
        let {musicData}=item;//把列表内容放置到musicData中
        if(musicData.songid && musicData.albummid){
          ret.push(createSong(musicData))
        }
      getVkey(musicData)
      })

      return ret;
    }
  },
  created(){
    this._getSongs();

  }
    }
</script>


<style scoped lang="scss">
.singer_detail{
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: #f0f7ff;
  background-color:$bgColor;
}
  .slider-enter-active,.slider-leave-active{
    transition: all .3s;
  }
  .slider-enter,.slider-leave{
    transform: translate3d(100%,0,0);
  }
</style>
