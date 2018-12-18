<template>
  <div class="search_con">
    <i class="iconfont icon-search"></i>
    <div class="search_warp">
      <div class="search_input">
        <input type="text" class="search_text" v-model="query" :placeholder="placeholder"/>
        <i @click="clear" class="iconfont icon-et-wrong" v-show="query.length"></i>
      </div>
      <div class="search_result">
        <ul>
          <li><i class="iconfont icon-search"></i><span class="text">ddd</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default{
      props:{
        placeholder:{
          type:String,
          default:"搜索歌手、歌曲"
        }
      },
        data(){
            return {
              query:""
            }
        },
    methods:{
      clear(){
        this.query=""
      },
      setQuery(query){
        this.query=query;
      }
    },
    created(){
      this.$watch('query',(newquery)=>{
        this.$emit('query',newquery)//将新值传出去
      })
    }
    }
</script>


<style scoped lang="scss">
  .search_con{
    display:flex;
  .iconfont{
    display:inline-block;width: 40px;height: 40px;font-size: 40px;color: #22746b}
  .icon-search{}
  .search_warp{
    flex:1;
    position:relative;
  .search_input{
    display:flex;
    height: 40px;
    margin: 0 20px;
    border:1px solid #fff;
    border-radius:3px;
  .search_text{display:block;flex: 1;height:100%;padding:0 5px;border: none;background: transparent;font-size:24px;color: #fff0e3;}
  .icon-et-wrong{float: right;}
  }
  .search_result{
    display: none;
    position: absolute;
    left: 20px;
    top: 100%;
  ul{
  li{

  .text{margin-left: 10px;}
  }
  }
  }
  }
  }
</style>
