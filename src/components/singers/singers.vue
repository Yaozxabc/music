<template>
<div class="singerlist" ref="singerlist">
<listView :data="singerlist" @select="toDetail" ref="singer"></listView>
  <router-view></router-view>
</div>
</template>
<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'
  import Mock from 'mockjs'
  import {MockLetter} from 'res/scripts/MockExtend'
  import {getSinger} from 'res/api/singer.js'
  import listView from 'com/base/listView/listView'
  import {playlistMixin} from 'res/scripts/mixin'
  const HOT_NAME='热门'//自定义分类的数据
  const HOT_COUNT=10//自定义数据类型的数量
    export default{
      mixins:[playlistMixin],
        data(){
            return {
              singerlist:[]
            }
        },
    methods:{
      handlePlaylist(){
        const bottom=this.playlist.length>0 ? "80px": "0"
        this.$refs.singerlist.style.bottom=bottom;
//        this.$refs.singer.$el.style.bottom=bottom;
        this.$refs.singer.refresh()
      },
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
        })
        //获取歌手数据，并随机为歌手添加字母排序属性
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
              id:item.singer_mid,
              name:item.singer_name,
              avatar:item.singer_pic
            })//构建n条热门数据
          }
           const key=item.findex;
            //当前字母数据的字母值，没有则创建完，推进去，有的话就直接推进去，key的值是和推进来的项目对应的
            if(!map[key]){//判断当前对象是否拥有字母属性，没有则将该对象的标题设为字母
              map[key]={
                title:key,
                item:[]
              }
            }
            //如果还没有创建字母数组，则创建，然后再把当前对象对象推进到字母数组
            map[key].item.push({
              id:item.singer_mid,
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

        ret.sort((a,b)=>{
          return a.title.charCodeAt(0)- b.title.charCodeAt(0)
        });//对字母数组进行排列
        return hot.concat(ret);//连接热门数据和字母数据，合并成一个数组
      },
      toDetail(item){
        this.$router.push({
          path:`singer/${item.id}`
        })
        this.setSinger(item)
        //将item传入到setSinger，SET_SINGER
      },

      ...mapMutations({
       setSinger:'SET_SINGER',
      })//...mapMatations代表一个包含所有mutation信息的数组
//      var go = function*(){yield 1;yield 2;yield 3;};
//      [...go()]
//     [1, 2, 3]上面代码中，变量go是一个 Generator 函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。

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
.singerlist{
  overflow: hidden;
  position: fixed;
top: 140px;
bottom: 0;
width: 100%;
}
</style>
