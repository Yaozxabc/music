/**
 * Created by Administrator on 2018/8/22.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from  './getters'
import createLogger from 'vuex/dist/logger.js'
//打印state修改日志


Vue.use(Vuex);

const debug=process.env.NODE_ENV !== 'production'
//在开发环境中检测state修改是否来源于matutions

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  strict:debug,
  //开启严格模式校验，不建议在上线模式使用
  plugins:debug?[createLogger()]:[]
  //插件启用，如果在开发模式则打印日志，否则不打印
})
