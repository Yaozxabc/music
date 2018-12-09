<template>
<div class="song-list">
  <ul>
    <li v-for="(song,index) in songs" @click="selectItem(song,index)">
      <div class="icon" v-show="icon">
        <i :class="getTrophy(index)">{{getTrophyText(index)}}</i>
      </div>
      <div class="content">
        <h2 class="name">{{song.name}}</h2>
        <p class="desc">{{getdesc(song)}}</p>
      </div>
    </li>
  </ul>
</div>
</template>

<script type="text/ecmascript-6">
    export default{
      props:{
        songs:{
          type:Array,
          default:[]
        },
        icon:{
          types:Boolean,
          default:false
        }
      },
        data(){
            return {}
        },
    computed:{

    },
    methods:{
      selectItem(item,index){
        this.$emit('select',item,index)
      },
      getdesc(song){
        return `${song.singer}.${song.album}`
      },
      getTrophy(index){
        if(index<3){
          return `icon-trophy${index+1}`
        }else{
          return "text"
        }
      },
      getTrophyText(index){
        if(index<3){
          return ""
        }else{
          return `${index+1}`
        }
      }
    }
    }
</script>


<style scoped lang="scss">
  .song-list{
    box-sizing: border-box;
    padding: 20px 15px;
  width:100%;
    ul{
      li{
        padding: 5px 15px;
      margin-bottom:10px;
      .icon{  float:left; margin-right: 15px;
          i{
            display: block;
            width: 75px;
            height:75px;
            background-size: 150px 105px;
          }
          .text{
            color: #dddddd;
            font-size: 48px;
            text-align: center;
            height: 75px;
            line-height: 75px;
            font-style: normal;
          }
          .icon-trophy1{
            background: url("../../../assets/iconfonts/index/icon-trophy.png") 0 0 no-repeat;
          }
          .icon-trophy2{
            background: url("../../../assets/iconfonts/index/icon-trophy.png") -83px 0 no-repeat;
          }
          .icon-trophy3{
            background: url("../../../assets/iconfonts/index/icon-trophy.png") -160px 0 no-repeat;
          }
  }
        .content{

          border-bottom:1px dotted #dddddd;
          .name{font-size:30px;color: #f0f7ff}
          .desc{font-size:25px;color: #8c8585}
        }
      }
    }
  }

</style>
