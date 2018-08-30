<template>
  <div>
    <scroll class="recommend_content" :data="playlist" ref="scroll" id="recommend_content">
      <div ref="recom">
  <div>
    <slider ref="slider">
      <div v-if="recommend.length" v-for="item in recommend">
        <a :href="item.linkUrl">
          <img @load="imgload" :src="item.picUrl" alt=""/>
        </a>
      </div>
    </slider>
  </div>
  <div>
    <div class="recommend_list">
      <h1>热门歌单推荐</h1>
      <ul>
        <li v-for="item in playlist">
          <div class="icon">
            <img v-lazy="item.imgurl" width="60" height="60" alt=""/>
          </div>
          <div class="text">
            <h2 class="name">{{item.dissname}}</h2>
            <p class="desc">{{item.creator.name}}</p>
            <p class="listnum">{{item.listennum}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
      </div>
      <div class="recom_loading" v-show="!playlist.length">
        <loading></loading>
      </div>
  </scroll>
</div>
</template>

<script type="text/ecmascript-6">
  import {mockData} from 'res/scripts/MockData.js'
  import slider from 'base/slider'
  import scroll from 'base/scroll'
  import {getPlayList,getDiscList} from 'res/api/recommend.js'
  import {ERR_ok} from 'res/api/config.js'
    export default{
        data(){
            return {
              recommend:[],
              playlist:[]
            }
        },
  components:{
    slider,
    scroll
  },
  methods:{
    _getcommend(){
      getRecommend().then((res)=>{
        alert(res.data.code)
        if(res.code===ERR_ok){

        }else{
          alert('dda')
        }
      })

    },
    _getJson(){
      getRecommendJson().then((res)=>{
        alert(res)
      })
    },
    _getSliderData(){
      this.$http.get(this.$api.index.sliderList).then((res)=> {
        var oData = res.data
        if (oData.code == ERR_ok) {
          this.recommend=oData.data.slider
        }
      })
    },
    _getPlayList(){
      getDiscList().then((res)=>{
        console.log(res)
      })
//      this.$http.post(this.$api.index.playlists,{
//        headers:{
//          Origin:'https://music.163.com',
//          referer:'https://music.163.com/m/',
//          host:'music.163.com'
//        }
//      }).then((res)=> {
//        var oData = res.data
//        if (oData.code == ERR_ok) {
//          this.playlist=oData.data
//          console.log(this.playlist)
//        }
//      })
    },
    _getPlaylist(){
      this.$http.get('./static/OnlineData.json').then((res)=>{
        let myData=res.data.data
        this.playlist=myData.list
      })
    },
    imgload(){
      if(!this.checkload){
        this.$refs.slider._setSliderWidth();
        this.$refs.slider._initSlider();
        this.$refs.scroll.refresh();
        this.checkload=true;
      }

    },
    setPageHeight(){
      let oHeight=document.documentElement.clientHeight;
      let recom=document.getElementById('recommend_content');
      recom.style.height=oHeight-100+'px';
    }
  },
  created(){
    this._getSliderData()
      this._getPlaylist()
  },
  mounted(){
this.setPageHeight();
  }
    }
</script>


<style scoped lang="scss">
  .recommend_content{
    position: relative;
    overflow: hidden;
  }
  .recommend_list{
  text-align:center;
    h1{font-size: 34px;color: yellow;margin: 20px auto;}
    ul{
      li{
        display:flex;
      padding:0 0 16px 30px;
        .icon{
          margin-right: 20px;
          width: 120px;
          img{width: 100%}
        }
        .text{
          text-align: left;
          flex:1;
        display:flex;
        flex-direction:column;
        justify-content:center;
          .name{font-size: 24px;color: $textColor;flex: 1;}
          .desc{font-size: 16px;color: $fontColor;flex: 1}
          .listnum{font-size: 14px;color: #6ae75e;flex: 1}
        }
      }
    }
  }
.recom_loading{
  position: absolute;
  width: 100%;
  top:50%;
  left: 50%;
  transform: translateX(-50%)

}
</style>
