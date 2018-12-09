<template>
  <transition name="slider">
    <music-list :bgImage="bgImage" :title="discTitle" :songs="songs" :iconShow="iconShow"></music-list>
  </transition>
</template>
<script type="text/ecmascript-6">
  import musicList from 'com/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getTopList} from 'res/scripts/ramk'
  import {createSong} from 'res/api/songs'
    export default{
        data(){
            return {
              page:"detail",
              songs:[],
              iconShow:true
            }
        },
  computed:{
    ...mapGetters([
      'toplist'
    ]),
    discTitle(){
     return this.toplist.topTitle
    },
    bgImage(){
      if(this.songs.length){
        return this.songs[0].image
      }
     return this.toplist.picUrl
    }
  },
  created(){
    if(!this.toplist.id){
      this.$router.push({
        path:'/rank'
      })
      return;
    }
    this._getToplist(this.toplist.id,this.page,this.toplist.type);
  },
  methods:{
    _getToplist(topid,page,type){
      getTopList(topid,page,type).then((res)=>{
        this.songs=this._normarlizeTopList(res.data.songlist)
      })
    },
    _normarlizeTopList(list){
      let res=[];
      list.forEach((musicData)=>{
        if(musicData.data.songid && musicData.data.albumid){
          res.push(createSong(musicData.data))
        }
      })
      return res
    }
  },
  components:{
    musicList
  }
    }
</script>


<style scoped>
  .slider-enter-active,.slider-leave-active{
  transition: all 0.4s ease;
}
  .slider-enter,.slider-leave{
    transform: translate3d(100%,0,0);
  }
</style>
