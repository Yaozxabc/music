<template>
<div class="search">
  <div class="search_warp">
    <search-box ref="searchBox" @query="searchQuery"></search-box>
  </div>
  <div class="shortcut_warpper" v-show="!query.length">
    <div class="shortcut">
      <div class="hot-key">
        <h1>热门搜索</h1>
        <ul>
          <li @click="setQuery(item.k)" v-for="item in hotKey"><span>{{item.k}}</span></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="search_result">
    <suggest :query="query"></suggest>
  </div>
  <router-view></router-view>
</div>
</template>

<script type="text/ecmascript-6">
  import searchBox from 'com/base/search-box/search-box'
  import suggest from 'com/suggest/suggest'
  import {getHotKey} from 'res/api/search'
  const HotKeyCount=10;
    export default{
        data(){
            return {
              hotKey:[],
              query:""
            }
        },
  created(){
    this._getHotKey();
  },
  methods:{
    _getHotKey(){
      getHotKey().then((res)=>{
        console.log(res.data)
        this.hotKey=res.data.data.hotkey.slice(0,HotKeyCount)
      })
    },
    setQuery(query){
      this.$refs.searchBox.setQuery(query);
    },
    searchQuery(query){
      this.query=query;
    }
  },
  components:{
    searchBox,suggest
  }
    }
</script>


<style scoped lang="scss">
  .search{
    height: 100%;
  padding:0 10px;
    .shortcut_warpper{
    margin-top:20px;
      .shortcut{
      padding:20px;
        .hot-key{
          h1{font-size: 24px;color: darkgrey;margin-bottom: 10px;}
          ul{
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
      }
    }
  }
</style>
