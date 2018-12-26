<template>
<div class="search-list">
  <ul>
    <li class="search-item" v-for="item in searches" @click="selectItem(item)">
      <span class="text">{{item}}</span>
      <span class="icon" @click.stop="deleteOne(item)">
        <i class="icon-delete iconfont icon-et-wrong"></i>
      </span>
    </li>
  </ul>
</div>
</template>

<script type="text/ecmascript-6">
    export default{
      props:{
        searches:{
          type:Array,
          default:[]
        }
      },
        data(){
            return {}
        },
    methods:{
      selectItem(item){
        this.$emit('select',item)
      },
      deleteOne(item){
        this.$emit('delete',item)
      }
    }
    }
</script>


<style scoped lang="scss">
  .search-list{
  width:100%;
    .search-item{
      overflow: hidden;
      margin-top: 20px;
      padding:0 10px;
      color: $textColor;
  .text{
    float: left;
    font-size:  $icon-md-Size;
  }
  .icon{
    font-size:  $icon-md-Size;
    float: right;
  }
    }
  }
</style>
