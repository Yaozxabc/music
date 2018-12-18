<template>
<scroll
  :data="result"
  class="suggest"
  :pullUp="pullUp"
  @scrollToEnd="searchMore"
  ref="suggest"
  v-show="query.length && result.length">
  <ul class="suggest-list">
    <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
      <div class="icon">
        <i :class="['iconfont',getIconClass(item)]"></i>
      </div>
      <div class="name">
        <p class="text" v-html="getDisplayName(item)"></p>
      </div>
    </li>
    <loading v-show="hasMore" title=""></loading>
  </ul>
</scroll>
</template>

<script type="text/ecmascript-6">
  const TypeSinger='singer'
  const perpage=20
  import Scroll from 'com/base/scroll'
  import {searchList} from 'res/api/search'
  import {createSong} from 'res/api/songs'
  import Loading from 'com/base/loading/loading'
  import {Singer} from 'res/api/singer'
  import {mapMutations} from 'vuex'
    export default{
      props:{
        query:{
          type:String,
          default:''
        },
        showSinger:{
          type:Boolean,
          default:true
        }
      },
      watch:{
        query(){
      this.search(this.query);
    }
      },
        data(){
            return {
              page:1,
              result:[],
              pullUp:true,
              hasMore:true
            }
        },
    methods:{
      search(query){
        this.page=1; //当组件搜索字符变化时，当前页面归1，重新搜索
        this.$refs.suggest.scrollTo(0,0)//滚动位置回到初始值
        this.hasMore=true;
        searchList(this.query,this.page,this.showSinger,perpage).then((res)=>{
          console.log(res.data)
          if(this._getResult(res.data.data)){
            this.result=this._getResult(res.data.data)
            this._checkMore(res.data.data);
          }else{
            this.result=[]
          }
        })
      },
      _getResult(data){
        let ret=[];
        if(data.zhida && data.zhida.singerid){
          ret.push({...data.zhida,...{type:TypeSinger}})
        //扩展运算符（ spread ）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列
//        console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5
        if(data.song){
          ret=ret.concat(this._normarlizeSong(data.song.list))
        }
        return ret;
        }
    },
      selectItem(item){
    if(item.type === TypeSinger){
      const singer=new Singer({
        id:item.singermid,
        name:item.singername
      })
      this.$router.push({
        path:`/search/${singer.id}`
      })
      this.setSinger(singer)
    }
  },
      getIconClass(item){
        if(item.type==TypeSinger){
          return 'icon-user'
        }else{
          return 'icon-music'
        }
      },
      getDisplayName(item){
        if(item.type==TypeSinger){
          return item.singername
        }else{
          return `${item.name}-${item.singer}`
        }
      },
      _normarlizeSong(list){
        let ret=[]
        list.forEach((musicData)=>{
          if(musicData.songid && musicData.albumid){
            ret.push(createSong(musicData))
          }
        })
        return ret;
      },
      _checkMore(data){
        const song=data.song
        if(!song.list.length || (song.curnum +song.curpage*perpage)>song.totalnum){
          this.hasMore=false;
        }
      },
      searchMore(){
        if(!this.hasMore){
          return
        }
        this.page++;
        searchList(this.query,this.page,this.showSinger,perpage).then((res)=>{
          if(this._getResult(res.data.data)){
            this.result=this.result.concat(this._getResult(res.data.data))
            this._checkMore(res.data.data);
          }else{
            this.result=[]
          }
        })
      },
      ...mapMutations({
      setSinger:'SET_SINGER',
    })//...mapMatations代表一个包含所有mutation信息的数组
    },
  components:{
    Scroll,Loading
  }
    }
</script>


<style scoped lang="scss">
  .suggest{
    height: 70%;
    overflow: hidden;
    margin: 0 20px 0 60px;
    width:calc(100% - 80px);
    background:#333;
    .suggest-list{
      .suggest-item{
        clear: both;
        height: 30px;
        margin-top: 10px;
        font-size: 30px;
        color:darkgrey;
          .icon{
          float:left;margin:0 10px;width: 30px;height: 30px;text-align:center;
            i{font-size: 30px;color: #d3dce6}
          }
          .name{
          float:left;width: 80%;text-overflow: ellipsis;white-space: nowrap;overflow:hidden;
            .text{font-size: 26px;color: #d1d1d1;}
          }
      }
    }
  }

</style>
