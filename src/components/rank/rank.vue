<template>
<div class="rank" ref="rank">
  <scroll  :data="toplist" class="topList" ref="scroll">
  <ul >
    <li v-for="item in toplist" class="topLine" @click="selectItem(item)">
      <img :src='item.picUrl' :alt="item.topTitle" v-lazy="item.picUrl" class="top_img"/>
      <div class="top_content">
        <p class="top_title">{{item.topTitle}}</p>
        <ul class="top_main">
          <li class="top_main_line" v-for="(song,index) in item.songList">
            <span class="top_index">{{index+1}}</span>
            <span class="top_name">{{song.songname}}</span>
            <span class="top_author">{{song.singername}}</span>
          </li>
        </ul>
      </div>
    </li>
  </ul>
  </scroll>
  <div>
  <router-view></router-view>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import {getRankList} from 'res/scripts/ramk.js'
  import scroll from "com/base/scroll"
  import {mapMutations} from 'vuex'
  import {playlistMixin} from 'res/scripts/mixin'
    export default{
      mixins:[playlistMixin],
        data(){
            return {
              toplist:[]
            }
        },
    created(){
      this._getRankList();
    },
    methods:{
      handlePlaylist(){
        const bottom =this.playlist.length>0 ? "80px": ""
        this.$refs.rank.style.bottom=bottom;
        this.$refs.scroll.refresh();
      },
      selectItem(item){
        this.$router.push({
          path:`/rank/${item.id}`
        })
        this.setToplist(item)
        return
      },
      _getRankList(){
        getRankList().then((list)=>{
            this.toplist=this._normalizeRanklist(list).data.topList
          console.log(this.toplist)
        })
      },
      _normalizeRanklist(list){
        let startindex=list.indexOf("(")
        let endindex=list.length-1;
        let result= JSON.parse(list.slice(startindex+1,endindex))
        return result
      },
      ...mapMutations({
        setToplist:"SET_TOP_LIST"
      })
    },
  components:{
    scroll
  }
    }
</script>


<style scoped lang="scss">
  .rank{
    position: fixed;
    top: 140px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  .topList{
    height: 100%;
    overflow: hidden;
    padding:0 16px;
    .topLine{
    height:140px;  margin-bottom: 14px;
      background: #8b8a8a;
    display:flex;
    color:#fff;
      .top_img{
        width:140px;
        height: 140px;
      }
      .top_content{
        flex:1;
      padding-left:22px;
        .top_title{
          height: 48px;
          line-height: 48px;
          font-size: 24px;
        }
        .top_main{
          display:flex;
          flex-direction:column;
          .top_main_line{
          flex:1;
          font-size:22px;
          color:#000;
            .top_index,.top_author{margin-right: 16px;color:#3d3f41;}
            .top_name{margin-right: 16px;}
          }
        }
      }
  }
  }
  }

</style>
