import * as types from './mutations-type'

const mutations={
  //为SET_SINGER设置方法内容
  [types.SET_SINGER](state,singer) {
    state.singer=singer;
    console.log(state.singer)
  }
}

export  default mutations
