/**
 * Created by Administrator on 2018/9/7.
 */
  import  * as types from './mutations-type.js'
export  const selectPlay = function({commit,state}, {list,index}) {//commit为方法，state为属性，list和index为修改对象
  commit(types.SET_PLAYING_STATE,true)
  commit(types.SET_PLAYLIST,list)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURINDEX, index)
  commit(types.SET_FULL_SCREEN, true)
}
