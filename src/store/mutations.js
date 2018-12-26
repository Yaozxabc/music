import * as types from './mutations-type'

const mutations={
  //为SET_SINGER设置方法内容
  [types.SET_SINGER](state,singer) {
    state.singer=singer;
  },
  [types.SET_PLAYING_STATE](state,flag) {
    state.playing=flag
  },
  [types.SET_FULL_SCREEN](state,flag) {
    state.fullScreen=flag
  },
  [types.SET_PLAYLIST](state,list) {
    state.playlist=list;
  },
  [types.SET_SEQUENCE_LIST](state,list) {
    state.sequencelist=list;
  },
  [types.SET_PLAYING_MODE](state,mode) {
    state.mode=mode;
  },
  [types.SET_CURINDEX](state,index) {
    state.curIndex=index;
  },
  [types.SET_DISC](state,disc) {
    state.disc=disc;
  },
  [types.SET_TOP_LIST](state,toplist){
    state.toplist=toplist
  },
  [types.SET_SEARCH_HISTORY](state,history){
    state.searchHistory=history
  }
}

export  default mutations
