/**
 * Created by Administrator on 2018/8/25.
 */
import {options,commonParams,err_ok} from 'res/api/config'
import Jsonp from 'res/scripts/jsonp.js'
import axios from 'axios'
//获取轮播图数据
export function getRecommend(){//自定义获取jsonp数据的处理方法
  const url='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';//请求地址
  const data=Object.assign({},commonParams)//合并处理后的数据对象属性,以及传入的属性值
 return Jsonp(url,data,options)
}
//获取歌单数据，rerfer受限失败
export  function getPlayList(){
  const url='https://c.y.qq.com/splcloud/fcgi-bin/p.fcg'
  const data=Object.assign({},{
    g_tk:5381,
    format:'jsonp',
    picmid:1,
    rnd:0.3062479912884237,
    format:'jsonp',
    platform:'yqq',
    needNewCode:0,
    categoryId:10000000,
    sortId:5,
    sin:0,
    ein:29,
  })
  const options={
    param:'jsonpCallback',
    prefix:'jsonp1'
  }
  console.log(Jsonp(url,data,options))
  return Jsonp(url,data,options)
}
//获取失败，权限受限
export function getDiscList() {
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json' // 将format从jsonp修改为json
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}


