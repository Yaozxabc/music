<template>
<div class="search">
  <div class="search_warp">
    <search-box ref="searchBox" @query="searchQuery" ></search-box>
  </div>
  <div class="shortcut_warpper" v-show="!query.length" ref="shortwarpper">
    <scroll class="shortcut" :data="shortcut" ref="shortcut">
      <div>
      <div class="hot-key">
        <h1>热门搜索</h1>
        <ul>
          <li @click="setQuery(item.k)" v-for="item in hotKey"><span>{{item.k}}</span></li>
        </ul>
      </div>
      <div class="search-history" v-show="searchHistory.length" >
        <h1 >
          <span class="title">搜索历史</span>
          <span class="clear">
            <i class="icon-clear iconfont icon-trash" @click.stop=" showConfirm"></i>
          </span>
        </h1>
        <search-list :searches="searchHistory"
          @select="setQuery" @delete="deleteOne"></search-list>
      </div>
      </div>
    </scroll>
  </div>
  <div class="search_result" ref="searchResult">
    <suggest :query="query" @listScroll="blurInput" @select="saveSearch" ref="suggest"></suggest>
  </div>
  <confirm ref="confirm" title="是否清空所有列表" @confirm="clearSearch"></confirm>
  <router-view></router-view>
</div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'com/base/scroll'
  import SearchBox from 'com/base/search-box/search-box'
  import Suggest from 'com/suggest/suggest'
  import SearchList from 'com/base/search-list/search-list'
  import Confirm from 'com/base/confirm/confirm'
  import {getHotKey} from 'res/api/search'
  import {mapActions,mapGetters} from 'vuex'
  import {playlistMixin} from 'res/scripts/mixin'
  const HotKeyCount=10;
    export default{
      mixins:[playlistMixin],
        data(){
            return {
              hotKey:[],
              query:""
            }
        },
  created(){
    this._getHotKey();
  },
  computed:{
    shortcut(){
      return this.hotKey.concat(this.searchHistory)
    },
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods:{
    handlePlaylist(playlist){
      const bottom=playlist.length>0? "80px":"";
      this.$refs.shortwarpper.style.bottom=bottom;
      this.$refs.shortcut.refresh()
      this.$refs.searchResult.style.bottom=bottom;
      this.$refs.suggest.refresh()
    },
    _getHotKey(){
      getHotKey().then((res)=>{
        console.log(res.data)
        this.hotKey=res.data.data.hotkey.slice(0,HotKeyCount)
      })
    },
    blurInput(){
      this.$refs.searchBox.blur()
    },
    setQuery(query){
      this.$refs.searchBox.setQuery(query);
    },
    searchQuery(query){
      this.query=query;
    },
    saveSearch(){
      this.saveSearchHistory(this.query)
    },
    deleteOne(query){
      this.deleteSearchOne(query)
    },
    clearHistory(){
      this.clearSearch()
    },
    showConfirm(){
      this.$refs.confirm.show()
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchOne',
      'clearSearch'
    ])
  },
  components:{
    Scroll,SearchBox,Suggest,SearchList,Confirm
  },
  watch:{
    query(newquery){
      if(!newquery){
        setTimeout(()=>{
          this.$refs.shortcut.refresh()
        },20)
      }
    }
  }
    }
</script>


<style scoped lang="scss">
  .search{
    height: 100%;
  padding:0 10px;
    .shortcut_warpper{
      overflow: hidden;position: fixed;top: 200px;bottom: 0;
      padding:20px;
    margin-top:20px;
      .shortcut{
        height: 100%;
        .hot-key{
          h1{font-size: 24px;color: darkgrey;margin-bottom: 10px;}
          ul{
          overflow:hidden;
            li{
              float: left;
              margin-right: 20px;
              margin-bottom: 20px;
              span{
                padding: 5px 10px;
                font-size: 24px;
                height: 40px;
                line-height: 40px;
                color: #004444;
                background: #fff0e3;
                border-radius: 4px;
              }
            }
          }
        }
  .search-history{
  margin-top:20px;
    h1{
      overflow: hidden;
      padding:0 10px;
    color:$icon-md-Color;
      .title{
        float: left;
        font-size: $icon-md-Size;
      }
      .icon-clear{
        font-size: $icon-md-Size;
        float: right;
      }
    }
  }
      }
    }
  }
  .search_result{
    width: 100%;
    height: 100%;
  }
</style>
