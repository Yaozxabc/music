<template>
<scroll class="singerGroup">
  <ul>
    <li v-for="singer in data" class="singer_title">
      <h2>{{singer.title}}</h2>
      <ul class="singers">
        <li v-for="item in singer.item" class="singer">
          <a href="javascript:" class="singer_head">
          <img v-lazy="item.avatar" :alt="item.name"/>
        </a>
          <div  class="singer_name">
          <a href="javascript:">{{item.name}}</a>
        </div>
        </li>
      </ul>
    </li>
  </ul>
</scroll>
</template>

<script type="text/ecmascript-6">
  import scroll from 'com/base/scroll'
    export default{
      props:{
        data:{
          type:Array,
          default:[]
        }
      },
        data(){
            return {}
        },
  components:{
    scroll
  }
    }
</script>


<style scoped lang="scss">
  .singerGroup{
    overflow: hidden;
    position: fixed;
    top: 140px;
    bottom: 0;
    width:100%;
    ul{
      .singer_title{  margin-bottom:20px;
      h2{padding:0 30px;font-size: 30px;color: #8b8a8a;background: #e2dadb;}
        .singer{
          display:flex;
          .singer_head{
              display: block;
               width: 150px;
              height: 150px;
            margin:20px 15px;
                  img{
                     width: 100%;
                     border-radius: 50%;
               }
          }
          .singer_name{
           height:100%;
            flex: 1;
          text-align: left;padding:50px;
              a{
                font-size: 40px;
                  color: $fontColor;
                 }
              }
          }
      }
    }
  }
</style>
