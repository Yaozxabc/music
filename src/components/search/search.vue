<template>
<div class="search">
  <div class="search_con">
    <i class="iconfont icon-search"></i>
    <div class="search_warp">
    <div class="search_input">
      <input type="text" class="search_text" v-model="query" placeholder="搜索歌手、歌曲"/>
      <i class="iconfont icon-et-wrong" v-show="!query.length"></i>
    </div>
      <div class="search_result">
        <ul>
          <li><i class="iconfont icon-search"></i><span class="text">ddd</span></li>
        </ul>
      </div>
    </div>
  </div>

</div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
              query:""
            }
        }
    }
</script>


<style scoped lang="scss">
  .search{
  padding:0 10px;
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
    position: absolute;
    left: 20px;
    top: 100%;
    width:calc(100% - 40px);
    background:#333;
    ul{
      li{
        margin-top: 10px;
        font-size: 30px;
        color:darkgrey;
        .text{margin-left: 10px;}
      }
    }
  }

  }
    }
  }

</style>
