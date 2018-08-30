/**
 * Created by Administrator on 2018/8/30.
 */
import loaders from './loading.vue'

const loading={
  install:function(Vue){
   Vue.component('loading',loaders)
  }
}
export default loading;
