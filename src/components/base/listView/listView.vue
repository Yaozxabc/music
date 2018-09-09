<template>
<scroll
  class="singerGroup"
  ref="listview"
  :data="data"
  :listentScroll="listentscroll"
  :probeType="probeType"
  @scroll="_scroll"
  >
  <ul>
    <li v-for="singer in data" class="singer_title" ref="listGroup" >
      <h2>{{singer.title}}</h2>
      <ul class="singers">
        <li v-for="item in singer.item" class="singer" @click="selectItem(item)">
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
  <div class="list-shortchar" @touchstart="onShortTouchStart" @touchmove.stop.prevent="onShortTouchMove">
    <ul>
      <li v-for="(item,index) in shortcutlist"
          :class="{'active':curIndex===index}"
          :data-index="index">
        {{item}}
      </li>
    </ul>
  </div>
  <div class="list-fixed" ref="fixed">
    <h1 class="fixed-title">{{fixTitle}}</h1>
  </div>
  <div class="list_loading" v-show="!data.length">
    <loading></loading>
  </div>
</scroll>
</template>

<script type="text/ecmascript-6">
  import scroll from 'com/base/scroll'
  import {getData} from 'res/scripts/dom'
  const AUCHOT_HEIGHT=20;//每个锚点所占的高度值
  const TITLE_HEIGHT=18;
    export default{
      props:{
        data:{
          type:Array,
          default:[]
        }
      },
        data(){
            return {
              scrollY:-1,//滚动的y轴实时位置
              curIndex:0,
              diff:-1//表示scroolY和fixedtitle的高度差
            }
        },
  computed:{
    shortcutlist(){
      return this.data.map((group)=>{
        return group.title.substr(0,1)//切出标题的首字母
      })
    },
    fixTitle(){
      if(this.scrollY>0){
        return "";
      }
      return this.data[this.curIndex]?this.data[this.curIndex].title:""
    }
  },
  created(){
    this.touch={};//
    this.listentscroll=true;//是否监听滚动事件
    this.listenHeight=[];//记录每个字母组的位置值
    this.probeType=3;//是否进行实时触发scroll事件，默认为0，1为非实时、3为实时
  },
  components:{
    scroll
  },
  methods:{
    onShortTouchStart(e){
      let authorIndex=getData(e.target,'index');
      //调用getdata方法获取data-index中的值，此处扩展dom中的获取属性值方法getdata
      let firstTouch= e.touches[0]
      this.touch.y1=firstTouch.pageY
      //获取第一个手指点击的位置，为了实现共享,使用created创建对象，
      // 主要是因为data会观测数据变化，然后实现dom渲染，此时我们不需要观测，所以不用data，用created
      this.touch.authorIndex=authorIndex;
//      this.curIndex=parseInt(authorIndex);
      //获取当前元素的索引值
      this._scrollTo(authorIndex)
      //调用scroll组件中scrollToElement方法
    },
    onShortTouchMove(e){
      let firstTouch= e.touches[0]
      this.touch.y2=firstTouch.pageY
      //获取移动的时候当前手指的位置值
      let delta=(this.touch.y2-this.touch.y1)/AUCHOT_HEIGHT |0;
      //获取手指按下和移动的位移差,delta为偏移的锚点数目;| 0 相当于Math.floor

      let authorIndex=parseInt(this.touch.authorIndex)+delta;
      //获取需要滚动的锚点位置值，当前锚点索引值加上手指开始移动的位置到结束移动位置的锚点差值就是最终移动的值
      this._scrollTo(authorIndex)
    },
    _scroll(pos){
      this.scrollY=pos.y;
      //当前在y轴滚动的距离
    },
    _cacluteHeight(){
      this.listenHeight=[];
      //创建数组用于记录每个字母的位置值
      const list=this.$refs.listGroup;
      //将字母数组位置值赋值
      let height=0;
      //初始化第一个数组的值
      this.listenHeight.push(height);
      for(let i=0;i<list.length;i++){
        let item=list[i];
        //每个数组的项赋值给item
        height+=item.clientHeight;
        //累计字母数组的总和
        this.listenHeight.push(height)
        //记录每个字母的相对位置值
      }
    },
    _scrollTo(index){
      if(!index && index !==0){
        return;
      }
      if(index<0){
        index=0;
      }else if(index>this.listenHeight.length-2){
        index=this.listenHeight.length-2;
      }
      this.scrollY=-this.listenHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
    },
    selectItem(item){
      this.$emit('select',item)
    }
  },
  watch:{
    data(){
      let self=this;
      setTimeout(()=>{
        self._cacluteHeight()
        //检测数据发生变化，则重新计算高度
      },20)
    },
    scrollY(newY){

      //检测当前数组值的变化情况，newY代表更新的y轴位置,在本例中为负值
      const listenHeight=this.listenHeight;
      //分情况对当前位置值进行判断：
      //1:当滚动到顶部，2、滚动到中部，3、滚动到底部
      //第一种情况
      if(newY>0){
        this.curIndex=0;
        return;

      }
      //第二种情况
      for(let i=0;i<listenHeight.length-1;i++){
        let  height1=listenHeight[i];
        //h1代表当前滚动位置的最小区间
        let  height2=listenHeight[i+1];
        //h2代表当前滚动位置的最大区间
        if(-newY>=height1 && -newY < height2){
          this.curIndex=i;
          this.diff=height2+newY;
          return
        }
      }
      //第三种情况

      this.curIndex=listenHeight.length-2;
    },
    diff(newVal){
      let fixedTop=(newVal>0 && newVal<TITLE_HEIGHT)?newVal-TITLE_HEIGHT:0;
      if(this.fixedTop === fixedTop){
        return
      }
      this.fixedTop=fixedTop;
      this.$refs.fixed.style.transform=`translate3d(0,${fixedTop}px,0)`
    }
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
      h2{padding:0 30px;font-size: 36px;color: #cac2c3;background: #eee7f1;font-weight: bold;}
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
  .list-shortchar{
    z-index: 20;
  position: absolute;
  right:0;
  top:50%;
  transform:translateY(-50%);
  width:60px;
  padding:20px 0;
  border-radius:10px;
  text-align:center;
    ul{
      li{
      padding:5px;
      line-height:1;
        font-size: 20px;
        color: #c4bcbd;

      }
  .active{
    color: $colorCur;
  }
    }
  }
  .list-fixed{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    h1{
      padding:0 30px;font-size: 36px;color: #cac2c3;background: #eee7f1;font-weight: bold;
    }
  }
  .list_loading{
    position: absolute;
    width: 100%;
    top:30%;
    left: 50%;
    transform: translateX(-50%)
  }
</style>
