/**
 * Created by Administrator on 2018/9/2.
 */
import Mock from 'mockjs'
 function extendMock(name,arr){
  Mock.Random.extend({
    params:function(){
      name=arr
      return this.pick(name)
    }
  })
}
//
const letterArr=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
export function MockLetter(){
  extendMock('letter',letterArr)
}
