/**
 * Created by Administrator on 2018/9/7.
 */
import { playMode } from './config.js'
import {loadSearch} from  'res/scripts/cache'
const state={
  singer:{},
  playing:false,//播放状态
  fullScreen:false,//全屏状态
  playlist:[],//播放列表
  sequencelist:[],//顺序列表
  mode:playMode.sequence, //播放模式，引用配置，可以随机，顺序，单曲循环
  curIndex:-1,//当前播放索引序列
  disc:{},
  toplist:{},
  searchHistory:loadSearch()
}
export default state;
