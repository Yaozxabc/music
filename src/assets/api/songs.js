/**
 * Created by Administrator on 2018/9/9.
 */
import Jsonp from 'res/scripts/jsonp'
import {options,commonParams,ERR_ok} from 'res/api/config'
export default class song{
  constructor({id,mid,singer,url,name,album,duration,image}){
    this.id=id;
    this.mid=mid;
    this.url=url;
    this.name=name;
    this.album=album;
    this.duration=duration;
    this.singer=singer;
    this.image=image;
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
    url:`http://isure.stream.qqmusic.qq.com/C400001J5QJL1pRQYB.m4a?guid=7160149260&vkey=369B29F5A0042338EE93E03C6F3DED38A97BC1C0B983EE69810DEAB95A8E61F100D71739E3291B659E4E93666D47D13851087BF4E3F9D2FD&uin=0&fromtag=66`

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
    callback:'getplaysongvkey013206165477022802',
    g_tk:5381,
    format:'jsonp',
    loginUin:0,
    hostUin:0,
    platform:'yqq',
    needNewCode:0,
    data:`{"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"7160149260","songmid":[${musicData.songmid}],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":20,"cv":0}}`
  })
  const option={
    param:'jsonpCallback',
    prefix:'getplaysongvkey013206165477022802'
  }
var self=Jsonp(url,data).then((res)=>{

  })
}
