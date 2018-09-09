/**
 * Created by Administrator on 2018/9/1.
 */
import {commonParams,options} from 'res/api/config'
import Jsonp from 'res/scripts/jsonp.js'

export function getSinger(){
  const url=`https://u.y.qq.com/cgi-bin/musicu.fcg?`
  const odata=Object.assign({},commonParams,{
    loginUin:0,
    hostUin:0,
    format:'jsonp',
    notice:0,
    platform:'yqq',
    needNewCode:0,
    data:`{"comm":{"ct":24,"cv":10000},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}}`
  })
  return Jsonp(url,odata,options)
}
//获取歌手列表数据


