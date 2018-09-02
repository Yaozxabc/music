<template>
<div class="singerlist">
<listView :data="singerlist"></listView>
</div>
</template>

<script type="text/ecmascript-6">
  import Mock from 'mockjs'
  import {MockLetter} from 'res/scripts/MockExtend'
  import {getSinger} from 'res/api/singer.js'
  import listView from 'com/base/listView/listView'
  const HOT_NAME='热门'
  const HOT_COUNT=10
    export default{
        data(){
            return {
              singerlist:[]
            }
        },
    methods:{
      //获取歌手数据
      _getSingerList(){
        getSinger().then((res)=>{
          let singers=res.singerList.data.singerlist
          //获取qq音乐数据
          this.singerlist=singers;
          //赋值给当前音乐歌手数组
          MockLetter();
          //添加模拟字母数据
          for(let i=0;i<this.singerlist.length;i++){
           let letter=Mock.mock({
             'findex':'@PARAMS'
           })
            this.singerlist[i]=Object.assign({},singers[i],letter)
            //为每个对象添加findex属性，属性值为随机字母
          }
          this.singerlist=this._normarlizeSinger(this.singerlist)
          console.log(this.singerlist)
        })
      },
      //处理歌手数据，实现热门数据和字母排序
      _normarlizeSinger(list){
        let map={//定义热门数组对象，字母数组对象
          hot:{//第一层数据结构
            title:HOT_NAME,//数据结构属性，如热门
            item:[]//该数组下的歌手列表
          }
          }
        //循环对象，分好类
          list.forEach((item,index)=>{
          if(index<HOT_COUNT){
            map.hot.item.push({
              id:item.singer_id,
              name:item.singer_name,
              avatar:item.singer_pic
            })//构建n条热门数据
          }
           const key=item.findex;
            if(!map[key]){//判断当前对象是否拥有字母属性，没有则将该对象的标题设为字母
              map[key]={
                title:key,
                item:[]
              }
            }
            map[key].item.push({
              id:item.singer_id,
              name:item.singer_name,
              avatar:item.singer_pic
            })

            //如果当前对象已经存在，则将他推入现有数组。利用forEach执行每个对象，确保每个对象分好类，但是此时分类的对象是无序的。
        })
        //处理现有列表数据，进行有序排列
        let hot=[];//定义热门数据
        let ret=[];//分类字母顺序
        for(var key in map){//遍历数组对象下所有对象值
          let val=map[key];
          if(val.title.match(/[a-zA-Z]/)){
            ret.push(val)//如果对象的title值时字母，则推进ret数组
          }else if(val.title==='热门'){
            hot.push(val)//如果对象数组的title是热门，则推进热门数组
          }
        }
        console.log(hot)
        ret.sort((a,b)=>{
          return a.title.charCodeAt(0)- b.title.charCodeAt(0)
        });//对字母数组进行排列
        return hot.concat(ret);//连接热门数据和字母数据，合并成一个数组
      }
    },
  mounted(){
    this._getSingerList();
  },
  components:{
    listView
  }
    }
</script>


<style scoped lang="scss">

</style>
