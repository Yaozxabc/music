/**
 * Created by Administrator on 2018/9/7.
 */
import  * as types from './mutations-type.js'
import {playMode} from './config.js'
import {shuffle} from  'res/scripts/util'
import {saveSearch,deleteSearchHistory,clearSearchHistory} from  'res/scripts/cache'

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

export const  insertSong = function ({commit,state},song){
  let playlist=state.playlist.slice();
  let sequencelist=state.sequencelist.slice();
  let curIndex=state.curIndex;
  //记录当前歌曲
  let curSong=playlist[curIndex]
  //查找当前歌曲在列表中是否存在，并返回索引值
  let fpIndex=findIndex(playlist,song)
  //插入歌曲，索引值加1
  curIndex++;
  //插入歌曲到当前位置
  playlist.splice(curIndex,0,song)
  //如果列表中已经有当前歌曲
  if(fpIndex>-1){
    //如果歌曲序列小于当前索引值，即在当前歌曲前面
    if(fpIndex<curIndex){
      //将歌曲删除掉
      playlist.splice(fpIndex,1)
      curIndex--
      //如果歌曲序列大于当前索引值，即在当前歌曲后面
    }else{
      //将歌曲后面的歌曲删除掉
      playlist.splice(fpIndex+1,1)
    }
  }
  let currentIndex=findIndex(sequencelist,curSong)+1;
  let fsIndex=findIndex(sequencelist,song)
  sequencelist.splice(currentIndex,0,song)
  if(fsIndex>-1){
    if(fsIndex<curIndex){
      //将歌曲删除掉
      playlist.splice(fsIndex,1)
      currentIndex--
      //如果歌曲序列大于当前索引值，即在当前歌曲后面
    }else{
      //将歌曲后面的歌曲删除掉
      playlist.splice(fsIndex+1,1)
    }

  }
  commit(types.SET_PLAYLIST,playlist);
  commit(types.SET_SEQUENCE_LIST,sequencelist);
  commit(types.SET_CURINDEX,currentIndex);
  commit(types.SET_FULL_SCREEN,true)
  commit(types.SET_PLAYING_STATE,true)
}

export const  saveSearchHistory=function({commit},query){
  commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}

export const deleteSearchOne=function({commit},query){
  commit(types.SET_SEARCH_HISTORY,deleteSearchHistory(query))
}

export const clearSearch=function({commit}){
  commit(types.SET_SEARCH_HISTORY,clearSearchHistory())
}
