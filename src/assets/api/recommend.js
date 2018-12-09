/**
 * Created by Administrator on 2018/8/25.
 */
import {options,commonParams,err_ok} from 'res/api/config'
import Jsonp from 'res/scripts/jsonp.js'
import Api from 'res/api/api.js'
import axios from 'axios'
//获取轮播图数据
export function getRecommend(){//自定义获取jsonp数据的处理方法
  const url='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';//请求地址
  const data=Object.assign({},commonParams)//合并处理后的数据对象属性,以及传入的属性值
 return Jsonp(url,data,options)
}
//获取歌单数据，rerfer受限失败
export  function getDiscList(dissId){
  const url = Api.index.disclist
  const data=Object.assign({},commonParams,{
    g_tk:1928093487,
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    format:'json',
    disstid:dissId,
    type:1,
    json:1,
    utf8:1,
    onlysong:0,
    platform:'yqq',
    hostUin:0,
    needNewCode:0,
  })
  return axios.get(url,{
    params:data
  }).then((res) => {
    return Promise.resolve(res)
  })
}
//获取失败，权限受限
export function getPlayList() {
  const url = Api.index.playlists
  return axios.get(url).then((res) => {
    return Promise.resolve(res)
  })
}


