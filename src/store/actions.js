/**
 * Created by Administrator on 2018/9/7.
 */
import  * as types from './mutations-type.js'
import {playMode} from './config.js'
import {shuffle} from  'res/scripts/util'

function findIndex(list,song){
  return list.findIndex((item)=>{
    return item.id === song.id
  })
}

export  const selectPlay = function({commit,state}, {list,index}) {//commit为方法，state为属性，list和index为修改对象
  commit(types.SET_PLAYING_STATE,true)
  if(state.mode === playMode.random){
    let randomlist=shuffle(list)
    commit(types.SET_PLAYLIST,randomlist)
    index=findIndex(randomlist,list[index])
  }else{
    commit(types.SET_PLAYLIST,list)
  }
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURINDEX, index)
  commit(types.SET_FULL_SCREEN, true)
}

export  const randomPlay = function({commit,state}, {list}) {//commit为方法，state为属性，list和index为修改对象
  commit(types.SET_PLAYING_MODE,playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomlist=shuffle(list)
  commit(types.SET_PLAYLIST,randomlist)
  commit(types.SET_CURINDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE,true)
}
