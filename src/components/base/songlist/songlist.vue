<template>
<div class="song-list">
  <ul>
    <li v-for="song in songs">
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
        }
      },
        data(){
            return {}
        },
    methods:{
      getdesc(song){
        return `${song.singer}.${song.album}`
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
      margin-bottom:5px;
        .content{
        border-bottom:1px dotted #dddddd;
          .name{font-size:30px;color: #f0f7ff}
          .desc{font-size:25px;color: #8c8585
          }
        }
      }
    }
  }

</style>
