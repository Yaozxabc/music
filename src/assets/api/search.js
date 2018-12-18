/**
 * Created by Administrator on 2018/12/10.
 */
import Jsonp from 'res/scripts/jsonp'
import axios from 'axios'
import Api from 'res/api/api'
import {commonParams,ERR_OK,options} from 'res/api/config'

export function getHotKey(){
  const url=Api.index.hotKeyList
  const data=Object.assign({},commonParams,{
    g_tk:5381,
    uin:0,
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    platform:'h5',
    needNewCode:1,
    _:1544450918073,
    format:'jsonp'
  })
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res)
  })
}

export function searchList(query,page,zhida,perpage){
  const url=Api.index.searchList;
  const data=Object.assign({},commonParams,{
    g_tk:5381,
    uin:0,
    format:'json',
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    platform:'h5',
    needNewCode:1,
    w:query,
    zhidaqu:1,
    catZhida:zhida?1:0,
    t:0,
    flag:1,
    ie:'utf-8',
    sem:1,
    aggr:0,
    perpage,
    n:perpage,
    p:page,
    remoteplace:'txt.mqq.all',
    _:1544538395160
  })
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res)
  })
}
