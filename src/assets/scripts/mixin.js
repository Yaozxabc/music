/**
 * Created by Administrator on 2018/12/3.
 */
  import {mapGetters} from 'vuex'
export const playlistMixin={
  computed:{
    ...mapGetters([
    'playlist'
  ])
  },
  mounted(){
  this.handlePlaylist(this.playlist)
 },//组件加载阶段调用，即dom渲染时候调用
  activated(){
  this.handlePlaylist(this.playlist)
  },//组件切换时候触发
  watch:{
  playlist(newVal){
    this.handlePlaylist(this.playlist)
  }
},
  methods:{
  handlePlaylist(){
    throw new Error("component must implenent handleplaylist method")
  }//组件里必须实现函数handleplaylist，如果组件中没有则报错
}
}
