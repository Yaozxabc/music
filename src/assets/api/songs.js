/**
 * Created by Administrator on 2018/9/9.
 */
import {options,commonParams,ERR_ok} from 'res/api/config'
import Jsonp from  'res/scripts/jsonp'
import {param} from  'res/scripts/jsonp'
import  axios from 'axios'
import {Base64} from 'js-base64'

export default class song{
  constructor({id,mid,singer,url,name,album,duration,image,vkey}){
    this.id=id;
    this.mid=mid;
    this.url=url;
    this.name=name;
    this.album=album;
    this.duration=duration;
    this.singer=singer;
    this.image=image;
    this.vkey=vkey
  }
  _getlyric(){
      if(this.lyrics){
        return Promise.resolve(this.lyrics)
      }
      return new Promise((resolve,reject)=>{
        getLyric(this.mid).then((res)=>{
          if(res.retcode == ERR_ok){
            this.lyrics=Base64.decode(res.lyric)//将64为字符串解码为字符串
            resolve(this.lyrics)
          }else{
            reject('error')
          }
        })
      })


  }
}
//设计成类的两大好处，
// 1、可以集中于一个地方维护，不需要在大量地方写相同代码
//2、类的拓展性要比对象好，属于面向对象的编程
export function createSong(musicData){
  return new song({
    id:musicData.songid,
    mid:musicData.songmid,
    singer:filterSinger(musicData.singer),
    name:musicData.songname,
    album:musicData.albumname,
    duration:musicData.interval,
    image:`http://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url:`http://112.90.53.148/amobile.music.tc.qq.com/C400004bRWFg3fej9y.m4a?guid=7160149260&vkey=B81FCB8FAB1C12498D66E131CBAA49A52DDA82E1BD81AD4B09BF550BCD13021382D2872FA920DD915DF6FDC644E8D58A3DE324B2146AC000&uin=0&fromtag=66`,
    vkey:'dd'
  })
}

function filterSinger(singers){
  let ret=[];
  if(!singers){
    return;
  }
  singers.forEach((s)=>{
    ret.push(s.name)
  })
  return ret.join('/')
}
//过滤歌手，如果一首歌有多名歌手，则从歌手数组中取出他们的名字，然后用/进行连接
export function getVkey(musicData){
 const url='https://u.y.qq.com/cgi-bin/musicu.fcg?'
  const data=Object.assign({},commonParams,{
    format:'jsonp',
    loginUin:0,
    hostUin:0,
    platform:'yqq',
    needNewCode:0,
    data:`{"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"7160149260","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"7160149260","songmid":[${musicData.songmid}],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":20,"cv":0}}`
  })
 // const option={
 //   param:'jsonpCallback',
 //   prefix:'getplaysongvkey5650244556143691'
  axios.post(url,data).then((res)=>{
    console.log('ddd')
  })
}

function getLyric(mid){
  var url='/lyrics'+'/music/api/lyric?'
  const data=Object.assign({},commonParams,{
    g_tk:1928093487,
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    format:'json',
    songmid:mid,
      platform:'yqq',
  hostUin:0,
  needNewCode:0,
  categoryId:10000000,
  pcachetime:+new Date()
  })
  const option={
    param:'callback',
    prefix:'MusicJsonCallback_lrc'
  }
  return axios.get(url,{
    params:data
  }).then((res)=>{
return Promise.resolve(res.data)
  })

}


