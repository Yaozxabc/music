<template>
  <transition name="slider">
    <music-list :title="title" :bgImage="bgImage" ></music-list>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'com/music-list/music-list'
  import api from 'res/api/api'
  import {mapGetters} from 'vuex'
    export default{
        data(){
            return {
              list:""
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
      const url=api.index.disclists
      this.$http.get(url,{
        headers: {
          referer: 'https://y.qq.com',  //源域名
          host: 'y.qq.com'
        }
      }).then((res)=>{
        console.log(res.data)
      })
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
