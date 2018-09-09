/**
 * Created by Administrator on 2018/9/8.
 */
import OriginJsonp from 'res/scripts/jsonp'
import {options,commonParams,ERR_OK} from 'res/api/config'

export  function getSingerDetail(singerId){
  const url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data=Object.assign({},commonParams,{
    notice:0,
    platform:'yqq',
    needNewCode:0,
    singermid:singerId,
      order:'listen',
    begin:0,
    num:30,
    songstatus:1
  })
  const options={
    param:'jsonpCallback',
    prefix:'MusicJsonCallbacksinger_track'
  }
  return OriginJsonp(url,data,options)
}

