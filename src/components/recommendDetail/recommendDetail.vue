<template>
  <transition name="slider">
    <music-list :title="title" :bgImage="bgImage" :songs="songlist"></music-list>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'com/music-list/music-list'
  import api from 'res/api/api'
  import {mapGetters} from 'vuex'
  import {getDiscList} from 'res/api/recommend.js'
  import {createSong} from 'res/api/songs'
    export default{
        data(){
            return {
              list:"",
              songlist:""
            }
        },
  computed:{
    title(){
      return this.disc.dissname
    },
    bgImage(){
      return this.disc.imgurl
    },
    ...mapGetters([
      "disc"
    ])
  },
  mounted(){
    this._getDiscList()
  },
  components:{
    MusicList
  },
  methods:{
    _getDiscList(){
      if(!this.disc.dissid){
        this.$router.push("/recommend")
        return
      }
      getDiscList(this.disc.dissid).then((res)=>{
        console.log(res.data)
        this.songlist=this._normalizeSong(res.data.cdlist[0].songlist)
      })
  },
    _normalizeSong(list){
      let ret=[]
      list.forEach((musicData)=>{
        if(musicData.songid && musicData.albumid){
          ret.push(createSong(musicData))
        }
      })
      console.log(ret)
      return ret
    }
  }
  }
</script>


<style scoped>

  .slider-enter-active,.slider-leave-active{
    transition: all .3s;
  }
  .slider-enter,.slider-leave{
    transform: translate3d(100%,0,0);
  }
</style>
