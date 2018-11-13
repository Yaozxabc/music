<template>
  <transition name="slider">
<music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
</div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'res/api/singerDetail'
  import {createSong,getVkey} from 'res/api/songs'
  import MusicList from 'com/music-list/music-list'
    export default{
        data(){
            return {
              songs:[]
            }
        },
  computed:{
    title(){
      return this.singer.name;
    },
    bgImage(){
      return this.singer.avatar
    },
  ...mapGetters([
      'singer'
    ])
  },
  components:{
    MusicList
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

  .slider-enter-active,.slider-leave-active{
    transition: all .3s;
  }
  .slider-enter,.slider-leave{
    transform: translate3d(100%,0,0);
  }
</style>
