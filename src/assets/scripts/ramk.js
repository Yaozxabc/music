/**
 * Created by Administrator on 2018/12/5.
 */
import Jsonp from './jsonp.js'
import {commonParams,Error} from 'res/api/config.js'
import Api from 'res/api/api.js'
import  axios from 'axios'

export  function getRankList(){
  const url=Api.index.rankList;
  const data= Object.assign({},commonParams,{
    g_tk:5381,
    uin:0,
    format:'json',
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    platform:'h5',
    needNewCode:1,
    _:1543941389662
  })
  //const options={
  //  param:"callback",
  //  prefix:"MusicJsonCallback"
  //}
//return Jsonp(url,data)
  return axios.get(url,{params:data}).then((res)=>{
    return Promise.resolve(res.data)
  })
}
export  function getTopList(topid,type,page){
 const url=Api.index.topList
  const data=Object.assign({},commonParams,{
    format:'json',
    platform:'h5',
    needNewCode:1,
    tpl:3,
    page,
    type,
    topid,
    _:1544253141122
  })
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res)
  })
}
